#!/usr/bin/env python3
"""
Peekaboo MCP Server
Servidor MCP que proporciona herramientas para capturar screenshots usando Peekaboo.
"""

import json
import subprocess
import sys
import os
import tempfile
import base64
from typing import Dict, Any, List

class PeekabooMCPServer:
    def __init__(self):
        self.tools = [
            {
                "name": "capture_screenshot",
                "description": "Captura un screenshot de una aplicación específica o de toda la pantalla",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "app_name": {
                            "type": "string",
                            "description": "Nombre de la aplicación a capturar (ej: 'Safari', 'Chrome')"
                        },
                        "mode": {
                            "type": "string",
                            "enum": ["app", "screen", "frontmost"],
                            "description": "Modo de captura: 'app' para aplicación específica, 'screen' para toda la pantalla, 'frontmost' para ventana activa"
                        },
                        "output_path": {
                            "type": "string",
                            "description": "Ruta donde guardar la imagen (opcional)"
                        }
                    },
                    "required": ["mode"]
                }
            },
            {
                "name": "list_applications",
                "description": "Lista todas las aplicaciones disponibles para captura",
                "inputSchema": {
                    "type": "object",
                    "properties": {}
                }
            },
            {
                "name": "analyze_image",
                "description": "Analiza una imagen usando IA para responder preguntas sobre su contenido",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "image_path": {
                            "type": "string",
                            "description": "Ruta de la imagen a analizar"
                        },
                        "question": {
                            "type": "string",
                            "description": "Pregunta sobre la imagen"
                        }
                    },
                    "required": ["image_path", "question"]
                }
            }
        ]

    def run_peekaboo_command(self, args: List[str]) -> Dict[str, Any]:
        """Ejecuta un comando de Peekaboo"""
        try:
            result = subprocess.run(
                ["peekaboo"] + args,
                capture_output=True,
                text=True,
                timeout=30
            )
            return {
                "success": result.returncode == 0,
                "stdout": result.stdout,
                "stderr": result.stderr,
                "returncode": result.returncode
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "returncode": -1
            }

    def handle_capture_screenshot(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """Maneja la captura de screenshots"""
        mode = args.get("mode", "screen")
        app_name = args.get("app_name")
        output_path = args.get("output_path")
        
        peekaboo_args = ["image"]
        
        if mode == "app" and app_name:
            peekaboo_args.extend(["--app", app_name])
        elif mode == "screen":
            peekaboo_args.extend(["--mode", "screen"])
        elif mode == "frontmost":
            peekaboo_args.extend(["--mode", "frontmost"])
        
        if output_path:
            peekaboo_args.extend(["--path", output_path])
        else:
            # Crear archivo temporal
            temp_file = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
            output_path = temp_file.name
            temp_file.close()
            peekaboo_args.extend(["--path", output_path])
        
        result = self.run_peekaboo_command(peekaboo_args)
        
        if result["success"]:
            return {
                "success": True,
                "message": f"Screenshot capturado exitosamente en {output_path}",
                "image_path": output_path,
                "mode": mode,
                "app_name": app_name
            }
        else:
            return {
                "success": False,
                "error": f"Error al capturar screenshot: {result.get('stderr', 'Error desconocido')}"
            }

    def handle_list_applications(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """Lista las aplicaciones disponibles"""
        result = self.run_peekaboo_command(["list", "apps"])
        
        if result["success"]:
            apps = []
            for line in result["stdout"].strip().split("\n"):
                if line.strip() and not line.startswith("Running Applications"):
                    apps.append(line.strip())
            
            return {
                "success": True,
                "applications": apps,
                "message": "Aplicaciones listadas exitosamente"
            }
        else:
            return {
                "success": False,
                "error": f"Error al listar aplicaciones: {result.get('stderr', 'Error desconocido')}"
            }

    def handle_analyze_image(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """Analiza una imagen usando IA"""
        image_path = args.get("image_path")
        question = args.get("question")
        
        if not os.path.exists(image_path):
            return {
                "success": False,
                "error": f"La imagen no existe: {image_path}"
            }
        
        peekaboo_args = ["analyze", image_path, question]
        result = self.run_peekaboo_command(peekaboo_args)
        
        if result["success"]:
            return {
                "success": True,
                "analysis": result["stdout"],
                "question": question,
                "image_path": image_path
            }
        else:
            return {
                "success": False,
                "error": f"Error al analizar imagen: {result.get('stderr', 'Error desconocido')}"
            }

    def handle_tool_call(self, tool_name: str, args: Dict[str, Any]) -> Dict[str, Any]:
        """Maneja las llamadas a herramientas"""
        if tool_name == "capture_screenshot":
            return self.handle_capture_screenshot(args)
        elif tool_name == "list_applications":
            return self.handle_list_applications(args)
        elif tool_name == "analyze_image":
            return self.handle_analyze_image(args)
        else:
            return {
                "success": False,
                "error": f"Herramienta desconocida: {tool_name}"
            }

    def run(self):
        """Ejecuta el servidor MCP"""
        # Enviar mensaje de inicialización
        init_message = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {}
                },
                "clientInfo": {
                    "name": "Cursor",
                    "version": "1.0.0"
                }
            }
        }
        
        print(json.dumps(init_message))
        sys.stdout.flush()
        
        # Enviar herramientas disponibles
        tools_message = {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/list",
            "params": {
                "tools": self.tools
            }
        }
        
        print(json.dumps(tools_message))
        sys.stdout.flush()
        
        # Escuchar comandos
        while True:
            try:
                line = input()
                if not line.strip():
                    continue
                
                data = json.loads(line)
                
                if data.get("method") == "tools/call":
                    tool_name = data["params"]["name"]
                    args = data["params"].get("arguments", {})
                    
                    result = self.handle_tool_call(tool_name, args)
                    
                    response = {
                        "jsonrpc": "2.0",
                        "id": data.get("id"),
                        "result": result
                    }
                    
                    print(json.dumps(response))
                    sys.stdout.flush()
                    
            except EOFError:
                break
            except Exception as e:
                error_response = {
                    "jsonrpc": "2.0",
                    "id": data.get("id") if 'data' in locals() else None,
                    "error": {
                        "code": -1,
                        "message": str(e)
                    }
                }
                print(json.dumps(error_response))
                sys.stdout.flush()

if __name__ == "__main__":
    server = PeekabooMCPServer()
    server.run() 