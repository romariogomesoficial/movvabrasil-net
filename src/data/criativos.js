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
    // O "teto de R$ 4,00 da Anatel" circula em muito site, mas o dispositivo
    // que o estabeleca nao foi localizado — o post trata o valor como nao
    // confirmado. Peca paga nao pode afirmar o que o proprio site desautoriza.
    apoio: 'Levar o número para outra operadora leva até 3 dias úteis e, para você, não tem custo — o art. 92 do RGST põe a despesa fora do usuário.',
    formatos: ['quadrado', 'story', 'miniatura'],
  },
  {
    chave: 'liberty-preco',
    chapeu: 'Plano Liberty',
    titulo: '25 GB por R$ 79,90 por mês',
    apoio: 'Portabilidade inclusa, gigas acumulativos e sem prazo de permanência. Confira a cobertura na sua região antes de contratar.',
    formatos: ['quadrado', 'story'],
  },
  {
    chave: 'gigas-acumulam',
    chapeu: 'Franquia',
    titulo: 'O que sobra fica para o mês seguinte',
    apoio: 'Gigas acumulativos infinitos: o que você não usou no mês fica para o ciclo seguinte, em vez de virar pó.',
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
