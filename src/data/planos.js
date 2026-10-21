// Os planos de telefonia da MOVVA. ESTA E A UNICA DEFINICAO.
//
// Por que saiu da home: preco e a informacao que mais envelhece num site de
// operadora, e ate agora ele existia escrito a mao dentro de index.astro. Uma
// pagina /planos lendo de um lado e a home de outro e a forma mais rapida de
// acabar com duas tabelas que se desmentem — foi o que aconteceu com a frase
// do chip, e a licao ja esta em CHIP, no site.js.
//
// DE ONDE VEM: tabela publicada no material da empresa, conferida em
// 21/10/2026. Os cinco nomes e as cinco franquias sao da MOVVA; o que e MEU
// esta marcado campo a campo abaixo, e so isso.
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

// Os seis diferenciais do documento oficial "Diferenciais planos de telefonia
// MOVVA", na ordem em que a empresa os numera. Sao dela, nao meus: por isso o
// texto fica proximo do original e nao ganha adjetivo de vendedor.
//
// O sexto — "cliente pode zerar a conta de celular" — e o programa de
// indicacao. Ele mora em /oportunidade, com os meus numeros reais, e fica
// FORA da home e da pagina de planos de proposito: estas duas paginas falam de
// plano de celular, e e isso que as mantem anunciaveis no Meta e no Google.
export const DIFERENCIAIS = [
  {
    n: 1,
    titulo: 'Dupla conectividade',
    texto: 'Duas redes num chip só: TIM e VIVO. O aparelho usa a que estiver melhor no lugar onde você está.',
    emTodos: true,
  },
  {
    n: 2,
    titulo: 'Gigas acumulativos',
    texto: 'O que sobra da franquia não vira pó no fim do mês: acumula.',
    emTodos: true,
  },
  {
    n: 4,
    titulo: 'MOVVA Club',
    texto: 'Clube de benefícios incluído no plano.',
    emTodos: true,
  },
  {
    n: 5,
    titulo: 'Sem fidelidade',
    texto: 'Não há prazo mínimo de permanência nem multa para sair.',
    emTodos: true,
  },
  {
    n: 6,
    titulo: 'Portabilidade',
    texto: 'Dá para levar o número que você já tem, de qualquer operadora.',
    emTodos: true,
  },
];

// O que eu AINDA NAO consegui confirmar sobre os planos. Isto fala do produto,
// nao de mim — e por isso vai para a tela, e conta na faixa de conferencia.
export const EM_ABERTO = [
  'A velocidade depois que a franquia acaba. O material que eu tenho não diz se o plano reduz a velocidade ou corta os dados.',
  'O limite dos gigas acumulativos. O documento oficial diz "infinitos"; eu não achei o contrato que fixe por quanto tempo o saldo fica válido.',
  'O que exatamente o MOVVA Club oferece. Eu tenho o nome do benefício, não a lista de parceiros.',
  'Quais aparelhos aceitam a dupla conectividade em eSIM, e se ela funciona igual no chip físico.',
];
