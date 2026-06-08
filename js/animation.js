function initAnimations() {
  if (!safeEnabled(window.ANIMATION_CONFIG, true)) return;

  if (window.AOS && ANIMATION_CONFIG.libraries.aos) {
    AOS.init({
      duration: ANIMATION_CONFIG.duration || 900,
      delay: 40,
      once: !!ANIMATION_CONFIG.once,
      easing: "ease-out-cubic"
    });
  }

  if (window.Lenis && ANIMATION_CONFIG.libraries.lenisSmoothScroll) {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}
