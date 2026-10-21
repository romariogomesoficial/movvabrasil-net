// Quem recebe qual cartao de compartilhamento.
//
// Os posts do blog entram sozinhos, direto da colecao: post novo ja nasce com
// imagem. As paginas fixas ficam listadas aqui porque o texto do cartao e uma
// escolha editorial: cabe o H1 curto, nao o <title> longo de busca.
//
// Esqueceu de cadastrar uma pagina nova? O Base.astro avisa no log do build e
// usa o cartao da home, entao a tag og:image nunca aponta para arquivo que nao
// existe.

import { getCollection } from 'astro:content';
import { SITE } from './site.js';

export const PAGINAS_OG = [
  {
    path: '/',
    chapeu: 'Operadora móvel virtual · Brasil',
    titulo: 'MOVVA Brasil, explicada com documento na mão',
    resumo: 'O que dá para confirmar em registro público e o que ainda não dá.',
  },
  {
    path: '/correcoes',
    chapeu: 'Correções',
    titulo: 'O que mudou neste site, e quando',
    resumo: 'O registro do que foi corrigido, com a data e a página. Nenhuma por reclamação de leitor.',
  },
  {
    path: '/movva-e-confiavel',
    chapeu: 'Análise',
    titulo: 'A MOVVA é confiável? É pirâmide?',
    resumo: 'CNPJ, autorização da Anatel, contrato de rede e os riscos do programa de afiliados.',
  },
  {
    path: '/oportunidade',
    chapeu: 'Programa de afiliados',
    titulo: 'Como funciona o programa de afiliados da MOVVA',
    resumo: 'Como a remuneração é calculada, o que custa entrar e o que não é garantido.',
  },
  {
    path: '/blog',
    chapeu: 'Blog',
    titulo: 'Planos, cobertura e portabilidade, sem conversa de vendedor',
    resumo: 'Resposta no começo, fonte linkada e a data da última checagem.',
  },
  {
    path: '/avisos-legais',
    chapeu: 'Avisos legais',
    titulo: 'Avisos legais',
    resumo: 'Declaração de vínculo, aviso de renda e limites de responsabilidade deste site.',
  },
  {
    path: '/politica-de-privacidade',
    chapeu: 'Privacidade',
    titulo: 'Política de privacidade',
    resumo: 'O que o site coleta hoje, em linguagem direta.',
  },
  {
    path: '/termos-de-uso',
    chapeu: 'Termos',
    titulo: 'Termos de uso',
    resumo: 'As regras de uso deste site de distribuidor independente.',
  },
  {
    path: '/404',
    chapeu: 'Erro 404',
    titulo: 'Esta página não existe',
    resumo: 'O endereço pode ter mudado, ou o link que trouxe você aqui está errado.',
  },
];

// '/' -> 'home' | '/blog/portabilidade' -> 'blog/portabilidade'
export function nomeDoArquivo(path) {
  const limpo = String(path).replace(/^\/+|\/+$/g, '');
  return limpo === '' ? 'home' : limpo;
}

export async function listarCartoes() {
  const posts = await getCollection('blog');
  return [
    ...PAGINAS_OG,
    ...posts.map((post) => ({
      path: `/blog/${post.id}`,
      chapeu: 'Blog',
      titulo: post.data.title,
      resumo: post.data.description,
    })),
  ];
}

// URL absoluta da imagem. WhatsApp e Facebook exigem absoluta.
export async function urlDoCartao(path) {
  const cartoes = await listarCartoes();
  const alvo = cartoes.some((c) => c.path === path) ? path : null;

  if (!alvo) {
    console.warn(
      `[og] Nenhum cartao cadastrado para "${path}". Usando o da home. ` +
        'Adicione a pagina em src/data/og.js para ela ter imagem propria.'
    );
  }

  return new URL(`/og/${nomeDoArquivo(alvo ?? '/')}.png`, SITE.url).href;
}
