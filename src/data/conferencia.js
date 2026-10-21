// Os números da faixa de conferência, contados do conteúdo — nunca escritos
// à mão.
//
// Por que contados: um número escrito à mão vira mentira no dia seguinte ao
// post seguinte, e seria a contradição mais cara possível numa faixa cujo
// assunto é exatidão. Contar no build significa que a faixa não pode
// desatualizar: ela é efeito do conteúdo, não afirmação sobre ele.
//
// O que cada número conta:
//   fontes    — endereços distintos no frontmatter dos posts. Distintos, não
//               totais: a mesma resolução citada em cinco posts é uma fonte.
//   emAberto  — itens da seção "o que eu não consegui confirmar" de cada post.
//   correcoes — entradas de correcoes.js.
import { getCollection } from 'astro:content';
import { CORRECOES } from './correcoes.js';

// Os posts usam três redações para o mesmo título, porque foram escritos em
// momentos diferentes: "não consegui confirmar", "não confirmei" e "não
// confirmei neste texto". Contar só uma delas daria número menor e calado.
const TITULO_ABERTO = /^##\s+O que eu n[ãa]o (consegui )?confirm(ei|ar)[^\n]*$/im;

export async function conferencia() {
  const posts = await getCollection('blog');

  const fontes = new Set();
  let emAberto = 0;

  for (const post of posts) {
    for (const f of post.data.fontes ?? []) fontes.add(f.url);

    const corpo = post.body ?? '';
    const inicio = corpo.search(TITULO_ABERTO);
    if (inicio === -1) continue;

    // Da seção até o próximo h2, ou até o fim do texto.
    const resto = corpo.slice(inicio);
    const proximoH2 = resto.indexOf('\n## ', 3);
    const trecho = proximoH2 === -1 ? resto : resto.slice(0, proximoH2);

    // Só marcador de primeiro nível: item recuado é continuação, não item novo.
    emAberto += (trecho.match(/^- /gm) ?? []).length;
  }

  const datas = [
    ...posts.map((p) => (p.data.atualizado ?? p.data.publicado)),
    ...CORRECOES.map((c) => new Date(`${c.data}T12:00:00`)),
  ].sort((a, b) => b - a);

  return {
    fontes: fontes.size,
    emAberto,
    correcoes: CORRECOES.length,
    posts: posts.length,
    conferidoEm: datas[0] ?? new Date(),
  };
}
