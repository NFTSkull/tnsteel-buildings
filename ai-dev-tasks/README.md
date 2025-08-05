# AI Dev Tasks - TNSTEEL BUILDINGS

Este directorio contiene las herramientas de AI Dev Tasks para desarrollo estructurado con IA en el proyecto TNSTEEL BUILDINGS.

## 🚀 Workflow de Desarrollo

### 1. Crear PRD (Product Requirement Document)
```bash
# En Cursor Composer (⌘ + K)
@ai-dev-tasks/create-prd.md
Aquí está la funcionalidad que quiero construir: [Describe tu feature en detalle]
```

### 2. Generar Lista de Tareas
```bash
# Usar el PRD creado para generar tareas
@ai-dev-tasks/generate-tasks.md
Ahora toma @[nombre-del-prd].md y crea tareas usando @ai-dev-tasks/generate-tasks.md
```

### 3. Ejecutar Tareas Paso a Paso
```bash
# Comenzar con la primera tarea
@ai-dev-tasks/process-task-list.md
Por favor comienza con la tarea 1.1 y usa @ai-dev-tasks/process-task-list.md
```

## 📁 Archivos del Sistema

- **`create-prd.md`**: Guía para crear Product Requirement Documents
- **`generate-tasks.md`**: Convierte PRDs en listas de tareas detalladas
- **`process-task-list.md`**: Ejecuta tareas paso a paso con aprobación del usuario

## 🎯 Beneficios

- **Desarrollo Estructurado**: Proceso claro de idea a código
- **Verificación Paso a Paso**: Revisa y aprueba código en cada paso
- **Gestión de Complejidad**: Divide features grandes en tareas manejables
- **Mejor Confiabilidad**: Enfoque más confiable para desarrollo con IA
- **Seguimiento de Progreso**: Representación visual del progreso

## 💡 Consejos para Éxito

### Ser Específico
- Proporciona contexto detallado en tu descripción inicial
- Incluye archivos de referencia cuando sea relevante
- Define claramente los límites del feature

### Usar Modelos Capaces
- Para mejores resultados, usa el plan Pro de Cursor
- MAX Mode es recomendado para PRDs complejos
- Asegúrate de que el modelo pueda seguir instrucciones estructuradas

### Etiquetar Archivos Correctamente
- Siempre asegúrate de etiquetar correctamente el nombre del archivo PRD
- Reemplaza `@[nombre-del-prd].md` con el nombre real del archivo

### Paciencia e Iteración
- La IA es una herramienta poderosa, pero no es mágica
- Prepárate para guiar, corregir e iterar
- Este workflow está diseñado para hacer ese proceso más suave

## 🔧 Configuración para Cursor

### Uso Directo
1. Abre Cursor Composer (⌘ + K)
2. Referencia los archivos con `@ai-dev-tasks/[archivo].md`
3. Sigue el workflow de 5 pasos

### Ejemplo de Uso
```
@ai-dev-tasks/create-prd.md
Quiero agregar un sistema de chat en tiempo real a la página web de TNSTEEL BUILDINGS. Los usuarios deberían poder chatear con un representante de ventas directamente desde el sitio web.
```

## 📋 Ejemplo de Workflow Completo

### Paso 1: Crear PRD
```
@ai-dev-tasks/create-prd.md
Feature: Sistema de Chat en Tiempo Real
- Los usuarios pueden chatear con representantes de ventas
- Chat integrado en el sitio web
- Notificaciones en tiempo real
- Historial de conversaciones
```

### Paso 2: Generar Tareas
```
@ai-dev-tasks/generate-tasks.md
Ahora toma @prd-chat-system.md y crea tareas usando @ai-dev-tasks/generate-tasks.md
```

### Paso 3: Ejecutar Tareas
```
@ai-dev-tasks/process-task-list.md
Por favor comienza con la tarea 1.1 y usa @ai-dev-tasks/process-task-list.md
```

## 🛠️ Personalización

Puedes modificar los archivos `.md` para adaptarlos a:
- Tu estilo de codificación específico
- Las convenciones de tu proyecto
- Tus necesidades particulares de desarrollo

## 📞 Soporte

Si tienes problemas o preguntas:
1. Revisa que los archivos estén en la ubicación correcta
2. Verifica que estés usando el modelo correcto de IA
3. Asegúrate de seguir el workflow paso a paso

---

**¡Disfruta desarrollando de manera más estructurada y eficiente con AI Dev Tasks!** 🚀 