#!/usr/bin/env bash
set -euo pipefail

MODEL=models/por_custom.traineddata
EVAL_LIST=models/list.eval

echo ">> Avaliando modelo customizado…"
lstmeval \
  --traineddata "$MODEL" \
  --model        "$MODEL" \
  --eval_listfile "$EVAL_LIST"

