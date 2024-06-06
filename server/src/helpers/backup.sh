#!/bin/bash
date -d "$current_date - 1 day" +"%Y-%m-%d"
d=$(date +"%Y-%m-%d")
current_date=$(date -d "$d - 1 day" +"%Y-%m-%d") # É subtraido um dia da data, devido ao fuso do servidor
dbs=([0]="orcamento-rd")
DIR="/var/www/bkp/bkpdbSistemaOrcamento/"
PATTERN="db_*"

# Encontrar arquivos que correspondem ao padrao e foram modificados ha mais de 7 dias e excluir
FILES=$(find "$DIR" -name "$PATTERN" -type f -mtime +7)

# Verificar se foram encontrados arquivos
if [ -n "$FILES" ]; then
  # Excluir os arquivos encontrados
  find "$DIR" -name "$PATTERN" -type f -mtime +7 -exec rm -f {} \;
  cd "$DIR"
  git add .
  git -c user.name="backup_db" -c user.email="backup_db@backup_db" commit -m "Exclusao de backups antigos do dia $current_date"
fi

# Backup pelo pg_dump do proprio Postgress
for db in "${dbs[@]}"
do
  /usr/bin/pg_dump $db > /var/www/bkp/bkpdbSistemaOrcamento/db_${db}_$current_date.bkp
done

# Enrtrando na pastas com os backups
cd "$DIR"

# Comitando e enviando pro git os backups alterados
git add .
git -c user.name="backup_db" -c user.email="backup_db@backup_db" commit -m "Backups da base do dia $current_date"
git push origin main