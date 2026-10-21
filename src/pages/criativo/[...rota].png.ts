// Gera /criativo/<chave>-<formato>.png como arquivo, no build.
import type { APIRoute, GetStaticPaths } from 'astro';
import { listarPecas } from '../../data/criativos.js';
import { desenharCriativo } from '../../lib/criativo.js';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  return listarPecas().map((peca) => ({
    params: { rota: peca.rota },
    props: { peca },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await desenharCriativo(props.peca, props.peca.formato);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
