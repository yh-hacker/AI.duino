#!/bin/bash
# AI.duino Plugin Uninstaller

EXTENSIONS_DIR="$HOME/.arduinoIDE/extensions"
DEPLOYED_DIR="$HOME/.arduinoIDE/deployedPlugins"

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo
echo -e "  ${CYAN}==========================================${NC}"
echo -e "  ${CYAN}    AI.duino Plugin Uninstaller${NC}"
echo -e "  ${CYAN}==========================================${NC}"
echo

FOUND=0

if ls "$EXTENSIONS_DIR"/aiduino*.vsix 1> /dev/null 2>&1; then
    echo -e "  [..] Removing files..."
    rm -f "$EXTENSIONS_DIR"/aiduino*.vsix
    echo "       Deleted from $EXTENSIONS_DIR"
    FOUND=1
fi

if ls "$DEPLOYED_DIR"/aiduino* 1> /dev/null 2>&1; then
    echo -e "  [..] Removing plugins..."
    rm -rf "$DEPLOYED_DIR"/aiduino*
    FOUND=1
fi

if [ "$FOUND" -eq 0 ]; then
    echo -e "  ${GREEN}[i]${NC} AI.duino not found or already removed."
else
    echo
    echo -e "  ${CYAN}==========================================${NC}"
    echo -e "  ${CYAN}    SUCCESS! Plugin uninstalled.${NC}"
    echo -e "  ${CYAN}==========================================${NC}"
    echo
    echo "  Please restart Arduino IDE to finish."
fi

echo
read -p "  Press Enter to continue..."
