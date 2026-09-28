// Vercel Function: receives contact-form leads from the site and forwards them to
// LEAD_WEBHOOK_URL (the Google Apps Script in docs/leads-apps-script.gs, or an n8n webhook).
// LEAD_WEBHOOK_SECRET, if set, is sent along so the receiver can reject anything else.
// Without LEAD_WEBHOOK_URL set, requests are accepted but nothing is stored.
// WHATSAPP_NOTIFY_APIKEY (+ WHATSAPP_NOTIFY_PHONE) sends the owner a WhatsApp message for every
// lead through CallMeBot (https://www.callmebot.com). Setup steps: docs/leads-setup.md.

const FIELD_LIMITS = { name: 100, email: 255, company: 100, message: 1000, lang: 5, page: 300, utm: 500 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "invalid_json" });
    }
  }

  const lead = {};
  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    lead[field] = String(body[field] ?? "").trim().slice(0, max);
  }
  if (!lead.name || !EMAIL_RE.test(lead.email) || !lead.message) {
    return res.status(400).json({ ok: false, error: "invalid_lead" });
  }
  lead.receivedAt = new Date().toISOString();

  const [stored] = await Promise.all([storeLead(lead), notifyWhatsApp(lead)]);
  if (stored === null) {
    return res.status(202).json({ ok: true, stored: false });
  }
  return res.status(stored ? 200 : 502).json({ ok: stored, stored });
}

// Returns null when no webhook is configured, otherwise whether the receiver accepted the lead.
async function storeLead(lead) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return null;
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, secret: process.env.LEAD_WEBHOOK_SECRET || "" }),
    });
    // Apps Script answers 200 even on its own errors, so read its { ok } too.
    const result = await response.json().catch(() => ({ ok: response.ok }));
    return response.ok && result.ok !== false;
  } catch {
    return false;
  }
}

// Best effort: a failed notification never fails the request.
async function notifyWhatsApp(lead) {
  const apikey = process.env.WHATSAPP_NOTIFY_APIKEY;
  if (!apikey) return;
  const phone = process.env.WHATSAPP_NOTIFY_PHONE || "+201148627137";
  const text = [
    "📩 طلب جديد من الموقع",
    "",
    `الاسم: ${lead.name}`,
    `الإيميل: ${lead.email}`,
    lead.company ? `الشركة: ${lead.company}` : null,
    "",
    lead.message,
    "",
    `الصفحة: ${lead.page || "/"}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
  try {
    await fetch(url, { signal: AbortSignal.timeout(8000) });
  } catch {
    // ignore
  }
}
