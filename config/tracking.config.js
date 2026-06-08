/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- trackPageOpen: true/false
- trackInvitationOpenButton: true/false
- guestNameFromUrl: true/false
- location.enabled: true/false
- location.askAfterOpenButton: true/false
- location.highAccuracy: true/false
*/

const TRACKING_CONFIG = {
  enabled: true,

  // Menyimpan apakah link undangan sudah dibuka.
  trackPageOpen: true,

  // Menyimpan ketika tombol "Buka Undangan" ditekan.
  trackInvitationOpenButton: true,

  // Ambil nama tamu dari dynamic link.
  guestNameFromUrl: true,

  location: {
    enabled: true,

    // Supaya tidak mengganggu cover, izin lokasi diminta setelah tombol Buka Undangan ditekan.
    askAfterOpenButton: true,

    highAccuracy: false,
    timeout: 6000,
    maximumAge: 60000
  },

  fields: {
    timestamp: true,
    guestName: true,
    eventType: true,
    pageUrl: true,
    referrer: true,
    userAgent: true,
    location: true
  }
};
