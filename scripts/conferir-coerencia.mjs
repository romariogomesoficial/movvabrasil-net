// Confere que fatos que vivem em VARIOS arquivos nao divergem entre si.
//
// POR QUE ELE EXISTE, e esta e a razao mais cara do projeto:
//
// Em 22/10/2026, tres revisoes adversariais acharam 125 defeitos. O padrao que
// mais se repetiu nao foi erro de pesquisa — foi CORRECAO PELA METADE. O mesmo
// fato vivia em cinco, seis lugares; a correcao pegava os visiveis e deixava os
// espelhos; e o site passava a se contradizer sozinho.
//
// Tres exemplos reais, todos do mesmo dia:
//
//   - A contagem de lugares com VME foi corrigida de dezoito para catorze em
//     duas paginas e ficou velha em outras tres. Uma delas era renderizada na
//     MESMA pagina que ja dizia catorze, cento e treze linhas acima.
//   - A cadeia do saque foi reescrita em cinco arquivos. Sobrou um sexto lugar,
//     dentro de um dos cinco, na linha cujo assunto era justamente a taxa.
//   - "O que vem junto" virou "O que o deck poe ao lado" no post e nao na
//     pagina, deixando um cabecalho que afirmava o que o paragrafo abaixo dele
//     dizia ser falso.
//
// Revisao humana nao pega isso: o defeito so aparece quando se leem dois
// arquivos distantes lado a lado. Script pega, e e barato.
//
// COMO ESCREVER UMA REGRA AQUI: ela precisa ser de casamento EXATO de texto,
// sem interpretacao. Nada de heuristica. Se a regra puder acusar um arquivo
// correto, ela nao entra — a regra dura do projeto esta no comentario do
// conferir-acessibilidade: alarme falso faz o conferidor ser ignorado, e
// conferidor ignorado e pior que nenhum.
//
//   node scripts/conferir-coerencia.mjs
//
// Sai com codigo 1 se achar algo.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../src/', import.meta.url));

// Cada regra olha o TEXTO QUE O VISITANTE LE. Comentario de codigo fica fora:
// e nele que os erros passados sao registrados, de proposito, e acusar o
// registro do erro seria o alarme falso mais besta possivel.
const REGRAS = [
  {
    nome: 'contagem de lugares com VME',
    // A escada tem doze degraus mas so oito trazem VME. "Todos os degraus"
    // junto de VME afirma dezoito, que foi o numero errado de 22/10/2026.
    proibido: /VME[^.]{0,200}?todos os degraus|todos os degraus[^.]{0,200}?VME/i,
    porque:
      'o deck traz VME em oito dos doze degraus; "todos os degraus" afirma dezoito lugares, que é o número errado',
  },
  {
    nome: 'número de degraus da escada',
    proibido: /a escada tem treze|treze degraus|plano de carreira de treze/i,
    porque:
      'a página 56 do deck publica doze degraus; treze vinha dos medalhões e foi corrigido em 22/10/2026',
  },
  {
    nome: 'base da taxa de saque',
    // Se um arquivo cita o liquido, tem de citar a base. Sem isso o leitor
    // calcula 16% sobre o bruto e acha um erro de R$ 7,28 que nao existe.
    exigeJunto: ['115,43', '137,42'],
    porque:
      'R$ 115,43 é o líquido do SAQUE de R$ 137,42, não dos R$ 146,08 gerados — sem a base, a conta do leitor não fecha',
  },
  {
    nome: 'origem do preço dos planos',
    proibido: /mensalidade de R\$ 79,90 em material de distribuidor|preço.{0,30}material de distribuidor/i,
    porque:
      'o preço vem da página 31 do deck institucional, documento da empresa, e isso foi corrigido em 21/10/2026',
  },
  {
    nome: 'período do extrato',
    proibido: /7 de julho a 30 de setembro/i,
    porque: 'o período publicado em todo o site é 7 de julho a 20 de outubro de 2026',
  },
  {
    nome: 'medições que não existem',
    proibido: /medições feitas por mim|medições publicadas aqui/i,
    porque: 'não há medição de rede no site: o chip não chegou',
  },
];

async function arquivos(dir, acc = []) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) await arquivos(caminho, acc);
    else if (/\.(astro|md|js|ts)$/.test(item.name)) acc.push(caminho);
  }
  return acc;
}

// Tira comentario de codigo, onde os erros passados ficam registrados de
// proposito. Nao tira o conteudo de string: e isso que vai para a tela.
function semComentarios(texto, arquivo) {
  if (arquivo.endsWith('.md')) return texto;
  return texto
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
}

const problemas = [];

for (const caminho of await arquivos(SRC)) {
  const nome = relative(SRC, caminho).replace(/\\/g, '/');
  const texto = semComentarios(await readFile(caminho, 'utf8'), caminho);

  for (const regra of REGRAS) {
    if (regra.proibido && regra.proibido.test(texto)) {
      const m = texto.match(regra.proibido);
      problemas.push({
        arquivo: nome,
        regra: regra.nome,
        detalhe: `"${m[0].replace(/\s+/g, ' ').slice(0, 70)}" — ${regra.porque}`,
      });
    }
    if (regra.exigeJunto) {
      const [gatilho, exigido] = regra.exigeJunto;
      if (texto.includes(gatilho) && !texto.includes(exigido)) {
        problemas.push({
          arquivo: nome,
          regra: regra.nome,
          detalhe: `cita ${gatilho} sem ${exigido} — ${regra.porque}`,
        });
      }
    }
  }
}

if (problemas.length) {
  for (const p of problemas) console.error(`${p.arquivo}: ${p.regra} — ${p.detalhe}`);
  console.error(`\n${problemas.length} incoerência(s) entre arquivos.`);
  process.exit(1);
}

console.log(`Coerência conferida: ${REGRAS.length} fatos que vivem em vários arquivos, nenhum divergindo.`);
