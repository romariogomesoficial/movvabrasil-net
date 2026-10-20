import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site estatico: todo o HTML sai pronto no build, porque crawler de IA
// (GPTBot, ClaudeBot, PerplexityBot) nao executa JavaScript.
export default defineConfig({
  site: 'https://movvabrasil.net',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
    }),
  ],
});
