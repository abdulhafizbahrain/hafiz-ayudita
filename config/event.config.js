/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- timezone: contoh "Asia/Makassar"
- timezoneText: contoh "WITA / GMT+8"
- mainDate.raw: format YYYY-MM-DD
- akad.enabled dan reception.enabled: true/false
- akad/reception.title, time, displayTime
- countdown.enabled: true/false
- countdown.targetDateTime: format ISO, contoh "2026-06-11T09:00:00+08:00"
*/

const EVENT_CONFIG = {
  enabled: true,

  timezone: "Asia/Makassar",
  timezoneText: "WITA / GMT+8",

  mainDate: {
    raw: "2026-06-11",
    dayName: "Kamis",
    displayDate: "Kamis, 11 Juni 2026"
  },

  akad: {
    enabled: true,
    title: "Akad Nikah",
    time: "09:00 WITA",
    displayTime: "09:00 WITA"
  },

  reception: {
    enabled: true,
    title: "Resepsi",
    time: "10:00 WITA",
    displayTime: "10:00 WITA - Selesai"
  },

  countdown: {
    enabled: true,
    targetDateTime: "2026-06-11T09:00:00+08:00",
    expiredText: "Acara telah berlangsung"
  }
};
