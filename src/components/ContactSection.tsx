import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Radio, Diamond, MessageCircle, Mail, MapPin, Linkedin, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100),
  message: z.string().trim().min(1).max(1000),
});

const WHATSAPP_NUMBER = "201148627137";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
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

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");

    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 1500);
  };

  const fields = [
    { id: "name", label: t("contact.name"), placeholder: t("contact.namePlaceholder"), type: "text", required: true },
    { id: "email", label: t("contact.email"), placeholder: t("contact.emailPlaceholder"), type: "email", required: true },
    { id: "company", label: t("contact.company"), placeholder: t("contact.companyPlaceholder"), type: "text", required: false },
  ];

  return (
    <section id="contact" className="section-gap relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="label-tech text-primary block mb-4"
            >
              {t("contact.label")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] mb-6"
            >
              {t("contact.title1")}
              <br />
              <span className="gradient-text">{t("contact.title2")}</span>
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
                <div className="w-10 h-10 glass-panel flex items-center justify-center text-primary">
                  <Radio size={16} />
                </div>
                <div>
                  <span className="label-tech text-[10px] text-muted-foreground">{t("contact.availability")}</span>
                  <div className="text-foreground text-sm font-medium">{t("contact.availabilityValue")}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass-panel flex items-center justify-center text-secondary">
                  <Diamond size={16} />
                </div>
                <div>
                  <span className="label-tech text-[10px] text-muted-foreground">{t("contact.engagement")}</span>
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
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center justify-center gap-2 w-full text-center py-4 font-label text-xs uppercase tracking-[0.2em] font-semibold bg-primary text-primary-foreground hover-glow"
            >
              <MessageCircle size={16} />
              {t("contact.whatsapp")}
            </motion.a>

            {/* Trust / Personal Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-10 pt-8 border-t border-border/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="font-headline text-sm font-bold text-primary">MW</span>
                </div>
                <div>
                  <h4 className="text-foreground font-headline font-semibold text-sm">
                    {lang === "ar" ? "محمد وحيد" : "Mohamed Waheed"}
                  </h4>
                  <span className="label-tech text-[10px] text-muted-foreground">
                    {lang === "ar" ? "مهندس أنظمة ذكاء اصطناعي" : "AI Systems Architect"}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed mb-5">
                {lang === "ar"
                  ? "أصمم وأبني أنظمة ذكاء اصطناعي تقضي على الهدر التشغيلي وتسرّع النمو."
                  : "I design and build AI systems that eliminate operational waste and accelerate growth."}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/moohamedwaheed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 glass-panel flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href="mailto:moohamedwahed@gmail.com"
                  className="w-8 h-8 glass-panel flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
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
            className="glass-panel p-8 md:p-10"
          >
            <h3 className="font-headline text-xl font-bold text-foreground mb-8">
              {t("contact.formTitle")}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="label-tech text-[10px] text-muted-foreground block mb-2">
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
                    className={`w-full bg-transparent border-b pb-3 text-foreground placeholder:text-muted-foreground/40 font-label text-sm focus:outline-none transition-colors ${
                      errors[field.id] ? "border-destructive" : "border-border/30 focus:border-primary"
                    }`}
                  />
                  {errors[field.id] && (
                    <span className="text-destructive text-xs mt-1 block">{errors[field.id]}</span>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="label-tech text-[10px] text-muted-foreground block mb-2">
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
                  className={`w-full bg-transparent border-b pb-3 text-foreground placeholder:text-muted-foreground/40 font-label text-sm focus:outline-none transition-colors resize-none ${
                    errors.message ? "border-destructive" : "border-border/30 focus:border-primary"
                  }`}
                />
                {errors.message && (
                  <span className="text-destructive text-xs mt-1 block">{errors.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 font-label text-xs uppercase tracking-[0.2em] font-semibold bg-primary text-primary-foreground transition-all flex items-center justify-center gap-2 disabled:opacity-70"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
