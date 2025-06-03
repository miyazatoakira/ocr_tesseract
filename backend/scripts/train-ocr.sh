#!/usr/bin/env bash
set -euo pipefail

# Language code for the output traineddata
LANG_CODE="por_custom"

# Directory containing the ground truth data
DATA_DIR="data/train"

mkdir -p models

# Build train.txt with all unique characters found in ground-truth files.
if [ -d "$DATA_DIR" ]; then
  find "$DATA_DIR" -name '*.gt.txt' -print0 \
    | xargs -0 cat 2>/dev/null \
    | tr -d '\r' | tr -d '\n' | fold -w1 | sort -u | tr -d '\n' > train.txt
  echo >> train.txt
fi

text2image --text train.txt --outputbase models/sample --font "Liberation Serif"

for i in models/sample.tif; do
  tesseract "$i" "$i" --psm 6 lstm.train
done

# Generate list of training files
find "$DATA_DIR" -name '*.lstmf' > models/list.txt

lstmtraining \
  --model_output models/$LANG_CODE \
  --continue_from /usr/share/tesseract-ocr/5/tessdata/por.traineddata \
  --traineddata /usr/share/tesseract-ocr/5/tessdata/por.traineddata \
  --train_listfile models/list.txt \
  --max_iterations 500

combine_tessdata models/${LANG_CODE}.lstm models/${LANG_CODE}.traineddata
