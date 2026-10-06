import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Flag, Hammer, Pause, Play, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { JOURNEY, JourneyStation } from "@/data/journey";
import Runner from "@/components/journey/Runner";
import Building from "@/components/journey/Building";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const STOPS = JOURNEY.length; // the finish line sits at index STOPS
const HURDLE_BEFORE = 0.32; // hurdle position, in stations, before each building
const BUILDING_BACK = 0.24; // buildings stand a little behind the spot where he stops
const START_POS = -0.6; // where he waits for the countdown
const RUN_SECONDS = 1.6; // running from one station to the next
const WORK_MS = 4600; // time spent building at each station
const COUNT_MS = 650; // each step of the 3-2-1 countdown
const EASE = [0.16, 1, 0.3, 1] as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

const useViewportWidth = () => {
  const [width, setWidth] = useState(() => (typeof window === "undefined" ? 1280 : window.innerWidth));
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
};

// Deterministic skyline for the far background.
const SKYLINE = Array.from({ length: 90 }, (_, i) => ({
  w: 34 + ((i * 37) % 46),
  h: 40 + ((i * 53) % 90),
  gap: 6 + ((i * 17) % 18),
}));

// Confetti pieces for the finish line.
const CONFETTI = Array.from({ length: 42 }, (_, i) => ({
  x: ((i * 97) % 420) - 210,
  up: 120 + ((i * 47) % 140),
  rotate: (i * 83) % 540,
  delay: (i % 7) * 0.04,
  color: ["bg-primary", "bg-gain", "bg-secondary", "bg-ink", "bg-leak"][i % 5],
  shape: i % 3 === 0 ? "h-2 w-2 rounded-full" : "h-3 w-1.5 rounded-sm",
}));

const StationCopy = ({ station }: { station: JourneyStation }) => {
  const { t, lang } = useLanguage();
  const rows = [
    { label: t("journey.problem"), text: station.problem[lang], dot: "bg-leak" },
    { label: t("journey.action"), text: station.action[lang], dot: "bg-primary" },
    { label: t("journey.gain"), text: station.gain[lang], dot: "bg-gain" },
  ];
  return (
    <div className="grid gap-2 md:grid-cols-3 md:gap-5">
      {rows.map((row) => (
        <div key={row.label} className="rounded-xl md:rounded-2xl bg-white/70 border border-ink/10 px-3.5 py-2.5 md:p-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
            <span className={`h-2 w-2 rounded-full ${row.dot}`} />
            {row.label}
          </p>
          <p className="mt-1.5 md:mt-2 text-sm md:text-lg leading-snug md:leading-relaxed text-ink">{row.text}</p>
        </div>
      ))}
    </div>
  );
};

type Phase = "ready" | "count" | "run" | "work";

const JourneyTrack = () => {
  const { t, lang, isAr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const vw = useViewportWidth();
  const mobile = vw < 768;
  const step = mobile ? 270 : 440; // px between stations
  const start = mobile ? 150 : Math.min(vw * 0.26, 360); // runner's distance from the inline-start edge
  const jumpHeight = mobile ? 46 : 64;
  const blockAhead = mobile ? 40 : 52; // the block he hammers, in px ahead of him
  const worldWidth = start + STOPS * step + vw;
  // Physical left offset inside the track world (it runs right-to-left in Arabic).
  const at = (i: number) => (isAr ? worldWidth - (start + i * step) : start + i * step);
  const side = (px: number) => (isAr ? { right: px } : { left: px });
  const back = isAr ? 1 : -1; // physical direction of "behind him"

  // pos = where the runner is on the track; work = 1 while he builds.
  const pos = useMotionValue(START_POS);
  const work = useMotionValue(0);
  const [current, setCurrent] = useState(0); // the station he is at (STOPS = finish line)
  const [target, setTarget] = useState(0); // the station he is heading to
  const [phase, setPhase] = useState<Phase>("ready");
  const [count, setCount] = useState(3);
  const [playing, setPlaying] = useState(true);
  const runId = useRef(0);

  const goTo = useCallback(
    (to: number, seconds = RUN_SECONDS) => {
      const id = ++runId.current;
      setTarget(to);
      setPhase("run");
      work.set(0);
      animate(pos, to, { duration: seconds, ease: [0.42, 0, 0.4, 1] }).then(() => {
        if (id !== runId.current) return;
        setCurrent(to);
        setPhase("work");
      });
    },
    [pos, work],
  );

  // 3, 2, 1, go! once the section is on screen.
  useEffect(() => {
    if (inView && phase === "ready") setPhase("count");
  }, [inView, phase]);
  useEffect(() => {
    if (phase !== "count") return;
    const timer = setTimeout(() => {
      if (count > 0) setCount(count - 1);
      else goTo(0, 1.1);
    }, COUNT_MS);
    return () => clearTimeout(timer);
  }, [phase, count, goTo]);

  // Build for a few seconds, then run to the next station.
  useEffect(() => {
    if (phase !== "work") return;
    work.set(current < STOPS ? 1 : 0);
    if (!playing || !inView || current >= STOPS) return;
    const timer = setTimeout(() => goTo(current + 1), WORK_MS);
    return () => clearTimeout(timer);
  }, [phase, current, playing, inView, goTo, work]);

  const jumpTo = (to: number) => {
    setPlaying(false);
    goTo(clamp(to, 0, STOPS), 0.9);
  };
  const restart = () => {
    setPlaying(true);
    goTo(0, 1.6);
  };

  const worldX = useTransform(pos, (v) => back * v * step);
  const skylineX = useTransform(pos, (v) => back * (v - START_POS) * step * 0.3);
  const builtWidth = useTransform(pos, (v) => Math.max(0, start + v * step) + 1500);
  const stride = useTransform(pos, (v) => v * 3.2);
  const velocity = useVelocity(pos);
  const lean = useTransform(velocity, (v) => clamp(v * 9, -10, 12));
  const speed = useTransform(velocity, (v) => clamp(Math.abs(v) / 0.7, 0, 1));
  const jump = useTransform(pos, (v) => {
    const k = Math.round(v + HURDLE_BEFORE);
    if (k < 1 || k >= STOPS) return 0;
    const d = (v + HURDLE_BEFORE - k) / 0.17;
    return Math.abs(d) < 1 ? -(1 - d * d) * jumpHeight : 0;
  });
  const shadowScale = useTransform(jump, (y) => 1 + y / (jumpHeight * 1.4));

  const [cleared, setCleared] = useState(0);
  useMotionValueEvent(pos, "change", (v) => setCleared(Math.floor(v + HURDLE_BEFORE - 0.1)));

  const num = (n: number) => (isAr ? n.toLocaleString("ar-EG") : String(n).padStart(2, "0"));
  const station = current < STOPS ? JOURNEY[current] : null;
  const started = phase === "run" || phase === "work";
  const building = phase === "work" && current < STOPS;
  const built = (i: number) => started && (i < current || (i === current && phase === "work"));
  const finished = phase === "work" && current === STOPS;
  const deptName = (i: number) => (i < STOPS ? JOURNEY[i].dept[lang] : t("journey.finish.label"));

  const bubble =
    phase === "run"
      ? { icon: null, text: `${t("journey.going")} ${deptName(target)}` }
      : building
        ? { icon: Hammer, text: `${t("journey.building")} ${deptName(current)}` }
        : null;

  const skyline = useMemo(() => {
    let x = 0;
    return SKYLINE.map((b) => {
      const left = x;
      x += b.w + b.gap;
      return { ...b, left };
    });
  }, []);

  const ctrl =
    "flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none";
  const Back = isAr ? ChevronRight : ChevronLeft;
  const Forward = isAr ? ChevronLeft : ChevronRight;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] pt-16 md:pt-24 pb-16 md:pb-24"
    >
      {/* Header, station counter and controls */}
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-0.5 text-[11px] md:text-xs uppercase tracking-wider text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t("journey.label")}
          </p>
          <h2 className="mt-2 md:mt-3 font-headline text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-balance">
            {t("journey.title")}
          </h2>
        </div>
        <div className="flex items-end gap-4">
          <div className="text-end">
            <p className="text-[11px] md:text-xs uppercase tracking-wider text-ink/55">{t("journey.station")}</p>
            <p className="font-headline tabular-nums text-2xl md:text-4xl font-semibold">
              <span className="text-primary">{num(Math.min(current + 1, STOPS))}</span>
              <span className="text-ink/30"> / {num(STOPS)}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 pb-1">
            <button type="button" className={ctrl} onClick={() => jumpTo(target - 1)} disabled={!started || target === 0} aria-label={t("journey.prev")}>
              <Back className="h-5 w-5" />
            </button>
            {finished ? (
              <button type="button" className={ctrl} onClick={restart} aria-label={t("journey.replay")}>
                <RotateCcw className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                className={ctrl}
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? t("journey.pause") : t("journey.play")}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            )}
            <button type="button" className={ctrl} onClick={() => jumpTo(target + 1)} disabled={!started || target === STOPS} aria-label={t("journey.next")}>
              <Forward className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* The parts of the system built so far (click to jump to one) */}
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 mt-4">
        <ul className="flex flex-wrap gap-1 md:gap-2" aria-label={t("journey.collected")}>
          {JOURNEY.map((s, i) => {
            const Icon = s.icon;
            const on = built(i);
            return (
              <li key={s.key}>
                <button
                  type="button"
                  title={s.dept[lang]}
                  aria-label={s.dept[lang]}
                  onClick={() => jumpTo(i)}
                  className={`flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-md md:rounded-lg border transition-all duration-500 ${
                    on ? "bg-ink text-cream border-ink scale-100" : "border-ink/15 text-ink/30 scale-90 hover:text-ink/60"
                  } ${i === current && building ? "ring-2 ring-primary ring-offset-2 ring-offset-cream" : ""}`}
                >
                  <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The scene */}
      <div className="relative mt-4 md:mt-6 h-[280px] md:h-[340px]" aria-hidden="true">
        {/* far skyline, slower than the track */}
        <motion.div className="absolute bottom-16 md:bottom-[4.5rem] h-44" style={{ x: skylineX, width: 6000, ...side(-200) }}>
          {skyline.map((b) => (
            <span
              key={b.left}
              className="absolute bottom-0 rounded-t-sm bg-ink/[0.028]"
              style={{ width: b.w, height: b.h, ...side(b.left) }}
            />
          ))}
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-4 bg-ink/[0.06]" />

        <motion.div className="absolute inset-y-0" style={{ x: worldX, width: worldWidth, ...side(0) }}>
          {/* the "system" cable over the roofs: faint ahead, glowing where it's built */}
          <div
            className="absolute h-0 border-t-2 border-dashed border-ink/10 bottom-[168px] md:bottom-[212px]"
            style={{ ...side(-1500), width: worldWidth + 1500 }}
          />
          <motion.div
            className="absolute h-[3px] rounded-full bottom-[167px] md:bottom-[211px] shadow-[0_0_10px_hsl(var(--primary)/0.7)]"
            style={{
              ...side(-1500),
              width: builtWidth,
              backgroundImage:
                "repeating-linear-gradient(90deg, hsl(var(--primary)) 0 22px, hsl(var(--primary) / 0.45) 22px 40px)",
              animation: `journey-flow 0.9s linear infinite${isAr ? " reverse" : ""}`,
            }}
          />

          {/* lane: dashed (not built yet) … solid orange behind the runner (built) */}
          <div
            className="absolute bottom-4 h-12 md:h-14 bg-ink/[0.07] border-y border-ink/10"
            style={{ ...side(-1500), width: worldWidth + 1500 }}
          >
            <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-ink/15" />
          </div>
          <motion.div
            className="absolute bottom-4 h-12 md:h-14 bg-primary/20 border-y-2 border-primary"
            style={{ ...side(-1500), width: builtWidth }}
          >
            <div className="absolute inset-x-0 top-1/2 border-t-2 border-primary/50" />
          </motion.div>

          {/* start line */}
          <div className="absolute bottom-4 w-[160px]" style={{ left: at(START_POS - 0.15) - 80 }}>
            <div className="flex flex-col items-center">
              <span className="mb-1 rounded-full bg-ink px-3 py-1 text-xs md:text-sm font-semibold text-cream">
                {t("journey.start")}
              </span>
              <span className="h-14 md:h-16 w-1 bg-ink/40" />
            </div>
          </div>

          {JOURNEY.map((s, i) => {
            const done = built(i);
            const active = i === current && building;
            return (
              <div key={s.key}>
                {/* the building for this part of the company */}
                <div
                  className="absolute bottom-16 md:bottom-[4.5rem] w-[200px] flex justify-center"
                  style={{ left: at(i - BUILDING_BACK) - 100 }}
                >
                  <Building station={s} label={s.dept[lang]} built={done} active={active} party={finished} />
                </div>

                {/* the problem barrier before it */}
                {i > 0 && (
                  <div className="absolute bottom-[1.5rem] md:bottom-7 w-6" style={{ left: at(i - HURDLE_BEFORE) - 12 }}>
                    <div
                      className={`mx-auto flex h-8 w-4 md:h-10 md:w-5 items-start justify-center rounded-sm shadow-sm transition-colors duration-300 ${
                        i <= cleared ? "bg-gain" : ""
                      }`}
                      style={
                        i <= cleared
                          ? undefined
                          : { backgroundImage: "repeating-linear-gradient(-45deg, hsl(var(--leak)) 0 6px, #fff 6px 10px)" }
                      }
                    >
                      {i <= cleared && <Check className="mt-1 h-3 w-3 text-white" strokeWidth={3} />}
                    </div>
                  </div>
                )}

                {/* the part he hammers into place */}
                <div className="absolute bottom-[1.6rem] md:bottom-8 w-12" style={{ left: at(i) + back * -blockAhead - 24 }}>
                  <motion.div
                    initial={false}
                    animate={done ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 14 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14, delay: active ? 0.8 : 0 }}
                    className="relative mx-auto flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gain text-white shadow-md"
                  >
                    <s.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                  {/* sparks from the hammer */}
                  {active && (
                    <div className="absolute left-1/2 bottom-8 md:bottom-10">
                      {[
                        [-16, -18],
                        [14, -22],
                        [-6, -28],
                        [20, -10],
                        [-22, -6],
                      ].map(([x, y], k) => (
                        <span
                          key={k}
                          className={`absolute h-1.5 w-1.5 rounded-full ${k % 2 ? "bg-primary" : "bg-white"}`}
                          style={{
                            ["--spark-x" as string]: `${x}px`,
                            ["--spark-y" as string]: `${y}px`,
                            animation: `journey-spark 0.44s ease-out ${k * 0.03}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* finish line */}
          <div className="absolute bottom-4 w-[200px]" style={{ left: at(STOPS - 0.25) - 100 }}>
            <div className="flex flex-col items-center">
              <div
                className={`mb-1 flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold ${
                  finished ? "bg-primary text-primary-foreground" : "bg-ink text-cream"
                }`}
              >
                <Flag className="h-4 w-4" />
                {t("journey.finish.label")}
              </div>
              <div
                className="h-[10rem] md:h-[13rem] w-3 md:w-4"
                style={{
                  backgroundImage: "repeating-conic-gradient(hsl(var(--ink)) 0 25%, hsl(var(--cream)) 0 50%)",
                  backgroundSize: "8px 8px",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* runner stays in place; the world moves under him */}
        <div className="absolute bottom-5 md:bottom-6 w-[120px]" style={side(start - 60)}>
          {/* speed lines and dust behind him */}
          <motion.div className="absolute bottom-10 md:bottom-14 w-16" style={{ opacity: speed, ...side(-34) }}>
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className="absolute h-[2px] rounded-full bg-ink/25"
                style={{ width: 22 + k * 8, top: k * 12, ...(isAr ? { left: 0 } : { right: 0 }) }}
              />
            ))}
          </motion.div>
          <motion.div className="absolute bottom-0 h-4 w-10" style={{ opacity: speed, ...side(20) }}>
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className="absolute bottom-0 h-3 w-3 rounded-full bg-ink/20"
                style={{
                  ["--puff-x" as string]: `${back * (20 + k * 6)}px`,
                  animation: `journey-puff 0.5s ease-out ${k * 0.16}s infinite`,
                }}
              />
            ))}
          </motion.div>

          <motion.div className="mx-auto h-2 w-14 md:w-16 rounded-[50%] bg-ink/20" style={{ scaleX: shadowScale, y: 6 }} />
          <motion.div className="absolute bottom-0 inset-x-0 flex justify-center" style={{ y: jump }}>
            {/* a little victory hop at the finish line */}
            <motion.div
              animate={finished ? { y: [0, -22, 0] } : { y: 0 }}
              transition={finished ? { duration: 0.5, repeat: Infinity, repeatDelay: 0.35 } : { duration: 0.2 }}
            >
              <Runner stride={stride} lean={lean} work={work} className="h-[112px] w-[98px] md:h-[150px] md:w-[131px] rtl:-scale-x-100" />
            </motion.div>
          </motion.div>

          {/* what he is doing right now */}
          {bubble && (
            <motion.div
              key={bubble.text}
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute bottom-[8.4rem] md:bottom-[11rem] flex w-max max-w-[62vw] items-center gap-1.5 rounded-2xl bg-ink px-3 py-1.5 text-xs md:text-sm font-semibold text-cream shadow-lg"
              style={side(34)}
            >
              {bubble.icon ? (
                <bubble.icon className={`h-3.5 w-3.5 shrink-0 text-primary ${building ? "animate-bounce" : ""}`} />
              ) : (
                <span className="flex gap-0.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </span>
              )}
              {bubble.text}
            </motion.div>
          )}

          {/* confetti at the finish line */}
          {finished &&
            CONFETTI.map((c, k) => (
              <motion.span
                key={k}
                className={`absolute bottom-24 left-1/2 ${c.color} ${c.shape}`}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{ x: c.x, y: [0, -c.up - 80, 120], opacity: [1, 1, 0], rotate: c.rotate }}
                transition={{ duration: 2.4, delay: c.delay, ease: "easeOut" }}
              />
            ))}
        </div>

        {/* 3, 2, 1, go! */}
        <AnimatePresence>
          {phase === "count" && (
            <motion.div
              key={count}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 2.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span
                className={`flex h-32 w-32 md:h-44 md:w-44 items-center justify-center rounded-full bg-cream/90 shadow-2xl ring-4 font-headline font-bold tabular-nums ${
                  count === 0 ? "text-5xl md:text-7xl text-primary ring-primary" : "text-6xl md:text-8xl text-ink ring-ink/10"
                }`}
              >
                {count === 0 ? t("journey.go") : num(count).replace(/^0/, "")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* finish banner */}
        <AnimatePresence>
          {finished && (
            <motion.div
              className="absolute inset-x-0 -top-2 md:top-2 flex justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.5, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
            >
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <span className="rounded-2xl bg-primary px-5 py-2.5 md:px-8 md:py-4 font-headline text-xl md:text-4xl font-bold text-primary-foreground shadow-xl">
                  {t("journey.finish.title")}
                </span>
                {/* every part he built, lit up and wired together */}
                <div className="relative flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-[330px] md:max-w-none rotate-2">
                  <span className="absolute inset-x-2 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                  {JOURNEY.map((s, k) => (
                    <motion.span
                      key={s.key}
                      className="relative flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg bg-ink text-primary shadow-md"
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ delay: 0.4 + k * 0.07, type: "spring", stiffness: 380, damping: 14 }}
                    >
                      <s.icon className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* What happens at this station */}
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 mt-4 md:mt-6 min-h-[340px] md:min-h-[230px]">
        {/* time left at this station */}
        <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-ink/10">
          {building && playing && inView && (
            <motion.div
              key={`${current}-${playing}`}
              className="h-full bg-primary"
              style={{ transformOrigin: isAr ? "right" : "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: WORK_MS / 1000, ease: "linear" }}
            />
          )}
        </div>

        <motion.div
          key={current}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: phase === "run" || phase === "count" ? 0.45 : 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {station ? (
            <>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-headline text-xl md:text-3xl font-semibold">{station.dept[lang]}</h3>
                {station.slug && (
                  <Link
                    to={`/services/${station.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-ink/70 underline-offset-4 hover:text-primary hover:underline"
                  >
                    {t("journey.more")}
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                )}
              </div>
              <StationCopy station={station} />
            </>
          ) : (
            <div className="max-w-3xl">
              <h3 className="font-headline text-3xl md:text-5xl font-semibold leading-tight">{t("journey.finish.title")}</h3>
              <p className="mt-3 text-base md:text-xl text-ink-muted leading-relaxed">{t("journey.finish.sub")}</p>
              <a
                href="#audit"
                className="mt-5 inline-flex items-center rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"
              >
                {t("hero.cta1")}
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Visitors who turned motion off get the same stations as a plain list.
const JourneyList = () => {
  const { t, lang } = useLanguage();
  return (
    <section id="journey" className="bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader tone="light" label={t("journey.label")} title={t("journey.title")} />
        <ol className="space-y-10">
          {JOURNEY.map((s, i) => (
            <li key={s.key}>
              <Reveal>
                <h3 className="mb-3 font-headline text-2xl font-semibold">
                  <span className="text-primary tabular-nums">{i + 1}. </span>
                  {s.dept[lang]}
                </h3>
                <StationCopy station={s} />
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-14 max-w-3xl">
          <h3 className="font-headline text-3xl font-semibold">{t("journey.finish.title")}</h3>
          <p className="mt-3 text-lg text-ink-muted">{t("journey.finish.sub")}</p>
          <a href="#audit" className="mt-5 inline-flex rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
            {t("hero.cta1")}
          </a>
        </div>
      </div>
    </section>
  );
};

const JourneySection = () => (useReducedMotion() ? <JourneyList /> : <JourneyTrack />);

export default JourneySection;
