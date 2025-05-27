
#!/usr/bin/env bash
set -euo pipefail
mkdir -p data/train
fc-cache -fv fonts/                # garante cache atualizado

for f in fonts/*.ttf; do
  fullname=$(fc-query --format='%{fullname}\n' "$f" | head -n1)
  safe_name=${fullname// /_}
  echo ">> Gerando com fonte: $fullname"
  text2image \
    --fonts_dir=fonts \
    --font="$fullname" \
    --text=corpus.txt \
    --outputbase="data/train/${safe_name}_printed" \


done


