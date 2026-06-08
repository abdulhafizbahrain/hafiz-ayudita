const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const escapeHTML = (str = "") =>
  String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));

const formatDateTime = () => new Date().toISOString();

const safeEnabled = (obj, fallback = false) => obj && obj.enabled !== undefined ? !!obj.enabled : fallback;

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("section-zoom");
  void el.offsetWidth;
  el.classList.add("section-zoom");
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const isMobile = () => window.matchMedia("(max-width: 719px)").matches;
