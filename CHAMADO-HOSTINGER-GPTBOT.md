# Chamado Hostinger — GPTBot recebe HTTP 429 em movvabrasil.net

Documento de trabalho. **Não é página publicada.**

Diagnóstico feito em 22/10/2026, às 05:30 UTC, contra os dois IPs que o
domínio resolve (88.222.222.157 e 2.57.91.74), com `curl --resolve` para não
depender de resolvedor local.

## O resumo, em uma linha

O CDN da Hostinger devolve **429 Too Many Requests** para qualquer requisição
cujo `User-Agent` contenha `GPTBot/` seguido de número de versão — que é
exatamente o formato oficial do robô da OpenAI. Não é limite de taxa: é
determinístico, na primeira requisição, nos dois IPs.

## O que isso custa

O `robots.txt` do site libera GPTBot explicitamente. O robô consegue ler o
`robots.txt` (ele responde 200), vê que está liberado, pede a primeira página
e leva 429. Resultado: o site não pode ser citado pelo ChatGPT, e do lado da
OpenAI parece um site que convida e depois recusa.

## A evidência

Todos os testes abaixo foram feitos no mesmo minuto, do mesmo IP de origem,
contra `https://movvabrasil.net/`.

Primeiro, que o problema é só com esse robô:

    200   Mozilla/5.0
    429   GPTBot/1.2 (+https://openai.com/gptbot)
    200   ClaudeBot/1.0
    200   PerplexityBot/1.0
    200   Google-Extended

Segundo, que o gatilho é a versão colada ao nome, e não a URL dentro do
cabeçalho:

    200   GPTBot
    200   gptbot
    429   GPTBot/1.0
    429   GPTBot/1.2
    200   GPTBot (+https://openai.com/gptbot)
    429   GPTBot/1.2 (+https://openai.com/gptbot)
    200   Teste (+https://openai.com/gptbot)
    200   Teste openai.com

Repare nas duas últimas: um User-Agent que contém o endereço da OpenAI passa
sem problema. O que derruba é a sequência `GPTBot/` com versão.

Terceiro, que robô nenhum com formato equivalente é afetado:

    200   Googlebot/2.1 (+http://www.google.com/bot.html)
    200   Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)
    200   ClaudeBot/1.0 (+https://anthropic.com/claudebot)
    200   PerplexityBot/1.0 (+https://perplexity.ai/bot)

Quarto, que é determinístico e não limite de taxa — três tentativas em cada
IP, alternando os dois cabeçalhos:

    88.222.222.157    GPTBot/1.2 -> 429, 429, 429    |  GPTBot -> 200, 200, 200
    2.57.91.74        GPTBot/1.2 -> 429, 429, 429    |  GPTBot -> 200, 200, 200

Se fosse limite de taxa, o `GPTBot` sem versão, enviado no mesmo instante e do
mesmo IP, também seria bloqueado. Ele não é.

## Os cabeçalhos da resposta 429

    HTTP/1.1 429 Too Many Requests
    Content-Length: 0
    platform: hostinger
    panel: hpanel
    Server: hcdn
    x-hcdn-request-id: e1d516a15138a2806c782b9495afe0d1-fra-edge6

Não vem `Retry-After`, e o corpo é vazio. O `Server: hcdn` e o `x-hcdn-request-id`
indicam que a resposta é gerada na borda do CDN, antes da aplicação — o site é
estático e não tem nada que gere 429.

O identificador acima serve de referência: `e1d516a15138a2806c782b9495afe0d1-fra-edge6`,
borda `fra-edge6`.

## O pedido

Remover ou desativar, para o domínio movvabrasil.net, a regra de borda que
responde 429 ao User-Agent `GPTBot/<versão>`. O controle de quem pode rastrear
este site já está no `robots.txt`, que libera GPTBot de propósito.

Se a regra for de uma camada compartilhada e não puder sair só para este
domínio, por favor digam isso com todas as letras: nesse caso a decisão passa a
ser minha, entre manter a hospedagem como está ou pôr o domínio atrás de um CDN
que me deixe controlar essas regras.

## O que este teste não prova

Os testes partiram de um IP comum, não dos intervalos de IP que a OpenAI
publica para o GPTBot. Se houver uma segunda regra, por faixa de IP, ela não
aparece aqui. Mas a regra por User-Agent existe, é reproduzível e sozinha já
basta para bloquear o robô.

## Como conferir de novo depois

    curl -s -o /dev/null -w "%{http_code}\n" \
      --resolve movvabrasil.net:443:88.222.222.157 \
      -A "GPTBot/1.2 (+https://openai.com/gptbot)" \
      https://movvabrasil.net/

Enquanto devolver 429, o problema continua. O esperado é 200.
