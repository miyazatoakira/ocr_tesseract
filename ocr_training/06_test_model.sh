

#!/usr/bin/env bash
set -euo pipefail

# 06_test_model.sh
# Testa OCR em uma imagem usando o novo modelo.

if [[ $# -ne 1 ]]; then
  echo "Uso: $0 caminho/da_imagem.png" >&2
  exit 1
fi

IMG="$1"
echo ">> OCR de $IMG usando por_custom:"
tesseract "$IMG" stdout -l por_custom --psm 6





