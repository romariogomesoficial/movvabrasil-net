// Desenha criativo de rede social em PNG, nos tres formatos que o Romario usa.
//
// IDENTIDADE: e a da MOVVA, nao a do site. Criativo divulga o produto da
// empresa, entao usa a marca dela. O site continua na identidade editorial,
// porque e ele que precisa nao parecer canal oficial.
//
// As cores nao sao estimativa: foram amostradas pixel a pixel dos PNGs oficiais
// em "Logomarca oficial MOVVA". O verde #00F600 tem contraste de 1,5:1 sobre
// branco, ilegivel — por isso todo material da marca e fundo escuro, e estes
// templates tambem sao.
//
// CONFORMIDADE EMBUTIDA: o rodape com #publi, "Distribuidor independente" e o
// canal oficial da empresa e montado por uma funcao unica, chamada por todos os
// formatos. Nao existe parametro para desligar. Nao existe campo para valor de
// ganho. O sistema impede o erro em vez de avisar sobre ele.

import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { SITE, AUTOR } from '../data/site.js';

const require = createRequire(import.meta.url);
const arquivoDeFonte = (especificador) => readFileSync(require.resolve(especificador));

const FONTES = [
  {
    name: 'Source Sans 3',
    data: arquivoDeFonte('@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Source Sans 3',
    data: arquivoDeFonte('@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff'),
    weight: 600,
    style: 'normal',
  },
];

// Amostrado dos arquivos oficiais do logo.
export const MARCA = {
  verde: '#00D500',      // versao para fundo escuro
  verdeClaro: '#00F600', // versao para fundo claro, so como elemento grafico
  preto: '#141216',      // o preto da marca, que nao e preto puro
  branco: '#FFFFFF',
  cinza: '#A8ADB2',
  cinzaEscuro: '#2A2A2E',
};

// O logo vem embutido como string, nao lido do disco: o build roda com site/
// como diretorio atual e o servidor de desenvolvimento roda com a pasta de
// cima, entao qualquer caminho de arquivo funciona num e quebra no outro.
import { LOGO_DATA_URI } from '../assets/logo-embutido.js';

const logo = async () => LOGO_DATA_URI;
export const LOGO_PROPORCAO = 851 / 3778; // altura / largura do arquivo oficial

const bloco = (style, children) => ({ type: 'div', props: { style, children } });
const imagem = (src, style) => ({ type: 'img', props: { src, style } });

function corpoAuto(texto, base, minimo) {
  const n = texto.length;
  if (n <= 28) return base;
  if (n <= 48) return Math.round(base * 0.82);
  if (n <= 72) return Math.round(base * 0.68);
  return Math.max(minimo, Math.round(base * 0.56));
}

// ---------------------------------------------------------------------------
// Rodape obrigatorio. Unico ponto onde isto e montado, de proposito.
// #publi vem primeiro e em verde porque o Guia do CONAR exige primeira tela,
// em texto, legivel, sem depender de acao do usuario.
// ---------------------------------------------------------------------------
function rodapeObrigatorio({ escala = 1, largura }) {
  const px = (v) => `${Math.round(v * escala)}px`;
  return bloco(
    {
      display: 'flex',
      flexDirection: 'column',
      borderTop: `${px(2)} solid ${MARCA.cinzaEscuro}`,
      paddingTop: px(26),
      ...(largura ? { width: `${largura}px` } : {}),
    },
    [
      bloco({ display: 'flex', alignItems: 'center', marginBottom: px(12) }, [
        bloco(
          {
            fontSize: px(30),
            fontWeight: 600,
            color: MARCA.preto,
            backgroundColor: MARCA.verde,
            padding: `${px(5)} ${px(16)}`,
            borderRadius: px(6),
            marginRight: px(18),
          },
          '#publi'
        ),
        bloco({ fontSize: px(27), fontWeight: 600, color: MARCA.branco }, AUTOR.papel),
      ]),
      bloco(
        { fontSize: px(24), color: MARCA.cinza, lineHeight: 1.4 },
        `Não é canal oficial da MOVVA. A empresa atende em movvabrasil.com · análise em ${SITE.url.replace(/^https?:\/\//, '')}`
      ),
    ]
  );
}

function cabecalhoComLogo({ src, escala = 1, larguraLogo = 300 }) {
  const px = (v) => `${Math.round(v * escala)}px`;
  return bloco({ display: 'flex', alignItems: 'center' }, [
    imagem(src, {
      width: px(larguraLogo),
      height: px(larguraLogo * LOGO_PROPORCAO),
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Formatos
// ---------------------------------------------------------------------------
export const FORMATOS = {
  quadrado: { largura: 1080, altura: 1080, rotulo: 'Post quadrado · feed' },
  story: { largura: 1080, altura: 1920, rotulo: 'Story e capa de Reels' },
  miniatura: { largura: 1280, altura: 720, rotulo: 'Miniatura de YouTube' },
};

function layoutQuadrado({ chapeu, titulo, apoio }, src) {
  // Largura util explicita: sem ela o satori nao quebra a linha do titulo e o
  // texto vaza pela direita do quadro.
  const UTIL = 1080 - 72 * 2;
  return bloco(
    {
      width: '1080px',
      height: '1080px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: MARCA.preto,
      fontFamily: 'Source Sans 3',
      padding: '72px',
    },
    [
      cabecalhoComLogo({ src, larguraLogo: 300 }),
      bloco({ display: 'flex', flexDirection: 'column', width: `${UTIL}px` }, [
        bloco(
          {
            fontSize: '28px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MARCA.verde,
            marginBottom: '26px',
            width: `${UTIL}px`,
          },
          chapeu
        ),
        bloco(
          {
            fontSize: `${corpoAuto(titulo, 88, 48)}px`,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: MARCA.branco,
            width: `${UTIL}px`,
          },
          titulo
        ),
        ...(apoio
          ? [
              bloco(
                {
                  fontSize: '32px',
                  lineHeight: 1.4,
                  color: MARCA.cinza,
                  marginTop: '28px',
                  width: `${UTIL}px`,
                },
                apoio
              ),
            ]
          : []),
      ]),
      rodapeObrigatorio({ escala: 1, largura: UTIL }),
    ]
  );
}

function layoutStory({ chapeu, titulo, apoio }, src) {
  // Area segura: o topo e o rodape da tela ficam sob a interface do app.
  const UTIL = 1080 - 80 * 2;
  return bloco(
    {
      width: '1080px',
      height: '1920px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: MARCA.preto,
      fontFamily: 'Source Sans 3',
      // Padding uniforme e tres filhos: a MESMA estrutura do quadrado, que
      // renderiza certo. Com padding assimetrico o satori engolia o rodape
      // obrigatorio, justamente o elemento que nao pode faltar.
      // A area segura do story, onde a interface do app cobre a tela, vem de
      // margem nos extremos, nao de padding.
      padding: '80px',
    },
    [
      bloco({ display: 'flex', marginTop: '150px' }, [
        cabecalhoComLogo({ src, larguraLogo: 320 }),
      ]),
      bloco({ display: 'flex', flexDirection: 'column', width: `${UTIL}px` }, [
        bloco(
          {
            fontSize: '30px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MARCA.verde,
            marginBottom: '30px',
            width: `${UTIL}px`,
          },
          chapeu
        ),
        bloco(
          {
            fontSize: `${corpoAuto(titulo, 96, 54)}px`,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: MARCA.branco,
            width: `${UTIL}px`,
          },
          titulo
        ),
        ...(apoio
          ? [
              bloco(
                {
                  fontSize: '36px',
                  lineHeight: 1.4,
                  color: MARCA.cinza,
                  marginTop: '32px',
                  width: `${UTIL}px`,
                },
                apoio
              ),
            ]
          : []),
      ]),
      bloco({ display: 'flex', marginBottom: '180px', width: `${UTIL}px` }, [
        rodapeObrigatorio({ escala: 1.08, largura: UTIL }),
      ]),
    ]
  );
}

function layoutMiniatura({ chapeu, titulo }, src) {
  // Miniatura e lida em 320px de largura. Menos palavras, corpo maior.
  return bloco(
    {
      width: '1280px',
      height: '720px',
      display: 'flex',
      backgroundColor: MARCA.preto,
      fontFamily: 'Source Sans 3',
    },
    [
      bloco({ width: '18px', backgroundColor: MARCA.verde }, []),
      bloco(
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          padding: '56px 64px',
        },
        [
          cabecalhoComLogo({ src, larguraLogo: 260 }),
          bloco({ display: 'flex', flexDirection: 'column', width: '1152px' }, [
            bloco(
              {
                fontSize: '26px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: MARCA.verde,
                marginBottom: '20px',
                width: '1152px',
              },
              chapeu
            ),
            bloco(
              {
                fontSize: `${corpoAuto(titulo, 88, 48)}px`,
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: MARCA.branco,
                width: '1152px',
              },
              titulo
            ),
          ]),
          bloco({ display: 'flex', alignItems: 'center' }, [
            bloco(
              {
                fontSize: '24px',
                fontWeight: 600,
                color: MARCA.preto,
                backgroundColor: MARCA.verde,
                padding: '4px 14px',
                borderRadius: '5px',
                marginRight: '16px',
              },
              '#publi'
            ),
            bloco({ fontSize: '23px', color: MARCA.cinza }, `${AUTOR.papel} · não é canal oficial`),
          ]),
        ]
      ),
    ]
  );
}

const LAYOUTS = { quadrado: layoutQuadrado, story: layoutStory, miniatura: layoutMiniatura };

export async function desenharCriativo(peca, formato) {
  const { largura, altura } = FORMATOS[formato];
  const src = await logo();
  const svg = await satori(LAYOUTS[formato](peca, src), {
    width: largura,
    height: altura,
    fonts: FONTES,
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
