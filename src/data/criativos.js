// Os criativos que o build gera.
//
// REGRA QUE GOVERNA ESTA LISTA, e que nao e minha opiniao:
// criativo publico fala de PRODUTO. A oportunidade nao e criativo, e conversa.
//
// A razao esta em site/REGRAS-CRIATIVO.md. Resumo: a Meta trata remuneracao
// ligada a recrutamento em "Conteudo proibido sobre investimentos", e esse e o
// enquadramento que custa o perfil, nao so o anuncio. No Brasil ainda incide a
// Lei 1.521/51 art. 2 IX.
//
// Por isso nao existe, aqui, entrada sobre plano de carreira, matriz, bonus,
// equipe ou qualquer valor de ganho. O template tambem nao tem campo para isso.
//
// Numeros de produto vieram da apresentacao oficial da MOVVA (paginas 31 e 32).
// Confira antes de publicar: preco muda, e quem responde pelo que esta na peca
// e quem publica.
//
// SEGUNDA REGRA, aprendida tres vezes neste arquivo: a peca paga viaja SOZINHA.
// O rodape obrigatorio de lib/criativo.js carrega #publi, "Distribuidor
// independente MOVVA" e o aviso de canal nao oficial — e mais nada. Nao ha
// campo de fonte nem de data. Entao toda condicao que o documento impoe tem de
// caber DENTRO da frase, ou a frase afirma mais do que a fonte sustenta.
//
// Ja aconteceu tres vezes: com "nao tem custo" na portabilidade, com
// "infinitos" no acumulo, e com "contrato de rede" na analise. As tres estao
// comentadas abaixo, no lugar onde aconteceram.

import { RECOMENDADO, CONFERIDO_EM } from './planos.js';

// Data curta: no corpo fixo do apoio o formato longo ("21 de outubro de 2026")
// nao cabe sem empurrar a frase para fora da peca.
const dataCurta = (iso) => iso.split('-').reverse().join('/');

export const CRIATIVOS = [
  {
    chave: 'portabilidade',
    chapeu: 'Portabilidade',
    titulo: 'Seu número continua o mesmo',
    // ATENCAO ao mexer nesta frase. O art. 92 do RGST veda a cobranca pela
    // prestadora DOADORA, e so isso. O art. 70 do mesmo RGST permite que a
    // prestadora RECEPTORA cobre do usuario, com teto em Ato do Conselho
    // Diretor, e o § 3º a autoriza a dispensar a cobranca — e o que acontece na
    // pratica, por escolha comercial, nao por direito do usuario. Dizer "nao
    // tem custo" numa peca paga e afirmar direito que a norma nao da.
    // O "teto de R$ 4,00 da Anatel" tambem segue nao confirmado: o Ato exigido
    // pelo art. 70, § 1º nao foi aberto. Peca paga nao pode afirmar o que o
    // proprio site desautoriza.
    apoio: 'Levar o número para outra operadora leva até 3 dias úteis e quem você deixa não pode cobrar pela saída — é o art. 92 do RGST.',
    formatos: ['quadrado', 'story', 'miniatura'],
  },
  {
    chave: 'liberty-preco',
    chapeu: 'Plano Liberty',
    // Preco e franquia vem de planos.js, a unica definicao. Escritos a mao
    // aqui, divergiriam dela no dia em que o preco mudar — que e exatamente o
    // erro do index.astro que fez a pagina /planos existir.
    titulo: `${RECOMENDADO.gb} GB por R$ ${RECOMENDADO.preco} por mês`,
    // ATENCAO: toda pagina do site publica este numero ATRIBUIDO e DATADO
    // (planos.astro linha 87, perguntas.js, quanto-custa-o-primeiro-mes.md).
    // Esta peca o publicava como fato proprio, sem dizer de onde vem nem
    // quando foi conferido — e e a unica coisa que a pessoa ve. O deck nao
    // traz data de emissao, por isso a peca manda conferir o valor vigente.
    apoio: `Preço anunciado pela MOVVA, conferido em ${dataCurta(CONFERIDO_EM)}. Confira o valor vigente e a cobertura na sua região antes de contratar.`,
    formatos: ['quadrado', 'story'],
  },
  {
    chave: 'gigas-acumulam',
    chapeu: 'Franquia',
    titulo: 'O que sobra fica para o mês seguinte',
    // "Infinitos" saiu daqui. A palavra esta no documento oficial de
    // diferenciais da empresa, mas o site nao a afirma: ele a atribui ("a MOVVA
    // anuncia") e registra que nao achou contrato fixando o prazo do saldo.
    // Peca paga nao pode afirmar como fato o que o proprio site marca como nao
    // confirmado — e o mesmo erro que a frase da portabilidade cometia.
    //
    // O que ficou e o que as duas versoes sustentam: o saldo passa para o ciclo
    // seguinte. Se o saldo morre depois de um mes ou rola indefinidamente e
    // justamente o que esta em aberto, entao a peca nao toca nisso.
    //
    // SEGUNDA PASSADA, 22/10/2026: tirar "infinitos" nao bastou. O deck diz
    // "PAGANDO ATE A DATA DO VENCIMENTO, seus gigas nao utilizados permanecem
    // disponiveis no proximo mes" — o acumulo tem condicao, e ela e material:
    // internet-que-acumula.md registra que atraso mexe no saldo e que eu nao
    // sei quanto. A peca afirmava o acumulo sem condicao nenhuma, enquanto
    // perguntas.js, planos.js, index.astro e movva-vivo-claro-tim.md todos a
    // carregam. Numa peca sem rodape de fonte, a condicao tem de estar na
    // frase.
    apoio: 'Pagando até a data do vencimento, o que você não usou fica disponível no mês seguinte — é o que a MOVVA anuncia.',
    formatos: ['quadrado', 'story'],
  },
  {
    chave: 'sem-fidelidade',
    chapeu: 'Sem fidelidade',
    titulo: 'Sem prazo de permanência',
    apoio: 'Planos sem prazo de permanência e sem multa de cancelamento. Se não servir para você, é só sair.',
    formatos: ['quadrado', 'story', 'miniatura'],
  },
  {
    chave: 'operadora-virtual',
    chapeu: 'Entenda',
    titulo: 'Operadora virtual pega bem?',
    apoio: 'O sinal é o da rede que tem antena. Explico o que muda e o que não muda.',
    formatos: ['quadrado', 'miniatura'],
  },
  {
    chave: 'confiavel',
    chapeu: 'Análise',
    titulo: 'A MOVVA é confiável?',
    // ATENCAO: "contrato de rede" saiu desta frase em 22/10/2026, e a razao e a
    // mesma das outras duas correcoes deste arquivo. A peca prometia FONTE
    // PUBLICA para a cadeia de rede — e a pagina que ela divulga tirou a cadeia
    // de rede da lista do verificavel justamente porque eu nao consegui abrir
    // registro publico que a comprove (movva-e-confiavel.astro, "o que eu tirei
    // desta lista"). EMPRESA.fontes, no site.js, tem duas fontes publicas e so
    // duas: Receita e Anatel. A peca prometia um terceiro link que nao existe.
    apoio: 'CNPJ e outorga da Anatel, com as fontes públicas linkadas — e a cadeia de rede, que eu não consegui confirmar em registro público.',
    formatos: ['quadrado', 'miniatura'],
  },
];

export function listarPecas() {
  const pecas = [];
  for (const c of CRIATIVOS) {
    for (const formato of c.formatos) {
      pecas.push({ ...c, formato, rota: `${c.chave}-${formato}` });
    }
  }
  return pecas;
}
