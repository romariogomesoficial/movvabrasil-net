// Gera /og/<rota>.png como arquivo, no build. Nao existe servidor em producao,
// entao tudo que esta rota produz vira arquivo dentro de dist/.
import type { APIRoute, GetStaticPaths } from 'astro';
import { listarCartoes, nomeDoArquivo } from '../../data/og.js';
import { desenharCartao } from '../../lib/og-cartao.js';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const cartoes = await listarCartoes();
  return cartoes.map((cartao) => ({
    params: { rota: nomeDoArquivo(cartao.path) },
    props: { cartao },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await desenharCartao(props.cartao);
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
