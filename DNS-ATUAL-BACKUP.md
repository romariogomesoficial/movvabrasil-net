# DNS atual do movvabrasil.net — cópia de segurança

Capturado em 20/10/2026, direto da consulta pública de DNS.

**Para que serve:** hoje o DNS do domínio é gerenciado pelo Builderall. No momento
em que os nameservers mudarem, **tudo abaixo deixa de existir** e precisa ser
recriado no novo provedor. Se não for recriado, o e-mail do domínio para de
funcionar.

---

## Nameservers atuais (Builderall)

```
nsna.builderall.com
nssa.builderall.com
nseu.builderall.com
```

---

## Registros que PRECISAM ser recriados

### 1. E-mail — recebimento

| Tipo | Nome | Prioridade | Valor |
|---|---|---|---|
| MX | `@` | 10 | `mail03.l4email.com` |

### 2. E-mail — autorização de envio (SPF)

| Tipo | Nome | Valor |
|---|---|---|
| TXT | `@` | `v=spf1 include:mail.mailingboss.net include:mail.l4email.com ~all` |

### 3. E-mail — assinatura (DKIM)

| Tipo | Nome | Valor |
|---|---|---|
| TXT | `l4email._domainkey` | veja abaixo |

```
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjJVzoG2dPfWV3nIiP05C3L5jkQuzeLIOMNz6UTDNjqc2H3IfqGCa+a1at28NASV+39MnehIHI+DoRw+1pYwcNgYM7Hg7+dxifxQDHD7IQfQiaKsoQh7uin3nVcSoOJU+IMpj5UU2+EtXMEH5vKHN2NN0VC4J8WVsnQH7SRzHjewIDAQAB;
```

### 4. E-mail — política (DMARC)

| Tipo | Nome | Valor |
|---|---|---|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:abuse@movvabrasil.net; fo=1` |

---

## Registros que vão ser SUBSTITUÍDOS pelo site novo

| Tipo | Nome | Valor atual | Observação |
|---|---|---|---|
| A | `@` | `137.131.215.227` | Builderall. Vai mudar para o novo servidor. |
| A | `www` | `137.131.215.227` | Idem. |

---

## Antes de mudar qualquer nameserver

1. Entre no painel de DNS do Builderall e **tire print de todos os registros**.
   A consulta pública acima pega o que está publicado, mas pode haver registro
   que não aparece sem consulta direta — CNAME de rastreamento do MailingBoss,
   verificação de domínio, subdomínio de funil.
2. Confirme se existe caixa de e-mail `@movvabrasil.net` em uso, e se o
   MailingBoss dispara campanha com esse remetente.
3. Só depois troque os nameservers, e recrie os quatro registros de e-mail no
   novo provedor **no mesmo dia**.

O SPF e o DKIM acima são o que autoriza o seu e-mail a chegar na caixa de
entrada. Sem eles, mensagem enviada com esse domínio cai em spam ou é rejeitada.
