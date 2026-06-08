/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false untuk mengaktifkan atau menonaktifkan fitur.
- Ubah nilai teks, angka, warna, path file, dan pilihan mode sesuai kebutuhan.
- Komentar ini hanya panduan; pengaturan aktif tetap mengikuti nilai di bawah.
*/

const GIFT_CONFIG = {
  enabled: false,

  title: "Amplop Digital",
  description: "Doa restu Anda merupakan hadiah terindah bagi kami.",

  accounts: [
    {
      enabled: false,
      bank: "",
      number: "",
      owner: ""
    },
    {
      enabled: false,
      bank: "",
      number: "",
      owner: ""
    }
  ],

  qris: {
    enabled: false,
    image: "assets/images/qris.jpg"
  },

  copyButton: {
    enabled: true,
    text: "Salin Nomor"
  }
};
