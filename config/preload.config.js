/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- waitBeforeOpen: true/false
- waitUntilProgress: 1 untuk 100%, 0.85 untuk 85%
- timeout: batas tunggu dalam milidetik
- showProgressOnButton: true/false
- disableButtonUntilReady: true/false
- assets.cover/heroImages/gallery/video/audio: true/false
- videoPreload: "metadata" | "auto"
*/

const PRELOAD_CONFIG = {
  enabled: true,

  // Jika true, tombol "Buka Undangan" akan menunggu asset penting selesai dimuat.
  waitBeforeOpen: true,

  // Minimal persen asset yang harus selesai sebelum tombol dibuka.
  // 1 = 100%, 0.7 = 70%.
  waitUntilProgress: 1,

  // Batas tunggu maksimal agar tidak terlalu lama jika koneksi lambat.
  timeout: 30000,

  // Tampilkan progress loading di tombol cover.
  showProgressOnButton: true,

  // Tombol "Buka Undangan" benar-benar disable sampai asset siap.
  disableButtonUntilReady: true,

  // Jenis asset yang dipreload.
  assets: {
    cover: true,
    heroImages: true,
    gallery: true,
    video: true,
    audio: false
  },

  // Video preload:
  // "metadata" = lebih ringan, hanya info video
  // "auto" = mencoba load lebih banyak data video
  videoPreload: "auto",

  buttonText: {
    loading: "Menyiapkan Undangan",
    ready: "Buka Undangan",
    opening: "Membuka..."
  }
};
