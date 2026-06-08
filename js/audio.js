let weddingAudio = null;
let audioSources = [];

function initAudio() {
  const btn = $("#audioToggle");

  if (!safeEnabled(window.AUDIO_CONFIG, false)) {
    btn?.classList.add("audio-hidden");
    btn?.classList.remove("audio-show");
    return;
  }

  audioSources = Array.isArray(AUDIO_CONFIG.sources) && AUDIO_CONFIG.sources.length
    ? AUDIO_CONFIG.sources
    : [AUDIO_CONFIG.file];

  audioSources = [...new Set(audioSources.filter(Boolean))];

  weddingAudio = $("#weddingAudioElement") || document.createElement("audio");
  weddingAudio.id = "weddingAudioElement";
  weddingAudio.preload = "auto";
  weddingAudio.loop = !!AUDIO_CONFIG.loop;
  weddingAudio.volume = Number(AUDIO_CONFIG.volume ?? 0.55);
  weddingAudio.src = audioSources[0] || AUDIO_CONFIG.file;

  if (!weddingAudio.parentElement) {
    document.body.appendChild(weddingAudio);
  }

  weddingAudio.addEventListener("play", () => updateAudioButton(true));
  weddingAudio.addEventListener("pause", () => updateAudioButton(false));
  weddingAudio.addEventListener("error", () => {
    console.warn("Audio gagal dimuat. Periksa file:", weddingAudio.src);
    updateAudioButton(false);
    btn?.classList.add("audio-error");
  });

  if (AUDIO_CONFIG.button?.enabled && btn) {
    btn.classList.remove("hidden", "audio-show");
    btn.classList.add("audio-hidden");
    btn.classList.remove("audio-top-right", "audio-top-left", "audio-bottom-right", "audio-bottom-left");
    btn.classList.add(`audio-${AUDIO_CONFIG.button.position || "top-right"}`);
    btn.title = AUDIO_CONFIG.title || "Wedding Music";
    btn.textContent = "♫";
    btn.addEventListener("click", toggleAudio);
  }
}

function showAudioButton() {
  const btn = $("#audioToggle");
  if (!btn || !safeEnabled(window.AUDIO_CONFIG, false) || !AUDIO_CONFIG.button?.enabled) return;

  btn.classList.remove("hidden", "audio-hidden");
  // Delay kecil supaya browser menghitung state awal dulu, animasi jadi jalan.
  requestAnimationFrame(() => {
    btn.classList.add("audio-show");
  });
}

function hideAudioButton() {
  const btn = $("#audioToggle");
  if (!btn) return;
  btn.classList.remove("audio-show");
  btn.classList.add("audio-hidden");
}

function startInvitationAudio() {
  showAudioButton();

  if (!weddingAudio || !safeEnabled(window.AUDIO_CONFIG, false)) return Promise.resolve(false);
  if (!AUDIO_CONFIG.autoplayAfterOpen) return Promise.resolve(false);

  weddingAudio.muted = false;
  weddingAudio.volume = Number(AUDIO_CONFIG.volume ?? 0.55);

  return weddingAudio.play()
    .then(() => {
      updateAudioButton(true);
      return true;
    })
    .catch((err) => {
      console.warn("Audio belum bisa autoplay. Klik tombol audio manual.", err);
      updateAudioButton(false);
      return false;
    });
}

function playAudioAfterOpen() {
  return startInvitationAudio();
}

function updateAudioButton(isPlaying) {
  const btn = $("#audioToggle");
  if (!btn) return;

  btn.classList.toggle("is-playing", !!isPlaying);
  btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  btn.textContent = isPlaying ? "♪" : "♫";
}

function toggleAudio() {
  if (!weddingAudio) {
    initAudio();
  }

  if (!weddingAudio) return;

  if (weddingAudio.paused) {
    weddingAudio.play()
      .then(() => updateAudioButton(true))
      .catch((err) => {
        console.warn("Audio gagal diputar manual:", err);
        updateAudioButton(false);
      });
  } else {
    weddingAudio.pause();
    updateAudioButton(false);
  }
}
