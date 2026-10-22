// Confere as regras de conteudo que o projeto ja segue, para que elas nao se
// percam na proxima edicao.
//
// POR QUE ELE EXISTE: quatro revisoes adversariais em 21 e 22/10/2026 acharam
// 183 defeitos. A maioria nao da para checar por script — contradicao entre
// paginas, atribuicao velha, afirmacao sem forma declarada. Mas tres regras do
// projeto sao DETERMINISTICAS, e e barato impedir que se percam:
//
//   1. Todo post tem um bloco `resposta` de 40 a 60 palavras. E o trecho que
//      buscador e IA extraem. Abaixo de 40 nao responde; acima de 60 o
//      buscador corta no meio.
//   2. Todo post tem a secao "O que eu nao consegui confirmar". E o terceiro
//      estado do sistema editorial do site, e tambem o que conferencia.js
//      conta para a faixa — um post sem a secao sai da contagem calado.
//   3. Todo post declara ao menos uma fonte de endereco publico.
//
// A REGRA DURA DESTE PROJETO, escrita no comentario do conferir-acessibilidade:
// alarme falso faz o conferidor ser ignorado, e conferidor ignorado e pior que
// nenhum.
//
// POR QUE ESTE ARQUIVO USA js-yaml, e nao expressao regular:
//
// As duas primeiras versoes liam o frontmatter com regex escrita a mao, e as
// duas vazaram. A primeira tinha quatro falsos positivos: exigia aspas duplas,
// contava pontuacao solta como palavra, exigia recuo na lista de fontes e nao
// lia subpastas. A segunda corrigiu os quatro e trouxe outros cinco, achados
// na revisao seguinte — e um deles era FALSO NEGATIVO, o pior tipo: numa
// resposta em bloco (`resposta: |`) com linha em branco no meio, o laco parava
// na linha vazia, e uma resposta de 162 palavras era contada como 45 e
// PASSAVA. O conferidor dizia que estava tudo certo.
//
// A licao: YAML tem mais formas validas do que cabe numa regex, e cada forma
// que a regex nao conhece vira alarme falso ou, pior, silencio. O parser de
// verdade conhece todas. js-yaml e a mesma biblioteca que o Astro usa para ler
// este frontmatter, entao o conferidor passa a ver exatamente o que o site ve.
//
// Provado nos dois sentidos antes de entrar no build.
//
//   node scripts/conferir-conteudo.mjs
//
// Sai com codigo 1 se achar algo.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const POSTS = fileURLToPath(new URL('../src/content/blog/', import.meta.url));

const MIN_PALAVRAS = 40;
const MAX_PALAVRAS = 60;

// O titulo da secao de pontos em aberto tem tres redacoes no site, porque os
// posts foram escritos em momentos diferentes: "nao consegui confirmar", "nao
// confirmei" e "nao confirmei neste texto". A MESMA expressao que
// conferencia.js usa para contar — se divergirem, a faixa conta um numero e o
// conferidor cobra outro.
const TITULO_ABERTO = /^##\s+O que eu n[ãa]o (consegui )?confirm(ei|ar)[^\n]*$/im;

// Recursivo, como o glob do Astro: um post numa subpasta tambem e publicado.
async function postsEm(dir, acc = []) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) await postsEm(caminho, acc);
    else if (item.name.endsWith('.md')) acc.push(caminho);
  }
  return acc;
}

// Palavra e o que tem letra ou digito. Travessao, aspa e reticencia soltos nao
// contam: quatro respostas do site tem um travessao isolado, e conta-lo dava
// uma palavra a mais que a real.
const TEM_LETRA = /[\p{L}\p{N}]/u;
const contaPalavras = (s) =>
  String(s).trim().split(/\s+/).filter((t) => TEM_LETRA.test(t)).length;

const arquivos = await postsEm(POSTS);
const problemas = [];

for (const caminho of arquivos) {
  const arquivo = relative(POSTS, caminho).replace(/\\/g, '/');
  const texto = await readFile(caminho, 'utf8');
  const anota = (qual, detalhe) => problemas.push({ arquivo, qual, detalhe });

  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) {
    anota('sem frontmatter', 'o arquivo não abre com um bloco --- ... ---');
    continue;
  }

  let fm;
  try {
    fm = yaml.load(m[1]);
  } catch (erro) {
    anota('frontmatter inválido', erro.message.split('\n')[0]);
    continue;
  }
  if (!fm || typeof fm !== 'object') {
    anota('frontmatter inválido', 'o bloco não produz um objeto');
    continue;
  }

  if (typeof fm.resposta !== 'string' || !fm.resposta.trim()) {
    anota('sem resposta', 'o frontmatter não traz o campo `resposta`');
  } else {
    const palavras = contaPalavras(fm.resposta);
    if (palavras < MIN_PALAVRAS || palavras > MAX_PALAVRAS) {
      anota(
        'resposta fora da faixa',
        `${palavras} palavras, esperado entre ${MIN_PALAVRAS} e ${MAX_PALAVRAS}`,
      );
    }
  }

  if (!TITULO_ABERTO.test(texto)) {
    anota(
      'sem seção de pontos em aberto',
      'falta o "## O que eu não consegui confirmar" — sem ele o post sai da contagem da faixa',
    );
  }

  // O schema, em content.config.ts, da `fontes` o padrao de lista vazia. Uma
  // lista vazia e YAML valido e passa no schema — e e justamente o caso que
  // este conferidor existe para pegar.
  if (!Array.isArray(fm.fontes) || fm.fontes.length === 0) {
    anota('sem fonte', 'o frontmatter não traz nenhuma entrada em `fontes`');
  }
}

if (problemas.length) {
  for (const p of problemas) console.error(`${p.arquivo}: ${p.qual} — ${p.detalhe}`);
  console.error(`\n${problemas.length} problema(s) de conteúdo.`);
  process.exit(1);
}

console.log(
  `Conteúdo conferido em ${arquivos.length} posts: resposta de ${MIN_PALAVRAS} a ${MAX_PALAVRAS} palavras, seção de pontos em aberto e fonte declarada.`,
);
