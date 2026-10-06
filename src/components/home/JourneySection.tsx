import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTime,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Flag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { JOURNEY, JourneyStation } from "@/data/journey";
import Runner from "@/components/journey/Runner";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const STOPS = JOURNEY.length; // the finish line sits at index STOPS
const SEGMENT_VH = 55; // scroll length per station
const HURDLE_BEFORE = 0.3; // hurdle position, in stations, before each gate
const EASE = [0.16, 1, 0.3, 1] as const;

const easeInOut = (m: number) => (m < 0.5 ? 2 * m * m : 1 - (-2 * m + 2) ** 2 / 2);

// Scroll progress → position on the track (0 … STOPS). The runner starts running
// as soon as the visitor scrolls, then waits at each station so the card can be read.
const toTrackPosition = (p: number) => {
  const r = Math.min(Math.max(p, 0), 1) * (STOPS + 0.4);
  const i = Math.floor(r);
  if (i >= STOPS) return STOPS;
  const move = Math.min(Math.max((r - i) / 0.6, 0), 1);
  return i + easeInOut(move);
};

// Viewport size in px. Heights are set in px (not vh/svh) so the pinned track works on
// every browser; small height changes (a phone's address bar showing/hiding) are ignored.
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
  const step = mobile ? 280 : 420; // px between stations
  const start = mobile ? 84 : Math.min(vw * 0.22, 320); // runner's distance from the inline-start edge
  const jumpHeight = mobile ? 44 : 60;
  const worldWidth = start + STOPS * step + vw;
  // Physical left offset inside the track world (it runs right-to-left in Arabic).
  const at = (i: number) => (isAr ? worldWidth - (start + i * step) : start + i * step);
  const side = (px: number) => (isAr ? { right: px } : { left: px });

  // How far the visitor has scrolled through the section (0 → 1), read straight from the page.
  const progress = useMotionValue(0);
  // Open the site with ?debug=track to see the scroll numbers (for troubleshooting on a real device).
  const debugRef = useRef<HTMLPreElement>(null);
  const debug = typeof window !== "undefined" && window.location.search.includes("debug=track");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress.set(total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0);
      if (debugRef.current) {
        const sticky = el.firstElementChild?.getBoundingClientRect();
        debugRef.current.textContent = [
          `progress ${progress.get().toFixed(3)}`,
          `section top ${Math.round(rect.top)} / height ${Math.round(rect.height)}`,
          `sticky top ${Math.round(sticky?.top ?? 0)} / height ${Math.round(sticky?.height ?? 0)}`,
          `window ${window.innerWidth}x${window.innerHeight} scrollY ${Math.round(window.scrollY)}`,
          `scroller ${document.scrollingElement?.tagName} ${Math.round(document.scrollingElement?.scrollTop ?? 0)}`,
          navigator.userAgent,
        ].join("\n");
      }
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
  const rawPos = useTransform(progress, toTrackPosition);
  const pos = useSpring(rawPos, { stiffness: 140, damping: 28, mass: 0.6 });

  const worldX = useTransform(pos, (v) => (isAr ? 1 : -1) * v * step);
  const builtWidth = useTransform(pos, (v) => start + v * step);
  // Legs move with the distance covered, plus a light jog in place so he never looks frozen.
  const time = useTime();
  const stride = useTransform(() => pos.get() * 3.5 + time.get() / 700);
  const jump = useTransform(pos, (v) => {
    const k = Math.round(v + HURDLE_BEFORE);
    if (k < 1 || k >= STOPS) return 0;
    const d = (v + HURDLE_BEFORE - k) / 0.17;
    return Math.abs(d) < 1 ? -(1 - d * d) * jumpHeight : 0;
  });
  const shadowScale = useTransform(jump, (y) => 1 + y / (jumpHeight * 1.6));

  const [reached, setReached] = useState(0);
  const [cleared, setCleared] = useState(0);
  useMotionValueEvent(pos, "change", (v) => {
    setReached(Math.min(STOPS, Math.floor(v + 0.08)));
    setCleared(Math.floor(v + HURDLE_BEFORE - 0.12));
  });

  const num = (n: number) => (isAr ? n.toLocaleString("ar-EG") : String(n).padStart(2, "0"));
  const station = reached < STOPS ? JOURNEY[reached] : null;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem]"
      style={{ height: Math.round(((STOPS + 0.4) * SEGMENT_VH * vh) / 100 + vh) }}
    >
      <div className="sticky top-0 overflow-hidden flex flex-col pt-20 md:pt-24 pb-24 md:pb-8" style={{ height: vh }}>
        {debug && (
          <pre
            ref={debugRef}
            dir="ltr"
            className="fixed bottom-24 left-2 z-[100] max-w-[95vw] whitespace-pre-wrap rounded bg-black/85 p-2 text-[10px] leading-tight text-white"
          />
        )}
        {/* Header + station counter */}
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-0.5 text-[11px] md:text-xs uppercase tracking-wider text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("journey.label")}
            </p>
            <h2 className="mt-2 md:mt-3 font-headline text-2xl md:text-5xl font-semibold leading-tight tracking-tight text-balance">
              {t("journey.title")}
            </h2>
          </div>
          <div className="shrink-0 text-end">
            <p className="text-[11px] md:text-xs uppercase tracking-wider text-ink/55">{t("journey.station")}</p>
            <p className="font-headline tabular-nums text-2xl md:text-4xl font-semibold">
              <span className="text-primary">{num(Math.min(reached + 1, STOPS))}</span>
              <span className="text-ink/30"> / {num(STOPS)}</span>
            </p>
          </div>
        </div>

        {/* What the system has collected so far */}
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 mt-3 md:mt-4">
          <ul className="flex flex-wrap gap-[3px] md:gap-2" aria-label={t("journey.collected")}>
            {JOURNEY.map((s, i) => {
              const Icon = s.icon;
              const on = i < reached || (i === reached && reached < STOPS);
              return (
                <li
                  key={s.key}
                  title={s.dept[lang]}
                  className={`flex h-5 w-5 md:h-8 md:w-8 items-center justify-center rounded-md md:rounded-lg border transition-all duration-500 ${
                    on ? "bg-ink text-cream border-ink scale-100" : "border-ink/15 text-ink/25 scale-90"
                  }`}
                >
                  <Icon className="h-3 w-3 md:h-4 md:w-4" />
                </li>
              );
            })}
          </ul>
        </div>

        {/* The track */}
        <div className="relative mt-3 md:mt-5 h-[200px] md:h-[270px] flex-none" aria-hidden="true">
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
              const done = i < reached;
              const here = i === reached;
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
                      <div className={`h-[5.5rem] md:h-[7.5rem] w-0.5 ${here || done ? "bg-ink/50" : "bg-ink/15"}`} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* finish line */}
            <div className="absolute bottom-4 w-[260px]" style={{ left: at(STOPS - 0.2) - 130 }}>
              <div className="flex flex-col items-center">
                <div
                  className={`mb-1 flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold ${
                    reached === STOPS ? "bg-primary text-primary-foreground" : "bg-ink text-cream"
                  }`}
                >
                  <Flag className="h-4 w-4" />
                  {t("journey.finish.label")}
                </div>
                <div
                  className="h-[8.5rem] md:h-[11rem] w-3 md:w-4"
                  style={{
                    backgroundImage:
                      "repeating-conic-gradient(hsl(var(--ink)) 0 25%, hsl(var(--cream)) 0 50%)",
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
              <Runner stride={stride} className="h-[104px] w-[89px] md:h-[136px] md:w-[117px] rtl:-scale-x-100" />
            </motion.div>
          </div>
        </div>

        {/* What happens at this station */}
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 mt-3 md:mt-5 flex-1 min-h-0">
          <motion.div
            key={reached}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
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

          {reached === 0 && (
            <p className="mt-4 flex items-center gap-3 text-sm md:text-base text-ink/60">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 font-semibold text-primary-foreground">
                <ArrowDown className="h-4 w-4 animate-bounce" />
                {t("journey.hint")}
              </span>
              <a href="#services" className="underline underline-offset-4 hover:text-primary">
                {t("journey.skip")}
              </a>
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
