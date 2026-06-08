/*
OPSI PENGATURAN SIAP PAKAI:
- images.cover/main/backgroundMobile/backgroundDesktop
- images.heroBackground.enabled: true/false
- images.heroBackground.imageOpacity/overlayOpacity/gradientOpacity: angka 0 sampai 1
- images.heroBackground.backdropBlur.enabled: true/false
- images.heroBackground.backdropBlur.blur: contoh "0px", "3px", "6px"
- gallery.enabled: true/false
- gallery.mode: "swiper" | "grid" | "masonry" | "carousel" | "coverflow" | "stack" | "polaroid"
- gallery.preview: true/false
- ornaments.enabled: true/false
- ornaments.flower1/flower2: ganti file ornament
- Rekomendasi tema cinta: heart, double-heart, sparkle-love
*/

const MEDIA_CONFIG = {
  enabled: true,

  images: {
    enabled: true,
    cover: "assets/images/cover.jpeg",
    main: "assets/images/bride-groom.jpeg",
    backgroundMobile: "assets/images/background-mobile.jpeg",
    backgroundDesktop: "assets/images/background-desktop.jpeg",
    fallback: "assets/images/background-mobile.jpeg",

    // Pengaturan background foto pada bagian Hero.
    // imageOpacity: semakin besar semakin jelas foto.
    // overlayOpacity: semakin kecil semakin jelas foto.
    heroBackground: {
      enabled: true,
      imageOpacity: 1,
      overlayOpacity: 0.28,
      gradientOpacity: 0.42,

      // Blur background Hero.
      // enabled: true/false
      // blur: "0px" = tanpa blur, "3px" lembut, "6px" lebih blur.
      // scale digunakan agar blur tidak membuat pinggir foto terlihat kosong.
      backdropBlur: {
        enabled: true,
        blur: "2px",
        scale: 1.018,
        brightness: 1.08,
        saturation: 1.06,
        contrast: 1.02,
      },
    },
  },

  gallery: {
    enabled: true,
    /*
      MODE GALLERY YANG BISA DIGUNAKAN:

      "swiper"    = slider geser kanan/kiri, paling aman untuk mobile
      "grid"      = semua foto tampil dalam grid
      "masonry"   = layout seperti Pinterest
      "carousel"  = slider dengan beberapa foto terlihat sekaligus
      "coverflow" = slider efek 3D
      "stack"     = foto seperti tumpukan kartu
      "polaroid"  = foto seperti cetakan polaroid
    */
    mode: "coverflow",
    preview: true,
    // Nama file gallery default: gallery_1.jpeg sampai gallery_15.jpeg
    // Simpan semua foto di folder: assets/images/gallery/
    images: [
      // "assets/images/gallery/gallery_1.jpeg",
      // "assets/images/gallery/gallery_2.jpeg",
      "assets/images/gallery/gallery_3.jpeg",
      "assets/images/gallery/gallery_4.jpeg",
      // "assets/images/gallery/gallery_5.jpeg",
      // "assets/images/gallery/gallery_6.jpeg",
      // "assets/images/gallery/gallery_7.jpeg",
      "assets/images/gallery/gallery_8.jpeg",
      "assets/images/gallery/gallery_9.jpeg",
      // "assets/images/gallery/gallery_10.jpeg",
      "assets/images/gallery/gallery_11.jpeg",
      // "assets/images/gallery/gallery_12.jpeg",
      // "assets/images/gallery/gallery_13.jpeg",
      // "assets/images/gallery/gallery_14.jpeg",
      "assets/images/gallery/gallery_15.jpeg",
    ],
  },

  ornaments: {
    enabled: true,
    flower1: "assets/ornaments/love-heart-1.svg",
    flower2: "assets/ornaments/love-heart-2.svg",
    leaf1: "assets/ornaments/leaf-1.svg",
    glow: "assets/ornaments/glow.svg",
  },
};
