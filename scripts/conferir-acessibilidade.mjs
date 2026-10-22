// Confere o que da para conferir em acessibilidade lendo o HTML construido.
//
// O QUE ELE NAO FAZ, e e importante dizer: ele nao substitui leitor de tela
// nem teste com gente. Ele pega a classe de defeito que passa despercebida na
// revisao visual — titulo fora de ordem, link sem nome, imagem de conteudo sem
// descricao — e so isso.
//
// AVISO AO PROXIMO QUE MEXER: a primeira versao deste conferidor acusou tres
// problemas e DOIS ERAM DELE. Ele contava `alt=` com sinal de igual, e nao via
// o `alt` vazio que o Astro emite sem igual — entao acusava 56 logotipos
// corretos. E extraia o texto de um link apagando as tags de dentro, o que
// apagava junto a `alt` da imagem que dava nome ao link — entao acusava
// quatorze links que tinham nome.
//
// A licao vale para qualquer conferidor deste projeto: alarme falso faz o
// conferidor ser ignorado, e conferidor ignorado e pior que nenhum. Na duvida
// sobre uma regra, ela fica de fora.
//
//   node scripts/conferir-acessibilidade.mjs
//
// Sai com codigo 1 se achar algo.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

async function htmls(dir) {
  const achados = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) achados.push(...(await htmls(caminho)));
    else if (item.name.endsWith('.html')) achados.push(caminho);
  }
  return achados;
}

// O nome acessivel de um link: o texto dele, MAIS a `alt` das imagens dentro,
// MAIS aria-label e title. Foi por esquecer a `alt` que a primeira versao
// errou.
function nomeDoLink(tagCompleta, interior) {
  if (/aria-label="[^"]+"/.test(tagCompleta)) return 'aria-label';
  if (/title="[^"]+"/.test(tagCompleta)) return 'title';
  const alts = [...interior.matchAll(/\salt="([^"]+)"/g)].map((m) => m[1]).join(' ');
  const texto = interior.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return (texto + ' ' + alts).trim();
}

const arquivos = await htmls(DIST);
const problemas = [];

for (const arquivo of arquivos) {
  const html = await readFile(arquivo, 'utf8');
  const pagina = relative(DIST, arquivo).replace(/\\/g, '/');
  const anota = (qual, detalhe) => problemas.push({ pagina, qual, detalhe });

  // 1. Hierarquia de titulo. Pular de h1 para h3 quebra a navegacao por
  //    titulos, que e como leitor de tela percorre a pagina.
  const niveis = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({
    n: Number(m[1]),
    t: m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 40),
  }));
  for (let i = 1; i < niveis.length; i++) {
    if (niveis[i].n - niveis[i - 1].n > 1) {
      anota('salto de nível', `h${niveis[i - 1].n} → h${niveis[i].n} em "${niveis[i].t}"`);
      break;
    }
  }

  const h1 = niveis.filter((x) => x.n === 1).length;
  if (h1 !== 1) anota('h1', `${h1} encontrados, esperado 1`);

  // 2. Link sem nome acessivel: o leitor de tela anuncia "link" e nada mais.
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    if (!/\shref=/.test(m[1])) continue;
    if (!nomeDoLink(m[0], m[2])) {
      anota('link sem nome', m[0].slice(0, 90).replace(/\s+/g, ' '));
    }
  }

  // 3. Botao sem nome.
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    if (!nomeDoLink(m[0], m[2])) anota('botão sem nome', m[0].slice(0, 90));
  }

  // 4. Atributo lang. Sem ele o leitor de tela le portugues com fonemas de
  //    ingles.
  if (!/<html[^>]*\slang="[^"]+"/.test(html)) anota('lang', 'o <html> não declara o idioma');

  // 5. Imagem sem atributo alt NENHUM. `alt=""` e correto para imagem
  //    decorativa e passa; ausencia do atributo nao passa, porque ai o leitor
  //    de tela le o nome do arquivo.
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\salt(=|\s|$)/.test(m[1])) anota('imagem sem alt', m[0].slice(0, 90));
  }
}

if (problemas.length) {
  for (const p of problemas) console.error(`${p.pagina}: ${p.qual} — ${p.detalhe}`);
  console.error(`\n${problemas.length} problema(s) de acessibilidade.`);
  process.exit(1);
}

console.log(`Acessibilidade conferida em ${arquivos.length} páginas: títulos em ordem, links com nome, imagens com alt.`);
