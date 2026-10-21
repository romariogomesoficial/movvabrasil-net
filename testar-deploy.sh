#!/usr/bin/env bash
# Confere o movvabrasil.net depois de publicar.
# Rodar:  bash testar-deploy.sh
#
# A lista de páginas NÃO é fixa: o script lê o sitemap e testa o que estiver
# lá. Assim ele não fica para trás quando o blog cresce — foi o que aconteceu
# com o llms.txt, que ficou meses listando um site que não existia mais.

DOM="movvabrasil.net"
ok=0; falhou=0
cor_ok="\033[32m"; cor_erro="\033[31m"; cor_off="\033[0m"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

# ---------------------------------------------------------------------------
# Resolver o IP por DNS público, e não pelo resolvedor da sua conexão.
#
# Por que isto existe: numa publicação o script deu SEIS falhas — 404 virando
# 200, sitemap ilegível, pasta listando — e o site estava perfeito. O que
# estava errado era o DNS do provedor aqui, que ainda servia o endereço antigo
# do Builderall horas depois da troca de nameserver. O script testou o site
# velho e acusou o novo. Um verificador que não distingue "site quebrado" de
# "meu cache está velho" é pior do que não ter verificador.
#
# Agora o endereço vem do DNS sobre HTTPS da Cloudflare e entra em todo curl
# via --resolve. O cache local deixa de participar.
# ---------------------------------------------------------------------------
IP=$(curl -s -H "accept: application/dns-json" \
  "https://1.1.1.1/dns-query?name=$DOM&type=A" \
  | grep -o '"data":"[0-9.]*"' | head -1 | cut -d'"' -f4)

if [ -z "$IP" ]; then
  printf "${cor_erro}AVISO${cor_off}  não consegui resolver %s por DNS público.\n" "$DOM"
  echo "       Seguindo com o DNS da sua conexão — se ele estiver com cache"
  echo "       antigo, as falhas abaixo podem ser do site velho, não do novo."
  RESOLVE=""
else
  RESOLVE="--resolve $DOM:443:$IP --resolve $DOM:80:$IP"
  RESOLVE="$RESOLVE --resolve www.$DOM:443:$IP --resolve www.$DOM:80:$IP"
  IP_LOCAL=$(curl -s -o /dev/null -w '%{remote_ip}' "https://$DOM/" 2>/dev/null)
  if [ -n "$IP_LOCAL" ] && [ "$IP_LOCAL" != "$IP" ]; then
    printf "${cor_erro}AVISO${cor_off}  o DNS da sua conexão está desatualizado.\n"
    printf "       ele responde %s; o DNS público responde %s.\n" "$IP_LOCAL" "$IP"
    echo "       O teste abaixo usa o endereço público, que é o certo."
    echo "       No navegador você ainda pode ver o site antigo até o cache cair."
    echo ""
  fi
fi

codigo()  { curl -s $RESOLVE -o /dev/null -w "%{http_code}" -A "$UA" "$1"; }
destino() { curl -s $RESOLVE -o /dev/null -w "%{redirect_url}" -A "$UA" "$1"; }

checa() { # checa <descricao> <url> <codigo> [destino]
  local desc="$1" url="$2" esp="$3" dest_esp="$4" c d msg bom=0
  c=$(codigo "$url"); msg="$c"
  [ "$c" = "$esp" ] && bom=1
  if [ -n "$dest_esp" ]; then
    d=$(destino "$url"); msg="$c -> $d"
    case "$d" in "$dest_esp"*) ;; *) bom=0 ;; esac
  fi
  if [ $bom -eq 1 ]; then
    printf "${cor_ok}  OK ${cor_off} %-50s %s\n" "$desc" "$msg"; ok=$((ok+1))
  else
    printf "${cor_erro} FALHA${cor_off} %-50s %s  (esperado %s %s)\n" "$desc" "$msg" "$esp" "$dest_esp"; falhou=$((falhou+1))
  fi
}

echo ""
echo "Servidor atendendo agora: $(curl -s $RESOLVE -o /dev/null -w '%{remote_ip}' "https://$DOM/")"
echo "A Hostinger troca a máquina sem avisar. Já foram cinco endereços diferentes."

echo ""
echo "=== Redirecionamentos ==="
checa "http -> https"                           "http://$DOM/"                        301 "https://$DOM/"
checa "www -> raiz"                             "https://www.$DOM/"                   301 "https://$DOM/"
checa "/home -> raiz (site antigo)"             "https://$DOM/home"                   301 "https://$DOM/"
checa "/movva-e-confiavel.html -> sem extensao" "https://$DOM/movva-e-confiavel.html" 301 "https://$DOM/movva-e-confiavel"

echo ""
echo "=== Todas as páginas do sitemap ==="
URLS=$(curl -s $RESOLVE "https://$DOM/sitemap-0.xml" | grep -o "<loc>[^<]*</loc>" | sed -e 's/<[^>]*>//g')
if [ -z "$URLS" ]; then
  printf "${cor_erro} FALHA${cor_off} não consegui ler o sitemap\n"; falhou=$((falhou+1))
else
  for u in $URLS; do
    checa "${u#https://$DOM}" "$u" 200
  done
fi

echo ""
echo "=== Arquivos para buscador e IA ==="
for f in robots.txt llms.txt llms-full.txt sitemap-index.xml sitemap-0.xml; do
  checa "/$f" "https://$DOM/$f" 200
done

# O llms.txt existe para dizer o que o site contém. Se ele citar menos posts do
# que o sitemap tem, está defasado — e defasado em silêncio.
POSTS_SITEMAP=$(printf '%s\n' $URLS | grep -c "/blog/")
POSTS_LLMS=$(curl -s $RESOLVE "https://$DOM/llms.txt" | grep -c "/blog/")
if [ "$POSTS_LLMS" -ge "$POSTS_SITEMAP" ] && [ "$POSTS_SITEMAP" -gt 0 ]; then
  printf "${cor_ok}  OK ${cor_off} %-50s %s\n" "llms.txt cobre todos os posts" "$POSTS_LLMS de $POSTS_SITEMAP"; ok=$((ok+1))
else
  printf "${cor_erro} FALHA${cor_off} %-50s %s\n" "llms.txt DEFASADO" "cita $POSTS_LLMS, o sitemap tem $POSTS_SITEMAP"; falhou=$((falhou+1))
fi

echo ""
echo "=== Segurança e erro ==="
checa "/.git bloqueado"            "https://$DOM/.git/config"              403
checa "pasta sem listagem"         "https://$DOM/_astro/"                  403
checa "404 de verdade"             "https://$DOM/pagina-que-nao-existe-123" 404

echo ""
echo "=== Conteúdo visível sem JavaScript ==="
# É o ponto de partida de tudo: o site antigo entregava zero texto a um crawler
# que não executa JS, e os dois concorrentes continuam entregando.
# O agente aqui é o ClaudeBot, não o GPTBot: a Hostinger devolve 429 ao GPTBot
# por limite de taxa da máquina compartilhada, e usar ele aqui fazia o script
# acusar três falhas de conteúdo num site que entrega o texto inteiro a todos
# os outros rastreadores. O 429 tem bloco próprio logo abaixo.
for p in "" "movva-e-confiavel" "blog"; do
  html=$(curl -s $RESOLVE -A "Mozilla/5.0 (compatible; ClaudeBot/1.0)" "https://$DOM/$p")
  texto=$(printf '%s' "$html" | sed -e 's/<script[^>]*>.*<\/script>//g' -e 's/<[^>]*>/ /g' | tr -s ' ')
  n=${#texto}
  if [ "$n" -gt 1500 ]; then
    printf "${cor_ok}  OK ${cor_off} %-50s %s caracteres\n" "/$p" "$n"; ok=$((ok+1))
  else
    printf "${cor_erro} FALHA${cor_off} %-50s só %s caracteres\n" "/$p" "$n"; falhou=$((falhou+1))
  fi
done

echo ""
echo "=== Rastreadores de IA, um a um ==="
# Separado do bloco acima de propósito: o 429 do GPTBot é problema da
# hospedagem, não do site, e está no CHAMADO-HOSTINGER-GPTBOT.md. Ele aparece
# aqui para você saber se mudou, sem poluir a conta de falhas do deploy.
for linha in "GPTBot:Mozilla/5.0 (compatible; GPTBot/1.1)" \
             "ClaudeBot:Mozilla/5.0 (compatible; ClaudeBot/1.0)" \
             "PerplexityBot:Mozilla/5.0 (compatible; PerplexityBot/1.0)" \
             "Googlebot:Mozilla/5.0 (compatible; Googlebot/2.1)"; do
  nome="${linha%%:*}"; agente="${linha#*:}"
  c=$(curl -s $RESOLVE -o /dev/null -w "%{http_code}" -A "$agente" "https://$DOM/")
  if [ "$c" = "200" ]; then
    printf "${cor_ok}  OK ${cor_off} %-50s %s\n" "$nome" "$c"; ok=$((ok+1))
  elif [ "$nome" = "GPTBot" ] && [ "$c" = "429" ]; then
    printf "  ...  %-50s %s  (limite da Hostinger, ja no chamado)\n" "$nome" "$c"
  else
    printf "${cor_erro} FALHA${cor_off} %-50s %s  (esperado 200)\n" "$nome" "$c"; falhou=$((falhou+1))
  fi
done

echo ""
echo "---------------------------------------------"
printf "Passou: %s   Falhou: %s\n" "$ok" "$falhou"
echo "---------------------------------------------"
echo ""
echo "Nota: /blog e /blog/ servem a mesma página, com 200 nos dois, e isso é"
echo "proposital. Redirecionar um para o outro reintroduz o laço que derrubou"
echo "o blog, porque a Hostinger troca de máquina e a ordem dos módulos do"
echo "Apache muda junto. O canonical das duas aponta para /blog, então o"
echo "Google consolida."
echo ""
