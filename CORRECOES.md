# Correções feitas no site

Registro interno. **Não é página publicada** — ficou fora do ar por decisão do
dono do site, em 21/10/2026. O motivo está no fim deste arquivo.

Serve para duas coisas: não repetir o mesmo erro, e saber o que foi corrigido
caso alguém pergunte.

---

## 27 de outubro de 2026

### O chip chegou, e catorze frases escritas à mão ficaram falsas de uma vez

A LOGGI registrou "objeto entregue ao destinatário" em 27/10/2026 às 15:44.
`CHIP.chegou` virou `true`; `testadoEm` continua `null`, porque entregar não é
medir.

**O que isso revelou, e é o registro que importa aqui.** Virar um campo exigiu
**catorze edições à mão em oito arquivos**, porque a frase "o chip não chegou"
estava escrita em prosa de markdown em vez de ser lida do módulo. O site tem uma
definição única do estado do chip exatamente para isso não acontecer — e ela
cobria as páginas `.astro`, não a prosa dos posts.

Catorze edições à mão são catorze chances de esquecer uma. A que ficasse para
trás seria afirmação falsa sobre o autor numa página só, que é precisamente a
que ninguém revê.

**É a terceira vez que este projeto leva o mesmo erro:** a contagem de lugares
com VME ficou corrigida em dois lugares e velha em três, um deles na *mesma
página*, 113 linhas abaixo do trecho corrigido; a conta do saque ficou errada em
cinco arquivos e depois num sexto, *dentro* de um dos cinco já "corrigidos"; e
agora o estado do chip.

**A resposta foi um conferidor, não mais cuidado:** `conferir-estado-do-chip.mjs`
lê o `CHIP` real e trava o build se qualquer página publicada disser o contrário.
Entrou no `npm run conferir`.

**Ele foi provado nos dois sentidos, e é isso que o separa do conferidor que foi
apagado.** Existiu aqui um `conferir-coerencia.mjs` que tentava achar contradição
por palavra-chave, deu alarme falso em quatro de seis regras e passou limpo no
commit que carregava os defeitos para os quais foi escrito. Foi removido. Este:

1. Passa nas 32 páginas reais.
2. Com uma página de bancada plantada no `dist`, acusa os três casos errados e
   fica calado nos quatro controles.
3. Com `chegou: false` e o `dist` velho dizendo que chegou, acusa o descompasso.

**E ele achou dois defeitos em si mesmo durante a prova, os dois meus:**

- A primeira versão pedia a negação em `exigePerto` em vez de `proibidoPerto`, e
  acusou **38 frases verdadeiras**. O site afirma negando — "ainda não testei
  nada em campo" tem as mesmas letras de "testei em campo" —, e eu havia escrito
  o comentário certo com o campo invertido. Era o defeito do conferidor apagado,
  reencenado.
- A janela de 60 caracteres atravessava o ponto final, então a negação de uma
  frase **anterior** salvava a frase seguinte. "Eu testei em campo e a cobertura
  era boa" passou limpo na bancada. Agora a janela para na fronteira de frase.

**A lição:** conferidor que não é provado falhando não é conferidor, é decoração
que dá sensação de segurança. E a prova tem de ser nos dois sentidos — passar no
estado certo não diz nada sobre pegar o estado errado.

### O prazo de entrega saiu de "em aberto" para medido

Do pedido à entrega: **6 dias e 20 horas** (20/10 às 20:01 → 27/10 às 15:44). Da
postagem à entrega: 4 dias e 5 horas. LOGGI via SuperFrete, para Jundiaí/SP.

O ponto em aberto não foi apagado, foi **reescrito para o que continua aberto**: um
envio, um endereço e uma data não formam prazo de operadora, e a empresa não
publica prazo. Está dito na página que, se o envio de outra pessoa demorar o
dobro, o meu número não lhe dá direito a nada.

**Os dois prazos são derivados, não escritos à mão** — calculados dos próprios
carimbos do rastreamento, dentro de `CHIP.trajeto`. Este arquivo já viu o mesmo
número escrito em dois lugares e divergindo; aqui não existe segunda cópia para
ficar velha.

### O llms.txt escrevia o estado do chip à mão

O arquivo que as IAs leem para saber o que o site contém trazia "o chip não
chegou" em texto fixo, enquanto 32 páginas liam do módulo. Passou a ler
`CHIP.frase`. Era o lugar onde um estado velho iria para o Google e para as IAs
sem aparecer na tela de ninguém.

### O que não foi conferido nesta rodada

O painel da MOVVA, porque a sessão do escritório virtual havia expirado e **eu
não digito senha**. A entrega é evento da transportadora, que é quem levou o
objeto, então a fonte primária estava disponível — mas fica registrado que a
segunda fonte não foi conferida.

---

## 22 de outubro de 2026

Dia de uma correção estrutural e de um lote grande. A correção estrutural veio
da leitura do plano de carreira no deck; o lote veio de uma revisão das 28
páginas com 45 leitores e verificação adversarial, que levantou 73 achados, dos
quais 38 sobreviveram à checagem.

## 26 de outubro de 2026

### O prazo do chip: errei contra a empresa, por quase trinta vezes

Em 24/10/2026 esta página publicou que a entrega do chip "pode passar de 90
dias". Rastreando o envio real em 26/10, o número é outro: **três dias entre
contratar e postar** — solicitado 20/10 às 20:01, etiqueta emitida 21/10 às
16:18, postado 23/10 às 10:46.

**De onde veio o erro:** o painel do afiliado tem dois fluxos de chip, e eu
confundi os dois.

1. **Pacotes de chips no atacado** — os que o afiliado compra para revender.
   Esses entram num pedido mensal ao fabricante e "ficam prontos para envio 90
   dias depois". A frase existe e está no painel.
2. **Chip de plano** — o de quem contrata uma linha no próprio CPF. Não passa
   por essa fila.

Eu li a frase do fluxo 1 e apliquei ao fluxo 2. O resultado foi publicar, na
página que responde "como contratar o chip MOVVA", um prazo quase trinta vezes
maior que o real — e contra a empresa.

**A lição, que é a mesma da semana toda em outra roupa:** um número lido num
painel não vem com o seu escopo colado nele. "90 dias" estava certo; o sujeito
da frase é que era outro. Antes de publicar prazo, preço ou percentual lido de
uma tela, é preciso responder *de que exatamente este número fala* — e essa
pergunta não se responde pelo número.

### O frete saiu de "não sei" para R$ 20,00

O rastreamento do mesmo envio traz "Transportadora — R$ 20,00", por dois chips,
para Jundiaí/SP. O ponto em aberto sobre o frete existia em quatro lugares,
inclusive entre os três que a home destaca.

Publicar "não sei o frete" tendo o número seria mentira por inércia. O que
**continua** aberto é o preço do chip em si, que não tem documento, e se frete
e chip entram à parte ou na primeira fatura. E o número é um caso, não uma
tabela por CEP — isso está dito.

### "Chegou" não é "testei": um defeito que não chegou a ser publicado

Este não é erro que o leitor viu. É defeito encontrado no próprio código, antes
de ir ao ar, e fica registrado porque a forma dele é a mesma dos outros.

O estado do chip vive num lugar só, `CHIP` em `src/data/site.js`, lido por 32
páginas. Ele tinha **dois** estados, `chegou: true` e `chegou: false`, e o ramo
`true` dizia: *"Contratei o plano e o chip chegou. O que eu medi em campo está
escrito em cada post, com a data da medição."*

Chegar e medir são **eventos diferentes**, separados por dias. No intervalo
entre o chip estar na mão e existir a primeira medição de sinal, virar aquela
chave faria 32 páginas afirmarem medição que não existe — e medição inventada é
exatamente o que este site se compromete a não ter. Pior: dois rótulos liam
`chegou` para dizer "Testado", um deles na home.

**A correção:** três estados, não dois. `chegou` fala de posse; `testadoEm` fala
de medição; e um terceiro campo, `testado`, é o único que autoriza falar de
medição — ele depende de `testadoEm`, não de `chegou`. O ramo do meio diz só
"Contratei o plano e o chip chegou. Ainda não testei nada em campo."

**Como apareceu:** o dono do site disse que o chip havia chegado. Antes de
virar a chave, fui ver o que a chave fazia.

**A lição:** um booleano com dois valores para três estados não guarda a
diferença — ele escolhe um dos três e mente nos outros dois. O erro não estava
na frase, estava em haver só duas frases.

**O comprimento também foi medido, não adivinhado.** A primeira versão do ramo
do meio terminava em "— então aqui não há medição de sinal, de velocidade nem de
cobertura". Vendo renderizado, em `/avisos-legais` e `/termos-de-uso` a frase
anterior da página já é "Não há medição de rede neste site": as duas juntas
diziam a mesma coisa duas vezes. Foi encurtada depois de olhar a tela.

## 24 de outubro de 2026

### O extrato aberto no escritório virtual, e o que ele corrigiu

Até hoje os números do extrato vinham de uma leitura antiga, e não do painel.
Abrir o escritório virtual mudou duas coisas, uma delas séria.

**A séria: a plataforma não chama de zero a minha recorrência.**

O site dizia, em dois lugares da `/oportunidade`, "R$ 0,00 de recorrência",
seco. O painel da MOVVA registra **R$ 78,02 sob o rótulo "Bônus Recorrência"**
— 53% do total. Quem abrisse o próprio escritório veria um número que o site
parecia negar, e concluiria que o site mente.

As outras páginas estavam certas, porque qualificavam: "recorrência **sobre
plano de telefonia**: R$ 0,00". Essa afirmação continua verdadeira — dos
R$ 78,02, são R$ 75,54 de recorrência sobre a *licença VIP* de alguém e R$ 2,48
sobre um pacote de TV. Sobre conta de celular, zero.

**O que mudou:** o site passa a publicar os **dois cortes** do mesmo extrato —
o dele, por produto, que pergunta de quem consumindo o quê veio o dinheiro; e o
da plataforma, por tipo de bônus, que pergunta sob qual regra ele foi pago.
Nenhum é falso, e publicar só o primeiro fazia o painel do leitor parecer
desmentir o site.

**A segunda: o extrato separa o que o site dizia que ele não separava.**

A página publicava *duas* contas — 90,8% e 96,7% — justificando que o extrato
não distinguia adesão de recorrência dentro da linha do SKY+. Distingue: são
R$ 5,98 de adesão e R$ 2,68 de recorrência mais matriz. Com a separação real, o
número é **um só: R$ 138,60, ou 94,9%**, e o que sobra são R$ 7,48.

**E entrou `src/data/extrato.js`**, porque esses números estavam escritos à mão
em seis arquivos. No dia em que um deles se mostrou impreciso, havia seis
lugares para corrigir — exatamente o arranjo que produziu os defeitos de 22 e
23/10. O módulo não guarda nome de ninguém da rede: quem gerou cada lançamento
é dado de terceiro, e o que importa publicamente é a origem do dinheiro.

### A janela de medição não era limpa, e o site não dizia

Esta é a correção mais importante que o site já fez, e ela é **contra o próprio
argumento dele**.

O site publicava "bônus de recorrência sobre plano de telefonia: R$ 0,00" como
evidência sobre o modelo de negócio da MOVVA. O número é real. Mas faltava a
condição em que ele foi medido:

- dos três meses e meio da janela, **dois** — agosto e setembro de 2026 — o
  autor passou com a própria mensalidade de R$ 79,90 **sem pagar**;
- a ativação do chip dele só foi aprovada em **20 de outubro de 2026**, que é o
  **último dia** do período medido.

E a página 45 do deck diz que o ganho de quem não está ativo sobe para o
próximo ascendente apto. Ou seja: em boa parte da janela, o autor não estava em
condição de receber — independentemente de a rede consumir ou não.

**O que mudou:** o número continua publicado, e continua sendo zero. O que o
site deixou de afirmar é que ele seja um veredito sobre o negócio. Passou a
dizer que o teste limpo ainda não foi feito, e que o primeiro mês válido será o
primeiro mês inteiro com a mensalidade em dia e o chip ativo.

A ressalva entrou em todas as páginas que usavam o número como argumento — a
análise, o programa de afiliados, os três posts do lado empreendedor, os avisos
legais, o FAQ e o `llms.txt`, este último com um aviso explícito para que um
sistema de IA não cite o zero como prova de que o modelo não funciona.

**Um ponto em aberto que o próprio extrato abriu:** em setembro de 2026 o autor
recebeu três lançamentos, num mês sem pagamento. Pela regra da página 45, não
deveria. Se há carência, se "ativo" significa outra coisa, ou se a regra só vale
no fechamento, o documento não diz.

**E uma coisa que a plataforma não mostra:** não existe, no escritório do
afiliado, histórico de quais mensalidades foram pagas. `/meu-movva/faturas` só
lista fatura em aberto. Os meses sem pagamento são declaração do próprio autor
sobre o próprio bolso — não há como conferir pelo painel, e isso está dito.

### O que o escritório virtual fechou e abriu

Abrir o painel resolveu coisas que estavam em aberto há semanas:

- **O saque bate ao centavo:** 13/08/2026 15:49, R$ 137,42, taxa R$ 21,99,
  líquido R$ 115,43, PIX, aprovado.
- **O prazo do chip tem uma primeira resposta:** a MOVVA faz um pedido ao
  fabricante por mês, e o que entra nele "fica pronto para envio 90 dias
  depois". O prazo de entrega depois disso segue sem resposta. O item saiu de
  "em aberto" para "anunciado pela empresa".
- **A VSL é oficial:** o painel chama aquele endereço de "Link de divulgação".
  Não é material improvisado de rede — é o link que a plataforma entrega.

### A correção que eu quase fiz, e não devia

Vale registrar porque o erro teria sido grande e foi evitado por um motivo
específico.

O dono do site relatou ter ficado "uns 2 meses sem utilizar" a MOVVA, e disse
que foi o caso de o próprio plano deixar de ser pago, com a conta ficando
inativa. Se fosse verdade, mudaria o sentido de tudo: pela compressão dinâmica
da página 45 do deck, afiliado inativo não recebe, e o R$ 0,00 de recorrência
deixaria de ser evidência sobre o modelo para virar consequência de uma regra.
Era uma correção **a favor da empresa**, e por isso mesmo obrigatória.

Eu ia fazê-la. Antes, fui conferir no escritório virtual — e o registro diz o
contrário: "Você está ativo como VIP", "VIP ativo", "Ativo para bônus",
"4 direto(s) ativo(s)", e um lançamento de Pontos Pessoais no próprio plano do
autor em 20/10/26. Não houve inatividade que bloqueasse bônus.

**A lição:** relato de memória não é dado, nem quando vem do dono do site, nem
quando a correção favorece a outra parte. O site publica extrato, e extrato se
abre.

### O gráfico quebrou três vezes, e as três por não medir antes

O gráfico da comissão foi reescrito para o colchete cair numa borda real de
faixa. Isso exigiu passar de três faixas para quatro — e cada passo seguinte
quebrou alguma coisa que eu não tinha medido:

1. **Os rótulos se sobrepuseram.** O layout tratava como estreita apenas a
   última faixa, porque com três faixas só a última era. Com quatro, passaram a
   ser três. Medido: 65px de sobreposição, e um rótulo saindo do quadro.
2. **O fio de chamada atravessou os glifos.** Ao generalizar, mantive a
   coordenada do fio e mudei a da base, invertendo o sinal: o fio passou a
   correr 8px *acima* da linha de base, dentro da tinta. Medido: 136px dentro
   de um rótulo.
3. **O passo entre níveis ficou curto três vezes seguidas** — 16, depois 20,
   depois 26 —, porque eu supus que a fonte do rótulo tinha 11px. Tem 17, e 21
   na regra móvel.

**A lição:** eu estimava e conferia depois. Em geometria isso não funciona,
porque o erro não aparece no build nem na leitura do código — aparece só na
tela, e só se alguém olhar. O certo é medir primeiro: largura real do texto,
tamanho real da fonte, extensão real do glifo.

Ficaram, de bônus: um campo `tipo` nos dados que não era lido por ninguém e
dizia decidir a cor das faixas (removido); três comentários contando três
faixas num gráfico de quatro; e os percentuais da barra saindo com ponto
decimal em vez de vírgula.

### O conferidor de coerência durou duas horas, e foi removido

Vale registrar inteiro, porque é o erro mais instrutivo do dia.

Depois que a terceira revisão mostrou que as correções ficavam pela metade,
escrevi `scripts/conferir-coerencia.mjs`: seis regras que falhavam o build se
dois arquivos divergissem sobre o mesmo fato. Testei nos dois sentidos, as seis
dispararam nos casos injetados, e o arquivo entrou no build.

A quarta revisão o derrubou com duas medições:

**Quatro das seis regras acusam frases verdadeiras.** As regras proibiam
PALAVRAS, não afirmações — e a forma que o site mais usa é a negação. Testado:

- "Não há **medições feitas por mim** neste site" — acusada.
- "O **preço** não vem de material de distribuidor, e sim da página 31" —
  acusada.
- "A escada tinha treze degraus até 22 de outubro, e hoje tem doze" — acusada.
- "A sigla VME não aparece em todos os degraus" — acusada.

As quatro são exatamente o texto correto, e duas delas são a própria correção
que o conferidor deveria proteger.

**E ele não pega os defeitos para os quais foi escrito.** Rodei contra o commit
anterior, que carregava os dois: passou limpo. A regra do VME usa `[^.]` entre
os termos e o texto real tem um ponto no meio; a regra do saque olha o arquivo
inteiro, e o arquivo continha o número certo em outra linha, enquanto o defeito
estava numa linha específica.

**A decisão:** removido. A regra do projeto está no comentário do
`conferir-acessibilidade`, e ela não admite exceção — alarme falso faz o
conferidor ser ignorado, e conferidor ignorado é pior que nenhum. Um que além
de dar alarme falso também não pega o que promete é pior ainda, porque dá
sensação de proteção.

**A lição, que é diferente da que eu tinha tirado:** nem toda regra editorial
vira regra de script. "Dois arquivos não podem divergir sobre o mesmo fato" é
uma afirmação sobre o SENTIDO do texto, e casamento de palavra não enxerga
sentido — enxerga letra, e a negação tem as mesmas letras da afirmação. O que
protege contra correção pela metade continua sendo o `grep` antes da primeira
edição, feito por quem está corrigindo.

### O padrão do dia: correção pela metade

Vale separar este, porque foi o defeito mais caro de 22/10/2026 e não é um erro
de pesquisa — é um erro de **método**.

Três revisões acharam 125 defeitos. Muitos não eram fatos errados: eram fatos
certos corrigidos em alguns lugares e não em todos. O mesmo fato vivia em
cinco, seis arquivos; a correção pegava os visíveis; e o site passava a se
contradizer sozinho.

Os três piores, todos do mesmo dia:

- **A contagem de VME** foi corrigida de dezoito para catorze em duas páginas e
  ficou velha em outras três. Uma delas era renderizada na **mesma página** que
  já dizia catorze, cento e treze linhas acima.
- **A cadeia do saque** foi reescrita em cinco arquivos. Sobrou um sexto lugar,
  dentro de um dos cinco, na linha cujo assunto era justamente a taxa.
- **"O que vem junto"** virou "O que o deck põe ao lado" no post e não na
  página, deixando um cabeçalho que afirmava exatamente o que o parágrafo
  abaixo dele dizia ser falso.

**O que mudou por causa disso:** entrou `scripts/conferir-coerencia.mjs`, que
checa seis fatos que vivem em vários arquivos e falha o build se dois
divergirem. Ele ignora comentário de código de propósito — é nele que estes
registros ficam. E a contagem de VME deixou de ser escrita à mão: sai de
`LUGARES_COM_VME`, que conta nos dados.

**A lição:** quando um fato muda, o trabalho não é corrigi-lo — é achar todas
as cópias dele primeiro, e só então corrigir. Um `grep` antes da primeira
edição teria economizado as três rodadas.

### A taxa de saque: o número certo com a palavra errada

**Passou a dizer:** a tabela mostra a cadeia inteira — gerado R$ 146,08, sacado
R$ 137,42 em 13/08/2026, taxa de 16% sobre esse saque (R$ 21,99), líquido
R$ 115,43.

**O erro:** "Recebido líquido, após taxa de saque de 16%: R$ 115,43" vinha logo
abaixo de "Comissão gerada: R$ 146,08", em cinco lugares. Isso descreve
R$ 115,43 como o líquido de R$ 146,08 — e 146,08 menos 16% dá R$ 122,71. O
leitor que refizesse a conta achava um erro de R$ 7,28 que não existia: os 16%
incidiram sobre o **saque**, que foi menor que o gerado.

**Por que é grave num site como este:** a página inteira pede que o leitor
confira. Uma linha que não fecha com a de cima derruba a confiança em todas as
outras, inclusive nas que estão certas. O pior dos cinco lugares era o
`llms.txt`, que entregava bruto e líquido grudados a um sistema de IA.

**Como apareceu:** revisão das páginas escritas no mesmo dia, com 65 leitores e
verificação adversarial — 42 achados sobreviveram.

### A composição de 96,7%: o leitor não conseguia fechar a soma

**O erro:** a tabela publica licença R$ 92,70, plano R$ 44,72 (dos quais
R$ 39,92 de adesão) e SKY+ R$ 8,66. Somar licença e adesão dá R$ 132,62, não os
R$ 141,28 que a página afirmava. A diferença é a linha do SKY+, contada como
entrada sem que a página dissesse.

**Passou a dizer:** as duas contas, com a razão de haver duas — R$ 132,62 (90,8%)
contando só licença e adesão, R$ 141,28 (96,7%) contando também o SKY+, cuja
natureza o extrato não separa. A conclusão não muda em nenhuma das duas.

### Dois preços para a mesma licença VIP

**O erro:** `quanto-custa-o-primeiro-mes` afirmava que um pagamento de R$ 79,90
no material de lançamento "é da licença VIP de afiliado". O deck publica a
licença a R$ 497 à vista. E R$ 79,90 é, exatamente, o preço mensal do Liberty.

**Passou a dizer:** que eu não consigo identificar aquele pagamento, que a
identificação anterior não se sustenta, e que dizer "é o plano" também seria
dedução. Fica em aberto.

### /oportunidade — a escada tinha treze degraus, e o deck publica doze

**Passou a dizer:** doze graduações, de Consultor a Embaixador, com a exigência
de cada uma, lidas na página 56 do deck institucional.

**O erro:** a escada estava escrita à mão dentro de `oportunidade.astro`, com
treze degraus, Embaixador em décimo e Presidente no topo. Vinha dos treze
medalhões em arquivo. A página 56 do deck publica doze, em outra ordem, e a
página 57 concorda com ela — lista os cinco pins do bônus de liderança e também
termina em Embaixador.

**Como apareceu:** três páginas novas sobre o lado empreendedor foram reprovadas
nos portões de revisão por contradizerem a página publicada. As três estavam
certas, e a página publicada estava velha.

**O que ficou público, e por quê:** o décimo terceiro medalhão não foi apagado.
Está na página como ponto em aberto, porque a divergência é entre dois materiais
da própria empresa — isso é incerteza sobre o assunto, que este site publica, e
não erro do autor, que vem para cá.

**A lição estrutural:** a escada era o último dado de produto escrito à mão
dentro de uma página. Por isso divergiu do documento sem ninguém notar. Agora
vive em `src/data/carreira.js`, como os planos vivem em `planos.js`.

### /oportunidade e /avisos-legais — a matriz de 11.110 pessoas

**Passou a dizer:** a matriz 3×12 que o deck projeta exige 797.160 pessoas com
plano ativo.

**O erro:** o site citava "matriz teoricamente completa com 11.110 pessoas". Esse
número não corresponde a nenhuma soma da matriz 3×12 do deck, que tem 531.441
pessoas só no décimo segundo nível.

**Como apareceu:** lendo as páginas 46 e 47, que somam o dinheiro da matriz
cheia e não somam a gente.

### Peças de anúncio pago — três afirmações além da fonte

Três correções em `criativos.js`, todas da mesma família, e é a terceira vez que
esta família aparece (antes foram "não tem custo" na portabilidade e "infinitos"
no acúmulo):

1. A peça `confiavel` prometia "contrato de rede — com as fontes públicas
   linkadas". A página que ela divulga tirou a cadeia de rede da lista do
   verificável, justamente porque não há registro público que a comprove.
2. A peça do acúmulo afirmava o acúmulo sem a condição que o deck impõe
   ("pagando até a data do vencimento"). Todo o resto do site carrega a
   condição.
3. A peça de preço afirmava R$ 79,90 como fato próprio, sem forma e sem data,
   enquanto toda página do site o publica atribuído e datado. Agora lê de
   `planos.js` e carrega a data.

**A lição, escrita no topo do arquivo:** a peça paga viaja sozinha. O rodapé
obrigatório não tem campo de fonte nem de data. Então toda condição que o
documento impõe tem de caber dentro da frase.

### /termos-de-uso e /avisos-legais — "medições feitas por mim"

**Passou a dizer:** não há medição de rede neste site, com a frase do chip.

**O erro:** as duas páginas legais afirmavam ao visitante que o site reúne
"medições feitas por mim" e que "medições publicadas aqui são minhas". Não
existe nenhuma: o chip foi pedido em 20/10/2026 e não chegou, e o site diz isso
em todas as outras páginas.

### quanto-custa-o-primeiro-mes — a origem do preço, de novo

**O erro:** o corpo e o `description` ainda atribuíam a mensalidade a "material
de distribuidor", enquanto a `resposta` e a tabela do mesmo arquivo a atribuíam
à página 31 do deck. O `description` é o campo que mais viaja sozinho: meta tag,
cartão de compartilhamento, índice do blog.

**A lição, que este projeto já aprendeu uma vez:** quando uma atribuição muda,
ela muda em todos os campos do arquivo, inclusive nos que não aparecem no corpo.

### O resto do lote

- `paginas.js`: o resumo de `/planos` ainda dizia que a origem dos preços estava
  em aberto. Esse resumo vai para o `llms.txt`, ou seja, a frase velha era o que
  um sistema de IA lia sobre o site. Agora não enumera itens em aberto, porque
  eles mudam.
- `/planos`: a frase dizia "seis diferenciais" e "o sexto" sobre uma lista que
  mostra sete na tela, logo acima. A contagem agora sai da lista.
- `planos.js`: o comentário dizia que os sete itens saíram dos cards da página
  31. A dupla conectividade não está nesses cards — vem de outro ponto do deck.
- Home: "Ver as 25 perguntas" numa central que mostrava outro número. Agora as
  duas leem a mesma conta.
- Home, `/movva-e-confiavel` e `llms.txt`: a cadeia de rede descrita como
  "material comercial" contra o dossiê. São dois documentos da própria empresa.
- `movva-reclame-aqui`: o primeiro H2 do post era "Começo pela parte que me
  desabona", seguido da confissão de um erro meu. Pela regra de 21/10/2026, erro
  do autor não vai para página pública — vem para este arquivo. O registro dele
  continua acima.
- `/movva-e-confiavel`: o mesmo extrato aparecia com dois períodos diferentes na
  mesma página, um no texto e outro no gráfico.
- `cobertura-no-meu-endereco`: uma fonte que se autodeclarava "material
  comercial, não documento da empresa" entrava na contagem de fontes primárias
  que o site exibe como credencial. Saiu.

---

## 21 de outubro de 2026

### /movva-e-confiavel — página do Reclame Aqui

**Passou a dizer:** não localizei página da MOVVA BRASIL LTDA no Reclame Aqui.
A página chamada "Movva" que aparece na busca é de outra empresa: CNPJ
16.896.559/0001-81, consultoria em gestão.

**O erro:** duas empresas de nome parecido confundidas. A resposta estava dentro
de um bloco de perguntas frequentes marcado em schema.org, que é o formato que
buscadores e assistentes de IA extraem — o alcance do erro era maior que a
página.

**Como apareceu:** ao escrever o post sobre o Reclame Aqui, conferindo CNPJ por
CNPJ em vez de pelo nome.

### Página inicial — a norma do compartilhamento de rede

**Passou a dizer:** o Capítulo XII do RGST, anexo à Resolução Anatel nº
777/2025, regula esse arranjo: quem recebe pedido de compartilhamento de rede
tem 60 dias corridos para responder e justificar a recusa, e o preço de atacado
é de livre negociação.

**O erro:** dois somados. A Lei 13.116/2015 é a Lei das Antenas e trata de
infraestrutura física — torre, poste, duto —, não de acesso de rede para
operadora virtual. E nenhuma das duas normas obriga a dona da rede a
compartilhar: obriga a responder e justificar a recusa, que é menos favorável
ao leitor.

**Como apareceu:** revisão que comparou a página inicial com os posts do próprio
site, que já traziam a norma certa.

### Página inicial — as seis características do plano

**Passou a dizer:** as seis, atribuídas ao documento oficial "Diferenciais
planos de telefonia MOVVA", da própria empresa.

**O erro:** a página foi escrita a partir do material de vendas, sem abrir o
documento da empresa que estava na pasta do projeto. A correção seguinte errou
para o lado oposto, marcando cinco das seis com selo de dúvida, o que fez a
página parecer desconfiar do próprio produto. As duas versões erraram pelo
mesmo motivo: ninguém tinha lido a fonte.

**Como apareceu:** a primeira versão por revisão; a segunda pelo dono do site.

### /blog/virtual-ou-tradicional e /blog/operadora-sem-fidelidade — prazo de reclamação

**Passou a dizer:** direto na operadora, a reclamação tem de ser resolvida em até
7 dias corridos (RGC, art. 10, caput). Os dez dias são outro balcão: é o prazo
para responder reclamação encaminhada pela Anatel.

**O erro:** o prazo de dez dias existe, mas em outro canal. Quem lesse esperaria
três dias a mais antes de escalar, e perderia a janela de recorrer à agência a
partir do oitavo dia.

**Como apareceu:** conferindo o artigo citado contra o texto do regulamento.

### /blog/cobertura-zona-rural e /blog/celular-sem-sinal-em-casa — mapa de cobertura

**Passou a dizer:** o art. 28, IV do RQUAL obriga a informar a cobertura por
tecnologia e a dar acesso ao mapa da Anatel — não a publicar mapa próprio.

**O erro:** pedir um mapa que a norma não obriga a existir leva a uma recusa
legítima e à impressão errada de que a operadora esconde algo.

**Como apareceu:** revisão de exatidão das citações de norma, artigo por artigo.

### /blog/cobertura-zona-rural — os números do PERT

**Passou a dizer:** o PERT 2026 resume o desafio em 26.442 localidades sem
cobertura e sem obrigação de atendimento. A abertura por categoria saiu e está
declarada como não confirmada.

**O erro:** a ressalva anterior era logicamente impossível — se categorias se
sobrepõem, a soma das partes fica maior que o total, nunca menor. Era uma
explicação de método construída para encobrir um número mal transcrito.

**Como apareceu:** revisão adversarial, que refez a aritmética em vez de
aceitá-la.

### Criativos de anúncio — custo da portabilidade

**Passou a dizer:** levar o número leva até 3 dias úteis e, para você, não tem
custo — o art. 92 do RGST põe a despesa fora do usuário.

**O erro:** o teto de R$ 4,00 circula em muito site como regra da Anatel, mas o
dispositivo que o estabeleça nunca foi localizado. Peça paga não pode afirmar o
que o próprio site trata como não confirmado.

**Como apareceu:** revisão que comparou o que os anúncios diziam com o que as
páginas diziam, e achou três versões do mesmo fato.

### /blog/virtual-ou-tradicional — art. 239 do RGST

**Passou a dizer:** a prestação do SMP por autorizada de rede virtual constitui
Serviço de Telecomunicações (RGST, art. 239).

**O erro:** sujeito trocado — é a prestação que constitui o serviço, não a
pessoa que presta. E o "é que" acrescentava exclusividade que a norma não
enuncia.

**Como apareceu:** abrindo o Anexo da Resolução 777/2025 para conferir uma
citação que havia entrado numa correção anterior sem ninguém ter lido a fonte.

### / e /planos — a origem dos cinco preços

**Passou a dizer:** “Preços conferidos no material oficial em 21 de outubro de
2026”, na home e na página de planos novas, e “Valores conferidos no material
oficial” na resposta da pergunta “quanto custa o plano da MOVVA?”.

**O erro:** não existe tabela de preços em material oficial da empresa. O único
documento da MOVVA na pasta do projeto é “Diferenciais planos de telefonia
MOVVA”, de doze páginas, que lista os seis diferenciais e **nenhum preço**. Os
cinco valores vêm de uma página de divulgação da rede de distribuidores. São
números de divulgação recebendo o peso de documento — exatamente o que o site
existe para não fazer, e logo na informação que mais pesa numa decisão de compra.

**Como apareceu:** não por revisão do próprio texto. Um verificador adversarial
checava outra página, a do custo do primeiro mês, e foi atrás da origem do
preço citado lá. A origem errada estava em três lugares ao mesmo tempo, porque
todos os três liam do mesmo módulo.

**O que mudou junto:** a atribuição passou a nomear a fonte real em todos os
três lugares, e a origem do preço virou o primeiro item dos pontos em aberto da
página de planos — ponto em aberto fala do assunto, e isso cabe na tela.

### /blog/portabilidade-sem-perder-o-numero — a fonte era de outro serviço

**Passou a dizer:** “Anatel — Portabilidade, direitos do consumidor”, apontando
para `/consumidor/conheca-seus-direitos/telefonia-fixa/portabilidade`.

**O erro:** o texto trata de levar o número do **celular**, e a única fonte da
Anatel listada era a página da portabilidade da telefonia **fixa**. Os dois
serviços têm página própria no portal da agência.

**Como apareceu:** abrindo a fonte para conferir outra coisa — o custo da
portabilidade — e reparando que o endereço dizia `telefonia-fixa`.

**Por que sobreviveu tanto tempo:** o endereço antigo ainda responde, por
redirecionamento. Nada aparecia quebrado em conferência nenhuma. Fonte que abre
parece fonte certa, e nenhum conferidor automático compara o *assunto* da fonte
com o assunto do texto.

### Três páginas e um anúncio — “a portabilidade é grátis”

**Passou a dizer:** em `/blog/portabilidade-sem-perder-o-numero`, em negrito,
“**Para você, nada.** O art. 92 do RGST põe o custo da portabilidade fora do
usuário”. Em `/blog/operadora-sem-fidelidade`, “portar o número é gratuito para
você (RGST, art. 92)”. E em `src/data/criativos.js`, no texto de apoio de uma
peça **paga**: “para você, não tem custo — o art. 92 do RGST põe a despesa fora
do usuário”.

**O erro:** o art. 92 não diz isso. Ele veda a cobrança pela prestadora
**doadora** — a que você deixa — e só. Quem pode cobrar é a **receptora**, pelo
art. 70 do mesmo RGST: “A portabilidade pode ser onerosa ao Usuário Portado, por
meio de valor cobrado pela Prestadora Receptora”. O § 3º permite que ela
dispense a cobrança, e é o que costuma acontecer — mas dispensa é escolha
comercial, não direito. O art. 71 lista as duas hipóteses em que a portabilidade
não é onerosa, e trocar de operadora não é nenhuma delas.

**O agravante:** uma das três superfícies era anúncio pago. Peça paga afirmando
direito que a norma não dá é outro patamar de risco — não é só o leitor que
confia errado, é a plataforma que pode derrubar a conta por alegação enganosa.

**Como apareceu:** não por revisão deste texto. Uma página nova, sobre contratar
e cancelar, citou o art. 70 ao tratar do custo de sair — e o conferidor dela
reparou que o site dizia o contrário em outro lugar. Três leitores independentes
foram às fontes primárias, inclusive um instruído a *defender* a gratuidade, e
os três voltaram com o mesmo texto literal, por caminhos diferentes: o site de
legislação da Anatel respondia erro 520, e eles foram pelo DataLegis e pelo DOU.

### Dois posts — o “critério de 95%” da cobertura

**Passou a dizer:** “uma localidade entra como coberta com mais de 95% da área
coberta”, em `/blog/operadora-virtual-pega-bem`, no meio de dois fatos reais da
nota técnica da Anatel — o que fazia o número parecer vir dela. E, em
`/blog/cobertura-zona-rural`, “só conta como coberta a localidade com mais de
95% da área coberta”.

**O erro:** a nota técnica do painel de cobertura não traz percentual de corte
nenhum. Ela agrega setores censitários e devolve um percentual; o painel não
classifica localidade em coberta ou não coberta. O único “95” do arquivo é o
limiar de −95 dBm do 2G.

**De onde o número veio, de verdade:** do anexo de compromissos de abrangência
do leilão do 5G, onde **município** atendido é o que tem 95% da **área urbana do
distrito sede** coberta, a −110 dBm. Para **localidade** — a palavra que o site
usava — o critério do mesmo anexo é o oposto: pelo menos uma ERB. Ou seja, o
número estava certo e aplicado à unidade errada, ao universo errado e ao
documento errado.

**Como apareceu:** um verificador extraiu o PDF da nota técnica inteiro para
conferir outra coisa e reparou que o número não estava lá.

### Página inicial — a quarta superfície da “portabilidade grátis”

**Passou a dizer:** no cartão “Portabilidade inclusa”, “Pela regra da Anatel o
processo leva até 3 dias úteis e, **para você, não tem custo**”
(`src/pages/index.astro`).

**O erro:** o mesmo da entrada acima, e sobrevivendo a ela. A rodada que corrigiu
os dois posts e o criativo não mexeu na home, que é a página mais vista do site.
Agora o cartão diz o que a norma diz: quem você deixa não pode cobrar pela saída
(RGST, art. 92) — sem afirmar gratuidade.

**Fica anotado:** a expressão “Portabilidade inclusa” continua no título, na meta
description, nas pílulas do hero e no cartão de oferta. Ela vem do documento de
diferenciais da empresa, não da norma; mas, enquanto não houver documento da MOVVA
dizendo se ela cobra ou dispensa a portabilidade (art. 70, § 3º), “inclusa” é
palavra do site sobre anúncio da empresa, e vale decidir se fica.

**Como apareceu:** conferência da página do custo do primeiro mês contra o
repositório inteiro, por grep de “não tem custo” depois de os posts já estarem
corrigidos.

### FAQ — chip, frete e o custo mensal do autor

**Passou a dizer:** em `src/data/perguntas.js`, “você contrata um plano mensal e
paga o chip mais o frete [...] eles já mudaram desde o material de lançamento”; e,
na resposta sobre ganhos, “um custo de plano de R$ 159,80 por mês”.

**O erro:** duas afirmações sem documento, num arquivo que sai em FAQPage JSON-LD
e por isso é lido por assistente de IA. A primeira dava por certo que o chip e o
frete são cobrados à parte — o que não está em documento nenhum — e ainda afirmava
conhecer variação de valores. A segunda chamava R$ 159,80 de “custo de plano” num
site que vende o Liberty a R$ 79,90, sem dizer o que o valor cobre.

**Como apareceu:** a página do custo do primeiro mês declarou as duas coisas em
aberto, e o conferidor comparou com o que a FAQ afirmava.

### /blog/esim-ou-chip-fisico — as duas fichas da Apple

**Passou a dizer:** “A nota de rodapé registra o mesmo para o iPhone Duo”, dentro
do parágrafo que descrevia a ficha do iPhone Air.

**O erro:** dois aparelhos pendurados numa ficha só. A ficha do iPhone Duo é
documento próprio, já estava na lista de fontes do post, e a nota de rodapé 14 é
dela. Correção de redação, não de pesquisa.

### A origem dos preços — a correção que foi para o lado errado

Esta entrada registra uma correção **minha, feita hoje, que piorou o site** — e
que foi desfeita no mesmo dia.

**De manhã**, o arquivo dizia que a tabela de preços vinha “do material da
empresa”, sem que ninguém tivesse aberto documento nenhum. Era chute.

**À tarde**, um verificador reparou que o único documento oficial aberto até ali,
o de diferenciais, tem doze páginas e **nenhum preço**. A atribuição foi
corrigida para “material de divulgação da rede de distribuidores, não documento
da MOVVA”, em três lugares, e a origem virou ponto em aberto.

**À noite**, o deck institucional de 66 páginas foi aberto. A tabela está na
**página 31**, sob o título “Nossos Planos — Sem pegadinhas. Sem asteriscos.
Preto no branco.”, com os cinco cards nomeados, a franquia e o preço de cada um.
Os cinco valores batem exatamente com os que o site publica.

**O erro:** a correção da tarde estava errada. Ela afirmou a origem de um número
— desta vez *negando* a empresa — sem ter aberto a fonte que a tinha.

**Por que ninguém a tinha aberto:** o deck tem 66 páginas e **zero texto
extraível**. Todas são imagem. Nenhuma busca por palavra encontrava nada nele, e
por isso ele ficou na pasta do projeto sem ser lido enquanto cinco rodadas de
verificação procuravam exatamente o que estava dentro dele. Só foi lido depois
de extrair as páginas como imagem e olhar uma por uma.

**A lição, e ela não é “o rigor atrapalhou”:** afirmar a origem de um número sem
abrir a fonte erra nos dois sentidos, para afirmar e para negar. Quando a busca
por palavra não acha, o documento pode estar ali mesmo assim — e PDF de
apresentação quase sempre está.

### “Portabilidade inclusa” — retirada por excesso de zelo

**Passou a dizer:** a expressão foi **removida** do título da home, da meta
description, do cartão de oferta e das pílulas, por raciocínio meu de que
“inclusa” afirmava que a portabilidade não é cobrada — e o art. 70 do RGST
permite que a operadora de destino cobre.

**O erro:** o raciocínio sobre a norma estava certo e a conclusão, errada. Os
cinco cards da página 31 do deck listam **“Portabilidade INCLUSA”**. Não é
afirmação do site sobre a norma: é a MOVVA declarando que não cobra, que é
exatamente a dispensa que o art. 70, § 3º permite. Atribuída à empresa, a
expressão é publicável — e voltou à lista de benefícios.

**Como apareceu:** junto da anterior, ao ler o deck.

---

## Por que não é página pública

Chegou a ser, em 21/10/2026, com o texto antigo ao lado do novo. O dono do site
apontou o defeito: mostrar as duas versões lado a lado faz o erro circular de
novo. Quem bate o olho na versão errada e sai da página leva embora a informação
errada, que é o contrário do que uma correção serve para fazer.

A página foi reduzida primeiro — sem reproduzir o texto antigo — e depois
retirada do ar por decisão dele.

**Se um dia voltar,** a forma menos exposta é outra: nota datada no pé da
própria página corrigida, onde quem leu a versão anterior volta, em vez de
página dedicada que concentra todos os erros num lugar só.

**O que permanece vale como regra de trabalho:** nenhuma destas correções veio de
leitor reclamando. Vieram de revisão, de leitura da fonte primária e de
refazer uma conta em vez de aceitá-la. É o processo que tem de continuar, esteja
ele publicado ou não.
