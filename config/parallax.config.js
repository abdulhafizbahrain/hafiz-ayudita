/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false untuk mengaktifkan atau menonaktifkan fitur.
- Ubah nilai teks, angka, warna, path file, dan pilihan mode sesuai kebutuhan.
- Komentar ini hanya panduan; pengaturan aktif tetap mengikuti nilai di bawah.
*/

const PARALLAX_CONFIG = {
  enabled: true,

  libraries: {
    simpleParallax: true,
    gsapScrollTrigger: true
  },

  mobile: {
    enabled: true,
    strength: 0.12
  },

  desktop: {
    enabled: true,
    strength: 0.04
  },

  effects: {
    background: true,
    ornaments: true,
    mainPhoto: true,
    gallery: true,
    mouseMove: false
  }
};
