#!/bin/bash

# --- Configuration ---
# Number of parallel jobs to run. Defaults to the number of CPU cores.
CORES=$(nproc 2>/dev/null || echo 4)

# --- Colors ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# --- Script Variables ---
INPUT_DIR="inputs"
OUTPUT_DIR="results"
CUSTOM_COOKIE=""
CUSTOM_HEADER=""
RUN_X8=false
RUN_KXSS=false

# --- Functions ---

# Print usage information
usage() {
  echo "Usage: $0 [-i <input_dir>] [-o <output_dir>] [-c <cookie>] [-h <header>] [-x] [-k]"
  echo "  -i  Directory containing live-urls.txt and params.txt (default: ./inputs)"
  echo "  -o  Directory to save results (default: ./results)"
  echo "  -c  Custom 'Cookie' header value"
  echo "  -H  Custom additional header (e.g., 'Authorization: Bearer ...')"
  echo "  -x  Run the x8 scanner"
  echo "  -k  Run the kxss scanner"
  echo "  --help Print this help message"
  exit 1
}

# Log messages with colors
log_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
  exit 1
}

# Check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for and install dependencies
setup_dependencies() {
  log_info "Checking for required system dependencies..."
  local missing_deps=()
  local dependencies=("go" "cargo" "expect" "split" "sed" "grep" "cat" "wc" "sort" "unbuffer")

  if ! command_exists "unbuffer"; then
      dependencies+=("expect") # On some systems, unbuffer is in the 'expect' package
  fi

  for cmd in "${dependencies[@]}"; do
    if ! command_exists "$cmd"; then
      missing_deps+=("$cmd")
    fi
  done

  if [ ${#missing_deps[@]} -ne 0 ]; then
    log_error "The following required commands are not installed: ${missing_deps[*]}. Please install them using your system's package manager (e.g., 'sudo apt-get install -y golang rustc expect-dev')."
  fi
  log_info "All system dependencies are satisfied."
}

# Install scanner tools if not already installed
install_scanners() {
  log_info "Checking for scanner tools (x8, kxss)..."
  if ! command_exists "x8"; then
    log_warn "x8 not found. Attempting to install..."
    # First, try to download the pre-compiled binary
    if wget https://github.com/Sh1Yo/x8/releases/latest/download/x8-linux-x86_64 -O x8 && chmod +x x8 && sudo mv x8 /usr/local/bin/; then
      log_info "x8 installed successfully from binary."
    else
      log_warn "Failed to download x8 binary, trying to install with cargo."
      if command_exists "cargo"; then
        cargo install x8 && sudo cp "$HOME/.cargo/bin/x8" /usr/local/bin/x8
        log_info "x8 installed successfully using cargo."
      else
        log_error "cargo is not installed. Cannot install x8."
      fi
    fi
  fi

  if ! command_exists "kxss"; then
    log_warn "kxss not found. Attempting to install with 'go'..."
    if command_exists "go"; then
      go install github.com/Emoe/kxss@latest
      sudo cp "$(go env GOPATH)/bin/kxss" /usr/local/bin/kxss
      log_info "kxss installed successfully using go."
    else
      log_error "go is not installed. Cannot install kxss."
    fi
  fi

  log_info "All scanner tools are ready."
}

# Function to run x8 scan on a single chunk
run_x8_scan() {
  local chunk_file=$1
  local chunk_num=$2
  local params_file=$3
  local output_dir=$4

  log_info "[X8] Starting scan on chunk #$chunk_num..."
  local output_file="$output_dir/x8_raw_output_${chunk_num}.txt"
  local reflected_file="$output_dir/x8_reflected_${chunk_num}.txt"

  local header_args=()
  if [[ -n "$CUSTOM_COOKIE" ]]; then
    header_args+=(-H "Cookie: $CUSTOM_COOKIE")
  fi
  if [[ -n "$CUSTOM_HEADER" ]]; then
    header_args+=(-H "$CUSTOM_HEADER")
  fi

  unbuffer x8 -u "$chunk_file" -w "$params_file" "${header_args[@]}" 2>&1 | sed -r "s/\x1B\[[0-9;]*[mGK]//g" > "$output_file"

  grep -Ei 'reflects|change reflect' "$output_file" > "$reflected_file" || true

  log_info "[X8] Finished scan on chunk #$chunk_num."
  touch "$output_dir/x8_chunk_${chunk_num}.done"
}

# Function to run kxss scan on a single chunk
run_kxss_scan() {
    local chunk_file=$1
    local chunk_num=$2
    local params_file=$3
    local output_dir=$4

    log_info "[KXSS] Starting scan on chunk #$chunk_num..."
    local output_file="$output_dir/kxss_output_${chunk_num}.txt"

    local header_args=()
    if [[ -n "$CUSTOM_COOKIE" ]]; then
        header_args+=(-header "Cookie: $CUSTOM_COOKIE")
    fi
    if [[ -n "$CUSTOM_HEADER" ]]; then
        header_args+=(-header "$CUSTOM_HEADER")
    fi

    # Generate URL-parameter combinations
    local combined_input_file="$output_dir/kxss_combined_input_${chunk_num}.txt"
    cat "$chunk_file" | while IFS= read -r url; do
        while IFS= read -r param; do
            if [[ "$url" == *"?"* ]]; then
                echo "${url}&${param}=KXSS"
            else
                echo "${url}?${param}=KXSS"
            fi
        done < "$params_file"
    done | sort -u > "$combined_input_file"

    if [ -s "$combined_input_file" ]; then
        kxss -timeout 300 -threads 50 "${header_args[@]}" < "$combined_input_file" > "$output_file"
    else
        touch "$output_file"
    fi

    rm "$combined_input_file"
    log_info "[KXSS] Finished scan on chunk #$chunk_num."
    touch "$output_dir/kxss_chunk_${chunk_num}.done"
}


# --- Main Script ---

# Parse command-line arguments
while getopts ":i:o:c:H:xk-:" opt; do
  case $opt in
    i) INPUT_DIR=$OPTARG ;;
    o) OUTPUT_DIR=$OPTARG ;;
    c) CUSTOM_COOKIE=$OPTARG ;;
    H) CUSTOM_HEADER=$OPTARG ;;
    x) RUN_X8=true ;;
    k) RUN_KXSS=true ;;
    -)
      case "${OPTARG}" in
        help) usage ;;
        *) log_error "Unknown option --${OPTARG}";;
      esac;;
    \?) log_error "Invalid option: -$OPTARG" ;;
    :) log_error "Option -$OPTARG requires an argument." ;;
  esac
done

if ! $RUN_X8 && ! $RUN_KXSS; then
  log_error "You must specify at least one scanner to run (-x for x8, -k for kxss)."
fi

# --- Preparations ---
log_info "Starting XSS Scan Script"
log_info "Input Directory: $INPUT_DIR"
log_info "Output Directory: $OUTPUT_DIR"
log_info "Cores to use: $CORES"

setup_dependencies
install_scanners

URL_FILE="$INPUT_DIR/live-urls.txt"
PARAMS_FILE="$INPUT_DIR/params.txt"

if [ ! -f "$URL_FILE" ]; then
  log_error "URL file not found at $URL_FILE"
fi
if [ ! -f "$PARAMS_FILE" ]; then
  log_error "Params file not found at $PARAMS_FILE"
fi

mkdir -p "$OUTPUT_DIR"
TEMP_DIR=$(mktemp -d -p "$OUTPUT_DIR")
log_info "Temporary chunk files will be stored in $TEMP_DIR"

# --- Split Input File ---
TOTAL_LINES=$(wc -l < "$URL_FILE")
if [ "$TOTAL_LINES" -eq 0 ]; then
  log_error "URL file is empty. Nothing to do."
fi
LINES_PER_CHUNK=$(( (TOTAL_LINES + CORES - 1) / CORES ))

log_info "Total URLs: $TOTAL_LINES. Splitting into $CORES chunks of ~$LINES_PER_CHUNK lines each."
split -l "$LINES_PER_CHUNK" "$URL_FILE" "$TEMP_DIR/chunk_"

# --- Run Scans in Parallel ---
pids=()
chunk_num=0
TOTAL_JOBS=0
if $RUN_X8; then
  TOTAL_JOBS=$((TOTAL_JOBS + CORES))
fi
if $RUN_KXSS; then
  TOTAL_JOBS=$((TOTAL_JOBS + CORES))
fi

log_info "Starting a total of $TOTAL_JOBS jobs in parallel..."
START_TIME=$SECONDS

for chunk_file in "$TEMP_DIR"/chunk_*; do
  chunk_num=$((chunk_num + 1))

  if $RUN_X8; then
    run_x8_scan "$chunk_file" "$chunk_num" "$PARAMS_FILE" "$TEMP_DIR" &
    pids+=($!)
  fi
  if $RUN_KXSS; then
    run_kxss_scan "$chunk_file" "$chunk_num" "$PARAMS_FILE" "$TEMP_DIR" &
    pids+=($!)
  fi
done

# --- Monitor Progress ---
while true; do
  COMPLETED_JOBS=$(find "$TEMP_DIR" -name "*.done" | wc -l)
  ELAPSED_TIME=$(( SECONDS - START_TIME ))

  # \r moves cursor to beginning of line, -n prevents newline
  echo -ne "${YELLOW}[PROGRESS]${NC} [${COMPLETED_JOBS}/${TOTAL_JOBS}] jobs completed. Elapsed time: ${ELAPSED_TIME}s. \r"

  if [ "$COMPLETED_JOBS" -ge "$TOTAL_JOBS" ]; then
    echo -ne "\n" # Move to next line after progress is complete
    log_info "All scan jobs have completed."
    break
  fi

  sleep 30 # Check every 30 seconds
done

# Final wait to reap all background processes
wait "${pids[@]}"

# --- Aggregate Results ---
log_info "Aggregating results..."
if $RUN_X8; then
  cat "$TEMP_DIR"/x8_reflected_*.txt > "$OUTPUT_DIR/x8-reflected.txt"
  log_info "Aggregated x8 results saved to $OUTPUT_DIR/x8-reflected.txt"
fi

if $RUN_KXSS; then
  cat "$TEMP_DIR"/kxss_output_*.txt > "$OUTPUT_DIR/kxss-vulnerable.txt"
  log_info "Aggregated kxss results saved to $OUTPUT_DIR/kxss-vulnerable.txt"
fi

# --- Cleanup ---
log_info "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

log_info "${GREEN}Script finished successfully! Check the '$OUTPUT_DIR' directory for results.${NC}"
