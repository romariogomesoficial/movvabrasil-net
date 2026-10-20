# Publicar o movvabrasil.net na Hostinger

Plano Business, domínio já apontado. O site é estático: você gera os arquivos
aqui no computador e sobe o resultado. Não precisa de Node no servidor.

---

## Antes de mexer em qualquer coisa: salve o site antigo

O site atual é Builderall e tem cinco endereços no sitemap. Salve uma cópia de
cada um antes de apagar qualquer coisa — se faltar algo depois, você vai querer
consultar.

- https://movvabrasil.net/home
- https://movvabrasil.net/oportunidade
- https://movvabrasil.net/avisos-legais
- https://movvabrasil.net/politica-de-privacidade
- https://movvabrasil.net/termos-de-uso

No hPanel, use **Arquivos → Backups** e gere um backup de `public_html` antes de
começar. É um clique e resolve qualquer arrependimento.

**Regra que não se quebra:** o site novo sobe primeiro, o antigo sai depois.
Domínio fora do ar durante a obra perde posição no Google, e recuperar custa meses.

---

## 1. Gerar os arquivos

Na pasta `site`:

```bash
npm run build
```

O resultado fica em `site/dist`. É o conteúdo dessa pasta que vai para o servidor
— não a pasta `dist` em si, mas o que está **dentro** dela.

---

## 2. Subir para o public_html

1. hPanel → **Sites** → movvabrasil.net → **Gerenciador de arquivos**
2. Entre em `public_html`
3. Ative **Mostrar arquivos ocultos** nas configurações do gerenciador.
   Sem isso você não enxerga o `.htaccess`, e ele é essencial.
4. Apague o conteúdo antigo do Builderall (você já fez backup no passo anterior)
5. Suba o arquivo `movvabrasil-net.zip` que está em `site/`
6. Clique com o botão direito nele → **Extrair** → extraia ali mesmo em `public_html`
7. Apague o `.zip` depois de extrair

Ao final, `public_html` tem que conter: `index.html`, `.htaccess`, `robots.txt`,
`llms.txt`, `sitemap-index.xml`, `sitemap-0.xml`, a pasta `_astro`, a pasta `blog`
e os demais `.html`.

---

## 3. Conferir o SSL e evitar redirecionamento duplo

O `.htaccess` já força HTTPS e manda `www` para a raiz.

Se no hPanel a opção **Forçar HTTPS** estiver ligada, você tem duas regras
fazendo a mesma coisa, e isso pode gerar loop de redirecionamento. Escolha uma:

- Deixe o hPanel ligado e **apague o bloco 1** do `.htaccess`, ou
- Desligue no hPanel e deixe o `.htaccess` cuidar

Confira também em **Segurança → SSL** se o certificado está ativo para o domínio.

---

## 4. Testar antes de comemorar

Abra cada uma e confirme:

| Endereço | O que tem que acontecer |
|---|---|
| `https://movvabrasil.net` | Abre a home |
| `http://movvabrasil.net` | Redireciona para https |
| `https://www.movvabrasil.net` | Redireciona para a raiz sem www |
| `https://movvabrasil.net/home` | Redireciona 301 para a raiz |
| `https://movvabrasil.net/movva-e-confiavel` | Abre, **sem** `.html` no endereço |
| `https://movvabrasil.net/blog` | Abre a lista do blog |
| `https://movvabrasil.net/pagina-que-nao-existe` | Mostra a página de erro **e retorna 404** |
| `https://movvabrasil.net/robots.txt` | Mostra o texto |
| `https://movvabrasil.net/sitemap-index.xml` | Mostra o XML |
| `https://movvabrasil.net/llms.txt` | Mostra o texto |

O teste do 404 é o mais importante e o mais esquecido. O servidor antigo devolvia
**200** para qualquer endereço inventado, o que o Google lê como sinal de
qualidade ruim no domínio inteiro.

Para conferir o código de verdade, e não só o que aparece na tela, use o
inspecionar do navegador na aba **Rede**, ou um verificador de cabeçalho HTTP.

---

## 5. Google Search Console

1. Adicione a propriedade `https://movvabrasil.net` (prefixo de URL)
2. Verifique a propriedade pelo registro DNS, que a Hostinger permite configurar
3. **Sitemaps** → envie `sitemap-index.xml`
4. **Inspeção de URL** → peça indexação das três páginas prioritárias:
   - `/movva-e-confiavel`
   - `/oportunidade`
   - `/blog/portabilidade-sem-perder-o-numero`

Depois disso, acompanhe o relatório de **Páginas** por uma semana. Se aparecer
"Descoberta — não indexada" em alguma, me avise.

---

## 6. Publicar um texto novo no blog

1. Crie um arquivo `.md` em `site/src/content/blog/`
2. O nome do arquivo vira o endereço: `operadora-virtual-pega-bem.md` → `/blog/operadora-virtual-pega-bem`
3. Copie o cabeçalho de `portabilidade-sem-perder-o-numero.md` e preencha
4. Rode `npm run build` e suba o `dist` de novo

O campo **`resposta`** é obrigatório: é o bloco de 40 a 60 palavras que aparece no
topo da página e é o trecho que buscador e IA extraem. Sem ele o build falha de
propósito.

O campo **`cluster`** aceita: `categoria`, `diferencial`, `dor`, `marca`, `comparacao`.
Ele organiza o conteúdo segundo o mapa de busca do plano.

---

## 7. O que falta preencher antes de divulgar

- `src/data/site.js` → `AUTOR.perfis`: coloque os links dos seus perfis públicos
  (Instagram, YouTube, LinkedIn). Isso liga você como uma mesma entidade e ajuda
  buscador e IA a te reconhecerem.
- `src/pages/termos-de-uso.astro` → a constante `CONTATO`: hoje está
  `contato@movvabrasil.net`. Crie esse e-mail no hPanel ou troque pelo seu.
- Uma imagem de compartilhamento (`og:image`), 1200×630, para o link não sair
  pelado no WhatsApp. Quando tiver, me peça que eu ligo no layout.
- O teste real do chip. Enquanto não existir, as páginas dizem que a dupla
  conectividade **não foi verificada** — e é assim que tem que ficar.
