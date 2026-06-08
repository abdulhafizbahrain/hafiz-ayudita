/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false untuk mengaktifkan atau menonaktifkan fitur.
- Ubah nilai teks, angka, warna, path file, dan pilihan mode sesuai kebutuhan.
- Komentar ini hanya panduan; pengaturan aktif tetap mengikuti nilai di bawah.
- guest.urlParameter: parameter nama utama, default "to"
- guest.groupUrlParameter: parameter nama grup/instansi, default "togroup"
- guest.showGroupOnCover: true/false untuk menampilkan grup pada cover
*/

const MAIN_CONFIG = {
  enabled: true,

  invitation: {
    type: "akad_resepsi",
    title: "Undangan Pernikahan",
    subtitle: "Akad Nikah & Resepsi",
    shortTitle: "Wedding Invitation",
    language: "id",
    hashtag: "#HafizAyuWedding"
  },

  cover: {
    enabled: true,
    title: "Undangan Pernikahan",
    smallText: "Akad Nikah & Resepsi",
    openButtonText: "Buka Undangan",
    hideDelay: 650
  },

  guest: {
    enabled: true,
    urlParameter: "to",
    spaceReplacement: "_",
    lineBreakReplacement: "|",
    greetingText: "Kepada Yth.",
    defaultName: "Bapak/Ibu/Saudara/i"
  },

  text: {
    opening:
      "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan akad nikah dan resepsi pernikahan kami.",
    closing:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
    thankYou:
      "Atas kehadiran dan doa restunya, kami ucapkan terima kasih."
  }
};
