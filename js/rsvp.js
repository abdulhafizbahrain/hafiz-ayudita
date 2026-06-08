const localRsvp = [];
let rsvpItems = [];
let rsvpCurrentPage = 1;

function getRsvpPaginationConfig() {
  return RSVP_CONFIG.pagination || {
    enabled: true,
    perPage: 5,
    showInfo: true,
    prevText: "Sebelumnya",
    nextText: "Berikutnya"
  };
}

function initRsvp() {
  const form = $("#rsvpForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const statusEl = $("#rsvpStatus");
    const data = Object.fromEntries(new FormData(form).entries());

    const payload = {
      timestamp: formatDateTime(),
      name: data.name || "",
      status: data.status || "",
      guestCount: data.guestCount || "",
      note: data.note || "",
      invitationTo: getGuestName(),
      userAgent: navigator.userAgent
    };

    if (!payload.name || !payload.status) {
      statusEl.textContent = "Nama dan status kehadiran wajib diisi.";
      statusEl.className = "status-message error";
      return;
    }

    statusEl.textContent = "Mengirim konfirmasi...";
    statusEl.className = "status-message";
    showCenterAlert("Mengirim konfirmasi kehadiran...", "loading");

    let result = { ok: false, disabled: true };
    if (RSVP_CONFIG.submit.saveToGoogleSheet && isGoogleSheetEnabled()) {
      result = await googleSheetRequest(getGoogleSheetConfig().actions.submitRsvp, payload);
    }

    if (result.ok || result.disabled) {
      addRsvpToList(payload);
      if (getGoogleSheetConfig().display?.refreshAfterSubmit && result.ok) {
        setTimeout(loadRsvpFromSheet, 900);
      }
      form.reset();
      statusEl.textContent = RSVP_CONFIG.submit.successMessage;
      statusEl.className = "status-message success";
      showCenterAlert(RSVP_CONFIG.submit.successMessage || "Konfirmasi berhasil dikirim.", "success", { duration: 1800 });
    } else {
      statusEl.textContent = RSVP_CONFIG.submit.errorMessage;
      statusEl.className = "status-message error";
      showCenterAlert(RSVP_CONFIG.submit.errorMessage || "Konfirmasi gagal dikirim.", "error", { duration: 2200 });
    }
  });
}

function addRsvpToList(item) {
  localRsvp.unshift(item);
  rsvpItems = [item, ...rsvpItems];
  rsvpCurrentPage = 1;
  renderRsvpList(rsvpItems);
}

function setRsvpCount(total) {
  const badge = $("#rsvpCountBadge");
  if (!badge) return;
  badge.textContent = String(Number(total || 0));
}

function renderRsvpPagination(total, totalPages, page, start, end) {
  const container = $("#rsvpPagination");
  if (!container) return;

  const cfg = getRsvpPaginationConfig();
  if (!cfg.enabled || totalPages <= 1) {
    container.innerHTML = cfg.showInfo && total
      ? `<div class="pagination-info">Menampilkan ${start + 1}-${end} dari ${total} RSVP</div>`
      : "";
    return;
  }

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .map((p, idx, arr) => {
      const prev = arr[idx - 1];
      const gap = prev && p - prev > 1 ? `<span class="pagination-ellipsis">...</span>` : "";
      return `${gap}<button type="button" class="pagination-page ${p === page ? "active" : ""}" data-rsvp-page="${p}">${p}</button>`;
    })
    .join("");

  container.innerHTML = `
    ${cfg.showInfo ? `<div class="pagination-info">Menampilkan ${start + 1}-${end} dari ${total} RSVP</div>` : ""}
    <div class="pagination-controls">
      <button type="button" class="pagination-btn" data-rsvp-page="${page - 1}" ${page <= 1 ? "disabled" : ""}>${escapeHTML(cfg.prevText || "Sebelumnya")}</button>
      <div class="pagination-pages">${pageButtons}</div>
      <button type="button" class="pagination-btn" data-rsvp-page="${page + 1}" ${page >= totalPages ? "disabled" : ""}>${escapeHTML(cfg.nextText || "Berikutnya")}</button>
    </div>
  `;

  container.querySelectorAll("[data-rsvp-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = Number(btn.dataset.rsvpPage);
      if (!next || next < 1 || next > totalPages || next === rsvpCurrentPage) return;
      rsvpCurrentPage = next;
      renderRsvpList(rsvpItems);
    });
  });
}

function renderRsvpList(items) {
  const list = $("#rsvpList");
  if (!list) return;

  const data = Array.isArray(items) ? items : [];
  rsvpItems = data;
  setRsvpCount(data.length);

  if (!data.length) {
    list.innerHTML = `<div class="map-empty">Belum ada konfirmasi yang ditampilkan.</div>`;
    renderRsvpPagination(0, 0, 1, 0, 0);
    return;
  }

  const cfg = getRsvpPaginationConfig();
  const perPage = cfg.enabled ? Math.max(1, Number(cfg.perPage || 5)) : data.length;
  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  rsvpCurrentPage = Math.min(Math.max(1, rsvpCurrentPage), totalPages);

  const start = (rsvpCurrentPage - 1) * perPage;
  const end = Math.min(start + perPage, data.length);
  const pageItems = data.slice(start, end);

  list.innerHTML = pageItems.map(item => `
    <div class="guest-item">
      <div class="item-top">
        <span class="item-name">${escapeHTML(item.name)}</span>
        <span class="item-meta">${escapeHTML(item.status)}</span>
      </div>
      <div class="item-meta">${item.guestCount ? escapeHTML(item.guestCount) + " orang" : ""}</div>
      ${item.note ? `<p class="item-message">${escapeHTML(item.note)}</p>` : ""}
    </div>
  `).join("");

  renderRsvpPagination(data.length, totalPages, rsvpCurrentPage, start, end);
}

async function loadRsvpFromSheet() {
  if (!getGoogleSheetConfig().display?.loadRsvpFromSheet || !isGoogleSheetEnabled()) return;
  const result = await googleSheetRequest(getGoogleSheetConfig().actions.getRsvp, {});
  if (result.ok && Array.isArray(result.data)) {
    rsvpCurrentPage = 1;
    renderRsvpList(result.data);
  }
}
