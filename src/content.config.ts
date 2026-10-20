import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada post exige uma "resposta" curta: o bloco de 40 a 60 palavras que vai no
// topo da pagina. E o trecho que buscador e IA extraem. Sem ele, o post nao
// entra no site.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    resposta: z.string(),
    cluster: z.enum(['categoria', 'diferencial', 'dor', 'marca', 'comparacao']),
    publicado: z.coerce.date(),
    atualizado: z.coerce.date().optional(),
    fontes: z
      .array(z.object({ rotulo: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

export const collections = { blog };
