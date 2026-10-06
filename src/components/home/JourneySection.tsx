import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Flag, Hammer } from "lucide-react";
import { tr } from "@/contexts/LanguageContext";
import { JOURNEY, JourneyStation } from "@/data/journey";
import Runner from "@/components/journey/Runner";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

// The home page's story: a track runs down the page, and Mohamed (facing the visitor) runs down
// it with them as they scroll. Every station is a chapter card beside the track.
const STOPS = JOURNEY.length;
const EASE = [0.16, 1, 0.3, 1] as const;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

// The lane sits at the start edge on phones and in the middle on larger screens.
// The section is always right-to-left (the story is Arabic), so these are plain RTL classes:
// Tailwind's direction variants would both match inside an English page.
const ON_LANE = "right-0 md:right-1/2 md:translate-x-1/2";
const BESIDE_LANE = "pr-20 md:pr-0";

// The story is always told in Arabic, whatever the site language, so it reads naturally.
const LANG = "ar" as const;
const t = (key: string) => tr(key, LANG);
const num = (n: number) => n.toLocaleString("ar-EG");
// The department's short name, for the bubble over his head.
const short = (i: number) => JOURNEY[i].dept.ar.split(":")[0];

const StationCopy = ({ station, light }: { station: JourneyStation; light?: boolean }) => {
  const box = light ? "bg-white/70 border border-ink/10" : "bg-ink/[0.04]";
  return (
    <div className="space-y-3 md:space-y-4">
      <p className="text-[15px] leading-relaxed text-ink md:text-lg">{station.story[LANG]}</p>

      {station.steps && (
        <ol className="flex flex-col items-start gap-1.5 text-sm font-semibold md:flex-row md:flex-wrap md:items-center md:gap-y-2">
          {station.steps.map((step, k) => (
            <li key={step[LANG]} className="flex flex-col items-center gap-1 md:flex-row md:gap-0">
              <span className="rounded-lg border border-ink/15 bg-white px-2.5 py-1.5 shadow-sm">
                <span className="text-primary">{num(k + 1)}</span> {step[LANG]}
              </span>
              {k < station.steps!.length - 1 && <ArrowDown className="h-4 w-4 text-ink/30 md:mx-1 md:rotate-90" />}
            </li>
          ))}
        </ol>
      )}

      {station.proof && (
        <div className={`rounded-xl px-4 py-3 ${box}`}>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {t("journey.proof")}
          </p>
          <p className="mt-1 text-[15px] leading-relaxed text-ink md:text-lg">{station.proof[LANG]}</p>
        </div>
      )}

      <div className={`rounded-xl px-4 py-3 ${box}`}>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
          <span className="h-2 w-2 rounded-full bg-gain" />
          {t("journey.gain")}
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink md:text-lg">{station.gain[LANG]}</p>
      </div>
    </div>
  );
};

// True under the md breakpoint, where the lane sits at the screen's edge.
const useIsMobile = () => {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
};

const JourneyTrack = () => {
  const mobile = useIsMobile();
  const laneRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hurdleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // How far down the track his feet are, in px from the top of the lane.
  const feet = useMotionValue(0);
  const velocity = useVelocity(feet); // px per second
  const runRaw = useTransform(velocity, (v) => clamp(Math.abs(v) / 900, 0, 1));
  const run = useSpring(runRaw, { stiffness: 140, damping: 22 });
  const stride = useTransform(feet, (y) => y / 150);
  const air = useMotionValue(0);
  const jump = useTransform(air, (a) => -a * 56);
  const fill = useMotionValue(0); // share of the lane behind him

  const [reached, setReached] = useState(-1); // last station he has passed
  const [cleared, setCleared] = useState(-1); // last hurdle he has jumped
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

      // jump when his feet are over a hurdle
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
      ? `${t("journey.going")} ${short(next)}`
      : reached >= 0
        ? `${t("journey.building")} ${short(current)}`
        : t("journey.hint");

  return (
    <section id="journey" dir="rtl" lang="ar" className="relative bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] pt-20 md:pt-28 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader tone="light" label={t("journey.label")} title={t("journey.title")} sub={t("journey.intro")} />

        {/* The track: a lane down the page with the runner pinned on it */}
        <div className="relative">
          <div
            ref={laneRef}
            className={`absolute inset-y-0 w-14 md:w-20 rounded-full bg-ink/[0.07] ${ON_LANE}`}
            style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 26px, rgba(255,255,255,0.9) 26px 30px)" }}
          >
            <div className="absolute inset-x-[30%] inset-y-0 border-x border-white/50" />
            {/* the part behind him turns orange */}
            <motion.div className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-primary/60" style={{ scaleY: fill }} />
          </div>

          {/* the runner, pinned near the top of the screen, running down the lane with the visitor */}
          <div className="sticky top-[26vh] z-20 h-0">
            <div ref={runnerRef} className={`absolute w-14 md:w-20 flex flex-col items-center ${ON_LANE}`}>
              <motion.div className="flex h-[112px] w-[78px] justify-center md:h-[150px] md:w-[104px]" style={{ y: jump }}>
                <motion.div
                  animate={finished ? { y: [0, -16, 0] } : { y: 0 }}
                  transition={finished ? { duration: 0.5, repeat: Infinity, repeatDelay: 0.4 } : { duration: 0.2 }}
                >
                  <Runner stride={stride} run={run} air={air} className="h-[112px] w-[78px] md:h-[150px] md:w-[104px]" />
                </motion.div>
              </motion.div>
              <span className="-mt-1 h-2 w-10 rounded-[50%] bg-ink/25 md:w-14" />
              {/* what he is doing right now */}
              {bubble && (
                <motion.div
                  key={bubble}
                  initial={{ opacity: 0, y: 6, x: mobile ? 0 : "-50%" }}
                  animate={{ opacity: 1, y: 0, x: mobile ? 0 : "-50%" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute -top-9 flex w-max max-w-[220px] items-center gap-1.5 rounded-2xl bg-ink px-2.5 py-1 text-[11px] font-semibold leading-tight text-cream shadow-lg right-0 md:-top-11 md:left-1/2 md:right-auto md:max-w-[260px] md:px-3 md:py-1.5 md:text-sm"
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
              {/* sparks while he builds */}
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
            <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-cream shadow-md md:absolute md:right-1/2 md:mr-20">
              {t("journey.start")}
            </span>
          </div>

          {/* the chapters */}
          <ol>
            {JOURNEY.map((s, i) => {
              const Icon = s.icon;
              const done = i <= reached;
              const here = i === reached && !moving;
              return (
                <li key={s.key} className="relative">
                  {/* hurdle across the lane before the station */}
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
                        <span className="absolute -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gain text-white -left-2">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative grid items-center gap-4 pb-10 md:grid-cols-[1fr_5rem_1fr] md:gap-8 md:pb-16">
                    {/* station marker on the lane */}
                    <div
                      ref={(el) => {
                        markerRefs.current[i] = el;
                      }}
                      className={`absolute top-1 z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-cream transition-colors duration-500 md:top-1/2 md:-mt-10 md:h-20 md:w-20 ${ON_LANE} ${
                        here ? "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.5)]" : done ? "bg-ink text-cream" : "bg-white text-ink/40"
                      }`}
                    >
                      <Icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>

                    {/* the chapter card */}
                    <Reveal className={`${BESIDE_LANE} ${i % 2 === 0 ? "md:col-start-1" : "md:col-start-3"}`}>
                      <article
                        className={`rounded-2xl border bg-white p-5 shadow-sm transition-all duration-500 md:rounded-3xl md:p-7 ${
                          here ? "border-primary shadow-[0_12px_40px_hsl(var(--primary)/0.15)]" : done ? "border-ink/15" : "border-ink/10 opacity-80"
                        }`}
                      >
                        <p className="font-headline text-xs tracking-wider text-ink/50">
                          {t("journey.station")} {num(i + 1)} / {num(STOPS)}
                        </p>
                        <h3 className="mt-1.5 font-headline text-2xl font-semibold leading-tight md:text-3xl">{s.dept[LANG]}</h3>
                        <div className="mt-4">
                          <StationCopy station={s} />
                        </div>
                        {s.slug && (
                          <Link
                            to={`/services/${s.slug}`}
                            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink/70 underline-offset-4 hover:text-primary hover:underline"
                          >
                            {t("journey.more")}
                            <ArrowUpRight className="h-4 w-4 -scale-x-100" />
                          </Link>
                        )}
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
            <div className={`mt-8 max-w-2xl md:mx-auto md:mt-12 md:text-center ${BESIDE_LANE}`}>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
                  finished ? "bg-primary text-primary-foreground" : "bg-ink text-cream"
                }`}
              >
                <Flag className="h-4 w-4" />
                {t("journey.finish.label")}
              </span>
              <h3 className="mt-4 font-headline text-3xl font-semibold leading-tight md:text-5xl">{t("journey.finish.title")}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-xl">{t("journey.finish.sub")}</p>
              <a href="#audit" className="mt-6 inline-flex items-center rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
                {t("hero.cta1")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Visitors who turned motion off get the same chapters as a plain list.
const JourneyList = () => {
  return (
    <section id="journey" dir="rtl" lang="ar" className="bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader tone="light" label={t("journey.label")} title={t("journey.title")} sub={t("journey.intro")} />
        <ol className="space-y-10">
          {JOURNEY.map((s, i) => (
            <li key={s.key}>
              <Reveal>
                <h3 className="mb-3 font-headline text-2xl font-semibold">
                  <span className="text-primary tabular-nums">{num(i + 1)}. </span>
                  {s.dept[LANG]}
                </h3>
                <StationCopy station={s} light />
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
