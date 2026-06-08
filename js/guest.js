function decodeGuestParam(raw, { keepLineBreak = true } = {}) {
  const config = MAIN_CONFIG.guest || {};
  const space = config.spaceReplacement || "_";
  const line = config.lineBreakReplacement || "|";

  const decoded = decodeURIComponent(raw || "")
    .split(line).join(keepLineBreak ? "\n" : " ")
    .split(space).join(" ")
    .trim();

  return keepLineBreak
    ? decoded
    : decoded.replace(/\s+/g, " ").trim();
}

function getGuestNameOnly({ keepLineBreak = true } = {}) {
  const config = MAIN_CONFIG.guest || {};
  const param = config.urlParameter || "to";
  const url = new URL(window.location.href);
  const raw = url.searchParams.get(param);

  if (!raw) return "";

  return decodeGuestParam(raw, { keepLineBreak });
}

function getGuestGroupName({ keepLineBreak = true } = {}) {
  const config = MAIN_CONFIG.guest || {};
  const groupParam = config.groupUrlParameter || "togroup";
  const url = new URL(window.location.href);
  const raw = url.searchParams.get(groupParam);

  if (!raw) return "";

  return decodeGuestParam(raw, { keepLineBreak });
}

function getGuestName() {
  const config = MAIN_CONFIG.guest || {};
  const mainName = getGuestNameOnly({ keepLineBreak: true });
  const groupName = getGuestGroupName({ keepLineBreak: true });

  if (!mainName && !groupName) return config.defaultName || "Bapak/Ibu/Saudara/i";

  // Untuk undangan grup:
  // cover bisa menampilkan parameter to + togroup,
  // tetapi form RSVP dan Ucapan tetap hanya memakai parameter to.
  if (groupName && config.showGroupOnCover !== false) {
    return mainName ? `${mainName}\n${groupName}` : groupName;
  }

  return mainName || config.defaultName || "Bapak/Ibu/Saudara/i";
}
