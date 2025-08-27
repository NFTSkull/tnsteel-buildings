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
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 100px !important;
                height: 100px !important;
                background: lime !important;
                border: 5px solid red !important;
                z-index: 999999 !important;
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
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 100px !important;
                height: 100px !important;
                background: lime !important;
                border: 5px solid red !important;
                z-index: 999999 !important;
                cursor: pointer !important;
                opacity: 1 !important;
                visibility: visible !important;
            `;
            
            // Agregar al body
            document.body.appendChild(newButton);
            console.log('Nuevo botón creado y agregado al body');
        }
        
        // Crear elemento de prueba adicional
        const testElement = document.createElement('div');
        testElement.innerHTML = '¡PRUEBA!';
        testElement.style.cssText = `
            position: fixed !important;
            top: 10px !important;
            left: 10px !important;
            width: 200px !important;
            height: 100px !important;
            background: yellow !important;
            border: 5px solid blue !important;
            z-index: 9999999 !important;
            color: black !important;
            font-size: 20px !important;
            font-weight: bold !important;
            text-align: center !important;
            line-height: 90px !important;
        `;
        document.body.appendChild(testElement);
        console.log('Elemento de prueba creado');

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