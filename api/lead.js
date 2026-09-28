// Vercel Function: receives contact-form leads from the site and forwards them to
// LEAD_WEBHOOK_URL (the Google Apps Script in docs/leads-apps-script.gs, or an n8n webhook).
// LEAD_WEBHOOK_SECRET, if set, is sent along so the receiver can reject anything else.
// Without LEAD_WEBHOOK_URL set, requests are accepted but nothing is stored.
// WHATSAPP_TOKEN + WHATSAPP_PHONE_NUMBER_ID send the owner a WhatsApp message for every lead
// through Meta's official WhatsApp Cloud API. Setup steps: docs/leads-setup.md.

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

// WhatsApp template parameters can't contain newlines, tabs or long runs of spaces.
const oneLine = (value, max) => String(value || "-").replace(/\s+/g, " ").trim().slice(0, max) || "-";

// Sends the lead to the owner's WhatsApp through the WhatsApp Cloud API (Meta). With
// WHATSAPP_TEMPLATE set it uses that approved template, which works any time; without it, it
// sends plain text, which WhatsApp only delivers within 24 hours of the owner's last message to
// the sending number. Best effort: a failed notification never fails the request.
async function notifyWhatsApp(lead) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) return;

  const to = (process.env.WHATSAPP_NOTIFY_TO || "201148627137").replace(/\D/g, "");
  const version = process.env.WHATSAPP_API_VERSION || "v23.0";
  const template = process.env.WHATSAPP_TEMPLATE;

  const message = template
    ? {
        type: "template",
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "ar" },
          components: [
            {
              type: "body",
              parameters: [
                oneLine(lead.name, 100),
                oneLine(lead.email, 255),
                oneLine(lead.company, 100),
                oneLine(lead.message, 900),
                oneLine(lead.page || "/", 200),
              ].map((text) => ({ type: "text", text })),
            },
          ],
        },
      }
    : {
        type: "text",
        text: {
          body: [
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
            .join("\n"),
        },
      };

  try {
    const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to, ...message }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error("WhatsApp notify failed", response.status, await response.text());
  } catch (err) {
    console.error("WhatsApp notify failed", err);
  }
}
