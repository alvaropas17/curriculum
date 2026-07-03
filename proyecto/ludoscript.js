document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const target = document.querySelector(this.getAttribute("href"));

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-10");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-10");
    observer.observe(section);
  });

  const featureImage = document.querySelector("#ludoscript-feature-image");
  const featureCards = Array.from(document.querySelectorAll(".feature-card"));
  const quizDots = Array.from(document.querySelectorAll(".quiz-dot"));
  const progressDots = Array.from(document.querySelectorAll(".progress-dot"));
  const featureGroups = [
    [{ src: "../img/ludoscript-home.png", alt: "LudoScript Home" }],
    [
      { src: "../img/ludoscript-quiz.png", alt: "LudoScript Quiz" },
      { src: "../img/ludoscript-in-quiz.png", alt: "LudoScript Quiz en curso" },
      { src: "../img/ludoscript-resultado-final.png", alt: "LudoScript Resultado final" }
    ],
    [
      { src: "../img/preguntas-falladas.png", alt: "LudoScript Preguntas falladas" },
      { src: "../img/progreso.png", alt: "LudoScript Progreso" },
      { src: "../img/progreso-visual.png", alt: "LudoScript Progreso visual" }
    ],
    [{ src: "../img/aprendizaje.png", alt: "LudoScript Aprendizaje" }]
  ];

  let activeFeature = 0;
  let activeQuizSlide = 0;
  let activeProgressSlide = 0;
  let isHoveringFeatureCard = false;
  let rotationTimer;
  let resumeTimer;

  const setActiveClasses = () => {
    featureCards.forEach((card, index) => {
      card.classList.toggle("is-active", index === activeFeature);
      card.querySelector("h4")?.classList.toggle("text-primary", index === activeFeature);
      card.querySelector("h4")?.classList.toggle("text-text-primary", index !== activeFeature);
    });
    quizDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", activeFeature === 1 && index === activeQuizSlide);
    });
    progressDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", activeFeature === 2 && index === activeProgressSlide);
    });
  };

  const showFeature = (featureIndex, slideIndex = 0) => {
    if (!featureImage || !featureGroups[featureIndex]) return;

    activeFeature = featureIndex;
    if (featureIndex === 1) {
      activeQuizSlide = slideIndex % featureGroups[1].length;
    }
    if (featureIndex === 2) {
      activeProgressSlide = slideIndex % featureGroups[2].length;
    }

    const currentSlide = activeFeature === 1 ? activeQuizSlide : activeFeature === 2 ? activeProgressSlide : 0;
    const item = featureGroups[activeFeature][currentSlide];
    featureImage.classList.add("opacity-0");
    window.setTimeout(() => {
      featureImage.src = item.src;
      featureImage.alt = item.alt;
      featureImage.classList.remove("opacity-0");
    }, 120);
    setActiveClasses();
  };

  const nextFeature = () => {
    if (activeFeature === 1 && activeQuizSlide < featureGroups[1].length - 1) {
      showFeature(1, activeQuizSlide + 1);
      return;
    }

    if (activeFeature === 2 && activeProgressSlide < featureGroups[2].length - 1) {
      showFeature(2, activeProgressSlide + 1);
      return;
    }

    showFeature((activeFeature + 1) % featureGroups.length, 0);
  };

  const stopRotation = () => {
    window.clearInterval(rotationTimer);
  };

  const restartRotation = () => {
    stopRotation();
    rotationTimer = window.setInterval(nextFeature, 3000);
  };

  const resumeAfterInteraction = () => {
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      if (!isHoveringFeatureCard) {
        restartRotation();
      }
    }, 3000);
  };

  const showCurrentFeatureCard = (featureIndex) => {
    const currentSlide = featureIndex === 1 ? activeQuizSlide : featureIndex === 2 ? activeProgressSlide : 0;
    showFeature(featureIndex, currentSlide);
  };

  const pauseForHover = () => {
    isHoveringFeatureCard = true;
    window.clearTimeout(resumeTimer);
    stopRotation();
  };

  const releaseHoverPause = () => {
    isHoveringFeatureCard = false;
    resumeAfterInteraction();
  };

  const handleManualSelection = () => {
    stopRotation();
    if (!isHoveringFeatureCard) {
      resumeAfterInteraction();
    }
  };

  featureCards.forEach((card) => {
    const featureIndex = Number(card.dataset.featureIndex);

    card.addEventListener("mouseenter", () => {
      pauseForHover();
      showCurrentFeatureCard(featureIndex);
    });

    card.addEventListener("mouseleave", () => {
      releaseHoverPause();
    });

    card.addEventListener("click", () => {
      showCurrentFeatureCard(featureIndex);
      handleManualSelection();
    });
  });

  quizDots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      showFeature(1, Number(dot.dataset.quizDot));
      handleManualSelection();
    });
  });

  progressDots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      showFeature(2, Number(dot.dataset.progressDot));
      handleManualSelection();
    });
  });

  restartRotation();
});
