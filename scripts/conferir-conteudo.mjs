// Confere as regras de conteudo que o projeto ja segue, para que elas nao se
// percam na proxima edicao.
//
// POR QUE ELE EXISTE: tres revisoes adversariais em 21 e 22/10/2026 acharam
// 38, 42 e 45 defeitos. A maioria nao da para checar por script — contradicao
// entre paginas, atribuicao velha, afirmacao sem forma declarada. Mas tres
// regras do projeto sao DETERMINISTICAS, e e barato impedir que se percam:
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
// A PRIMEIRA VERSAO DESTE ARQUIVO VIOLOU ESSA REGRA DE QUATRO MANEIRAS, todas
// achadas numa revisao poucas horas depois, e vale guardar quais:
//
//   a) Exigia aspas DUPLAS no campo `resposta`. O schema em content.config.ts
//      pede `z.string()` e nao se importa com a forma: um post com aspas
//      simples — YAML valido, que formatador produz — seria acusado de "sem
//      resposta" estando correto.
//   b) Contava pontuacao solta como palavra. Quatro posts tem um travessao
//      isolado na resposta, entao a contagem saia um a mais que a real.
//   c) Exigia recuo antes de `- rotulo:`. Uma lista YAML nao recuada sob
//      `fontes:` e valida e seria acusada de "sem fonte".
//   d) Lia so a raiz de src/content/blog. O loader do Astro usa glob
//      recursivo, entao um post numa subpasta era publicado sem passar por
//      conferidor nenhum.
//
// A licao: conferidor que le formato por expressao regular precisa aceitar
// TODAS as formas validas do formato, nao so a que o autor usou naquele dia.
//
// Provado nos dois sentidos antes de entrar no build: com os posts atuais nao
// acusa nada, e acusa cada regra quando o defeito e injetado de proposito.
//
//   node scripts/conferir-conteudo.mjs
//
// Sai com codigo 1 se achar algo.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const POSTS = fileURLToPath(new URL('../src/content/blog/', import.meta.url));

const MIN_PALAVRAS = 40;
const MAX_PALAVRAS = 60;

// O titulo da secao de pontos em aberto tem tres redacoes no site, porque os
// posts foram escritos em momentos diferentes: "nao consegui confirmar", "nao
// confirmei" e "nao confirmei neste texto". A MESMA expressao que
// conferencia.js usa para contar — se divergirem, a faixa conta um numero e o
// conferidor cobra outro.
const TITULO_ABERTO = /^##\s+O que eu n[ãa]o (consegui )?confirm(ei|ar)[^\n]*$/im;

// Recursivo, como o glob do Astro. Ver defeito (d) no comentario do topo.
async function postsEm(dir, acc = []) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) await postsEm(caminho, acc);
    else if (item.name.endsWith('.md')) acc.push(caminho);
  }
  return acc;
}

// O bloco de frontmatter, entre as duas linhas de tres tracos.
function frontmatter(texto) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : null;
}

// O valor de `resposta:`, aceitando aspas duplas, aspas simples e escalar sem
// aspas (que em YAML pode continuar nas linhas seguintes, recuadas).
function leResposta(fm) {
  const linhas = fm.split(/\r?\n/);
  const i = linhas.findIndex((l) => /^resposta:/.test(l));
  if (i < 0) return null;

  const resto = linhas[i].replace(/^resposta:\s*/, '');

  const aspa = resto[0];
  if (aspa === '"' || aspa === "'") {
    // Pode fechar na mesma linha ou mais abaixo. Junta ate a aspa de
    // fechamento, ignorando a aspa escapada (\" em YAML de aspas duplas, ''
    // em YAML de aspas simples).
    let bruto = resto;
    let j = i;
    const fechou = (s) => {
      const corpo = s.slice(1);
      if (aspa === '"') return /(^|[^\\])"\s*$/.test(corpo) || /^"\s*$/.test(corpo);
      return /(^|[^'])'\s*$/.test(corpo) || /^'\s*$/.test(corpo);
    };
    while (!fechou(bruto) && j + 1 < linhas.length) {
      j += 1;
      bruto += ' ' + linhas[j].trim();
    }
    return bruto
      .replace(/^.|.$/g, '')
      .replace(aspa === '"' ? /\\"/g : /''/g, aspa)
      .trim();
  }

  // Escalar sem aspas: continua enquanto as linhas seguintes forem recuadas.
  let bruto = resto;
  let j = i;
  while (j + 1 < linhas.length && /^\s+\S/.test(linhas[j + 1]) && !/^\S+:/.test(linhas[j + 1].trim())) {
    j += 1;
    bruto += ' ' + linhas[j].trim();
  }
  return bruto.trim();
}

// Palavra e o que tem letra ou digito. Travessao, aspa e reticencia soltos nao
// contam. Ver defeito (b).
const TEM_LETRA = /[\p{L}\p{N}]/u;
const contaPalavras = (s) => s.trim().split(/\s+/).filter((t) => TEM_LETRA.test(t)).length;

// `fontes:` com ao menos uma entrada. Aceita a lista recuada e a nao recuada,
// e NAO aceita a lista vazia. Ver defeito (c).
function temFonte(fm) {
  // [ \t]* e NAO \s*: \s inclui a quebra de linha, entao `\s*(.*)$` engoliria
  // o fim da linha e capturaria a PRIMEIRA FONTE como se fosse o valor de
  // `fontes:`, fazendo a busca comecar depois dela. Esse foi o defeito que a
  // segunda versao deste arquivo introduziu — acusava os 19 posts corretos.
  const m = fm.match(/^fontes:[ \t]*(.*)$/m);
  if (!m) return false;
  if (/^\[\s*\]$/.test(m[1].trim())) return false; // fontes: []
  const depois = fm.slice(m.index + m[0].length);
  // Primeira linha nao vazia depois de `fontes:` precisa ser item de lista.
  const proxima = depois.split(/\r?\n/).find((l) => l.trim() !== '');
  return proxima !== undefined && /^\s*-\s/.test(proxima);
}

const arquivos = await postsEm(POSTS);
const problemas = [];

for (const caminho of arquivos) {
  const arquivo = relative(POSTS, caminho).replace(/\\/g, '/');
  const texto = await readFile(caminho, 'utf8');
  const anota = (qual, detalhe) => problemas.push({ arquivo, qual, detalhe });

  const fm = frontmatter(texto);
  if (!fm) {
    anota('sem frontmatter', 'o arquivo não abre com um bloco --- ... ---');
    continue;
  }

  const resposta = leResposta(fm);
  if (!resposta) {
    anota('sem resposta', 'o frontmatter não traz o campo `resposta`');
  } else {
    const palavras = contaPalavras(resposta);
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

  if (!temFonte(fm)) {
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
