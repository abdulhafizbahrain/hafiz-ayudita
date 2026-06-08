const localWishes = [];
let wishItems = [];
let wishCurrentPage = 1;

function getWishPaginationConfig() {
  return WISHES_CONFIG.pagination || {
    enabled: true,
    perPage: 5,
    showInfo: true,
    prevText: "Sebelumnya",
    nextText: "Berikutnya"
  };
}

function initWishes() {
  const form = $("#wishForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const statusEl = $("#wishStatus");
    const data = Object.fromEntries(new FormData(form).entries());

    const payload = {
      timestamp: formatDateTime(),
      name: data.name || "",
      message: data.message || "",
      invitationTo: getGuestName(),
      approved: true
    };

    if (!payload.name || !payload.message) {
      statusEl.textContent = "Nama dan ucapan/doa wajib diisi.";
      statusEl.className = "status-message error";
      return;
    }

    statusEl.textContent = "Mengirim ucapan...";
    statusEl.className = "status-message";
    showCenterAlert("Mengirim ucapan dan doa...", "loading");

    let result = { ok: false, disabled: true };
    if (WISHES_CONFIG.submit.saveToGoogleSheet && isGoogleSheetEnabled()) {
      result = await googleSheetRequest(getGoogleSheetConfig().actions.submitWish, payload);
    }

    if (result.ok || result.disabled) {
      addWishToList(payload);
      if (getGoogleSheetConfig().display?.refreshAfterSubmit && result.ok) {
        setTimeout(loadWishesFromSheet, 900);
      }
      form.reset();
      statusEl.textContent = WISHES_CONFIG.submit.successMessage;
      statusEl.className = "status-message success";
      showCenterAlert(WISHES_CONFIG.submit.successMessage || "Ucapan berhasil dikirim.", "success", { duration: 1800 });
    } else {
      statusEl.textContent = WISHES_CONFIG.submit.errorMessage;
      statusEl.className = "status-message error";
      showCenterAlert(WISHES_CONFIG.submit.errorMessage || "Ucapan gagal dikirim.", "error", { duration: 2200 });
    }
  });
}

function addWishToList(item) {
  localWishes.unshift(item);
  wishItems = [item, ...wishItems];
  wishCurrentPage = 1;
  renderWishList(wishItems);
}

function setWishCount(total) {
  const badge = $("#wishCountBadge");
  if (!badge) return;
  badge.textContent = String(Number(total || 0));
}

function renderWishPagination(total, totalPages, page, start, end) {
  const container = $("#wishPagination");
  if (!container) return;

  const cfg = getWishPaginationConfig();
  if (!cfg.enabled || totalPages <= 1) {
    container.innerHTML = cfg.showInfo && total
      ? `<div class="pagination-info">Menampilkan ${start + 1}-${end} dari ${total} doa</div>`
      : "";
    return;
  }

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .map((p, idx, arr) => {
      const prev = arr[idx - 1];
      const gap = prev && p - prev > 1 ? `<span class="pagination-ellipsis">...</span>` : "";
      return `${gap}<button type="button" class="pagination-page ${p === page ? "active" : ""}" data-wish-page="${p}">${p}</button>`;
    })
    .join("");

  container.innerHTML = `
    ${cfg.showInfo ? `<div class="pagination-info">Menampilkan ${start + 1}-${end} dari ${total} doa</div>` : ""}
    <div class="pagination-controls">
      <button type="button" class="pagination-btn" data-wish-page="${page - 1}" ${page <= 1 ? "disabled" : ""}>${escapeHTML(cfg.prevText || "Sebelumnya")}</button>
      <div class="pagination-pages">${pageButtons}</div>
      <button type="button" class="pagination-btn" data-wish-page="${page + 1}" ${page >= totalPages ? "disabled" : ""}>${escapeHTML(cfg.nextText || "Berikutnya")}</button>
    </div>
  `;

  container.querySelectorAll("[data-wish-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = Number(btn.dataset.wishPage);
      if (!next || next < 1 || next > totalPages || next === wishCurrentPage) return;
      wishCurrentPage = next;
      renderWishList(wishItems);
    });
  });
}

function renderWishList(items) {
  const list = $("#wishList");
  if (!list) return;

  let data = Array.isArray(items) ? items : [];
  if (WISHES_CONFIG.display.order === "newest") data = [...data];

  wishItems = data;
  setWishCount(data.length);

  if (!data.length) {
    list.innerHTML = `<div class="map-empty">Belum ada ucapan yang ditampilkan.</div>`;
    renderWishPagination(0, 0, 1, 0, 0);
    return;
  }

  const cfg = getWishPaginationConfig();
  const perPage = cfg.enabled ? Math.max(1, Number(cfg.perPage || 5)) : data.length;
  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  wishCurrentPage = Math.min(Math.max(1, wishCurrentPage), totalPages);

  const start = (wishCurrentPage - 1) * perPage;
  const end = Math.min(start + perPage, data.length);
  const pageItems = data.slice(start, end);

  list.innerHTML = pageItems.map(item => `
    <div class="wish-item">
      <div class="item-top">
        <span class="item-name">${escapeHTML(item.name)}</span>
        <span class="item-meta">Doa</span>
      </div>
      <p class="item-message">${escapeHTML(item.message)}</p>
    </div>
  `).join("");

  renderWishPagination(data.length, totalPages, wishCurrentPage, start, end);
}

async function loadWishesFromSheet() {
  if (!WISHES_CONFIG.display.loadFromGoogleSheet || !isGoogleSheetEnabled()) return;
  const result = await googleSheetRequest(getGoogleSheetConfig().actions.getWishes, {});
  if (result.ok && Array.isArray(result.data)) {
    wishCurrentPage = 1;
    renderWishList(result.data);
  }
}
