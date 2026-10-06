import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Flag, Hammer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { JOURNEY, JourneyStation } from "@/data/journey";
import Runner from "@/components/journey/Runner";
import Building from "@/components/journey/Building";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const STOPS = JOURNEY.length; // the finish line sits at index STOPS
const START_POS = -0.55; // where he waits before the first station
const END_POS = STOPS + 0.45; // a little past the finish line
const HURDLE_BEFORE = 0.34; // hurdle position, in stations, before each building
const SEGMENT_VH = 62; // scroll length per station
const DWELL = 0.3; // the part of each station's scroll where he stays put and builds
const FLOOR_TILT = 58; // the track plane, in degrees from the screen
const EASE = [0.16, 1, 0.3, 1] as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

// Viewport size in px. Heights are set in px (not vh/svh) so the pinned scene works on every
// browser; small height changes (a phone's address bar showing/hiding) are ignored.
const useViewport = () => {
  const [size, setSize] = useState(() =>
    typeof window === "undefined" ? { w: 1280, h: 800 } : { w: window.innerWidth, h: window.innerHeight },
  );
  useEffect(() => {
    const update = () =>
      setSize((prev) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        return w !== prev.w || Math.abs(h - prev.h) > 120 ? { w, h } : prev;
      });
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
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

const JourneyTrack = () => {
  const { t, lang, isAr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { w: vw, h: vh } = useViewport();
  const mobile = vw < 768;
  const step = mobile ? 300 : 460; // px between stations
  const start = mobile ? 120 : Math.min(vw * 0.26, 380); // runner's distance from the inline-start edge
  const jumpHeight = mobile ? 50 : 66;
  const floorH = mobile ? 150 : 190; // depth of the track plane before it is tilted
  const buildingBack = mobile ? 0.42 : 0.32; // buildings stand behind the spot where he stops, in stations
  const worldWidth = start + STOPS * step + vw;
  // Physical left offset inside the track world (it runs right-to-left in Arabic).
  const at = (i: number) => (isAr ? worldWidth - (start + i * step) : start + i * step);
  const side = (px: number) => (isAr ? { right: px } : { left: px });
  const back = isAr ? 1 : -1; // physical direction of "behind him"

  // How far the visitor has scrolled through the section (0 → 1), read straight from the page.
  const progress = useMotionValue(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress.set(total > 0 ? clamp(-rect.top / total, 0, 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [progress]);

  // pos = where he is on the track, in stations. He follows the visitor's scroll like a race,
  // but each station holds him for a short part of the scroll so he stops in front of what he builds.
  const rawPos = useTransform(progress, (p) => {
    const r = START_POS + p * (END_POS - START_POS);
    if (r < 0 || r >= STOPS) return r;
    const i = Math.floor(r);
    const f = r - i;
    const move = clamp((f - DWELL) / (1 - DWELL), 0, 1);
    return i + move * move * (3 - 2 * move);
  });
  const pos = useSpring(rawPos, { stiffness: 90, damping: 24, mass: 0.9 });
  const velocity = useVelocity(pos); // stations per second
  const runRaw = useTransform(velocity, (v) => clamp(Math.abs(v) / 1.1, 0, 1));
  const run = useSpring(runRaw, { stiffness: 140, damping: 22 });
  const lean = useTransform(velocity, (v) => 8 + clamp(Math.abs(v) * 5, 0, 8));
  const stride = useTransform(pos, (v) => v * 2.6);

  const worldX = useTransform(pos, (v) => back * v * step);
  const skylineX = useTransform(pos, (v) => back * (v - START_POS) * step * 0.28);
  const builtWidth = useTransform(pos, (v) => Math.max(0, start + v * step + 2500));
  const jump = useTransform(pos, (v) => {
    const k = Math.round(v + HURDLE_BEFORE);
    if (k < 1 || k >= STOPS) return 0;
    const d = (v + HURDLE_BEFORE - k) / 0.2;
    return Math.abs(d) < 1 ? -(1 - d * d) * jumpHeight : 0;
  });
  const air = useTransform(jump, (y) => clamp(-y / jumpHeight, 0, 1));
  const shadowScale = useTransform(jump, (y) => 1 + y / (jumpHeight * 1.4));
  const shadowFade = useTransform(jump, (y) => 1 + y / (jumpHeight * 2));

  // React state follows the motion values only where the markup has to change.
  const [current, setCurrent] = useState(0); // the station he is at or heading to
  const [reachedCount, setReachedCount] = useState(0); // stations he has reached (built)
  const [cleared, setCleared] = useState(0); // hurdles behind him
  const [moving, setMoving] = useState(false);
  const [started, setStarted] = useState(false);
  useMotionValueEvent(pos, "change", (v) => {
    setCurrent(clamp(Math.round(v), 0, STOPS));
    setReachedCount(clamp(Math.floor(v + 0.12) + 1, 0, STOPS + 1));
    setCleared(Math.floor(v + HURDLE_BEFORE - 0.1));
    setStarted(v > START_POS + 0.05);
  });
  useMotionValueEvent(run, "change", (v) => setMoving(v > 0.25));

  const num = (n: number) => (isAr ? n.toLocaleString("ar-EG") : String(n).padStart(2, "0"));
  const station = current < STOPS ? JOURNEY[current] : null;
  const built = (i: number) => i < reachedCount;
  const finished = reachedCount > STOPS;
  const deptName = (i: number) => (i < STOPS ? JOURNEY[i].dept[lang] : t("journey.finish.label"));
  const active = current < STOPS && built(current) && !moving;

  const bubble = finished
    ? null
    : moving
      ? { icon: null, text: `${t("journey.going")} ${deptName(built(current) ? Math.min(current + 1, STOPS) : current)}` }
      : active
        ? { icon: Hammer, text: `${t("journey.building")} ${deptName(current)}` }
        : { icon: ArrowDown, text: t("journey.waiting") };

  const skyline = useMemo(() => {
    let x = 0;
    return SKYLINE.map((b) => {
      const left = x;
      x += b.w + b.gap;
      return { ...b, left };
    });
  }, []);

  // The buttons scroll the page to a station, so the runner gets there the same way the visitor would.
  const scrollToStation = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const p = (clamp(i, 0, STOPS) - START_POS) / (END_POS - START_POS);
    window.scrollTo({ top: window.scrollY + rect.top + p * total, behavior: "smooth" });
  };

  const ctrl =
    "flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none";
  const Back = isAr ? ChevronRight : ChevronLeft;
  const Forward = isAr ? ChevronLeft : ChevronRight;

  const laneStripe = "repeating-linear-gradient(to top, transparent 0 46px, rgba(255,255,255,0.85) 46px 49px)";
  const checker = (size: number) =>
    `repeating-conic-gradient(hsl(var(--ink)) 0 25%, hsl(var(--cream)) 0 50%) 0 0 / ${size}px ${size}px`;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem]"
      style={{ height: Math.round(((END_POS - START_POS) * SEGMENT_VH * vh) / 100 + vh) }}
    >
      <div className="sticky top-0 overflow-hidden flex flex-col pt-20 md:pt-24 pb-24 md:pb-8" style={{ height: vh }}>
        {/* Header, station counter and controls */}
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-0.5 text-[11px] md:text-xs uppercase tracking-wider text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("journey.label")}
            </p>
            <h2 className="mt-2 md:mt-3 font-headline text-2xl md:text-5xl font-semibold leading-tight tracking-tight text-balance">
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
              <button type="button" className={ctrl} onClick={() => scrollToStation(current - 1)} disabled={current === 0} aria-label={t("journey.prev")}>
                <Back className="h-5 w-5" />
              </button>
              <button type="button" className={ctrl} onClick={() => scrollToStation(current + 1)} disabled={current === STOPS} aria-label={t("journey.next")}>
                <Forward className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* The parts of the system built so far (click to go to one) */}
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 mt-3 md:mt-4">
          <ul className="flex flex-wrap gap-1 md:gap-2" aria-label={t("journey.collected")}>
            {JOURNEY.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    title={s.dept[lang]}
                    aria-label={s.dept[lang]}
                    onClick={() => scrollToStation(i)}
                    className={`flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-md md:rounded-lg border transition-all duration-500 ${
                      built(i) ? "bg-ink text-cream border-ink scale-100" : "border-ink/15 text-ink/30 scale-90 hover:text-ink/60"
                    } ${i === current && active ? "ring-2 ring-primary ring-offset-2 ring-offset-cream" : ""}`}
                  >
                    <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* The scene */}
        <div
          className="relative mt-2 md:mt-4 h-[290px] md:h-[360px] flex-none"
          style={{ perspective: 1100, perspectiveOrigin: "50% 35%" }}
          aria-hidden="true"
        >
          {/* far skyline, slower than the track */}
          <motion.div className="absolute bottom-[4.5rem] md:bottom-24 h-44" style={{ x: skylineX, width: 6000, ...side(-200) }}>
            {skyline.map((b) => (
              <span
                key={b.left}
                className="absolute bottom-0 rounded-t-sm bg-ink/[0.035]"
                style={{ width: b.w, height: b.h, ...side(b.left) }}
              />
            ))}
          </motion.div>
          {/* pavement behind the track */}
          <div className="absolute inset-x-0 bottom-[4.5rem] md:bottom-24 h-3 md:h-4 bg-ink/[0.09] border-t border-ink/10" />

          <motion.div className="absolute inset-y-0" style={{ x: worldX, width: worldWidth, transformStyle: "preserve-3d", ...side(0) }}>
            {/* the running track, tilted back like a real floor */}
            <div
              className="absolute bottom-0 border-t-4 border-white/70"
              style={{
                ...side(-2500),
                width: worldWidth + 5000,
                height: floorH,
                transform: `rotateX(${FLOOR_TILT}deg)`,
                transformOrigin: "center bottom",
                backgroundColor: "hsl(var(--track))",
                backgroundImage: `${laneStripe}, linear-gradient(to top, hsl(var(--track)) 0, hsl(var(--track-2)) 100%)`,
                boxShadow: "inset 0 -6px 12px rgba(0,0,0,0.08)",
              }}
            >
              {/* built lanes glow orange behind him */}
              <motion.div
                className="absolute inset-y-0 bg-primary/35"
                style={{ ...side(0), width: builtWidth, backgroundImage: laneStripe }}
              />
              {/* start and finish painted across the lanes */}
              <div className="absolute inset-y-0 w-[14px] bg-white/90" style={{ left: at(START_POS) + 2500 - 7 }} />
              <div className="absolute inset-y-0 w-[22px]" style={{ left: at(STOPS) + 2500 - 11, background: checker(11) }} />
              {/* a faint mark at every station */}
              {JOURNEY.map((s, i) => (
                <div key={s.key} className="absolute inset-y-0 w-[3px] bg-white/30" style={{ left: at(i) + 2500 - 1 }} />
              ))}
            </div>

            {/* the "system" cable over the roofs: faint ahead, glowing where it's built */}
            <div
              className="absolute h-0 border-t-2 border-dashed border-ink/10 bottom-[226px] md:bottom-[286px]"
              style={{ ...side(-2500), width: worldWidth + 5000 }}
            />
            <motion.div
              className="absolute h-[3px] rounded-full bottom-[225px] md:bottom-[285px] shadow-[0_0_10px_hsl(var(--primary)/0.7)]"
              style={{
                ...side(-2500),
                width: builtWidth,
                backgroundImage:
                  "repeating-linear-gradient(90deg, hsl(var(--primary)) 0 22px, hsl(var(--primary) / 0.45) 22px 40px)",
                animation: `journey-flow 0.9s linear infinite${isAr ? " reverse" : ""}`,
              }}
            />

            {/* start sign */}
            <div className="absolute bottom-[4.5rem] md:bottom-24 w-[160px]" style={{ left: at(START_POS) - 80 }}>
              <div className="flex flex-col items-center">
                <span className="mb-1 rounded-full bg-ink px-3 py-1 text-xs md:text-sm font-semibold text-cream shadow-md">
                  {t("journey.start")}
                </span>
                <span className="h-10 md:h-12 w-1 bg-ink/40" />
              </div>
            </div>

            {JOURNEY.map((s, i) => {
              const done = built(i);
              const here = i === current && active;
              return (
                <div key={s.key}>
                  {/* the building for this part of the company, on the pavement behind the track */}
                  <div
                    className="absolute bottom-[4.5rem] md:bottom-24 w-[220px] flex justify-center"
                    style={{ left: at(i - buildingBack) - 110 }}
                  >
                    <Building station={s} label={s.dept[lang]} built={done} active={here} party={finished} rtl={isAr} />
                  </div>

                  {/* the hurdle before it: two legs and a striped bar, green once he's over it */}
                  {i > 0 && (
                    <div className="absolute bottom-3 md:bottom-4 w-10 md:w-12" style={{ left: at(i - HURDLE_BEFORE) - (mobile ? 20 : 24) }}>
                      <div
                        className={`h-2.5 md:h-3 w-full rounded-sm shadow-sm transition-colors duration-300 ${i <= cleared ? "bg-gain" : ""}`}
                        style={
                          i <= cleared
                            ? undefined
                            : { backgroundImage: "repeating-linear-gradient(-45deg, hsl(var(--leak)) 0 7px, #fff 7px 12px)" }
                        }
                      />
                      <div className="flex justify-between px-1">
                        <span className="h-9 md:h-11 w-1 bg-ink/70 rounded-b-sm" />
                        <span className="h-9 md:h-11 w-1 bg-ink/70 rounded-b-sm" />
                      </div>
                      {i <= cleared && (
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-gain text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                      )}
                    </div>
                  )}

                  {/* sparks while he builds here */}
                  {here && (
                    <div className="absolute bottom-24 md:bottom-32 w-0" style={{ left: at(i - buildingBack) }}>
                      {[
                        [-18, -20], [14, -24], [-6, -30], [22, -12], [-24, -8], [6, -26],
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
              );
            })}

            {/* finish banner over the painted line */}
            <div className="absolute bottom-[4.5rem] md:bottom-24 w-[220px]" style={{ left: at(STOPS) - 110 }}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold shadow-md ${
                    finished ? "bg-primary text-primary-foreground" : "bg-ink text-cream"
                  }`}
                >
                  <Flag className="h-4 w-4" />
                  {t("journey.finish.label")}
                </div>
                <div className="h-10 md:h-12 w-1" style={{ background: checker(6) }} />
              </div>
            </div>
          </motion.div>

          {/* runner stays in place; the world moves under him */}
          <div className="absolute bottom-1 md:bottom-2 w-[130px]" style={side(start - 65)}>
            {/* dust behind him while he runs */}
            <motion.div className="absolute bottom-1 h-4 w-10" style={{ opacity: run, ...side(26) }}>
              {[0, 1, 2].map((k) => (
                <span
                  key={k}
                  className="absolute bottom-0 h-3 w-3 rounded-full bg-ink/15"
                  style={{
                    ["--puff-x" as string]: `${back * (22 + k * 7)}px`,
                    animation: `journey-puff 0.5s ease-out ${k * 0.16}s infinite`,
                  }}
                />
              ))}
            </motion.div>
            <motion.div
              className="mx-auto h-2.5 w-16 md:w-20 rounded-[50%] bg-ink/25 blur-[1px]"
              style={{ scaleX: shadowScale, opacity: shadowFade, y: 8 }}
            />
            <motion.div className="absolute bottom-0 inset-x-0 flex justify-center" style={{ y: jump }}>
              {/* a little victory hop at the finish line */}
              <motion.div
                animate={finished ? { y: [0, -22, 0] } : { y: 0 }}
                transition={finished ? { duration: 0.5, repeat: Infinity, repeatDelay: 0.35 } : { duration: 0.2 }}
              >
                <Runner stride={stride} run={run} air={air} lean={lean} className="h-[128px] w-[96px] md:h-[172px] md:w-[129px] rtl:-scale-x-100" />
              </motion.div>
            </motion.div>

            {/* what he is doing right now */}
            {bubble && (
              <motion.div
                key={bubble.text}
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute bottom-[8.6rem] md:bottom-[11.6rem] flex w-max max-w-[62vw] items-center gap-1.5 rounded-2xl bg-ink px-3 py-1.5 text-xs md:text-sm font-semibold text-cream shadow-lg"
                style={side(40)}
              >
                {bubble.icon ? (
                  <bubble.icon className={`h-3.5 w-3.5 shrink-0 text-primary ${active ? "animate-bounce" : ""}`} />
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

          {/* kerb in front of the track, for depth */}
          <div className="absolute inset-x-0 bottom-0 h-2 md:h-2.5 bg-ink/[0.14] border-t border-white/40" />

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
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 mt-3 md:mt-5 flex-1 min-h-0">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: moving ? 0.5 : 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {station ? (
              <>
                <div className="mb-2 md:mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
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

          {!started && (
            <p className="mt-3 md:mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm md:text-base font-semibold text-primary-foreground">
              <ArrowDown className="h-4 w-4 animate-bounce" />
              {t("journey.hint")}
            </p>
          )}
        </div>
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
