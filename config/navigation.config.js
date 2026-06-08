/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- showOnlyAfterInvitationOpened: true/false
- showDelayAfterOpen: angka milidetik
- items: daftar menu navigasi
- item.enabled: true/false
- item.label: teks menu
- item.target: id section tujuan
*/

const NAVIGATION_CONFIG = {
  enabled: true,

  // Nav hanya muncul setelah tombol "Buka Undangan" diklik.
  showOnlyAfterInvitationOpened: true,

  // Delay animasi kemunculan nav setelah cover hilang.
  showDelayAfterOpen: 220,

  position: "bottom",
  style: "glass",

  items: [
    { enabled: true, id: "hero", label: "Home", icon: "⌂" },
    { enabled: true, id: "event", label: "Acara", icon: "♡" },
    { enabled: true, id: "location", label: "Lokasi", icon: "⌖" },
    { enabled: true, id: "gallery", label: "Galeri", icon: "▧" },
    { enabled: true, id: "rsvp", label: "RSVP", icon: "✓" },
    { enabled: true, id: "wishes", label: "Doa", icon: "✦" }
  ]
};
