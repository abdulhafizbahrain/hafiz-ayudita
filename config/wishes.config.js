/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- title dan description
- fields.name/message.enabled: true/false
- fields.*.required: true/false
- display.showOnPage/loadFromGoogleSheet/autoRefresh: true/false
- display.maxDisplay: angka atau "semua"
- pagination.enabled: true/false
- pagination.perPage: jumlah item per halaman
- submit.saveToGoogleSheet/preventDoubleSubmit: true/false
*/

const WISHES_CONFIG = {
  enabled: true,

  title: "Ucapan & Doa",
  description: "Berikan ucapan dan doa terbaik untuk kedua mempelai.",

  fields: {
    name: { enabled: true, required: true, label: "Nama" },
    message: { enabled: true, required: true, label: "Ucapan / Doa" }
  },

  display: {
    showOnPage: true,
    showPosition: "bottom",
    showImmediatelyAfterSubmit: true,
    loadFromGoogleSheet: true,
    maxDisplay: "semua",
    order: "newest",
    autoRefresh: false,
    refreshInterval: 15000,
    moderation: false,
    filterBadWords: true
  },

  pagination: {
    enabled: true,
    perPage: 5,
    showInfo: true,
    prevText: "<",
    nextText: ">"
  },

  submit: {
    saveToGoogleSheet: true,
    preventEmptySubmit: true,
    preventDoubleSubmit: true,
    successMessage: "Terima kasih, ucapan dan doa Anda sudah tersimpan.",
    errorMessage: "Maaf, ucapan belum berhasil dikirim. Silakan coba lagi."
  }
};
