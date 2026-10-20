#!/usr/bin/env bash
# Confere o movvabrasil.net depois de publicar.
# Rodar:  bash testar-deploy.sh
# Repetir sempre que subir alteracao.

DOM="movvabrasil.net"
ok=0; falhou=0

cor_ok="\033[32m"; cor_erro="\033[31m"; cor_off="\033[0m"

# codigo(URL) -> imprime o status HTTP sem seguir redirecionamento
codigo() { curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" "$1"; }
destino() { curl -s -o /dev/null -w "%{redirect_url}" -A "Mozilla/5.0" "$1"; }

checa() { # checa <descricao> <url> <codigo esperado> [destino esperado]
  local desc="$1" url="$2" esp="$3" dest_esp="$4"
  local c; c=$(codigo "$url")
  local msg="$c"
  local bom=0
  if [ "$c" = "$esp" ]; then bom=1; fi
  if [ -n "$dest_esp" ]; then
    local d; d=$(destino "$url")
    msg="$c -> $d"
    case "$d" in "$dest_esp"*) ;; *) bom=0 ;; esac
  fi
  if [ $bom -eq 1 ]; then
    printf "${cor_ok}  OK ${cor_off} %-52s %s\n" "$desc" "$msg"; ok=$((ok+1))
  else
    printf "${cor_erro} FALHA${cor_off} %-52s %s  (esperado %s %s)\n" "$desc" "$msg" "$esp" "$dest_esp"; falhou=$((falhou+1))
  fi
}

echo ""
echo "=== Redirecionamentos ==="
checa "http -> https"                 "http://$DOM/"                   301 "https://$DOM/"
checa "www -> raiz"                   "https://www.$DOM/"              301 "https://$DOM/"
checa "/home -> raiz (site antigo)"   "https://$DOM/home"              301 "https://$DOM/"
checa "/movva-e-confiavel.html -> sem extensao" "https://$DOM/movva-e-confiavel.html" 301 "https://$DOM/movva-e-confiavel"

echo ""
echo "=== Paginas (todas devem dar 200) ==="
for p in "" "movva-e-confiavel" "blog" "blog/portabilidade-sem-perder-o-numero" \
         "oportunidade" "avisos-legais" "politica-de-privacidade" "termos-de-uso"; do
  checa "/$p" "https://$DOM/$p" 200
done

echo ""
echo "=== Arquivos para buscador e IA ==="
for f in "robots.txt" "llms.txt" "sitemap-index.xml" "sitemap-0.xml"; do
  checa "/$f" "https://$DOM/$f" 200
done

echo ""
echo "=== 404 de verdade (o antigo devolvia 200) ==="
checa "endereco inexistente" "https://$DOM/pagina-que-nao-existe-123" 404

echo ""
echo "=== Conteudo visivel sem JavaScript ==="
for p in "" "movva-e-confiavel" "blog/portabilidade-sem-perder-o-numero"; do
  html=$(curl -s -A "Mozilla/5.0 (compatible; GPTBot/1.0)" "https://$DOM/$p")
  texto=$(printf '%s' "$html" | sed -e 's/<script[^>]*>.*<\/script>//g' -e 's/<[^>]*>/ /g' | tr -s ' ')
  n=${#texto}
  if [ "$n" -gt 1500 ]; then
    printf "${cor_ok}  OK ${cor_off} %-52s %s caracteres de texto\n" "/$p" "$n"; ok=$((ok+1))
  else
    printf "${cor_erro} FALHA${cor_off} %-52s so %s caracteres\n" "/$p" "$n"; falhou=$((falhou+1))
  fi
done

echo ""
echo "=== Tags da home ==="
home=$(curl -s -A "Mozilla/5.0" "https://$DOM/")
for tag in "rel=\"canonical\"" "og:title" "og:description" "application/ld+json" "FAQPage|Person"; do
  if printf '%s' "$home" | grep -qE "$tag"; then
    printf "${cor_ok}  OK ${cor_off} %s\n" "$tag"; ok=$((ok+1))
  else
    printf "${cor_erro} FALHA${cor_off} %s ausente\n" "$tag"; falhou=$((falhou+1))
  fi
done

echo ""
echo "---------------------------------------------"
printf "Passou: %s   Falhou: %s\n" "$ok" "$falhou"
echo "---------------------------------------------"
echo ""
