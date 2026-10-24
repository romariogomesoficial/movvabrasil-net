# Para onde o seu link de afiliado leva

Documento de trabalho. **Não é página publicada.** Escrito em 24/10/2026.

---

## RESOLVIDO no mesmo dia — leia isto primeiro

O resto deste documento descreve o problema e as opções, e fica como registro.
Mas a opção A, que parecia depender da MOVVA, **não dependia**: o link já
existia no seu próprio escritório virtual, em *Meus Links*.

> **Link Direto de Cadastro** — "Cadastro sem funil, usando seu código de
> indicação"
> `https://movvabrasil.com/cadastro?ref=REF-315C1470`

Conferi que ele é o mecanismo canônico da plataforma, e não um atalho: o
próprio aplicativo monta `/cadastro?ref=${referral_code}` a partir do seu
código, e valida o código no cadastro por `validate_referral_code`. A
atribuição da comissão é a mesma.

**O `LINK_AFILIADO` foi trocado para ele**, e o rótulo do botão passou de "Ver
a apresentação oficial" para "Ir para o cadastro na MOVVA", porque o destino
agora é uma tela de cadastro e não uma apresentação.

E os números do painel dizem que não se perdeu nada ao sair da VSL:

| Funil | Cliques | Cadastros | Receita |
|---|---|---|---|
| Máquina da Renda Recorrente | 31 | **0** | R$ 0,00 |
| Landing de Apresentação (a VSL) | 11 | **0** | R$ 0,00 |

Quarenta e dois cliques, zero cadastros. A VSL não estava convertendo —
estava só contradizendo o site.

**Ratificado pelo dono do site em 24/10/2026**, depois de ver os números dos
funis e a verificação de que a atribuição não muda. Reverter continua sendo uma
linha em `src/data/site.js`.

Verificação da atribuição, para quem for conferir depois: no aplicativo da
MOVVA, o `funnel_visitor_id` guardado no navegador é **analytics de funil** —
conta visita e clique. Quem define o patrocinador é o `upline_external_id`, em
`profiles_lookup`, gravado no cadastro a partir do `validate_referral_code`,
que recebe o `ref` da URL. Os dois links carregam o mesmo `ref`.

**Decisões associadas, de 24/10/2026:**

1. **As duas VSLs saem também dos outros canais**, não só do site. O funil
   "Máquina da Renda Recorrente" tinha 31 cliques que não vieram daqui — ou
   seja, estava sendo divulgado por fora. Site rigoroso com WhatsApp prometendo
   "dinheiro infinito" é incoerência que quem recebe os dois percebe primeiro.

2. **O que vai no lugar da VSL é o SITE, não o link de cadastro.** Isto corrige
   uma recomendação errada que eu mesmo tinha dado: a VSL, com todos os seus
   defeitos, *explicava alguma coisa*; o link de cadastro não explica nada e
   joga a pessoa num formulário sem contexto. Quem explica melhor que a VSL é o
   próprio site. Então:

   | Para quem | Manda este endereço |
   | --- | --- |
   | Quem você convida a empreender | `movvabrasil.net/oportunidade` |
   | Quem você quer como cliente | `movvabrasil.net` ou `movvabrasil.net/planos` |
   | Quem já leu e decidiu | o botão da própria página leva ao cadastro |

   O link de cadastro é o **último** passo, não o primeiro. E o tráfego passa a
   cair no domínio do autor, não no da empresa — que era um dos objetivos do
   projeto desde o começo.

3. **Não avisar a MOVVA sobre o conteúdo da VSL.** Proposto e recusado pelo
   dono do site em 24/10/2026. Fica registrado que a opção foi considerada.

---

## O que eu fui fazer, e o que achei sem querer

Fui testar se os 170 endereços que o site cita ainda respondem — a credencial
dele é "cada dado vem com o endereço onde você confere", e isso nunca tinha
sido verificado. De passagem, testei o endereço mais importante de todos, que
não está entre os 170: o link para onde vão **todos** os botões do site.

`https://movvabrasil.com/f/apnmovva?ref=024E6ED7`

Ele funciona. Responde 200, carrega, e o seu `ref` está nele. Não há nada
quebrado.

O problema é o que ele diz.

## A cópia da página, transcrita

Extraí o texto do DOM, não do print, para não errar palavra:

> **Uma nova operadora de telefonia está chegando ao Brasil…**
>
> …E pela primeira vez, você pode **ter dinheiro caindo em sua conta até
> enquanto dorme**, toda vez que **alguém pagar a conta de celular**, para se
> **aposentar** com uma **Renda Recorrente Mensal** perene para o resto da sua
> vida.

E o botão, que é a única ação da página:

> **QUERO GANHAR DINHEIRO INFINITO**

Há também, no player de vídeo, um selo vermelho escrito **AO VIVO** e um
cronômetro correndo. Esses dois eu vi no print e não consegui ler no DOM — o
player é um componente fechado —, então registro como observação visual, não
como medição.

## Por que isso é grave, no seu caso especificamente

Não é que a página seja agressiva. É que ela é **exatamente o oposto do site
que você está construindo**, e é o lugar para onde o site manda todo mundo.

Ponha lado a lado:

| O seu site publica | A página de destino promete |
| --- | --- |
| Bônus de recorrência sobre telefonia: **R$ 0,00** em três meses e meio | "dinheiro caindo em sua conta até enquanto dorme, toda vez que alguém pagar a conta de celular" |
| Resultado acumulado: **negativo** | "aposentar com uma Renda Recorrente Mensal perene para o resto da sua vida" |
| "Não há ganho garantido" | "GANHAR DINHEIRO INFINITO" |
| De 200 convidados, **1 se destaca** (0,5%) | nenhuma proporção |

A promessa central da página — ganhar toda vez que alguém paga a conta de
celular — é **precisamente** a linha que o seu extrato mostra em R$ 0,00, e que
o seu site documenta em quatro lugares diferentes.

Há três consequências concretas, e elas são independentes:

**1. Credibilidade.** Alguém lê trinta páginas suas, cuidadosas, cheias de
ressalva, com os seus números ruins à vista. Confia. Clica. E cai em "dinheiro
infinito" com cronômetro. A conclusão natural dessa pessoa não é "a empresa
exagera" — é "o site era isca". Você gasta a confiança que levou semanas para
construir no último clique.

**2. Política de anúncio.** O seu próprio `REGRAS-CRIATIVO.md` registra que a
Meta trata remuneração ligada a recrutamento como "conteúdo proibido sobre
investimentos", e que o enquadramento custa o perfil, não só o anúncio. A
análise de uma plataforma olha o **funil**, não só a peça. Hoje o seu funil
termina em "renda perene para o resto da sua vida".

**3. O critério que você mesmo publica.** O `criativos.js` tem três comentários
seus proibindo afirmar o que o próprio site desautoriza — foi por isso que a
palavra "infinitos" saiu de uma peça sua. A palavra saiu da sua peça e continua
no destino dela.

## O que eu não sei, e muda as opções

- **Quem escreveu essa página.** Ela está hospedada no domínio da MOVVA, em
  `/f/apnmovva`. O `/f/` sugere "funil", e `apnmovva` pode ser campanha ou
  upline. Se for material oficial da empresa, você não edita; se for de rede,
  talvez.
- **Se existe destino alternativo que carregue o seu `ref`.** Testei o domínio
  nu com `?ref=024E6ED7`: ele redireciona para `/login` e **descarta o
  parâmetro**. Ou seja, trocar o link pelo endereço simples custaria a
  atribuição da sua comissão. Um link neutro que preserve o `ref` precisa vir
  da MOVVA.

## As opções, como eu as vejo

**A. Pedir à MOVVA um link de cadastro que carregue o seu `ref` sem a VSL.**
É o melhor desfecho e o mais barato: o seu site já faz a explicação inteira, e
bem melhor do que a página faz. O link só precisa ser o passo de assinatura.
Vale pedir por escrito, com protocolo, junto das outras perguntas que já estão
na sua lista.

**B. Manter o link e avisar o leitor antes do clique.** Uma linha curta ao lado
de cada botão, dizendo que a página de destino é material de venda da empresa e
não segue o critério deste site. É honesto, é barato, e preserva a comissão —
mas é estranho: você passa a pedir desculpa pelo lugar para onde está mandando
a pessoa.

**C. Não fazer nada.** É defensável enquanto o volume é pequeno. Deixa de ser
defensável no dia em que você puser dinheiro em anúncio.

Eu recomendo **A**, e **B** enquanto A não vier.

## O que eu não fiz, de propósito

Não troquei o `LINK_AFILIADO`, não tirei botão nenhum e não escrevi aviso
algum. É a sua fonte de renda e a sua relação com a empresa: a decisão é sua, e
eu não a tomo pelo caminho de já ter mexido.

## Como conferir você mesmo

Abra num navegador anônimo, para não pegar sessão sua:

    https://movvabrasil.com/f/apnmovva?ref=024E6ED7

O texto está no topo, antes do vídeo. O botão verde está logo abaixo.
