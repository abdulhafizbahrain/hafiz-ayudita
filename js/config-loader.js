function applyColorConfig() {
  if (!safeEnabled(window.COLOR_CONFIG, true)) return;
  const c = COLOR_CONFIG.colors || {};
  const root = document.documentElement;

  const map = {
    primary: "--color-primary",
    primarySoft: "--color-primary-soft",
    primaryDeep: "--color-primary-deep",
    secondary: "--color-secondary",
    accent: "--color-accent",
    background: "--color-background",
    backgroundSoft: "--color-background-soft",
    textPrimary: "--color-text-primary",
    textSecondary: "--color-text-secondary",
    cardBackground: "--color-card",
    cardBackgroundStrong: "--color-card-strong",
    border: "--color-border",
    buttonBackground: "--color-button",
    buttonText: "--color-button-text",
    glow: "--color-glow",
    overlay: "--color-overlay",
    success: "--color-success",
    error: "--color-error",
    inputBackground: "--color-input"
  };

  Object.entries(map).forEach(([key, cssVar]) => {
    if (c[key]) root.style.setProperty(cssVar, c[key]);
  });
}

function applyThemeConfig() {
  if (!safeEnabled(window.THEME_CONFIG, true)) return;
  const root = document.documentElement;
  const fonts = THEME_CONFIG.fonts || {};
  if (fonts.heading) root.style.setProperty("--font-heading", fonts.heading);
  if (fonts.script) root.style.setProperty("--font-script", fonts.script);
  if (fonts.body) root.style.setProperty("--font-body", fonts.body);

  const layout = THEME_CONFIG.layout || {};
  if (layout.cardRadius) root.style.setProperty("--radius-card", layout.cardRadius);
}


function applyBackdropConfig() {
  if (!safeEnabled(window.BACKDROP_CONFIG, false)) return;

  const root = document.documentElement;
  const setGroup = (name, cfg) => {
    if (!cfg || cfg.enabled === false) return;
    root.style.setProperty(`--backdrop-${name}-blur`, cfg.blur || "18px");
    root.style.setProperty(`--backdrop-${name}-opacity`, String(cfg.opacity ?? 0.74));
    root.style.setProperty(`--backdrop-${name}-border-opacity`, String(cfg.borderOpacity ?? 0.28));
    root.style.setProperty(`--backdrop-${name}-shadow`, String(cfg.shadowIntensity ?? 0.16));
    if (cfg.tint) {
      root.style.setProperty(`--backdrop-${name}-tint`, cfg.tint);
    }
  };

  setGroup("cover-card", BACKDROP_CONFIG.coverCard);
  setGroup("nav", BACKDROP_CONFIG.navigation);

  const navButton = BACKDROP_CONFIG.navigation?.button || {};
  if (navButton.enabled !== false) {
    root.style.setProperty("--backdrop-nav-button-blur", navButton.blur || "18px");
    root.style.setProperty("--backdrop-nav-button-opacity", String(navButton.opacity ?? 0.24));
    root.style.setProperty("--backdrop-nav-button-active-opacity", String(navButton.activeOpacity ?? 0.42));
    root.style.setProperty("--backdrop-nav-button-border-opacity", String(navButton.borderOpacity ?? 0.22));
  }

  setGroup("card", BACKDROP_CONFIG.card);
  setGroup("form", BACKDROP_CONFIG.form);
  setGroup("cover", BACKDROP_CONFIG.cover);
}
