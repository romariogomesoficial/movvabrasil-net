// O extrato de comissoes do autor. ESTA E A UNICA DEFINICAO.
//
// DE ONDE VEM: o escritorio virtual da MOVVA, secao Extrato, lido em
// 24/10/2026. Os 17 lancamentos foram transcritos um a um e conferidos contra
// os quatro totais por tipo de bonus que a propria plataforma soma, e contra
// os tres totais por produto que o site ja publicava. Fecham nos dois cortes.
//
// POR QUE ESTE ARQUIVO EXISTE: ate 24/10/2026 estes numeros estavam escritos a
// mao em seis arquivos — oportunidade, movva-e-confiavel, llms.txt, tres posts
// e o grafico. No dia em que o extrato mostrou que uma das afirmacoes estava
// imprecisa, havia seis lugares para corrigir, e esse e exatamente o arranjo
// que produziu os defeitos de 22 e 23/10 (ver CORRECOES.md).
//
// LGPD: o extrato identifica, nominalmente, as pessoas da rede do autor. NADA
// DISSO ENTRA AQUI. Quem gerou cada lancamento e dado de terceiro e nao e do
// site. O que importa publicamente e a ORIGEM do dinheiro, nao de quem veio.
//
// ATENCAO: comentario sem acento, como no resto do projeto. Os campos `rotulo`
// e as frases NAO sao comentario — vao para a tela, e vao acentuados.

export const PERIODO = {
  de: '7 de julho',
  ate: '20 de outubro de 2026',
  frase: 'de 7 de julho a 20 de outubro de 2026',
  duracao: 'três meses e meio',
  lancamentos: 17,
};

export const TOTAL = 146.08;

// A JANELA NAO E UM TESTE LIMPO, e isto e a informacao mais importante deste
// arquivo. Ate 24/10/2026 o site publicava o R$ 0,00 de recorrencia sobre
// telefonia como evidencia sobre o MODELO. Nao e — ou nao so.
//
// Dos tres meses e meio medidos, o autor passou DOIS com a mensalidade de
// R$ 79,90 sem pagar, e a ativacao do proprio chip so foi aprovada no ULTIMO
// DIA da janela. Pela regra da pagina 45 do deck — compressao dinamica —, o
// ganho de quem nao esta ativo sobe para o proximo ascendente apto.
//
// Isso NAO muda o numero: a recorrencia sobre telefonia foi zero mesmo. Muda o
// que o numero prova. O site passa a dizer que o teste limpo ainda nao foi
// feito, em vez de apresentar o zero como veredito sobre o negocio.
//
// Conferido no escritorio virtual em 24/10/2026: a ativacao consta "Aprovado
// 20/10/2026, 20:01:33", e o Ponto Pessoal do plano do autor entrou as 20:02
// do mesmo dia. Os meses sem pagamento sao declaracao do proprio autor sobre o
// proprio bolso — a plataforma NAO mostra ao afiliado o historico de
// mensalidade, e isso tambem esta publicado como ponto em aberto.
export const JANELA_SUJA = {
  mesesSemPagar: ['agosto', 'setembro'],
  quantos: 2,
  ativacaoAprovadaEm: '20 de outubro de 2026',
  // Em setembro houve TRES lancamentos de comissao, num mes sem pagamento.
  // Se isso contraria a compressao dinamica, se ha carencia, ou se "ativo"
  // significa outra coisa, o documento nao resolve. Esta em aberto.
  recebeuMesmoAssimEm: 'setembro',
  lancamentosNesseMes: 3,
};

// O saque. A taxa incidiu sobre o SAQUE, que foi menor que o gerado — colar
// "liquido" em "gerado" faz o leitor calcular 16% sobre 146,08 e achar um erro
// de R$ 7,28 que nao existe.
export const SAQUE = {
  data: '13 de agosto de 2026',
  valor: 137.42,
  taxa: 21.99,
  percentual: '16%',
  liquido: 115.43,
  get naoSacado() {
    return TOTAL - this.valor;
  },
};

// CORTE 1 — POR PRODUTO. E o corte que o site usa, porque responde "o dinheiro
// veio de quem consumindo o que?".
export const POR_PRODUTO = [
  { rotulo: 'Licença VIP (taxa de participação)', valor: 92.70 },
  { rotulo: 'Plano de celular MOVVA Liberty', valor: 44.72 },
  { rotulo: 'SKY+ Light', valor: 8.66 },
];

// CORTE 2 — POR TIPO DE BONUS. E o corte que a PLATAFORMA usa, e publicar so o
// primeiro era o problema: quem abre o proprio painel ve "Bonus Recorrencia
// R$ 78,02" e o site parecia negar que houvesse recorrencia alguma.
export const POR_TIPO = [
  { rotulo: 'Bônus Recorrência', lancamentos: 2, valor: 78.02 },
  { rotulo: 'Bônus de Adesão', lancamentos: 5, valor: 45.90 },
  { rotulo: 'Bônus Matriz', lancamentos: 7, valor: 15.64 },
  { rotulo: 'Bônus Matching (antigo)', lancamentos: 3, valor: 6.52 },
];

// O cruzamento dos dois cortes, que e o que permite o numero exato. Ate
// 24/10/2026 o site publicava DUAS contas (90,8% e 96,7%) dizendo que o
// extrato nao separava adesao de recorrencia dentro da linha do SKY+. Separa.
export const ORIGEM = {
  licenca: 92.70,          // toda a linha da licenca: taxa de participacao
  adesaoTelefonia: 39.92,  // 4 lancamentos de adesao no Liberty
  adesaoSky: 5.98,         // 1 lancamento de adesao no SKY+
  // O que NAO nasceu de entrada nem de licenca: matriz e matching sobre o
  // Liberty (R$ 4,80) e recorrencia mais matriz sobre o SKY+ (R$ 2,68).
  outro: 7.48,
};

export const DE_ENTRADA_OU_LICENCA =
  ORIGEM.licenca + ORIGEM.adesaoTelefonia + ORIGEM.adesaoSky;

export const pct = (v) =>
  (v / TOTAL * 100).toFixed(1).replace('.', ',') + '%';

export const brl = (v) => 'R$ ' + v.toFixed(2).replace('.', ',');

// A recorrencia sobre TELEFONIA — a promessa central do negocio — e zero. A
// recorrencia TOTAL nao e, e o site tem de dizer as duas coisas.
// A mensalidade declarada pelo autor. O rotulo carrega os meses nao pagos de
// proposito: publicar "custo mensal do meu plano: R$ 159,80" ao lado de "ganho
// R$ 0,00" da a entender que ele pagou todos os meses, e nao pagou dois.
//
// O valor e o dobro do Liberty de 25 GB. O painel mostra 2 chips comprados, o
// que e compativel com dois planos, mas o autor nao abriu a fatura — entao o
// que a cifra cobre segue em aberto, e isso esta dito em
// quanto-custa-o-primeiro-mes.md.
export const MENSALIDADE = {
  valor: 159.80,
  rotulo: 'Mensalidade do meu plano, não paga em agosto e setembro',
};

export const RECORRENCIA = {
  totalNaPlataforma: 78.02,
  sobreLicenca: 75.54,
  sobreSky: 2.48,
  sobreTelefonia: 0,
};
