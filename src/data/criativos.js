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
    titulo: '25 GB por R$ 79,90 por mês',
    apoio: 'Leve o seu número, gigas acumulativos e sem prazo de permanência. Confira a cobertura na sua região antes de contratar.',
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
    apoio: 'Gigas acumulativos: o que você não usou no mês fica para o ciclo seguinte, em vez de virar pó.',
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
    apoio: 'CNPJ, outorga da Anatel e contrato de rede — com as fontes públicas linkadas.',
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
