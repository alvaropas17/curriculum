// Funcionalidad del menú hamburguesa responsive
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Cambiar aria-expanded para accesibilidad
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
    }

    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    }

    // Event listener para el botón del menú hamburguesa
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        
        // Configurar atributos de accesibilidad iniciales
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'nav-menu');
    }

    // Event listeners para cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Cerrar menú al cambiar el tamaño de la ventana (responsive)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Función para scroll suave (mejora la navegación)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});