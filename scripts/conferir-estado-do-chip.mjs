// Trava o deploy quando o texto publicado contradiz o estado do chip.
//
// POR QUE EXISTE, com a conta na mao: em 27/10/2026 o chip foi entregue, e virar
// um campo em src/data/site.js exigiu CATORZE edicoes a mao em oito arquivos,
// porque a frase "o chip nao chegou" estava escrita em prosa de markdown em vez
// de lida do modulo. Catorze edicoes a mao sao catorze chances de esquecer uma —
// e a que ficar para tras vira afirmacao falsa sobre o autor numa pagina so,
// exatamente o que ninguem reve.
//
// JA ACONTECEU TRES VEZES NESTE PROJETO, sempre igual: a contagem de lugares com
// VME ficou corrigida em dois lugares e velha em tres, um deles na MESMA pagina;
// a conta do saque ficou errada em cinco arquivos e depois num sexto, dentro de
// um dos cinco "ja corrigidos"; e agora o estado do chip.
//
// A LICAO DO CONFERIDOR QUE FOI REMOVIDO: existiu aqui um conferir-coerencia.mjs
// que tentava achar contradicao por palavra-chave e deu alarme falso em quatro
// de seis regras, porque o site AFIRMA NEGANDO — "nao testei nada em campo" tem
// as mesmas letras de "testei em campo". Ele foi apagado. Este e o oposto em
// desenho: cada regra abaixo e mecanicamente decidivel, compara o texto contra o
// valor REAL de CHIP, e trata a negacao explicitamente em vez de ignora-la.
//
// Roda sobre o HTML construido: e o texto que chega ao leitor.
//
//   node scripts/conferir-estado-do-chip.mjs
//
// Sai com codigo 1 se achar contradicao.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHIP } from '../src/data/site.js';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

// Quanto texto antes da expressao conta como "perto" para procurar o sujeito ou
// a negacao. 60 caracteres cobrem a oracao, nao o paragrafo.
const PERTO = 60;

// As regras. Cada uma so entra em vigor no estado em que faz sentido, por isso
// `quando` le CHIP em vez de supor. `exige` e a palavra que TEM de estar perto
// para a frase ser legitima; sem ela, e contradicao.
const REGRAS = [
  {
    quando: () => CHIP.chegou === true,
    nome: 'o chip chegou, mas a pagina diz que nao',
    expressao: /n[ãa]o chegou/giu,
    // So acusa se o sujeito for o chip ou o produto. "A fatura nao chegou" nao
    // e assunto deste conferidor.
    exigePerto: /\b(chip|produto)\b/iu,
    recado: 'CHIP.chegou e true; esta frase afirma o contrario',
  },
  {
    quando: () => CHIP.chegou === false,
    nome: 'o chip nao chegou, mas a pagina diz que chegou',
    expressao: /\b(chip|produto)\b[^.!?]{0,40}\b(chegou|foi entregue)\b/giu,
    // Uma negacao perto salva a frase: "o chip ainda nao chegou".
    proibidoPerto: /\b(n[ãa]o|ainda n[ãa]o|nenhum)\b/iu,
    recado: 'CHIP.chegou e false; esta frase afirma que chegou',
  },
  {
    quando: () => CHIP.testado === false,
    nome: 'nao houve medicao em campo, mas a pagina afirma medicao',
    expressao: /test(ei|ado|ada|es)\s+(em\s+campo|nada\s+em\s+campo)/giu,
    // A NEGACAO SALVA A FRASE, e e por isso que ela entra aqui e nao em
    // `exigePerto`. O site afirma NEGANDO — "ainda nao testei nada em campo" —,
    // entao "testei em campo" com uma negacao perto esta correto, e sem negacao
    // esta afirmando teste que nao houve.
    //
    // A PRIMEIRA VERSAO DESTA REGRA punha esta lista em `exigePerto` e acusou 38
    // frases verdadeiras, nas 32 paginas. Era o mesmo defeito que fez o
    // conferir-coerencia.mjs ser apagado: o comentario estava certo e o campo,
    // invertido. Fica registrado porque o erro e facil de repetir.
    proibidoPerto: /\b(n[ãa]o|nada|nenhum|nenhuma|falta|sem)\b/iu,
    recado: 'CHIP.testadoEm e null; nenhuma pagina pode afirmar teste em campo',
  },
];

async function htmls(dir) {
  const achados = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) achados.push(...(await htmls(caminho)));
    else if (item.name.endsWith('.html')) achados.push(caminho);
  }
  return achados;
}

// Inclui o JSON-LD de proposito: a FAQPage repete as frases, e um estado errado
// ali vai para o Google e para as IAs sem aparecer na tela de ninguem. Por isso
// so <style> sai; <script> fica.
function textoPublicado(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ');
}

const ativas = REGRAS.filter((r) => r.quando());
const arquivos = await htmls(DIST);
let total = 0;

for (const arquivo of arquivos) {
  const texto = textoPublicado(await readFile(arquivo, 'utf8')).replace(/\s+/g, ' ');

  for (const regra of ativas) {
    for (const achado of texto.matchAll(regra.expressao)) {
      // A janela PARA na fronteira de frase. Sem isto, a negacao de uma frase
      // anterior salva a frase seguinte, que e defeito provado: no teste de
      // bancada, "eu testei em campo e a cobertura era boa" passou limpo porque
      // havia um "nao chegou" na frase antes dela, 40 caracteres atras.
      //
      // O ponto so conta como fim de frase se vier espaco ou aspas depois, para
      // que "R$ 1.000" e "27/10/2026" nao cortem a janela no meio.
      const janela = texto.slice(Math.max(0, achado.index - PERTO), achado.index);
      const antes = janela.split(/[.!?](?=\s|"|$)/).pop();

      // O proprio trecho casado entra nas duas conferencias: "testei NADA em
      // campo" carrega a negacao dentro do match, nao antes dele.
      const vizinhanca = antes + achado[0];
      if (regra.exigePerto && !regra.exigePerto.test(vizinhanca)) continue;
      if (regra.proibidoPerto && regra.proibidoPerto.test(vizinhanca)) continue;

      total += 1;
      const trecho = texto
        .slice(Math.max(0, achado.index - 70), achado.index + achado[0].length + 40)
        .trim();
      console.error(
        `${relative(DIST, arquivo)}: ${regra.recado}\n    …${trecho}…`
      );
    }
  }
}

if (total) {
  console.error(
    `\n${total} contradição(ões) com o estado do chip. ` +
      `Agora: chegou=${CHIP.chegou}, testadoEm=${CHIP.testadoEm}, testado=${CHIP.testado}.\n` +
      'Ou a frase está velha, ou o campo em src/data/site.js está errado. Um dos dois.'
  );
  process.exit(1);
}

console.log(
  `Estado do chip conferido em ${arquivos.length} páginas, por ${ativas.length} regra(s) ativa(s): ` +
    `chegou=${CHIP.chegou}, testado=${CHIP.testado}, e nenhuma página diz o contrário.`
);
