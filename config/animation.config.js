/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false untuk mengaktifkan atau menonaktifkan fitur.
- Ubah nilai teks, angka, warna, path file, dan pilihan mode sesuai kebutuhan.
- Komentar ini hanya panduan; pengaturan aktif tetap mengikuti nilai di bawah.
*/

const ANIMATION_CONFIG = {
  enabled: true,

  libraries: {
    aos: true,
    gsap: true,
    lenisSmoothScroll: true
  },

  effects: {
    default: "fade-up",
    hero: "zoom-in",
    card: "fade-up",
    image: "zoom-in",
    sectionOnNav: "zoom-out"
  },

  duration: 900,
  delay: 120,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  once: false
};
