#!/bin/bash

# A script that runs httpx on a file of URLs.
# If httpx fails, it splits the file into 5 smaller chunks and runs httpx on each chunk.

set -e

INPUT_FILE=$1
OUTPUT_FILE="live-urls-chunk.txt"
HTTPX_COMMAND="httpx -l $INPUT_FILE -silent -threads 25 -timeout 10 -retries 2 -follow-redirects > $OUTPUT_FILE"

# Run httpx on the input file. If it fails, split the file and retry.
if ! eval $HTTPX_COMMAND; then
  echo "httpx failed on $INPUT_FILE. Splitting the file and retrying."
  # Split the input file into 5 smaller files
  split -n l/5 $INPUT_FILE chunk-

  # Run httpx on each chunk
  for file in chunk-*; do
    httpx -l $file -silent -threads 25 -timeout 10 -retries 2 -follow-redirects >> $OUTPUT_FILE || true
  done
fi
