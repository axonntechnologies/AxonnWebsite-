/**
 * Axonn website — contact form handler.
 * Appends each submission to the Sheet and emails it to NOTIFY_EMAIL.
 *
 * After ANY edit here you MUST publish a new version:
 *   Deploy -> Manage deployments -> (pencil / Edit) -> Version: New version -> Deploy
 * The /exec URL stays the same. Without this the old code keeps running.
 */

var NOTIFY_EMAIL = "axonntechnologies@gmail.com";
var SHEET_NAME = "Submissions";
var SHEET_ID = "1LU0ugeeU0YWSD658-zH05aCyee18vvDO2gNqy5OTIgc";

function doGet(e) {
  return handle(e);
}

function doPost(e) {
  return handle(e);
}

function handle(e) {
  var p = parseBody(e);

  var name = String(p.name || "").trim();
  var email = String(p.email || "").trim();
  var countryCode = String(p.countryCode || "").trim();
  var phone = String(p.phone || "").trim();
  var subject = String(p.subject || "").trim();
  var message = String(p.message || "").trim();

  // No fields -> someone just opened the URL. Report status, don't log a row.
  if (!name && !email && !phone && !subject && !message) {
    return ContentService.createTextOutput("Axonn contact endpoint is live.");
  }

  try {
    var fullPhone = (countryCode + " " + phone).trim();

    var sheet = getSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Subject", "Message"]);
    }
    sheet.appendRow([
      new Date(),
      safe(name),
      safe(email),
      safe(fullPhone),
      safe(subject),
      safe(message)
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email || NOTIFY_EMAIL,
      subject: "New contact form submission" + (subject ? ": " + subject : ""),
      body:
        "Name:    " + name + "\n" +
        "Email:   " + email + "\n" +
        "Phone:   " + fullPhone + "\n" +
        "Subject: " + subject + "\n\n" +
        "Message:\n" + message + "\n\n" +
        "----\nSent from the Axonn website contact form."
    });

    return json({ ok: true });
  } catch (err) {
    MailApp.sendEmail(NOTIFY_EMAIL, "Axonn contact form ERROR", String(err));
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  var ss = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("No spreadsheet. Set SHEET_ID at the top of the script.");
  }
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

/** Fields from query string / form params, with JSON + urlencoded body fallbacks. */
function parseBody(e) {
  if (e && e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }
  if (e && e.postData && e.postData.contents) {
    var raw = e.postData.contents;
    try {
      return JSON.parse(raw);
    } catch (_) {}
    var out = {};
    raw.split("&").forEach(function (pair) {
      var kv = pair.split("=");
      if (kv[0]) {
        out[decodeURIComponent(kv[0])] =
          decodeURIComponent((kv[1] || "").replace(/\+/g, " "));
      }
    });
    return out;
  }
  return {};
}

/** Stop Sheets treating "+91...", "=x", "-x", "@x" as a formula. */
function safe(v) {
  var s = String(v == null ? "" : v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
