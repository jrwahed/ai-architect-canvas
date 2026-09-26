import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Radio, Diamond, MessageCircle, Mail, MapPin, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";
import { CONTACT_EMAIL, LINKEDIN_URL, WHATSAPP_NUMBER } from "@/lib/contact";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100),
  message: z.string().trim().min(1).max(1000),
});


const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [website, setWebsite] = useState("");
  const [sent, setSent] = useState<{ whatsappUrl: string; emailUrl: string } | null>(null);
  const { t, lang } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);

    const text = [
      `New Project Inquiry`,
      ``,
      `Name: ${result.data.name}`,
      `Email: ${result.data.email}`,
      result.data.company ? `Company: ${result.data.company}` : null,
      ``,
      `Challenge:`,
      result.data.message,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    const emailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `New Project Inquiry — ${result.data.name}`
    )}&body=${encodeURIComponent(text)}`;

    // Bots fill the hidden field; show the normal confirmation without sending anything.
    if (!website) {
      // Record the lead on our side so it isn't lost if WhatsApp never gets sent.
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          lang,
          page: window.location.pathname,
          utm: window.location.search,
        }),
        keepalive: true,
      }).catch(() => {});

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setSending(false);
    setSent({ whatsappUrl, emailUrl });
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", company: "", message: "" });
    setSent(null);
  };

  const fields = [
    { id: "name", label: t("contact.name"), placeholder: t("contact.namePlaceholder"), type: "text", required: true },
    { id: "email", label: t("contact.email"), placeholder: t("contact.emailPlaceholder"), type: "email", required: true },
    { id: "company", label: t("contact.company"), placeholder: t("contact.companyPlaceholder"), type: "text", required: false },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-sm font-medium text-primary block mb-3"
            >
              {t("contact.label")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-headline text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-6"
            >
              {t("contact.title1")}{" "}
              <span className="text-primary">{t("contact.title2")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground leading-relaxed mb-10"
            >
              {t("contact.desc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-border bg-surface-container flex items-center justify-center text-primary">
                  <Radio size={16} />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("contact.availability")}</span>
                  <div className="text-foreground text-sm font-medium">{t("contact.availabilityValue")}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-border bg-surface-container flex items-center justify-center text-primary">
                  <Diamond size={16} />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("contact.engagement")}</span>
                  <div className="text-foreground text-sm font-medium">{t("contact.engagementValue")}</div>
                </div>
              </div>
            </motion.div>

            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center justify-center gap-2 w-full text-center py-4 rounded-xl text-base font-semibold bg-primary text-primary-foreground"
            >
              <MessageCircle size={16} />
              {t("contact.whatsapp")}
            </motion.a>

            {/* Trust / Personal Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-10 pt-8 border-t border-border"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="font-headline text-sm font-bold text-primary">MW</span>
                </div>
                <div>
                  <h4 className="text-foreground font-headline font-semibold text-sm">
                    {lang === "ar" ? "محمد وحيد" : "Mohamed Waheed"}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {lang === "ar" ? "مهندس أنظمة ذكاء اصطناعي" : "AI Systems Architect"}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {lang === "ar"
                  ? "أصمم وأبني أنظمة ذكاء اصطناعي تقضي على الهدر التشغيلي وتسرّع النمو."
                  : "I design and build AI systems that eliminate operational waste and accelerate growth."}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail size={14} />
                </a>
                <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <MapPin size={12} />
                  {lang === "ar" ? "مصر والخليج" : "Egypt & Gulf"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-2xl border border-border bg-surface-container p-6 md:p-8 relative"
          >
            <h3 className="font-headline text-xl font-semibold text-foreground mb-6">
              {t("contact.formTitle")}
            </h3>

            {sent ? (
              <div className="space-y-6" role="status" aria-live="polite">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold">{t("contact.sentTitle")}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-2">{t("contact.sentDesc")}</p>
                  </div>
                </div>
                <a
                  href={sent.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl text-base font-semibold bg-primary text-primary-foreground flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} />
                  {t("contact.sentWhatsapp")}
                </a>
                <a
                  href={sent.emailUrl}
                  className="w-full py-4 rounded-xl text-base font-semibold border border-border text-foreground flex items-center justify-center gap-2"
                >
                  <Mail size={14} />
                  {t("contact.sentEmail")}
                </a>
                <p className="text-muted-foreground text-xs text-center">
                  {CONTACT_EMAIL} · +{WHATSAPP_NUMBER}
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  {t("contact.sentReset")}
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />
              {fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="text-sm text-muted-foreground block mb-2">
                    {field.label}{field.required && <span className="text-primary"> *</span>}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, [field.id]: e.target.value }));
                      if (errors[field.id]) setErrors((prev) => ({ ...prev, [field.id]: "" }));
                    }}
                    className={`w-full rounded-lg border bg-surface-container-low px-3.5 py-3 text-foreground placeholder:text-muted-foreground/60 text-base focus:outline-none transition-colors ${
                      errors[field.id] ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {errors[field.id] && (
                    <span className="text-destructive text-xs mt-1 block">{errors[field.id]}</span>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="text-sm text-muted-foreground block mb-2">
                  {t("contact.message")}<span className="text-primary"> *</span>
                </label>
                <textarea
                  id="message"
                  placeholder={t("contact.messagePlaceholder")}
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, message: e.target.value }));
                    if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                  }}
                  className={`w-full rounded-lg border bg-surface-container-low px-3.5 py-3 text-foreground placeholder:text-muted-foreground/60 text-base focus:outline-none transition-colors resize-none ${
                    errors.message ? "border-destructive" : "border-border focus:border-primary"
                  }`}
                />
                {errors.message && (
                  <span className="text-destructive text-xs mt-1 block">{errors.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-base font-semibold bg-primary text-primary-foreground transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {sending ? (
                  <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    {t("contact.submit")}
                  </>
                )}
              </motion.button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
