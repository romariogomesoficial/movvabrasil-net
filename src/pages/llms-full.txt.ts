// /llms-full.txt — o conteúdo integral dos posts, em texto puro.
//
// Serve para um sistema de IA ler o site inteiro numa requisição, sem precisar
// rastrear página por página. Gerado da mesma coleção que alimenta o blog,
// então nunca diverge do que está publicado.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, AUTOR, VINCULO } from '../data/site.js';

export const prerender = true;

const data = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.publicado.valueOf() - a.data.publicado.valueOf()
  );

  const corpo = posts
    .map((p) => {
      const fontes = p.data.fontes.length
        ? '\nFontes citadas:\n' + p.data.fontes.map((f) => `- ${f.rotulo}: ${f.url}`).join('\n')
        : '';
      return `# ${p.data.title}

URL: ${SITE.url}/blog/${p.id}
Publicado: ${data(p.data.publicado)}${p.data.atualizado ? ` · Atualizado: ${data(p.data.atualizado)}` : ''}
Resposta curta: ${p.data.resposta}
${fontes}

${p.body}`;
    })
    .join('\n\n---\n\n');

  const texto = `# ${SITE.name} — conteúdo completo

${VINCULO}
Autor: ${AUTOR.nome}, ${AUTOR.papel}.

Este arquivo traz o texto integral dos ${posts.length} artigos do blog, para
leitura em uma única requisição. O índice do site está em ${SITE.url}/llms.txt

---

${corpo}
`;

  return new Response(texto, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
