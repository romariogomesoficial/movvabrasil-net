# Chamado para o suporte da Hostinger — GPTBot bloqueado

Abra em **hPanel → Ajuda → Falar com o suporte**. Cole o texto abaixo.

---

```
Assunto: Requisições do GPTBot recebendo HTTP 429 no domínio movvabrasil.net

Olá. O site movvabrasil.net está hospedado no meu plano Business e é um site
estático, apenas HTML. Ele foi publicado hoje via Git deploy.

PROBLEMA
Requisições identificadas como GPTBot (o rastreador da OpenAI) estão recebendo
HTTP 429 (Too Many Requests), enquanto o mesmo endereço responde HTTP 200
normalmente para todos os outros rastreadores.

MEDIÇÕES
Testei a página inicial com dez identificações diferentes, uma requisição cada,
com 6 segundos de intervalo entre elas. Resultado:

  200  Navegador (Chrome)
  200  Googlebot
  200  Bingbot
  429  GPTBot            <-- único bloqueado
  200  OAI-SearchBot
  200  ChatGPT-User
  200  PerplexityBot
  200  ClaudeBot
  200  Google-Extended
  200  Applebot

Repeti o teste do GPTBot seis vezes, em dois momentos separados por mais de
vinte minutos, com intervalos de 8 segundos. Todas as seis retornaram 429.
O volume é baixíssimo e não caracteriza excesso de requisições.

O meu robots.txt libera explicitamente o GPTBot:

  User-agent: GPTBot
  Allow: /

PEDIDO
Por favor, verifiquem se há alguma regra de proteção contra bots, no servidor ou
no WAF, aplicando limite ou bloqueio ao user-agent GPTBot neste domínio, e
removam essa restrição para o movvabrasil.net.

O site é informativo e depende de ser indexado por mecanismos de busca e por
assistentes de IA. O bloqueio do GPTBot impede que o conteúdo entre no índice da
OpenAI.

Obrigado.
```

---

## Contexto, para você saber o tamanho do problema

O GPTBot é o rastreador que alimenta o índice mais amplo da OpenAI.

**O que continua funcionando mesmo com ele bloqueado:** o `OAI-SearchBot` e o
`ChatGPT-User` passam normalmente. São eles que buscam páginas quando o ChatGPT
precisa responder algo com fonte citada, e quando alguém pede ao ChatGPT para
abrir um endereço. Ou seja, **o caminho da citação no ChatGPT está aberto.**

**O que se perde:** cobertura no índice mais amplo da OpenAI.

Não é urgente, e não trava nada. Mas é um chamado gratuito que resolve uma perda
silenciosa, então vale abrir.
