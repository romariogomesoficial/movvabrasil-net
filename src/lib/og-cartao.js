// Desenha o cartao de compartilhamento (og:image) em PNG 1200x630.
//
// Como funciona: satori monta o layout com as regras do flexbox e devolve um
// SVG com o texto ja convertido em curva (nao fica dependendo de fonte na hora
// de rasterizar); sharp transforma esse SVG em PNG. Os dois rodam so no build.
//
// Paleta e tipografia sao as mesmas do global.css, de proposito: o cartao tem
// que parecer do mesmo site. Fundo solido claro, porque no WhatsApp em tema
// escuro a imagem nao e invertida e precisa continuar legivel.

import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { SITE, AUTOR, VINCULO } from '../data/site.js';

const require = createRequire(import.meta.url);
const arquivoDeFonte = (especificador) => readFileSync(require.resolve(especificador));

// Carregado uma vez por build, nao uma vez por imagem.
const FONTES = [
  {
    name: 'Newsreader',
    data: arquivoDeFonte('@fontsource/newsreader/files/newsreader-latin-600-normal.woff'),
    weight: 600,
    style: 'normal',
  },
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

// Mesmos valores do :root do global.css, tema claro.
const COR = {
  papel: '#FBFAF8',
  tinta: '#16202B',
  mudo: '#5A6873',
  regua: '#E2E0DB',
  acento: '#0B6B63',
  aviso: '#8A5A00',
};

export const LARGURA = 1200;
export const ALTURA = 630;

// Titulo longo diminui de corpo em vez de estourar o cartao.
function corpoDoTitulo(titulo) {
  const n = titulo.length;
  if (n <= 36) return 74;
  if (n <= 58) return 64;
  if (n <= 84) return 54;
  return 46;
}

function cortar(texto, limite) {
  if (!texto || texto.length <= limite) return texto;
  const pedaco = texto.slice(0, limite);
  const corte = pedaco.lastIndexOf(' ');
  return `${pedaco.slice(0, corte > 40 ? corte : limite).replace(/[.,;:]$/, '')}…`;
}

const bloco = (style, children) => ({ type: 'div', props: { style, children } });

function layout({ titulo, chapeu, resumo }) {
  // So cabe resumo quando o titulo e curto. Acima disso o cartao fica cheio.
  const resumoVisivel = titulo.length <= 58 ? cortar(resumo, 120) : null;

  return bloco(
    {
      width: `${LARGURA}px`,
      height: `${ALTURA}px`,
      display: 'flex',
      backgroundColor: COR.papel,
      fontFamily: 'Source Sans 3',
    },
    [
      // Filete de acento na lateral, a mesma marca visual do .answer e do .card--accent.
      bloco({ width: '14px', backgroundColor: COR.acento }, []),
      bloco(
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          padding: '68px 76px',
        },
        [
          bloco({ display: 'flex', flexDirection: 'column' }, [
            bloco(
              {
                fontSize: '22px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: COR.mudo,
                marginBottom: '28px',
              },
              chapeu
            ),
            bloco(
              {
                fontFamily: 'Newsreader',
                fontWeight: 600,
                fontSize: `${corpoDoTitulo(titulo)}px`,
                lineHeight: 1.14,
                letterSpacing: '-0.012em',
                color: COR.tinta,
              },
              titulo
            ),
            ...(resumoVisivel
              ? [
                  bloco(
                    {
                      fontSize: '27px',
                      lineHeight: 1.45,
                      color: COR.mudo,
                      marginTop: '26px',
                      maxWidth: '880px',
                      borderLeft: `3px solid ${COR.acento}`,
                      paddingLeft: '20px',
                    },
                    resumoVisivel
                  ),
                ]
              : []),
          ]),
          bloco({ display: 'flex', flexDirection: 'column' }, [
            bloco({ height: '1px', backgroundColor: COR.regua, marginBottom: '22px' }, []),
            bloco({ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }, [
              bloco({ display: 'flex', flexDirection: 'column' }, [
                bloco(
                  { fontSize: '25px', fontWeight: 600, color: COR.tinta },
                  SITE.url.replace(/^https?:\/\//, '')
                ),
                bloco(
                  { fontSize: '21px', color: COR.mudo, marginTop: '4px' },
                  `${AUTOR.nome} · ${AUTOR.papel}`
                ),
              ]),
              bloco(
                {
                  fontSize: '19px',
                  fontWeight: 600,
                  color: COR.aviso,
                  maxWidth: '430px',
                  textAlign: 'right',
                  lineHeight: 1.35,
                },
                VINCULO
              ),
            ]),
          ]),
        ]
      ),
    ]
  );
}

export async function desenharCartao({ titulo, chapeu, resumo }) {
  const svg = await satori(layout({ titulo, chapeu, resumo }), {
    width: LARGURA,
    height: ALTURA,
    fonts: FONTES,
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
}
