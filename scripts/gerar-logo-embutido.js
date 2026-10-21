// Regera src/assets/logo-embutido.js a partir do PNG oficial.
// Rode a partir da pasta site/:  node scripts/gerar-logo-embutido.js
import sharp from 'sharp';
import { writeFileSync, statSync } from 'node:fs';

const ORIGEM = 'src/assets/logo-movva-branca-verde.png';
const DESTINO = 'src/assets/logo-embutido.js';

const CABECALHO = `// GERADO. Logo oficial da MOVVA, branco e verde, reduzido para 720px e
// embutido como data URI.
//
// Esta embutido, e nao lido do disco, porque o caminho de arquivo nao e
// confiavel aqui: o build roda com a pasta site/ como diretorio atual, e o
// servidor de desenvolvimento roda com a pasta de cima. Como string, funciona
// igual nos dois, e no GitHub Actions tambem.
//
// Para regerar depois de trocar o arquivo de logo, rode o script em
// scripts/gerar-logo-embutido.js

`;

const png = await sharp(ORIGEM).resize({ width: 720 }).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(
  DESTINO,
  `${CABECALHO}export const LOGO_DATA_URI =\n  'data:image/png;base64,${png.toString('base64')}';\n`,
  'utf8'
);

console.log(`png reduzido: ${(png.length / 1024).toFixed(1)} KB`);
console.log(`modulo gerado: ${(statSync(DESTINO).size / 1024).toFixed(1)} KB`);
