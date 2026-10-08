import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, EyeOff, Flag, Hammer, Lock, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/home/MobileCTABar";
import Reveal from "@/components/home/Reveal";
import CursorFollower from "@/components/motion/CursorFollower";
import Runner from "@/components/journey/Runner";
import {
  FLOW,
  FLOW_BLOCKERS,
  FLOW_INTRO,
  FLOW_LESSONS_TITLE,
  FLOW_PERMISSIONS,
  FLOW_TAKEAWAYS,
  FlowStation,
} from "@/data/postFlow";
import { WHATSAPP_URL } from "@/lib/contact";

const STOPS = FLOW.length;
const EASE = [0.16, 1, 0.3, 1] as const;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const num = (n: number) => n.toLocaleString("ar-EG");

// The lane always sits at the start edge so the chapter beside it gets the full width —
// these screens only read when they are big. The page is right-to-left whatever the site
// language, so these are plain RTL classes rather than Tailwind direction variants.
const ON_LANE = "right-0";
const BESIDE_LANE = "pr-[3.75rem] md:pr-[15rem]";

/* ─── One real screen, inside a window frame ─── */
const Shot = ({ src, caption }: { src: string; caption?: string }) => (
  <figure className="mt-5 md:mt-6">
    <div className="overflow-hidden rounded-xl border border-ink/15 bg-[#0C0A18] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)] md:rounded-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2 md:px-4 md:py-2.5" dir="ltr" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
      </div>
      <div className="overflow-x-auto overscroll-x-contain">
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="block h-[300px] w-auto max-w-none md:mx-auto md:h-auto md:max-h-[560px] md:max-w-full"
        />
      </div>
    </div>
    {caption && (
      <figcaption className="mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed text-ink/55 md:text-sm">
        <EyeOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          {caption}
          <span className="text-ink/40 md:hidden"> · اسحب الصورة يمين وشمال.</span>
        </span>
      </figcaption>
    )}
  </figure>
);

/* ─── The chapter's words: what I built, then the rule it enforces ─── */
const StationCopy = ({ station }: { station: FlowStation }) => (
  <>
    <p className="text-[15px] leading-relaxed text-ink md:text-lg">{station.story}</p>

    {station.steps && (
      <ol className="mt-4 flex flex-col items-start gap-1.5 text-sm font-semibold md:flex-row md:flex-wrap md:items-center md:gap-y-2">
        {station.steps.map((step, k) => (
          <li key={step} className="flex flex-col items-center gap-1 md:flex-row md:gap-0">
            <span
              className={`rounded-lg border px-2.5 py-1.5 shadow-sm ${
                k === station.steps!.length - 1 ? "border-gain/40 bg-gain/10 text-ink" : "border-ink/15 bg-white"
              }`}
            >
              {k < station.steps!.length - 1 && <span className="text-primary">{num(k + 1)} </span>}
              {step}
            </span>
            {k < station.steps!.length - 1 && <ArrowDown className="h-4 w-4 text-ink/30 md:mx-1 md:rotate-90" />}
          </li>
        ))}
      </ol>
    )}

    {station.turn && (
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-leak/25 bg-leak/[0.06] px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leak">
            <RefreshCw className="h-3.5 w-3.5" />
            كان
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink/80 md:text-base">{station.turn.was}</p>
        </div>
        <div className="rounded-xl border border-gain/30 bg-gain/[0.08] px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
            <Check className="h-3.5 w-3.5 text-gain" strokeWidth={3} />
            بقى
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink md:text-base">{station.turn.now}</p>
        </div>
      </div>
    )}

    <div className="mt-4 rounded-xl border-r-[3px] border-primary bg-primary/[0.07] px-4 py-3">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
        <Lock className="h-3.5 w-3.5 text-primary" />
        القاعدة اللي قفلتها
      </p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink md:text-lg">{station.rule}</p>
    </div>
  </>
);

/* ─── The track: a lane down the page, with him running it beside the chapters ─── */
const FlowTrack = () => {
  const laneRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hurdleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // How far down the track his feet are, in px from the top of the lane.
  const feet = useMotionValue(0);
  const velocity = useVelocity(feet);
  const runRaw = useTransform(velocity, (v) => clamp(Math.abs(v) / 900, 0, 1));
  const run = useSpring(runRaw, { stiffness: 140, damping: 22 });
  const stride = useTransform(feet, (y) => y / 150);
  const air = useMotionValue(0);
  const jump = useTransform(air, (a) => -a * 56);
  const fill = useMotionValue(0);

  const [reached, setReached] = useState(-1);
  const [cleared, setCleared] = useState(-1);
  const [moving, setMoving] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const lane = laneRef.current;
      const runner = runnerRef.current;
      if (!lane || !runner) return;
      const laneRect = lane.getBoundingClientRect();
      const feetY = runner.getBoundingClientRect().bottom - 8;
      const y = clamp(feetY - laneRect.top, 0, laneRect.height);
      feet.set(y);
      fill.set(y / laneRect.height);
      setFinished(y >= laneRect.height - 4);

      let r = -1;
      markerRefs.current.forEach((m, i) => {
        if (m && m.getBoundingClientRect().top + 16 < feetY) r = i;
      });
      setReached(r);

      let c = -1;
      let a = 0;
      hurdleRefs.current.forEach((h, i) => {
        if (!h) return;
        const d = feetY - h.getBoundingClientRect().top;
        if (d > 0) c = i;
        const k = d / 70;
        if (Math.abs(k) < 1) a = Math.max(a, 1 - k * k);
      });
      setCleared(c);
      air.set(a);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [feet, fill, air]);

  useEffect(() => run.on("change", (v) => setMoving(v > 0.25)), [run]);

  const current = clamp(reached, 0, STOPS - 1);
  const next = Math.min(reached + 1, STOPS - 1);
  const bubble = finished
    ? null
    : moving
      ? `رايح على ${FLOW[next].title}`
      : reached >= 0
        ? `ببني: ${FLOW[current].title}`
        : "انزل بالسكرول وأنا هجري معاك";

  return (
    <div className="relative">
      {/* the lane */}
      <div
        ref={laneRef}
        className={`absolute inset-y-0 w-14 rounded-full bg-ink/[0.07] md:w-20 ${ON_LANE}`}
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 26px, rgba(255,255,255,0.9) 26px 30px)" }}
      >
        <div className="absolute inset-x-[30%] inset-y-0 border-x border-white/50" />
        <motion.div className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-primary/60" style={{ scaleY: fill }} />
      </div>

      {/* him, pinned near the top of the screen, running down the lane with the visitor */}
      <div className="sticky top-[26vh] z-20 h-0">
        <div ref={runnerRef} className={`absolute flex w-14 flex-col items-center md:w-20 ${ON_LANE}`}>
          <motion.div className="flex h-[112px] w-[78px] justify-center md:h-[150px] md:w-[104px]" style={{ y: jump }}>
            <motion.div
              animate={finished ? { y: [0, -16, 0] } : { y: 0 }}
              transition={finished ? { duration: 0.5, repeat: Infinity, repeatDelay: 0.4 } : { duration: 0.2 }}
            >
              <Runner stride={stride} run={run} air={air} className="h-[112px] w-[78px] md:h-[150px] md:w-[104px]" />
            </motion.div>
          </motion.div>
          <span className="-mt-1 h-2 w-10 rounded-[50%] bg-ink/25 md:w-14" />
          {bubble && (
            <motion.div
              key={bubble}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute -top-9 right-0 flex w-max max-w-[200px] items-center gap-1.5 rounded-2xl bg-ink px-2.5 py-1 text-[11px] font-semibold leading-tight text-cream shadow-lg md:-top-11 md:max-w-[224px] md:px-3 md:py-1.5 md:text-sm"
            >
              {moving ? (
                <span className="flex gap-0.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </span>
              ) : reached >= 0 ? (
                <Hammer className="h-3.5 w-3.5 text-primary animate-bounce" />
              ) : (
                <ArrowDown className="h-3.5 w-3.5 text-primary animate-bounce" />
              )}
              {bubble}
            </motion.div>
          )}
          {!moving && reached >= 0 && !finished && (
            <div className="absolute bottom-6 left-1/2">
              {[
                [-26, -16], [22, -20], [-8, -30], [30, -8], [-32, -4], [8, -26],
              ].map(([x, y], k) => (
                <span
                  key={k}
                  className={`absolute h-1.5 w-1.5 rounded-full ${k % 2 ? "bg-primary" : "bg-white"}`}
                  style={{
                    ["--spark-x" as string]: `${x}px`,
                    ["--spark-y" as string]: `${y}px`,
                    animation: `journey-spark 0.5s ease-out ${k * 0.05}s infinite`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* start line */}
      <div className={`relative flex h-24 items-center md:h-32 ${BESIDE_LANE}`}>
        <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-cream shadow-md">البداية</span>
      </div>

      {/* the chapters */}
      <ol>
        {FLOW.map((s, i) => {
          const Icon = s.icon;
          const done = i <= reached;
          const here = i === reached && !moving;
          return (
            <li key={s.key} className="relative">
              {/* hurdle across the lane before every station */}
              <div
                ref={(el) => {
                  hurdleRefs.current[i] = el;
                }}
                className={`relative flex h-16 w-14 items-center justify-center md:h-20 md:w-20 ${ON_LANE}`}
              >
                <div className="relative w-12 md:w-16">
                  <div
                    className={`h-2.5 w-full rounded-sm md:h-3 ${i <= cleared ? "bg-gain" : ""}`}
                    style={i <= cleared ? undefined : { backgroundImage: "repeating-linear-gradient(-45deg, hsl(var(--leak)) 0 7px, #fff 7px 12px)" }}
                  />
                  <div className="flex justify-between px-1">
                    <span className="h-3 w-1 bg-ink/60" />
                    <span className="h-3 w-1 bg-ink/60" />
                  </div>
                  {i <= cleared && (
                    <span className="absolute -left-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gain text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </div>
              </div>

              <div className="relative pb-10 md:pb-16">
                {/* station marker on the lane */}
                <div
                  ref={(el) => {
                    markerRefs.current[i] = el;
                  }}
                  className={`absolute top-1 z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-cream transition-colors duration-500 md:h-20 md:w-20 ${ON_LANE} ${
                    here
                      ? "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
                      : done
                        ? "bg-ink text-cream"
                        : "bg-white text-ink/40"
                  }`}
                >
                  <Icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>

                <Reveal className={BESIDE_LANE}>
                  <article
                    className={`rounded-2xl border bg-white p-5 shadow-sm transition-all duration-500 md:rounded-3xl md:p-7 ${
                      here
                        ? "border-primary shadow-[0_12px_40px_hsl(var(--primary)/0.15)]"
                        : done
                          ? "border-ink/15"
                          : "border-ink/10 opacity-80"
                    }`}
                  >
                    <p className="font-headline text-xs tracking-wider text-ink/50">
                      المحطة {num(i + 1)} / {num(STOPS)}
                    </p>
                    <h3 className="mt-1.5 font-headline text-2xl font-semibold leading-[1.25] md:text-3xl">{s.title}</h3>
                    <div className="mt-4">
                      <StationCopy station={s} />
                    </div>
                    {s.shot && <Shot src={s.shot} caption={s.caption} />}
                  </article>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>

      {/* finish line */}
      <div className="relative">
        <div
          className={`relative h-6 w-14 md:w-20 ${ON_LANE}`}
          style={{ background: "repeating-conic-gradient(hsl(var(--ink)) 0 25%, hsl(var(--cream)) 0 50%) 0 0 / 12px 12px" }}
        />
        <div className={`mt-8 max-w-3xl md:mt-12 ${BESIDE_LANE}`}>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
              finished ? "bg-primary text-primary-foreground" : "bg-ink text-cream"
            }`}
          >
            <Flag className="h-4 w-4" />
            خط النهاية
          </span>
          <h3 className="mt-4 font-headline text-2xl font-semibold leading-[1.3] md:text-4xl">
            البوست بينزل، والملف بيروح لفولدره لوحده.
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-xl">
            ومحدش احتاج يسأل «وصلت لفين؟» ولا يعمل اجتماع يعرف مين عمل إيه. ده اللي كنت بنيه من الأول.
          </p>
        </div>
      </div>
    </div>
  );
};

// Visitors who turned motion off get the same chapters as a plain list.
const FlowList = () => (
  <ol className="space-y-12">
    {FLOW.map((s, i) => (
      <li key={s.key}>
        <h3 className="mb-3 font-headline text-2xl font-semibold md:text-3xl">
          <span className="tabular-nums text-primary">{num(i + 1)}. </span>
          {s.title}
        </h3>
        <StationCopy station={s} />
        {s.shot && <Shot src={s.shot} caption={s.caption} />}
      </li>
    ))}
  </ol>
);

const AgencyOsFlow = () => {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <CursorFollower />
      <Navbar />

      <main dir="rtl" lang="ar">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="pointer-events-none absolute -top-40 right-1/4 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-[120px]" />
          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <Link
              to="/work/agency-os"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 -scale-x-100" />
              دراسة الحالة · نظام تشغيل داخلي
            </Link>

            <div className="mt-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-foreground/75">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {FLOW_INTRO.label}
              </p>
            </div>
            <h1 className="mt-5 max-w-4xl font-headline text-3xl font-semibold leading-[1.35] text-foreground md:text-5xl">
              {FLOW_INTRO.title}
            </h1>
            <p className="mt-6 font-headline text-2xl font-semibold text-primary md:text-3xl">{FLOW_INTRO.lead}</p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl">{FLOW_INTRO.sub}</p>
            <p className="mt-5 inline-block rounded-full border border-white/10 bg-surface-container/60 px-4 py-2 font-headline text-sm text-foreground/80 md:text-base">
              {FLOW_INTRO.scale}
            </p>

            {/* the four steps of the whole thing, before the detail */}
            <div className="mt-10 flex flex-wrap items-stretch gap-3 md:gap-4">
              {FLOW_INTRO.chain.map((c, i) => (
                <div key={c.t} className="flex items-stretch gap-3 md:gap-4">
                  <div
                    className={`min-w-[8.5rem] rounded-2xl border px-4 py-3.5 md:min-w-[11rem] md:px-5 md:py-4 ${
                      i === FLOW_INTRO.chain.length - 1 ? "border-gain/40 bg-gain/10" : "border-white/10 bg-surface-container/70"
                    }`}
                  >
                    <p className="font-headline text-base font-semibold text-foreground md:text-lg">{c.t}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground md:text-sm">{c.d}</p>
                  </div>
                  {i < FLOW_INTRO.chain.length - 1 && (
                    <span className="self-center text-xl text-primary/70">←</span>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-8 flex max-w-2xl items-start gap-2 rounded-xl border border-white/10 bg-surface-container/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              <EyeOff className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {FLOW_INTRO.privacy}
            </p>
            <p className="mt-3 text-xs text-muted-foreground/70" dir="ltr" lang="en">
              {FLOW_INTRO.englishNote}
            </p>
          </div>
        </section>

        {/* ── The story ── */}
        <section className="rounded-t-[2rem] bg-cream pb-24 pt-16 text-ink md:rounded-t-[2.5rem] md:pb-32 md:pt-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">{reduce ? <FlowList /> : <FlowTrack />}</div>
        </section>

        {/* ── What holds a task where it is ── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-foreground/75">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                القواعد
              </p>
              <h2 className="mt-5 max-w-3xl font-headline text-3xl font-semibold leading-[1.3] text-foreground md:text-5xl">
                تلات حاجات بس بتوقف المهمة
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                مهما اتعقّد الشغل، اللي بيمنع زرار «تم» تلاتة لا رابع ليهم. وكاتب لكل واحدة فيهم سطر تحت الزرار بيقول الناقص بالاسم — قبل ما تدوس.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
              {FLOW_BLOCKERS.map((b) => (
                <Reveal key={b.n}>
                  <article className="h-full rounded-2xl border border-leak/25 bg-leak/[0.06] p-6 md:rounded-3xl md:p-7">
                    <p className="font-headline text-sm font-semibold text-leak">{b.n}</p>
                    <h3 className="mt-2 font-headline text-xl font-semibold text-foreground md:text-2xl">{b.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">{b.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Three things people mix up ── */}
        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal>
              <h2 className="max-w-4xl font-headline text-2xl font-semibold leading-[1.3] text-foreground md:text-4xl">
                «يعدّل المهمة» غير «يشتغل فيها» غير «يحرّكها»
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
تلاتة مختلفين، وده أكتر حاجة كانت بتلخبط الفريق. فصلتهم عن بعض في الصلاحيات: الكاتب مش هيقدر يغيّر تاريخ تسليم ولا يشيل حد من الطاقم — وده مقصود، وشغله وحركة مرحلته مفتوحين زي ما هما.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
              {FLOW_PERMISSIONS.map((p) => {
                const tone =
                  p.tone === "leak"
                    ? "border-leak/25 bg-leak/[0.06] text-leak"
                    : p.tone === "gain"
                      ? "border-gain/25 bg-gain/[0.06] text-gain"
                      : "border-primary/30 bg-primary/[0.08] text-primary";
                return (
                  <Reveal key={p.key}>
                    <article className={`h-full rounded-2xl border p-6 md:rounded-3xl md:p-7 ${tone.split(" ").slice(0, 2).join(" ")}`}>
                      <h3 className="font-headline text-2xl font-semibold text-foreground md:text-3xl">{p.title}</h3>
                      <p className={`mt-2 text-sm ${tone.split(" ")[2]}`}>{p.what}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {p.who.map((w) => (
                          <li key={w} className="rounded-full border border-white/10 bg-surface-container/70 px-3 py-1.5 text-sm text-muted-foreground">
                            {w}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Close ── */}
        <section className="relative overflow-hidden pb-24 md:pb-32">
          <div className="pointer-events-none absolute -bottom-48 left-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />
          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <Reveal>
              <h2 className="max-w-3xl font-headline text-3xl font-semibold leading-[1.3] text-foreground md:text-5xl">
                {FLOW_LESSONS_TITLE}
              </h2>
            </Reveal>
            <ul className="mt-8 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-4">
              {FLOW_TAKEAWAYS.map((t, i) => (
                <Reveal key={t}>
                  <li className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-surface-container/60 p-5 md:p-6">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-headline text-sm font-semibold text-primary">
                      {num(i + 1)}
                    </span>
                    <span className="text-[15px] leading-relaxed text-muted-foreground md:text-base">{t}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal>
              <div className="mt-12 rounded-3xl border border-primary/25 bg-primary/[0.07] p-7 md:mt-16 md:p-10">
                <h3 className="font-headline text-2xl font-semibold leading-[1.25] text-foreground md:text-4xl">
                  عايز شغل شركتك يمشي كده؟
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  أول خطوة تشخيص مجاني: نتكلم ربع ساعة، أقولك إيه اللي بيضيع فين، ولو مش محتاج نظام هقولك.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                  >
                    احجز تشخيص مجاني
                  </a>
                  <Link
                    to="/work/agency-os"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-foreground transition-colors hover:border-primary/50"
                  >
                    ارجع لدراسة الحالة
                    <ArrowUpRight className="h-4 w-4 -scale-x-100" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCTABar />
    </div>
  );
};

export default AgencyOsFlow;
