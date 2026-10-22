# Plano do movvabrasil.net

Escrito em 21 de outubro de 2026, depois de publicar a identidade nova e rodar
a análise comparativa com o site do patrocinador.

---

## O diagnóstico, antes do plano

O site está **tecnicamente pronto e comercialmente em zero.**

| O que está bom | O que não existe |
|---|---|
| 20 páginas, 11 posts com fonte primária | Medição: nenhuma. Token vazio |
| Identidade visual fechada, verde e preto | Tráfego conhecido: nenhum |
| 37 verificações automáticas passando | Cliente: nenhum |
| Separação de três estados aplicada | Teste de campo: o chip não chegou |
| llms.txt, sitemap, schema, OG | Caminho de compra: incompleto |

**O gargalo não é qualidade. É distribuição e prova.**

Isso muda a ordem do trabalho. A tentação é continuar construindo seção — é o
que dá prazer e o que parece progresso. Mas construir mais página num site que
ninguém mede é escolher no escuro, e por mais tempo.

---

## Fase 0 — Destravar o que está parado

Depende de você, não de código. Cada item aqui bloqueia algo adiante.

- [ ] **DNS da sua máquina.** Você ainda vê o site antigo. O cache da Claro se
      renovou em vez de expirar — esperar não resolve. Rode
      `dns-publico-LIGAR.bat` como administrador.
- [ ] **Chip.** Pedido em 20/10. Quando chegar, avise: uma linha no `site.js`
      muda o site inteiro, e aí começa a Fase 4.
- [ ] **Chamado da Hostinger sobre o GPTBot.** Texto pronto em
      `CHAMADO-HOSTINGER-GPTBOT.md`, com a prova de que é filtro por
      user-agent e não limite de taxa.
- [ ] **Seu horário de atendimento** em `src/data/contato.js`. Hoje o site diz
      "respondo assim que vejo", que é honesto mas não governa expectativa.

---

## Fase 1 — Parar de voar às cegas

**Uma sessão. É a fase mais importante do plano e a menos vistosa.**

1. **Ligar a medição.** Conta gratuita na Cloudflare, Web Analytics, pegar o
   token e colar em `src/data/medicao.js`. Sem cookie, sem banner de consentimento,
   sem rastrear ninguém — a decisão já está documentada no arquivo.
2. **Confirmar indexação.** Search Console: o sitemap foi aceito? Quantas das
   20 páginas estão no índice? Quais consultas já aparecem, mesmo com zero
   clique?

Por que primeiro: sem isso, toda decisão daqui para frente é palpite. Com isso,
em duas semanas você sabe qual post traz gente, qual página perde a pessoa e se
alguém chega a clicar no WhatsApp.

---

## Fase 2 — A vantagem que ninguém consegue copiar

**Uma semana. É onde o site passa o do patrocinador.**

Os três juízes da análise convergiram nos mesmos dois itens, e nenhum deles
estava na arquitetura vencedora:

### A faixa de conferência, em toda página

> Conferido em 21/10/2026 · 16 afirmações com fonte · 5 em aberto · 2 correções

Transforma o "atualizada em" que o site já tem num contador visível. Um juiz
chamou de a ideia mais valiosa do conjunto inteiro, porque promessa de revisão
é promessa, e contador é fato gerado.

### A página `/correcoes` — DESCARTADA em 21/10/2026

**Chegou a existir e saiu do ar, por decisão do dono do site.** A razão vale
como regra para tudo o que vier depois, e está em `CORRECOES.md`:

> Deixar explícito um erro causa desconfiança **na pessoa**. O leitor não
> conclui "essa pessoa é rigorosa", conclui "essa pessoa erra" — e num site de
> vendas quem escreve é justamente quem precisa de confiança.

A linha que separa os dois casos é **de quem o fato fala**:

- **Incerteza sobre o ASSUNTO** (a MOVVA, a norma, a cobertura) → publicar.
  Fala do produto, e assumir que algo não foi confirmado constrói confiança.
  É o que sustenta os pontos em aberto da faixa e as seções "o que eu não
  consegui confirmar" dos posts.
- **Erro do AUTOR** → corrigir em silêncio e registrar em `CORRECOES.md`, que
  é documento de trabalho, não página.

A faixa de conferência ficou, sem o contador de correções: os dois números que
sobraram — fontes primárias e pontos em aberto — são do primeiro tipo.

O argumento abaixo, que a defendia, fica registrado porque estava errado sobre
um leitor real, não sobre um leitor ideal.

O material já existe, escrito, dentro do código:

- A correção do Reclame Aqui: a página era de outra empresa, CNPJ diferente
- O excesso de selos "A empresa anuncia", que fazia a página desconfiar do
  próprio produto
- A Lei 13.116/2015 citada para o assunto errado
- A cadeia de rede ISPS/ARQIA retirada da lista de verificáveis
- O prazo de 7 dias, não 10, para reclamação na operadora

Cinco entradas reais, datadas, zero dado novo. Hoje esses acertos só o `git log`
vê — e eles valem muito mais na página do que no commit.

**Por que isto é a vantagem:** qualquer concorrente copia seção de benefício em
uma tarde. Ninguém copia um histórico de correções sem ter cometido os erros e
assumido em público.

---

## Fase 2.5 — O que o site de referência tinha e este não

Não estava no plano original. Saiu da comparação seção a seção com o site do
patrocinador: das quinze seções que ele tem, seis eu não reproduzo de propósito
(simulador de ganhos, "qual é a sua desculpa?", depoimentos, acelerador de
vendas, planos empresariais sem dado, e as três telas de persuasão "de qual
lado você quer estar"). Das outras, três faltavam de verdade.

- [x] **`/planos`** — a página comercial central. Os cinco planos lado a lado,
      preço por giga, para quem cada um serve, e o que eu não confirmei sobre
      eles. Os preços viviam escritos à mão dentro da home.
- [x] **`/perguntas-frequentes`** — 25 perguntas. Catorze vêm de
      `src/data/perguntas.js`, que as páginas de dentro também leem, e onze são
      geradas do campo `resposta` de cada post. Nenhuma escrita à mão duas vezes.
- [x] **`/sobre`** — quem escreve e o método editorial. O site de referência tem
      seção de pessoa; o meu não tinha nenhuma, e é o que sustenta E-E-A-T.
- [x] **Seção de perguntas na home**, com as cinco objeções de quem está
      decidindo trocar, antes do último botão.
- [x] **A escada de treze graduações** em `/oportunidade`, com os medalhões
      oficiais: doze apagados e um aceso. O contraste é o argumento.

### As travas que entraram junto

Cada uma nasceu de um erro real cometido no mesmo dia:

- [x] `conferir-acentos.mjs` — frase de tela escrita sem acento dentro de
      arquivo de dados, que leva comentário sem acento de propósito. Já tinha
      quase acontecido com a frase do chip; aconteceu com os textos dos planos.
- [x] `conferir-links.mjs` — dezenas de links internos novos, nenhum conferido.
- [x] `role="list"` em dez listas sem marcador, que o VoiceOver parava de
      anunciar como lista.
- [x] `BreadcrumbList` derivado do caminho, e trilha visível nos posts.
- [x] Fonte única para menu e `llms.txt`: três páginas novas entraram e o
      `llms.txt` não soube de nenhuma.

---

## Fase 3 — Fechar a jornada de compra

Os buracos reais que a análise encontrou. Não é ceticismo, é compra.

- [x] **O sinal pega no seu endereço?** Virou
      [post](src/content/blog/cobertura-no-meu-endereco.md) **e** seção da home.
      A pesquisa de objeções confirmou o diagnóstico com evidência: a dúvida
      apareceu nos cinco levantamentos, e em "qual operadora pega melhor" nove
      das dez sugestões do Google são geográficas.
- [x] **O que você paga no primeiro mês, somado.**
      [Publicado](src/content/blog/quanto-custa-o-primeiro-mes.md).
- [x] **Como contratar, e como cancelar.**
      [Publicado](src/content/blog/contratar-chip-movva.md), e virou seção da
      home com os dois lados lado a lado.
- [x] **"25 GB dá para quê?"**
      [Publicado](src/content/blog/25-gb-da-para-que.md), com a tabela de horas
      por franquia e a advertência de que as linhas são alternativas, não somas.

**A previsão desta fase se confirmou, e o documento apareceu.** O plano dizia
que o site de referência promete "Nada! Comece sem colocar a mão no bolso" e
revela R$ 497 depois. As duas frases estão **no mesmo documento**: página 61 do
deck institucional. O cadastro é mesmo gratuito, e a licença VIP custa R$ 497 à
vista ou 12× R$ 51,13 — que somam R$ 613,56, e o deck não chama a diferença de
juros. Está publicado na tabela de custo de entrada da `/oportunidade`.

---

## Fase 3.5 — O deck, e o que ele fechou

Não estava no plano porque ninguém sabia que era possível. O deck institucional
de 66 páginas estava na pasta do projeto desde o começo e **nunca tinha sido
lido**: zero texto extraível, todas as páginas são imagem, e nenhuma busca por
palavra encontrava nada nele. Cinco rodadas de verificação procuraram, em
fontes públicas, exatamente o que estava dentro dele.

Lido página por página como imagem, ele fechou quatro pontos em aberto:

- [x] **A origem dos preços.** Página 31, a tabela inteira. Os cinco valores
      batem com os publicados, e o Liberty é **25 GB** — um FAQ de rede dizia 24.
- [x] **O mecanismo da dupla conectividade.** Página 22: "Rede TIM + Roaming da
      VIVO". É roaming, não duas redes contratadas.
- [x] **O prazo do saldo acumulado.** Página 23: "pagando até a data do
      vencimento, permanecem disponíveis no próximo mês". Não é "infinitos".
- [x] **O que o MOVVA Club oferece.** Página 24: mais de 30 mil estabelecimentos.

E revelou duas coisas que o site não tinha: **ligações e WhatsApp ilimitados**
nos cinco planos, e a tarja **"direito ao programa de afiliados"** apenas no
Liberty, no Max e no Ultra — o que tornava errada a linha "a partir de R$ 58,90"
da tabela de custo de entrada.

**A lição, que vale mais que os achados:** afirmar a origem de um número sem
abrir a fonte erra nos dois sentidos. A atribuição dos preços foi "corrigida"
de empresa para rede, e estava errada nas duas vezes. Quando a busca por
palavra não acha, o documento pode estar ali mesmo assim — e PDF de
apresentação quase sempre está.

### A madrugada de 22/10

- [x] **Desempenho medido pela primeira vez.** A home transfere 12 KB de HTML e
      6 KB de CSS, não carrega JavaScript nenhum e mede CLS zero. A medição
      achou o que importava: **quatro das seis requisições eram do Google
      Fonts**. As fontes passaram a ser servidas daqui — menos requisições,
      sem bloqueio de pintura, e o IP do visitante deixa de ir para o Google.
      A política de privacidade mudou junto, para melhor.
- [x] **Acessibilidade, primeira passada completa.** Dois saltos de nível de
      título corrigidos. E `conferir-acessibilidade.mjs` entrou no build.

---

## Fase 4 — Quando o chip chegar

O único conteúdo que ninguém pode falsificar nem copiar.

- [ ] Trocar `CHIP.chegou` para `true` — o site inteiro acompanha
- [ ] Testar a dupla conectividade: qual rede o chip registra, em que lugares,
      com que código MCC+MNC. O método já está escrito em
      `/blog/chip-dois-sinais`
- [ ] Publicar o resultado, inclusive se for contra a empresa
- [ ] Tirar o cartão "Falta eu testar" da home e pôr a medição no lugar

---

## Fase 5 — Escala

Depois que a medição disser o que funciona:

- [ ] Próximos posts, guiados pelo que o Search Console mostrar
- [ ] Os criativos, já com as regras aplicadas
- [ ] `REGRAS-CRIATIVO.md` virando skill, para as regras entrarem sozinhas em
      todo criativo e todo texto de página

---

## O que NÃO fazer, e por quê

A análise produziu 29 a 33 seções. Os três juízes rejeitaram o tamanho por
unanimidade. Fica de fora:

| Ideia | Por que não |
|---|---|
| Publicar o extrato em CSV | Vaza dados das 8 pessoas da sua rede. LGPD |
| Desmontar a aritmética de "R$ 7.200/mês" | Conflito aberto com a estrutura de que você depende. Explique a mecânica sem o número e sem nomear ninguém |
| Republicar o contrato com a TIP Brasil | Expõe um terceiro. Linke Receita e SEI; não hospede o PDF da empresa |
| Seção da escada de prêmios | Risco de revisão de anúncio, e vira print sem contexto |
| Biografia do fundador como alegação sem registro | Dossiê hostil contra o seu próprio patrocinador |
| Quatro páginas meta (/documentos, /como-eu-verifico, /em-aberto, /perguntas) | Mesmo assunto repartido em quatro. Duas bastam |
| Segunda FAQ em página própria | Já existe uma em /movva-e-confiavel. Duas para sincronizar é dívida garantida |

---

## A regra que atravessa tudo

Afirmação de estado envelhece sozinha e passa a desmentir o resto da página.
O site de referência tem uma FAQ perguntando quando os chips chegam enquanto a
operação já roda — e isso contamina a credibilidade de tudo o mais que ele diz.

Por isso o estado do chip vive em `CHIP`, no `site.js`, e não escrito à mão.
Toda afirmação de estado nova entra pelo mesmo caminho: um lugar, uma data, e
o site inteiro acompanha.
