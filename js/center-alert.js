let centerAlertTimer = null;

function showCenterAlert(message, type = "info", options = {}) {
  let alert = document.getElementById("centerAlert");
  if (!alert) {
    alert = document.createElement("div");
    alert.id = "centerAlert";
    alert.className = "center-alert";
    alert.setAttribute("role", "status");
    alert.setAttribute("aria-live", "polite");
    alert.innerHTML = `
      <div class="center-alert-card">
        <div class="center-alert-icon" aria-hidden="true"></div>
        <div class="center-alert-text"></div>
      </div>
    `;
    document.body.appendChild(alert);
  }

  const icon = alert.querySelector(".center-alert-icon");
  const text = alert.querySelector(".center-alert-text");

  alert.className = `center-alert center-alert-${type}`;
  text.textContent = message || "";

  if (icon) {
    icon.innerHTML = type === "loading"
      ? '<span class="center-alert-spinner"></span>'
      : type === "success"
        ? "✓"
        : type === "error"
          ? "!"
          : "♥";
  }

  window.clearTimeout(centerAlertTimer);

  alert.classList.add("is-visible");

  const duration = Number(options.duration || 0);
  if (duration > 0) {
    centerAlertTimer = window.setTimeout(() => hideCenterAlert(), duration);
  }
}

function hideCenterAlert() {
  const alert = document.getElementById("centerAlert");
  if (!alert) return;
  alert.classList.remove("is-visible");
}
