import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import {
  ClipboardList,
  KanbanSquare,
  Gauge,
  MessagesSquare,
  FolderTree,
  Users,
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Folder,
  LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/home/MobileCTABar";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";
import CursorFollower from "@/components/motion/CursorFollower";
import TiltCard from "@/components/motion/TiltCard";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import AnimatedWords from "@/components/motion/AnimatedWords";
import { useLanguage } from "@/contexts/LanguageContext";
import { shiftOsCase, SHIFT_OS_MEASURED, SHIFT_OS_STACK } from "@/data/shiftOsCase";
import { WHATSAPP_URL } from "@/lib/contact";

const MODULE_ICONS: Record<string, LucideIcon> = {
  report: ClipboardList,
  tasks: KanbanSquare,
  performance: Gauge,
  assistant: MessagesSquare,
  drive: FolderTree,
  hr: Users,
};

// Illustrations standing in for screenshots of each module (no real client or employee data).
const ModuleVisual = ({ kind, isAr }: { kind: string; isAr: boolean }) => {
  const bar = "h-2 rounded-full bg-white/10";
  switch (kind) {
    case "report":
      return (
        <div className="space-y-2">
          {["bg-gain", "bg-primary", "bg-leak"].map((dot, i) => (
            <div key={dot} className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2">
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              <span className={`${bar} w-16`} />
              <span className={`${bar} flex-1 ${i === 1 ? "max-w-[60%]" : ""}`} />
            </div>
          ))}
        </div>
      );
    case "tasks":
      return (
        <div className="flex flex-wrap gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`h-7 rounded-md ${i === 3 ? "w-20 bg-primary/80" : i < 3 ? "w-14 bg-gain/30" : "w-14 bg-white/10"}`}
            />
          ))}
        </div>
      );
    case "performance":
      return (
        <div className="space-y-2">
          {[30, 25, 15, 15, 15].map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-2 rounded-full bg-primary" style={{ width: `${v * 2.4}%` }} />
              <span className="text-[11px] text-white/50" dir="ltr">
                {v}%
              </span>
            </div>
          ))}
        </div>
      );
    case "assistant":
      return (
        <div className="space-y-2 text-xs">
          <p className="ms-auto w-fit max-w-[80%] rounded-xl rounded-ee-sm bg-primary/80 px-3 py-2 text-primary-foreground">
            {isAr ? "العميل ده نبرته إيه؟" : "What's this client's tone?"}
          </p>
          <div className="w-fit max-w-[85%] rounded-xl rounded-es-sm bg-white/10 px-3 py-2 text-white/80">
            <span className={`${bar} block w-40 mb-1.5`} />
            <span className={`${bar} block w-28`} />
            <span className="mt-2 inline-block rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/60">
              {isAr ? "المصدر: النبرة" : "Source: Voice"}
            </span>
          </div>
        </div>
      );
    case "drive":
      return (
        <div className="space-y-1.5 text-xs text-white/70" dir="ltr">
          {[0, 1, 1, 1, 2].map((depth, i) => (
            <div key={i} className="flex items-center gap-2" style={{ paddingInlineStart: depth * 16 }}>
              <Folder size={14} className={depth === 2 ? "text-primary" : "text-white/50"} />
              <span className={`${bar} ${depth === 0 ? "w-24" : "w-20"}`} />
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, i) => (
            <span key={i} className={`aspect-square rounded ${[4, 5, 12].includes(i) ? "bg-primary/80" : i === 17 ? "bg-leak/60" : "bg-white/10"}`} />
          ))}
        </div>
      );
  }
};

const AgencyOsCase = () => {
  const { lang, isAr } = useLanguage();
  const c = shiftOsCase[lang];
  const Back = isAr ? ArrowRight : ArrowLeft;
  const Forward = isAr ? ArrowLeft : ArrowRight;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isAr ? "نظام تشغيل وكالة تسويق — محمد وحيد" : "Marketing Agency Operating System — Mohamed Waheed";
    return () => {
      document.title = "Mohamed Waheed | AI-Powered Growth Systems Builder";
    };
  }, [isAr]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-background text-foreground min-h-screen overflow-x-hidden pb-20 md:pb-0">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="relative pt-28 md:pt-36 pb-16 md:pb-24">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[520px] pointer-events-none"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)" }}
            />
            <div className="relative mx-auto max-w-6xl px-5 md:px-8">
              <Reveal>
                <Link to="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Back size={16} />
                  {c.crumb}
                </Link>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-foreground/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {c.label}
                </p>
              </Reveal>
              <h1 className="mt-5 max-w-4xl font-headline text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-balance">
                <AnimatedWords text={c.title} delay={0.1} />
              </h1>
              <Reveal delay={0.3}>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{c.sub}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-border bg-surface-container px-3.5 py-1.5 text-sm text-foreground/85">
                      {chip}
                    </span>
                  ))}
                </div>
              </Reveal>

              <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
                {c.stats.map((s, i) => (
                  <Reveal key={s.l} delay={0.35 + i * 0.06}>
                    <div className="flex h-full flex-col-reverse rounded-2xl border border-border bg-surface-container p-5">
                      <dt className="mt-1 text-sm text-muted-foreground">{s.l}</dt>
                      <dd className="font-headline text-4xl md:text-5xl font-semibold text-foreground">
                        <CountUp value={s.v} />
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">{SHIFT_OS_MEASURED[lang]}</p>
            </div>
          </section>

          {/* Challenge */}
          <section className="bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <SectionHeader tone="light" label={c.challengeLabel} title={c.challengeTitle} />
              <div className="grid md:grid-cols-3 gap-4">
                {c.challenges.map((item, i) => (
                  <Reveal key={item.t} delay={i * 0.08}>
                    <div className="h-full rounded-3xl border border-ink/10 bg-white p-7">
                      <span className="font-mono text-sm text-ink/40" dir="ltr">
                        0{i + 1}
                      </span>
                      <h3 className="mt-4 font-headline text-2xl font-semibold">{item.t}</h3>
                      <p className="mt-2 text-ink-muted leading-relaxed">{item.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* What I built */}
          <section className="bg-cream text-ink pb-20 md:pb-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <SectionHeader tone="light" label={c.builtLabel} title={c.builtTitle} />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {c.modules.map((m, i) => {
                  const Icon = MODULE_ICONS[m.key];
                  return (
                    <Reveal key={m.key} delay={(i % 3) * 0.06} className="h-full">
                      <TiltCard max={4} glow="255 106 31 / 0.16" className="h-full rounded-[1.75rem] bg-ink text-cream">
                        <article className="flex h-full flex-col p-7">
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <ModuleVisual kind={m.key} isAr={isAr} />
                          </div>
                          <div className="mt-6 flex items-center gap-3">
                            <span className="flex w-10 h-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                              <Icon size={19} />
                            </span>
                            <h3 className="font-headline text-xl font-semibold">{m.t}</h3>
                          </div>
                          <p className="mt-3 text-cream/70 leading-relaxed">{m.d}</p>
                          <p className="mt-auto pt-5 flex gap-2 text-[15px] font-medium text-cream">
                            <Check size={18} className="mt-0.5 shrink-0 text-primary" />
                            {m.why}
                          </p>
                        </article>
                      </TiltCard>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Task lifecycle + performance formula */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <SectionHeader label={c.flowLabel} title={c.flowTitle} />
              <Reveal>
                <ol className="flex flex-wrap items-center gap-2">
                  {c.stages.map((stage, i) => (
                    <li key={stage} className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-medium ${
                          c.reviewStages.includes(i)
                            ? "border border-primary/60 text-primary"
                            : i === c.stages.length - 1
                              ? "bg-gain/15 text-gain"
                              : "bg-surface-container-high text-foreground"
                        }`}
                      >
                        {stage}
                      </span>
                      {i < c.stages.length - 1 && <Forward size={14} className="text-muted-foreground" />}
                    </li>
                  ))}
                </ol>
                <p className="mt-6 max-w-3xl rounded-2xl border border-border bg-surface-container p-5 text-muted-foreground leading-relaxed">
                  {c.flowNote}
                </p>
              </Reveal>

              <div className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
                <Reveal>
                  <h3 className="font-headline text-3xl md:text-4xl font-semibold leading-tight">{c.weightsTitle}</h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <ul className="space-y-4">
                    {c.weights.map((w) => (
                      <li key={w.l}>
                        <div className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="text-foreground">{w.l}</span>
                          <span className="font-headline text-lg font-semibold text-primary" dir="ltr">
                            {w.v}%
                          </span>
                        </div>
                        <div className="mt-2 h-2.5 rounded-full bg-surface-container-high">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${(w.v / 30) * 100}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>

          {/* AI responsibly */}
          <section className="bg-cream text-ink py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <SectionHeader tone="light" label={c.aiLabel} title={c.aiTitle} />
              <div className="grid md:grid-cols-3 gap-4">
                {c.ai.map((item, i) => (
                  <Reveal key={item.t} delay={i * 0.08}>
                    <div className={`h-full rounded-3xl p-7 ${i === 1 ? "bg-primary text-primary-foreground" : "bg-white border border-ink/10"}`}>
                      <h3 className="font-headline text-xl font-semibold leading-snug">{item.t}</h3>
                      <p className={`mt-3 leading-relaxed ${i === 1 ? "text-primary-foreground/80" : "text-ink-muted"}`}>{item.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Security + numbers */}
          <section className="bg-cream text-ink rounded-b-[2rem] md:rounded-b-[2.5rem] pb-20 md:pb-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8 grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6">
                <SectionHeader tone="light" label={c.trustLabel} title={c.trustTitle} />
                <ul className="-mt-4 space-y-3">
                  {c.trust.map((item) => (
                    <li key={item} className="flex gap-3">
                      <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />
                      <span className="text-ink/85 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6">
                <SectionHeader tone="light" label={c.numbersLabel} title={c.numbersTitle} sub={SHIFT_OS_MEASURED[lang]} />
                <dl className="-mt-4 grid grid-cols-2 gap-3">
                  {c.numbers.map((n) => (
                    <div key={n.l} className="flex flex-col-reverse rounded-2xl border border-ink/10 bg-white p-4">
                      <dt className="mt-1 text-sm text-ink-muted">{n.l}</dt>
                      <dd className="font-headline text-3xl font-semibold">
                        <CountUp value={n.v} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* Stack + CTA */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{c.stackLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-2" dir="ltr">
                {SHIFT_OS_STACK.map((tech) => (
                  <li key={tech} className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground/80">
                    {tech}
                  </li>
                ))}
              </ul>

              <Reveal>
                <div className="mt-14 rounded-[2rem] bg-primary p-8 md:p-14 text-primary-foreground">
                  <h2 className="max-w-2xl font-headline text-3xl md:text-5xl font-semibold leading-tight">{c.ctaTitle}</h2>
                  <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">{c.ctaSub}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Magnetic>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-full bg-primary-foreground py-2 ps-6 pe-2 font-semibold text-primary"
                      >
                        {isAr ? "احجز مكالمة ١٥ دقيقة" : "Book a 15-min call"}
                        <span className="flex w-10 h-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <MessageCircle size={18} />
                        </span>
                      </a>
                    </Magnetic>
                    <Link
                      to="/#work"
                      className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 font-semibold"
                    >
                      {c.ctaBack}
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>
        <Footer />
        <MobileCTABar />
        <CursorFollower />
      </div>
    </MotionConfig>
  );
};

export default AgencyOsCase;
