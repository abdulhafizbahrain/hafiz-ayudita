/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- applyTo.cover/hero/sectionTitles/closing: true/false
- heroSignature.enabled: true/false
- heroSignature.useCoupleConfig: true/false
- sectionTitle.mode: "text-and-line" | "line-only" | "text-only"
- closingSignature.text: teks closing signature
- style.strokeColor/fillColor/strokeWidth/glow/glowIntensity
*/

const SIGNATURE_CONFIG = {
  enabled: true,

  applyTo: {
    cover: true,
    hero: true,
    sectionTitles: true,
    closing: true,
  },

  heroSignature: {
    enabled: true,
    replaceHeroNames: true,

    // Otomatis mengambil dari config/couple.config.js
    useCoupleConfig: true,
    text: "",

    position: "replace-names",
    width: 340,
    height: 100,
    duration: 5600,
    delay: 250,
    loop: false,
  },

  sectionTitle: {
    enabled: true,

    // Pilihan:
    // "underline-only"  : hanya garis love di bawah judul
    // "text-only"       : teks judul menjadi signature animation
    // "text-and-line"   : teks judul + garis love
    mode: "text-and-line",

    position: "below-title",
    style: "love-underline",
    repeatOnScroll: true,

    textWidth: 310,
    textHeight: 58,
    textDuration: 6000,
    textDelay: 80,

    lineWidth: 132,
    lineHeight: 34,
    lineDuration: 3000,
    lineDelay: 320,
  },

  closingSignature: {
    enabled: true,

    // false = gunakan teks custom di bawah ini
    // true  = otomatis gunakan nama panggilan mempelai dari couple.config.js
    useCoupleConfig: false,

    text: "Sakinah Mawaddah Warahmah",
    width: 340,
    height: 68,
    duration: 6000,
    delay: 200,
  },

  style: {
    // Pilihan:
    // "use-theme-accent"
    // "use-border-color"
    // atau isi warna langsung, contoh "#D8A928"
    strokeColor: "#D8A928",
    fillColor: "#D8A928",

    strokeWidth: 2.8,
    fillOpacity: 1,

    glow: true,
    glowIntensity: 0.45,
    opacity: 1,
  },
};
