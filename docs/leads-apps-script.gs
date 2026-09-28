/**
 * Google Apps Script: receives leads from the website's /api/lead and
 * 1) adds a row to the "Leads" sheet, 2) emails a notification.
 * Setup steps (in Arabic): docs/leads-setup.md
 */

// The same value you put in LEAD_WEBHOOK_SECRET on Vercel.
const SECRET = "PUT-THE-SAME-SECRET-HERE";
// Where the notification email goes.
const NOTIFY_EMAIL = "moohamedwahed@gmail.com";
const SHEET_NAME = "Leads";
const HEADERS = ["Received at", "Name", "Email", "Company", "Message", "Language", "Page", "UTM"];

function doPost(e) {
  let lead;
  try {
    lead = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "invalid_json" });
  }
  if (lead.secret !== SECRET) {
    return reply({ ok: false, error: "unauthorized" });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([
    lead.receivedAt || new Date().toISOString(),
    lead.name || "",
    lead.email || "",
    lead.company || "",
    lead.message || "",
    lead.lang || "",
    lead.page || "",
    lead.utm || "",
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: lead.email || NOTIFY_EMAIL,
    subject: "طلب جديد من الموقع: " + (lead.name || "") + (lead.company ? " · " + lead.company : ""),
    body:
      "الاسم: " + (lead.name || "") + "\n" +
      "الإيميل: " + (lead.email || "") + "\n" +
      "الشركة: " + (lead.company || "") + "\n\n" +
      (lead.message || "") + "\n\n" +
      "الصفحة: " + (lead.page || "") + "\n" +
      "الشيت: " + ss.getUrl(),
  });

  return reply({ ok: true });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
