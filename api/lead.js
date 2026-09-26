// Vercel Function: receives contact-form leads from the site and forwards them to
// LEAD_WEBHOOK_URL (e.g. an n8n webhook that writes to a Sheet/CRM and notifies you).
// Without LEAD_WEBHOOK_URL set, requests are accepted but nothing is stored.

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

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(202).json({ ok: true, stored: false });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    return res.status(response.ok ? 200 : 502).json({ ok: response.ok, stored: response.ok });
  } catch {
    return res.status(502).json({ ok: false, stored: false });
  }
}
