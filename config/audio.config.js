/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- autoplayAfterOpen: true/false
- loop: true/false
- volume: angka 0 sampai 1
- button.enabled: true/false
- button.position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
*/

const AUDIO_CONFIG = {
  // Audio terpisah dimatikan.
  // Backsound memakai audio dari video intro.
  enabled: false,

  file: "assets/audio/music.mp3",
  sources: ["assets/audio/music.mp3"],

  title: "Wedding Music",
  autoplayAfterOpen: false,
  loop: true,
  volume: 0.55,

  button: {
    enabled: false,
    position: "top-right",
    showDelayAfterOpen: 260,
    showWhenDisabled: false
  }
};
