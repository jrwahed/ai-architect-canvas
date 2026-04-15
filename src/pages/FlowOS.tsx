import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Bot, BarChart3, Users, TrendingUp, TrendingDown,
  Clock, Database, Building2, Megaphone, Zap, Layers,
  CheckCircle2, DollarSign, MessageCircle, Inbox,
  Car, ArrowRight, RefreshCw, Check, ChevronRight, User,
  Brain, Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFlowOST } from "@/data/flowOSTranslations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Reusable section wrapper with inView ─── */
const S = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
const Counter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value.replace(/[^0-9]/g, ""));
  const prefix = value.match(/^[^0-9]*/)?.[0] || "";
  const suffix = value.match(/[^0-9]*$/)?.[0] || "";
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView || isNaN(num)) return;
    let frame: number;
    const dur = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, num]);
  if (isNaN(num)) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
};

interface SP { t: (k: string) => string; isAr: boolean; }

/* ════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════ */
const FlowOS = () => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const t = useFlowOST(lang);

  useEffect(() => {
    document.title = "FlowOS — AI CRM & Automation Platform";
    return () => { document.title = "Mohamed Waheed | AI-Powered Growth Systems Builder"; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`bg-background text-foreground overflow-x-hidden ${isAr ? "font-[IBM_Plex_Sans_Arabic]" : ""}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <Navbar />
      <HeroSection t={t} isAr={isAr} />
      <ProblemSection t={t} isAr={isAr} />
      <SolutionSection t={t} isAr={isAr} />
      <AutomationSection t={t} isAr={isAr} />
      <DashboardSection t={t} isAr={isAr} />
      <CRMSection t={t} isAr={isAr} />
      <ScoringSection t={t} isAr={isAr} />
      <FlowMindSection t={t} isAr={isAr} />
      <ReportsSection t={t} isAr={isAr} />
      <MoreCapabilitiesSection t={t} isAr={isAr} />
      <IndustriesSection t={t} isAr={isAr} />
      <ReadyCTASection t={t} isAr={isAr} />
      <FinalCTASection t={t} isAr={isAr} />
      <Footer />
    </motion.div>
  );
};

export default FlowOS;

/* ════════════════════════════════════════
   SECTION 1 — HERO
   ════════════════════════════════════════ */
const HeroSection = ({ t, isAr }: SP) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    setMouse({ x: (clientX / width - 0.5) * 2, y: (clientY / height - 0.5) * 2 });
  };

  const pipes = [t("hero.pipe1"), t("hero.pipe2"), t("hero.pipe3"), t("hero.pipe4"), t("hero.pipe5"), t("hero.pipe6")];
  const stats = [
    { v: t("hero.stat1v"), l: t("hero.stat1l") },
    { v: t("hero.stat2v"), l: t("hero.stat2l") },
    { v: t("hero.stat3v"), l: t("hero.stat3l") },
    { v: t("hero.stat4v"), l: t("hero.stat4l") },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      onMouseMove={handleMouse}
    >
      <div className="absolute inset-0 hud-grid opacity-30" />
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none transition-transform duration-700"
        style={{
          background: "radial-gradient(circle, hsl(184 100% 68% / 0.15), transparent 70%)",
          top: "20%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px neon-line opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Badge — amber tint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded"
          style={{ background: "hsl(45 100% 60% / 0.08)", border: "1px solid hsl(45 100% 60% / 0.25)" }}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400" style={{ boxShadow: "0 0 8px hsl(45 100% 60% / 0.6)", animation: "pulse-glow 2s ease infinite" }} />
          <span className="label-tech text-amber-300 text-[11px]">{t("hero.badge")}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl"
        >
          <span className="text-muted-foreground">{t("hero.line1")}</span><br />
          <span className="text-muted-foreground">{t("hero.line2")}</span><br />
          <span className="gradient-text">{t("hero.line3")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-6 leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 mt-8">
          <motion.a
            href="https://wa.me/201148627137?text=%D8%B9%D8%A7%D9%88%D8%B2%20%D8%A3%D8%B9%D8%B1%D9%81%20%D8%A7%D9%84%D8%B3%D8%B9%D8%B1%20%D9%88%D8%A3%D8%B4%D9%88%D9%81%20FlowOS"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground inline-flex items-center gap-2"
          >
            {t("hero.cta1")}
          </motion.a>
          <Link to="/">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold ghost-border text-foreground inline-flex items-center gap-2 hover:border-primary/40 transition-colors"
            >
              {t("hero.cta2")}
            </motion.span>
          </Link>
        </motion.div>

        {/* Urgency text */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="label-tech text-amber-400 text-[11px] mt-4">
          {t("hero.urgency")}
        </motion.p>

        {/* Pipeline chips */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="mt-10 overflow-hidden">
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2">
            {pipes.map((stage, i) => (
              <motion.div key={stage} initial={{ opacity: 0, x: isAr ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 + i * 0.1 }} className="flex items-center gap-2 md:gap-3 shrink-0">
                <div className="glass-panel px-3 py-2 label-tech text-[10px] md:text-xs whitespace-nowrap text-primary">{stage}</div>
                {i < pipes.length - 1 && <ChevronRight size={14} className="text-primary/40 shrink-0" />}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10">
          {stats.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * 0.1 }} className="glass-panel p-4 md:p-5 text-center">
              <div className="font-headline text-2xl md:text-3xl font-bold gradient-text"><Counter value={s.v} /></div>
              <div className="label-tech text-[10px] mt-1 text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════
   SECTION 2 — PROBLEM
   ════════════════════════════════════════ */
const ProblemSection = ({ t, isAr }: SP) => {
  const icons = [Inbox, Clock, TrendingDown, Users, BarChart3];
  const cards = ["1", "2", "3", "4", "5"];
  return (
    <S id="problem" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-destructive text-[11px] mb-4">{t("problem.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">{t("problem.title")}</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mt-4 leading-relaxed">{t("problem.subtitle")}</p>

      <div className="space-y-5 mt-12 max-w-3xl">
        {cards.map((c, i) => {
          const Icon = icons[i];
          const fromRight = i % 2 !== 0;
          return (
            <motion.div
              key={c}
              initial={{ opacity: 0, x: fromRight ? (isAr ? -60 : 60) : (isAr ? 60 : -60) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-xl p-5 md:p-6 ${fromRight ? "md:ms-auto" : ""}`}
              style={{
                background: "hsl(var(--destructive) / 0.05)",
                borderLeft: isAr ? "none" : "3px solid hsl(var(--destructive) / 0.5)",
                borderRight: isAr ? "3px solid hsl(var(--destructive) / 0.5)" : "none",
                border: "1px solid hsl(var(--destructive) / 0.12)",
                maxWidth: "600px",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Icon size={16} className="text-destructive" />
                </div>
                <h3 className="font-headline text-base font-semibold">{t(`problem.${c}.title`)}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`problem.${c}.desc`)}</p>
            </motion.div>
          );
        })}
      </div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 3 — SOLUTION OVERVIEW
   ════════════════════════════════════════ */
const SolutionSection = ({ t, isAr }: SP) => {
  const sources = ["Facebook Ads", "Google Ads", "WhatsApp", "OLX / Hatla2ee", "Website Form", "Phone / Walk-in"];
  const outputs = ["Smart CRM", "AI Lead Scoring", "Auto Follow-up", "Live Dashboard", "Sales Reports", "AI Assistant"];
  const pills = [t("solution.pill1"), t("solution.pill2"), t("solution.pill3")];

  return (
    <S id="solution" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("solution.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">{t("solution.title")}</h2>

      {/* Flow diagram */}
      <div className="mt-14 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 justify-center">
        {/* Sources */}
        <div className="flex flex-wrap lg:flex-col gap-2 justify-center max-w-xs">
          {sources.map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, x: isAr ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass-panel px-3 py-2 label-tech text-[10px] text-muted-foreground whitespace-nowrap">{s}</motion.div>
          ))}
        </div>

        {/* Connecting line */}
        <div className="hidden lg:flex items-center gap-0">
          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.4))" }} />
          <ChevronRight size={16} className="text-primary/40 -mx-1" />
        </div>

        {/* Center hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center w-40 h-40 shrink-0"
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid hsl(var(--primary) / 0.3)" }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center" style={{ background: "hsl(var(--primary) / 0.08)", border: "2px solid hsl(var(--primary) / 0.3)" }}>
            <span className="font-headline text-xl font-bold gradient-text">{t("solution.hub")}</span>
            <span className="label-tech text-[10px] text-muted-foreground mt-0.5">{t("solution.hubSub")}</span>
          </div>
        </motion.div>

        {/* Connecting line */}
        <div className="hidden lg:flex items-center gap-0">
          <ChevronRight size={16} className="text-primary/40 -mx-1" />
          <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1))" }} />
        </div>

        {/* Outputs */}
        <div className="flex flex-wrap lg:flex-col gap-2 justify-center max-w-xs">
          {outputs.map((o, i) => (
            <motion.div key={o} initial={{ opacity: 0, x: isAr ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass-panel px-3 py-2 label-tech text-[10px] text-primary whitespace-nowrap">{o}</motion.div>
          ))}
        </div>
      </div>

      {/* Industry pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-12">
        {pills.map((p) => (
          <motion.div key={p} whileHover={{ scale: 1.05, boxShadow: "0 0 20px -5px hsl(184 100% 68% / 0.3)" }}
            className="glass-panel px-5 py-3 label-tech text-sm text-foreground/80 cursor-default">{p}</motion.div>
        ))}
      </div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 4 — AUTOMATION FLOW
   ════════════════════════════════════════ */
const AutomationSection = ({ t, isAr }: SP) => {
  const steps = ["1", "2", "3", "4", "5"];
  return (
    <S id="automation" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("auto.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">{t("auto.title")}</h2>

      <div className="mt-14 space-y-10">
        {steps.map((s, i) => {
          const fromRight = i % 2 !== 0;
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: fromRight ? (isAr ? -50 : 50) : (isAr ? 50 : -50) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${fromRight ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-10 items-start`}
            >
              {/* Text side */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-headline font-bold text-primary text-lg" style={{ border: "1px solid hsl(var(--primary) / 0.3)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold">{t(`auto.${s}.title`)}</h3>
                </div>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">{t(`auto.${s}.desc`)}</p>
              </div>

              {/* Visual mockup */}
              <div className="flex-1 w-full">
                <AutoMockup step={parseInt(s)} t={t} isAr={isAr} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </S>
  );
};

/* Step-specific mockup cards */
const AutoMockup = ({ step, t }: { step: number; t: (k: string) => string; isAr: boolean }) => {
  const card = "glass-panel rounded-2xl p-5 text-sm";
  const sub = "label-tech text-[9px] text-muted-foreground";

  if (step === 1) return (
    <div className={card} style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">f</div>
        <span className={sub}>Sponsored</span>
      </div>
      <div className="w-full h-24 rounded-xl mb-3" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))" }} />
      <p className="font-headline font-semibold text-foreground text-sm mb-2">New Project — Cairo</p>
      <div className="px-4 py-2 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-lg text-center mb-3">Learn More</div>
      <p className="text-primary text-xs font-medium">{t("auto.1.proof")}</p>
    </div>
  );

  if (step === 2) return (
    <div className={card} style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <span className="label-tech text-[10px] text-destructive font-semibold">HOT LEAD</span>
        </div>
        <span className="font-headline text-2xl font-bold gradient-text">87</span>
      </div>
      <div className="space-y-2">
        {[["Name", "Ahmed Mohamed"], ["Source", "Facebook Lead Form"], ["Interest", "3BR Apartment"], ["Budget signal", "High"]].map(([l, v]) => (
          <div key={l} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{l}</span>
            <span className="text-foreground font-medium">{v}</span>
          </div>
        ))}
      </div>
      <p className="text-primary text-xs font-medium mt-3">{t("auto.2.proof")}</p>
    </div>
  );

  if (step === 3) return (
    <div className={card} style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}>
      {[
        { name: "Ahmed", leads: 8, pct: 80, status: "BUSY", color: "amber" },
        { name: "Sara", leads: 4, pct: 40, status: "✓ ASSIGNED", color: "green" },
        { name: "Omar", leads: 12, pct: 100, status: "FULL", color: "destructive" },
      ].map((p) => (
        <div key={p.name} className="flex items-center gap-3 mb-3 last:mb-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center label-tech text-[10px] text-primary font-bold">{p.name[0]}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">{p.name} — {p.leads} leads</span>
              <span className={`label-tech text-[9px] ${p.color === "green" ? "text-green-400" : p.color === "amber" ? "text-amber-400" : "text-destructive"}`}>{p.status}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[hsl(var(--surface-container-high))]">
              <div className={`h-1.5 rounded-full ${p.color === "green" ? "bg-green-400" : p.color === "amber" ? "bg-amber-400" : "bg-destructive"}`} style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (step === 4) return (
    <div className="glass-panel rounded-3xl p-4 max-w-[280px] mx-auto" style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}>
      <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: "1px solid hsl(var(--outline-variant) / 0.1)" }}>
        <span className="text-sm">📱</span>
        <span className="label-tech text-[10px] text-foreground font-semibold">WhatsApp</span>
      </div>
      <div className="glass-panel rounded-xl p-3 space-y-1.5 text-xs">
        <p className="font-semibold text-destructive">🔴 NEW HOT LEAD</p>
        <p className="text-foreground font-medium">Ahmed Mohamed</p>
        <p className="text-muted-foreground">📞 0100-XXX-XXXX</p>
        <p className="text-muted-foreground">💰 Budget: High</p>
        <p className="text-muted-foreground">🏠 3BR in New Cairo</p>
        <p className="text-muted-foreground">⏰ Just now</p>
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex-1 py-2 bg-green-500/20 text-green-400 text-xs font-semibold rounded-lg text-center">Call Now</div>
        <div className="flex-1 py-2 glass-panel text-foreground text-xs font-semibold rounded-lg text-center">View</div>
      </div>
    </div>
  );

  // step 5
  return (
    <div className={card} style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}>
      <span className={sub}>Activity Timeline</span>
      <div className="space-y-2 mt-3">
        {[
          { t: "10:32", a: "Lead captured from Facebook", e: "📥" },
          { t: "10:32", a: "AI Score: 87 — HOT", e: "🤖" },
          { t: "10:33", a: "Assigned to Sara", e: "👤" },
          { t: "10:33", a: "WhatsApp sent to Sara", e: "📱" },
          { t: "10:35", a: "Sara called — No answer", e: "📞" },
          { t: "10:35", a: "Auto follow-up SMS sent", e: "💬" },
          { t: "10:40", a: "Lead opened SMS link", e: "🔗" },
          { t: "11:02", a: "Sara called — Meeting booked", e: "✅" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="shrink-0 label-tech text-[9px] w-10">{item.t}</span>
            <span>{item.e}</span>
            <span>{item.a}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   SECTION 5 — DASHBOARD
   ════════════════════════════════════════ */
const DashboardSection = ({ t, isAr }: SP) => {
  const feats = [
    { icon: BarChart3, k: "1" }, { icon: Users, k: "2" },
    { icon: TrendingUp, k: "3" }, { icon: Zap, k: "4" },
  ];
  const barHeights = [40, 65, 45, 80, 60, 90, 55, 75, 85, 70, 95, 88];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const funnelStages = [
    { stage: "New Leads", count: 847 }, { stage: "Contacted", count: 612 },
    { stage: "Qualified", count: 284 }, { stage: "Proposal", count: 98 }, { stage: "Closed", count: 23 },
  ];

  return (
    <S id="dashboard" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("dash.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">{t("dash.title")}</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mt-4">{t("dash.subtitle")}</p>

      {/* Dashboard mockup */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="glass-panel rounded-2xl p-5 md:p-6 mt-10" style={{ background: "hsl(var(--surface-container) / 0.8)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-headline font-bold text-foreground">FlowOS Dashboard</h3>
            <span className="label-tech text-[10px] text-muted-foreground">Live • Updated 2 sec ago</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="label-tech text-[10px] text-primary">LIVE</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { l: "Today's Leads", v: "47", c: "↑ 12% vs yesterday" },
            { l: "Deals This Month", v: "23", c: "↑ 8% vs last month" },
            { l: "Avg Response", v: "2.4m", c: "↓ 68% faster" },
            { l: "Conversion Rate", v: "23%", c: "↑ 5% this week" },
          ].map((kpi) => (
            <div key={kpi.l} className="glass-panel p-3 md:p-4 rounded-xl">
              <span className="label-tech text-[10px] text-muted-foreground">{kpi.l}</span>
              <div className="font-headline text-xl md:text-2xl font-bold text-primary mt-1">{kpi.v}</div>
              <span className="label-tech text-[10px] text-green-400">{kpi.c}</span>
            </div>
          ))}
        </div>

        {/* Pipeline funnel */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
          {funnelStages.map((item, i) => (
            <div key={item.stage} className="flex items-center gap-2 shrink-0">
              <div className="glass-panel px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-center min-w-[80px]">
                <div className="font-headline text-base md:text-lg font-bold text-primary">{item.count}</div>
                <div className="label-tech text-[9px] text-muted-foreground mt-0.5">{item.stage}</div>
              </div>
              {i < funnelStages.length - 1 && <span className="text-muted-foreground/40 text-lg">→</span>}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="glass-panel p-4 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="label-tech text-[10px] text-muted-foreground">Campaign Performance</span>
            <span className="label-tech text-[10px] text-primary">This Month</span>
          </div>
          <div className="flex items-end gap-1.5 md:gap-2 h-16">
            {barHeights.map((h, i) => (
              <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex-1 rounded-sm bg-primary/20 hover:bg-primary/40 transition-colors cursor-pointer relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block label-tech text-[8px] text-primary whitespace-nowrap">{h} leads</div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {months.map(m => <span key={m} className="label-tech text-[8px] text-muted-foreground/50 flex-1 text-center">{m}</span>)}
          </div>
        </div>
      </motion.div>

      {/* Dashboard features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {feats.map((f, i) => (
          <motion.div key={f.k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-xl p-5" style={{ border: "1px solid hsl(var(--outline-variant) / 0.12)" }}>
            <f.icon size={20} className="text-primary mb-3" />
            <h4 className="font-headline text-sm font-semibold mb-1">{t(`dash.feat${f.k}.title`)}</h4>
            <p className="text-xs text-muted-foreground">{t(`dash.feat${f.k}.desc`)}</p>
          </motion.div>
        ))}
      </div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 6 — CRM
   ════════════════════════════════════════ */
const CRMSection = ({ t }: SP) => {
  const features = ["f1", "f2", "f3", "f4", "f5"];
  return (
    <S id="crm" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("crm.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">{t("crm.title")}</h2>

      <div className="flex flex-col lg:flex-row gap-10 mt-12">
        {/* Lead card mockup */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
          <div className="glass-panel rounded-2xl p-5 md:p-6" style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-headline font-bold text-primary text-lg">AM</div>
                <div>
                  <h4 className="font-headline font-bold text-foreground">Ahmed Mohamed</h4>
                  <span className="label-tech text-[10px] text-muted-foreground">Added 4 hours ago • Facebook Lead Form</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "hsl(var(--destructive) / 0.1)", border: "1px solid hsl(var(--destructive) / 0.2)" }}>
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="label-tech text-[10px] text-destructive">HOT • 87/100</span>
              </div>
            </div>
            {/* Details grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[["Interest", "3BR Apartment"], ["Budget", "2.5M EGP"], ["Area", "New Cairo"], ["Financing", "Mortgage"], ["Assigned To", "Sara (Sales)"], ["Next Action", "Call Today"]].map(([l, v]) => (
                <div key={l} className="glass-panel p-2.5 rounded-xl">
                  <span className="label-tech text-[9px] text-muted-foreground block">{l}</span>
                  <span className="text-xs font-semibold text-foreground mt-0.5 block">{v}</span>
                </div>
              ))}
            </div>
            {/* Activity */}
            <div className="space-y-1.5 mb-4">
              <span className="label-tech text-[10px] text-muted-foreground">Activity</span>
              {[
                { t: "10:32", a: "Lead captured from Facebook", e: "📥" },
                { t: "10:32", a: "AI Score: 87 — HOT", e: "🤖" },
                { t: "10:33", a: "Assigned to Sara", e: "👤" },
                { t: "10:33", a: "WhatsApp sent to Sara", e: "📱" },
                { t: "10:35", a: "Sara called — No answer", e: "📞" },
                { t: "10:35", a: "Auto follow-up SMS sent", e: "💬" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="shrink-0 label-tech text-[9px] w-10">{item.t}</span>
                  <span className="text-[10px]">{item.e}</span>
                  <span>{item.a}</span>
                </div>
              ))}
            </div>
            {/* Buttons */}
            <div className="flex gap-2">
              <div className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-label text-xs font-semibold text-center">Call Now</div>
              <div className="flex-1 py-2.5 rounded-xl glass-panel font-label text-xs font-semibold text-foreground text-center">WhatsApp</div>
              <div className="px-3 py-2.5 rounded-xl glass-panel font-label text-xs text-muted-foreground text-center">Move Stage</div>
            </div>
          </div>
        </motion.div>

        {/* CRM features */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div key={f} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm leading-relaxed">{t(`crm.${f}`)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 7 — AI SCORING
   ════════════════════════════════════════ */
const ScoringSection = ({ t }: SP) => {
  const factors = [
    { k: "1", score: 90 }, { k: "2", score: 75 }, { k: "3", score: 85 },
    { k: "4", score: 60 }, { k: "5", score: 40 },
  ];
  const tiers = [
    { emoji: "🔴", label: "HOT (70-100)", k: "hot", color: "destructive" },
    { emoji: "🟡", label: "WARM (40-70)", k: "warm", color: "amber" },
    { emoji: "🔵", label: "COLD (0-40)", k: "cold", color: "blue" },
  ];

  return (
    <S id="scoring" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("score.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">
        {t("score.title1")}<br />{t("score.title2")}
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 mt-12">
        {/* Scoring factors */}
        <div className="flex-1 space-y-5">
          {factors.map((f, i) => (
            <motion.div key={f.k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{t(`score.factor${f.k}`)}</span>
                <span className="font-headline font-bold text-primary text-sm">{f.score}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[hsl(var(--surface-container-high))]">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${f.score}%` }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="h-2 rounded-full" style={{ background: "var(--gradient-primary)" }} />
              </div>
              <span className="label-tech text-[9px] text-muted-foreground mt-1 block">{t(`score.factor${f.k}.desc`)}</span>
            </motion.div>
          ))}
        </div>

        {/* Score circle + tiers */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Score circle */}
          <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
            className="relative w-40 h-40 mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--surface-container-high))" strokeWidth="6" />
              <motion.circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${87 * 2.64} ${100 * 2.64}`}
                initial={{ strokeDashoffset: 264 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
              <defs><linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(270, 100%, 48%)" /><stop offset="100%" stopColor="hsl(184, 100%, 68%)" />
              </linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-headline text-4xl font-bold gradient-text">87</span>
            </div>
          </motion.div>

          {/* Tiers */}
          <div className="space-y-3 w-full max-w-sm">
            {tiers.map((tier) => (
              <div key={tier.k} className="glass-panel rounded-xl p-3 flex items-start gap-3" style={{ border: "1px solid hsl(var(--outline-variant) / 0.12)" }}>
                <span className="text-lg shrink-0">{tier.emoji}</span>
                <div>
                  <span className="font-headline text-xs font-bold text-foreground">{tier.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(`score.${tier.k}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 8 — FLOWMIND AI
   ════════════════════════════════════════ */
const FlowMindSection = ({ t }: SP) => {
  const caps = [
    { icon: MessageCircle, k: "1" }, { icon: Database, k: "2" },
    { icon: TrendingUp, k: "3" }, { icon: Zap, k: "4" },
  ];

  return (
    <S id="flowmind" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("mind.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">{t("mind.title")}</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mt-4">{t("mind.subtitle")}</p>

      {/* Chat mockup */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass-panel rounded-2xl p-5 md:p-6 max-w-2xl mx-auto mt-10" style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}>
        {/* Chat header */}
        <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "1px solid hsl(var(--outline-variant) / 0.1)" }}>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Bot size={20} className="text-primary" /></div>
          <div>
            <h4 className="font-headline font-bold text-foreground text-sm">FlowMind AI</h4>
            <span className="label-tech text-[10px] text-primary">Online • Connected to your data</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* User msg 1 */}
          <div className="flex justify-end">
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-sm" dir="rtl">
              ليه حملة فيسبوك الأسبوع ده أداءها وحش؟
            </div>
          </div>
          {/* AI response 1 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1"><Bot size={14} className="text-primary" /></div>
            <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm text-muted-foreground space-y-2" dir="rtl">
              <p>بناءً على بياناتك من الأسبوع ده، في ٣ أسباب رئيسية:</p>
              <p>١. الـ CPL ارتفع ٣٤٪ — الـ audience بيتشبع. محتاج تحدّث الـ creative.</p>
              <p>٢. نسبة ٦٧٪ من الليدز بييجوا من موبايل بس الـ landing page مش mobile-optimized.</p>
              <p>٣. أفضل وقت أداء عندك ٦-٩ مساء، بس ٤٠٪ من الـ budget بيتصرف الصبح.</p>
              <p className="text-primary font-semibold">التوصية: غيّر الـ creative، وحول ٤٠٪ من الـ budget لوقت ٦-١٠ مساء.</p>
            </div>
          </div>
          {/* User msg 2 */}
          <div className="flex justify-end">
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-sm" dir="rtl">
              مين أحسن سيلز عندي الشهر ده؟
            </div>
          </div>
          {/* AI response 2 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1"><Bot size={14} className="text-primary" /></div>
            <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm text-muted-foreground" dir="rtl">
              <p>Sara Ahmed — بيها أعلى معدل إغلاق (٣١٪) وأسرع وقت رد (١.٨ دقيقة متوسط).</p>
              <p className="mt-1">Ahmed Khaled تاني — معدل إغلاق ٢٤٪ بس بياخد متوسط ٦ دقايق للرد. لو سرّع الرد ممكن يكون أحسن.</p>
            </div>
          </div>
          {/* Typing */}
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Bot size={14} className="text-primary" /></div>
            <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} className="w-2 h-2 rounded-full bg-primary/60"
                    animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Capabilities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
        {caps.map((c, i) => (
          <motion.div key={c.k} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass-panel rounded-xl p-4 text-center" style={{ border: "1px solid hsl(var(--outline-variant) / 0.12)" }}>
            <c.icon size={18} className="text-primary mx-auto mb-2" />
            <span className="text-xs text-muted-foreground">{t(`mind.cap${c.k}`)}</span>
          </motion.div>
        ))}
      </div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 9 — REPORTS
   ════════════════════════════════════════ */
const ReportsSection = ({ t }: SP) => {
  const reports = [
    { k: "1", icon: BarChart3 }, { k: "2", icon: Users }, { k: "3", icon: TrendingUp },
    { k: "4", icon: Clock }, { k: "5", icon: DollarSign }, { k: "6", icon: Bot },
  ];
  return (
    <S id="reports" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("report.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">{t("report.title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {reports.map((r, i) => (
          <motion.div key={r.k} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-xl p-5" style={{ border: "1px solid hsl(var(--outline-variant) / 0.12)" }}>
            <r.icon size={20} className="text-primary mb-3" />
            <h4 className="font-headline text-sm font-semibold mb-1">{t(`report.${r.k}.title`)}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t(`report.${r.k}.desc`)}</p>
            <span className="label-tech text-[10px] px-2 py-0.5 rounded" style={{ background: "hsl(var(--primary) / 0.1)" }}>
              {t(`report.${r.k}.freq`)}
            </span>
          </motion.div>
        ))}
      </div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 10 — MORE CAPABILITIES
   ════════════════════════════════════════ */
const MoreCapabilitiesSection = ({ t, isAr }: SP) => {
  const taskMembers = [
    { name: "Sara Ahmed", tasks: 5, done: 5, score: 98, label: "On Fire 🔥" },
    { name: "Ahmed Khaled", tasks: 7, done: 4, score: 71, label: "On Track" },
    { name: "Omar Hassan", tasks: 8, done: 2, score: 38, label: "Overloaded ⚠️" },
  ];

  const competitors = [
    { name: "Competitor A", threat: "High", change: "Launched new offer — 20% discount", score: 85 },
    { name: "Competitor B", threat: "Medium", change: "Increased ad spend on Facebook", score: 60 },
    { name: "Competitor C", threat: "Low", change: "No significant changes this week", score: 25 },
  ];

  const hoverStyle = { y: -6, boxShadow: "0 20px 60px -20px hsl(var(--primary) / 0.2)" };
  const cardTransition = { duration: 0.4, ease: "easeOut" };

  return (
    <S id="capabilities" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("feat2.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">
        <span className="text-muted-foreground">{t("feat2.headline1")}</span><br />
        <span className="gradient-text">{t("feat2.headline2")}</span>
      </h2>
      <p className="text-muted-foreground text-lg mt-4 max-w-2xl">{t("feat2.subtitle")}</p>

      {/* ── CARD 1 — Task Intelligence ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={hoverStyle}
        className="glass-panel rounded-2xl mt-14 overflow-hidden"
        style={{ border: "1px solid hsl(var(--outline-variant) / 0.12)", borderLeft: "4px solid hsl(var(--primary) / 0.5)", minHeight: "500px", transition: "all 0.4s ease" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Text side */}
          <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel w-fit mb-5" style={{ background: "hsl(var(--primary) / 0.1)" }}>
              <Brain size={14} className="text-primary" />
              <span className="label-tech text-[10px] text-primary">{t("feat2.task.tag")}</span>
            </div>

            <h3 className="font-headline text-xl md:text-2xl font-bold leading-tight mb-4">
              {t("feat2.task.h1")}<br />{t("feat2.task.h2")}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">{t("feat2.task.desc")}</p>

            <div className="space-y-2.5">
              {["b1", "b2", "b3", "b4"].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{t(`feat2.task.${b}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual mockup side */}
          <div className="md:col-span-7 p-5 md:p-6">
            <div className="glass-panel rounded-2xl p-5 h-full" style={{ border: "1px solid hsl(var(--primary)/0.15)" }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="font-headline font-bold text-foreground text-sm">Team Intelligence</h4>
                  <span className="label-tech text-[10px] text-muted-foreground">Today • April 9</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg" style={{ background: "hsl(var(--primary)/0.1)", border: "1px solid hsl(var(--primary)/0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="label-tech text-[9px] text-primary">LIVE</span>
                </div>
              </div>

              {/* Morning check-in */}
              <div className="mb-4 p-3 rounded-xl" style={{ background: "hsl(var(--surface-container-low)/0.5)" }}>
                <span className="label-tech text-[9px] text-muted-foreground block mb-2">🌅 Morning Check-in — 9:02 AM</span>
                <div className="text-xs text-foreground/80 italic">
                  "اليوم: هخلص proposal لـ Client A، هرد على 3 leads من أمس، هحضر اجتماع الساعة 3"
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="label-tech text-[9px] text-primary">✓ AI received • Tasks entered • Priorities set</span>
                </div>
              </div>

              {/* Team members */}
              <div className="space-y-2.5 mb-4">
                {taskMembers.map((member) => (
                  <div key={member.name} className="flex items-center gap-3 p-3 rounded-xl glass-panel">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-headline font-bold text-primary text-xs shrink-0">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-foreground truncate">{member.name}</span>
                        <span className="label-tech text-[9px] text-muted-foreground shrink-0">{member.done}/{member.tasks} tasks</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ background: "hsl(var(--outline-variant)/0.2)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: member.score > 80 ? "hsl(184 100% 68%)" : member.score > 50 ? "hsl(45 100% 60%)" : "hsl(var(--destructive))" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${member.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="font-headline font-bold text-sm" style={{ color: member.score > 80 ? "hsl(184 100% 68%)" : member.score > 50 ? "hsl(45 100% 60%)" : "hsl(var(--destructive))" }}>
                        {member.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insight */}
              <div className="p-3 rounded-xl" style={{ background: "hsl(var(--primary)/0.06)", border: "1px solid hsl(var(--primary)/0.15)" }}>
                <div className="flex items-start gap-2">
                  <Bot size={14} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="label-tech text-[9px] text-primary block mb-1">AI Insight</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Omar is overloaded — 2 tasks auto-reassigned to Sara. Recommend check-in call today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── CARD 2 — Competitor Intelligence ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        whileHover={hoverStyle}
        className="glass-panel rounded-2xl mt-8 overflow-hidden"
        style={{ border: "1px solid hsl(var(--outline-variant) / 0.12)", borderLeft: "4px solid hsl(270 60% 60% / 0.5)", minHeight: "500px", transition: "all 0.4s ease" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Visual mockup side (LEFT on desktop, below on mobile) */}
          <div className="md:col-span-7 p-5 md:p-6 order-2 md:order-1">
            <div className="glass-panel rounded-2xl p-5 h-full" style={{ border: "1px solid hsl(270 60% 60% / 0.15)" }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="font-headline font-bold text-foreground text-sm">Competitor Radar</h4>
                  <span className="label-tech text-[10px] text-muted-foreground">Last scan: 2 hours ago</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg" style={{ background: "hsl(270 60% 60% / 0.1)", border: "1px solid hsl(270 60% 60% / 0.2)" }}>
                  <Eye size={10} className="text-purple-400" />
                  <span className="label-tech text-[9px] text-purple-400">MONITORING</span>
                </div>
              </div>

              {/* Competitor cards */}
              <div className="space-y-2 mb-4">
                {competitors.map((comp) => (
                  <div key={comp.name} className="p-3 rounded-xl glass-panel">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg glass-panel flex items-center justify-center font-headline font-bold text-muted-foreground text-[10px] shrink-0">
                          {comp.name.split(" ").pop()?.[0]}
                        </div>
                        <span className="text-xs font-semibold text-foreground">{comp.name}</span>
                      </div>
                      <span
                        className="label-tech text-[9px] shrink-0 px-2 py-0.5 rounded-md"
                        style={{
                          background: comp.threat === "High" ? "hsl(var(--destructive)/0.1)" : comp.threat === "Medium" ? "hsl(45 100% 60% / 0.1)" : "hsl(var(--primary)/0.1)",
                          color: comp.threat === "High" ? "hsl(var(--destructive))" : comp.threat === "Medium" ? "hsl(45 100% 60%)" : "hsl(var(--primary))",
                        }}
                      >
                        {comp.threat} Threat
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">🔍 {comp.change}</p>
                  </div>
                ))}
              </div>

              {/* AI Opportunity */}
              <div className="p-3 rounded-xl mb-3" style={{ background: "hsl(270 60% 60% / 0.06)", border: "1px solid hsl(270 60% 60% / 0.15)" }}>
                <div className="flex items-start gap-2">
                  <Zap size={14} className="text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="label-tech text-[9px] text-purple-400 block mb-1">AI Opportunity Detected</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Competitor A's discount targets budget segment. Your premium positioning is untouched — push quality messaging this week.
                    </p>
                  </div>
                </div>
              </div>

              {/* Weekly report badge */}
              <div className="flex items-center justify-between p-3 rounded-xl glass-panel">
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-purple-400" />
                  <span className="text-xs text-foreground font-semibold">Weekly Intel Report</span>
                </div>
                <span className="label-tech text-[9px] text-purple-400">Auto-generated ✓</span>
              </div>
            </div>
          </div>

          {/* Text side (RIGHT on desktop, top on mobile) */}
          <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-center order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel w-fit mb-5" style={{ background: "hsl(270 60% 60% / 0.1)" }}>
              <Eye size={14} className="text-purple-400" />
              <span className="label-tech text-[10px] text-purple-400">{t("feat2.comp.tag")}</span>
            </div>

            <h3 className="font-headline text-xl md:text-2xl font-bold leading-tight mb-4">
              {t("feat2.comp.h1")}<br />{t("feat2.comp.h2")}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">{t("feat2.comp.desc")}</p>

            <div className="space-y-2.5">
              {["b1", "b2", "b3", "b4"].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
                  <span className="text-sm text-muted-foreground">{t(`feat2.comp.${b}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 11 — INDUSTRIES
   ════════════════════════════════════════ */
const IndustriesSection = ({ t }: SP) => {
  const industries = [
    { k: "re", icon: Building2, link: "/solutions", features: ["f1", "f2", "f3", "f4", "f5"] },
    { k: "car", icon: Car, link: "/drivelead", features: ["f1", "f2", "f3", "f4", "f5"] },
    { k: "agency", icon: Megaphone, link: null, features: ["f1", "f2", "f3", "f4", "f5"] },
  ];

  return (
    <S id="industries" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <p className="label-tech text-primary text-[11px] mb-4">{t("ind.label")}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold max-w-3xl">{t("ind.title")}</h2>
      <p className="text-muted-foreground text-lg mt-4 max-w-2xl">{t("ind.subtitle")}</p>

      <div className="space-y-6 mt-12">
        {industries.map((ind, i) => (
          <motion.div key={ind.k} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-2xl p-6 md:p-8" style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ind.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline text-xl md:text-2xl font-bold">{t(`ind.${ind.k}.title`)}</h3>
                    <p className="text-sm text-muted-foreground">{t(`ind.${ind.k}.sub`)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {ind.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{t(`ind.${ind.k}.${f}`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <div className="glass-panel px-4 py-2 rounded-xl">
                  <span className="label-tech text-[10px] text-primary">{t(`ind.${ind.k}.proof`)}</span>
                </div>
                {ind.link && (
                  <Link to={ind.link} className="text-sm text-primary font-semibold hover:underline inline-flex items-center gap-1">
                    {t(`ind.${ind.k}.cta`)}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </S>
  );
};

/* ════════════════════════════════════════
   SECTION 11 — READY CTA
   ════════════════════════════════════════ */
const ReadyCTASection = ({ t }: SP) => (
  <S id="ready" className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(184 100% 68% / 0.06), transparent 70%)" }} />

    <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
      {/* Urgency badge */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
        style={{ background: "hsl(45 100% 60% / 0.08)", border: "1px solid hsl(45 100% 60% / 0.25)" }}>
        <span className="status-dot bg-amber-400" />
        <span className="label-tech text-[10px] text-amber-400">{t("newcta.urgency")}</span>
      </motion.div>

      <h2 className="font-headline text-3xl md:text-5xl font-bold">
        {t("newcta.headline1")} <span className="gradient-text">{t("newcta.headline2")}</span>
      </h2>
      <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">{t("newcta.sub")}</p>

      {/* Referral nudge */}
      <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-2xl"
        style={{ background: "hsl(var(--primary) / 0.05)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
        <User size={16} className="text-primary" />
        <span className="text-sm text-muted-foreground">{t("newcta.referral")}</span>
      </motion.div>

      {/* CTA buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <motion.a
          href="https://wa.me/201148627137?text=%D8%B9%D8%A7%D9%88%D8%B2%20%D8%A3%D8%B4%D9%88%D9%81%20FlowOS%20%D9%88%D8%A3%D8%B9%D8%B1%D9%81%20%D8%A7%D9%84%D8%B3%D8%B9%D8%B1"
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.5)" }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-4 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground inline-flex items-center gap-2 hover-glow"
        >
          <MessageCircle size={16} />
          {t("newcta.btn1")}
        </motion.a>

        <motion.a
          href="https://wa.me/201148627137?text=%D8%B9%D8%A7%D9%88%D8%B2%20%D8%A3%D8%B4%D9%88%D9%81%20FlowOS%20demo"
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-4 font-label text-xs uppercase tracking-[0.15em] font-semibold ghost-border text-foreground hover:border-primary/30 inline-flex items-center gap-2"
        >
          {t("newcta.btn2")}
        </motion.a>
      </div>

      {/* Trust row */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {["trust1", "trust2", "trust3"].map((k) => (
          <div key={k} className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-primary" />
            <span className="text-sm text-muted-foreground">{t(`newcta.${k}`)}</span>
          </div>
        ))}
      </div>
    </div>
  </S>
);

/* ════════════════════════════════════════
   SECTION 12 — FINAL CTA
   ════════════════════════════════════════ */
const FinalCTASection = ({ t }: SP) => (
  <S className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(184 100% 68% / 0.05), transparent 70%)" }} />
    <div className="absolute bottom-0 left-0 right-0 h-px neon-line opacity-40" />

    <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
      <h2 className="font-headline text-3xl md:text-5xl font-bold">{t("cta.title")}</h2>
      <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">{t("cta.subtitle")}</p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <motion.a
          href="https://wa.me/201148627137?text=%D8%B9%D8%A7%D9%88%D8%B2%20%D8%A3%D8%B4%D9%88%D9%81%20FlowOS%20%D9%88%D8%A3%D8%B9%D8%B1%D9%81%20%D8%A7%D9%84%D8%B3%D8%B9%D8%B1"
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.5)" }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-4 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground inline-flex items-center gap-2"
        >
          {t("cta.btn1")}
        </motion.a>
        <Link to="/">
          <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 font-label text-xs uppercase tracking-[0.15em] font-semibold ghost-border text-foreground inline-flex items-center gap-2 hover:border-primary/40 transition-colors"
          >
            {t("cta.btn2")}
          </motion.span>
        </Link>
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
  </S>
);
