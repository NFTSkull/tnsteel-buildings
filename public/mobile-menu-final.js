/* ===== MENÚ MÓVIL DEFINITIVO - JAVASCRIPT FUNCIONAL ===== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 MENÚ MÓVIL FINAL INICIANDO...');
    
    initializeFinalMobileMenu();
});

function initializeFinalMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const closeButton = document.querySelector('.mobile-drawer-close');
    
    console.log('🔍 Elementos encontrados:', {
        toggleButton: !!toggleButton,
        drawer: !!drawer,
        overlay: !!overlay,
        closeButton: !!closeButton
    });
    
    if (!toggleButton) {
        console.error('❌ Botón hamburguesa no encontrado');
        return;
    }
    
    if (!drawer) {
        console.error('❌ Drawer no encontrado');
        return;
    }
    
    if (!overlay) {
        console.error('❌ Overlay no encontrado');
        return;
    }
    
    console.log('✅ Todos los elementos encontrados, configurando eventos...');
    
    // Función para abrir drawer
    const openDrawer = () => {
        console.log('📱 Abriendo drawer...');
        toggleButton.setAttribute('aria-expanded', 'true');
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        console.log('✅ Drawer abierto');
    };
    
    // Función para cerrar drawer
    const closeDrawer = () => {
        console.log('📱 Cerrando drawer...');
        toggleButton.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        console.log('✅ Drawer cerrado');
    };
    
    // Evento click del botón hamburguesa
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🖱️ Click en botón hamburguesa');
        
        const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
        
        if (isOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });
    
    // Evento click del botón cerrar
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🖱️ Click en botón cerrar');
            closeDrawer();
        });
    }
    
    // Evento click del overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            console.log('🖱️ Click en overlay');
            closeDrawer();
        }
    });
    
    // Evento tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                console.log('⌨️ Tecla Escape presionada');
                closeDrawer();
            }
        }
    });
    
    // Cerrar drawer cuando se hace click en links
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('🖱️ Click en link del drawer');
            closeDrawer();
        });
    });
    
    console.log('🎉 Menú móvil final configurado correctamente');
    
    // Test de visibilidad
    if (window.innerWidth <= 768) {
        console.log('📱 Pantalla móvil detectada - botón debería ser visible');
        const computedStyle = window.getComputedStyle(toggleButton);
        console.log('👁️ Display:', computedStyle.display);
        console.log('👁️ Visibility:', computedStyle.visibility);
        console.log('👁️ Opacity:', computedStyle.opacity);
    }
}