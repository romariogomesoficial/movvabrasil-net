// Fonte unica de verdade do site. Mudou aqui, mudou em todo lugar.
export const SITE = {
  url: 'https://movvabrasil.net',
  name: 'Movva Brasil .net',
  // Slogan oficial da marca, grafia correta. O site antigo trazia "Recompença".
  tagline: 'A vida recompensa quem se move',
  locale: 'pt-BR',
};

export const AUTOR = {
  nome: 'Romário Gomes de Paula',
  papel: 'Distribuidor independente MOVVA',
  // Preencha quando tiver: perfis publicos ajudam o Google e as IAs a te
  // reconhecerem como a mesma entidade em todo lugar.
  perfis: [],
};

// Frase de vinculo. E o que separa divulgacao legitima de representacao
// enganosa, por isso vale conferir onde ela realmente aparece antes de mexer:
// no rodape de toda pagina (Base.astro, .rodape), na description do WebSite no
// JSON-LD, no cartao de compartilhamento (lib/og-cartao.js) e nos arquivos
// llms.txt e llms-full.txt. O cabecalho nao a exibe mais — la o logotipo com
// ".net" e marca, nao aviso. Tirar o rodape deixa a frase fora do HTML.
export const VINCULO =
  'Site de distribuidor independente. Não é canal oficial da MOVVA Brasil Ltda.';

// Link de cadastro do Romario. Unico lugar onde ele existe.
//
// POR QUE E O LINK DIRETO, e nao o "link de divulgacao" que o painel oferece
// em destaque:
//
// O painel da MOVVA entrega tres enderecos. Dois sao funis com VSL; um e
// cadastro direto. Ate 24/10/2026 este site apontava para o funil
// /f/apnmovva, e o conteudo daquela pagina e o oposto exato do que este site
// faz: "ter dinheiro caindo em sua conta ate enquanto dorme", "Renda
// Recorrente Mensal perene para o resto da sua vida", com selo AO VIVO,
// cronometro e o botao "QUERO GANHAR DINHEIRO INFINITO".
//
// Mandar o leitor de trinta paginas de ressalva para "dinheiro infinito"
// gastava no ultimo clique a confianca que o site inteiro constroi. E o funil
// nao estava compensando isso: o painel registra 11 cliques e ZERO cadastros
// nele, e 31 cliques e zero no outro funil.
//
// O link abaixo e o mecanismo canonico da plataforma, nao um atalho: o proprio
// aplicativo monta `/cadastro?ref=${referral_code}` a partir do codigo do
// usuario, e valida o codigo no cadastro por validate_referral_code. A
// atribuicao da comissao e a mesma.
//
// SE FOR TROCAR DE VOLTA, leia DESTINO-DO-LINK.md antes.
export const LINK_AFILIADO = 'https://movvabrasil.com/cadastro?ref=REF-315C1470';

// ---------------------------------------------------------------------------
// O estado do teste em campo. ESTA E A UNICA DEFINICAO: o site inteiro le daqui.
//
// Por que isto existe: a frase "o chip nao chegou" estava escrita a mao em
// treze lugares — onze posts, a home e a pagina de analise. No dia em que ele
// chegar, treze arquivos teriam de mudar juntos, e o que escapasse passaria a
// desmentir o resto do site.
//
// Nao e hipotese. O site de referencia caiu exatamente nessa armadilha: a FAQ
// dele ainda pergunta "quando os chips estarao disponiveis?" enquanto a
// operacao ja roda e os chips ja sairam. Frase de estado envelhece sozinha.
//
// SAO DUAS MUDANCAS, EM DOIS MOMENTOS DIFERENTES, e trocar as duas de uma vez
// e o erro que este bloco passou a impedir:
//
//   1. QUANDO O CHIP CHEGAR: `chegou: true`, e so isso. O site passa a dizer
//      que o produto esta na mao do autor e continua dizendo, em todas as
//      paginas, que NAO existe medicao de campo.
//   2. QUANDO O AUTOR TESTAR EM CAMPO: preencha `testadoEm` com a data. Somente
//      dai o site fica autorizado a falar de medicao.
//
// O site inteiro acompanha as duas, e nenhuma pagina fica para tras.
// ---------------------------------------------------------------------------
// Duas funcoes de apoio para os prazos do chip, que sao DERIVADOS dos carimbos
// do rastreamento em vez de escritos a mao. Os carimbos vem na forma que a
// transportadora mostra, 'DD/MM/AAAA, HH:MM'.
const emMilissegundos = (carimbo) => {
  const [data, hora] = carimbo.split(', ');
  const [dia, mes, ano] = data.split('/').map(Number);
  const [h, min] = hora.split(':').map(Number);
  return Date.UTC(ano, mes - 1, dia, h, min);
};

const horasEntre = (de, ate) => (emMilissegundos(ate) - emMilissegundos(de)) / 36e5;

// "6 dias e 20 horas". O plural e o "e" sao tratados aqui para que nenhuma
// pagina precise montar a frase, e para que nenhuma monte diferente da outra.
const duracaoPorExtenso = (horas) => {
  const dias = Math.floor(horas / 24);
  const resto = Math.round(horas % 24);
  const parteDias = `${dias} ${dias === 1 ? 'dia' : 'dias'}`;
  if (resto === 0) return parteDias;
  const parteHoras = `${resto} ${resto === 1 ? 'hora' : 'horas'}`;
  return dias === 0 ? parteHoras : `${parteDias} e ${parteHoras}`;
};

export const CHIP = {
  pedidoEm: '2026-10-20',

  // VIROU TRUE EM 27/10/2026, as 15:44, no evento "Objeto entregue ao
  // destinatario" registrado pela LOGGI. O QUE ESTE CAMPO AFIRMA, E O QUE NAO
  // AFIRMA: ele diz que a entrega foi registrada pela transportadora que levou
  // o objeto, com data e hora. Nao diz que o autor abriu o pacote, nem que
  // conferiu os dois chips, nem que ativou a linha — e nao diz nada sobre
  // medicao de campo, que e `testadoEm`, abaixo, e que continua null.
  chegou: true,

  // CONTINUA NULL, DE PROPOSITO. Chip entregue nao e chip testado. Enquanto
  // este campo for null, nenhuma pagina deste site pode falar de sinal, de
  // velocidade ou de cobertura medidos por mim — e o getter `testado` existe
  // para garantir isso em 32 paginas de uma vez.
  testadoEm: null,

  // O TRAJETO MEDIDO, lido no rastreamento do escritorio virtual e na pagina da
  // transportadora em 26/10/2026. Nao e estimativa nem promessa da empresa: sao
  // os carimbos de data do envio real.
  //
  // ATENCAO, E O MOTIVO DESTE BLOCO EXISTIR: em 24/10/2026 este site publicou
  // que a entrega "pode passar de 90 dias", apoiado numa frase do painel sobre
  // producao de chips. A frase existe, mas e de OUTRO FLUXO — a compra de
  // PACOTES DE CHIPS NO ATACADO, que o afiliado faz para revender, e que entra
  // num pedido mensal ao fabricante. O chip de quem contrata um plano nao passa
  // por ali. Confundir os dois fez o site publicar um prazo quase trinta vezes
  // maior que o real, contra a empresa.
  trajeto: {
    solicitado: '20/10/2026, 20:01',
    emitido: '21/10/2026, 16:18',
    postado: '23/10/2026, 10:46',
    entregue: '27/10/2026, 15:44',
    ultimoMovimento: '27/10/2026, 15:44',
    ultimoEvento: 'Objeto entregue ao destinatário',
    transportadora: 'LOGGI, via SuperFrete',
    frete: 'R$ 20,00',
    quantidade: 2,
    // Conferido em 27/10/2026 na pagina da transportadora. O painel da MOVVA
    // nao pode ser conferido nesta rodada porque a sessao do escritorio virtual
    // havia expirado — e a entrega e evento da transportadora, nao da MOVVA.
    conferidoEm: '2026-10-27',
    entregaRegistrada: true,

    // OS DOIS PRAZOS SAO DERIVADOS, NAO ESCRITOS A MAO. Este arquivo ja viu o
    // mesmo numero escrito em dois lugares e divergindo; aqui ele e calculado
    // dos proprios carimbos acima, entao nao existe versao velha para ficar
    // para tras quando um carimbo mudar.
    get horasAteEntrega() {
      return horasEntre(this.solicitado, this.entregue);
    },
    get horasDePostagemAEntrega() {
      return horasEntre(this.postado, this.entregue);
    },
    // Frases prontas, porque e isto que as paginas leem. Vao acentuadas.
    get prazoTotal() {
      return duracaoPorExtenso(this.horasAteEntrega);
    },
    get prazoDeEntrega() {
      return duracaoPorExtenso(this.horasDePostagemAEntrega);
    },
  },

  // SAO TRES ESTADOS, NAO DOIS, e a diferenca entre os dois ultimos e a razao
  // de este bloco ter sido reescrito em 26/10/2026.
  //
  // Antes, `chegou: true` fazia o site dizer "o que eu medi em campo esta
  // escrito em cada post". Chegar e medir sao eventos DIFERENTES: o chip pode
  // estar na mao do autor por dias antes de qualquer medicao de sinal, e nesse
  // intervalo a frase antiga afirmaria medicao que nao existe — em treze
  // paginas de uma vez. `testado` e o unico campo que autoriza falar de
  // medicao, e ele depende de `testadoEm`, nao de `chegou`.
  get testado() {
    return this.chegou && Boolean(this.testadoEm);
  },

  // Atencao ao escrever aqui: estas frases NAO sao comentario, sao texto que o
  // visitante le em treze paginas. Vao com acento, ao contrario do resto deste
  // arquivo.
  get frase() {
    if (!this.chegou) {
      return 'Contratei o plano, o chip ainda não chegou e não testei nada em campo.';
    }
    if (!this.testadoEm) {
      // A versao longa desta frase terminava em "— entao aqui nao ha medicao de
      // sinal, de velocidade nem de cobertura", e foi encurtada depois de ver o
      // render: em /avisos-legais e /termos-de-uso a frase ANTERIOR da pagina ja
      // e "Nao ha medicao de rede neste site", e as duas juntas diziam a mesma
      // coisa duas vezes. O que esta frase precisa afirmar e so o estado.
      return 'Contratei o plano e o chip chegou. Ainda não testei nada em campo.';
    }
    return 'Contratei o plano, o chip chegou e eu testei em campo. O que eu medi está escrito em cada post, com a data da medição.';
  },

  // A versao curta, para onde o espaco e apertado (cartao, selo, tabela).
  get curta() {
    return this.testado ? 'testado em campo' : 'falta testar em campo';
  },
};

// Dados verificaveis da empresa. Cada um com a fonte primaria que comprova.
// Isto e o combustivel de GEO: IA cita quem linka documento conferivel.
export const EMPRESA = {
  razaoSocial: 'MOVVA BRASIL LTDA',
  cnpj: '28.450.689/0001-75',
  constituicao: '18 de agosto de 2017',
  endereco: 'Avenida Paulista, 1842, Conjunto 178, Bela Vista, São Paulo/SP, CEP 01310-923',
  atoAnatel: 'Ato nº 9021, de 08 de julho de 2026',
  processoSei: '53500.063559/2026-13',
  jucesp: '1.351.801/26-0',
  parceiroSmp: 'ISPS do Brasil S.A. (TIP Brasil)',
  infraestrutura: 'ARQIA (Grupo Datora)',
  fontes: {
    receita: 'https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp',
    anatel: 'https://sei.anatel.gov.br/sei/modulos/pesquisa/md_pesq_processo_pesquisar.php?acao_externa=protocolo_pesquisar&acao_origem_externa=protocolo_pesquisar&id_orgao_acesso_externo=0',
  },
};
