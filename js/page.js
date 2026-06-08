function getPageConfig() {
  if (typeof PAGE_CONFIG !== "undefined") return PAGE_CONFIG;
  return window.PAGE_CONFIG || {};
}

function setOrCreateMeta(name, content, attr = "name") {
  if (!content) return;

  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}

function setOrCreateLink(rel, href) {
  if (!href) return;

  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }

  el.setAttribute("href", href);
}

function applyPageConfig() {
  const cfg = getPageConfig();
  if (!cfg || cfg.enabled === false) return;

  if (cfg.title) {
    document.title = cfg.title;
  }

  setOrCreateMeta("description", cfg.description || "");

  if (cfg.title) {
    setOrCreateMeta("og:title", cfg.title, "property");
    setOrCreateMeta("twitter:title", cfg.title);
  }

  if (cfg.description) {
    setOrCreateMeta("og:description", cfg.description, "property");
    setOrCreateMeta("twitter:description", cfg.description);
  }

  if (cfg.logo?.enabled !== false) {
    if (cfg.logo?.favicon) {
      setOrCreateLink("icon", cfg.logo.favicon);
      setOrCreateMeta("og:image", cfg.logo.favicon, "property");
      setOrCreateMeta("twitter:image", cfg.logo.favicon);
    }

    if (cfg.logo?.appleTouchIcon) {
      setOrCreateLink("apple-touch-icon", cfg.logo.appleTouchIcon);
    }
  }
}
