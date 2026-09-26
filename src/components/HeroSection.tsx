import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Megaphone, Sparkles, UserCheck, Timer } from "lucide-react";
import mohamedPhoto from "@/assets/mohamed-waheed.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import { WHATSAPP_URL } from "@/lib/contact";

const HeroSection = () => {
  const { t, isAr } = useLanguage();
  const reduceMotion = useReducedMotion();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const flow = [
    { icon: Megaphone, text: t("flow.s1") },
    { icon: Sparkles, text: t("flow.s2") },
    { icon: UserCheck, text: t("flow.s3") },
  ];

  return (
    <section id="hero" className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[520px] pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 50% 0%, hsl(var(--primary) / 0.10), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <motion.div
          className="lg:col-span-7"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-container px-3.5 py-1.5 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t("hero.eyebrow")}
          </p>

          <h1 className="mt-6 font-headline text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.15] tracking-tight text-balance">
            <span className="text-foreground">{t("hero.line1")} {t("hero.line2")}</span>{" "}
            <span className="text-primary">{t("hero.line3")}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {t("hero.subtitle")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={18} />
              {t("hero.cta1")}
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 font-semibold text-foreground transition-colors hover:bg-surface-container-high"
            >
              {t("hero.cta2")}
              <Arrow size={18} />
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <img
              src={mohamedPhoto}
              alt=""
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover object-top border border-border"
            />
            <p className="text-sm text-muted-foreground">{t("hero.byline")}</p>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-2xl border border-border bg-surface-container p-5 md:p-6 shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.35)]">
            <div className="flex items-center justify-between gap-3 mb-5">
              <p className="flex items-center gap-2 font-semibold text-foreground">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gain opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-gain" />
                </span>
                {t("flow.title")}
              </p>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {t("flow.example")}
              </span>
            </div>

            <ol className="space-y-2.5">
              {flow.map((step, i) => (
                <motion.li
                  key={step.text}
                  initial={reduceMotion ? false : { opacity: 0, x: isAr ? -12 : 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.35, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-xl bg-surface-container-high px-4 py-3.5"
                >
                  <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon size={18} />
                  </span>
                  <span className="text-[15px] text-foreground">{step.text}</span>
                </motion.li>
              ))}
              <motion.li
                initial={reduceMotion ? false : { opacity: 0, x: isAr ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + flow.length * 0.35, duration: 0.4 }}
                className="flex items-center justify-between gap-3 rounded-xl border border-gain/30 bg-gain/5 px-4 py-3.5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-gain/10 text-gain">
                    <Timer size={18} />
                  </span>
                  <span className="text-[15px] text-foreground">{t("flow.s4")}</span>
                </span>
                <span className="font-headline tabular-nums text-lg font-medium text-gain" dir="auto">
                  {t("flow.s4v")}
                </span>
              </motion.li>
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
