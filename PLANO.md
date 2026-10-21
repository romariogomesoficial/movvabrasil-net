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

### A página `/correcoes`

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

## Fase 3 — Fechar a jornada de compra

Os buracos reais que a análise encontrou. Não é ceticismo, é compra.

- [ ] **O sinal pega no seu endereço?** Procedimento de conferência no painel
      da Anatel, antes de pagar. É a objeção nº 1 contra operadora virtual e a
      home hoje não a resolve.
- [ ] **O que você paga no primeiro mês, somado.** Plano + chip + frete, em um
      número. O site do patrocinador diz "Nada! Comece sem colocar a mão no
      bolso" e revela R$ 497 depois — fazer o contrário é diferencial.
- [ ] **Como contratar, e como cancelar.** Uma página com os dois. A pergunta
      silenciosa que decide o sim é "e se eu me arrepender?".
- [ ] **"25 GB dá para quê?"** Pergunta órfã que nenhuma das quatro
      arquiteturas respondia. Quem vê 25 GB não sabe se é muito ou pouco.

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
