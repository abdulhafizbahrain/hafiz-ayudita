function getGoogleSheetConfig() {
  if (typeof GOOGLE_SHEET_CONFIG !== "undefined") return GOOGLE_SHEET_CONFIG;
  return window.GOOGLE_SHEET_CONFIG || {};
}

function isGoogleSheetEnabled() {
  const cfg = getGoogleSheetConfig();
  return cfg && cfg.enabled !== false && !!cfg.scriptUrl;
}

function withTimeout(promise, timeoutMs = 15000) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), timeoutMs);
  });
  return Promise.race([promise, timeout]);
}

function isReadAction(action) {
  const cfg = getGoogleSheetConfig();
  return action === cfg.actions?.getRsvp ||
    action === cfg.actions?.getWishes ||
    action === cfg.actions?.getOpens;
}

function isWriteAction(action) {
  const cfg = getGoogleSheetConfig();
  return action === cfg.actions?.submitRsvp ||
    action === cfg.actions?.submitWish ||
    action === cfg.actions?.trackOpen;
}

function googleSheetJsonp(action, payload = {}) {
  const cfg = getGoogleSheetConfig();

  return new Promise((resolve) => {
    const callbackName = `gsCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const url = new window.URL(cfg.scriptUrl);

    url.searchParams.set("action", action);
    url.searchParams.set("callback", callbackName);

    if (payload && Object.keys(payload).length) {
      url.searchParams.set("payload", JSON.stringify(payload));
    }

    if (cfg.security?.useToken) {
      url.searchParams.set("token", cfg.security?.token || "");
    }

    let done = false;
    const cleanup = () => {
      try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; }
      script.remove();
    };

    window[callbackName] = (data) => {
      if (done) return;
      done = true;
      cleanup();
      resolve(data || { ok: false, data: [] });
    };

    script.onerror = () => {
      if (done) return;
      done = true;
      cleanup();
      resolve({
        ok: false,
        data: [],
        error: "JSONP gagal. Pastikan Apps Script terbaru sudah di-deploy dan mendukung callback."
      });
    };

    script.src = url.toString();
    document.head.appendChild(script);

    setTimeout(() => {
      if (done) return;
      done = true;
      cleanup();
      resolve({
        ok: false,
        data: [],
        error: "JSONP timeout. Pastikan Web App Apps Script sudah redeploy."
      });
    }, Number(cfg.request?.timeout ?? 15000));
  });
}

async function googleSheetWriteNoCors(action, payload = {}) {
  const cfg = getGoogleSheetConfig();

  const body = {
    action,
    token: cfg.security?.useToken ? (cfg.security?.token || "") : "",
    payload
  };

  try {
    await fetch(cfg.scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(body),
      keepalive: true
    });

    // no-cors tidak mengizinkan membaca response.
    // Jika request terkirim tanpa exception, anggap berhasil.
    return { ok: true, noCors: true, data: payload };
  } catch (error) {
    console.error("Google Sheet no-cors write error:", error);
    return { ok: false, error: String(error), data: [] };
  }
}

async function googleSheetRequest(action, payload = {}) {
  if (!isGoogleSheetEnabled()) {
    return { ok: false, disabled: true, data: [] };
  }

  // Hindari error CORS Apps Script:
  // - Kirim data memakai POST no-cors.
  // - Ambil data memakai JSONP.
  if (isWriteAction(action)) {
    return googleSheetWriteNoCors(action, payload);
  }

  if (isReadAction(action)) {
    return googleSheetJsonp(action, payload);
  }

  return { ok: false, error: `Unknown action: ${action}`, data: [] };
}
