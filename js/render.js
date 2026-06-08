function renderAll() {
  renderCover();
  renderHero();
  renderQuote();
  renderCouple();
  renderEvent();
  renderLocation();
  renderGallery();
  renderLoveStory();
  renderGift();
  renderRsvp();
  renderWishes();
  renderGuestBook();
  renderClosing();
}

function setSectionVisibility(id, configKey) {
  const el = document.getElementById(id);
  const enabled = SECTION_CONFIG?.[configKey]?.enabled ?? true;
  if (el) el.classList.toggle("hidden", !enabled);
  return enabled;
}

function bgStyle(path) {
  return path ? `style="background-image:url('${escapeHTML(path)}')"` : "";
}

function ornamentHTML() {
  if (!MEDIA_CONFIG?.ornaments?.enabled) return "";
  const o = MEDIA_CONFIG.ornaments;
  return `
    <img class="ornament one parallax-ornament" src="${escapeHTML(o.flower1)}" alt="">
    <img class="ornament two parallax-ornament" src="${escapeHTML(o.flower2)}" alt="">
  `;
}

function renderCover() {
  const el = $("#cover");
  if (!el) return;
  if (!MAIN_CONFIG.cover?.enabled || !SECTION_CONFIG.cover?.enabled) {
    el.classList.add("hidden");
    return;
  }

  const guestName = getGuestName();
  const bg = MEDIA_CONFIG?.images?.cover || MEDIA_CONFIG?.images?.backgroundMobile || "";

  el.innerHTML = `
    <div class="cover-bg parallax-bg" ${bgStyle(bg)}></div>
    ${ornamentHTML()}
    <div class="cover-card soft-card" data-aos="zoom-in">
      <div class="cover-small">${escapeHTML(MAIN_CONFIG.cover.smallText)}</div>
      <h1 class="cover-title">${escapeHTML(COUPLE_CONFIG.groom.shortName)} & ${escapeHTML(COUPLE_CONFIG.bride.shortName)}</h1>
      <div class="cover-names">${escapeHTML(MAIN_CONFIG.invitation.subtitle)}</div>
      <div class="guest-box">
        <p class="guest-label">${escapeHTML(MAIN_CONFIG.guest.greetingText)}</p>
        <p class="guest-name">${escapeHTML(guestName)}</p>
      </div>
      <button class="primary-button" id="openInvitationBtn">${escapeHTML(MAIN_CONFIG.cover.openButtonText)}</button>
    </div>
  `;
}

function renderHero() {
  if (!setSectionVisibility("hero", "hero")) return;
  const el = $("#hero");

  const heroBgCfg = MEDIA_CONFIG?.images?.heroBackground || {};
  el.style.setProperty("--hero-bg-opacity", String(heroBgCfg.imageOpacity ?? 1));
  el.style.setProperty("--hero-overlay-opacity", String(heroBgCfg.overlayOpacity ?? 0.28));
  el.style.setProperty("--hero-gradient-opacity", String(heroBgCfg.gradientOpacity ?? 0.42));

  const heroBlurCfg = heroBgCfg.backdropBlur || {};
  el.style.setProperty("--hero-bg-blur", heroBlurCfg.enabled === false ? "0px" : (heroBlurCfg.blur || "0px"));
  el.style.setProperty("--hero-bg-scale", String(heroBlurCfg.enabled === false ? 1.001 : (heroBlurCfg.scale || 1.018)));
  el.style.setProperty("--hero-bg-brightness", String(heroBlurCfg.enabled === false ? 1 : (heroBlurCfg.brightness || 1.08)));
  el.style.setProperty("--hero-bg-saturation", String(heroBlurCfg.enabled === false ? 1 : (heroBlurCfg.saturation || 1.06)));
  el.style.setProperty("--hero-bg-contrast", String(heroBlurCfg.enabled === false ? 1 : (heroBlurCfg.contrast || 1.02)));

  const bg = isMobile() ? MEDIA_CONFIG?.images?.backgroundMobile : MEDIA_CONFIG?.images?.backgroundDesktop;
  el.innerHTML = `
    <div class="hero-bg parallax-bg" ${bgStyle(bg || MEDIA_CONFIG?.images?.fallback || "")}></div>
    ${ornamentHTML()}
    <div class="hero-content" data-aos="zoom-in">
      <div class="hero-kicker">${escapeHTML(MAIN_CONFIG.invitation.subtitle)}</div>
      <h2 class="hero-names">${escapeHTML(COUPLE_CONFIG.groom.shortName)}<br>${escapeHTML(COUPLE_CONFIG.separator)}<br>${escapeHTML(COUPLE_CONFIG.bride.shortName)}</h2>
      <div class="hero-date">${escapeHTML(EVENT_CONFIG.mainDate.displayDate)}</div>
      <p class="hero-text">${escapeHTML(MAIN_CONFIG.text.opening)}</p>
    </div>
    <div class="hero-light-border" aria-hidden="true"></div>
  `;
}

function renderQuote() {
  if (!setSectionVisibility("quote", "quote")) return;
  const el = $("#quote");
  const quoteText = window.QUOTE_CONFIG?.text || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.";
  const source = window.QUOTE_CONFIG?.source || "QS. Ar-Rum: 21";
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>
    <div class="quote-card soft-card" data-aos="fade-up">
      <p class="quote-text">“${escapeHTML(quoteText)}”</p>
      <div class="quote-source">${escapeHTML(source)}</div>
    </div>
  `;
}

function renderCouple() {
  if (!setSectionVisibility("couple", "couple")) return;
  const el = $("#couple");
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">Mempelai</h2>
    <p class="section-subtitle" data-aos="fade-up">${escapeHTML(MAIN_CONFIG.text.opening)}</p>
    <div class="couple-grid">
      ${coupleCard(COUPLE_CONFIG.groom, "Mempelai Pria")}
      <div class="couple-separator" data-aos="zoom-in">${escapeHTML(COUPLE_CONFIG.separator)}</div>
      ${coupleCard(COUPLE_CONFIG.bride, "Mempelai Wanita")}
    </div>
  `;
}

function coupleCard(person, role) {
  const photo = person.photo || {};
  const showPhoto = photo.enabled !== false && !!photo.src;
  const shape = photo.shape || "rounded";

  return `
    <div class="couple-card soft-card" data-aos="fade-up">
      ${showPhoto ? `
        <div class="couple-photo-wrap ${escapeHTML(shape)}">
          <img class="couple-photo" src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt || person.fullName)}" loading="lazy">
        </div>
      ` : ""}
      <div class="couple-role">${escapeHTML(role)}</div>
      <h3 class="couple-name">${escapeHTML(person.fullName)}</h3>
      <p class="couple-parent">${escapeHTML(person.childLabel)}<br>
        Bapak ${escapeHTML(person.fatherName)}<br>
        & Ibu ${escapeHTML(person.motherName)}
      </p>
    </div>
  `;
}

function renderEvent() {
  if (!setSectionVisibility("event", "event")) return;
  const el = $("#event");
  const eventLocationCfg = typeof LOCATION_CONFIG !== "undefined" ? LOCATION_CONFIG : (window.LOCATION_CONFIG || {});
  const place = eventLocationCfg.venueName || "Lokasi acara belum diisi";
  const address = eventLocationCfg.address || "Alamat acara belum diisi";
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">Waktu Acara</h2>
    <p class="section-subtitle" data-aos="fade-up">${escapeHTML(EVENT_CONFIG.mainDate.displayDate)}</p>
    <div class="event-grid">
      ${EVENT_CONFIG.akad.enabled ? eventCard(EVENT_CONFIG.akad.title, EVENT_CONFIG.akad.displayTime, place, address) : ""}
      ${EVENT_CONFIG.reception.enabled ? eventCard(EVENT_CONFIG.reception.title, EVENT_CONFIG.reception.displayTime, place, address) : ""}
    </div>
  `;
}

function eventCard(title, time, place, address) {
  return `
    <div class="event-card soft-card" data-aos="fade-up">
      <h3>${escapeHTML(title)}</h3>
      <div class="event-time">${escapeHTML(time)}</div>
      <p class="event-place">${escapeHTML(place)}<br>${escapeHTML(address)}</p>
    </div>
  `;
}

function renderLocation() {
  if (!setSectionVisibility("location", "location")) return;
  const el = $("#location");
  const locationCfg = typeof LOCATION_CONFIG !== "undefined" ? LOCATION_CONFIG : (window.LOCATION_CONFIG || {});
  if (locationCfg.enabled === false) {
    el.classList.add("hidden");
    return;
  }
  const hasMap = !!locationCfg.embedMapUrl;
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">Lokasi</h2>
    <div class="location-card soft-card" data-aos="fade-up">
      <h3>${escapeHTML(locationCfg.venueName || "Nama tempat belum diisi")}</h3>
      <p class="item-message">${escapeHTML(locationCfg.address || "Alamat lengkap belum diisi")}</p>
      ${locationCfg.mapsUrl && locationCfg.buttons?.openMaps?.enabled ? `<p><a class="primary-button" href="${escapeHTML(locationCfg.mapsUrl)}" target="_blank" rel="noopener">${escapeHTML(locationCfg.buttons.openMaps.text)}</a></p>` : ""}
      ${hasMap && locationCfg.buttons?.embeddedMap?.enabled ? `<iframe class="map-frame" src="${escapeHTML(locationCfg.embedMapUrl)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>` : `<div class="map-empty">Embed map belum diisi di <b>config/location.config.js</b></div>`}
    </div>
  `;
}

function renderGallery() {
  if (!setSectionVisibility("gallery", "gallery")) return;

  const el = $("#gallery");

  if (!MEDIA_CONFIG.gallery?.enabled) {
    el.classList.add("hidden");
    return;
  }

  const images = MEDIA_CONFIG.gallery.images || [];

  if (!images.length) {
    el.innerHTML = `<h2 class="section-title">Galeri</h2><div class="gallery-placeholder">Foto galeri belum diisi.</div>`;
    return;
  }

  const mode = (MEDIA_CONFIG.gallery.mode || "swiper").toLowerCase();
  const preview = MEDIA_CONFIG.gallery.preview !== false;

  const galleryTitle = `
    <h2 class="section-title" data-aos="fade-up">Galeri</h2>
    <p class="section-subtitle" data-aos="fade-up">Momen bahagia kami.</p>
  `;

  const imgTag = (src, index, extraClass = "") => {
    const safeSrc = escapeHTML(src);
    const previewAttrs = preview
      ? `data-preview-src="${safeSrc}" role="button" tabindex="0"`
      : "";

    return `<img class="gallery-img parallax-image ${extraClass}" src="${safeSrc}" alt="Gallery ${index + 1}" loading="lazy" ${previewAttrs}>`;
  };

  const renderGrid = () => `
    <div class="gallery-layout gallery-grid" data-aos="fade-up">
      ${images.map((src, index) => `<div class="gallery-item">${imgTag(src, index)}</div>`).join("")}
    </div>
  `;

  const renderMasonry = () => `
    <div class="gallery-layout gallery-masonry" data-aos="fade-up">
      ${images.map((src, index) => `<div class="gallery-item">${imgTag(src, index)}</div>`).join("")}
    </div>
  `;

  const renderPolaroid = () => `
    <div class="gallery-layout gallery-polaroid" data-aos="fade-up">
      ${images.map((src, index) => `
        <figure class="gallery-polaroid-card">
          ${imgTag(src, index)}
          <figcaption>Momen ${index + 1}</figcaption>
        </figure>
      `).join("")}
    </div>
  `;

  const renderStack = () => `
    <div class="gallery-layout gallery-stack" data-aos="fade-up">
      ${images.map((src, index) => `
        <div class="gallery-stack-card" style="--stack-index:${index};">
          ${imgTag(src, index)}
        </div>
      `).join("")}
    </div>
  `;

  const renderSwiper = (effect = "slide") => `
    <div class="swiper gallery-swiper gallery-mode-${escapeHTML(effect)}" data-gallery-effect="${escapeHTML(effect)}" data-aos="fade-up">
      <div class="swiper-wrapper">
        ${images.map((src, index) => `<div class="swiper-slide">${imgTag(src, index)}</div>`).join("")}
      </div>
      <div class="swiper-pagination"></div>
    </div>
  `;

  const modeTemplate = {
    grid: renderGrid,
    masonry: renderMasonry,
    polaroid: renderPolaroid,
    stack: renderStack,
    swiper: () => renderSwiper("slide"),
    carousel: () => renderSwiper("carousel"),
    coverflow: () => renderSwiper("coverflow")
  };

  el.innerHTML = galleryTitle + (modeTemplate[mode] ? modeTemplate[mode]() : renderSwiper("slide"));

  setTimeout(() => {
    const swiperEl = $(".gallery-swiper");

    if (swiperEl && window.Swiper) {
      const effect = swiperEl.dataset.galleryEffect || "slide";

      const baseOptions = {
        spaceBetween: 14,
        centeredSlides: true,
        loop: images.length > 2,
        pagination: { el: ".swiper-pagination", clickable: true }
      };

      if (effect === "coverflow") {
        new Swiper(".gallery-swiper", {
          ...baseOptions,
          slidesPerView: 1.25,
          effect: "coverflow",
          grabCursor: true,
          coverflowEffect: {
            rotate: 28,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false
          },
          breakpoints: { 720: { slidesPerView: 2.2 } }
        });
      } else if (effect === "carousel") {
        new Swiper(".gallery-swiper", {
          ...baseOptions,
          slidesPerView: 1.35,
          breakpoints: {
            720: { slidesPerView: 2.4 },
            1024: { slidesPerView: 3.2 }
          }
        });
      } else {
        new Swiper(".gallery-swiper", {
          ...baseOptions,
          slidesPerView: 1.15,
          breakpoints: { 720: { slidesPerView: 2.2 } }
        });
      }
    }

    initGalleryPreview();
  }, 0);
}

function initGalleryPreview() {
  const images = $$(".gallery-img[data-preview-src]");
  if (!images.length) return;

  const previewItems = images.map(img => img.dataset.previewSrc).filter(Boolean);
  let currentIndex = 0;
  let modal = $("#galleryPreviewModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "galleryPreviewModal";
    modal.className = "gallery-preview-modal hidden";
    modal.innerHTML = `
      <button class="gallery-preview-close" type="button" aria-label="Tutup preview">×</button>
      <button class="gallery-preview-nav gallery-preview-prev" type="button" aria-label="Foto sebelumnya">&lt;</button>
      <img class="gallery-preview-img" src="" alt="Preview galeri">
      <button class="gallery-preview-nav gallery-preview-next" type="button" aria-label="Foto berikutnya">&gt;</button>
      <div class="gallery-preview-counter" aria-live="polite"></div>
    `;
    document.body.appendChild(modal);
  }

  const modalImg = modal.querySelector(".gallery-preview-img");
  const closeBtn = modal.querySelector(".gallery-preview-close");
  const prevBtn = modal.querySelector(".gallery-preview-prev");
  const nextBtn = modal.querySelector(".gallery-preview-next");
  const counter = modal.querySelector(".gallery-preview-counter");

  const updatePreview = () => {
    const src = previewItems[currentIndex];
    if (!src) return;

    modalImg.classList.remove("preview-image-enter");
    void modalImg.offsetWidth;
    modalImg.src = src;
    modalImg.classList.add("preview-image-enter");

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${previewItems.length}`;
    }

    if (prevBtn) prevBtn.disabled = previewItems.length <= 1;
    if (nextBtn) nextBtn.disabled = previewItems.length <= 1;
  };

  const openPreview = (src) => {
    const foundIndex = previewItems.indexOf(src);
    currentIndex = foundIndex >= 0 ? foundIndex : 0;
    updatePreview();
    modal.classList.remove("hidden");
    document.body.classList.add("preview-open");
  };

  const closePreview = () => {
    modal.classList.add("hidden");
    modalImg.src = "";
    document.body.classList.remove("preview-open");
  };

  const showPrev = () => {
    if (!previewItems.length) return;
    currentIndex = (currentIndex - 1 + previewItems.length) % previewItems.length;
    updatePreview();
  };

  const showNext = () => {
    if (!previewItems.length) return;
    currentIndex = (currentIndex + 1) % previewItems.length;
    updatePreview();
  };

  images.forEach(img => {
    img.addEventListener("click", () => openPreview(img.dataset.previewSrc));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPreview(img.dataset.previewSrc);
      }
    });
  });

  closeBtn?.addEventListener("click", closePreview);
  prevBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    showPrev();
  });
  nextBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    showNext();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closePreview();
  });

  if (!window.galleryPreviewKeyHandler) {
    window.galleryPreviewKeyHandler = (event) => {
      const openedModal = $("#galleryPreviewModal");
      if (!openedModal || openedModal.classList.contains("hidden")) return;

      if (event.key === "Escape") {
        openedModal.classList.add("hidden");
        const openedImg = openedModal.querySelector(".gallery-preview-img");
        if (openedImg) openedImg.src = "";
        document.body.classList.remove("preview-open");
      }

      if (event.key === "ArrowLeft") {
        openedModal.querySelector(".gallery-preview-prev")?.click();
      }

      if (event.key === "ArrowRight") {
        openedModal.querySelector(".gallery-preview-next")?.click();
      }
    };
    document.addEventListener("keydown", window.galleryPreviewKeyHandler);
  }
}

function renderLoveStory() {
  if (!setSectionVisibility("loveStory", "loveStory")) return;
  const el = $("#loveStory");
  const stories = window.LOVE_STORY_CONFIG?.stories || [];
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">Love Story</h2>
    <div class="story-list">
      ${stories.map(s => `
        <div class="story-item soft-card" data-aos="fade-up">
          <div class="story-time">${escapeHTML(s.time || "")}</div>
          <div class="story-title">${escapeHTML(s.title || "")}</div>
          <p class="item-message">${escapeHTML(s.text || "")}</p>
        </div>
      `).join("") || `<div class="map-empty">Love story belum diisi.</div>`}
    </div>
  `;
}

function renderGift() {
  if (!setSectionVisibility("gift", "gift")) return;
  const el = $("#gift");
  if (!safeEnabled(window.GIFT_CONFIG, false)) {
    el.classList.add("hidden");
    return;
  }
  const accounts = (GIFT_CONFIG.accounts || []).filter(a => a.enabled);
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">${escapeHTML(GIFT_CONFIG.title)}</h2>
    <p class="section-subtitle" data-aos="fade-up">${escapeHTML(GIFT_CONFIG.description)}</p>
    <div class="gift-card soft-card" data-aos="fade-up">
      ${accounts.map(a => `
        <div class="account-card">
          <strong>${escapeHTML(a.bank)}</strong>
          <div class="account-number">${escapeHTML(a.number)}</div>
          <div>${escapeHTML(a.owner)}</div>
          ${GIFT_CONFIG.copyButton.enabled ? `<button class="secondary-button" onclick="navigator.clipboard.writeText('${escapeHTML(a.number)}')">${escapeHTML(GIFT_CONFIG.copyButton.text)}</button>` : ""}
        </div>
      `).join("") || `<div class="map-empty">Data rekening belum diisi.</div>`}
      ${GIFT_CONFIG.qris?.enabled ? `<img class="gallery-img" src="${escapeHTML(GIFT_CONFIG.qris.image)}" alt="QRIS">` : ""}
    </div>
  `;
}

function renderRsvp() {
  if (!setSectionVisibility("rsvp", "rsvp")) return;
  const el = $("#rsvp");
  if (!safeEnabled(window.RSVP_CONFIG, true)) {
    el.classList.add("hidden");
    return;
  }
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">${escapeHTML(RSVP_CONFIG.title)}</h2>
    <p class="section-subtitle" data-aos="fade-up">${escapeHTML(RSVP_CONFIG.description)}</p>
    <form id="rsvpForm" class="form-card soft-card" data-aos="fade-up">
      <div class="form-row">
        <label>${escapeHTML(RSVP_CONFIG.fields.name.label)}</label>
        <input name="name" type="text" placeholder="Nama Anda" ${RSVP_CONFIG.fields.name.required ? "required" : ""}>
      </div>
      <div class="form-row">
        <label>${escapeHTML(RSVP_CONFIG.fields.status.label)}</label>
        <select name="status" ${RSVP_CONFIG.fields.status.required ? "required" : ""}>
          <option value="">Pilih status</option>
          ${(RSVP_CONFIG.fields.status.options || []).map(o => `<option value="${escapeHTML(o)}">${escapeHTML(o)}</option>`).join("")}
        </select>
      </div>
      ${RSVP_CONFIG.fields.guestCount.enabled ? `
        <div class="form-row">
          <label>${escapeHTML(RSVP_CONFIG.fields.guestCount.label)}</label>
          <input name="guestCount" type="number" min="1" value="${escapeHTML(RSVP_CONFIG.fields.guestCount.defaultValue)}">
        </div>` : ""}
      ${RSVP_CONFIG.fields.note.enabled ? `
        <div class="form-row">
          <label>${escapeHTML(RSVP_CONFIG.fields.note.label)}</label>
          <textarea name="note" placeholder="Catatan tambahan"></textarea>
        </div>` : ""}
      <button class="primary-button" type="submit">Kirim Konfirmasi</button>
      <div id="rsvpStatus" class="status-message"></div>
    </form>
  `;
}

function renderWishes() {
  if (!setSectionVisibility("wishes", "wishes")) return;
  const el = $("#wishes");
  if (!safeEnabled(window.WISHES_CONFIG, true)) {
    el.classList.add("hidden");
    return;
  }
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">${escapeHTML(WISHES_CONFIG.title)}</h2>
    <p class="section-subtitle" data-aos="fade-up">${escapeHTML(WISHES_CONFIG.description)}</p>
    <form id="wishForm" class="form-card soft-card" data-aos="fade-up">
      <div class="form-row">
        <label>${escapeHTML(WISHES_CONFIG.fields.name.label)}</label>
        <input name="name" type="text" placeholder="Nama Anda" ${WISHES_CONFIG.fields.name.required ? "required" : ""}>
      </div>
      <div class="form-row">
        <label>${escapeHTML(WISHES_CONFIG.fields.message.label)}</label>
        <textarea name="message" placeholder="Tulis ucapan dan doa..." ${WISHES_CONFIG.fields.message.required ? "required" : ""}></textarea>
      </div>
      <button class="primary-button" type="submit">Kirim Ucapan</button>
      <div id="wishStatus" class="status-message"></div>
    </form>
  `;
}

function renderGuestBook() {
  if (!setSectionVisibility("guestBook", "guestBook")) return;
  const el = $("#guestBook");
  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">Buku Tamu Digital</h2>
    <div class="guestbook-card soft-card" data-aos="fade-up">
      <div class="guestbook-heading-row">
        <h3 class="guestbook-title-with-badge">Konfirmasi Kehadiran <span id="rsvpCountBadge" class="guestbook-count-badge">0</span></h3>
      </div>
      <div id="rsvpList" class="list-stack">
        <div class="map-empty">Belum ada konfirmasi yang ditampilkan.</div>
      </div>
      <div id="rsvpPagination" class="guestbook-pagination"></div>

      <div class="guestbook-divider"></div>

      <div class="guestbook-heading-row">
        <h3 class="guestbook-title-with-badge">Ucapan & Doa <span id="wishCountBadge" class="guestbook-count-badge">0</span></h3>
      </div>
      <div id="wishList" class="list-stack">
        <div class="map-empty">Belum ada ucapan yang ditampilkan.</div>
      </div>
      <div id="wishPagination" class="guestbook-pagination"></div>
    </div>
  `;
}

function renderClosing() {
  if (!setSectionVisibility("closing", "closing")) return;
  const el = $("#closing");
  el.innerHTML = `
    <div class="closing-card soft-card" data-aos="zoom-in">
      <h2 class="section-title">Terima Kasih</h2>
      <p class="section-subtitle">${escapeHTML(MAIN_CONFIG.text.thankYou)}</p>
      <div class="closing-names">${escapeHTML(COUPLE_CONFIG.groom.shortName)} & ${escapeHTML(COUPLE_CONFIG.bride.shortName)}</div>
    </div>
  `;
}
