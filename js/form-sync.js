function getGuestNameFromUrlParameter() {
  try {
    // Khusus form, nama selalu hanya mengambil parameter "to".
    // Parameter "togroup" hanya untuk tampilan undangan grup di cover.
    if (typeof getGuestNameOnly === "function") {
      return getGuestNameOnly({ keepLineBreak: false });
    }

    const config = MAIN_CONFIG?.guest || {};
    const param = config.urlParameter || "to";
    const raw = new window.URL(window.location.href).searchParams.get(param);

    if (!raw) return "";

    const space = config.spaceReplacement || "_";
    const line = config.lineBreakReplacement || "|";

    return decodeURIComponent(raw)
      .split(line).join(" ")
      .split(space).join(" ")
      .replace(/\s+/g, " ")
      .trim();
  } catch (error) {
    return "";
  }
}

function initFormNameSync() {
  const rsvpForm = document.getElementById("rsvpForm");
  const wishForm = document.getElementById("wishForm");
  if (!rsvpForm || !wishForm) return;

  const rsvpName = rsvpForm.querySelector('input[name="name"]');
  const wishName = wishForm.querySelector('input[name="name"]');
  if (!rsvpName || !wishName) return;

  let wishNameDetached = false;

  const syncWishFromRsvp = () => {
    if (wishNameDetached) return;
    wishName.value = rsvpName.value;
  };

  const prefillName = getGuestNameFromUrlParameter();

  // Jika ada nama di parameter link, isi kedua form dari link
  if (prefillName) {
    rsvpName.value = prefillName;
    wishName.value = prefillName;
  } else if (rsvpName.value && !wishName.value) {
    // Jika RSVP sudah ada isi dan ucapan masih kosong, samakan
    wishName.value = rsvpName.value;
  }

  rsvpName.addEventListener("input", syncWishFromRsvp);
  rsvpName.addEventListener("change", syncWishFromRsvp);
  rsvpName.addEventListener("blur", syncWishFromRsvp);

  // Jika user mengedit nama pada ucapan, putuskan sinkronisasi.
  const detachWishSync = () => {
    if (wishName.value !== rsvpName.value) {
      wishNameDetached = true;
    }
  };

  wishName.addEventListener("input", detachWishSync);
  wishName.addEventListener("change", detachWishSync);
  wishName.addEventListener("blur", detachWishSync);

  // Jika user mengosongkan nama ucapan dan belum detach,
  // boleh ikut terisi lagi dari RSVP.
  wishName.addEventListener("focus", () => {
    if (!wishName.value && !wishNameDetached && rsvpName.value) {
      wishName.value = rsvpName.value;
    }
  });
}
