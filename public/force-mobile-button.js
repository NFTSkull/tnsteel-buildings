/* ===== FORZAR BOTÓN MÓVIL POR JAVASCRIPT ===== */

// ÚLTIMO RECURSO: Si ni con CSS funciona, crear el botón por JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIANDO FORZADO DE BOTÓN MÓVIL ===');
    
    // Solo en móvil
    if (window.innerWidth <= 768) {
        console.log('Pantalla móvil detectada:', window.innerWidth + 'px');
        
        // Verificar si el botón existe
        let existingButton = document.querySelector('.mobile-menu-toggle');
        console.log('Botón existente encontrado:', !!existingButton);
        
        if (existingButton) {
            console.log('Botón existe, aplicando estilos forzados...');
            // Si existe, forzar estilos
            existingButton.style.cssText = `
                display: block !important;
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                width: 50px !important;
                height: 50px !important;
                background: red !important;
                border: 3px solid yellow !important;
                z-index: 99999 !important;
                cursor: pointer !important;
                opacity: 1 !important;
                visibility: visible !important;
            `;
            
            // Forzar líneas del hamburguesa
            const lines = existingButton.querySelectorAll('.hamburger-line');
            lines.forEach((line, index) => {
                line.style.cssText = `
                    display: block !important;
                    width: 25px !important;
                    height: 3px !important;
                    background: black !important;
                    margin: 4px auto !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                `;
            });
            
            console.log('Estilos forzados aplicados');
        } else {
            console.log('Botón NO existe, creando uno nuevo...');
            // Si no existe, crear uno nuevo
            const newButton = document.createElement('button');
            newButton.className = 'mobile-menu-toggle mobile-menu-forced';
            newButton.setAttribute('aria-label', 'Open menu');
            newButton.setAttribute('aria-expanded', 'false');
            newButton.innerHTML = `
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            `;
            
            newButton.style.cssText = `
                display: block !important;
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                width: 50px !important;
                height: 50px !important;
                background: red !important;
                border: 3px solid yellow !important;
                z-index: 99999 !important;
                cursor: pointer !important;
                opacity: 1 !important;
                visibility: visible !important;
            `;
            
            // Agregar al body
            document.body.appendChild(newButton);
            console.log('Nuevo botón creado y agregado al body');
        }
        
        // Test final
        setTimeout(() => {
            const finalCheck = document.querySelector('.mobile-menu-toggle');
            if (finalCheck) {
                console.log('✅ BOTÓN ENCONTRADO - Estilos computados:');
                const computedStyles = window.getComputedStyle(finalCheck);
                console.log('Display:', computedStyles.display);
                console.log('Visibility:', computedStyles.visibility);
                console.log('Opacity:', computedStyles.opacity);
                console.log('Position:', computedStyles.position);
                console.log('Z-index:', computedStyles.zIndex);
                console.log('Top:', computedStyles.top);
                console.log('Right:', computedStyles.right);
            } else {
                console.log('❌ BOTÓN AÚN NO ENCONTRADO - Algo está muy mal');
            }
        }, 1000);
    }
});