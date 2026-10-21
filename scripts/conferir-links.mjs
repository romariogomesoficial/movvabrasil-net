// Confere se todo link interno do site construido leva a algum lugar.
//
// Por que existe: o site usa `build.format: 'file'` e `trailingSlash: 'never'`,
// entao /planos vira dist/planos.html. Um link para /plano, /planos/ ou
// /perguntas (sem -frequentes) nao quebra o build, nao aparece em teste nenhum
// e so se manifesta como 404 para quem clicou.
//
// Confere tambem as ancoras (#id) dentro do proprio site: um indice que aponta
// para uma secao renomeada rola para lugar nenhum, em silencio.
//
//   node scripts/conferir-links.mjs
//
// Sai com codigo 1 se achar link quebrado.

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

async function arquivos(dir, ext) {
  const achados = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) achados.push(...(await arquivos(caminho, ext)));
    else if (item.name.endsWith(ext)) achados.push(caminho);
  }
  return achados;
}

// '/planos' -> dist/planos.html | '/' -> dist/index.html
// '/blog/slug' -> dist/blog/slug.html
function alvoNoDisco(href) {
  const limpo = href.split('#')[0].split('?')[0];
  if (limpo === '' || limpo === '/') return join(DIST, 'index.html');
  const semBarra = limpo.replace(/^\/+|\/+$/g, '');
  // Arquivo com extensao (llms.txt, sitemap-index.xml, og/home.png) e servido
  // como esta; o resto e pagina e ganha .html.
  if (/\.[a-z0-9]{2,5}$/i.test(semBarra)) return join(DIST, semBarra);
  return join(DIST, `${semBarra}.html`);
}

const paginas = await arquivos(DIST, '.html');

// Mapa de ancoras por pagina, para conferir os #id.
const ancoras = new Map();
const htmlDe = new Map();
for (const p of paginas) {
  const html = await readFile(p, 'utf8');
  htmlDe.set(p, html);
  const ids = new Set();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
  ancoras.set(p, ids);
}

let quebrados = 0;

for (const pagina of paginas) {
  const html = htmlDe.get(pagina);
  const daqui = relative(DIST, pagina).replace(/\\/g, '/');

  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    // So o que e deste site: fora ficam http(s), mailto, tel, wa.me e afins.
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) continue;

    // Ancora na propria pagina.
    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1));
      if (id && !ancoras.get(pagina).has(id)) {
        console.error(`${daqui}: ancora "#${id}" nao existe nesta pagina`);
        quebrados++;
      }
      continue;
    }

    if (!href.startsWith('/')) {
      console.error(`${daqui}: link relativo "${href}" — use caminho absoluto`);
      quebrados++;
      continue;
    }

    const alvo = alvoNoDisco(href);
    if (!existsSync(alvo)) {
      console.error(`${daqui}: "${href}" nao existe (procurei ${posix.normalize(relative(DIST, alvo).replace(/\\/g, '/'))})`);
      quebrados++;
      continue;
    }

    // Ancora em outra pagina.
    const id = href.includes('#') ? decodeURIComponent(href.split('#')[1]) : '';
    if (id && ancoras.has(alvo) && !ancoras.get(alvo).has(id)) {
      console.error(`${daqui}: "${href}" existe, mas a ancora "#${id}" nao esta la`);
      quebrados++;
    }
  }
}

if (quebrados) {
  console.error(`\n${quebrados} link(s) interno(s) quebrado(s).`);
  process.exit(1);
}

console.log(`Links internos conferidos em ${paginas.length} páginas: todos chegam a algum lugar.`);
