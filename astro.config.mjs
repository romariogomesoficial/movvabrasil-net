import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { marcarSecoes } from './src/lib/marcar-secoes.js';

// Site estatico: todo o HTML sai pronto no build, porque crawler de IA
// (GPTBot, ClaudeBot, PerplexityBot) nao executa JavaScript.
export default defineConfig({
  site: 'https://movvabrasil.net',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    // Marca "o que eu não consegui confirmar" nos posts, para a seção receber
    // o tratamento de "em aberto" sem depender de ninguém lembrar.
    rehypePlugins: [marcarSecoes],
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
      // A galeria de criativos e ferramenta de trabalho, nao conteudo do site.
      filter: (pagina) => !pagina.includes('/criativos'),
    }),
  ],
});
