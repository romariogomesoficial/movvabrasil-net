// Procura palavra portuguesa sem acento no texto que o visitante LE.
//
// Por que existe: os arquivos de dados do projeto levam comentario sem acento,
// de proposito, e mais de uma vez uma frase de tela nasceu dentro de um desses
// arquivos e saiu junto, sem acento, para o site inteiro. Aconteceu com a
// frase do chip (pegamos antes de publicar) e com os textos dos planos (saiu
// na tela). Os dois casos tem a mesma causa: ninguem le um arquivo de dados
// procurando erro de portugues.
//
// Roda sobre o HTML construido, nao sobre o codigo-fonte: e exatamente o texto
// que chega ao leitor, ja sem comentario, sem nome de variavel e sem CSS.
//
//   node scripts/conferir-acentos.mjs
//
// Sai com codigo 1 se achar algo, para travar o deploy.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath e nao .pathname: a pasta do projeto tem espaco no nome, e
// .pathname devolve "Movva%20-%20Oficial", que nao existe no disco.
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

// Cada entrada: a forma errada e a forma certa. A busca e por palavra inteira,
// sem diferenciar maiuscula de minuscula.
//
// So entram palavras que NAO existem em portugues sem o acento.
//
// A primeira versao desta lista trazia "meses", "fidelidade", "dez", "publica"
// e "valido", e acusou trinta erros que nao eram erro nenhum: todas essas
// existem sem acento — "dez" e o numero, "publica" e o verbo publicar, "valido"
// e o verbo validar. Conferidor que da alarme falso vira conferidor que
// ninguem roda. Na duvida sobre uma palavra, ela fica de fora.
const PALAVRAS = [
  ['nao', 'não'], ['voce', 'você'], ['voces', 'vocês'],
  ['mes', 'mês'], ['tambem', 'também'],
  ['ate', 'até'], ['apos', 'após'], ['atras', 'atrás'],
  ['numero', 'número'], ['numeros', 'números'],
  ['preco', 'preço'], ['precos', 'preços'],
  ['servico', 'serviço'], ['servicos', 'serviços'],
  ['ligacao', 'ligação'], ['ligacoes', 'ligações'],
  ['informacao', 'informação'], ['informacoes', 'informações'],
  ['condicao', 'condição'], ['condicoes', 'condições'],
  ['video', 'vídeo'], ['videos', 'vídeos'],
  ['beneficio', 'benefício'], ['beneficios', 'benefícios'],
  ['minimo', 'mínimo'], ['maximo', 'máximo'],
  ['permanencia', 'permanência'], ['experiencia', 'experiência'],
  ['fisico', 'físico'], ['fisica', 'física'],
  ['proprio', 'próprio'], ['propria', 'própria'],
  ['historia', 'história'], ['memoria', 'memória'],
  ['pagina', 'página'], ['paginas', 'páginas'],
  ['codigo', 'código'], ['tecnico', 'técnico'],
  ['disponivel', 'disponível'], ['possivel', 'possível'],
  ['incluido', 'incluído'], ['incluida', 'incluída'],
  ['usuario', 'usuário'], ['usuarios', 'usuários'],
  ['telefonico', 'telefônico'], ['economico', 'econômico'],
  ['ja', 'já'], ['tres', 'três'], ['sao', 'são'],
  ['cobertura', 'cobertura'],
].filter(([errada, certa]) => errada !== certa);

async function htmls(dir) {
  const achados = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) achados.push(...(await htmls(caminho)));
    else if (item.name.endsWith('.html')) achados.push(caminho);
  }
  return achados;
}

// Texto visivel: fora de <script>, <style> e de atributo.
function textoVisivel(html) {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ');
}

const arquivos = await htmls(DIST);
let total = 0;

for (const arquivo of arquivos) {
  const texto = textoVisivel(await readFile(arquivo, 'utf8'));
  for (const [errada, certa] of PALAVRAS) {
    // \b nao fecha direito com acento ao lado; as bordas sao explicitas.
    const re = new RegExp(`(^|[^\\p{L}])(${errada})([^\\p{L}]|$)`, 'giu');
    // Endereco de site nao leva acento e nao e erro: "informacoes.anatel.gov.br"
    // estava sendo acusado. Ponto, barra ou arroba colado de um dos lados
    // significa que aquilo e endereco, nao frase.
    const ocorrencias = [...texto.matchAll(re)].filter(
      (m) => !/[./@-]$/.test(m[1]) && !/^[./@]/.test(m[3])
    );
    if (!ocorrencias.length) continue;
    total += ocorrencias.length;
    const amostra = texto
      .slice(Math.max(0, ocorrencias[0].index - 45), ocorrencias[0].index + 55)
      .replace(/\s+/g, ' ')
      .trim();
    console.error(
      `${relative(DIST, arquivo)}: "${errada}" ${ocorrencias.length}x — deveria ser "${certa}"\n    …${amostra}…`
    );
  }
}

if (total) {
  console.error(`\n${total} ocorrência(s) sem acento no texto publicado.`);
  process.exit(1);
}

console.log(`Acentos conferidos em ${arquivos.length} páginas: nada fora do lugar.`);
