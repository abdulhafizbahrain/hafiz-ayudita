/**
 * Google Apps Script untuk database undangan.
 *
 * Sheet:
 * - RSVP
 * - UCAPAN
 * - KLIK_LINK
 *
 * Penting setelah update kode:
 * Deploy > Manage deployments > Edit > Version: New version > Deploy.
 */

const SHEET_NAMES = {
  RSVP: "RSVP",
  WISHES: "UCAPAN",
  OPENS: "KLIK_LINK"
};

// Timestamp dipaksa menggunakan WITA / Indonesia Tengah / GMT+8.
// Asia/Makassar = WITA, mencakup Bali, NTB, NTT, Sulawesi, dll.
const TIME_ZONE_CONFIG = {
  timeZone: "Asia/Makassar",
  label: "WITA",
  gmt: "GMT+8",
  format: "yyyy-MM-dd HH:mm:ss"
};

// 0 = ambil semua data.
// Jika ingin dibatasi, ubah misalnya RSVP: 200, WISHES: 200.
const DATA_LIMITS = {
  RSVP: 0,
  WISHES: 0,
  OPENS: 0
};

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || "";
    const callback = (e && e.parameter && e.parameter.callback) || "";
    const payloadText = (e && e.parameter && e.parameter.payload) || "{}";
    let payload = {};

    try {
      payload = JSON.parse(payloadText);
    } catch (_) {
      payload = {};
    }

    let result;

    if (action === "get_rsvp") result = { ok: true, data: getRsvp() };
    else if (action === "get_wishes") result = { ok: true, data: getWishes() };
    else if (action === "get_opens") result = { ok: true, data: getOpens() };
    else if (action === "track_open") result = saveOpen(payload);
    else result = {
      ok: true,
      message: "Google Sheet Web App aktif",
      availableActions: ["submit_rsvp", "submit_wish", "get_rsvp", "get_wishes", "track_open", "get_opens"]
    };

    return callback ? jsonpResponse(callback, result) : jsonResponse(result);
  } catch (err) {
    return jsonResponse({ ok: false, message: String(err) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const action = body.action;
    const payload = body.payload || {};

    if (action === "submit_rsvp") return jsonResponse(saveRsvp(payload));
    if (action === "submit_wish") return jsonResponse(saveWish(payload));
    if (action === "track_open") return jsonResponse(saveOpen(payload));
    if (action === "get_rsvp") return jsonResponse({ ok: true, data: getRsvp() });
    if (action === "get_wishes") return jsonResponse({ ok: true, data: getWishes() });
    if (action === "get_opens") return jsonResponse({ ok: true, data: getOpens() });

    return jsonResponse({ ok: false, message: "Unknown action: " + action });
  } catch (err) {
    return jsonResponse({ ok: false, message: String(err) });
  }
}

function saveRsvp(data) {
  const sheet = getSheet(SHEET_NAMES.RSVP);
  const headers = ["timestamp", "name", "status", "guestCount", "note", "invitationTo", "userAgent"];
  ensureHeader(sheet, headers);

  sheet.appendRow([
    getWitaTimestamp(data.timestamp),
    data.name || "",
    data.status || "",
    data.guestCount || "",
    data.note || "",
    data.invitationTo || "",
    data.userAgent || ""
  ]);

  return { ok: true, data: data };
}

function saveWish(data) {
  const sheet = getSheet(SHEET_NAMES.WISHES);
  const headers = ["timestamp", "name", "message", "invitationTo", "approved"];
  ensureHeader(sheet, headers);

  sheet.appendRow([
    getWitaTimestamp(data.timestamp),
    data.name || "",
    data.message || "",
    data.invitationTo || "",
    data.approved !== false
  ]);

  return { ok: true, data: data };
}

function saveOpen(data) {
  const sheet = getSheet(SHEET_NAMES.OPENS);
  const headers = [
    "timestamp",
    "eventType",
    "guestName",
    "locationStatus",
    "latitude",
    "longitude",
    "accuracy",
    "mapsUrl",
    "pageUrl",
    "referrer",
    "userAgent"
  ];
  ensureHeader(sheet, headers);

  sheet.appendRow([
    getWitaTimestamp(data.timestamp),
    data.eventType || "",
    data.guestName || "",
    data.locationStatus || "",
    data.latitude || "",
    data.longitude || "",
    data.accuracy || "",
    data.mapsUrl || "",
    data.pageUrl || "",
    data.referrer || "",
    data.userAgent || ""
  ]);

  return { ok: true, data: data };
}

function getRsvp() {
  const sheet = getSheet(SHEET_NAMES.RSVP);
  ensureHeader(sheet, ["timestamp", "name", "status", "guestCount", "note", "invitationTo", "userAgent"]);

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const rows = limitRows(values.slice(1).filter(row => row.some(Boolean)).reverse(), DATA_LIMITS.RSVP);

  return rows.map(r => ({
    timestamp: normalizeDate(r[0]),
    name: r[1] || "",
    status: r[2] || "",
    guestCount: r[3] || "",
    note: r[4] || "",
    invitationTo: r[5] || ""
  }));
}

function getWishes() {
  const sheet = getSheet(SHEET_NAMES.WISHES);
  ensureHeader(sheet, ["timestamp", "name", "message", "invitationTo", "approved"]);

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const rows = limitRows(values.slice(1).filter(row => row.some(Boolean)).reverse(), DATA_LIMITS.WISHES);

  return rows
    .filter(r => r[4] !== false)
    .map(r => ({
      timestamp: normalizeDate(r[0]),
      name: r[1] || "",
      message: r[2] || "",
      invitationTo: r[3] || "",
      approved: r[4] !== false
    }));
}

function getOpens() {
  const sheet = getSheet(SHEET_NAMES.OPENS);
  ensureHeader(sheet, [
    "timestamp",
    "eventType",
    "guestName",
    "locationStatus",
    "latitude",
    "longitude",
    "accuracy",
    "mapsUrl",
    "pageUrl",
    "referrer",
    "userAgent"
  ]);

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const rows = limitRows(values.slice(1).filter(row => row.some(Boolean)).reverse(), DATA_LIMITS.OPENS);

  return rows.map(r => ({
    timestamp: normalizeDate(r[0]),
    eventType: r[1] || "",
    guestName: r[2] || "",
    locationStatus: r[3] || "",
    latitude: r[4] || "",
    longitude: r[5] || "",
    accuracy: r[6] || "",
    mapsUrl: r[7] || "",
    pageUrl: r[8] || "",
    referrer: r[9] || ""
  }));
}

function limitRows(rows, limit) {
  const max = Number(limit || 0);
  if (!max || max <= 0) return rows;
  return rows.slice(0, max);
}

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function ensureHeader(sheet, headers) {
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeader = firstRow.some(Boolean);

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function getWitaTimestamp(value) {
  const date = parseTimestampToDate(value);
  return Utilities.formatDate(date, TIME_ZONE_CONFIG.timeZone, TIME_ZONE_CONFIG.format) + " " + TIME_ZONE_CONFIG.label;
}

function parseTimestampToDate(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return value;
  }

  if (value) {
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) return parsed;
  }

  return new Date();
}

function normalizeDate(value) {
  if (!value) return "";

  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, TIME_ZONE_CONFIG.timeZone, TIME_ZONE_CONFIG.format) + " " + TIME_ZONE_CONFIG.label;
  }

  const text = String(value);
  if (text.includes("WITA")) return text;

  const parsed = new Date(text);
  if (!isNaN(parsed.getTime())) {
    return Utilities.formatDate(parsed, TIME_ZONE_CONFIG.timeZone, TIME_ZONE_CONFIG.format) + " " + TIME_ZONE_CONFIG.label;
  }

  return text;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonpResponse(callback, obj) {
  const safeCallback = String(callback).replace(/[^a-zA-Z0-9_.$]/g, "");
  return ContentService
    .createTextOutput(safeCallback + "(" + JSON.stringify(obj) + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
