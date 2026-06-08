function initNavigation() {
  const nav = $("#bottomNav");
  if (!nav) return;

  if (!safeEnabled(window.NAVIGATION_CONFIG, true)) {
    nav.classList.add("hidden");
    return;
  }

  const items = (NAVIGATION_CONFIG.items || []).filter(i => i.enabled && document.getElementById(i.id));
  nav.innerHTML = items.map(item => `
    <button type="button" data-target="${escapeHTML(item.id)}">
      <span class="nav-icon">${escapeHTML(item.icon || "")}</span>
      ${escapeHTML(item.label)}
    </button>
  `).join("");

  nav.classList.remove("hidden");

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-target]");
    if (!btn) return;
    scrollToSection(btn.dataset.target);
  });

  const updateActive = () => {
    let activeId = "";
    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el || el.classList.contains("hidden")) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * .45 && rect.bottom >= window.innerHeight * .35) {
        activeId = item.id;
      }
    });

    $$("button[data-target]", nav).forEach(btn => {
      btn.classList.toggle("active", btn.dataset.target === activeId);
    });
  };

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
}
