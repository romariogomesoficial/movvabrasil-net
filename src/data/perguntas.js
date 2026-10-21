// As perguntas que me fazem, e as respostas. ESTA E A UNICA DEFINICAO.
//
// Antes elas viviam escritas dentro de cada pagina. Com uma central de
// perguntas, a mesma pergunta passaria a existir em dois arquivos — e a
// resposta mais antiga continuaria no ar, em JSON-LD, dizendo o contrario da
// nova. E o mesmo erro da tabela de precos, com o agravante de que FAQ errada
// e lida por assistente de IA e repetida como se fosse minha palavra.
//
// Cada pergunta declara em qual PAGINA ela aparece. A central mostra todas; as
// paginas mostram a sua fatia.
//
// ATENCAO: os comentarios deste arquivo vao sem acento, como no resto do
// projeto. As perguntas e respostas NAO: elas sao texto de tela.

import { EMPRESA, CHIP } from './site.js';
import { PLANOS, RECOMENDADO, CONFERIDO_EM } from './planos.js';

const fmtData = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

const MENOR = PLANOS[0];
const MAIOR = PLANOS[PLANOS.length - 1];
const porGiga = (p) => (p.precoNumero / p.gb).toFixed(2).replace('.', ',');

// `tema` agrupa na central. `paginas` lista onde a pergunta aparece — e lista,
// nao um valor so, porque "quanto se ganha" cabe tanto na analise da empresa
// quanto na pagina do programa, e duplicar a entrada traria de volta
// exatamente o problema que este arquivo resolve.
//
// A ORDEM da lista importa: a central manda o leitor para a primeira pagina
// que nao seja a home. Por isso as perguntas de dinheiro comecam por
// /oportunidade, que e onde estao os numeros, e nao pela analise da empresa.
// A home aparece em algumas, sempre na frente, e e justamente a que a central
// pula — mandar da central para a home e devolver o leitor ao comeco.
export const PERGUNTAS = [
  // ---------------------------------------------------------------- empresa
  {
    paginas: ['/movva-e-confiavel'],
    tema: 'A empresa',
    p: 'A MOVVA Brasil tem CNPJ?',
    r: `Sim. ${EMPRESA.razaoSocial}, CNPJ ${EMPRESA.cnpj}, constituída em ${EMPRESA.constituicao}, com situação cadastral ativa na Receita Federal. A empresa existe formalmente desde antes de entrar no setor de telecomunicações.`,
  },
  {
    paginas: ['/', '/movva-e-confiavel'],
    tema: 'A empresa',
    p: 'A MOVVA tem autorização da Anatel?',
    r: `Sim. O ${EMPRESA.atoAnatel} autorizou a MOVVA a explorar Serviços de Telecomunicações de Interesse Coletivo e de Interesse Restrito, por prazo indeterminado, em todo o território nacional. "Em todo o território nacional" é o alcance da autorização, não mancha de cobertura: o ato diz onde a empresa pode prestar o serviço, não onde há sinal. O processo é o ${EMPRESA.processoSei} e pode ser consultado publicamente no sistema SEI da Anatel. Uma ressalva que importa: esse ato autoriza serviços de telecomunicações, mas não diz, por si, em qual dos dois modelos de rede virtual da Resolução 777/2025 a empresa opera — credenciada ou autorizada. Isso eu não confirmei.`,
  },
  {
    paginas: ['/movva-e-confiavel'],
    tema: 'A empresa',
    p: 'A MOVVA é uma pirâmide financeira?',
    r: 'A MOVVA vende plano de celular, que é serviço regulado pela Anatel — isso a diferencia de um esquema sem produto. Ressalva: ' + CHIP.frase + ' O ponto de atenção não é a existência do produto, e sim de onde vem o dinheiro das comissões: se a maior parte nasce de pessoas entrando e pagando licença, e não de contas de celular sendo pagas mês a mês, a estrutura se aproxima do que a Lei 1.521/51 trata como cadeia. Isso é mensurável, e eu publico a minha própria medição.',
  },
  {
    paginas: ['/movva-e-confiavel'],
    tema: 'A empresa',
    p: 'A MOVVA está no Reclame Aqui?',
    r: 'Em 21 de outubro de 2026 eu não localizei página da MOVVA BRASIL LTDA (CNPJ 28.450.689/0001-75) no Reclame Aqui. A página chamada "Movva" que aparece na busca é de outra empresa: CNPJ 16.896.559/0001-81, consultoria em gestão. Ausência de reclamação não é sinal de qualidade nem de defeito, é falta de dado. Confira sempre pelo CNPJ, e não pelo nome.',
  },

  // ------------------------------------------------------------------ plano
  {
    paginas: ['/', '/planos'],
    tema: 'O plano e o preço',
    p: 'Quanto custa o plano da MOVVA?',
    r: `Os planos da MOVVA vão de R$ ${MENOR.preco} por ${MENOR.gb} GB a R$ ${MAIOR.preco} por ${MAIOR.gb} GB, em cinco faixas. O ${RECOMENDADO.nome}, de ${RECOMENDADO.gb} GB por R$ ${RECOMENDADO.preco}, é o que eu mais indico. Valores conferidos em ${fmtData(CONFERIDO_EM)} em material de divulgação da rede de distribuidores, não em documento da própria MOVVA; confirme o preço vigente na página de contratação antes de pagar.`,
  },
  {
    paginas: ['/planos'],
    tema: 'O plano e o preço',
    p: 'Qual plano da MOVVA tem o melhor preço por giga?',
    r: `O ${MAIOR.nome}, de ${MAIOR.gb} GB, sai a R$ ${porGiga(MAIOR)} por giga — o menor da tabela. Mas preço por giga só importa se você usar a franquia: um plano de ${MAIOR.gb} GB para quem gasta ${MENOR.gb} GB é mais caro na prática, não mais barato.`,
  },
  {
    paginas: ['/', '/planos'],
    tema: 'O plano e o preço',
    p: 'Os planos da MOVVA têm fidelidade?',
    r: 'Não. O documento oficial de diferenciais da MOVVA lista "não tem fidelidade" entre as características dos planos, sem prazo mínimo de permanência nem multa para sair.',
  },
  {
    paginas: ['/planos'],
    tema: 'O plano e o preço',
    p: 'Os gigas que sobram acumulam?',
    r: 'O documento oficial da MOVVA lista "gigas acumulativos infinitos" entre os diferenciais dos planos. O que eu não consegui confirmar é por quanto tempo o saldo acumulado fica válido — não localizei o contrato que fixe esse prazo.',
  },
  {
    paginas: ['/', '/planos'],
    tema: 'O plano e o preço',
    p: 'Qual rede o chip da MOVVA usa?',
    r: 'O documento oficial descreve dupla conectividade: duas redes num chip só, TIM e VIVO, com o aparelho usando a que estiver melhor no local. ' + CHIP.frase,
  },
  {
    paginas: ['/', '/planos'],
    tema: 'O plano e o preço',
    p: 'Dá para levar o meu número para a MOVVA?',
    r: 'Dá. A portabilidade numérica é direito garantido pela Anatel e vale para qualquer operadora, inclusive as virtuais. O número continua seu; muda a empresa que presta o serviço.',
  },

  // --------------------------------------------------------------- programa
  {
    paginas: ['/oportunidade', '/movva-e-confiavel'],
    tema: 'O programa de afiliados',
    p: 'Quanto custa entrar na MOVVA?',
    r: 'Existe um cadastro de afiliado e uma licença VIP paga, que dobra as comissões e a pontuação do plano de carreira. Além disso, para ter o serviço, você contrata um plano mensal. Se o chip e o frete são cobrados à parte ou já vêm na primeira mensalidade, eu não localizei documento que diga, e também não localizei os valores. Peça tudo por escrito, com protocolo, e confira na própria página de contratação antes de pagar.',
  },
  {
    paginas: ['/oportunidade', '/movva-e-confiavel'],
    tema: 'O programa de afiliados',
    p: 'Quanto se ganha na MOVVA?',
    r: 'Não existe ganho garantido. Nos meus primeiros três meses e meio como afiliado VIP, com oito pessoas na rede, eu gerei R$ 146,08 em comissões e recebi R$ 115,43 líquidos após a taxa de saque. Em outubro meu ganho foi R$ 0,00, contra R$ 159,80 por mês que eu pago de plano — o dobro do Liberty de 25 GB, e eu não abri a minha fatura para dizer o que esse valor cobre. Desconfie de qualquer número de projeção baseado em matriz cheia.',
  },
  {
    paginas: ['/oportunidade', '/movva-e-confiavel'],
    tema: 'O programa de afiliados',
    p: 'O plano de compensação pode mudar?',
    r: 'Pode, e já mudou. No meu próprio extrato existe uma linha identificada como "Bônus Matching (antigo)", o que indica que a regra de matching sob a qual eu entrei foi alterada. Considere isso antes de montar qualquer planejamento de longo prazo.',
  },
  {
    paginas: ['/oportunidade', '/movva-e-confiavel'],
    tema: 'O programa de afiliados',
    p: 'Quantas pessoas realmente ganham dinheiro com isso?',
    r: 'O material de treinamento da própria MOVVA apresenta esta proporção: de 200 pessoas convidadas, cerca de 100 conhecem o negócio, 10 entram, 6 ficam, 3 continuam e 1 se destaca. Isso é 0,5%. Qualquer número de ganho precisa ser lido junto dessa proporção.',
  },
];

// A fatia de uma pagina, para a propria pagina listar.
export const perguntasDe = (pagina) => PERGUNTAS.filter((q) => q.paginas.includes(pagina));

// Os temas na ordem em que aparecem na central.
export const TEMAS = [...new Set(PERGUNTAS.map((q) => q.tema))];

// FAQPage a partir de uma lista. Toda pagina com perguntas monta o schema
// daqui, e nenhuma escreve o JSON na mao.
export const schemaFaq = (lista) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: lista.map((q) => ({
    '@type': 'Question',
    name: q.p,
    acceptedAnswer: { '@type': 'Answer', text: q.r },
  })),
});
