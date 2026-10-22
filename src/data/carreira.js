// O plano de carreira e a remuneracao de afiliado da MOVVA. UNICA DEFINICAO.
//
// DE ONDE VEM: o deck institucional da MOVVA, 66 paginas, lido imagem por
// imagem em 21 e 22/10/2026 porque o arquivo nao tem camada de texto e nenhuma
// busca por palavra o alcanca. Cada bloco abaixo diz a pagina de onde saiu.
//
// POR QUE ESTE ARQUIVO EXISTE: ate 22/10/2026 a pagina /oportunidade dizia
// "a escada tem treze degraus" e "as exigencias de cada nivel nao estao aqui
// porque eu nao localizei o documento oficial que as fixe". As duas frases
// ficaram velhas no mesmo dia: o deck fixa as exigencias e publica DOZE
// degraus, em outra ordem. Tres paginas novas foram barradas na revisao por
// contradizer a pagina publicada — e estavam certas. Escrever a escada a mao
// dentro de uma pagina foi o que permitiu que ela divergisse do documento sem
// ninguem notar.
//
// ATENCAO: comentario vai sem acento, como no resto do projeto. Os campos
// `nome`, `exige`, `premio`, `observacao` e as listas EM_ABERTO_CARREIRA NAO
// sao comentario: sao frases que o visitante le na tela, e vao acentuadas.

// Data em que eu conferi a ultima vez contra as paginas do deck.
export const CONFERIDO_EM = '2026-10-22';

// ---------------------------------------------------------------------------
// A ESCADA — deck, pagina 56 ("Construa o seu plano de carreira")
// ---------------------------------------------------------------------------
//
// A pagina agrupa os degraus em tres blocos nomeados: FUNDACAO, CONSTRUCAO e
// LIBERDADE. Os quatro primeiros exigem diretos ativos e destravam niveis da
// matriz, sem pontuacao. Do quinto em diante a exigencia passa a ser pontos
// (PG = Pontos de Graduacao), sempre com doze diretos ativos.
//
// VME aparece em todos os degraus e em todas as premiacoes. O deck NAO define
// a sigla em nenhuma das 66 paginas. Por isso o numero entra como o documento
// o imprime, sem traducao minha. Esta em EM_ABERTO_CARREIRA.

export const DEGRAUS = [
  {
    n: 1,
    nome: 'Consultor',
    bloco: 'Fundação',
    exige: '3 diretos ativos',
    destrava: 'até o 3º nível da matriz',
  },
  {
    n: 2,
    nome: 'Empreendedor',
    bloco: 'Fundação',
    exige: '6 diretos ativos',
    destrava: 'até o 6º nível da matriz',
  },
  {
    n: 3,
    nome: 'Especialista',
    bloco: 'Fundação',
    exige: '9 diretos ativos',
    destrava: 'até o 9º nível da matriz',
  },
  {
    n: 4,
    nome: 'Supervisor',
    bloco: 'Fundação',
    exige: '12 diretos ativos',
    destrava: 'até o 12º nível da matriz',
  },
  {
    n: 5,
    nome: 'Gestor',
    bloco: 'Fundação',
    pontos: '100 Pts (PG)',
    vme: '50%',
    diretos: '12 diretos',
    premio: 'Ganha 3 chips',
  },
  {
    n: 6,
    nome: 'Executivo',
    bloco: 'Fundação',
    pontos: '300 Pts (PG)',
    vme: '50%',
    diretos: '12 diretos',
    premio: 'Ganha 10 chips',
  },
  {
    n: 7,
    nome: 'Diretor',
    bloco: 'Construção',
    pontos: '700 Pts (PG)',
    vme: '50%',
    diretos: '12 diretos',
    vip: true,
    premio: 'Cruzeiro',
  },
  {
    n: 8,
    nome: 'Diretor Sênior',
    bloco: 'Construção',
    pontos: '2.500 Pts (PG)',
    vme: '50%',
    diretos: '12 diretos',
    vip: true,
    premio: 'Caribe',
    lideranca: '+0,1%',
  },
  {
    n: 9,
    nome: 'Acionista',
    bloco: 'Construção',
    pontos: '10.000 Pts (PG)',
    vme: '40%',
    diretos: '12 diretos',
    vip: true,
    premio: 'Europa',
    lideranca: '+0,2%',
    lucros: true,
  },
  {
    n: 10,
    nome: 'Vice-Presidente',
    bloco: 'Construção',
    pontos: '30.000 Pts (PG)',
    vme: '30%',
    diretos: '12 diretos',
    vip: true,
    premio: 'Dubai',
    lideranca: '+0,3%',
    lucros: true,
  },
  {
    n: 11,
    nome: 'Presidente',
    bloco: 'Liberdade',
    pontos: '75.000 Pts (PG)',
    vme: '20%',
    diretos: '12 diretos',
    vip: true,
    premio: 'Bora Bora',
    lideranca: '+0,4%',
    lucros: true,
  },
  {
    n: 12,
    nome: 'Embaixador',
    bloco: 'Liberdade',
    pontos: '150.000 Pts (PG)',
    vme: '20%',
    diretos: '12 diretos',
    vip: true,
    premio: 'Mercedes',
    lideranca: '+0,5%',
    lucros: true,
  },
];

// O medalhao de cada degrau. O nome do arquivo em src/assets/pins/.
//
// LEIA O COMENTARIO INTEIRO ANTES DE MEXER: a pasta tem TREZE medalhoes e a
// escada do deck tem DOZE. O arquivo `embaixador-senior.png` nao corresponde a
// degrau nenhum da pagina 56. Isso nao e erro de importacao: e divergencia
// entre dois materiais da propria empresa, e esta publicada na pagina como
// ponto em aberto, nao resolvida no silencio.
export const PIN = {
  Consultor: 'consultor',
  Empreendedor: 'empreendedor',
  Especialista: 'especialista',
  Supervisor: 'supervisor',
  Gestor: 'gestor',
  Executivo: 'executivo',
  Diretor: 'diretor',
  'Diretor Sênior': 'diretor-senior',
  Acionista: 'acionista',
  'Vice-Presidente': 'vice-presidente',
  Presidente: 'presidente',
  Embaixador: 'embaixador',
};

// O medalhao que sobra. Existe como imagem, nao existe na escada do deck.
export const PIN_ORFAO = {
  arquivo: 'embaixador-senior',
  nome: 'Embaixador Sênior',
};

// ---------------------------------------------------------------------------
// COMO SE GANHA PONTO — deck, paginas 49 e 56 (a mesma tabela, repetida)
// ---------------------------------------------------------------------------
//
// O par e "sem licenca / com licenca VIP". A pontuacao dobra para VIP, com
// excecao do SKY+ com plano, que vai de 0,12 para 0,25.

export const PONTOS_POR_PLANO = [
  { produto: 'Plano Start', sem: '0,35 pt', vip: '0,70 pt' },
  { produto: 'Plano Plus', sem: '0,45 pt', vip: '0,90 pt' },
  { produto: 'Plano Liberty', sem: '0,50 pt', vip: '1 pt' },
  { produto: 'Plano Max', sem: '0,60 pt', vip: '1,20 pt' },
  { produto: 'Plano Ultra', sem: '0,80 pt', vip: '1,60 pt' },
  { produto: 'SKY+ avulso', sem: '0,20 pt', vip: '0,40 pt' },
  { produto: 'SKY+ com plano', sem: '0,12 pt', vip: '0,25 pt' },
];

// Frase do deck, pagina 49, sobre a validade do ponto. E a resposta a pergunta
// "o ponto zera?", que o deck responde e o site nao respondia.
export const PONTO_NAO_ZERA =
  'Enquanto você pagar seu plano em dia, seus pontos nunca zeram.';

// ---------------------------------------------------------------------------
// AS PREMIACOES — deck, paginas 50 a 55 (GoldPoints Fidelity)
// ---------------------------------------------------------------------------
//
// `planosEquivalentes` NAO e conta minha: e o numero que o proprio deck
// imprime em cada pagina, na tarja escura ("Equivalente a N planos Liberty
// 25 GB ativos na rede por 12 meses, voce sendo VIP"). Ele e a informacao mais
// util da secao inteira, porque traduz um premio de viagem em quantidade de
// gente pagando conta — que e a unica coisa que sustenta o premio.
//
// A conta fecha: Liberty VIP vale 1 pt/mes, entao 12 pts/ano por plano ativo.
// 4.000 / 12 = 333. 150.000 / 12 = 12.500. 300.000 / 12 = 25.000.

export const PREMIACOES = [
  {
    premio: 'Cruzeiro',
    pontos: '4.000',
    pontosNumero: 4000,
    planosEquivalentes: '333',
    vme: '20%',
    observacao: 'Acompanhante incluso. O rodapé da página ressalva que taxas portuárias e seguro viagem obrigatório não estão inclusos.',
  },
  {
    premio: 'Caribe, resort all inclusive',
    pontos: '15.000',
    pontosNumero: 15000,
    planosEquivalentes: '1.250',
    vme: '20%',
    observacao: 'Acompanhante incluso.',
  },
  {
    premio: 'Europa',
    pontos: '40.000',
    pontosNumero: 40000,
    planosEquivalentes: '3.333',
    vme: '20%',
    observacao: 'Acompanhante incluso.',
  },
  {
    premio: 'Dubai',
    pontos: '80.000',
    pontosNumero: 80000,
    planosEquivalentes: '6.666',
    vme: '20%',
    observacao: 'Acompanhante incluso.',
  },
  {
    premio: 'Bora Bora',
    pontos: '150.000',
    pontosNumero: 150000,
    planosEquivalentes: '12.500',
    vme: '20%',
    observacao: 'Acompanhante incluso.',
  },
  {
    premio: 'Mercedes',
    pontos: '300.000',
    pontosNumero: 300000,
    planosEquivalentes: '25.000',
    vme: '20%',
    observacao: 'Veículo quitado.',
  },
];

// ---------------------------------------------------------------------------
// A MATRIZ — deck, pagina 45 ("Bonus de Equipe — matriz forcada 3x12")
// ---------------------------------------------------------------------------
//
// AQUI ESTA O ACHADO MAIS IMPORTANTE DO DECK INTEIRO, e e preciso dizer por
// que: as duas linhas de pagamento tem REGRAS DE DATA DIFERENTES, impressas em
// letra pequena embaixo de cada valor.
//
//   - Ganho sobre planos de telefonia: "Pago da 2a fatura em diante"
//   - Ganho sobre licenca VIP:         "Pago no ato da adesao do VIP"
//
// Uma entra no ato. A outra so no segundo mes de uma conta que precisa seguir
// sendo paga. Isso nao e acusacao de ninguem: e o documento da empresa
// explicando, sozinho, por que o meu extrato tem 63,5% de licenca e R$ 0,00 de
// recorrencia. O site afirmava o fato desde o inicio; o deck deu o mecanismo.

export const MATRIZ = {
  formato: 'forçada 3×12',
  porNivel: '1%',
  porNivelSemVip: '0,5%',
  planos: {
    valor: '0,5% ou 1% (VIP)',
    quando: 'Pago da 2ª fatura em diante',
  },
  licencaVip: {
    valor: 'R$ 10,40',
    quando: 'Pago no ato da adesão do VIP',
    restricao: 'Exclusivo para VIPs. Somente VIP ganha sobre VIP.',
  },
  // Destrava de 3 em 3: cada 3 diretos ativos abrem mais 3 niveis de ganho.
  destravas: [
    { diretos: 3, niveis: 3, soma: '3%' },
    { diretos: 6, niveis: 6, soma: '6%' },
    { diretos: 9, niveis: 9, soma: '9%' },
    { diretos: 12, niveis: 12, soma: '12%' },
  ],
  compressao:
    'Compressão dinâmica: se o patrocinador não estiver apto a receber por não estar ativo ou não ter destravado a matriz, o ganho sobe para o próximo ascendente que tenha no mínimo 3 diretos ativos e seja VIP.',
};

// A matriz 3x12 cheia, nivel a nivel — deck, paginas 46 e 47.
//
// O DECK PUBLICA ESTES NUMEROS COMO "POTENCIAL DE GANHOS". O site os reproduz
// por um motivo e so um: para mostrar quantas pessoas eles exigem. Ver
// PESSOAS_MATRIZ_CHEIA abaixo. Nenhuma pagina deste site apresenta estes
// valores como resultado alcancavel, e nenhuma pode passar a apresentar.
export const MATRIZ_CHEIA = {
  niveis: 12,
  // 3^1 + 3^2 + ... + 3^12. Conta minha, a partir dos afiliados por nivel que
  // o deck lista; o deck soma o dinheiro e nao soma as pessoas.
  pessoas: 797160,
  pessoasFormatado: '797.160',
  ultimoNivel: '531.441',
  // Valores que o deck imprime como total.
  totalMes: 'R$ 637.728,00',
  totalAnoLicencas: 'mais de R$ 8 milhões',
  simulacaoBase: 'Simulação baseada no Plano Liberty 25 GB, ganhando 1% (VIP) por afiliado, até o 12º nível.',
};

// ---------------------------------------------------------------------------
// OS BONUS — deck, paginas 48 e 57
// ---------------------------------------------------------------------------

export const MEGA_BONUS = {
  nome: 'Mega Bônus',
  valor: '50% ou 100% (VIP)',
  sobre: 'do valor que seus diretos ganharem na matriz (Bônus de Equipe)',
  // O deck ilustra com dez diretos ganhando R$ 1.000 cada, chegando a
  // R$ 10.000/mes, sob o rotulo "SIMULACAO COMISSAO VIP" em corpo miudo.
  simulacao: 'R$ 10.000/mês',
  simulacaoComo: 'dez diretos ganhando R$ 1.000 cada',
  // A compressao dinamica esta impressa NESTA pagina tambem, nao so na 45: o
  // rodape da 48 a descreve com estas palavras, nomeando o Mega Bonus. Faltava
  // aqui, e por isso a afirmacao parecia sem fonte no post da matriz.
  compressao:
    'Compressão dinâmica: se o patrocinador não estiver apto a receber o Mega Bônus por não estar ativo ou não ter destravado a matriz, o ganho sobe para o próximo ascendente que tenha no mínimo 3 diretos ativos e seja VIP.',
};

// ---------------------------------------------------------------------------
// A LICENCA VIP
// ---------------------------------------------------------------------------
//
// Preco e parcelamento saem do deck institucional. As quatro linhas que ela
// dobra saem do documento "Diferenciais planos de telefonia MOVVA" — duas
// delas o deck confirma por conta propria, e o campo `tambemNoDeck` diz qual.
//
// POR QUE ESTA AQUI: ate 22/10/2026 esses numeros estavam escritos a mao em
// quatro arquivos diferentes. E o mesmo arranjo que deixou a escada divergir
// do documento sem ninguem notar, e que a pagina /planos existe para nao
// repetir com o preco dos planos.
export const LICENCA_VIP = {
  aVista: 'R$ 497',
  aVistaNumero: 497,
  parcelado: '12× R$ 51,13',
  parcelaNumero: 51.13,
  // 12 x 51,13. Calculado, nao escrito: o deck imprime as duas formas lado a
  // lado e nao soma o parcelado nem nomeia a diferenca.
  get totalParcelado() {
    return this.parcelaNumero * 12;
  },
  get acrescimo() {
    return this.totalParcelado - this.aVistaNumero;
  },
  // Ganho exclusivo de VIP sobre licenca de VIP — deck, pagina 45.
  sobreLicencaDeOutro: 'R$ 10,40',
  sobreLicencaDeOutroNumero: 10.4,
};

export const O_QUE_A_LICENCA_DOBRA = [
  {
    linha: 'Indicação direta, por plano indicado',
    sem: 'R$ 5,00',
    vip: 'R$ 10,00',
  },
  {
    linha: 'Matriz global, sobre os planos da sua matriz',
    sem: '0,5%',
    vip: '1%',
    tambemNoDeck: 'página 45',
  },
  {
    linha: 'Matching, sobre o que o seu direto ganha na matriz',
    sem: '50%',
    vip: '100%',
    tambemNoDeck: 'página 48, onde se chama Mega Bônus',
  },
  {
    linha: 'Pontuação do plano de carreira',
    sem: 'normal',
    vip: 'dobrada',
  },
];

// Em quantos lugares do deck a sigla VME aparece. CONTADO, nao escrito a mao:
// a pagina dizia "dezoito" e o numero certo e outro, porque os quatro degraus
// de Fundacao nao trazem VME.
export const LUGARES_COM_VME =
  DEGRAUS.filter((d) => d.vme).length + PREMIACOES.filter((p) => p.vme).length;

export const DESEMPENHO_LIDERANCA = {
  apartirDe: 'Diretor Sênior',
  porPin: '+0,1%',
  teto: '+0,5%',
  frase:
    'Qualifique-se a Diretor Sênior e acima e receba +0,1% a mais no Bônus de equipe a cada novo pin alcançado, podendo chegar a um total de +0,5% a mais em ganhos na Matriz.',
};

// ---------------------------------------------------------------------------
// O QUE O DECK NAO RESOLVE
// ---------------------------------------------------------------------------
//
// A ORDEM importa: a pagina mostra os tres primeiros em destaque.
export const EM_ABERTO_CARREIRA = [
  'Quantos degraus a escada tem, de verdade. O deck publica doze, com Embaixador no topo. Os medalhões oficiais que eu tenho em arquivo são treze, e incluem um "Embaixador Sênior" que não aparece em nenhuma das 66 páginas do deck — nem na escada da página 56, nem na página 57, que lista os cinco pins do bônus de liderança e também para em Embaixador. São dois materiais da mesma empresa dizendo coisas diferentes. Publico os doze porque o deck é o documento mais recente que eu tenho, e registro o décimo terceiro aqui em vez de escondê-lo.',
  'O que significa VME. A sigla aparece em todos os degraus da escada e em todas as seis premiações, sempre com um percentual ao lado, e cai de 50% para 20% conforme se sobe. O deck não a define em nenhuma das 66 páginas. Reproduzo o número como ele está impresso e não traduzo a sigla.',
  'O valor do bônus de adesão. Ele existe: o meu extrato tem R$ 39,92 sob esse rótulo. O deck descreve a indicação direta e a matriz, mas eu não localizei nele a tabela que fixe o valor da adesão por plano.',
  'Se a pontuação de graduação (PG) e os GoldPoints são a mesma contagem. O deck usa "Pts (PG)" na escada e "GoldPoints" nas premiações, com a mesma tabela de pontos por plano nas páginas 49 e 56. Isso sugere uma contagem só, mas o documento não diz isso com todas as letras.',
  'Em quanto tempo o ponto expira se o plano deixar de ser pago. O deck garante que o ponto não zera "enquanto você pagar seu plano em dia", o que descreve a hipótese boa e deixa a ruim sem resposta.',
];

// Quantos planos ativos um premio exige, dito em gente. Usado na pagina para
// nao deixar o leitor sozinho com um numero de seis digitos.
export const premioMaisProximo = (pontos) =>
  PREMIACOES.find((p) => p.pontosNumero >= pontos) ?? null;
