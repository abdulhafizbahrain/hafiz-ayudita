/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- title dan description
- fields.name/status/guestCount/note.enabled: true/false
- fields.*.required: true/false
- status.options: daftar pilihan status
- pagination.enabled: true/false
- pagination.perPage: jumlah item per halaman
- submit.saveToGoogleSheet/showOnPage/preventDoubleSubmit: true/false
*/

const RSVP_CONFIG = {
  enabled: true,

  title: "Konfirmasi Kehadiran",
  description: "Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i.",

  fields: {
    name: { enabled: true, required: true, label: "Nama" },
    status: {
      enabled: true,
      required: true,
      label: "Konfirmasi",
      options: ["Hadir", "Tidak Hadir", "Masih Ragu"]
    },
    guestCount: { enabled: true, required: false, label: "Jumlah Tamu", defaultValue: 1 },
    note: { enabled: true, required: false, label: "Catatan" }
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
    showOnPage: true,
    showPosition: "bottom",
    showImmediatelyAfterSubmit: true,
    preventEmptySubmit: true,
    preventDoubleSubmit: true,
    successMessage: "Terima kasih, konfirmasi kehadiran Anda telah kami terima.",
    errorMessage: "Maaf, konfirmasi belum berhasil dikirim. Silakan coba lagi."
  }
};
