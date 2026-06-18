document.addEventListener("DOMContentLoaded", () => {
    // 1. Lógica de animación al hacer scroll (Lazy Animation)
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Optimización: dejar de observar una vez animado
            }
        });
    }, observerOptions);

    // Seleccionar todas las tarjetas para animarlas
    const animatedElements = document.querySelectorAll('.value-card-img, .roadmap-item, .step-card, .model-card');
    animatedElements.forEach((el) => {
        el.classList.add('hidden'); // Ocultar por defecto
        scrollObserver.observe(el);
    });

    // 2. Navegación fluida para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});