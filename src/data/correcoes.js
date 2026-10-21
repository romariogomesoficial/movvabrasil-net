// O que este site publicou errado, e o que passou a dizer.
//
// Por que existe: todo site erra. O que quase nenhum faz é contar. Num site
// cuja premissa é separar o que está verificado do que não está, esconder a
// correção destruiria a premissa — e assumir em público é a única prova de
// método que não dá para copiar sem ter feito o trabalho.
//
// Ordem: mais recente primeiro.
//
// Cada entrada carrega "comoApareceu" de propósito. O erro, qualquer um tem;
// o que distingue é o processo que o encontra. Quem lê a coluna inteira vê
// que foram encontrados por revisão, por leitura da fonte primária e por
// medição — não por alguém reclamar.

export const CORRECOES = [
  {
    data: '2026-10-21',
    onde: '/movva-e-confiavel',
    dizia:
      'Existe uma página da Movva no Reclame Aqui, mas em outubro de 2026 ela ainda não tinha reputação definida.',
    agora:
      'Não localizei página da MOVVA BRASIL LTDA no Reclame Aqui. A página chamada "Movva" que aparece na busca é de outra empresa: CNPJ 16.896.559/0001-81, consultoria em gestão.',
    porque:
      'Eu havia confundido duas empresas de nome parecido. A resposta estava dentro de um bloco de perguntas frequentes marcado em schema.org, que é o formato que buscadores e assistentes de IA extraem para responder — ou seja, o erro tinha alcance maior do que a página.',
    comoApareceu:
      'Ao escrever o post sobre o Reclame Aqui, conferindo CNPJ por CNPJ em vez de pelo nome.',
    gravidade: 'fato errado',
  },
  {
    data: '2026-10-21',
    onde: 'Página inicial',
    dizia:
      'A Lei 13.116/2015 e a Resolução 777/2025 da Anatel obrigam o compartilhamento dessa rede.',
    agora:
      'O Capítulo XII do RGST, anexo à Resolução Anatel nº 777/2025, regula esse arranjo: quem recebe pedido de compartilhamento de rede tem 60 dias corridos para responder e justificar a recusa, e o preço de atacado é de livre negociação.',
    porque:
      'Dois erros somados. A Lei 13.116/2015 é a Lei das Antenas e trata de infraestrutura física — torre, poste, duto —, não de acesso de rede para operadora virtual. E nenhuma das duas normas obriga a dona da rede a compartilhar: ela obriga a responder e a justificar a recusa, que é coisa diferente e menos favorável ao leitor.',
    comoApareceu:
      'Numa revisão que comparou a página inicial com os posts do próprio site, que já traziam a norma certa.',
    gravidade: 'fato errado',
  },
  {
    data: '2026-10-21',
    onde: 'Página inicial',
    dizia:
      'Seis características do plano afirmadas em voz própria, como fatos verificados.',
    agora:
      'As mesmas seis, atribuídas ao documento oficial "Diferenciais planos de telefonia MOVVA", da própria empresa.',
    porque:
      'Eu havia escrito a página a partir do material de vendas, sem abrir o documento da empresa que estava na pasta do projeto. Depois corrigi para o extremo oposto, marcando cinco das seis com um selo de dúvida — o que fez a página parecer desconfiar do próprio produto. As duas versões erraram pelo mesmo motivo: ninguém tinha lido a fonte.',
    comoApareceu:
      'A primeira versão foi apanhada por revisão; a segunda, pelo dono do site, que apontou excesso de ressalva e tinha razão.',
    gravidade: 'alegação sem fonte',
  },
  {
    data: '2026-10-21',
    onde: '/blog/virtual-ou-tradicional e /blog/operadora-sem-fidelidade',
    dizia: 'A operadora tem dez dias corridos para responder a sua reclamação.',
    agora:
      'Direto na operadora, a reclamação tem de ser resolvida em até 7 dias corridos (RGC, art. 10, caput). Os dez dias são outro balcão: é o prazo para responder reclamação encaminhada pela Anatel.',
    porque:
      'O prazo de dez dias existe, mas em outro canal. Quem lesse esperaria três dias a mais antes de escalar, e perderia a janela de recorrer à agência a partir do oitavo dia.',
    comoApareceu: 'Conferindo o artigo citado contra o texto do regulamento.',
    gravidade: 'fato errado',
  },
  {
    data: '2026-10-21',
    onde: '/blog/cobertura-zona-rural e /blog/celular-sem-sinal-em-casa',
    dizia: 'O RQUAL obriga a operadora a publicar mapa de cobertura por tecnologia.',
    agora:
      'O art. 28, IV do RQUAL obriga a informar a cobertura por tecnologia e a dar acesso ao mapa da Anatel — não a publicar mapa próprio.',
    porque:
      'A diferença muda o que você pode exigir: pedir um mapa que a norma não obriga a existir leva a uma recusa legítima e à impressão errada de que a operadora está escondendo algo.',
    comoApareceu: 'Revisão de exatidão das citações de norma, artigo por artigo.',
    gravidade: 'fato errado',
  },
  {
    data: '2026-10-21',
    onde: '/blog/cobertura-zona-rural',
    dizia:
      'O PERT 2026 soma 26.442 localidades, abertas em 11.092 do IBGE e 15.040 de fora — total que é leitura do PERT, porque as categorias se sobrepõem e a soma das duas dá 26.132.',
    agora:
      'O PERT 2026 resume o desafio em 26.442 localidades sem cobertura e sem obrigação de atendimento. A abertura por categoria saiu, e está declarada como não confirmada.',
    porque:
      'A ressalva era logicamente impossível: se categorias se sobrepõem, a soma das partes fica maior que o total, nunca menor. Eu havia construído uma explicação de método para encobrir um número mal transcrito. Num site que separa o verificado do alegado, fabricar nota de método é o pior defeito possível.',
    comoApareceu: 'Revisão adversarial, que refez a aritmética em vez de aceitá-la.',
    gravidade: 'raciocínio inválido',
  },
  {
    data: '2026-10-21',
    onde: 'Criativos de anúncio',
    dizia:
      'Levar o número para outra operadora leva até 3 dias úteis e custa no máximo R$ 4,00, pela regra da Anatel.',
    agora:
      'Levar o número leva até 3 dias úteis e, para você, não tem custo — o art. 92 do RGST põe a despesa fora do usuário.',
    porque:
      'O teto de R$ 4,00 circula em muito site como se fosse regra da Anatel, mas o dispositivo que o estabeleça nunca foi localizado. Peça paga não pode afirmar o que o próprio site trata como não confirmado.',
    comoApareceu:
      'Uma revisão que comparou o que os anúncios diziam com o que as páginas diziam, e achou três versões do mesmo fato.',
    gravidade: 'alegação sem fonte',
  },
  {
    data: '2026-10-21',
    onde: '/blog/virtual-ou-tradicional',
    dizia:
      'Quem presta por autorização de rede virtual é que constitui Serviço de Telecomunicações (art. 239).',
    agora:
      'A prestação do SMP por autorizada de rede virtual constitui Serviço de Telecomunicações (RGST, art. 239).',
    porque:
      'O sujeito estava trocado: é a prestação que constitui o serviço, não a pessoa que presta. E o "é que" acrescentava uma exclusividade que a norma não enuncia.',
    comoApareceu:
      'Abrindo o Anexo da Resolução 777/2025 para conferir uma citação que havia entrado numa correção anterior sem ninguém ter lido a fonte.',
    gravidade: 'citação imprecisa',
  },
];
