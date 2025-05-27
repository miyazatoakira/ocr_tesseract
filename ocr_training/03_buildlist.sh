#!/usr/bin/env bash
set -euo pipefail

# 03_build_lists.sh
# Separa ~20% dos .lstmf para validação e garante que ambas as listas tenham ≥1 linha.

mkdir -p models
train_list=models/list.train
eval_list=models/list.eval
:> "$train_list"
:> "$eval_list"

shopt -s nullglob
files=(data/train/*.lstmf)
total=${#files[@]}

if (( total == 0 )); then
  echo "ERRO: nenhum .lstmf em data/train" >&2
  exit 1
fi

# ≈20% para validação, mas pelo menos 1
eval_count=$(( total / 5 ))
(( eval_count == 0 && total > 1 )) && eval_count=1
(( eval_count >= total )) && eval_count=$(( total - 1 ))

echo ">> Selecionando $eval_count de $total para validação..."
for ((i=0; i<total; i++)); do
  if (( i < eval_count )); then
    echo "${files[i]}" >> "$eval_list"
  else
    echo "${files[i]}" >> "$train_list"
  fi
done

# Se list.eval ficou vazia (caso total==1), duplica list.train
if [[ ! -s "$eval_list" ]]; then
  echo "(!) Nenhuma página para avaliação – copiando treino."
  cp "$train_list" "$eval_list"
fi

echo "✔ list.train: $(wc -l < "$train_list") linhas"
echo "✔ list.eval : $(wc -l < "$eval_list") linhas"
