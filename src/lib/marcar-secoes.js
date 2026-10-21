// Plugin de build que marca, no HTML gerado dos posts, as duas seções que são
// a assinatura editorial do site.
//
// POR QUE NO BUILD, E NÃO NA MÃO
// "O que eu não consegui confirmar" aparece em todos os posts e é o que mais
// distingue este site dos concorrentes — mas em Markdown é um ## igual aos
// outros, sem jeito de receber classe. Marcar aqui faz todo post, inclusive os
// que ainda não existem, ganhar o tratamento visual sozinho.
//
// Sem dependência: o plugin percorre só os filhos diretos da raiz, que é onde
// vivem os títulos e os parágrafos de um documento Markdown.

const PADROES = [
  {
    teste: /n[ãa]o\s+(consegui\s+)?confirm/i,
    classeTitulo: 'secao-aberta__titulo',
    classeBloco: 'secao-aberta',
  },
];

function textoDe(no) {
  if (no.type === 'text') return no.value;
  if (!no.children) return '';
  return no.children.map(textoDe).join('');
}

function addClasse(no, classe) {
  no.properties = no.properties || {};
  const atual = no.properties.className || [];
  no.properties.className = Array.isArray(atual) ? [...atual, classe] : [atual, classe];
}

export function marcarSecoes() {
  return (tree) => {
    const filhos = tree.children || [];
    let dentro = null;

    for (const no of filhos) {
      if (no.type !== 'element') continue;

      if (no.tagName === 'h2') {
        const texto = textoDe(no);
        const achado = PADROES.find((p) => p.teste.test(texto));
        if (achado) {
          dentro = achado;
          addClasse(no, achado.classeTitulo);
        } else {
          dentro = null;
        }
        continue;
      }

      // Um h1 ou um separador também encerram a seção.
      if (no.tagName === 'h1' || no.tagName === 'hr') {
        dentro = null;
        continue;
      }

      if (dentro) addClasse(no, dentro.classeBloco);
    }
  };
}
