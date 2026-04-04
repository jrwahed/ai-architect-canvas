import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Car, Users, BarChart3, TrendingUp, MessageCircle, Shield,
  ChevronDown, ChevronRight, Play, Zap, Target, Brain,
  ArrowRight, Check, Star, Building2, UserCheck, Megaphone,
  Layers, RefreshCw, FileText, Phone, MapPin, Clock,
  AlertTriangle, Eye, Gauge, Sparkles, Package,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDriveLeadT } from "@/data/driveLeadTranslations";
import { Link } from "react-router-dom";

/* ─── Reusable animated section wrapper ─── */
const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

/* ─── Animated counter ─── */
const Counter = ({ value, className = "" }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value.replace(/[^0-9]/g, ""));
  const prefix = value.match(/^[^0-9]*/)?.[0] || "";
  const suffix = value.match(/[^0-9]*$/)?.[0] || "";
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || isNaN(num)) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * num));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, num]);

  if (isNaN(num)) return <span ref={ref} className={className}>{value}</span>;
  return <span ref={ref} className={className}>{prefix}{display.toLocaleString()}{suffix}</span>;
};

/* ─── Main Page ─── */
const DriveLead = () => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const t = useDriveLeadT(lang);
  const dir = isAr ? "rtl" : "ltr";

  useEffect(() => {
    document.title = "DriveLead — AI-Powered Car Dealership System";
    return () => {
      document.title = "Mohamed Waheed | AI-Powered Growth Systems Builder";
    };
  }, []);

  return (
    <div dir={dir} className={`bg-background text-foreground overflow-x-hidden ${isAr ? "font-[IBM_Plex_Sans_Arabic]" : ""}`}>
      {/* ─── Navbar ─── */}
      <DriveLeadNav isAr={isAr} t={t} />

      {/* ─── Hero ─── */}
      <HeroSection t={t} isAr={isAr} />

      {/* ─── Pain ─── */}
      <PainSection t={t} isAr={isAr} />

      {/* ─── Video ─── */}
      <VideoSection t={t} isAr={isAr} />

      {/* ─── How It Works ─── */}
      <HowItWorksSection t={t} isAr={isAr} />

      {/* ─── Features ─── */}
      <FeaturesSection t={t} isAr={isAr} />

      {/* ─── Target Audience ─── */}
      <TargetSection t={t} isAr={isAr} />

      {/* ─── Integrations ─── */}
      <IntegrationsSection t={t} isAr={isAr} />

      {/* ─── Metrics ─── */}
      <MetricsSection t={t} isAr={isAr} />

      {/* ─── Testimonials ─── */}
      <TestimonialsSection t={t} isAr={isAr} />

      {/* ─── Pricing ─── */}
      <PricingSection t={t} isAr={isAr} />

      {/* ─── FAQ ─── */}
      <FAQSection t={t} isAr={isAr} />

      {/* ─── Final CTA ─── */}
      <FinalCTASection t={t} isAr={isAr} />

      {/* ─── Footer ─── */}
      <DriveLeadFooter t={t} isAr={isAr} />
    </div>
  );
};

export default DriveLead;

/* ════════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ════════════════════════════════════════════════════════════ */

interface SectionProps {
  t: (key: string) => string;
  isAr: boolean;
}

/* ─── Navbar ─── */
const DriveLeadNav = ({ isAr, t }: SectionProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { toggle, lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-panel" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2">
          <Car size={20} className="text-primary" />
          <span className="font-headline text-lg font-bold text-primary text-glow-primary">DriveLead</span>
        </a>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-label uppercase tracking-wider text-muted-foreground hover:text-foreground ghost-border transition-colors"
          >
            <span>{lang === "en" ? "AR" : "EN"}</span>
          </motion.button>
          <Link
            to="/"
            className="hidden md:inline-flex px-4 py-2 text-xs font-label uppercase tracking-[0.15em] font-semibold ghost-border text-muted-foreground hover:text-foreground transition-all"
          >
            MW
          </Link>
          <motion.a
            href="https://wa.me/201148627137"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px -5px hsl(184 100% 68% / 0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 text-xs font-label uppercase tracking-[0.15em] bg-primary text-primary-foreground font-semibold"
          >
            {t("hero.cta1")}
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

/* ─── Hero Section ─── */
const HeroSection = ({ t, isAr }: SectionProps) => {
  const pipelineStages = [
    t("pipeline.1"), t("pipeline.2"), t("pipeline.3"),
    t("pipeline.4"), t("pipeline.5"), t("pipeline.6"),
  ];
  const stats = [
    { v: t("hero.stat1v"), l: t("hero.stat1l") },
    { v: t("hero.stat2v"), l: t("hero.stat2l") },
    { v: t("hero.stat3v"), l: t("hero.stat3l") },
    { v: t("hero.stat4v"), l: t("hero.stat4l") },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hud-grid opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(184 100% 68% / 0.15), transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px neon-line opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-8"
        >
          <span className="status-dot" />
          <span className="label-tech text-primary text-[11px]">{t("hero.badge")}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl"
        >
          <span className="text-foreground">{t("hero.title1")}</span>
          <br />
          <span className="gradient-text">{t("hero.title2")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-6 leading-relaxed"
        >
          {t("hero.desc")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-muted-foreground/70 mt-3"
        >
          {t("hero.experience")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <motion.a
            href="https://wa.me/201148627137"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground inline-flex items-center gap-2"
          >
            {t("hero.cta1")}
            <ArrowRight size={14} />
          </motion.a>
          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold ghost-border text-foreground inline-flex items-center gap-2 hover:border-primary/40 transition-colors"
          >
            {t("hero.cta2")}
          </motion.a>
        </motion.div>

        {/* Pipeline stages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 overflow-hidden"
        >
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2">
            {pipelineStages.map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 md:gap-3 shrink-0"
              >
                <div className="glass-panel px-3 py-2 label-tech text-[10px] md:text-xs whitespace-nowrap text-primary">
                  {stage}
                </div>
                {i < pipelineStages.length - 1 && (
                  <ChevronRight size={14} className="text-primary/40 shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="glass-panel p-4 md:p-5 text-center"
            >
              <div className="font-headline text-2xl md:text-3xl font-bold gradient-text">
                <Counter value={stat.v} />
              </div>
              <div className="label-tech text-[10px] mt-1 text-muted-foreground">{stat.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Pain Section ─── */
const PainSection = ({ t }: SectionProps) => {
  const problems = [
    { icon: AlertTriangle, key: "1" },
    { icon: Users, key: "2" },
    { icon: Eye, key: "3" },
    { icon: Clock, key: "4" },
    { icon: Gauge, key: "5" },
  ];

  return (
    <Section id="pain" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">// {t("pain.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground max-w-3xl">
        {t("pain.title")}
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mt-4 leading-relaxed">
        {t("pain.desc")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {problems.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group rounded-xl p-5 md:p-6 hover:border-l-2 hover:border-l-destructive/60 transition-all duration-300"
            style={{
              background: "hsl(var(--surface-container) / 0.5)",
              border: "1px solid hsl(var(--outline-variant) / 0.12)",
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
              <p.icon size={18} className="text-destructive" />
            </div>
            <h3 className="font-headline text-base font-semibold text-foreground mb-2">
              {t(`pain.${p.key}.title`)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(`pain.${p.key}.desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ─── Video Section ─── */
const VideoSection = ({ t }: SectionProps) => (
  <Section id="video" className="py-24 md:py-32 max-w-5xl mx-auto px-6 md:px-12 text-center">
    <p className="label-tech text-primary text-[11px] mb-4">// {t("video.label")}</p>
    <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
      {t("video.title")}
    </h2>
    <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-4">
      {t("video.desc")}
    </p>

    {/* Video placeholder */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mt-10 rounded-2xl overflow-hidden aspect-video"
      style={{
        background: "linear-gradient(135deg, hsl(var(--surface-container)), hsl(var(--surface-container-high)))",
        border: "1px solid hsl(var(--outline-variant) / 0.2)",
      }}
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 hud-grid opacity-20" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center cursor-pointer group"
          style={{ border: "2px solid hsl(var(--primary) / 0.4)" }}
        >
          <Play size={28} className="text-primary group-hover:text-foreground transition-colors ms-1" />
        </motion.div>
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-4 right-4 glass-panel px-3 py-1.5">
        <span className="label-tech text-[10px] text-muted-foreground">2:14</span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-primary/30" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/30" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-primary/30" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-primary/30" />
    </motion.div>
  </Section>
);

/* ─── How It Works ─── */
const HowItWorksSection = ({ t, isAr }: SectionProps) => {
  const steps = ["1", "2", "3", "4", "5"];
  const stepIcons = [Zap, Brain, UserCheck, Package, Sparkles];

  return (
    <Section id="how-it-works" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">// {t("how.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground max-w-3xl">
        {t("how.title")}
      </h2>

      <div className="mt-14 space-y-8">
        {steps.map((s, i) => {
          const Icon = stepIcons[i];
          const highlightKey = `how.${s}.highlight`;
          const highlight = t(highlightKey);
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: isAr ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-5 md:gap-8 items-start"
            >
              {/* Step number + line */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center" style={{ border: "1px solid hsl(var(--primary) / 0.3)" }}>
                  <Icon size={20} className="text-primary" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-full min-h-[40px] mt-2" style={{ background: "linear-gradient(180deg, hsl(var(--primary) / 0.3), transparent)" }} />
                )}
              </div>

              {/* Content */}
              <div className="pb-6">
                <span className="label-tech text-primary text-[10px] mb-1 block">
                  {isAr ? `الخطوة 0${i + 1}` : `STEP 0${i + 1}`}
                </span>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2">
                  {t(`how.${s}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                  {t(`how.${s}.desc`)}
                </p>
                {highlight !== highlightKey && (
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "hsl(var(--primary) / 0.06)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                    <Zap size={14} className="text-primary shrink-0" />
                    <span className="text-sm text-primary font-medium">{highlight}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

/* ─── Features Section ─── */
const FeaturesSection = ({ t, isAr }: SectionProps) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { key: "crm", icon: Users, color: "primary" },
    { key: "inv", icon: Package, color: "primary" },
    { key: "trade", icon: RefreshCw, color: "primary" },
    { key: "dash", icon: BarChart3, color: "primary" },
    { key: "ads", icon: Megaphone, color: "primary" },
    { key: "sales", icon: TrendingUp, color: "primary" },
    { key: "pipe", icon: Layers, color: "primary" },
    { key: "report", icon: FileText, color: "primary" },
    { key: "mind", icon: Brain, color: "secondary" },
    { key: "wa", icon: MessageCircle, color: "primary" },
  ];

  const feat = features[activeFeature];

  return (
    <Section id="features" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">// {t("feat.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground max-w-3xl">
        {t("feat.title")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        {/* Feature tabs - sidebar */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2 lg:pb-0">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isActive = i === activeFeature;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFeature(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-start whitespace-nowrap lg:whitespace-normal transition-all duration-300 shrink-0 ${
                  isActive
                    ? "bg-primary/10 border-primary/30"
                    : "hover:bg-[hsl(var(--surface-container)/0.5)]"
                }`}
                style={{
                  border: isActive ? "1px solid hsl(var(--primary) / 0.3)" : "1px solid transparent",
                }}
              >
                <Icon size={16} className={isActive ? "text-primary" : "text-muted-foreground"} />
                <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {t(`feat.${f.key}.title`)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature detail */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={feat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "hsl(var(--surface-container) / 0.5)",
                border: "1px solid hsl(var(--outline-variant) / 0.15)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feat.color === "secondary" ? "bg-secondary/10" : "bg-primary/10"}`}>
                  <feat.icon size={20} className={feat.color === "secondary" ? "text-secondary" : "text-primary"} />
                </div>
                <div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground">
                    {t(`feat.${feat.key}.title`)}
                  </h3>
                  <p className="text-sm text-primary">{t(`feat.${feat.key}.subtitle`)}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mt-4">
                {t(`feat.${feat.key}.desc`)}
              </p>

              {/* CRM-specific: lead types */}
              {feat.key === "crm" && (
                <div className="mt-6 space-y-3">
                  {["hot", "warm", "cold"].map((type) => (
                    <div
                      key={type}
                      className="flex items-start gap-3 p-3 rounded-lg"
                      style={{ background: "hsl(var(--surface-container-high) / 0.5)" }}
                    >
                      <span className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                        type === "hot" ? "bg-green-400" : type === "warm" ? "bg-yellow-400" : "bg-blue-400"
                      }`} />
                      <span className="text-sm text-muted-foreground">{t(`feat.crm.${type}`)}</span>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {["stat1", "stat2", "stat3"].map((s) => (
                      <span key={s} className="glass-panel px-3 py-1.5 label-tech text-[10px] text-primary">
                        {t(`feat.crm.${s}`)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Inventory-specific: statuses */}
              {feat.key === "inv" && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {["available", "reserved", "sold", "transit"].map((s) => (
                    <div key={s} className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "hsl(var(--surface-container-high) / 0.5)" }}>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        s === "available" ? "bg-green-400" : s === "reserved" ? "bg-yellow-400" : s === "sold" ? "bg-primary" : "bg-orange-400"
                      }`} />
                      <span className="text-xs text-muted-foreground">{t(`feat.inv.${s}`)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* DriveMind-specific: scores */}
              {feat.key === "mind" && (
                <div className="mt-6 space-y-3">
                  {["score1", "score2", "score3", "score4"].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className="w-full bg-[hsl(var(--surface-container-high))] rounded-full h-2 flex-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15, duration: 0.8 }}
                          className="h-2 rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap min-w-[140px]">
                        {t(`feat.mind.${s}`)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

/* ─── Target Audience ─── */
const TargetSection = ({ t }: SectionProps) => {
  const personas = [
    { key: "1", icon: Building2 },
    { key: "2", icon: UserCheck },
    { key: "3", icon: Users },
    { key: "4", icon: Megaphone },
  ];

  return (
    <Section id="target" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">// {t("target.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground max-w-3xl">
        {t("target.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
        {personas.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 group"
            style={{
              background: "hsl(var(--surface-container) / 0.5)",
              border: "1px solid hsl(var(--outline-variant) / 0.12)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <p.icon size={18} className="text-primary" />
              </div>
              <h3 className="font-headline text-base md:text-lg font-semibold text-foreground">
                {t(`target.${p.key}.title`)}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(`target.${p.key}.desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ─── Integrations ─── */
const IntegrationsSection = ({ t }: SectionProps) => {
  const platforms = [
    "Facebook Ads", "Instagram", "Google Ads", "OLX",
    "ContactCars", "Hatla2ee", "WhatsApp", "Phone", "Walk-in",
  ];

  return (
    <Section className="py-24 md:py-32 max-w-5xl mx-auto px-6 md:px-12 text-center">
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
        {t("int.title")}
      </h2>
      <p className="text-muted-foreground text-lg mt-4">{t("int.subtitle")}</p>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10">
        {platforms.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.05, borderColor: "hsl(184 100% 68% / 0.4)" }}
            className="glass-panel px-5 py-3 label-tech text-sm text-foreground/80 cursor-default"
          >
            {p}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ─── Metrics ─── */
const MetricsSection = ({ t }: SectionProps) => {
  const metrics = ["1", "2", "3", "4", "5"];

  return (
    <Section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, hsl(var(--primary) / 0.03), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
          {t("metrics.title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-5 md:p-6"
            >
              <div className="font-headline text-3xl md:text-4xl font-bold gradient-text">
                <Counter value={t(`metrics.${m}v`)} />
              </div>
              <div className="label-tech text-[10px] mt-2 text-muted-foreground">{t(`metrics.${m}l`)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ─── Testimonials ─── */
const TestimonialsSection = ({ t }: SectionProps) => {
  const testimonials = ["1", "2", "3"];

  return (
    <Section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground text-center">
        {t("test.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((idx, i) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{
              background: "hsl(var(--surface-container) / 0.5)",
              border: "1px solid hsl(var(--outline-variant) / 0.15)",
            }}
          >
            {/* Stars */}
            <div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={14} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                "{t(`test.${idx}.quote`)}"
              </p>
            </div>

            <div className="mt-6 pt-4" style={{ borderTop: "1px solid hsl(var(--outline-variant) / 0.1)" }}>
              <div className="font-headline text-sm font-semibold text-foreground">{t(`test.${idx}.name`)}</div>
              <div className="label-tech text-[10px] text-muted-foreground mt-0.5">{t(`test.${idx}.role`)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

/* ─── Pricing ─── */
const PricingSection = ({ t }: SectionProps) => {
  const plans = [
    {
      key: "free",
      features: ["f1", "f2", "f3", "f4", "f5"],
      highlight: false,
    },
    {
      key: "pro",
      features: ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"],
      highlight: true,
    },
    {
      key: "ent",
      features: ["f1", "f2", "f3", "f4", "f5", "f6", "f7"],
      highlight: false,
    },
  ];

  return (
    <Section id="pricing" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 text-center">
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
        {t("price.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`rounded-2xl p-6 md:p-8 flex flex-col relative ${plan.highlight ? "scale-[1.02]" : ""}`}
            style={{
              background: plan.highlight
                ? "linear-gradient(135deg, hsl(var(--surface-container) / 0.8), hsl(var(--primary) / 0.05))"
                : "hsl(var(--surface-container) / 0.5)",
              border: plan.highlight
                ? "1px solid hsl(var(--primary) / 0.3)"
                : "1px solid hsl(var(--outline-variant) / 0.15)",
            }}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground label-tech text-[10px] rounded-full">
                {t("price.popular")}
              </div>
            )}

            <h3 className="font-headline text-xl font-bold text-foreground mt-2">
              {t(`price.${plan.key}.name`)}
            </h3>
            <div className="font-headline text-2xl md:text-3xl font-bold gradient-text mt-2">
              {t(`price.${plan.key}.price`)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {t(`price.${plan.key}.desc`)}
            </p>

            <ul className="space-y-2.5 mt-6 text-start flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="text-primary shrink-0 mt-0.5" />
                  {t(`price.${plan.key}.${f}`)}
                </li>
              ))}
            </ul>

            <motion.a
              href="https://wa.me/201148627137"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: plan.highlight ? "0 0 25px -5px hsl(184 100% 68% / 0.4)" : "none" }}
              whileTap={{ scale: 0.97 }}
              className={`mt-6 py-3 font-label text-xs uppercase tracking-[0.15em] font-semibold text-center block ${
                plan.highlight
                  ? "bg-primary text-primary-foreground"
                  : "ghost-border text-foreground hover:border-primary/30"
              }`}
            >
              {plan.key === "free" ? t("price.cta") : t("price.ctaPro")}
            </motion.a>
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mt-8">{t("price.noContract")}</p>
    </Section>
  );
};

/* ─── FAQ ─── */
const FAQSection = ({ t }: SectionProps) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <Section id="faq" className="py-24 md:py-32 max-w-3xl mx-auto px-6 md:px-12">
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground text-center">
        {t("faq.title")}
      </h2>

      <div className="mt-12 space-y-3">
        {faqs.map((idx, i) => {
          const isOpen = openIdx === i;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: "hsl(var(--surface-container) / 0.5)",
                border: isOpen
                  ? "1px solid hsl(var(--primary) / 0.2)"
                  : "1px solid hsl(var(--outline-variant) / 0.12)",
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-start"
              >
                <span className="font-headline text-sm md:text-base font-medium text-foreground">
                  {t(`faq.${idx}.q`)}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-muted-foreground shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {t(`faq.${idx}.a`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

/* ─── Final CTA ─── */
const FinalCTASection = ({ t }: SectionProps) => (
  <Section className="py-24 md:py-32 relative overflow-hidden">
    {/* Glow background */}
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(184 100% 68% / 0.05), transparent 70%)" }} />
    <div className="absolute bottom-0 left-0 right-0 h-px neon-line opacity-40" />

    <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
      <p className="label-tech text-primary text-[11px] mb-4">// {t("cta.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
        {t("cta.title")}
      </h2>
      <p className="font-headline text-xl md:text-2xl font-bold gradient-text mt-2">
        {t("cta.subtitle")}
      </p>
      <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
        {t("cta.desc")}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <motion.a
          href="https://wa.me/201148627137"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.5)" }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground inline-flex items-center gap-2"
        >
          {t("cta.btn1")}
          <ArrowRight size={14} />
        </motion.a>
        <motion.a
          href="https://wa.me/201148627137"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold ghost-border text-foreground inline-flex items-center gap-2 hover:border-primary/40 transition-colors"
        >
          <MessageCircle size={14} />
          {t("cta.btn2")}
        </motion.a>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {["trust1", "trust2", "trust3"].map((k) => (
          <div key={k} className="flex items-center gap-2">
            <Check size={14} className="text-primary" />
            <span className="text-sm text-muted-foreground">{t(`cta.${k}`)}</span>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

/* ─── Footer ─── */
const DriveLeadFooter = ({ t }: SectionProps) => {
  const links = ["home", "about", "platform", "pricing", "contact"];

  return (
    <footer className="py-12 max-w-7xl mx-auto px-6 md:px-12" style={{ borderTop: "1px solid hsl(var(--outline-variant) / 0.1)" }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Car size={18} className="text-primary" />
          <span className="font-headline text-sm font-bold text-primary">{t("foot.tagline")}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {links.map((l) => (
            <a
              key={l}
              href={l === "home" ? "#hero" : l === "pricing" ? "#pricing" : l === "contact" ? "https://wa.me/201148627137" : `#${l}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(`foot.${l}`)}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6" style={{ borderTop: "1px solid hsl(var(--outline-variant) / 0.08)" }}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span>{t("foot.location")}</span>
        </div>
        <span className="text-xs text-muted-foreground/60">{t("foot.copy")}</span>
      </div>
    </footer>
  );
};
