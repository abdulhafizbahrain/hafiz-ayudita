let introVideoElement = null;
let introVideoFinished = false;
let introVideoOverlay = null;

function getVideoConfig() {
  if (typeof VIDEO_CONFIG !== "undefined") return VIDEO_CONFIG;
  return window.VIDEO_CONFIG || {};
}

function isVideoEnabled() {
  const cfg = getVideoConfig();
  return cfg && cfg.enabled !== false;
}

function getVideoSources() {
  const cfg = getVideoConfig();

  const sourceList = isMobile()
    ? (cfg.source?.mobileSources || [cfg.source?.mobile])
    : (cfg.source?.desktopSources || [cfg.source?.desktop]);

  return [...new Set((sourceList || []).filter(Boolean))];
}

function initVideoBackground() {
  const cfg = getVideoConfig();

  if (cfg.mode === "intro-video") return null;
  if (!isVideoEnabled() || !cfg.useAsBackground) return null;

  const target = $("#hero");
  if (!target) return null;

  const sources = getVideoSources();
  if (!sources.length) return null;

  const video = document.createElement("video");
  video.className = "hero-bg hero-video-bg";
  video.autoplay = !!cfg.autoplay;
  video.muted = cfg.muted !== false;
  video.loop = !!cfg.loop;
  video.controls = !!cfg.controls;
  video.playsInline = cfg.playsInline !== false;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.preload = "auto";

  if (cfg.source?.fallbackImage) video.poster = cfg.source.fallbackImage;

  sources.forEach(src => {
    const sourceEl = document.createElement("source");
    sourceEl.src = src;
    sourceEl.type = "video/mp4";
    video.appendChild(sourceEl);
  });

  const currentBg = target.querySelector(".hero-bg");
  if (currentBg) currentBg.replaceWith(video);
  else target.prepend(video);

  video.load();
  return video;
}

function createIntroVideoOverlay() {
  if (introVideoElement) return introVideoElement;

  const cfg = getVideoConfig();
  const sources = getVideoSources();
  if (!sources.length) return null;

  const overlay = document.createElement("div");
  introVideoOverlay = overlay;
  overlay.id = "introVideoOverlay";
  overlay.className = "intro-video-overlay intro-video-top-fixed";

  const fitCfg = cfg.intro?.videoFit || {};
  const objectFit = isMobile()
    ? (fitCfg.mobileObjectFit || "cover")
    : (fitCfg.desktopObjectFit || "cover");
  const objectPosition = isMobile()
    ? (fitCfg.mobileObjectPosition || "center center")
    : (fitCfg.desktopObjectPosition || "center center");

  overlay.style.setProperty("--intro-video-object-fit", objectFit);
  overlay.style.setProperty("--intro-video-object-position", objectPosition);

  const video = document.createElement("video");
  introVideoElement = video;
  video.className = "intro-video";
  video.autoplay = true;
  video.muted = cfg.intro?.muted ?? false;
  video.loop = cfg.intro?.loopAsBacksound ?? true;
  video.controls = false;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.preload = "auto";
  video.volume = Number(cfg.intro?.volume ?? 0.65);

  if (cfg.source?.fallbackImage) {
    video.poster = cfg.source.fallbackImage;
  }

  sources.forEach(src => {
    const sourceEl = document.createElement("source");
    sourceEl.src = src;
    sourceEl.type = "video/mp4";
    video.appendChild(sourceEl);
  });

  video.addEventListener("loadeddata", () => {
    overlay.classList.add("intro-video-loaded");
  });

  video.addEventListener("play", updateVideoAudioButton);
  video.addEventListener("pause", updateVideoAudioButton);
  video.addEventListener("volumechange", updateVideoAudioButton);

  video.addEventListener("error", () => {
    console.warn("Intro video gagal dimuat. Periksa file:", sources);
    overlay.classList.add("intro-video-error");
  });

  overlay.appendChild(video);

  if (cfg.intro?.showSkipButton !== false) {
    const skip = document.createElement("button");
    skip.type = "button";
    skip.className = "intro-video-skip";
    skip.textContent = cfg.intro?.skipButtonText || "Lewati";
    skip.addEventListener("click", () => finishIntroVideo({ skipped: true }));
    overlay.appendChild(skip);
  }

  document.body.appendChild(overlay);
  video.load();
  return video;
}

function startIntroVideo() {
  const cfg = getVideoConfig();

  if (!isVideoEnabled()) return Promise.resolve(false);
  if (cfg.mode !== "intro-video" || !cfg.intro?.enabled) return Promise.resolve(false);

  introVideoFinished = false;

  const video = createIntroVideoOverlay();
  if (!video) return Promise.resolve(false);

  const overlay = $("#introVideoOverlay");
  const smooth = cfg.intro?.smoothTransition || {};
  const mobileSmooth = isMobile() ? (smooth.mobile || {}) : {};
  const fadeIn = Number(mobileSmooth.fadeInDuration ?? cfg.intro?.fadeInDuration ?? 850);

  overlay?.style.setProperty("--intro-video-fade-in-duration", `${fadeIn}ms`);
  overlay?.classList.remove("intro-video-hidden", "intro-video-audio-only");
  overlay?.classList.add("intro-video-show");

  video.muted = cfg.intro?.muted ?? false;
  video.volume = Number(cfg.intro?.volume ?? 0.65);
  video.loop = cfg.intro?.loopAsBacksound ?? true;

  const duration = Number(cfg.intro?.duration ?? 6500);

  window.clearTimeout(window.__introVideoTimer);
  window.__introVideoTimer = window.setTimeout(finishIntroVideo, duration);

  showVideoAudioButton();

  return video.play()
    .then(() => {
      overlay?.classList.add("intro-video-playing");
      updateVideoAudioButton();
      return true;
    })
    .catch((err) => {
      console.warn("Intro video belum bisa autoplay. Coba putar ulang muted.", err);

      // Fallback hanya untuk menjaga visual tetap berjalan.
      // Kalau ini terjadi, tombol bisa dipakai untuk toggle manual.
      video.muted = true;
      return video.play()
        .then(() => {
          overlay?.classList.add("intro-video-playing");
          updateVideoAudioButton();
          return true;
        })
        .catch((err2) => {
          console.warn("Intro video tetap gagal diputar:", err2);
          updateVideoAudioButton();
          return false;
        });
    });
}

function finishIntroVideo(options = {}) {
  if (introVideoFinished) return;
  introVideoFinished = true;

  const cfg = getVideoConfig();
  const overlay = $("#introVideoOverlay");
  const smooth = cfg.intro?.smoothTransition || {};
  const mobileSmooth = isMobile() ? (smooth.mobile || {}) : {};
  const fade = Number(
    options.skipped
      ? (mobileSmooth.skipFadeOutDuration ?? smooth.skipFadeOutDuration ?? 700)
      : (mobileSmooth.fadeOutDuration ?? cfg.intro?.fadeOutDuration ?? 1200)
  );

  if (overlay) {
    overlay.style.setProperty("--intro-video-fade-duration", `${fade}ms`);
    overlay.classList.remove("intro-video-show");
    overlay.classList.add("intro-video-fading-out", "intro-video-crossfade-to-hero");

    window.setTimeout(() => {
      // Video tetap hidup untuk menjaga audio backsound tidak putus.
      overlay.classList.remove("intro-video-fading-out", "intro-video-crossfade-to-hero");
      overlay.classList.add("intro-video-audio-only");
      overlay.style.pointerEvents = "none";
      document.body.classList.add("video-overlay-cleared");
      document.body.classList.remove("opening-invitation", "no-scroll");
      document.documentElement.classList.remove("opening-invitation", "no-scroll");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, fade);
  }

  window.dispatchEvent(new CustomEvent(options.skipped ? "introVideoSkipped" : "introVideoFadingOut", {
    detail: { fadeDuration: fade }
  }));

  if (!cfg.intro?.keepPlayingAsBacksound && introVideoElement) {
    introVideoElement.pause();
  }

  updateVideoAudioButton();
}

function showVideoAudioButton() {
  const cfg = getVideoConfig();
  const btn = $("#videoAudioToggle");
  if (!btn || !cfg.intro?.audioButton?.enabled) return;

  btn.classList.remove("video-audio-hidden");
  const delay = Number(cfg.intro.audioButton.showDelayAfterOpen ?? 420);

  setTimeout(() => {
    btn.classList.add("video-audio-show");
    updateVideoAudioButton();
  }, delay);

  if (!btn.dataset.bound) {
    btn.dataset.bound = "true";
    btn.addEventListener("click", toggleVideoBacksound);
  }
}

function hideVideoAudioButton() {
  const btn = $("#videoAudioToggle");
  if (!btn) return;
  btn.classList.remove("video-audio-show");
  btn.classList.add("video-audio-hidden");
}

function updateVideoAudioButton() {
  const cfg = getVideoConfig();
  const btn = $("#videoAudioToggle");
  if (!btn || !introVideoElement) return;

  const isPlaying = !introVideoElement.paused && !introVideoElement.muted;
  btn.classList.toggle("is-playing", isPlaying);
  btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  btn.textContent = isPlaying
    ? (cfg.intro?.audioButton?.pauseText || "❚❚")
    : (cfg.intro?.audioButton?.playText || "▶");
  btn.setAttribute("aria-label", isPlaying ? "Pause backsound" : "Play backsound");
}

function toggleVideoBacksound() {
  if (!introVideoElement) return;

  if (introVideoElement.paused || introVideoElement.muted) {
    introVideoElement.muted = false;
    introVideoElement.play()
      .then(updateVideoAudioButton)
      .catch((err) => {
        console.warn("Backsound video gagal diputar manual:", err);
        updateVideoAudioButton();
      });
  } else {
    // Pause dipakai agar backsound benar-benar mati.
    introVideoElement.pause();
    updateVideoAudioButton();
  }
}

function startInvitationVideo() {
  const cfg = getVideoConfig();
  if (cfg.mode === "intro-video") return startIntroVideo();

  const video = initVideoBackground();
  if (!video || !isVideoEnabled()) return Promise.resolve(false);

  video.muted = cfg.muted !== false;
  video.playsInline = true;
  video.setAttribute("playsinline", "");

  return video.play()
    .then(() => true)
    .catch((err) => {
      console.warn("Video belum bisa autoplay, tapi poster/fallback tetap tampil.", err);
      return false;
    });
}
