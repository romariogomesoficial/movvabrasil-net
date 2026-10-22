# Correções feitas no site

Registro interno. **Não é página publicada** — ficou fora do ar por decisão do
dono do site, em 21/10/2026. O motivo está no fim deste arquivo.

Serve para duas coisas: não repetir o mesmo erro, e saber o que foi corrigido
caso alguém pergunte.

---

## 22 de outubro de 2026

Dia de uma correção estrutural e de um lote grande. A correção estrutural veio
da leitura do plano de carreira no deck; o lote veio de uma revisão das 28
páginas com 45 leitores e verificação adversarial, que levantou 73 achados, dos
quais 38 sobreviveram à checagem.

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
