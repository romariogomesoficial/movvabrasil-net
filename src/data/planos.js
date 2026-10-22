// Os planos de telefonia da MOVVA. ESTA E A UNICA DEFINICAO.
//
// Por que saiu da home: preco e a informacao que mais envelhece num site de
// operadora, e ate agora ele existia escrito a mao dentro de index.astro. Uma
// pagina /planos lendo de um lado e a home de outro e a forma mais rapida de
// acabar com duas tabelas que se desmentem — foi o que aconteceu com a frase
// do chip, e a licao ja esta em CHIP, no site.js.
//
// DE ONDE VEM: a tabela esta na pagina 31 do deck institucional da MOVVA, sob
// o titulo "Nossos Planos — Sem pegadinhas. Sem asteriscos. Preto no branco.",
// com os cinco cards nomeados, a franquia e o preco de cada um. Conferido na
// propria imagem em 21/10/2026, e bate com os cinco valores abaixo.
//
// Este arquivo ja errou nos DOIS sentidos, e vale guardar como foi:
//
//   1. A primeira versao dizia "tabela publicada no material da empresa", sem
//      ter aberto documento nenhum. Era chute que acertou.
//   2. A segunda corrigiu para "material de DIVULGACAO DA REDE, nao documento
//      da MOVVA", porque o unico documento oficial aberto ate ali era o de
//      diferenciais, que tem doze paginas e nenhum preco. Era rigor com
//      informacao incompleta — e deixou a atribuicao errada para o outro lado.
//   3. Esta ve a tabela, na pagina, no deck da empresa.
//
// A licao nao e "o rigor atrapalhou". E que afirmar a origem de um numero sem
// ter aberto a fonte erra nos dois sentidos, e o unico jeito de parar de errar
// e abrir o documento — foram 66 paginas de imagem, sem camada de texto, que
// nenhuma busca por palavra encontrava.
//
// O deck NAO traz data de emissao nem numero de versao. Isso esta em EM_ABERTO.
//
// O que e MEU, e nao da MOVVA nem da rede, esta marcado campo a campo abaixo.
//
// QUANDO O PRECO MUDAR: mude aqui. A home, a pagina /planos, o cartao de
// compartilhamento e o llms.txt acompanham sozinhos.
//
// ATENCAO: os comentarios deste arquivo vao sem acento, como no resto do
// projeto, mas os campos `perfil`, `texto` e EM_ABERTO NAO sao comentario —
// sao frases que o visitante le na tela. Vao acentuadas.

// Data em que eu conferi a tabela pela ultima vez. Aparece na tela: preco sem
// data de conferencia e preco que o leitor nao tem como avaliar.
export const CONFERIDO_EM = '2026-10-21';

export const PLANOS = [
  {
    slug: 'start',
    nome: 'Start',
    gb: 10,
    preco: '58,90',
    precoNumero: 58.9,
    // `nota` e minha: e recomendacao, nao dado da empresa.
    nota: 'Para quem usa pouco dado',
    // `perfil` tambem e meu. Serve a quem chega pela busca "qual plano
    // escolher" e nao quer ler a tabela inteira.
    perfil: 'Quem fica quase sempre no Wi-Fi e usa o celular fora de casa para mensagem, mapa e ligação.',
  },
  {
    slug: 'plus',
    nome: 'Plus',
    gb: 15,
    preco: '73,90',
    precoNumero: 73.9,
    nota: 'Uso leve com folga',
    perfil: 'Uso parecido com o Start, mas sem precisar vigiar o consumo no fim do mês.',
  },
  {
    slug: 'liberty',
    nome: 'Liberty',
    gb: 25,
    preco: '79,90',
    precoNumero: 79.9,
    nota: 'O que eu mais indico',
    perfil: 'Redes sociais e vídeo todo dia fora do Wi-Fi. É onde a franquia para de ser apertada sem o preço dobrar.',
    destaque: true,
  },
  {
    slug: 'max',
    nome: 'Max',
    gb: 35,
    preco: '96,90',
    precoNumero: 96.9,
    nota: 'Para quem trabalha no celular',
    perfil: 'Quem usa o celular como ferramenta de trabalho: rota, maquininha, grupo de cliente, vídeo o dia inteiro.',
  },
  {
    slug: 'ultra',
    nome: 'Ultra',
    gb: 50,
    preco: '126,90',
    precoNumero: 126.9,
    nota: 'Para quem consome muito dado',
    perfil: 'Quem usa o celular como internet principal, inclusive para rotear para outros aparelhos.',
  },
];

export const RECOMENDADO = PLANOS.find((p) => p.destaque);

// O que vem em todo plano. ATENCAO A ORIGEM, que nao e uma so:
//
// Os cinco cards da pagina 31 listam OITO itens, identicos entre os cinco — o
// que e util: nao ha diferenca de beneficio entre os planos, so de franquia.
// Sao eles: WhatsApp ilimitado, ligacoes ilimitadas, portabilidade inclusa,
// dados acumulativos, MOVVA Club gratis, cashback para cliente, sem fidelidade
// e sem multa de cancelamento. Desses oito, "sem fidelidade" e "sem multa"
// entram juntos numa entrada so, e o cashback fica de fora (ver abaixo).
//
// A DUPLA CONECTIVIDADE NAO ESTA NESSES CARDS. Ela vem de outro ponto do deck,
// que descreve "Rede TIM + Roaming da VIVO", e entra nesta lista porque vale
// igual nos cinco planos. Dizer que ela saiu dos cards seria atribuir a
// pagina errada — e este arquivo ja errou atribuicao duas vezes, nos dois
// sentidos, como o comentario do topo registra.
//
// O texto fica proximo do original e nao ganha adjetivo de vendedor: isto e
// afirmacao da empresa sobre o proprio produto, nao verificacao minha.
//
// A versao anterior desta lista vinha do documento de diferenciais e tinha
// cinco itens. Faltavam tres que o deck lista e o site nunca publicou:
// ligacoes ilimitadas, WhatsApp ilimitado e ausencia de multa de cancelamento.
//
// Fica FORA daqui, de proposito, o "cashback para cliente" que os cards tambem
// trazem: e o programa de indicacao, mora em /oportunidade com os numeros
// reais, e manter a home e a pagina de planos falando so de plano de celular e
// o que as mantem anunciaveis no Meta e no Google.
export const DIFERENCIAIS = [
  {
    n: 1,
    titulo: 'Dupla conectividade',
    texto: 'Rede TIM mais roaming da Vivo, num chip só — é assim que o deck da empresa descreve.',
    emTodos: true,
  },
  {
    n: 2,
    titulo: 'Gigas acumulativos',
    texto: 'Pagando até a data do vencimento, o que sobrou fica disponível no mês seguinte.',
    emTodos: true,
  },
  {
    n: 3,
    titulo: 'Ligações ilimitadas',
    texto: 'Sem contagem de minutos, em todos os cinco planos.',
    emTodos: true,
  },
  {
    n: 4,
    titulo: 'WhatsApp ilimitado',
    texto: 'Mensagens, áudios e arquivos fora da franquia de dados.',
    emTodos: true,
  },
  {
    n: 5,
    titulo: 'MOVVA Club',
    texto: 'Clube de descontos e cashback em mais de 30 mil estabelecimentos, incluído no plano.',
    emTodos: true,
  },
  {
    n: 6,
    titulo: 'Sem fidelidade',
    texto: 'Sem prazo mínimo de permanência e sem multa de cancelamento.',
    emTodos: true,
  },
  {
    n: 7,
    titulo: 'Portabilidade inclusa',
    texto: 'Dá para levar o número que você já tem, de qualquer operadora.',
    emTodos: true,
  },
];

// O que eu AINDA NAO consegui confirmar sobre os planos. Isto fala do produto,
// nao de mim — e por isso vai para a tela, e conta na faixa de conferencia.
// Quatro itens sairam daqui em 21/10/2026, fechados pelo deck institucional:
// a origem dos precos, o mecanismo da dupla conectividade, o prazo do saldo
// acumulado e o que o MOVVA Club oferece. Dois entraram no lugar.
// A ORDEM desta lista importa: a home mostra os TRES PRIMEIROS, e eles foram
// escolhidos pelo criterio de "o que custa dinheiro ou muda a experiencia de
// quem esta prestes a pagar". Os dois ultimos — a data do deck e o eSIM — sao
// verdadeiros e menos decisivos, entao ficam so na pagina de planos.
// Mexeu na ordem? A home muda junto. Ela corta com slice(0, 3).
export const EM_ABERTO = [
  'A velocidade depois que a franquia acaba. O deck não diz se o plano reduz a velocidade, corta os dados ou vende pacote extra, nem a que preço.',
  'O preço do chip e da entrega, e se entram à parte ou já na primeira mensalidade. O deck só diz "adquira seu chip e ative o plano".',
  'Por qual contrato a Vivo entra. O deck descreve a dupla conectividade como "Rede TIM + Roaming da VIVO". O art. 66, § 4º, do PGMC veda o roaming permanente, definido como acampamento fora da área de prestação por mais de 90 dias corridos — regra que vincula as prestadoras, não você. O limite se mede por área de prestação, que é o alcance da outorga, e não por cobertura; e a norma permite contrato com mais de uma prestadora de origem na mesma área de registro (RGST, arts. 217, parágrafo único, e 241, § 2º), desenho em que o art. 66 não se aplica. Eu não achei documento da empresa dizendo qual é a prestadora de origem e sob qual instrumento a Vivo entra.',
  'A data do deck. Os preços, a franquia e os benefícios desta página saem do deck institucional da MOVVA, que não traz data de emissão nem número de versão. É a melhor fonte que eu tenho e ainda assim não se data sozinha — então confirme o valor vigente na página de contratação antes de pagar.',
  'Quais aparelhos aceitam a dupla conectividade em eSIM, e se ela funciona igual no chip físico. O deck não trata de eSIM.',
];
