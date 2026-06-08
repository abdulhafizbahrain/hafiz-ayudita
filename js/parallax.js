function initParallax() {
  if (!safeEnabled(window.PARALLAX_CONFIG, true)) return;

  const config = isMobile() ? PARALLAX_CONFIG.mobile : PARALLAX_CONFIG.desktop;
  if (!config.enabled) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = !isMobile();

  // Desktop mouse wheel terasa berat jika parallax terlalu banyak.
  // V45: kurangi efek berat di desktop, terutama GSAP scrub dan mousemove ornament.
  const reduceHeavyDesktopEffects = isDesktop;

  if (!prefersReducedMotion && window.simpleParallax && PARALLAX_CONFIG.libraries.simpleParallax) {
    const imgs = $$(".parallax-image");
    if (imgs.length) {
      new simpleParallax(imgs, {
        scale: 1 + Number(reduceHeavyDesktopEffects ? Math.min(config.strength || 0.08, 0.06) : (config.strength || 0.12)),
        delay: reduceHeavyDesktopEffects ? 0.25 : 0.6,
        transition: "cubic-bezier(0,0,0,1)"
      });
    }
  }

  if (
    !prefersReducedMotion &&
    !reduceHeavyDesktopEffects &&
    window.gsap &&
    window.ScrollTrigger &&
    PARALLAX_CONFIG.libraries.gsapScrollTrigger
  ) {
    gsap.registerPlugin(ScrollTrigger);

    $$(".parallax-bg").forEach(bg => {
      gsap.to(bg, {
        yPercent: isMobile() ? 5 : 8,
        ease: "none",
        scrollTrigger: {
          trigger: bg.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.35
        }
      });
    });

    $$(".parallax-ornament").forEach((el, idx) => {
      gsap.to(el, {
        y: idx % 2 ? 32 : -32,
        rotate: idx % 2 ? 8 : -8,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.35
        }
      });
    });
  }

  if (!prefersReducedMotion && PARALLAX_CONFIG.effects.mouseMove && !reduceHeavyDesktopEffects) {
    let raf = null;
    let lastEvent = null;

    window.addEventListener("pointermove", (e) => {
      lastEvent = e;
      if (raf) return;

      raf = requestAnimationFrame(() => {
        raf = null;
        const x = (lastEvent.clientX / window.innerWidth - 0.5) * 10;
        const y = (lastEvent.clientY / window.innerHeight - 0.5) * 10;

        $$(".parallax-ornament").forEach((el, idx) => {
          el.style.transform = `translate(${x * (idx + 1) * 0.22}px, ${y * (idx + 1) * 0.22}px)`;
        });
      });
    }, { passive: true });
  }
}
