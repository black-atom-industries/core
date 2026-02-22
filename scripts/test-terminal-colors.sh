#!/usr/bin/env bash
# Test terminal colors - prints all 16 ANSI colors as foreground and background
# to visually check contrast and distinguishability.
#
# Usage:
#   deno task test:terminal-colors                              # print only (no name)
#   deno task test:terminal-colors black-atom-default-light     # print with name in header
#   deno task test:terminal-colors black-atom-default-light --capture  # print + screenshot
#
# The --capture flag saves a screenshot to tmp/<name>.png (or tmp/terminal-colors.png if no name).

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="${REPO_ROOT}/tmp"

CAPTURE=false
THEME_NAME=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --capture)
            CAPTURE=true
            shift
            ;;
        *)
            if [[ -z "$THEME_NAME" ]]; then
                THEME_NAME="$1"
            fi
            shift
            ;;
    esac
done

DISPLAY_NAME="${THEME_NAME:-"(unnamed)"}"
CAPTURE_FILENAME="${THEME_NAME:-"terminal-colors"}"
CAPTURE_PATH="${TMP_DIR}/${CAPTURE_FILENAME}.png"

# --- Layout ---
INDENT="  "
LABEL_WIDTH=14
CELL_PAD=2
CELL_TEXT="Sample Text"
CELL_WIDTH=$(( CELL_PAD + ${#CELL_TEXT} + CELL_PAD ))
SWATCH_WIDTH=8

pad() {
    printf "%${1}s" ""
}

cell() {
    local fg_esc="$1"
    local bg_esc="$2"
    printf "\033[${fg_esc}m\033[${bg_esc}m%s%-$((CELL_WIDTH - CELL_PAD))s\033[0m" \
        "$(pad $CELL_PAD)" "$CELL_TEXT"
}

# --- Color definitions (ordered to match palette type) ---
NAMES=(
    "0:black"
    "8:gray"
    "1:darkRed"
    "9:red"
    "3:darkYellow"
    "11:yellow"
    "2:darkGreen"
    "10:green"
    "6:darkCyan"
    "14:cyan"
    "4:darkBlue"
    "12:blue"
    "5:darkMagenta"
    "13:magenta"
    "7:lightGray"
    "15:white"
)

fg_esc() {
    local code="$1"
    if [ "$code" -lt 8 ]; then echo "3${code}"; else echo "9$((code - 8))"; fi
}

bg_esc() {
    local code="$1"
    if [ "$code" -lt 8 ]; then echo "4${code}"; else echo "10$((code - 8))"; fi
}

# Clear screen for a clean output
clear

printf "\n"
printf "╔══════════════════════════════════════════════════════════════╗\n"
printf "║  Terminal Palette Test: %-36s ║\n" "$DISPLAY_NAME"
printf "╚══════════════════════════════════════════════════════════════╝\n"

# --- Foreground colors on default background ---
printf "\n── Foreground on default background ──\n"
printf "${INDENT}Each color rendered as foreground text on the terminal default background.\n\n"
for entry in "${NAMES[@]}"; do
    code="${entry%%:*}"
    name="${entry#*:}"
    printf "${INDENT}\033[$(fg_esc "$code")m%-${LABEL_WIDTH}s ████████  The quick brown fox\033[0m\n" "$name"
done

# --- Neutral palette contrast grid ---
printf "\n── Neutral contrast grid (black / gray / lightGray / white) ──\n"
printf "${INDENT}Every combination of the 4 neutral colors as foreground on each other's background.\n\n"
NEUTRALS=("0:black" "8:gray" "7:lightGray" "15:white")

printf "${INDENT}%-${LABEL_WIDTH}s" ""
for bg_entry in "${NEUTRALS[@]}"; do
    bg_name="${bg_entry#*:}"
    printf "%s%-$((CELL_WIDTH - CELL_PAD))s" "$(pad $CELL_PAD)" "bg:$bg_name"
done
printf "\n"

for fg_entry in "${NEUTRALS[@]}"; do
    fg_code="${fg_entry%%:*}"
    fg_name="${fg_entry#*:}"
    printf "${INDENT}%-${LABEL_WIDTH}s" "fg:$fg_name"
    for bg_entry in "${NEUTRALS[@]}"; do
        bg_code="${bg_entry%%:*}"
        cell "$(fg_esc "$fg_code")" "$(bg_esc "$bg_code")"
    done
    printf "\n"
done

# --- All colors side by side for distinguishability ---
printf "\n── Color swatches (dark vs bright variants) ──\n"
printf "${INDENT}Each pair side by side as background fills. Both should be visually distinct.\n\n"
PAIRS=(
    "0:8:black/gray"
    "1:9:darkRed/red"
    "3:11:darkYellow/yellow"
    "2:10:darkGreen/green"
    "6:14:darkCyan/cyan"
    "4:12:darkBlue/blue"
    "5:13:darkMagenta/magenta"
    "7:15:lightGray/white"
)

for pair in "${PAIRS[@]}"; do
    dark="${pair%%:*}"
    rest="${pair#*:}"
    bright="${rest%%:*}"
    label="${rest#*:}"
    printf "${INDENT}\033[$(bg_esc "$dark")m%${SWATCH_WIDTH}s\033[0m" ""
    printf " \033[$(bg_esc "$bright")m%${SWATCH_WIDTH}s\033[0m" ""
    printf "  %s\n" "$label"
done

printf "\n"

# --- Screenshot capture ---
if $CAPTURE; then
    mkdir -p "$TMP_DIR"
    sleep 0.5
    screencapture -x -o "$CAPTURE_PATH" 2>/dev/null
    printf "Screenshot saved to: %s\n" "$CAPTURE_PATH"
fi
