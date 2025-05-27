#!/usr/bin/env bash
set -e
LANG_CODE="por_custom"
mkdir -p models
text2image --text train.txt --outputbase models/sample --font "Liberation Serif"
for i in models/sample.tif; do
  tesseract "$i" "$i" --psm 6 lstm.train
done
lstmtraining \
  --model_output models/$LANG_CODE \
  --continue_from /usr/share/tesseract-ocr/5/tessdata/por.traineddata \
  --traineddata /usr/share/tesseract-ocr/5/tessdata/por.traineddata \
  --train_listfile models/list.txt \
  --max_iterations 500
combine_tessdata models/${LANG_CODE}.lstm models/${LANG_CODE}.traineddata
