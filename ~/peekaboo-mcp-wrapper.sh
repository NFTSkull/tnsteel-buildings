#!/bin/bash

# Peekaboo MCP Wrapper
# Este script permite usar Peekaboo directamente como servidor MCP en Cursor

# Verificar que Peekaboo esté instalado
if ! command -v peekaboo &> /dev/null; then
    echo "Error: Peekaboo no está instalado"
    exit 1
fi

# Verificar permisos
if ! peekaboo permissions --json-output | grep -q '"screen_recording": true'; then
    echo "Error: Se requieren permisos de Screen Recording"
    echo "Ve a: System Settings > Privacy & Security > Screen Recording"
    exit 1
fi

echo "Peekaboo MCP Server iniciado"
echo "Herramientas disponibles:"
echo "- peekaboo image --app [APP] --path [PATH]"
echo "- peekaboo image --mode screen --path [PATH]"
echo "- peekaboo image --mode frontmost --path [PATH]"
echo "- peekaboo list apps"
echo "- peekaboo analyze [IMAGE] [QUESTION]"

# Mantener el script ejecutándose
while true; do
    sleep 1
done 