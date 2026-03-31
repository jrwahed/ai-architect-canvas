import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Building2,
  Factory,
  Megaphone,
  Scale,
  Coins,
  HeartPulse,
  ShoppingCart,
  Code2,
  Zap,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface IndustryData {
  icon: React.ElementType;
  labelKey: string;
  bullets: { en: string; ar: string }[];
  stats: { label: { en: string; ar: string }; value: string }[];
}

const industriesData: IndustryData[] = [
  {
    icon: Building2,
    labelKey: "industries.1",
    bullets: [
      { en: "Lead response automation under 60 seconds", ar: "رد تلقائي على العملاء خلال ٦٠ ثانية" },
      { en: "Smart broker assignment by location & load", ar: "توزيع ذكي للوسطاء حسب الموقع والحمل" },
      { en: "Full CRM pipeline tracking & follow-ups", ar: "تتبع كامل للعملاء والمتابعات" },
    ],
    stats: [
      { label: { en: "Response time", ar: "وقت الاستجابة" }, value: "<1 min" },
      { label: { en: "Lead conversion", ar: "تحويل العملاء" }, value: "+45%" },
      { label: { en: "Manual work cut", ar: "تقليل العمل اليدوي" }, value: "80%" },
    ],
  },
  {
    icon: Factory,
    labelKey: "industries.2",
    bullets: [
      { en: "Supply chain visibility & alerts", ar: "رؤية شاملة لسلسلة التوريد والتنبيهات" },
      { en: "Order processing automation", ar: "أتمتة معالجة الطلبات" },
      { en: "Inventory tracking & forecasting", ar: "تتبع المخزون والتنبؤ بالطلب" },
    ],
    stats: [
      { label: { en: "Processing time", ar: "وقت المعالجة" }, value: "-65%" },
      { label: { en: "Accuracy", ar: "الدقة" }, value: "99%" },
      { label: { en: "Cost saved", ar: "التكلفة الموفرة" }, value: "40%" },
    ],
  },
  {
    icon: Megaphone,
    labelKey: "industries.3",
    bullets: [
      { en: "Automated lead qualification & scoring", ar: "تأهيل وتقييم العملاء تلقائياً" },
      { en: "Cross-channel campaign tracking", ar: "تتبع الحملات عبر كل القنوات" },
      { en: "AI-powered client reporting", ar: "تقارير العملاء المدعومة بالذكاء الاصطناعي" },
    ],
    stats: [
      { label: { en: "Report time", ar: "وقت التقرير" }, value: "5 min" },
      { label: { en: "Lead quality", ar: "جودة العملاء" }, value: "+60%" },
      { label: { en: "Client retention", ar: "استبقاء العملاء" }, value: "92%" },
    ],
  },
  {
    icon: Scale,
    labelKey: "industries.4",
    bullets: [
      { en: "Case intake automation & triage", ar: "أتمتة استقبال القضايا وتصنيفها" },
      { en: "Document generation & management", ar: "إنشاء وإدارة المستندات تلقائياً" },
      { en: "Client communication tracking", ar: "تتبع التواصل مع العملاء" },
    ],
    stats: [
      { label: { en: "Intake speed", ar: "سرعة الاستقبال" }, value: "3x" },
      { label: { en: "Doc errors", ar: "أخطاء المستندات" }, value: "-90%" },
      { label: { en: "Billable hours", ar: "الساعات القابلة للفوترة" }, value: "+25%" },
    ],
  },
  {
    icon: Coins,
    labelKey: "industries.5",
    bullets: [
      { en: "Automated reconciliation & reporting", ar: "تسوية وتقارير مالية تلقائية" },
      { en: "Compliance monitoring & alerts", ar: "مراقبة الامتثال والتنبيهات" },
      { en: "Real-time financial dashboards", ar: "لوحات بيانات مالية لحظية" },
    ],
    stats: [
      { label: { en: "Close time", ar: "وقت الإغلاق" }, value: "-70%" },
      { label: { en: "Accuracy", ar: "الدقة" }, value: "99.5%" },
      { label: { en: "Audit ready", ar: "جاهزية المراجعة" }, value: "100%" },
    ],
  },
  {
    icon: HeartPulse,
    labelKey: "industries.6",
    bullets: [
      { en: "Patient scheduling & reminders", ar: "جدولة المرضى والتذكيرات" },
      { en: "Intake form automation", ar: "أتمتة نماذج الاستقبال" },
      { en: "Follow-up & satisfaction tracking", ar: "تتبع المتابعات ورضا المرضى" },
    ],
    stats: [
      { label: { en: "No-shows", ar: "الغياب" }, value: "-55%" },
      { label: { en: "Patient satisfaction", ar: "رضا المرضى" }, value: "96%" },
      { label: { en: "Admin time", ar: "الوقت الإداري" }, value: "-60%" },
    ],
  },
  {
    icon: ShoppingCart,
    labelKey: "industries.7",
    bullets: [
      { en: "Order fulfillment automation", ar: "أتمتة تنفيذ الطلبات" },
      { en: "Smart retargeting flows", ar: "حملات إعادة استهداف ذكية" },
      { en: "Real-time performance dashboards", ar: "لوحات أداء لحظية" },
    ],
    stats: [
      { label: { en: "Cart recovery", ar: "استرداد السلة" }, value: "+35%" },
      { label: { en: "Fulfillment speed", ar: "سرعة التنفيذ" }, value: "2x" },
      { label: { en: "ROAS", ar: "عائد الإعلانات" }, value: "+40%" },
    ],
  },
  {
    icon: Code2,
    labelKey: "industries.8",
    bullets: [
      { en: "Full-funnel tracking & activation flows", ar: "تتبع كامل للقمع وتدفقات التنشيط" },
      { en: "Churn prediction & intervention", ar: "توقع الانسحاب والتدخل المبكر" },
      { en: "Revenue analytics & MRR dashboards", ar: "تحليلات الإيرادات ولوحات MRR" },
    ],
    stats: [
      { label: { en: "Activation", ar: "التنشيط" }, value: "+50%" },
      { label: { en: "Churn", ar: "الانسحاب" }, value: "-30%" },
      { label: { en: "MRR growth", ar: "نمو MRR" }, value: "+25%" },
    ],
  },
];

const IndustriesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t, isAr, lang } = useLanguage();
  const [active, setActive] = useState(0);

  const current = industriesData[active];
  const CurrentIcon = current.icon;

  return (
    <section className="section-gap relative" ref={ref} style={{ overflowX: "hidden" }}>
      {/* Background grid — hidden on mobile for performance */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="label-tech text-primary block mb-4"
        >
          {t("industries.label")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-3"
        >
          {t("industries.title")}{" "}
          <span className="gradient-text">{t("industries.titleHighlight")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm mb-8 md:mb-12 max-w-lg"
        >
          {isAr
            ? "اختار مجالك وشوف بيشتغل إزاي"
            : "Select your industry to see how the system works for you"}
        </motion.p>

        {/* Mobile: horizontal scrollable tabs */}
        <div
          ref={tabsRef}
          className="flex md:hidden gap-3 pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {industriesData.map((ind, i) => {
            const Icon = ind.icon;
            const isActive = active === i;
            return (
              <motion.button
                key={ind.labelKey}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 + i * 0.04 }}
                onClick={(e) => {
                  setActive(i);
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`snap-start shrink-0 min-w-fit flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "border-primary/40 bg-gradient-to-r from-primary/15 to-secondary/10 shadow-[0_0_12px_-4px_hsl(var(--primary)/0.25)]"
                    : "border-border/15 bg-surface-bright/20 active:scale-95"
                }`}
              >
                <Icon
                  size={16}
                  className={`transition-colors ${isActive ? "text-primary" : "text-muted-foreground/60"}`}
                />
                <span
                  className={`text-xs font-headline font-semibold whitespace-nowrap ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t(ind.labelKey)}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-4 md:gap-8 items-start">
          {/* LEFT — Desktop: 2×4 grid */}
          <div className="hidden md:grid grid-cols-2 gap-3">
            {industriesData.map((ind, i) => {
              const Icon = ind.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={ind.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: isActive ? 1.05 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative text-start p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-primary/40 bg-primary/[0.08] scale-[1.03] shadow-[0_0_25px_-5px_hsl(var(--primary)/0.3)]"
                      : "border-border/15 bg-surface-bright/20 hover:border-primary/20 hover:bg-primary/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="industry-glow"
                      className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 blur-xl rounded-2xl pointer-events-none"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10">
                    <Icon
                      size={24}
                      className={`mb-2 transition-all duration-300 ${
                        isActive ? "text-primary scale-110" : "text-muted-foreground/60"
                      }`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span
                      className={`font-headline text-sm font-semibold block transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {t(ind.labelKey)}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT — Dynamic Preview Panel */}
          <div className="md:col-start-2 w-full max-w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-primary/15 bg-primary/[0.03] p-4 md:p-8 pb-8 w-full box-border"
              >
                {/* Glow — desktop only */}
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 blur-2xl rounded-3xl opacity-50 pointer-events-none hidden md:block" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-3 md:gap-4 mb-5 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <CurrentIcon size={20} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <span className="label-tech text-primary/60 text-[10px] block mb-1">
                        {isAr ? "النظام المخصص" : "CUSTOM SYSTEM"}
                      </span>
                      <h3 className="font-headline text-base md:text-xl font-bold text-foreground leading-tight">
                        {isAr
                          ? `كيف أبني أنظمة لـ${t(current.labelKey)}`
                          : `How I build systems for ${t(current.labelKey)}`}
                      </h3>
                    </div>
                  </div>

                  {/* Bullets */}
                  <div className="space-y-3 mb-6 md:mb-8">
                    {current.bullets.map((bullet, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isAr ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-primary/60 mt-0.5 shrink-0"
                          strokeWidth={1.5}
                        />
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {bullet[lang]}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {current.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        className="glass-panel px-2 md:px-4 py-3 text-center rounded-lg"
                      >
                        <span className="label-tech text-[9px] text-muted-foreground block mb-1">
                          {stat.label[lang]}
                        </span>
                        <span className="font-headline text-lg font-bold text-primary">
                          {stat.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom CTA hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-5 md:mt-6 flex items-center gap-2 text-muted-foreground/40 text-xs"
                  >
                    <Zap size={12} className="text-primary/40" />
                    <span>
                      {isAr
                        ? "كل نظام مبني خصيصاً لاحتياجات قطاعك"
                        : "Every system is custom-built for your industry needs"}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
