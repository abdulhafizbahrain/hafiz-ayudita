
function forceUnlockScroll() {
  document.body.classList.remove("no-scroll", "opening-invitation");
  document.documentElement.classList.remove("no-scroll", "opening-invitation");
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

function markScrollPerformanceMode() {
  document.body.classList.add("scroll-performance-mode");
}

function showMainContentAfterIntro({ immediate = false, fadeDuration = 0 } = {}) {
  const main = $("#mainContent");
  const nav = $("#bottomNav");
  const videoCfg = typeof VIDEO_CONFIG !== "undefined" ? VIDEO_CONFIG : {};
  const intro = videoCfg.intro || {};
  const smooth = intro.smoothTransition || {};
  const mobileSmooth = isMobile() ? (smooth.mobile || {}) : {};
  const heroEnterDuration = Number(mobileSmooth.heroEnterDuration ?? smooth.heroEnterDuration ?? 850);

  if (!main) return;
  if (!main.classList.contains("hidden")) {
    forceUnlockScroll();
    markScrollPerformanceMode();
    return;
  }

  document.documentElement.style.setProperty("--hero-enter-duration", `${heroEnterDuration}ms`);

  const delay = immediate ? Math.max(80, Number(fadeDuration || 0) * 0.35) : 0;

  setTimeout(() => {
    main.classList.remove("hidden");
    main.classList.add("main-entering");

    forceUnlockScroll();
    markScrollPerformanceMode();
    document.body.classList.add("invitation-opened");

    window.scrollTo({ top: 0, behavior: "instant" });

    requestAnimationFrame(() => {
      main.classList.add("main-enter-active");
    });

    if (window.AOS) {
      setTimeout(() => AOS.refresh(), 180);
    }

    loadRsvpFromSheet();
    loadWishesFromSheet();

    if (NAVIGATION_CONFIG.enabled && nav) {
      const navDelay = Number(smooth.navDelayAfterHero ?? NAVIGATION_CONFIG.showDelayAfterOpen ?? 360);
      setTimeout(() => {
        nav.classList.remove("nav-hidden");
        nav.classList.add("nav-show");
      }, navDelay);
    }

    setTimeout(() => {
      main.classList.remove("main-entering", "main-enter-active");
      forceUnlockScroll();
      markScrollPerformanceMode();
    }, heroEnterDuration + 120);
  }, delay);
}

document.addEventListener("DOMContentLoaded", async () => {
  applyPageConfig();
  applyColorConfig();
  applyThemeConfig();
  applyBackdropConfig();
  renderAll();
  initCountdown();
  initAudio();
  initNavigation();
  initAnimations();
  initSignatureConfig();
  initVideoBackground();
  initParallax();
  initRsvp();
  initWishes();
  initFormNameSync();
  initOpenTracking();

  $("#loadingScreen")?.classList.add("hidden");

  const openBtn = $("#openInvitationBtn");
  const nav = $("#bottomNav");

  nav?.classList.remove("hidden", "nav-show");
  nav?.classList.add("nav-hidden");
  hideAudioButton();
  hideVideoAudioButton();
  startInvitationPreload();

  window.addEventListener("introVideoSkipped", (event) => {
    showMainContentAfterIntro({
      immediate: true,
      fadeDuration: event.detail?.fadeDuration || 1200
    });
  });

  window.addEventListener("introVideoFadingOut", (event) => {
    showMainContentAfterIntro({
      immediate: true,
      fadeDuration: event.detail?.fadeDuration || 2200
    });
  });

  openBtn?.addEventListener("click", async () => {
    await waitInvitationPreloadBeforeOpen();

    const cover = $("#cover");
    const main = $("#mainContent");
    const videoCfg = typeof VIDEO_CONFIG !== "undefined" ? VIDEO_CONFIG : {};
    const intro = videoCfg.intro || {};
    const smooth = intro.smoothTransition || {};
    const mobileSmooth = isMobile() ? (smooth.mobile || {}) : {};

    const coverHideDelay = MAIN_CONFIG.cover.hideDelay || 650;
    const startDelay = Number(smooth.startDelay ?? 120);
    const introDuration = videoCfg?.mode === "intro-video"
      ? Number(intro.duration ?? 6500)
      : 0;

    const fadeOutDuration = Number(mobileSmooth.fadeOutDuration ?? intro.fadeOutDuration ?? 1200);
    const heroPrepareBeforeFadeEnd = Number(mobileSmooth.heroPrepareBeforeFadeEnd ?? smooth.heroPrepareBeforeFadeEnd ?? 420);
    const heroEnterDuration = Number(mobileSmooth.heroEnterDuration ?? smooth.heroEnterDuration ?? 850);

    document.documentElement.style.setProperty("--hero-enter-duration", `${heroEnterDuration}ms`);
    document.documentElement.style.setProperty("--intro-video-fade-duration", `${fadeOutDuration}ms`);

    cover.classList.add("cover-leaving");
    document.body.classList.add("opening-invitation");

    // V45 fallback unlock scroll:
    // mencegah scroll mouse desktop terasa tertahan jika class lock terlambat terhapus.
    window.clearTimeout(window.__scrollUnlockFallback);
    window.__scrollUnlockFallback = window.setTimeout(() => {
      forceUnlockScroll();
      markScrollPerformanceMode();
    }, Math.max(2500, startDelay + introDuration + fadeOutDuration + 900));

    cover.style.transition = `
      opacity ${coverHideDelay}ms ease,
      transform ${coverHideDelay}ms cubic-bezier(0.16, 1, 0.3, 1),
      filter ${coverHideDelay}ms ease
    `;
    cover.style.opacity = "0";
    cover.style.transform = "scale(1.035)";
    cover.style.filter = "blur(8px)";

    setTimeout(() => {
      startInvitationVideo();
    }, startDelay);

    // Catat tombol Buka Undangan ditekan.
    // Lokasi tamu diminta di tahap ini, agar tidak mengganggu cover.
    trackInvitationOpen({
      eventType: "invitation_opened",
      includeLocation: true
    });

    setTimeout(() => {
      cover.classList.add("hidden");

      // Hero mulai muncul tepat saat video mulai fade out.
      // Transisi dibuat pendek agar tidak terasa seperti jeda gelap.
      const showHeroDelay = Math.max(0, startDelay + introDuration - coverHideDelay);

      setTimeout(() => {
        showMainContentAfterIntro({
          immediate: true,
          fadeDuration: fadeOutDuration
        });
      }, showHeroDelay);
    }, coverHideDelay);
  });

  document.body.classList.add("no-scroll");
});
