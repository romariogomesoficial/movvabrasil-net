# Chamado para o suporte da Hostinger — GPTBot bloqueado

Abra em **hPanel → Ajuda → Falar com o suporte**.

- **Se o chamado ainda estiver aberto**, cole o acompanhamento da seção
  "Acompanhamento de 21/10/2026", que é mais forte: ele prova que não é limite
  de taxa.
- Se for abrir do zero, cole o acompanhamento mesmo assim — ele se sustenta
  sozinho. O texto original ficou guardado abaixo só como registro.

---

## Acompanhamento de 21/10/2026 — a causa isolada

O primeiro chamado dizia "o GPTBot leva 429 e os outros não", o que o suporte
pode responder com "é limite de taxa, aguarde". Agora dá para fechar essa saída.

**O que foi descoberto:** o 429 depende do FORMATO do texto do user-agent, não
do volume. Uma requisição de cada, em sequência:

| Resposta | User-agent |
|---|---|
| 429 | `Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)` |
| 429 | `Mozilla/5.0 (compatible; GPTBot/1.0)` |
| 200 | `GPTBot` (a palavra sozinha) |
| 200 | `Mozilla/5.0 (compatible; GPT-Bot/1.1)` (com hífen) |
| 200 | `Mozilla/5.0 (compatible; ChatGPT-User/1.0)` |
| 200 | `Mozilla/5.0 (compatible; OAI-SearchBot/1.0)` |

Um limite de requisições conta acessos; não lê o formato do texto. Passar a
palavra solta e barrar a mesma palavra dentro do envelope `Mozilla/5.0
(compatible; ...)` é casamento de padrão.

**De onde vem:** do CDN da Hostinger, não do servidor de origem.

```
HTTP/1.1 429 Too Many Requests
Content-Length: 0
Server: hcdn
x-hcdn-request-id: 2ffa1097bd45ebc23e01c0d5b291b3d7-fra-edge6
```

Sem `Retry-After`, sem `etag`, sem `last-modified` — a requisição não chegou a
ser servida pelo arquivo. A mesma página, no mesmo segundo, com outro
user-agent, responde 200 com `etag` e `last-modified` normais.

O `x-hcdn-request-id` é de uma requisição real e deve estar no log deles.

**Como refazer o teste** (o IP vem do DNS público porque o resolvedor da sua
conexão pode estar com cache velho):

```bash
IP=$(curl -s -H "accept: application/dns-json" "https://1.1.1.1/dns-query?name=movvabrasil.net&type=A" | grep -o '"data":"[0-9.]*"' | head -1 | cut -d'"' -f4)
curl -s -D - -o /dev/null --resolve movvabrasil.net:443:$IP -A "Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)" https://movvabrasil.net/
```

### Texto para colar no chamado

```
Assunto: Acompanhamento — GPTBot recebe HTTP 429 em movvabrasil.net, e o
filtro é por user-agent, não por limite de taxa

Olá. Estou dando sequência ao chamado sobre o GPTBot receber HTTP 429 no
domínio movvabrasil.net (plano Business, site estático publicado via Git
deploy).

O problema continua, e eu consegui isolar a causa. Não é limite de requisições.

O QUE O TESTE MOSTRA
Fiz uma única requisição para https://movvabrasil.net/ com cada identificação
abaixo, em sequência, em 21/10/2026 por volta das 06:34 UTC:

  429  Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)
  429  Mozilla/5.0 (compatible; GPTBot/1.0)
  200  GPTBot
  200  Mozilla/5.0 (compatible; GPT-Bot/1.1)
  200  Mozilla/5.0 (compatible; ChatGPT-User/1.0)
  200  Mozilla/5.0 (compatible; OAI-SearchBot/1.0)

Reparem nas linhas 2, 3 e 4. A palavra "GPTBot" sozinha passa. A mesma palavra
dentro do formato "Mozilla/5.0 (compatible; GPTBot/...)" é bloqueada. E basta
inserir um hífen, virando "GPT-Bot", para voltar a passar.

Um limite de taxa não se comporta assim: ele conta requisições, não examina o
formato do texto do user-agent. O resultado indica uma regra que casa um padrão
de user-agent e devolve 429.

DE ONDE VEM A RESPOSTA
Os cabeçalhos do 429 apontam para a camada de CDN de vocês, não para o servidor
de origem:

  HTTP/1.1 429 Too Many Requests
  Content-Length: 0
  Server: hcdn
  x-hcdn-request-id: 2ffa1097bd45ebc23e01c0d5b291b3d7-fra-edge6

Não vem Retry-After, e não vêm etag nem last-modified: a requisição não chegou
a ser servida pelo arquivo. A mesma página, pedida no mesmo segundo com outro
user-agent, responde 200 com etag e last-modified normais.

O x-hcdn-request-id acima é de uma requisição real e deve constar no log de
vocês.

MEU robots.txt LIBERA O GPTBOT

  User-agent: GPTBot
  Allow: /

PEDIDO
Por favor, removam a regra de proteção contra bots que casa o user-agent GPTBot
na camada hcdn para o domínio movvabrasil.net. É um site estático e
informativo, de volume baixo, e o bloqueio impede que o conteúdo entre no
índice da OpenAI.

Se essa regra for global da plataforma e não puder ser desativada por domínio,
por favor me digam isso de forma explícita. Assim eu paro de investigar do meu
lado e trato como limitação conhecida do plano.

Obrigado.
```

---

## Texto original do primeiro chamado (registro)

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
