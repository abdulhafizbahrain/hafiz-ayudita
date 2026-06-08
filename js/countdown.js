function initCountdown() {
  if (!SECTION_CONFIG.countdown?.enabled || !EVENT_CONFIG.countdown?.enabled) {
    $("#countdown")?.classList.add("hidden");
    return;
  }

  const el = $("#countdown");
  const target = new Date(EVENT_CONFIG.countdown.targetDateTime).getTime();

  el.innerHTML = `
    <h2 class="section-title" data-aos="fade-up">Menuju Hari Bahagia</h2>
    <div class="countdown-grid" data-aos="fade-up">
      ${["Hari", "Jam", "Menit", "Detik"].map(label => `
        <div class="countdown-item soft-card">
          <div class="countdown-value" data-count="${label}">0</div>
          <div class="countdown-label">${label}</div>
        </div>
      `).join("")}
    </div>
  `;

  const update = () => {
    const now = Date.now();
    let diff = target - now;
    if (diff <= 0) {
      el.querySelector(".countdown-grid").innerHTML = `<div class="quote-card soft-card" style="grid-column:1/-1">${escapeHTML(EVENT_CONFIG.countdown.expiredText)}</div>`;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff %= (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    const values = { "Hari": days, "Jam": hours, "Menit": minutes, "Detik": seconds };
    Object.entries(values).forEach(([key, value]) => {
      const node = el.querySelector(`[data-count="${key}"]`);
      if (node) node.textContent = String(value).padStart(2, "0");
    });
  };

  update();
  setInterval(update, 1000);
}
