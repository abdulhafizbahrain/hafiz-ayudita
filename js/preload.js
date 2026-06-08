let invitationPreloadPromise = null;
let invitationPreloadState = {
  total: 0,
  loaded: 0,
  failed: 0,
  progress: 0,
  ready: false
};

function getPreloadConfig() {
  if (typeof PRELOAD_CONFIG !== "undefined") return PRELOAD_CONFIG;
  return window.PRELOAD_CONFIG || {};
}

function getMediaConfig() {
  if (typeof MEDIA_CONFIG !== "undefined") return MEDIA_CONFIG;
  return window.MEDIA_CONFIG || {};
}

function getVideoConfigForPreload() {
  if (typeof VIDEO_CONFIG !== "undefined") return VIDEO_CONFIG;
  return window.VIDEO_CONFIG || {};
}

function preloadImage(src) {
  return new Promise(resolve => {
    if (!src) return resolve(false);

    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function preloadVideo(src) {
  return new Promise(resolve => {
    if (!src) return resolve(false);

    const cfg = getPreloadConfig();
    const video = document.createElement("video");
    video.preload = cfg.videoPreload || "auto";
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.src = src;

    let done = false;
    const finish = (status) => {
      if (done) return;
      done = true;
      resolve(status);
    };

    video.addEventListener("canplaythrough", () => finish(true), { once: true });
    video.addEventListener("loadeddata", () => finish(true), { once: true });
    video.addEventListener("error", () => finish(false), { once: true });

    // Jangan tunggu video terlalu lama. Browser sering hanya load sebagian.
    setTimeout(() => finish(video.readyState >= 2), 4500);

    video.load();
  });
}

function collectPreloadAssets() {
  const cfg = getPreloadConfig();
  const media = getMediaConfig();
  const videoCfg = getVideoConfigForPreload();
  const assets = [];

  const add = (type, src) => {
    if (!src) return;
    if (assets.some(item => item.src === src)) return;
    assets.push({ type, src });
  };

  if (cfg.assets?.cover) {
    add("image", media.images?.cover);
  }

  if (cfg.assets?.heroImages) {
    add("image", media.images?.main);
    add("image", media.images?.backgroundMobile);
    add("image", media.images?.backgroundDesktop);
    add("image", media.images?.fallback);
    add("image", videoCfg.source?.fallbackImage);
  }

  if (cfg.assets?.gallery) {
    (media.gallery?.images || []).forEach(src => add("image", src));
  }

  if (cfg.assets?.video) {
    const videoSources = [
      videoCfg.source?.mobile,
      videoCfg.source?.desktop,
      ...(videoCfg.source?.mobileSources || []),
      ...(videoCfg.source?.desktopSources || [])
    ];
    videoSources.forEach(src => add("video", src));
  }

  return assets;
}

function updatePreloadProgressUI() {
  const cfg = getPreloadConfig();
  const btn = $("#openInvitationBtn");
  if (!btn) return;

  const progress = Math.round(invitationPreloadState.progress * 100);
  const ready = invitationPreloadState.ready;

  if (cfg.disableButtonUntilReady) {
    btn.disabled = !ready;
  }

  if (!cfg.showProgressOnButton) return;

  if (ready) {
    btn.textContent = cfg.buttonText?.ready || "Buka Undangan";
    btn.classList.add("preload-ready");
    btn.classList.remove("preload-loading");
  } else {
    btn.textContent = `${cfg.buttonText?.loading || "Menyiapkan Undangan"} ${progress}%`;
    btn.classList.add("preload-loading");
    btn.classList.remove("preload-ready");
  }
}

function startInvitationPreload() {
  const cfg = getPreloadConfig();

  if (!cfg.enabled) {
    invitationPreloadState.ready = true;
    return Promise.resolve(invitationPreloadState);
  }

  if (invitationPreloadPromise) return invitationPreloadPromise;

  const assets = collectPreloadAssets();
  invitationPreloadState.total = assets.length;
  invitationPreloadState.loaded = 0;
  invitationPreloadState.failed = 0;
  invitationPreloadState.progress = assets.length ? 0 : 1;
  invitationPreloadState.ready = false;

  updatePreloadProgressUI();

  const loadOne = async (asset) => {
    const ok = asset.type === "video"
      ? await preloadVideo(asset.src)
      : await preloadImage(asset.src);

    if (ok) invitationPreloadState.loaded += 1;
    else invitationPreloadState.failed += 1;

    invitationPreloadState.progress =
      (invitationPreloadState.loaded + invitationPreloadState.failed) /
      Math.max(1, invitationPreloadState.total);

    updatePreloadProgressUI();

    return ok;
  };

  const preloadWork = Promise.allSettled(assets.map(loadOne)).then(() => {
    invitationPreloadState.progress = 1;
    invitationPreloadState.ready = true;
    updatePreloadProgressUI();
    return invitationPreloadState;
  });

  const timeout = new Promise(resolve => {
    setTimeout(() => {
      // Jika disableButtonUntilReady aktif, jangan anggap ready sebelum semua asset selesai.
      if (!cfg.disableButtonUntilReady) {
        invitationPreloadState.ready = invitationPreloadState.progress >= (cfg.waitUntilProgress ?? 0.85);
        updatePreloadProgressUI();
        resolve(invitationPreloadState);
      }
    }, Number(cfg.timeout ?? 30000));
  });

  invitationPreloadPromise = (cfg.disableButtonUntilReady ? preloadWork : Promise.race([preloadWork, timeout])).then(state => {
    state.ready = true;
    updatePreloadProgressUI();
    return state;
  });

  return invitationPreloadPromise;
}

async function waitInvitationPreloadBeforeOpen() {
  const cfg = getPreloadConfig();
  if (!cfg.enabled || !cfg.waitBeforeOpen) return true;

  const btn = $("#openInvitationBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = cfg.buttonText?.opening || "Membuka...";
  }

  await startInvitationPreload();

  if (btn) {
    btn.disabled = false;
    btn.textContent = cfg.buttonText?.ready || "Buka Undangan";
  }

  return true;
}
