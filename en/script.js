document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll(".section");

  // 1. Función para el menú móvil
  toggleButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Cerrar el menú después de hacer clic en un enlace (solo en móvil)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
      }
    });
  });

  // 2. Función para resaltar el enlace de navegación activo al hacer scroll
  const options = {
    root: null, // viewport
    rootMargin: "0px 0px -50% 0px", // Cambiado para activarse cuando la sección esté más centrada
    threshold: 0.1, // 10% de la sección visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Solo actuar si la sección está intersectando
      if (entry.isIntersecting) {
        // Eliminar clase 'active' de todos los enlaces
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Encontrar el enlace correspondiente a la sección visible
        const targetId = entry.target.getAttribute("id");
        const activeLink = document.querySelector(
          `.nav-menu a[href="#${targetId}"]`
        );

        // Agregar clase 'active' al enlace
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, options);

  // Observar cada sección
  sections.forEach((section) => {
    observer.observe(section);
  });
});

document.getElementById("linkedin").addEventListener("click", () => {
  "click en botón de linkedin";
});
