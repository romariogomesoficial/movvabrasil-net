// Desenha o cartao de compartilhamento (og:image) em PNG 1200x630.
//
// Como funciona: satori monta o layout com as regras do flexbox e devolve um
// SVG com o texto ja convertido em curva (nao fica dependendo de fonte na hora
// de rasterizar); sharp transforma esse SVG em PNG. Os dois rodam so no build.
//
// Paleta e tipografia sao as mesmas do bloco .escuro do global.css, de
// proposito: o cartao tem que parecer do mesmo site. O fundo e escuro porque o
// site e escuro — e no WhatsApp, que mostra a previa sobre um balao claro, o
// cartao escuro se destaca em vez de sumir no fundo.

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
    name: 'IBM Plex Sans',
    data: arquivoDeFonte('@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'IBM Plex Sans',
    data: arquivoDeFonte('@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff'),
    weight: 600,
    style: 'normal',
  },
  {
    name: 'IBM Plex Sans',
    data: arquivoDeFonte('@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-700-normal.woff'),
    weight: 700,
    style: 'normal',
  },
  {
    name: 'IBM Plex Mono',
    data: arquivoDeFonte('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'IBM Plex Mono',
    data: arquivoDeFonte('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff'),
    weight: 500,
    style: 'normal',
  },
];

// Mesmos valores do bloco .escuro do global.css.
const COR = {
  papel: '#000408',
  superficie: '#070E16',
  tinta: '#F5F5F5',
  mudo: '#7F92A0',
  regua: '#18222C',
  /* O verde de interface, nao o do logotipo: o #00D500 tem saturacao 0,257 em
     OKLCH e sobre preto ele vibra. O logotipo da MOVVA nao entra neste cartao,
     entao nao ha com o que casar. */
  acento: '#19C63C',
};

// A rampa de espectro do site. Em satori vai como backgroundImage: borda em
// gradiente nao existe aqui, entao cada filete e uma div com o degrade dentro.
const RAMPA = 'linear-gradient(180deg, #4FE06A 0%, #19C63C 50%, #0E8A3A 100%)';
const RAMPA_H = 'linear-gradient(90deg, #4FE06A 0%, #19C63C 48%, #0E8A3A 100%)';

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
      fontFamily: 'IBM Plex Sans',
    },
    [
      // Filete de espectro na lateral: a mesma rampa do cabecalho do site.
      bloco({ width: '14px', backgroundImage: RAMPA }, []),
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
            // Em mono e em caixa normal: le como etiqueta de secao, nao como
            // rotulo decorativo em versal espacado.
            bloco(
              {
                fontFamily: 'IBM Plex Mono',
                fontSize: '21px',
                fontWeight: 500,
                color: COR.acento,
                marginBottom: '26px',
              },
              chapeu
            ),
            bloco(
              {
                fontWeight: 700,
                fontSize: `${corpoDoTitulo(titulo)}px`,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: COR.tinta,
              },
              titulo
            ),
            ...(resumoVisivel
              ? [
                  bloco(
                    {
                      display: 'flex',
                      marginTop: '28px',
                      maxWidth: '900px',
                    },
                    [
                      bloco({ width: '3px', backgroundImage: RAMPA, marginRight: '20px' }, []),
                      bloco(
                        { fontSize: '27px', lineHeight: 1.45, color: COR.mudo, flexGrow: 1 },
                        resumoVisivel
                      ),
                    ]
                  ),
                ]
              : []),
          ]),
          bloco({ display: 'flex', flexDirection: 'column' }, [
            bloco({ height: '1px', backgroundImage: RAMPA_H, opacity: 0.5, marginBottom: '22px' }, []),
            bloco({ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }, [
              bloco({ display: 'flex', flexDirection: 'column' }, [
                bloco(
                  { fontFamily: 'IBM Plex Mono', fontSize: '25px', fontWeight: 500, color: COR.tinta },
                  SITE.url.replace(/^https?:\/\//, '')
                ),
                bloco(
                  { fontSize: '21px', color: COR.mudo, marginTop: '6px' },
                  `${AUTOR.nome} · ${AUTOR.papel}`
                ),
              ]),
              // Fica, e fica discreto: o cartao e a superficie que mais parece
              // canal oficial quando cai num grupo de WhatsApp sem contexto.
              bloco(
                {
                  fontSize: '18px',
                  color: COR.mudo,
                  maxWidth: '400px',
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
