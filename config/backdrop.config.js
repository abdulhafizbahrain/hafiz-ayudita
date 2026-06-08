/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- blur: contoh "18px", "26px", "34px"
- opacity: angka 0 sampai 1
- borderOpacity: angka 0 sampai 1
- shadowIntensity: angka 0 sampai 1
- tint: format "255, 255, 255"
- coverCard/navigation/card/button dapat diaktifkan atau dinonaktifkan.
*/

const BACKDROP_CONFIG = {
  coverCard: {
    enabled: true,

    // Card pada halaman "Buka Undangan".
    // Blur besar + opacity kecil agar terasa glass/backdrop.
    blur: "34px",
    opacity: 0.38,
    borderOpacity: 0.34,
    shadowIntensity: 0.18,
    tint: "255, 255, 255",

    // Jika browser tidak mendukung backdrop-filter,
    // fallback ini membuat card tetap terlihat transparan.
    fallbackOpacity: 0.48,
  },
  enabled: true,

  navigation: {
    enabled: true,

    // Efek kaca untuk bottom navigation.
    blur: "32px",

    // Semakin kecil, semakin transparan.
    opacity: 0.48,

    borderOpacity: 0.3,
    shadowIntensity: 0.18,
    tint: "255, 255, 255",

    // Efek kaca untuk tombol/menu di dalam nav.
    button: {
      enabled: true,
      blur: "18px",
      opacity: 0.24,
      activeOpacity: 0.42,
      borderOpacity: 0.22,
    },
  },

  card: {
    enabled: true,
    blur: "18px",
    opacity: 0.74,
    borderOpacity: 0.28,
    shadowIntensity: 0.16,
  },

  form: {
    enabled: true,
    blur: "20px",
    opacity: 0.78,
    borderOpacity: 0.3,
    shadowIntensity: 0.18,
  },

  cover: {
    enabled: true,
    blur: "20px",
    opacity: 0.76,
    borderOpacity: 0.3,
    shadowIntensity: 0.2,
  },
};
