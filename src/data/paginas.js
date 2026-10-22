// As paginas principais do site. ESTA E A UNICA DEFINICAO.
//
// Por que existe: o menu vivia escrito no Base.astro e a lista de paginas do
// llms.txt vivia escrita dentro do proprio llms.txt. Tres paginas novas
// entraram no mesmo dia e o llms.txt nao soube de nenhuma — justamente o
// arquivo cuja funcao e dizer a um sistema de IA o que o site contem.
//
// O llms.txt ja tinha sido reescrito uma vez por esse motivo: ele listava
// quatro paginas e nenhum post depois que o blog foi de 1 para 8. Os posts
// passaram a ser lidos da colecao e pararam de atrasar; as paginas fixas
// continuaram a mao, e repetiram o erro. Agora saem daqui.
//
// PAGINA NOVA: acrescente aqui. O menu, o rodape e o llms.txt acompanham.

export const PAGINAS = [
  {
    path: '/',
    rotulo: 'Início',
    naNav: true,
    resumo:
      'Página inicial: a oferta do plano, os diferenciais que a empresa publica, os registros públicos dela e o estado do teste em campo do autor.',
  },
  {
    path: '/planos',
    rotulo: 'Planos',
    naNav: true,
    resumo:
      // NAO ENUMERE os itens em aberto aqui: eles mudam, e este resumo vai
      // para o llms.txt, onde a frase velha vira a descricao que um sistema de
      // IA le do site. Foi o que aconteceu com "incluindo a origem dos precos",
      // que ficou aqui depois de a pagina 31 do deck fechar o ponto em
      // 21/10/2026 — e a propria /planos ja afirmava a origem como conferida.
      'Os cinco planos de celular lado a lado, com franquia, preço, preço por giga e para quem cada um serve. O preço é atribuído ao deck institucional da empresa, com a data da conferência. Traz também os pontos que o autor não conseguiu confirmar sobre os planos.',
  },
  {
    path: '/movva-e-confiavel',
    rotulo: 'É confiável?',
    naNav: true,
    resumo:
      'Análise com registros públicos, os riscos do programa de afiliados e os ganhos reais do autor. Responde também sobre CNPJ, Anatel, Reclame Aqui e quanto se ganha.',
  },
  {
    path: '/perguntas-frequentes',
    rotulo: 'Perguntas',
    naNav: true,
    resumo:
      'Central de perguntas sobre a empresa, o preço dos planos, cobertura, portabilidade e o programa de afiliados, com resposta curta em cada uma e o link de onde ela foi conferida.',
  },
  {
    path: '/blog',
    rotulo: 'Blog',
    naNav: true,
    resumo:
      'Textos sobre planos de celular, operadoras virtuais, portabilidade e cobertura, cada um com as fontes usadas e uma seção do que não foi confirmado.',
  },
  {
    path: '/oportunidade',
    rotulo: 'Programa de afiliados',
    naNav: true,
    resumo:
      'Composição da remuneração, custo de participação, o plano de carreira de treze graduações e a tabela com os números reais do autor, inclusive os meses de ganho zero.',
  },
  {
    path: '/sobre',
    rotulo: 'Quem escreve',
    naNav: false,
    resumo:
      'Quem mantém o site e o método editorial: o que entra como verificado, o que é atribuído à empresa, o que fica em aberto, e o que o autor ganha com isso.',
  },
  {
    path: '/avisos-legais',
    rotulo: 'Avisos legais',
    naNav: false,
    resumo: 'Declaração de vínculo, aviso de renda e limites de responsabilidade.',
  },
];

export const NAV = PAGINAS.filter((p) => p.naNav);
