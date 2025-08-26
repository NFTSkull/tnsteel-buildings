import fs from 'fs-extra';
import path from 'path';
import fastGlob from 'fast-glob';
import { minify } from 'html-minifier-terser';
import CleanCSS from 'clean-css';
import * as esbuild from 'esbuild';
import { create } from 'xmlbuilder2';
import AdmZip from 'adm-zip';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Configuración
const config = {
  siteRoot: null,
  outputDir: path.join(projectRoot, 'deploy', 'dist'),
  zipFile: path.join(projectRoot, 'deploy', 'tnsteelbuildings.zip'),
  domain: 'https://tnsteelbuildings.com',
  excludePatterns: [
    '.git/**',
    'node_modules/**',
    '**/*.md',
    '**/*.psd',
    '**/*.ai',
    '**/*.sketch',
    '**/.DS_Store',
    '**/tests/**',
    '**/test/**',
    '**/__tests__/**',
    '**/*.test.*',
    '**/*.spec.*',
    'deploy/**',
    'scripts/**',
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'peekaboo*',
    'ai-dev-tasks/**'
  ]
};

// Detectar la raíz del sitio
async function detectSiteRoot() {
  console.log('🔍 Detectando raíz del sitio...');
  const possibleRoots = [
    path.join(projectRoot, 'public'),
    path.join(projectRoot, 'site'),
    projectRoot
  ];

  for (const root of possibleRoots) {
    const indexPath = path.join(root, 'index.html');
    console.log(`  Verificando: ${indexPath}`);
    if (await fs.pathExists(indexPath)) {
      console.log(`✅ Sitio detectado en: ${root}`);
      return root;
    }
  }

  throw new Error('No se pudo detectar la raíz del sitio. Asegúrate de que exista index.html en public/, site/ o la raíz del proyecto.');
}

// Limpiar directorio de salida
async function cleanOutputDir() {
  console.log('🧹 Limpiando directorio de salida...');
  await fs.remove(config.outputDir);
  await fs.ensureDir(config.outputDir);
}

// Copiar archivos del sitio
async function copySiteFiles() {
  console.log('📁 Copiando archivos del sitio...');
  
  const files = await fastGlob('**/*', {
    cwd: config.siteRoot,
    ignore: config.excludePatterns,
    dot: false
  });

  for (const file of files) {
    const sourcePath = path.join(config.siteRoot, file);
    const destPath = path.join(config.outputDir, file);
    
    await fs.ensureDir(path.dirname(destPath));
    await fs.copy(sourcePath, destPath);
  }

  console.log(`✅ Copiados ${files.length} archivos`);
}

// Minificar HTML
async function minifyHTML() {
  console.log('🔧 Minificando archivos HTML...');
  
  const htmlFiles = await fastGlob('**/*.html', { cwd: config.outputDir });
  
  for (const file of htmlFiles) {
    const filePath = path.join(config.outputDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    
    try {
      const minified = await minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: false,
        removeEmptyAttributes: false,
        removeOptionalTags: false,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: false
      });
      
      await fs.writeFile(filePath, minified);
      console.log(`✅ Minificado: ${file}`);
    } catch (error) {
      console.warn(`⚠️ Error minificando ${file}:`, error.message);
    }
  }
}

// Minificar CSS
async function minifyCSS() {
  console.log('🎨 Minificando archivos CSS...');
  
  const cssFiles = await fastGlob('**/*.css', { cwd: config.outputDir });
  
  for (const file of cssFiles) {
    if (file.includes('.min.css')) continue; // Saltar archivos ya minificados
    
    const filePath = path.join(config.outputDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    
    try {
      const cleanCSS = new CleanCSS({
        level: 2,
        format: 'keep-breaks'
      });
      
      const result = cleanCSS.minify(content);
      await fs.writeFile(filePath, result.styles);
      console.log(`✅ Minificado: ${file}`);
    } catch (error) {
      console.warn(`⚠️ Error minificando CSS ${file}:`, error.message);
    }
  }
}

// Minificar JavaScript
async function minifyJS() {
  console.log('⚡ Minificando archivos JavaScript...');
  
  const jsFiles = await fastGlob('**/*.js', { cwd: config.outputDir });
  
  for (const file of jsFiles) {
    if (file.includes('.min.js')) continue; // Saltar archivos ya minificados
    
    const filePath = path.join(config.outputDir, file);
    
    try {
      const result = await esbuild.build({
        entryPoints: [filePath],
        bundle: false,
        minify: true,
        target: 'es2017',
        format: 'iife',
        outfile: filePath,
        write: false
      });
      
      await fs.writeFile(filePath, result.outputFiles[0].text);
      console.log(`✅ Minificado: ${file}`);
    } catch (error) {
      console.warn(`⚠️ Error minificando JS ${file}:`, error.message);
    }
  }
}

// Generar .htaccess
async function generateHtaccess() {
  console.log('🔒 Generando .htaccess...');
  
  const htaccessContent = `# Forzar HTTPS (respeta host actual)
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Index
DirectoryIndex index.html

# Compresión Brotli/Gzip si está disponible
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# Cache estática
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
  <FilesMatch "\\.(css|js|png|jpe?g|gif|svg|webp|avif|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(html)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>
</IfModule>

# 404 amigable
ErrorDocument 404 /404.html`;

  await fs.writeFile(path.join(config.outputDir, '.htaccess'), htaccessContent);
  console.log('✅ .htaccess generado');
}

// Generar robots.txt
async function generateRobotsTxt() {
  console.log('🤖 Generando robots.txt...');
  
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${config.domain}/sitemap.xml`;

  await fs.writeFile(path.join(config.outputDir, 'robots.txt'), robotsContent);
  console.log('✅ robots.txt generado');
}

// Generar sitemap.xml
async function generateSitemap() {
  console.log('🗺️ Generando sitemap.xml...');
  
  const htmlFiles = await fastGlob('**/*.html', { cwd: config.outputDir });
  
  const sitemap = create({ version: '1.0' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });
  
  for (const file of htmlFiles) {
    const url = sitemap.ele('url');
    url.ele('loc').txt(`${config.domain}/${file === 'index.html' ? '' : file}`);
    url.ele('lastmod').txt(new Date().toISOString());
    url.ele('changefreq').txt('monthly');
    url.ele('priority').txt(file === 'index.html' ? '1.0' : '0.8');
  }
  
  const sitemapXml = sitemap.end({ prettyPrint: true });
  await fs.writeFile(path.join(config.outputDir, 'sitemap.xml'), sitemapXml);
  console.log(`✅ Sitemap generado con ${htmlFiles.length} URLs`);
}

// Generar 404.html
async function generate404Page() {
  console.log('❌ Generando página 404...');
  
  // Leer el CSS principal para obtener estilos base
  let baseStyles = '';
  try {
    const cssPath = path.join(config.outputDir, 'styles.css');
    if (await fs.pathExists(cssPath)) {
      baseStyles = await fs.readFile(cssPath, 'utf8');
    }
  } catch (error) {
    console.warn('⚠️ No se pudo leer styles.css para la página 404');
  }
  
  const html404 = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página no encontrada - TN Steel Buildings</title>
    <style>
        ${baseStyles}
        .error-container {
            text-align: center;
            padding: 100px 20px;
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .error-code {
            font-size: 6rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .error-message {
            font-size: 1.5rem;
            color: #666;
            margin-bottom: 40px;
            max-width: 600px;
        }
        .back-button {
            display: inline-block;
            padding: 15px 30px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        .back-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-code">404</div>
        <div class="error-message">
            Lo sentimos, la página que buscas no existe o ha sido movida.
        </div>
        <a href="/" class="back-button">Volver al inicio</a>
    </div>
</body>
</html>`;

  await fs.writeFile(path.join(config.outputDir, '404.html'), html404);
  console.log('✅ Página 404 generada');
}

// Crear archivo ZIP
async function createZip() {
  console.log('📦 Creando archivo ZIP...');
  
  const zip = new AdmZip();
  
  // Agregar todos los archivos de deploy/dist al ZIP
  const files = await fastGlob('**/*', { cwd: config.outputDir, dot: true });
  
  for (const file of files) {
    const filePath = path.join(config.outputDir, file);
    const stats = await fs.stat(filePath);
    
    if (stats.isFile()) {
      const content = await fs.readFile(filePath);
      zip.addLocalFile(filePath, path.dirname(file));
    }
  }
  
  // Asegurar que el directorio deploy existe
  await fs.ensureDir(path.dirname(config.zipFile));
  
  // Escribir el ZIP
  zip.writeZip(config.zipFile);
  
  const zipSize = (await fs.stat(config.zipFile)).size;
  const zipSizeMB = (zipSize / (1024 * 1024)).toFixed(2);
  
  console.log(`✅ ZIP creado: ${config.zipFile} (${zipSizeMB} MB)`);
}

// Función principal
async function main() {
  try {
    console.log('🚀 Iniciando build del sitio TN Steel Buildings...');
    
    // Detectar raíz del sitio
    config.siteRoot = await detectSiteRoot();
    
    // Limpiar y preparar directorio de salida
    await cleanOutputDir();
    
    // Copiar archivos del sitio
    await copySiteFiles();
    
    // Minificar archivos
    await minifyHTML();
    await minifyCSS();
    await minifyJS();
    
    // Generar archivos de configuración
    await generateHtaccess();
    await generateRobotsTxt();
    await generateSitemap();
    await generate404Page();
    
    // Crear ZIP
    await createZip();
    
    console.log('\n🎉 Build completado exitosamente!');
    console.log(`📁 Archivos del sitio: ${config.outputDir}`);
    console.log(`📦 ZIP listo para desplegar: ${config.zipFile}`);
    console.log('\n📋 Próximos pasos:');
    console.log('1. Sube el ZIP a cPanel → File Manager → public_html');
    console.log('2. Extrae el contenido del ZIP');
    console.log('3. Verifica que index.html y .htaccess estén en public_html');
    console.log('4. Abre https://tnsteelbuildings.com para verificar');
    
  } catch (error) {
    console.error('❌ Error durante el build:', error);
    process.exit(1);
  }
}

// Ejecutar la función principal
main().catch(error => {
  console.error('❌ Error en main:', error);
  process.exit(1);
});
