function initSignatureConfig() {
  applySignatureStyle();
  addSectionTitleSignatures();
  addHeroSignature();
  addClosingSignature();
  observeSignatures();
}

function resolveSignatureColor(value, fallback) {
  const rootStyle = getComputedStyle(document.documentElement);

  if (value === "use-theme-accent") {
    return rootStyle.getPropertyValue("--color-accent").trim();
  }

  if (value === "use-border-color") {
    return rootStyle.getPropertyValue("--color-border").trim();
  }

  return value || fallback;
}

function applySignatureStyle() {
  if (!safeEnabled(window.SIGNATURE_CONFIG, false)) return;

  const root = document.documentElement;
  const style = SIGNATURE_CONFIG.style || {};

  const strokeColor = resolveSignatureColor(style.strokeColor, "var(--color-border)");
  const fillColor = resolveSignatureColor(style.fillColor, strokeColor);

  root.style.setProperty("--signature-stroke", strokeColor);
  root.style.setProperty("--signature-fill", fillColor);
  root.style.setProperty("--signature-stroke-width", `${style.strokeWidth || 2.8}`);
  root.style.setProperty("--signature-fill-opacity", `${style.fillOpacity ?? 0.92}`);
  root.style.setProperty("--signature-opacity", `${style.opacity ?? 0.95}`);
  document.documentElement.dataset.signatureStroke = strokeColor;
  document.documentElement.dataset.signatureFill = fillColor;
  root.style.setProperty(
    "--signature-glow",
    style.glow ? `drop-shadow(0 0 ${Math.round((style.glowIntensity || 0.45) * 18)}px var(--color-glow))` : "none"
  );
}

function signatureUnderlineSVG(width = 132, height = 34, duration = 1600, delay = 120) {
  return `
    <div class="signature-wrap section-signature" style="--signature-width:${width}px;--signature-height:${height}px;--signature-duration:${duration}ms;--signature-delay:${delay}ms;">
      <svg class="signature-svg" viewBox="0 0 132 34" aria-hidden="true">
        <path class="signature-path" pathLength="600" d="M7 22 C22 31, 42 30, 58 20 C64 16, 69 10, 75 12 C82 14, 79 24, 69 25 C56 26, 59 9, 70 8 C85 7, 87 25, 103 23 C114 22, 121 17, 126 13" />
      </svg>
    </div>
  `;
}

function getCoupleSignatureText() {
  const cfg = typeof COUPLE_CONFIG !== "undefined" ? COUPLE_CONFIG : (window.COUPLE_CONFIG || {});
  const groom = cfg.groom?.shortName || "";
  const bride = cfg.bride?.shortName || "";
  const separator = cfg.separator || "&";

  if (groom && bride) return `${groom} ${separator} ${bride}`;
  return groom || bride || "Mempelai";
}

function getSignatureText(cfg, fallback = "") {
  if (cfg?.useCoupleConfig) return getCoupleSignatureText();
  return cfg?.text || fallback || getCoupleSignatureText();
}

function signatureTextSVG(text, width = 240, height = 70, duration = 2400, delay = 200, extraClass = "") {
  const safeText = escapeHTML(text);
  return `
    <div class="signature-wrap hero-signature ${extraClass}" style="--signature-width:${width}px;--signature-height:${height}px;--signature-duration:${duration}ms;--signature-delay:${delay}ms;">
      <svg class="signature-svg" viewBox="0 0 260 100" aria-hidden="true">
        <text class="signature-path signature-stroke-text" x="130" y="38" text-anchor="middle" pathLength="600">${safeText}</text>
        <g class="signature-fill">
          <text class="signature-fill-text" x="130" y="38" text-anchor="middle">${safeText}</text>
        </g>
        <path class="signature-path signature-love-path" pathLength="600" d="M55 78 C83 88, 113 86, 130 74 C137 68, 143 61, 151 64 C160 67, 156 79, 144 80 C129 81, 133 59, 147 59 C165 59, 169 80, 190 77 C206 75, 216 69, 224 62" />
      </svg>
    </div>
  `;
}

function signatureTitleSVG(text, width = 310, height = 58, duration = 2200, delay = 80) {
  const safeText = escapeHTML(text || "");
  return `
    <div class="signature-wrap signature-title-replace" style="--signature-title-width:${width}px;--signature-title-height:${height}px;--signature-width:${width}px;--signature-height:${height}px;--signature-duration:${duration}ms;--signature-delay:${delay}ms;">
      <svg class="signature-title-svg" viewBox="0 0 310 58" aria-hidden="true">
        <text class="signature-path signature-title-path signature-stroke-text" x="155" y="37" text-anchor="middle" pathLength="600">${safeText}</text>
        <g class="signature-title-fill">
          <text class="signature-fill-text" x="155" y="37" text-anchor="middle">${safeText}</text>
        </g>
      </svg>
    </div>
  `;
}

function addSectionTitleSignatures() {
  if (!SIGNATURE_CONFIG.applyTo?.sectionTitles || !SIGNATURE_CONFIG.sectionTitle?.enabled) return;

  const cfg = SIGNATURE_CONFIG.sectionTitle;
  const mode = cfg.mode || "text-and-line";

  $$(".section-title").forEach(title => {
    if (title.dataset.signatureAdded) return;
    title.dataset.signatureAdded = "true";

    const originalText = title.textContent.trim();

    if (mode === "text-only" || mode === "text-and-line") {
      title.classList.add("sr-section-title-original");
      title.style.position = "absolute";
      title.style.width = "1px";
      title.style.height = "1px";
      title.style.padding = "0";
      title.style.margin = "-1px";
      title.style.overflow = "hidden";
      title.style.clip = "rect(0, 0, 0, 0)";
      title.style.whiteSpace = "nowrap";
      title.style.border = "0";

      title.insertAdjacentHTML(
        "afterend",
        signatureTitleSVG(
          originalText,
          cfg.textWidth || 310,
          cfg.textHeight || 58,
          cfg.textDuration || 2200,
          cfg.textDelay || 80
        )
      );
    }

    if (mode === "underline-only" || mode === "text-and-line") {
      const anchor = title.nextElementSibling?.classList?.contains("signature-title-replace")
        ? title.nextElementSibling
        : title;
      anchor.insertAdjacentHTML(
        "afterend",
        signatureUnderlineSVG(
          cfg.lineWidth || cfg.width || 132,
          cfg.lineHeight || cfg.height || 34,
          cfg.lineDuration || cfg.duration || 1600,
          cfg.lineDelay || cfg.delay || 320
        )
      );
    }
  });
}

function addHeroSignature() {
  if (!SIGNATURE_CONFIG.applyTo?.hero || !SIGNATURE_CONFIG.heroSignature?.enabled) return;

  const names = $(".hero-names");
  if (!names || names.dataset.signatureAdded) return;
  names.dataset.signatureAdded = "true";

  const cfg = SIGNATURE_CONFIG.heroSignature;
  const signatureHTML = signatureTextSVG(
    getSignatureText(cfg),
    cfg.width,
    cfg.height,
    cfg.duration,
    cfg.delay,
    cfg.replaceHeroNames ? "replace-hero-name" : ""
  );

  names.insertAdjacentHTML("afterend", signatureHTML);

  if (cfg.replaceHeroNames) {
    names.style.position = "absolute";
    names.style.width = "1px";
    names.style.height = "1px";
    names.style.padding = "0";
    names.style.margin = "-1px";
    names.style.overflow = "hidden";
    names.style.clip = "rect(0, 0, 0, 0)";
    names.style.whiteSpace = "nowrap";
    names.style.border = "0";
  }
}

function addClosingSignature() {
  if (!SIGNATURE_CONFIG.applyTo?.closing || !SIGNATURE_CONFIG.closingSignature?.enabled) return;

  const closing = $(".closing-names");
  if (!closing || closing.dataset.signatureAdded) return;
  closing.dataset.signatureAdded = "true";

  const cfg = SIGNATURE_CONFIG.closingSignature;
  closing.insertAdjacentHTML(
    "afterend",
    signatureTextSVG(getSignatureText(cfg, closing.textContent.trim()), cfg.width, cfg.height, cfg.duration, cfg.delay).replace("hero-signature", "closing-signature")
  );
}

function observeSignatures() {
  const signatures = $$(".signature-wrap");
  if (!signatures.length) return;

  const animate = (el) => {
    el.classList.remove("signature-animate");
    void el.offsetWidth;
    el.classList.add("signature-animate");
  };

  const repeat = SIGNATURE_CONFIG.sectionTitle?.repeatOnScroll;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        if (!repeat) observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });

  signatures.forEach(sig => observer.observe(sig));
}
