/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- mode: "intro-video" | "background-video"
- intro.duration/fadeInDuration/fadeOutDuration
- intro.keepPlayingAsBacksound: true/false
- intro.showSkipButton: true/false
- intro.smoothTransition.mobile.fadeInDuration/fadeOutDuration/heroEnterDuration
- intro.videoFit.desktopObjectFit/objectPosition untuk video portrait di desktop
- muted/loop/controls/playsInline: true/false
- source.mobile/source.desktop: path video
*/

const VIDEO_CONFIG = {
  enabled: true,

  // Video intro muncul setelah tombol "Buka Undangan" ditekan.
  // Setelah beberapa detik, visual video hilang dan Hero tampil.
  // Audio dari video tetap jalan sebagai backsound.
  mode: "intro-video",

  intro: {
    enabled: true,

    // Lama video tampil sebelum fade out.
    duration: 48000,

    // Transisi cover ke video.
    fadeInDuration: 1000,

    // Durasi transisi video menghilang ke Hero.
    fadeOutDuration: 850,

    keepPlayingAsBacksound: true,
    loopAsBacksound: true,

    // Jangan muted supaya audio video menjadi backsound.
    muted: false,
    volume: 0.65,

    showSkipButton: true,

    // Untuk iPhone/Safari, suara video sering diblokir.
    // Jangan tampilkan teks panjang di atas video; cukup tombol kecil jika perlu.
    unmuteHint: {
      enabled: false,
      text: "Aktifkan Suara",
    },
    skipButtonText: "Lewati",

    // Pengaturan tampilan video intro.
    // Karena video portrait, desktop tetap dibuat cover dan mengambil bagian tengah video.
    videoFit: {
      enabled: true,
      desktopObjectFit: "cover",
      desktopObjectPosition: "center center",
      mobileObjectFit: "cover",
      mobileObjectPosition: "center center",
    },

    smoothTransition: {
      enabled: true,
      startDelay: 120,
      heroPrepareBeforeFadeEnd: 0,
      skipFadeOutDuration: 650,
      navDelayAfterHero: 420,
      heroEnterDuration: 650,

      mobile: {
        fadeInDuration: 1100,
        fadeOutDuration: 950,
        heroEnterDuration: 700,
        heroPrepareBeforeFadeEnd: 0,
        skipFadeOutDuration: 720,
      },
    },

    audioButton: {
      enabled: true,

      // Tombol pause/play backsound muncul setelah Buka Undangan.
      position: "top-right",
      showDelayAfterOpen: 420,

      // Teks tombol
      pauseText: "❚❚",
      playText: "▶",
    },
  },

  // Background video hero lama dimatikan karena memakai intro video.
  useAsBackground: false,

  autoplay: true,
  muted: false,
  loop: true,
  controls: false,
  playsInline: true,

  source: {
    mobile: "assets/video/video.mp4",
    desktop: "assets/video/video.mp4",

    mobileSources: [
      "assets/video/video.mp4",
      "assets/video/background-mobile.mp4",
      "assets/video/background.mp4",
    ],

    desktopSources: [
      "assets/video/video.mp4",
      "assets/video/background-desktop.mp4",
      "assets/video/background.mp4",
    ],

    fallbackImage: "assets/images/background-mobile.jpeg",
  },
};
