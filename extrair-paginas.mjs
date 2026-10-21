// Tira as imagens de um PDF que nao tem camada de texto.
//
// Num PDF escaneado ou exportado de apresentacao, cada pagina costuma ser uma
// imagem JPEG inteira, gravada como stream DCTDecode. Procurar os marcadores
// de inicio (FFD8FF) e de fim (FFD9) no arquivo bruto devolve essas imagens
// sem precisar de pdftoppm, que nao existe nesta maquina.
//
//   node extrair-paginas.mjs <arquivo.pdf> <pasta-destino>
//
// Depois reduz cada uma com sharp, para caber na leitura.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const [, , pdf, destino] = process.argv;
mkdirSync(destino, { recursive: true });

const buf = readFileSync(pdf);
const achadas = [];

let i = 0;
while (i < buf.length - 3) {
  // Inicio de JPEG: FF D8 FF
  if (buf[i] === 0xff && buf[i + 1] === 0xd8 && buf[i + 2] === 0xff) {
    // Procura o fim: FF D9
    let j = i + 3;
    while (j < buf.length - 1) {
      if (buf[j] === 0xff && buf[j + 1] === 0xd9) break;
      j++;
    }
    if (j < buf.length - 1) {
      const fatia = buf.subarray(i, j + 2);
      // Fatia pequena demais e icone ou miniatura, nao pagina.
      if (fatia.length > 20000) achadas.push(fatia);
      i = j + 2;
      continue;
    }
  }
  i++;
}

console.log(`${achadas.length} imagens com mais de 20 KB`);

let n = 0;
for (const img of achadas) {
  n++;
  const nome = join(destino, `p${String(n).padStart(2, '0')}.jpg`);
  try {
    // Reduz para largura 1500: o suficiente para ler texto de slide, e leve.
    await sharp(img).resize({ width: 1500, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(nome);
  } catch {
    writeFileSync(nome, img);
  }
}

console.log(`gravadas em ${destino}`);
