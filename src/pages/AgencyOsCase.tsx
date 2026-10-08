import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
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
import BrowserFrame from "@/components/BrowserFrame";
import MobileCTABar from "@/components/home/MobileCTABar";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";
import SystemStory, { SystemStoryLessons } from "@/components/work/SystemStory";
import CursorFollower from "@/components/motion/CursorFollower";
import TiltCard from "@/components/motion/TiltCard";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import Marquee from "@/components/motion/Marquee";
import AnimatedWords from "@/components/motion/AnimatedWords";
import { useLanguage } from "@/contexts/LanguageContext";
import { shiftOsCase, SHIFT_OS_MEASURED, SHIFT_OS_STACK } from "@/data/shiftOsCase";
import { WHATSAPP_URL } from "@/lib/contact";
import overviewShot from "@/assets/agency-os-overview.webp";
import teamShot from "@/assets/agency-os-team.webp";
import tasksShot from "@/assets/agency-os-tasks.webp";
import reportShot from "@/assets/agency-os-report.webp";
import assistantShot from "@/assets/agency-os-assistant.webp";

const MODULE_ICONS: Record<string, LucideIcon> = {
  report: ClipboardList,
  tasks: KanbanSquare,
  performance: Gauge,
  assistant: MessagesSquare,
  drive: FolderTree,
  hr: Users,
};

// Real screens per module; the report row layers team tracking behind the report itself.
const MODULE_SHOTS: Record<string, { main: string; back?: string; captionKey: string }> = {
  report: { main: reportShot, back: teamShot, captionKey: "report" },
  tasks: { main: tasksShot, captionKey: "tasks" },
  assistant: { main: assistantShot, captionKey: "assistant" },
};

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Hero screen: starts tilted back and flattens as the page scrolls ─── */
const HeroScreen = ({ stats }: { stats: { v: string; l: string }[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(progress, [0, 1], [reduce ? 0 : 22, 0]);
  const scale = useTransform(progress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const chipNear = useTransform(progress, [0, 1], [reduce ? 0 : 80, 0]);
  const chipFar = useTransform(progress, [0, 1], [reduce ? 0 : 140, 0]);

  return (
    <div ref={ref} className="relative mt-14 [perspective:1400px]">
      <motion.div style={{ rotateX, scale, transformOrigin: "center top" }}>
        <BrowserFrame src={overviewShot} alt="" className="shadow-[0_60px_120px_-40px_hsl(var(--primary)/0.35)]" />
      </motion.div>
      {/* Floating stats around the screen */}
      <motion.div
        style={{ y: chipNear }}
        className="hidden md:block absolute -top-6 ltr:-left-6 rtl:-right-6 rounded-2xl border border-white/15 bg-surface-container/90 px-5 py-4 backdrop-blur-xl shadow-xl"
      >
        <p className="font-headline text-3xl font-semibold text-foreground">
          <CountUp value={stats[0].v} />
        </p>
        <p className="text-sm text-muted-foreground">{stats[0].l}</p>
      </motion.div>
      <motion.div
        style={{ y: chipFar }}
        className="hidden md:block absolute bottom-10 ltr:-right-6 rtl:-left-6 rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-xl"
      >
        <p className="font-headline text-3xl font-semibold">
          <CountUp value={stats[1].v} />
        </p>
        <p className="text-sm opacity-80">{stats[1].l}</p>
      </motion.div>
    </div>
  );
};

/* ─── Animated stand-ins for modules without a screenshot yet ─── */
const ModuleIllustration = ({ kind }: { kind: string }) => {
  if (kind === "performance") {
    return (
      <div className="space-y-4 p-6 md:p-8">
        {[30, 25, 15, 15, 15].map((v, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-3 flex-1 rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: `${(v / 30) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
              />
            </div>
            <span className="w-10 text-sm text-white/60" dir="ltr">
              {v}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "drive") {
    const rows = [0, 1, 1, 1, 2, 3, 3];
    return (
      <div className="space-y-2.5 p-6 md:p-8" dir="ltr">
        {rows.map((depth, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2.5"
            style={{ paddingLeft: depth * 22 }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Folder size={18} className={depth >= 2 ? "text-primary" : "text-white/50"} />
            <span className={`h-2.5 rounded-full bg-white/15 ${depth === 0 ? "w-40" : depth === 3 ? "w-24" : "w-32"}`} />
          </motion.div>
        ))}
      </div>
    );
  }
  // HR: a month grid where leave and expiry days light up.
  return (
    <div className="grid grid-cols-7 gap-1.5 p-6 md:p-8">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          className={`aspect-square rounded-md ${[4, 5, 6, 18].includes(i) ? "bg-primary/85" : i === 23 ? "bg-leak/70" : "bg-white/10"}`}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, delay: i * 0.02 }}
        />
      ))}
    </div>
  );
};

/* ─── One module: text on one side, its screen on the other, moving with the scroll ─── */
const ModuleRow = ({
  module,
  index,
  caption,
}: {
  module: { key: string; t: string; d: string; why: string };
  index: number;
  caption?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shotY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -70]);
  const backY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 120, reduce ? 0 : -40]);
  const Icon = MODULE_ICONS[module.key];
  const shot = MODULE_SHOTS[module.key];
  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center py-12 md:py-16">
      <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <Reveal>
          <span className="font-mono text-sm text-primary" dir="ltr">
            0{index + 1}
          </span>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex w-11 h-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon size={21} />
            </span>
            <h3 className="font-headline text-2xl md:text-3xl font-semibold text-foreground">{module.t}</h3>
          </div>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{module.d}</p>
          <p className="mt-5 flex gap-2.5 font-medium text-foreground">
            <Check size={20} className="mt-0.5 shrink-0 text-primary" />
            {module.why}
          </p>
          {caption && <p className="mt-5 text-sm text-muted-foreground/80 leading-relaxed">{caption}</p>}
        </Reveal>
      </div>

      <div className={`lg:col-span-7 relative ${flip ? "lg:order-1" : ""} ${shot?.back ? "pb-10 md:pb-16" : ""}`}>
        {shot ? (
          <>
            {shot.back && (
              <motion.div style={{ y: backY }} className="absolute inset-x-8 -top-8 opacity-60 blur-[1px]" aria-hidden="true">
                <BrowserFrame src={shot.back} alt="" />
              </motion.div>
            )}
            <motion.div style={{ y: shotY }} className="relative">
              <TiltCard max={4} glow="255 106 31 / 0.12" className="rounded-2xl">
                <BrowserFrame src={shot.main} alt={caption ?? module.t} />
              </TiltCard>
            </motion.div>
          </>
        ) : (
          <motion.div style={{ y: shotY }}>
            <TiltCard max={5} glow="255 106 31 / 0.14" className="rounded-2xl">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-container-low">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" dir="ltr" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <ModuleIllustration kind={module.key} />
              </div>
            </TiltCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ─── Task stages light up one by one as the pipeline scrolls through the viewport ─── */
const StagePipeline = ({ stages, reviewStages }: { stages: string[]; reviewStages: number[] }) => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute top-1/2 inset-x-0 hidden md:block h-px bg-border" />
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 inset-x-0 hidden md:block h-px bg-primary ltr:origin-left rtl:origin-right"
        style={{ scaleX: fill }}
      />
      <ol ref={ref} className="relative flex flex-wrap md:flex-nowrap justify-between gap-2">
        {stages.map((stage, i) => {
          const review = reviewStages.includes(i);
          const last = i === stages.length - 1;
          return (
            <motion.li
              key={stage}
              initial={{ opacity: 0.35, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 1, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                review
                  ? "border border-primary bg-background text-primary"
                  : last
                    ? "bg-gain text-background"
                    : "bg-surface-container-high text-foreground"
              }`}
            >
              {stage}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
};

const AgencyOsCase = () => {
  const { lang, isAr } = useLanguage();
  const c = shiftOsCase[lang];
  const Back = isAr ? ArrowRight : ArrowLeft;
  const captionFor = (key?: string) => c.shots.find((s) => s.key === key)?.caption;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* clip, not hidden: `overflow-x-hidden` on an ancestor kills the story runner's `sticky` */}
      <div className="bg-background text-foreground min-h-screen overflow-x-clip pb-20 md:pb-0">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="relative pt-28 md:pt-36 pb-16 md:pb-24">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[620px] pointer-events-none"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, hsl(var(--primary) / 0.14), transparent 70%)" }}
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

              <HeroScreen stats={c.stats} />
              <p className="mt-4 text-sm text-muted-foreground">{captionFor("overview")}</p>

              <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
                {c.stats.map((s, i) => (
                  <Reveal key={s.l} delay={i * 0.06}>
                    <div className="flex h-full flex-col-reverse rounded-2xl border border-border bg-surface-container p-5">
                      <dt className="mt-1 text-sm text-muted-foreground">{s.l}</dt>
                      <dd className="font-headline text-4xl md:text-5xl font-semibold text-foreground">
                        <CountUp value={s.v} />
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                {SHIFT_OS_MEASURED[lang]} · {c.insideNote}
              </p>
            </div>
          </section>

          {/* Challenge */}
          <section className="bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <SectionHeader tone="light" label={c.challengeLabel} title={c.challengeTitle} />
              <div className="grid md:grid-cols-3 gap-4">
                {c.challenges.map((item, i) => (
                  <Reveal key={item.t} delay={i * 0.08}>
                    <div className="group h-full rounded-3xl border border-ink/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(20,22,26,0.45)]">
                      <span className="font-mono text-sm text-ink/40 transition-colors group-hover:text-primary" dir="ltr">
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

          {/* What I built: one row per module */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <SectionHeader label={c.builtLabel} title={c.builtTitle} />
              <div className="divide-y divide-border">
                {c.modules.map((m, i) => (
                  <ModuleRow key={m.key} module={m} index={i} caption={captionFor(MODULE_SHOTS[m.key]?.captionKey)} />
                ))}
              </div>
            </div>
          </section>

          {/* How it got this way, told as a story you scroll through */}
          <SystemStory />

          {/* Task lifecycle + performance formula */}
          <section className="bg-surface-container-low border-y border-border py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <SectionHeader label={c.flowLabel} title={c.flowTitle} />
              <div className="overflow-x-auto pb-2">
                <StagePipeline stages={c.stages} reviewStages={c.reviewStages} />
              </div>
              <Reveal>
                <p className="mt-8 max-w-3xl rounded-2xl border border-border bg-surface-container p-5 text-muted-foreground leading-relaxed">
                  {c.flowNote}
                </p>
              </Reveal>

              <div className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
                <Reveal>
                  <h3 className="font-headline text-3xl md:text-4xl font-semibold leading-tight">{c.weightsTitle}</h3>
                </Reveal>
                <ul className="space-y-4">
                  {c.weights.map((w, i) => (
                    <li key={w.l}>
                      <div className="flex items-baseline justify-between gap-4 text-sm">
                        <span className="text-foreground">{w.l}</span>
                        <span className="font-headline text-lg font-semibold text-primary" dir="ltr">
                          <CountUp value={`${w.v}%`} />
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 rounded-full bg-surface-container-high">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(w.v / 30) * 100}%` }}
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{ duration: 1, delay: i * 0.1, ease }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
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
                    <TiltCard
                      max={5}
                      glow={i === 1 ? "255 255 255 / 0.2" : "255 106 31 / 0.10"}
                      className={`h-full rounded-3xl ${i === 1 ? "bg-primary text-primary-foreground" : "bg-white border border-ink/10"}`}
                    >
                      <div className="p-7">
                        <h3 className="font-headline text-xl font-semibold leading-snug">{item.t}</h3>
                        <p className={`mt-3 leading-relaxed ${i === 1 ? "text-primary-foreground/80" : "text-ink-muted"}`}>{item.d}</p>
                      </div>
                    </TiltCard>
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
                  {c.trust.map((item, i) => (
                    <Reveal key={item} delay={i * 0.05}>
                      <li className="flex gap-3">
                        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />
                        <span className="text-ink/85 leading-relaxed">{item}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6">
                <SectionHeader tone="light" label={c.numbersLabel} title={c.numbersTitle} sub={SHIFT_OS_MEASURED[lang]} />
                <dl className="-mt-4 grid grid-cols-2 gap-3">
                  {c.numbers.map((n, i) => (
                    <Reveal key={n.l} delay={i * 0.04}>
                      <div className="flex h-full flex-col-reverse rounded-2xl border border-ink/10 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                        <dt className="mt-1 text-sm text-ink-muted">{n.l}</dt>
                        <dd className="font-headline text-3xl font-semibold">
                          <CountUp value={n.v} />
                        </dd>
                      </div>
                    </Reveal>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* What the system taught him */}
          <section className="py-20 md:py-28">
            <SystemStoryLessons />
          </section>

          {/* Stack + CTA */}
          <section className="pb-20 md:pb-28">
            <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">{c.stackLabel}</p>
            <Marquee className="mt-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              {SHIFT_OS_STACK.map((tech) => (
                <span key={tech} className="flex items-center gap-10 whitespace-nowrap font-headline text-2xl md:text-3xl font-medium text-foreground/60">
                  {tech}
                  <span className="text-primary text-lg" aria-hidden="true">
                    ✦
                  </span>
                </span>
              ))}
            </Marquee>

            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <Reveal>
                <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-primary p-8 md:p-14 text-primary-foreground">
                  <div
                    aria-hidden="true"
                    className="absolute -top-24 ltr:-right-24 rtl:-left-24 w-80 h-80 rounded-full bg-white/15 blur-3xl motion-safe:animate-float"
                  />
                  <h2 className="relative max-w-2xl font-headline text-3xl md:text-5xl font-semibold leading-tight">{c.ctaTitle}</h2>
                  <p className="relative mt-4 max-w-xl text-lg text-primary-foreground/80">{c.ctaSub}</p>
                  <div className="relative mt-8 flex flex-wrap gap-3">
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
                    <Link to="/#work" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 font-semibold">
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
