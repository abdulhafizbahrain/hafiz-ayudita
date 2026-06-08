/*
OPSI PENGATURAN SIAP PAKAI:
- enabled: true/false
- fonts.heading/script/body
- borderRadius: ukuran sudut card
- shadow: bayangan card
- animation.enabled: true/false
- animation.duration/delay
*/

const THEME_CONFIG = {
  enabled: true,

  name: "Soft Butter Wedding",
  mode: "light",

  layout: {
    mobileFirst: true,
    desktopMaxWidth: "820px",
    sectionPadding: "72px 20px",
    cardRadius: "28px"
  },

  fonts: {
    heading: "'Playfair Display', serif",
    script: "'Great Vibes', cursive",
    body: "'Inter', sans-serif"
  },

  style: {
    glassmorphism: true,
    softShadow: true,
    floatingOrnaments: true,
    roundedCards: true
  }
};
