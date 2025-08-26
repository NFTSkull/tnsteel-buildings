# 🚀 Instrucciones de Despliegue - TN Steel Buildings

Este archivo contiene las instrucciones paso a paso para desplegar el sitio web en cPanel (HostGator VPS).

## 📋 Prerrequisitos

- Acceso a cPanel de tu hosting
- El archivo `tnsteelbuildings.zip` generado por el build
- Dominio configurado: `tnsteelbuildings.com`

## 🔧 Pasos de Despliegue

### 1. Acceder a cPanel
- Inicia sesión en tu cPanel de HostGator
- Navega a **File Manager**

### 2. Navegar a la carpeta raíz del sitio
- En File Manager, ve a la carpeta `public_html`
- Esta es la carpeta raíz de tu sitio web

### 3. Subir el archivo ZIP
- Haz clic en **Upload** en la parte superior
- Selecciona el archivo `tnsteelbuildings.zip`
- Espera a que se complete la subida

### 4. Extraer el contenido
- Una vez subido, haz clic derecho en `tnsteelbuildings.zip`
- Selecciona **Extract**
- Confirma la extracción en `public_html`

### 5. Verificar la estructura
Después de extraer, deberías ver esta estructura en `public_html`:
```
public_html/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── 404.html
├── styles.css
├── script.js
├── garages.html
├── barns.html
├── carports.html
├── commercial.html
├── work-with-us.html
└── [imágenes y videos]
```

### 6. Limpiar archivos temporales
- Elimina el archivo `tnsteelbuildings.zip` (ya no es necesario)
- Si había archivos del sitio anterior, elimínalos para evitar conflictos

### 7. Verificar permisos
- Asegúrate de que `.htaccess` tenga permisos 644
- Los archivos HTML, CSS y JS deben tener permisos 644
- Las imágenes y videos deben tener permisos 644

## ✅ Verificación Post-Despliegue

### 1. Verificar HTTPS
- Abre `https://tnsteelbuildings.com`
- Confirma que se redirija automáticamente a HTTPS
- Verifica que no haya errores de certificado SSL

### 2. Verificar páginas principales
- **Página de inicio**: `https://tnsteelbuildings.com/`
- **Garáges**: `https://tnsteelbuildings.com/garages.html`
- **Barns**: `https://tnsteelbuildings.com/barns.html`
- **Carports**: `https://tnsteelbuildings.com/carports.html`
- **Commercial**: `https://tnsteelbuildings.com/commercial.html`
- **Trabaja con nosotros**: `https://tnsteelbuildings.com/work-with-us.html`

### 3. Verificar funcionalidades
- Navegación entre páginas
- Imágenes y videos cargando correctamente
- Estilos CSS aplicados
- JavaScript funcionando

### 4. Verificar archivos de configuración
- **robots.txt**: `https://tnsteelbuildings.com/robots.txt`
- **sitemap.xml**: `https://tnsteelbuildings.com/sitemap.xml`
- **Página 404**: Intenta acceder a una URL inexistente

## 🔍 Solución de Problemas Comunes

### Error 500 - Internal Server Error
- Verifica que `.htaccess` esté en `public_html`
- Revisa los logs de error en cPanel
- Asegúrate de que el hosting soporte las directivas de `.htaccess`

### Página en blanco
- Verifica que `index.html` esté en `public_html`
- Revisa permisos de archivos (644 para archivos, 755 para carpetas)
- Comprueba que no haya errores en el código HTML

### Redirección HTTPS no funciona
- Verifica que el certificado SSL esté activo
- Confirma que el hosting soporte `mod_rewrite`
- Revisa que `.htaccess` tenga el contenido correcto

### Imágenes no cargan
- Verifica que las rutas de las imágenes sean correctas
- Confirma que los archivos de imagen estén en la ubicación correcta
- Revisa permisos de archivos

## 📞 Soporte

Si encuentras problemas durante el despliegue:

1. Revisa los logs de error en cPanel
2. Verifica que todos los archivos se hayan extraído correctamente
3. Confirma que el hosting soporte las tecnologías utilizadas
4. Contacta al soporte de HostGator si es necesario

## 🎯 Características del Sitio Desplegado

- ✅ **HTTPS forzado** para seguridad
- ✅ **Compresión** de archivos (Gzip/Brotli)
- ✅ **Cache agresivo** para assets estáticos
- ✅ **Headers de seguridad** implementados
- ✅ **Página 404 personalizada**
- ✅ **Sitemap XML** automático
- ✅ **robots.txt** configurado
- ✅ **Archivos minificados** para mejor rendimiento

---

**¡Tu sitio TN Steel Buildings está listo para funcionar en producción! 🎉**

