---
title: "Chip que pega em duas operadoras: o que existe de verdade"
description: "Multi-IMSI, eSIM, roaming e dual SIM são quatro coisas diferentes. Veja o que muda para você e como conferir em qual rede o seu chip está."
resposta: "Quatro coisas diferentes são vendidas com esse nome: multi-IMSI, eSIM com vários perfis, acordo de roaming e dual SIM. Nenhuma delas põe o aparelho em duas redes ao mesmo tempo, porque ele se registra numa rede por vez. As três primeiras mantêm um número só. Dual SIM é dois chips e dois números."
cluster: diferencial
publicado: 2026-10-20
atualizado: 2026-10-20
fontes:
  - rotulo: "ETSI TS 123 003 V19.8.0 (3GPP TS 23.003), cláusulas 2.1 a 2.3 — estrutura do IMSI e alocação de MCC e MNC"
    url: "https://www.etsi.org/deliver/etsi_ts/123000_123099/123003/19.08.00_60/ts_123003v190800p.pdf"
  - rotulo: "ETSI TS 123 122 V19.7.0 (3GPP TS 23.122), cláusulas 1.2, 3.1, 4.4.3 e 4.4.3.3.1 — EHPLMN e seleção de rede"
    url: "https://www.etsi.org/deliver/etsi_ts/123100_123199/123122/19.07.00_60/ts_123122v190700p.pdf"
  - rotulo: "ETSI TS 131 102 V19.6.0 (3GPP TS 31.102), cláusula 4.2.84 — arquivo EF-EHPLMN (6FD9)"
    url: "https://www.etsi.org/deliver/etsi_ts/131100_131199/131102/19.06.00_60/ts_131102v190600p.pdf"
  - rotulo: "ETSI TS 122 101 V19.4.0 (3GPP TS 22.101), anexos A.3 e A.4 — nome de rede e de prestador de serviço"
    url: "https://www.etsi.org/deliver/etsi_ts/122100_122199/122101/19.04.00_60/ts_122101v190400p.pdf"
  - rotulo: "ETSI TS 102 223 V18.3.0 — Card Application Toolkit, comando REFRESH"
    url: "https://www.etsi.org/deliver/etsi_ts/102200_102299/102223/18.03.00_60/ts_102223v180300p.pdf"
  - rotulo: "GSMA — eSIM Specification (tabela de versões e datas, consultada em 20/10/2026)"
    url: "https://www.gsma.com/solutions-and-impact/technologies/esim/esim-specification/"
  - rotulo: "GSMA SGP.31 — eSIM IoT Architecture and Requirements V1.3 (22/05/2026), seções 1.1, 1.2 e 1.4 e requisitos EUICCF22 a EUICCF26"
    url: "https://www.gsma.com/solutions-and-impact/technologies/esim/wp-content/uploads/2026/05/SGP.31-v1.3.pdf"
  - rotulo: "Anatel — Ato nº 12712, de 4 de setembro de 2024, Anexo 1, item 16.1 (MNC)"
    url: "https://informacoes.anatel.gov.br/legislacao/component/content/article/154-atos-de-numera%C3%A7%C3%A3o/2140-ato-12712"
  - rotulo: "Anatel — Resolução nº 777/2025, Anexo (RGST), arts. 217, 226, 235 e 241"
    url: "https://informacoes.anatel.gov.br/legislacao/resolucoes/2025/2022-resolucao-777"
  - rotulo: "Anatel — Resolução nº 783/2025, Anexo (PGMC), arts. 36 e 66"
    url: "https://informacoes.anatel.gov.br/legislacao/resolucoes/2025/2060-resolucao-783"
  - rotulo: "Apple Support — Using Dual SIM with an eSIM (consultada em 20/10/2026)"
    url: "https://support.apple.com/en-us/109317"
  - rotulo: "Google — Ajuda do Pixel: how to use dual SIMs on your Google Pixel phone (consultada em 20/10/2026)"
    url: "https://support.google.com/pixelphone/answer/9449293"
---

## Chip que pega em duas operadoras existe?

Existe chip com mais de uma identidade de rede. Não existe aparelho em duas redes ao mesmo tempo com um chip só. O anúncio junta as duas coisas.

Transparência, no alto: sou distribuidor independente da MOVVA Brasil Ltda, este site não é canal oficial da empresa, contratei o plano, o chip não chegou e não testei nada em campo. Abaixo há norma, especificação técnica e método. Não é teste de produto.

## As quatro coisas vendidas com esse nome

| O que é | Números | Quem troca | O que muda para você |
| --- | --- | --- | --- |
| **Multi-IMSI**: o cartão guarda várias identidades e ativa uma | 1 | o cartão, avisando o aparelho | troca de rede sem você mexer |
| **Lista de equivalentes (EHPLMN)**: um IMSI e uma lista de redes tratadas como de casa | 1 | o aparelho, pela lista do chip | a segunda rede entra na escolha automática |
| **Roaming ou acordo de visitante**: outra rede te atende por contrato | 1 | a rede, pelo contrato | cobertura fora da área da sua operadora |
| **Dual SIM**: dois chips, duas assinaturas | 2 | você, nas configurações | dois planos, dados numa linha por vez |

## Por que o aparelho fica numa rede por vez

A identidade gravada no chip aponta para uma rede. É o IMSI: MCC, três dígitos de país; MNC, dois ou três dígitos da rede naquele país; e o MSIN. No máximo 15 dígitos, um por assinante.

Os MCC são administrados pela ITU, e os MNC designados país por país. A norma recomenda, sem proibir, que o mesmo MNC não vá para mais de uma rede: o par MCC+MNC identifica uma rede, não uma marca.

No modo automático, o aparelho percorre uma lista de redes em ordem de prioridade e fica na de maior prioridade disponível e permitida. Duas redes no chip nunca significam duas redes ao mesmo tempo.

## O que acontece dentro do cartão

No multi-IMSI, o cartão guarda mais de uma identidade, ativa uma por vez e avisa o aparelho pelo comando REFRESH. Seu número não muda. Não localizei especificação da GSMA de multi-IMSI, e a norma admite que o aparelho recuse a troca durante uma chamada: trocar de rede no meio de uma ligação não é garantido.

A outra via é padronizada: a lista de HPLMN equivalentes. Com um IMSI só, as redes dessa lista substituem, na seleção de rede, o código derivado do IMSI, e o aparelho fica na equivalente de maior prioridade disponível. É um arquivo do cartão, o EF-EHPLMN (6FD9), marcado como opcional — nem todo chip tem.

A volta não é instantânea: de uma rede visitada, em automático, a primeira tentativa sai entre 2 minutos e T, o tempo configurado, com o aparelho em repouso.

## O "SIM resiliente" está na norma de IoT

As especificações de eSIM da GSMA são dois conjuntos: SGP.21 e SGP.22, de consumo; SGP.31 e SGP.32, de IoT — a V1.3 da SGP.32 saiu em 22/05/2026.

O mecanismo que troca de rede quando a atual falha existe como norma, do lado de IoT. A GSMA define o Fallback Mechanism como mecanismo do eUICC que habilita o perfil marcado com o Atributo de Fallback quando o perfil habilitado perde conectividade. O escopo declarado é dispositivo de IoT com restrição de rede e/ou de interface de usuário, não o celular de consumo.

## Dual SIM: dois chips, dois números

É a opção que existe hoje em qualquer loja, e não é "um chip, duas redes". A Apple registra que o iPhone usa uma rede de dados por vez, que o dual SIM se dá com SIM físico mais eSIM e que do iPhone 13 em diante também valem dois eSIM, com o aparelho desbloqueado pela operadora ou os dois planos na mesma empresa. No Android, o DSDS do Google tem duas linhas em uso e só uma como padrão para dados; dois eSIM pedem Pixel 7 ou posterior, e chamadas nos dois chips ao mesmo tempo aparecem a partir do Pixel 8a.

## O que a regra brasileira permite, e o que roaming não é

Permite duas redes atrás da mesma marca. O RGST diz: "O Credenciado pode deter contrato para representação com mais de uma Prestadora Origem em uma determinada Área de Registro" (Resolução 777/2025, Art. 217, parágrafo único). A autorizada de rede virtual também pode ter contrato de compartilhamento com mais de uma prestadora de origem na mesma área (Art. 241, § 2º). Credenciada representa outra prestadora; autorizada tem outorga própria — [os dois modelos estão neste post](/blog/o-que-e-operadora-virtual).

Daí vem um dever útil: com mais de uma origem, o credenciado tem de garantir que suas demandas sejam atendidas pela prestadora de origem que suporta o seu acesso (Art. 235, § 1º). Há ainda um quarto caminho, sem tecnologia nova no chip: usar os acordos de atendimento a Usuários Visitantes da prestadora de origem, ou firmar os próprios (Art. 226).

Roaming nacional é outra coisa: um mercado de atacado, a oferta de conectividade a usuários de outras redes móveis fora da área de prestação de quem contrata. E ele não serve para estacionar cliente na segunda rede, porque é vedado o roaming permanente, caracterizado por mais de 90 dias corridos fora da área de prestação — regra que vincula as prestadoras na oferta regulada, não você. Em qualquer arranjo, a cobertura é da rede hospedeira, como está em [como funciona a cobertura de operadora virtual](/blog/operadora-virtual-pega-bem).

## Sobre a MOVVA: o que eu posso e não posso dizer

A empresa anuncia, em material comercial, dupla conectividade TIM e Vivo num único chip. Eu não testei, o chip não chegou, e não localizei página pública dela que sustente essa afirmação técnica — as páginas que a repetem são blogs de afiliado, que não são fonte aqui. Não valido nem invalido a promessa, e não sei qual dos quatro mecanismos seria usado, se algum. O que eu entrego é o método.

## Como você confere sozinho quando o chip chegar

1. **Desconfie do nome na tela.** Por norma, ao menos 10 identificações de rede (MCC+MNC) podem exibir o mesmo nome de prestador, e o nome gravado no chip tem prioridade sobre o do aparelho e o da rede.
2. **Procure o código numérico.** Não publico tabela por empresa: a lista oficial que abri é um retrato de 15/11/2023. E credenciada não tem código próprio, porque o MNC vai só para quem tem outorga de Serviço Móvel Pessoal.
3. **Aviso de roaming é indício, não prova** — a exibição depende das regras gravadas no chip e do fabricante.
4. **Desligue a seleção automática** e veja em quais redes o chip aceita registrar.
5. **Conte linhas e perfis:** um número ou dois separa dual SIM de troca dentro do chip.
6. **Vá até onde uma das redes não pega e cronometre,** parado: a volta leva de 2 minutos a T.
7. **Peça por escrito, com protocolo, qual prestadora de origem suporta o seu acesso.**

## O que eu não consegui confirmar

Nenhuma norma da Anatel que eu abri menciona multi-IMSI, lista de equivalentes ou "chip de duas redes": a regulação trata de contrato entre prestadoras e de numeração, não do que há dentro do cartão. Em aberto também:

- **A afirmação da MOVVA em documento público dela.** O site que testei em 20/10/2026 não mostra conteúdo a quem não está logado. Peça a oferta por escrito, com protocolo.
- **Qual mecanismo seria usado, e se a empresa é credenciada ou autorizada** — autorizada pode ter código de rede próprio. Pergunte a ela e veja o painel de outorga da Anatel.
- **Se o eSIM de consumo tem fallback como o de IoT.** Os PDFs da SGP.21 e da SGP.22 não abriram legíveis aqui: leia no site da GSMA.
- **Quem detém cada código de rede brasileiro hoje, e de qual origem sai o seu número quando a credenciada tem duas.** Boletim da ITU, oferta e 1331.
- **Se o seu aparelho aceita o REFRESH, e se existe plano de consumo no Brasil com multi-IMSI.** Pergunte ao fabricante; a cobertura de telecom que achei trata de IoT e M2M.

## O que isso muda na sua escolha

Troque a pergunta. Não é "esse chip pega duas operadoras?", e sim: quais são as duas redes, qual delas suporta o meu acesso, e o que acontece quando a principal cai. As respostas estão na oferta e no atendimento, não no nome na tela. Trocar de operadora virtual não cria cobertura nova, e levar o número é outro assunto — veja [como funciona a portabilidade](/blog/portabilidade-sem-perder-o-numero).

---

Nota de transparência: site mantido por distribuidor independente da MOVVA Brasil Ltda, sem vínculo oficial com a empresa. Nada aqui descreve característica de produto da MOVVA como verificada: contratei o plano, o chip não chegou e não testei em campo. Fontes verificadas em 20/10/2026, nas versões indicadas.
