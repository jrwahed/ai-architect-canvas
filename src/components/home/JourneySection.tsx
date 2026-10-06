import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Flag, Hammer, Pause, Play, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { JOURNEY, JourneyStation } from "@/data/journey";
import Runner from "@/components/journey/Runner";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const STOPS = JOURNEY.length; // the finish line sits at index STOPS
const HURDLE_BEFORE = 0.3; // hurdle position, in stations, before each gate
const RUN_SECONDS = 1.8; // running from one station to the next
const WORK_MS = 5500; // time spent building at each station
const EASE = [0.16, 1, 0.3, 1] as const;

const useViewportWidth = () => {
  const [width, setWidth] = useState(() => (typeof window === "undefined" ? 1280 : window.innerWidth));
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
};

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

type Phase = "ready" | "run" | "work";

const JourneyTrack = () => {
  const { t, lang, isAr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const vw = useViewportWidth();
  const mobile = vw < 768;
  const step = mobile ? 280 : 420; // px between stations
  const start = mobile ? 84 : Math.min(vw * 0.22, 320); // runner's distance from the inline-start edge
  const jumpHeight = mobile ? 44 : 60;
  const worldWidth = start + STOPS * step + vw;
  // Physical left offset inside the track world (it runs right-to-left in Arabic).
  const at = (i: number) => (isAr ? worldWidth - (start + i * step) : start + i * step);
  const side = (px: number) => (isAr ? { right: px } : { left: px });

  // pos = where the runner is on the track (0 … STOPS); work = 1 while he builds.
  const pos = useMotionValue(0);
  const work = useMotionValue(0);
  const [current, setCurrent] = useState(0); // the station he is at (STOPS = finish line)
  const [target, setTarget] = useState(0); // the station he is heading to
  const [phase, setPhase] = useState<Phase>("ready");
  const [playing, setPlaying] = useState(true);
  const runId = useRef(0);

  const goTo = useCallback(
    (to: number, seconds = RUN_SECONDS) => {
      const id = ++runId.current;
      setTarget(to);
      setPhase("run");
      work.set(0);
      animate(pos, to, { duration: seconds, ease: [0.45, 0, 0.55, 1] }).then(() => {
        if (id !== runId.current) return;
        setCurrent(to);
        setPhase("work");
      });
    },
    [pos, work],
  );

  // Start building at the first station once the section is on screen.
  useEffect(() => {
    if (inView && phase === "ready") setPhase("work");
  }, [inView, phase]);

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
    goTo(Math.min(Math.max(to, 0), STOPS), 0.9);
  };
  const restart = () => {
    setPlaying(true);
    goTo(0, 1.4);
  };

  const worldX = useTransform(pos, (v) => (isAr ? 1 : -1) * v * step);
  const builtWidth = useTransform(pos, (v) => start + v * step);
  const stride = useTransform(pos, (v) => v * 3.5);
  const jump = useTransform(pos, (v) => {
    const k = Math.round(v + HURDLE_BEFORE);
    if (k < 1 || k >= STOPS) return 0;
    const d = (v + HURDLE_BEFORE - k) / 0.17;
    return Math.abs(d) < 1 ? -(1 - d * d) * jumpHeight : 0;
  });
  const shadowScale = useTransform(jump, (y) => 1 + y / (jumpHeight * 1.6));

  const [cleared, setCleared] = useState(0);
  useMotionValueEvent(pos, "change", (v) => setCleared(Math.floor(v + HURDLE_BEFORE - 0.12)));

  const num = (n: number) => (isAr ? n.toLocaleString("ar-EG") : String(n).padStart(2, "0"));
  const station = current < STOPS ? JOURNEY[current] : null;
  const building = phase === "work" && current < STOPS;
  const built = (i: number) => i < current || (i === current && phase === "work");
  const finished = phase === "work" && current === STOPS;
  const deptName = (i: number) => (i < STOPS ? JOURNEY[i].dept[lang] : t("journey.finish.label"));

  const bubble =
    phase === "run"
      ? { icon: null, text: `${t("journey.going")} ${deptName(target)}` }
      : building
        ? { icon: Hammer, text: `${t("journey.building")} ${deptName(current)}` }
        : finished
          ? { icon: Check, text: t("journey.done") }
          : null;

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
            <button type="button" className={ctrl} onClick={() => jumpTo(target - 1)} disabled={target === 0} aria-label={t("journey.prev")}>
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
            <button type="button" className={ctrl} onClick={() => jumpTo(target + 1)} disabled={target === STOPS} aria-label={t("journey.next")}>
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

      {/* The track */}
      <div className="relative mt-4 md:mt-6 h-[230px] md:h-[290px]" aria-hidden="true">
        <motion.div className="absolute inset-y-0" style={{ x: worldX, width: worldWidth, ...side(0) }}>
          {/* lane: dashed (not built yet) … solid orange behind the runner (built) */}
          <div className="absolute bottom-4 h-12 md:h-14 inset-x-0 bg-ink/[0.07] border-y border-ink/10">
            <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-ink/15" />
          </div>
          <motion.div
            className="absolute bottom-4 h-12 md:h-14 bg-primary/20 border-y-2 border-primary"
            style={{ width: builtWidth, ...side(0) }}
          >
            <div className="absolute inset-x-0 top-1/2 border-t-2 border-primary/50" />
          </motion.div>

          {JOURNEY.map((s, i) => {
            const Icon = s.icon;
            const here = i === current && phase !== "run";
            const done = built(i);
            return (
              <div key={s.key}>
                {i > 0 && (
                  <div className="absolute bottom-[1.6rem] md:bottom-8 w-5" style={{ left: at(i - HURDLE_BEFORE) - 10 }}>
                    <div
                      className={`mx-auto flex h-7 w-4 md:h-9 md:w-5 items-start justify-center rounded-sm transition-colors duration-300 ${
                        i <= cleared ? "bg-gain" : "bg-leak"
                      }`}
                    >
                      {i <= cleared && <Check className="mt-0.5 h-3 w-3 text-white" strokeWidth={3} />}
                    </div>
                  </div>
                )}

                {/* gate with the station's name */}
                <div className="absolute bottom-16 md:bottom-[4.5rem] w-[260px]" style={{ left: at(i) - 130 }}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-semibold shadow-sm transition-colors duration-300 ${
                        here ? "bg-primary text-primary-foreground" : done ? "bg-ink text-cream" : "bg-white text-ink/60 border border-ink/10"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      {s.dept[lang]}
                    </div>
                    <div className={`h-[7.5rem] md:h-[9.5rem] w-0.5 ${here || done ? "bg-ink/50" : "bg-ink/15"}`} />
                  </div>
                </div>

                {/* the part of the system he builds here */}
                <div className="absolute bottom-7 md:bottom-8 w-12" style={{ left: at(i + 0.14) - 24 }}>
                  <motion.div
                    initial={false}
                    animate={done ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 14 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: done && i === current ? 0.9 : 0 }}
                    className="relative mx-auto flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg bg-gain text-white shadow-md"
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    {i === current && building && (
                      <span className="absolute inset-0 rounded-lg ring-2 ring-gain animate-ping" />
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* finish line */}
          <div className="absolute bottom-4 w-[260px]" style={{ left: at(STOPS - 0.2) - 130 }}>
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
                className="h-[10.5rem] md:h-[13rem] w-3 md:w-4"
                style={{
                  backgroundImage: "repeating-conic-gradient(hsl(var(--ink)) 0 25%, hsl(var(--cream)) 0 50%)",
                  backgroundSize: "8px 8px",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* runner stays in place; the track moves under him */}
        <div className="absolute bottom-5 md:bottom-6 w-[120px]" style={side(start - 60)}>
          <motion.div className="mx-auto h-2 w-14 md:w-16 rounded-[50%] bg-ink/20" style={{ scaleX: shadowScale, y: 6 }} />
          <motion.div className="absolute bottom-0 inset-x-0 flex justify-center" style={{ y: jump }}>
            {/* a little victory hop at the finish line */}
            <motion.div
              animate={finished ? { y: [0, -18, 0] } : { y: 0 }}
              transition={finished ? { duration: 0.55, repeat: Infinity, repeatDelay: 0.5 } : { duration: 0.2 }}
            >
              <Runner stride={stride} work={work} className="h-[110px] w-[96px] md:h-[146px] md:w-[128px] rtl:-scale-x-100" />
            </motion.div>
          </motion.div>
          {/* what he is doing right now */}
          {bubble && (
            <motion.div
              key={bubble.text}
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute bottom-[8.2rem] md:bottom-[10.5rem] flex w-max max-w-[60vw] items-center gap-1.5 rounded-2xl bg-ink px-3 py-1.5 text-xs md:text-sm font-semibold text-cream shadow-lg"
              style={side(30)}
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
        </div>
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
          animate={{ opacity: phase === "run" ? 0.45 : 1, y: 0 }}
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
