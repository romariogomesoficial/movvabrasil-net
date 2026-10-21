// Tudo que o visitante usa para falar com voce fica aqui. Mudou aqui, mudou em
// todo lugar: fim de post, paginas principais e pagina de contato.

// Numero no formato que o WhatsApp exige: pais + DDD + numero, so digitos.
export const WHATSAPP = '5531995530396';

// PREENCHA com o SEU horario de atendimento. Nao copiei de ninguem.
// Declarar horario e melhor que prometer resposta imediata: quem escreve fora
// da janela ja sabe que vai esperar, e nao fica com a impressao de abandono.
export const ATENDIMENTO = {
  // Deixe a lista vazia para o site nao exibir horario nenhum.
  linhas: [
    // 'Segunda a sexta, 9h às 18h',
    // 'Sábado, 9h às 12h',
  ],
  // Mostrado quando nao ha horario declarado.
  semHorario: 'Respondo assim que vejo. Pode mandar a qualquer hora.',
};

// Mensagem que ja vai escrita quando a pessoa abre a conversa. Serve para voce
// saber de qual pagina ela veio, sem precisar perguntar.
const MENSAGENS = {
  plano: 'Oi, Romário. Vi o seu site e quero entender o plano de celular da MOVVA.',
  cobertura: 'Oi, Romário. Quero saber se a cobertura funciona bem na minha região.',
  portabilidade: 'Oi, Romário. Quero levar o meu número para a MOVVA e tenho dúvidas sobre a portabilidade.',
  programa: 'Oi, Romário. Li a página sobre o programa de afiliados e quero conversar.',
  duvida: 'Oi, Romário. Vi o seu site e fiquei com uma dúvida.',
};

export function linkWhatsApp(contexto = 'duvida') {
  const texto = MENSAGENS[contexto] ?? MENSAGENS.duvida;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

// Numero formatado para aparecer como texto na tela. Mostrar o numero, e nao so
// o botao, ajuda quem prefere salvar o contato ou usa outro aparelho.
export const WHATSAPP_VISIVEL = '(31) 99553-0396';
