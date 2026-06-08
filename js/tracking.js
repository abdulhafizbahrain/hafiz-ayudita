function getTrackingConfig() {
  if (typeof TRACKING_CONFIG !== "undefined") return TRACKING_CONFIG;
  return window.TRACKING_CONFIG || {};
}

function isTrackingEnabled() {
  const cfg = getTrackingConfig();
  return cfg && cfg.enabled !== false;
}

function getTrackingGuestName() {
  try {
    return getGuestName();
  } catch (_) {
    return "";
  }
}

function getBaseTrackingPayload(eventType = "page_open") {
  return {
    timestamp: formatDateTime(),
    eventType,
    guestName: getTrackingGuestName(),
    pageUrl: window.location.href,
    referrer: document.referrer || "",
    userAgent: navigator.userAgent || "",
    locationStatus: "not_requested",
    latitude: "",
    longitude: "",
    accuracy: "",
    mapsUrl: ""
  };
}

function getGuestLocation() {
  const cfg = getTrackingConfig();

  return new Promise((resolve) => {
    if (!cfg.location?.enabled || !navigator.geolocation) {
      resolve({
        locationStatus: navigator.geolocation ? "disabled" : "unsupported",
        latitude: "",
        longitude: "",
        accuracy: "",
        mapsUrl: ""
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        resolve({
          locationStatus: "allowed",
          latitude: lat,
          longitude: lng,
          accuracy,
          mapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
        });
      },
      (err) => {
        resolve({
          locationStatus: err && err.code ? `denied_or_failed_${err.code}` : "denied_or_failed",
          latitude: "",
          longitude: "",
          accuracy: "",
          mapsUrl: ""
        });
      },
      {
        enableHighAccuracy: !!cfg.location?.highAccuracy,
        timeout: Number(cfg.location?.timeout ?? 6000),
        maximumAge: Number(cfg.location?.maximumAge ?? 60000)
      }
    );
  });
}

async function trackInvitationOpen(options = {}) {
  const cfg = getTrackingConfig();
  const gs = getGoogleSheetConfig();

  if (!isTrackingEnabled() || !isGoogleSheetEnabled()) return { ok: false, disabled: true };

  const eventType = options.eventType || "page_open";
  const sessionKey = `invitation_tracking_${eventType}_${window.location.href}`;

  if (!options.force && sessionStorage.getItem(sessionKey)) {
    return { ok: true, skipped: true };
  }

  const payload = getBaseTrackingPayload(eventType);

  if (options.includeLocation) {
    const location = await getGuestLocation();
    Object.assign(payload, location);
  }

  sessionStorage.setItem(sessionKey, "1");

  return googleSheetRequest(gs.actions.trackOpen, payload);
}

function initOpenTracking() {
  const cfg = getTrackingConfig();
  if (!isTrackingEnabled()) return;

  if (cfg.trackPageOpen) {
    // Catat bahwa link sudah dibuka tanpa meminta izin lokasi,
    // supaya tidak mengganggu halaman cover.
    setTimeout(() => {
      trackInvitationOpen({
        eventType: "link_opened",
        includeLocation: false
      });
    }, 500);
  }
}
