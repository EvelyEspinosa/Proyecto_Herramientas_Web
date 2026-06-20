document.addEventListener("DOMContentLoaded", () => {
    
    /* =======================================================
       1. ENRUTADOR DINÁMICO (SPA)
       ======================================================= */
    const navLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page');

    function navigateTo(pageId) {
        // Validación: previene errores si se hace clic en elementos sin ID
        if(!pageId) return;

        // Ocultar todas las secciones de vista
        pages.forEach(page => page.classList.remove('active'));
        
        // Remover clase activa del menú
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        // Activar la página seleccionada
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Regresar al inicio superior
        }

        // Marcar visualmente el enlace actual en el header
        const activeLink = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Escuchar el evento clic de todos los elementos del menú
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Si el enlace tiene la clase "soon" (Próximamente), ignorar clic
            if(link.classList.contains('soon')) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            navigateTo(pageId);
        });
    });

    /* =======================================================
       2. OBSERVADOR DE INTERSECCIÓN (LAZY ANIMATIONS)
       ======================================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Gatilla cuando el 15% del elemento es visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar la clase de CSS que activa la animación
                entry.target.classList.add('show');
                // Dejar de escuchar el elemento para mejorar el rendimiento
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Seleccionar y observar todos los componentes con la clase base "hidden"
    const animatedElements = document.querySelectorAll('.hidden');
    animatedElements.forEach(el => scrollObserver.observe(el));
});