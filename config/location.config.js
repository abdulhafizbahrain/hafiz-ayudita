/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- venueName: nama lokasi
- address: alamat lengkap
- mapsUrl: link Google Maps
- embedMapUrl: URL src iframe Google Maps
- buttons.openMaps.enabled: true/false
- buttons.embeddedMap.enabled: true/false
*/

const LOCATION_CONFIG = {
  enabled: true,

  venueName: "Lokasi Acara",
  address: "Masjid Al-Baitil Mabrur Ruket, Semparu",
  mapsUrl: "https://maps.app.goo.gl/oGhyVhrudGG7YhWAA",

  // Gunakan URL src iframe saja, bukan tag iframe lengkap.
  embedMapUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d417.54745012538353!2d116.34335193837761!3d-8.660688708501906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sid!4v1780833417950!5m2!1sen!2sid",

  buttons: {
    openMaps: {
      enabled: true,
      text: "Buka Google Maps",
    },
    embeddedMap: {
      enabled: true,
    },
  },
};
