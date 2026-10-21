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

// Link de divulgacao do Romario. Unico lugar onde ele existe.
export const LINK_AFILIADO = 'https://movvabrasil.com/f/apnmovva?ref=024E6ED7';

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
