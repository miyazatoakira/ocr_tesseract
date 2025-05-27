#!/usr/bin/env bash
set -euo pipefail

# paths
BASE_MODEL=tessdata_best/por.traineddata
CHECKPOINT=models/por_custom_checkpoint
OUTPUT=models/por_custom

echo ">> Fine-tuning (10 iterações)…"
lstmtraining \
  --model_output "$CHECKPOINT" \
  --traineddata "$BASE_MODEL" \
  --continue_from "$CHECKPOINT" \
  --train_listfile models/list.train \
  --eval_listfile  models/list.eval \
  --max_iterations 10

echo ">> Parando treinamento e gerando modelo final…"
lstmtraining \
  --stop_training \
  --continue_from "$CHECKPOINT" \
  --traineddata "$BASE_MODEL" \
  --model_output "$OUTPUT"

# isso gera models/por_custom.traineddata
echo "✅ Fine-tuning concluído, modelo em models/por_custom.traineddata"

