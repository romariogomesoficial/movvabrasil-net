// Os temas do blog, num lugar só.
//
// Usado pelo índice do blog, pelo bloco de leitura relacionada no fim de cada
// post e pelo llms.txt. Antes o rótulo de cada tema estava escrito duas vezes,
// em arquivos diferentes — que é como um deles fica para trás.
//
// A ordem aqui é a ordem em que os grupos aparecem na página: primeiro o que
// resolve um problema concreto, depois o que explica a categoria, por último o
// que é técnico.

export const CLUSTERS = [
  {
    chave: 'dor',
    rotulo: 'Guias práticos',
    descricao:
      'Para quem já tem um problema para resolver: portabilidade, fidelidade, sinal fraco, escolha de chip.',
  },
  {
    chave: 'categoria',
    rotulo: 'Como funciona uma operadora virtual',
    descricao:
      'O modelo por trás das MVNOs, de onde vem o sinal e o que muda para quem contrata.',
  },
  {
    chave: 'diferencial',
    rotulo: 'Tecnologia e características de plano',
    descricao:
      'O que existe de verdade por trás do que é anunciado, com a especificação técnica na mão.',
  },
  {
    chave: 'marca',
    rotulo: 'Análise da empresa',
    descricao: 'O que dá e o que não dá para verificar sobre a MOVVA.',
  },
  {
    chave: 'comparacao',
    rotulo: 'Comparações',
    descricao: 'Lado a lado com outras operadoras e outros modelos.',
  },
];

export const ROTULO_DO_CLUSTER = Object.fromEntries(
  CLUSTERS.map((c) => [c.chave, c.rotulo])
);

// Agrupa uma lista de posts na ordem dos clusters, descartando grupo vazio.
export function agruparPorCluster(posts) {
  return CLUSTERS.map((c) => ({
    ...c,
    posts: posts.filter((p) => p.data.cluster === c.chave),
  })).filter((g) => g.posts.length > 0);
}
