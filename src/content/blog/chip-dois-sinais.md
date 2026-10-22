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
  - rotulo: "GSMA SGP.31 — eSIM IoT Architecture and Requirements V1.3 (22/05/2026), seções 1.1, 1.2 e 1.4"
    url: "https://www.gsma.com/solutions-and-impact/technologies/esim/wp-content/uploads/2026/05/SGP.31-v1.3.pdf"
  - rotulo: "Anatel — Ato nº 12712, de 4 de setembro de 2024, Anexo 1, item 16.1 (MNC)"
    url: "https://informacoes.anatel.gov.br/legislacao/component/content/article/154-atos-de-numera%C3%A7%C3%A3o/2140-ato-12712"
  - rotulo: "Anatel — Resolução nº 777/2025, Anexo (RGST), arts. 217, 226, 235 e 241"
    url: "https://informacoes.anatel.gov.br/legislacao/resolucoes/2025/2022-resolucao-777"
  - rotulo: "Anatel — Resolução nº 783/2025, Anexo (PGMC), art. 66 — vedação do roaming permanente"
    url: "https://informacoes.anatel.gov.br/legislacao/resolucoes/2025/2060-resolucao-783"
  - rotulo: "Apple Support — Using Dual SIM with an eSIM (consultada em 20/10/2026)"
    url: "https://support.apple.com/en-us/109317"
  - rotulo: "Google — Ajuda do Pixel: how to use dual SIMs on your Google Pixel phone (consultada em 20/10/2026)"
    url: "https://support.google.com/pixelphone/answer/9449293"
---

## Chip que pega em duas operadoras existe?

Existe chip com mais de uma identidade de rede. Não existe aparelho em duas redes ao mesmo tempo com um chip só.

## As quatro coisas vendidas com esse nome

| O que é | Números | Quem troca | O que muda para você |
| --- | --- | --- | --- |
| **Multi-IMSI**: várias identidades no cartão, uma ativa | 1 | o cartão, avisando o aparelho | troca de rede sem você mexer |
| **eSIM com vários perfis**: perfis de operadora baixados no aparelho | 1 por perfil | você, nas configurações | troca de operadora sem trocar de chip ([o que é eSIM e quais aparelhos aceitam](/blog/esim-ou-chip-fisico)) |
| **Roaming ou acordo de visitante**: outra rede te atende por contrato | 1 | a rede, pelo contrato | cobertura fora da área da sua operadora |
| **Dual SIM**: dois chips, duas assinaturas | 2 | você, nas configurações | dois planos, dados numa linha por vez |

Das quatro, dual SIM é a que existe em qualquer loja — e não é "um chip, duas redes". A Apple registra que o iPhone usa uma rede de dados por vez, com SIM físico mais eSIM ou dois eSIM (iPhone 13 em diante). No Android, o DSDS do Google mantém duas linhas em uso e só uma como padrão de dados.

## Por que o aparelho fica numa rede por vez

A identidade gravada no chip aponta para uma rede. É o IMSI: MCC, três dígitos de país; MNC, dois ou três dígitos da rede; e o MSIN. No máximo 15 dígitos, um por assinante.

O par MCC+MNC identifica uma rede, não uma marca. E a escolha é por fila: no modo automático, o aparelho percorre uma lista de redes em ordem de prioridade e fica na primeira disponível e permitida. Duas redes no chip nunca significam duas redes ao mesmo tempo.

## O que acontece dentro do cartão

No multi-IMSI, o cartão guarda mais de uma identidade, ativa uma por vez e avisa o aparelho pelo comando REFRESH. Seu número não muda. Não localizei especificação da GSMA de multi-IMSI, e a norma admite que o aparelho recuse a troca durante uma chamada: troca no meio de uma ligação não é garantida.

Há uma quinta via, padronizada e pouco explicada: a lista de HPLMN equivalentes. Com um IMSI só, as redes dessa lista substituem o código derivado do IMSI na seleção de rede, e vale a equivalente de maior prioridade. É um arquivo opcional do cartão, o EF-EHPLMN (6FD9) — nem todo chip tem.

## O "SIM resiliente" está na norma de IoT

As especificações de eSIM da GSMA são dois conjuntos: SGP.21 e SGP.22, de consumo; SGP.31 e SGP.32, de IoT, cuja V1.3 saiu em 22/05/2026.

O mecanismo que troca de rede quando a atual falha existe como norma, do lado de IoT: a GSMA define o Fallback Mechanism como mecanismo do eUICC que habilita um perfil marcado com o Atributo de Fallback quando o perfil habilitado perde conectividade. O escopo declarado é dispositivo de IoT, não o celular de consumo.

## O que a regra brasileira permite

Permite duas redes atrás da mesma marca. O RGST diz: "O Credenciado pode deter contrato para representação com mais de uma Prestadora Origem em uma determinada Área de Registro" (Resolução 777/2025, Art. 217, parágrafo único). A autorizada também pode, com mais de um contrato de compartilhamento (Art. 241, § 2º); o acordo de visitante tem base própria (Art. 226). A diferença entre credenciada e autorizada está [neste post](/blog/o-que-e-operadora-virtual).

Com mais de uma origem nasce um dever útil: o credenciado tem de garantir que suas demandas sejam atendidas pela prestadora de origem que suporta o seu acesso (Art. 235, § 1º). Roaming nacional é outra coisa, e nele o roaming permanente é vedado: o art. 66, § 4º o define como acampamento fora da área de prestação por mais de 90 dias corridos — regra que vincula as prestadoras, não você. A cobertura continua sendo da rede hospedeira, como está em [como funciona a cobertura de operadora virtual](/blog/operadora-virtual-pega-bem).

## Sobre a MOVVA: o que eu posso e não posso dizer

Por um tempo eu só pude dizer que a MOVVA publicava "dupla conectividade TIM e Vivo num único chip" sem dizer **como** — e o como é o que muda a sua vida, porque roaming, multi-IMSI e credenciamento com mais de uma origem são três coisas diferentes.

O deck institucional da empresa responde, e é específico: **"Rede TIM + Roaming da VIVO"**. Não são duas redes contratadas. A principal é a da TIM; a Vivo entra por roaming.

Isso tem uma consequência que vale conhecer antes de contratar. O **art. 66, § 4º, do PGMC** veda o roaming permanente, e define a prática como o acampamento de usuário **fora da área de prestação** por mais de 90 dias corridos. É regra de atacado: as consequências que a norma prevê, no § 5º, são multa ou rescisão do contrato de Roaming Nacional entre as prestadoras, com um ano de impedimento para novo contrato regulado. Nada no artigo autoriza bloquear, desconectar ou penalizar você.

Duas precisões mudam a leitura, e as duas estão no próprio texto da norma. A primeira: o limite se mede pela **área de prestação**, que é o alcance da outorga, e não pelo mapa de antenas — conectividade dentro da área da prestadora contratante não é roaming nacional, por definição do art. 36, IV do mesmo Plano. A segunda: a regra brasileira permite, por escrito, que uma operadora virtual tenha contrato com **mais de uma prestadora de origem** na mesma área de registro (RGST, arts. 217, parágrafo único, e 241, § 2º), e manda considerar como parte da rede da própria autorizada os recursos contratados em exploração industrial (art. 242). Nesses desenhos não existe acampamento fora da área, a segunda rede não é o Roaming Nacional de que trata o art. 66, e o teto de 90 dias não entra na conta.

Então o que falta aqui não é explicação para uma contradição: é um documento que diga **sob qual instrumento a Vivo entra**. O deck chama de "roaming", mas é peça comercial, não contrato — e a palavra numa peça de venda não decide o enquadramento.

Não valido nem invalido a promessa: entrego o método para você conferir sozinho, e o estado do meu próprio teste está na nota ao pé desta página.

## Como você confere sozinho quando o chip chegar

1. **Desconfie do nome na tela.** Por norma, ao menos 10 redes (MCC+MNC) podem exibir o mesmo nome, e o nome gravado no chip tem prioridade sobre o da rede.
2. **Procure o código numérico.** Não publico tabela por empresa: a lista da ITU que abri é de 15/11/2023. E credenciada não tem código próprio, porque o MNC vai só para quem tem outorga de SMP.
3. **Aviso de roaming é indício, não prova:** a exibição depende do chip e do fabricante.
4. **Desligue a seleção automática** e veja onde o chip aceita registrar.
5. **Conte linhas e perfis:** um número ou dois separa dual SIM de troca dentro do chip.
6. **Cronometre a volta** num ponto onde uma das redes não pega: pela norma, a primeira tentativa sai entre 2 minutos e T, o tempo configurado, e só com o aparelho em repouso.
7. **Peça por escrito, com protocolo, qual prestadora de origem suporta o seu acesso.**

## O que eu não consegui confirmar

Nenhuma norma da Anatel que eu abri menciona multi-IMSI, lista de equivalentes ou "chip de duas redes": ela trata de contrato e numeração, não do que há no cartão. Em aberto:

- **A afirmação da MOVVA em documento público dela.** O domínio institucional que abri em 20/10/2026 não exibia a oferta a quem não está logado; a página de apresentação do link de divulgação exibe, mas é material comercial, não documento. Peça a oferta por escrito, com protocolo: ela precisa trazer o nome da credenciada e o da prestadora de origem.
- **Sob qual instrumento a Vivo entra no chip.** Não achei documento da empresa dizendo qual é a prestadora de origem, qual é a área de prestação, e se a Vivo entra por contrato de Roaming Nacional, por acordo de atendimento a usuário visitante (RGST, art. 226), por exploração industrial ou por compartilhamento com uma segunda origem. Sem isso não dá para afirmar que o art. 66 alcança este plano, nem que não alcança. É o ponto que eu mais gostaria de ver respondido por escrito, com protocolo.
- **Se a empresa é credenciada ou autorizada** — autorizada pode ter código próprio. O dossiê institucional dela descreve a operação por outra cadeia, citando contrato com a ISPS do Brasil (TIP Brasil) sobre infraestrutura da ARQIA, sem mencionar TIM nem Vivo. Os dois documentos são da empresa e não fecham entre si.
- **Se o eSIM de consumo tem fallback como o de IoT.** Os PDFs da SGP.21 e da SGP.22 não abriram legíveis aqui: leia no site da GSMA.
- **Quem detém cada código de rede hoje, de qual origem sai o seu número, e se o seu aparelho aceita o REFRESH.** Boletim da ITU, oferta, 1331 e fabricante.

## O que isso muda na sua escolha

Troque a pergunta: quais são as duas redes, qual delas suporta o meu acesso, e o que acontece quando a principal cai. Trocar de virtual não cria cobertura nova; levar o número é outro assunto — veja [como funciona a portabilidade](/blog/portabilidade-sem-perder-o-numero).

---

Nota de transparência: distribuidor independente da MOVVA Brasil Ltda, sem vínculo oficial. Nada aqui descreve característica de produto da MOVVA como verificada. Fontes de 20/10/2026.
