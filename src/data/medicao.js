// Medição de audiência.
//
// POR QUE CLOUDFLARE WEB ANALYTICS, E NÃO GOOGLE ANALYTICS
// O Google Analytics usa cookie e trata dado pessoal: no Brasil isso obriga
// banner de consentimento e uma política de privacidade bem maior. O Cloudflare
// Web Analytics não usa cookie, não guarda identificador do visitante e não
// cruza dado entre sites. Sem cookie, não há consentimento a pedir — e um site
// que se apresenta como fonte verificável não deveria receber o visitante com
// um banner pedindo permissão para rastreá-lo.
//
// COMO LIGAR
// 1. Crie uma conta gratuita em dash.cloudflare.com
// 2. Vá em Analytics & Logs → Web Analytics → Add a site
// 3. Informe movvabrasil.net. Não é preciso mover o DNS para a Cloudflare:
//    a medição funciona pelo script, em qualquer hospedagem.
// 4. A Cloudflare mostra um trecho com data-cf-beacon e um token
// 5. Cole só o token aqui embaixo e publique
//
// Enquanto o token estiver vazio, nenhum script de terceiro é carregado.
export const CLOUDFLARE_TOKEN = '';

export const MEDINDO = CLOUDFLARE_TOKEN.length > 0;

// ATRIBUIÇÃO DE CONVERSA, SEM EVENTO E SEM RASTREADOR
// A medição acima conta visita por página, e só. Ela não sabe quem clicou para
// o WhatsApp, porque evento personalizado exigiria outro serviço.
//
// A atribuição vem de outro lugar, e é mais confiável: a mensagem que já vai
// escrita muda conforme a página de origem (ver src/data/contato.js). Quando
// alguém escreve "quero levar o meu número", veio do post de portabilidade.
// É contagem manual, feita na sua caixa de entrada, sem rastrear ninguém.
