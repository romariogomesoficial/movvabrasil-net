// Confere as regras de conteudo que o projeto ja segue, para que elas nao se
// percam na proxima edicao.
//
// POR QUE ELE EXISTE: duas revisoes seguidas, em 21 e 22/10/2026, acharam 38 e
// 42 defeitos. A maioria nao e checavel por script — contradicao entre paginas,
// atribuicao velha, afirmacao sem forma declarada. Mas tres regras do projeto
// sao DETERMINISTICAS, e e barato impedir que elas se percam:
//
//   1. Todo post tem um bloco `resposta` de 40 a 60 palavras. E o trecho que
//      buscador e IA extraem. Abaixo de 40 nao responde; acima de 60 o
//      buscador corta no meio.
//   2. Todo post tem a secao "O que eu nao consegui confirmar". E o terceiro
//      estado do sistema editorial do site, e tambem o que conferencia.js
//      conta para a faixa — um post sem a secao sai da contagem calado.
//   3. Todo post declara ao menos uma fonte de endereco publico.
//
// AVISO AO PROXIMO QUE MEXER, a mesma licao do conferir-acessibilidade: a
// primeira versao daquele acusou tres problemas e DOIS ERAM DELE. Alarme falso
// faz o conferidor ser ignorado, e conferidor ignorado e pior que nenhum. Por
// isso aqui so entrou regra que (a) o conteudo de hoje ja cumpre inteiro e
// (b) nao depende de interpretacao. Nada de contar acento, adivinhar tom ou
// medir "qualidade".
//
// Este conferidor foi provado NOS DOIS SENTIDOS antes de entrar no build:
// com os 19 posts atuais nao acusa nada, e acusa cada uma das tres regras
// quando o defeito e injetado de proposito.
//
//   node scripts/conferir-conteudo.mjs
//
// Sai com codigo 1 se achar algo.

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const POSTS = fileURLToPath(new URL('../src/content/blog/', import.meta.url));

const MIN_PALAVRAS = 40;
const MAX_PALAVRAS = 60;

// O titulo da secao de pontos em aberto tem tres redacoes no site, porque os
// posts foram escritos em momentos diferentes: "nao consegui confirmar", "nao
// confirmei" e "nao confirmei neste texto". A mesma expressao que
// conferencia.js usa para contar — se divergirem, a faixa conta um numero e o
// conferidor cobra outro.
const TITULO_ABERTO = /^##\s+O que eu n[ãa]o (consegui )?confirm(ei|ar)[^\n]*$/im;

// `resposta:` do frontmatter. O valor sempre vem entre aspas duplas, numa
// linha so, como o schema de src/content.config.ts exige.
const CAMPO_RESPOSTA = /^resposta:\s*"([\s\S]*?)"\s*$/m;

// Uma entrada de fonte no frontmatter.
const TEM_FONTE = /^\s+- rotulo:/m;

const arquivos = (await readdir(POSTS)).filter((f) => f.endsWith('.md'));
const problemas = [];

for (const arquivo of arquivos) {
  const texto = await readFile(join(POSTS, arquivo), 'utf8');
  const anota = (qual, detalhe) => problemas.push({ arquivo, qual, detalhe });

  const m = texto.match(CAMPO_RESPOSTA);
  if (!m) {
    anota('sem resposta', 'o frontmatter não traz o bloco `resposta`');
  } else {
    const palavras = m[1].trim().split(/\s+/).length;
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

  if (!TEM_FONTE.test(texto)) {
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
