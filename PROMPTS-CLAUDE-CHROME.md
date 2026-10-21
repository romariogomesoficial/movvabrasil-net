# Prompts para colar no Claude in Chrome

## Situação, em uma frase

O `movvabrasil.net` está **registrado** na Hostinger, mas nunca foi hospedado lá.
Os nameservers apontam para o Builderall, onde está o site antigo. Para o site
novo funcionar, é preciso criar o site na Hostinger, subir os arquivos e só então
mudar os nameservers.

**Ordem que importa:** o site sobe primeiro, o DNS muda depois. Assim o domínio
nunca aponta para uma pasta vazia.

---

## PROMPT 1 — criar repositório no GitHub ✅ FEITO

Repositório: `https://github.com/romariogomesoficial/movvabrasil-net.git`
Branch com o site pronto: `deploy`

---

## PROMPT 2 — Hostinger

Cole isto no Claude in Chrome:

```
Preciso colocar o domínio movvabrasil.net para funcionar na minha hospedagem
Hostinger. Eu já estou logado no hPanel.

CONTEXTO IMPORTANTE, leia antes de agir:
- O domínio movvabrasil.net está registrado nessa conta Hostinger, mas hoje ele
  NÃO é um site da hospedagem. Ele só existe como registro de domínio.
- Os nameservers dele apontam para o Builderall, onde existe um site antigo que
  eu quero desativar por completo. Eu não quero nada daquele site.
- Eu não uso e-mail nesse domínio.
- O site novo vem de um repositório Git já pronto.

Faça nesta ordem. NÃO pule e NÃO inverta:

PASSO 1 — Criar o site na hospedagem
Em Sites (ou Hospedagem), use "Adicionar site" / "Criar site".
Escolha site em branco, HTML ou PHP puro.
NÃO instale WordPress. NÃO use construtor de site. NÃO instale CMS nenhum.
Domínio: movvabrasil.net
Se pedir para criar senha de administrador ou instalar alguma coisa, pare e me
avise antes de continuar.
Me confirme quando o site aparecer na lista.

PASSO 2 — Configurar o Git
Vá em Avançado → Git (pode aparecer como "Git Version Control" ou "GIT").
Crie um repositório com exatamente estes valores:
- Repository URL: https://github.com/romariogomesoficial/movvabrasil-net.git
- Branch: deploy
- Diretório / caminho de instalação: public_html

ATENÇÃO: a branch é "deploy", não é "main". Se você colocar main, vai para o
servidor o código-fonte em vez do site, e não funciona.

Salve e, se aparecer botão "Deploy" ou "Implantar", clique nele.

Se der erro dizendo que a pasta não está vazia: vá no Gerenciador de arquivos,
entre em public_html, apague o conteúdo (é só a página padrão da Hostinger que
acabou de ser criada) e tente o Git de novo.

PASSO 3 — Conferir se os arquivos chegaram
No Gerenciador de arquivos, entre em public_html e ative "mostrar arquivos
ocultos" nas configurações.
Me diga se você vê estes arquivos: index.html, movva-e-confiavel.html,
robots.txt, llms.txt, sitemap-index.xml, a pasta blog, e um arquivo chamado
.htaccess
Se o .htaccess não estiver lá, me avise, porque sem ele o site não funciona
direito.

PASSO 4 — Me mostrar os nameservers da Hostinger
Procure qual par de nameservers a Hostinger indica para esse domínio. Costuma
aparecer em Domínios → movvabrasil.net, ou numa tela de "apontar domínio".
Apenas copie os nomes exatos para mim. NÃO mude nada ainda.

PASSO 5 — PARE E ME PERGUNTE
Me diga que está tudo pronto para a troca de nameservers e me pergunte se pode
prosseguir. Lembre que isso tira o site antigo do Builderall do ar.
Só continue depois que eu responder que sim.

PASSO 6 — Trocar os nameservers
Em Domínios → movvabrasil.net, troque os nameservers do Builderall pelos da
Hostinger.

PASSO 7 — SSL
Vá em Segurança → SSL e veja se há certificado para movvabrasil.net.
Se houver botão para emitir ou instalar SSL gratuito, clique.
Se disser que precisa aguardar o DNS, me avise e pare.

PASSO 8 — Forçar HTTPS
Me diga apenas se a opção "Forçar HTTPS" está LIGADA ou DESLIGADA. Não mude.

Reporte o resultado de cada passo. Se aparecer qualquer erro, copie a mensagem
exata, sem resumir.

Regras: não digite senha nenhuma, não instale WordPress nem construtor de site,
não compre nada, não aceite termo ou upgrade novo, e não mude nenhuma
configuração que eu não pedi acima.
```

---

## PROMPT 3 — continuar na Hostinger

Use este depois de liberar o repositório no GitHub (ver seção abaixo).

```
Vamos continuar de onde paramos na Hostinger. Eu já liberei o repositório
movvabrasil-net para o app da Hostinger no GitHub.

O PASSO 1 já está feito: o site movvabrasil.net já existe no plano Business,
vazio, sem WordPress.

Continue a partir do PASSO 2:

PASSO 2 — Configurar o Git
Vá em Avançado → GIT.
Use "Continue com GitHub" e procure o repositório movvabrasil-net.
Se ainda não aparecer, clique no botão de atualizar a lista.
Configure com:
- Repositório: movvabrasil-net
- Branch: deploy
- Diretório / caminho de instalação: public_html

ATENÇÃO: a branch é "deploy", não "main". Com main vai o código-fonte em vez
do site, e não funciona.

Salve e clique em "Deploy" / "Implantar" se o botão existir.

Se der erro dizendo que a pasta não está vazia: no Gerenciador de arquivos,
entre em public_html, apague o conteúdo (é só a página padrão) e repita.

PASSO 3 — Conferir os arquivos
No Gerenciador de arquivos, entre em public_html e ative "mostrar arquivos
ocultos".
Me diga se você vê: index.html, movva-e-confiavel.html, robots.txt, llms.txt,
sitemap-index.xml, a pasta blog, e o arquivo .htaccess
Se o .htaccess não estiver lá, me avise.

PASSO 4 — Nameservers da Hostinger
Copie para mim o par de nameservers que a Hostinger indica para esse domínio.
NÃO mude nada ainda.

PASSO 5 — PARE E ME PERGUNTE
Avise que está pronto para trocar os nameservers, lembre que isso derruba o
site antigo do Builderall, e espere eu responder.

PASSO 6 — Trocar os nameservers
Só após o meu "sim".

PASSO 7 — SSL
Em Segurança → SSL, emita o certificado gratuito se o botão existir. Se pedir
para aguardar o DNS, me avise e pare.

PASSO 8 — Me diga se "Forçar HTTPS" está LIGADA ou DESLIGADA. Não mude.

Reporte cada passo e copie qualquer erro com o texto exato.

Regras: não digite senha, não instale WordPress nem construtor, não compre
nada, não aceite termo novo, não mude o que eu não pedi.
```

---

## Liberar o repositório no GitHub (só você pode fazer)

O app da Hostinger no seu GitHub tem acesso apenas a repositórios escolhidos um
a um. O `movvabrasil-net` é novo e não está na lista.

1. GitHub → foto do perfil → **Settings**
2. Menu da esquerda → **Integrations → Applications** → aba **Installed GitHub Apps**
3. Na linha **Hostinger**, clique em **Configure**
4. O GitHub vai pedir confirmação de identidade: **Verify via email**. Pegue o
   código no seu e-mail e confirme.
5. Em **Repository access**, mantenha "Only select repositories" e clique em
   **Select repositories**
6. Adicione **movvabrasil-net**
7. **Save**

Mantenha "Only select repositories". Não troque para "All repositories" — não há
motivo para dar à Hostinger acesso aos seus outros cinco repositórios.

---

## PROMPT 4 — conferência final (não muda nada)

```
Preciso só conferir quatro coisas no hPanel da Hostinger, no site
movvabrasil.net. NÃO mude nada, só me reporte.

1. BRANCH DO GIT
   Vá em Avançado → GIT e me diga qual branch está configurada no repositório
   movvabrasil-net. Preciso saber se está "deploy" ou "main".
   Me diga também qual é o diretório de instalação.

2. CONTEÚDO DO public_html
   Vá no Gerenciador de arquivos, entre em public_html e ative
   "mostrar arquivos ocultos" nas configurações.
   Me liste TUDO que está lá dentro, incluindo pastas.
   Preciso saber especificamente se existem:
   - .htaccess
   - index.html
   - movva-e-confiavel.html
   - robots.txt
   - llms.txt
   - sitemap-index.xml
   - a pasta blog
   - a pasta _astro
   E me diga se existe alguma dessas, que NÃO deveria estar lá:
   - package.json
   - astro.config.mjs
   - uma pasta chamada src
   - uma pasta chamada node_modules

3. SSL
   Em Segurança → SSL, me diga o status atual do certificado do
   movvabrasil.net: Instalando, Ativo, ou outro.

4. FORÇAR HTTPS
   Se a opção "Forçar HTTPS" já tiver aparecido, me diga se está LIGADA ou
   DESLIGADA. Se ainda não aparecer, me diga que não apareceu.

Não altere nenhuma configuração. É só leitura e relatório.
```

**O que a resposta do item 2 significa:**

- Se aparecerem `.htaccess`, `index.html` e a pasta `blog` → o Git puxou da
  branch certa. Tudo certo.
- Se aparecerem `package.json`, `astro.config.mjs` ou a pasta `src` → o Git está
  na branch `main` em vez de `deploy`. Precisa corrigir.

---

## PROMPT 5 — conferir auto-deploy e SSL

```
Preciso conferir três coisas no hPanel da Hostinger, no site movvabrasil.net.
Os dois primeiros são só leitura. No terceiro, pergunte antes de clicar.

1. ÚLTIMA IMPLANTAÇÃO
   Vá em Avançado → GIT e me diga a data e a HORA da última implantação do
   repositório movvabrasil-net.
   Eu enviei uma alteração há poucos minutos. Se a hora for recente, a
   implantação automática funcionou.

2. CONFERIR O ARQUIVO .htaccess
   Vá no Gerenciador de arquivos, entre em public_html, ative "mostrar
   arquivos ocultos", e abra o arquivo .htaccess no editor.
   Procure pela palavra "well-known" e pela palavra "git".
   Me diga se você encontra estas três linhas:
      RewriteRule ^\.well-known/ - [L]
      RewriteRule ^\.git(/|$) - [F,L]
      RewriteRule ^\.github(/|$) - [F,L]
   Se encontrar, a implantação automática está funcionando.
   Se NÃO encontrar, me avise: significa que o servidor ainda está com a
   versão antiga e vamos precisar forçar a implantação.
   Feche o editor SEM salvar nada.

3. SSL — pergunte antes de clicar
   Vá em Segurança → SSL e me diga o status atual do certificado.
   - Se estiver "Ativo": ótimo, me avise e pare.
   - Se continuar "Instalando" ou aparecer erro: veja se existe algum botão
     como "Reinstalar", "Tentar novamente" ou "Atualizar status".
     NÃO clique. Apenas me diga qual botão existe e me pergunte se pode.

4. Se a opção "Forçar HTTPS" já tiver aparecido, me diga se está LIGADA ou
   DESLIGADA. Não mude.

Não altere nenhum arquivo e não salve nada.
```

---

## PROMPT 6 — Google Search Console

Sem isto o Google demora muito mais para achar o site. É o passo de maior
retorno que ainda não foi feito.

```
Preciso cadastrar o site movvabrasil.net no Google Search Console e verificar a
propriedade pelo DNS, que agora é gerenciado pela Hostinger.

Vou precisar estar logado nas duas contas. Se alguma pedir login ou verificação
de identidade, pare e me avise — isso é comigo.

PASSO 1 — Criar a propriedade
Vá em https://search.google.com/search-console
Adicione uma propriedade nova do tipo PREFIXO DO URL (não "domínio"), com o
endereço exato:
   https://movvabrasil.net
Me confirme quando aparecer a tela de verificação.

PASSO 2 — Pegar o registro de verificação
Na tela de verificação, escolha o método por REGISTRO DNS (pode aparecer como
"Provedor de nome de domínio" ou "DNS TXT record").
Copie o valor TXT completo que o Google mostrar e me mostre antes de continuar.

PASSO 3 — Adicionar o TXT na Hostinger
Em outra aba, vá no hPanel da Hostinger.
Domínios → movvabrasil.net → Editor de DNS (ou "Zona DNS").
Crie um registro novo:
   Tipo: TXT
   Nome / Host: @
   Valor: (o valor que o Google deu no passo 2)
   TTL: deixe o padrão
Salve.

ATENÇÃO: não apague, não edite e não substitua nenhum registro existente.
Só ADICIONE o novo. Se o editor sugerir sobrescrever algo, pare e me pergunte.

PASSO 4 — Verificar
Volte na aba do Search Console e clique em Verificar.
Se der erro dizendo que não encontrou, isso é normal: o DNS leva alguns minutos.
Espere 5 minutos e tente de novo, no máximo três vezes.
Me diga o resultado.

PASSO 5 — Enviar o sitemap
Depois de verificado, vá em Sitemaps no menu da esquerda e envie:
   sitemap-index.xml
Me diga o status que aparecer.

PASSO 6 — Pedir indexação das páginas principais
Use a Inspeção de URL, no topo, para cada um destes endereços, e clique em
"Solicitar indexação" em cada um:
   https://movvabrasil.net/
   https://movvabrasil.net/movva-e-confiavel
   https://movvabrasil.net/oportunidade
   https://movvabrasil.net/blog
   https://movvabrasil.net/blog/portabilidade-sem-perder-o-numero

Me reporte o resultado de cada passo, com a mensagem exata de qualquer erro.

Regras: não digite senha, não apague registro de DNS existente, não compre nada,
não mude configuração que eu não pedi.
```

---

## Depois que ele terminar

1. Me mande o relatório dele.
2. O DNS leva de alguns minutos até algumas horas para propagar.
3. Quando propagar, eu rodo o `testar-deploy.sh` e confirmo os 20 testes.

---

## Como vai ser publicar depois disso

Eu altero o conteúdo aqui → envio para o GitHub → o GitHub compila sozinho →
você clica em "Deploy" no painel da Hostinger.

Se a Hostinger oferecer webhook de auto-deploy, me avise que eu configuro e aí
some até esse clique.
