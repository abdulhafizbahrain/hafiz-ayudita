/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- groom/bride.shortName: nama panggilan
- groom/bride.displayName: nama tampil
- groom/bride.fullName: nama lengkap
- groom/bride.fatherName dan motherName
- groom/bride.photo.enabled: true/false
- groom/bride.photo.src: path foto
- groom/bride.photo.shape: "rounded" | "circle" | "soft-square"
- separator: "&" | "dan" | "+"
*/

const COUPLE_CONFIG = {
  enabled: true,

  groom: {
    shortName: "Hafiz",
    displayName: "ABDUL HAFIZ BAHRAIN",
    fullName: "ABDUL HAFIZ BAHRAIN, S.Kom",
    fatherName: "ABU ABDUL AZIZ JALALIN",
    motherName: "NURILAM",
    childLabel: "Putra dari",

    // Foto pada card mempelai.
    // enabled: true/false
    // shape: "rounded" | "circle" | "soft-square"
    photo: {
      enabled: true,
      src: "assets/images/couple/hafiz-4x6.jpg",
      alt: "Foto Hafiz",
      shape: "rounded",
    },
  },

  bride: {
    shortName: "Ayudita",
    displayName: "JULIYANTIKA AYUDITA PUTRI",
    fullName: "JULIYANTIKA AYUDITA PUTRI, S.Kom",
    fatherName: "SUMEKAR",
    motherName: "NURHASIMIN MARHAYATUN",
    childLabel: "Putri dari",

    // Foto pada card mempelai.
    // enabled: true/false
    // shape: "rounded" | "circle" | "soft-square"
    photo: {
      enabled: true,
      src: "assets/images/couple/ayu-4x6.jpg",
      alt: "Foto Ayudita",
      shape: "rounded",
    },
  },

  separator: "&",
};
