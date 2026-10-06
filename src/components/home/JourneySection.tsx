import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Flag,
  Hammer,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { JOURNEY, JourneyStation } from "@/data/journey";
import Runner from "@/components/journey/Runner";
import Building from "@/components/journey/Building";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const STOPS = JOURNEY.length; // the finish line sits at index STOPS
const START_POS = -0.6; // where he waits before the first station
const END_POS = STOPS + 0.5; // a little past the finish line
const HURDLE_BEFORE = 0.4; // hurdle position, in stations, before each building
const SEGMENT_VH = 62; // scroll length per station
const DWELL = 0.3; // the part of each station's scroll where he stays put and builds
const EASE = [0.16, 1, 0.3, 1] as const;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

// Viewport size in px. Heights are set in px (not vh/svh) so the pinned scene works on every
// browser; small height changes (a phone's address bar showing/hiding) are ignored.
const useViewport = () => {
  const [size, setSize] = useState(() =>
    typeof window === "undefined"
      ? { w: 1280, h: 800 }
      : { w: window.innerWidth, h: window.innerHeight },
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

// Deterministic skyline on the horizon.
const skyline = (() => {
  let x = 0;
  return Array.from({ length: 60 }, (_, i) => {
    const b = {
      w: 14 + ((i * 37) % 26),
      h: 10 + ((i * 53) % 34),
      gap: 3 + ((i * 17) % 9),
      left: x,
    };
    x += b.w + b.gap;
    return b;
  });
})();

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
    {
      label: t("journey.problem"),
      text: station.problem[lang],
      dot: "bg-leak",
    },
    {
      label: t("journey.action"),
      text: station.action[lang],
      dot: "bg-primary",
    },
    { label: t("journey.gain"), text: station.gain[lang], dot: "bg-gain" },
  ];
  return (
    <div className="grid gap-2 md:grid-cols-3 md:gap-5">
      {rows.map((row) => (
        <div
          key={row.label}
          className="rounded-xl md:rounded-2xl bg-white/70 border border-ink/10 px-3.5 py-2.5 md:p-5"
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
            <span className={`h-2 w-2 rounded-full ${row.dot}`} />
            {row.label}
          </p>
          <p className="mt-1.5 md:mt-2 text-sm md:text-lg leading-snug md:leading-relaxed text-ink">
            {row.text}
          </p>
        </div>
      ))}
    </div>
  );
};

// The road's geometry, shared by everything standing on it.
interface Road {
  pos: MotionValue<number>;
  stepDepth: number;
  runnerDepth: number;
  planeDepth: number;
}

// Where something at `station` is, in px in front of the camera.
const useDepth = (road: Road, station: number) =>
  useTransform(
    road.pos,
    (v) => (station - v) * road.stepDepth + road.runnerDepth,
  );

// An upright thing standing on the road plane. It is hidden once it has gone past the camera,
// where the 3D maths would blow it up.
const Standing = ({
  road,
  depth,
  x,
  width,
  height,
  hidden,
  children,
}: {
  road: Road;
  depth: MotionValue<number>;
  x: number;
  width: number;
  height: number;
  hidden: boolean;
  children: ReactNode;
}) => {
  // Moving with a transform (not `top`) keeps the browser from re-laying out the scene every frame.
  const y = useTransform(depth, (d) => -d);
  return (
    <motion.div
      className="absolute flex items-end justify-center"
      style={{
        top: road.planeDepth - height,
        left: `calc(50% + ${x - width / 2}px)`,
        width,
        height,
        transformOrigin: "50% 100%",
        y,
        rotateX: -90,
        visibility: hidden ? "hidden" : "visible",
      }}
    >
      {children}
    </motion.div>
  );
};

const MARKS = 14; // marks across the road
const MARK_GAP = 170; // depth between them

// One mark across the road. The marks cycle: when one passes the camera it reappears at the far end.
const RoadMark = ({
  road,
  index,
  roadHalf,
}: {
  road: Road;
  index: number;
  roadHalf: number;
}) => {
  const span = MARKS * MARK_GAP;
  const y = useTransform(road.pos, (v) => {
    const d = (((index * MARK_GAP - v * road.stepDepth) % span) + span) % span;
    return -d;
  });
  return (
    <motion.div
      className="absolute left-1/2 h-2 bg-white/25"
      style={{
        top: road.planeDepth - 4,
        width: roadHalf * 2 - 10,
        marginLeft: -roadHalf + 5,
        y,
      }}
    />
  );
};

// A line painted flat across the road at a station.
const Painted = ({
  road,
  station,
  height,
  className,
  style,
}: {
  road: Road;
  station: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const depth = useDepth(road, station);
  const y = useTransform(depth, (d) => -d);
  return (
    <motion.div
      className={`absolute left-1/2 ${className ?? ""}`}
      style={{ top: road.planeDepth - height / 2, y, height, ...style }}
    />
  );
};

// One station's building (beside the road) and the hurdle before it (across the road).
const StationOnRoad = ({
  road,
  station,
  index,
  label,
  done,
  here,
  party,
  hidden,
  hurdleHidden,
  cleared,
  x,
  buildScale,
  hurdleW,
  rtl,
}: {
  road: Road;
  station: JourneyStation;
  index: number;
  label: string;
  done: boolean;
  here: boolean;
  party: boolean;
  hidden: boolean;
  hurdleHidden: boolean;
  cleared: boolean;
  x: number;
  buildScale: number;
  hurdleW: number;
  rtl: boolean;
}) => {
  const depth = useDepth(road, index);
  const hurdleDepth = useDepth(road, index - HURDLE_BEFORE);
  return (
    <>
      <Standing
        road={road}
        depth={depth}
        x={x}
        width={240 * buildScale}
        height={260 * buildScale}
        hidden={hidden}
      >
        <div
          style={{
            transform: `scale(${buildScale})`,
            transformOrigin: "50% 100%",
          }}
        >
          <Building
            station={station}
            label={label}
            built={done}
            active={here}
            party={party}
            rtl={rtl}
          />
        </div>
      </Standing>
      {index > 0 && (
        <Standing
          road={road}
          depth={hurdleDepth}
          x={0}
          width={hurdleW}
          height={70}
          hidden={hurdleHidden}
        >
          <div className="relative w-full">
            <div
              className={`h-4 w-full rounded-sm shadow-sm transition-colors duration-300 ${cleared ? "bg-gain" : ""}`}
              style={
                cleared
                  ? undefined
                  : {
                      backgroundImage:
                        "repeating-linear-gradient(-45deg, hsl(var(--leak)) 0 10px, #fff 10px 18px)",
                    }
              }
            />
            <div className="flex justify-between px-2">
              <span className="h-12 w-1.5 bg-ink/70 rounded-b-sm" />
              <span className="h-12 w-1.5 bg-ink/70 rounded-b-sm" />
            </div>
            {cleared && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-gain text-white">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
            )}
          </div>
        </Standing>
      )}
    </>
  );
};

// ─── Phones get a flat, cheap road: no 3D, just a handful of elements moved with transforms ───

// Depth in stations (0 = at the runner) → how far up the screen it sits and how small it looks.
const flatProject = (d: number, rise: number) => {
  const k = 1 / (1 + Math.max(d, -0.15) * 1.5);
  return { y: -rise * (1 - k), s: k };
};

const useFlat = (road: Road, station: number, rise: number) => {
  const y = useTransform(road.pos, (v) => flatProject(station - v, rise).y);
  const s = useTransform(road.pos, (v) => flatProject(station - v, rise).s);
  return { y, s };
};

// Something standing on the flat road at a station, scaled down with distance.
const FlatThing = ({
  road,
  station,
  rise,
  x,
  hidden,
  children,
}: {
  road: Road;
  station: number;
  rise: number;
  x: number; // -1 left … 1 right, as a share of the road's half width at that depth
  hidden?: boolean;
  children: ReactNode;
}) => {
  const { y, s } = useFlat(road, station, rise);
  const left = useTransform(s, (k) => `calc(50% + ${x * 150 * k}px)`);
  return (
    <motion.div
      className="absolute bottom-6 flex w-0 justify-center"
      style={{
        left,
        y,
        scale: s,
        transformOrigin: "50% 100%",
        visibility: hidden ? "hidden" : "visible",
      }}
    >
      <div className="flex shrink-0 flex-col items-center">{children}</div>
    </motion.div>
  );
};

const FlatMark = ({
  road,
  index,
  rise,
}: {
  road: Road;
  index: number;
  rise: number;
}) => {
  const span = 3;
  const depth = useTransform(
    road.pos,
    (v) => ((((index * 0.5 - v) % span) + span) % span) - 0.2,
  );
  const y = useTransform(depth, (d) => flatProject(d, rise).y);
  const s = useTransform(depth, (d) => flatProject(d, rise).s);
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 h-1.5 w-[300px] -ml-[150px] bg-white/30"
      style={{ y, scaleX: s, scaleY: s }}
    />
  );
};

const FlatRoad = ({
  road,
  sceneH,
  horizon,
  current,
  built,
  active,
  cleared,
  hurdlePassed,
  passed,
  finished,
  lang,
  t,
}: {
  road: Road;
  sceneH: number;
  horizon: number;
  current: number;
  built: (i: number) => boolean;
  active: boolean;
  cleared: number;
  hurdlePassed: number;
  passed: number;
  finished: boolean;
  lang: "en" | "ar";
  t: (key: string) => string;
}) => {
  const hy = sceneH * horizon;
  const rise = sceneH - hy - 30;
  const visible = (i: number) => i >= current - 1 && i <= current + 2;
  return (
    <>
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: hy,
          background:
            "linear-gradient(to bottom, hsl(var(--cream)) 40%, hsl(var(--cream-2)))",
        }}
      />
      <div
        className="absolute left-1/2 h-10 w-[800px] -ml-[400px]"
        style={{ top: hy - 40 }}
      >
        {skyline.slice(0, 30).map((b) => (
          <span
            key={b.left}
            className="absolute bottom-0 bg-ink/[0.07]"
            style={{ width: b.w, height: b.h * 0.8, left: b.left }}
          />
        ))}
      </div>
      {/* the road and the pavement, drawn once */}
      <svg
        className="absolute inset-x-0 bottom-0"
        style={{ top: hy }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="100" height="100" fill="hsl(var(--cream-2))" />
        <polygon points="47,0 53,0 96,100 4,100" fill="hsl(var(--track))" />
        <polygon points="47,0 48,0 14,100 4,100" fill="rgba(255,255,255,0.8)" />
        <polygon
          points="52,0 53,0 96,100 86,100"
          fill="rgba(255,255,255,0.8)"
        />
        <polygon
          points="49.6,0 50.4,0 51.2,100 48.8,100"
          fill="rgba(255,255,255,0.55)"
        />
        <polygon
          points="48.3,0 49,0 31,100 27,100"
          fill="rgba(255,255,255,0.45)"
        />
        <polygon
          points="51,0 51.7,0 73,100 69,100"
          fill="rgba(255,255,255,0.45)"
        />
      </svg>
      {/* haze toward the horizon */}
      <div
        className="absolute inset-x-0 h-16"
        style={{
          top: hy - 8,
          background:
            "linear-gradient(to bottom, hsl(var(--cream)), hsl(var(--cream) / 0))",
        }}
      />

      {[0, 1, 2, 3, 4, 5].map((k) => (
        <FlatMark key={k} road={road} index={k} rise={rise} />
      ))}

      <FlatThing
        road={road}
        station={START_POS}
        rise={rise}
        x={0.9}
        hidden={passed >= -1}
      >
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream">
          {t("journey.start")}
        </span>
        <span className="h-8 w-1 bg-ink/40" />
      </FlatThing>

      {JOURNEY.map((s, i) => {
        if (!visible(i)) return null;
        const Icon = s.icon;
        const done = built(i);
        const here = i === current && active;
        const side = (i % 2 === 0 ? -1 : 1) * (lang === "ar" ? -1 : 1) * 0.85;
        return (
          <FlatThing
            key={s.key}
            road={road}
            station={i}
            rise={rise}
            x={side}
            hidden={i <= passed}
          >
            <span
              className={`mb-1 flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${
                here
                  ? "bg-primary text-primary-foreground"
                  : done
                    ? "bg-ink text-cream"
                    : "bg-white text-ink/60 border border-ink/10"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {s.dept[lang]}
            </span>
            <div
              className={`relative h-28 w-24 rounded-t-lg border ${
                done
                  ? "bg-ink border-ink"
                  : "bg-ink/[0.08] border-ink/15 border-dashed"
              } ${here ? "shadow-[0_0_30px_hsl(var(--primary)/0.5)]" : ""}`}
            >
              <div className="grid grid-cols-4 gap-1.5 p-2.5">
                {Array.from({ length: 8 }).map((_, w) => (
                  <span
                    key={w}
                    className={`h-2 rounded-[2px] ${done ? "bg-primary/85" : "bg-ink/10"}`}
                  />
                ))}
              </div>
              <div
                className={`absolute inset-x-2.5 bottom-2.5 flex h-10 items-center justify-center rounded-md ${done ? "bg-background text-primary" : "bg-ink/[0.06] text-ink/20"}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </FlatThing>
        );
      })}

      {JOURNEY.map((s, i) => {
        if (i === 0 || !visible(i)) return null;
        const ok = i <= cleared;
        return (
          <FlatThing
            key={`h-${s.key}`}
            road={road}
            station={i - HURDLE_BEFORE}
            rise={rise}
            x={0}
            hidden={i <= hurdlePassed}
          >
            <div className="relative w-44">
              <div
                className={`h-3.5 w-full rounded-sm ${ok ? "bg-gain" : ""}`}
                style={
                  ok
                    ? undefined
                    : {
                        backgroundImage:
                          "repeating-linear-gradient(-45deg, hsl(var(--leak)) 0 9px, #fff 9px 16px)",
                      }
                }
              />
              <div className="flex justify-between px-2">
                <span className="h-9 w-1.5 rounded-b-sm bg-ink/70" />
                <span className="h-9 w-1.5 rounded-b-sm bg-ink/70" />
              </div>
            </div>
          </FlatThing>
        );
      })}

      <FlatThing
        road={road}
        station={STOPS}
        rise={rise}
        x={0}
        hidden={passed >= STOPS}
      >
        <span
          className={`mb-1 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${finished ? "bg-primary text-primary-foreground" : "bg-ink text-cream"}`}
        >
          <Flag className="h-3.5 w-3.5" />
          {t("journey.finish.label")}
        </span>
        <div className="flex w-56 items-end">
          <span
            className="h-20 w-1.5"
            style={{
              background:
                "repeating-conic-gradient(hsl(var(--ink)) 0 25%, hsl(var(--cream)) 0 50%) 0 0 / 6px 6px",
            }}
          />
          <span className="mb-16 h-1.5 flex-1 bg-ink/70" />
          <span
            className="h-20 w-1.5"
            style={{
              background:
                "repeating-conic-gradient(hsl(var(--ink)) 0 25%, hsl(var(--cream)) 0 50%) 0 0 / 6px 6px",
            }}
          />
        </div>
      </FlatThing>
    </>
  );
};

const JourneyTrack = () => {
  const { t, lang, isAr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { w: vw, h: vh } = useViewport();
  const mobile = vw < 768;

  // The road is a plane lying flat under the camera, running away to the horizon.
  const sceneH = mobile ? 360 : 440;
  const horizon = mobile ? 0.28 : 0.3; // where the road vanishes, as a share of the scene height
  const perspective = mobile ? 460 : 640;
  const stepDepth = mobile ? 620 : 760; // depth between stations
  const runnerDepth = mobile ? 230 : 290; // how far in front of the camera he runs
  // The plane is kept small enough for the browser to paint it in one go; things beyond it are tiny.
  const planeW = mobile ? 1400 : 1900;
  const planeDepth = mobile ? 3800 : 5200;
  const roadHalf = mobile ? 150 : 230; // half the road's width on the plane
  const sideX = mobile ? 235 : 420; // where buildings stand, left/right of the centre line
  const buildScale = mobile ? 1.5 : 1.9;
  const hurdleW = mobile ? 180 : 260;
  const jumpHeight = mobile ? 54 : 72;

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
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [progress]);

  // pos = where he is on the track, in stations. He follows the visitor's scroll like a race,
  // but each station holds him for a short part of the scroll so he stops beside what he builds.
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
  const stride = useTransform(pos, (v) => v * 2.6);
  const road: Road = { pos, stepDepth, runnerDepth, planeDepth };

  const skylineX = useTransform(pos, (v) => (v - START_POS) * -6);
  const jump = useTransform(pos, (v) => {
    const k = Math.round(v + HURDLE_BEFORE);
    if (k < 1 || k >= STOPS) return 0;
    const d = (v + HURDLE_BEFORE - k) / 0.22;
    return Math.abs(d) < 1 ? -(1 - d * d) * jumpHeight : 0;
  });
  const air = useTransform(jump, (y) => clamp(-y / jumpHeight, 0, 1));
  const shadowScale = useTransform(air, (a) => 1 - a * 0.35);
  const shadowFade = useTransform(air, (a) => 1 - a * 0.5);
  const startDepth = useDepth(road, START_POS);
  const finishDepth = useDepth(road, STOPS);

  // React state follows the motion values only where the markup has to change.
  const [current, setCurrent] = useState(0); // the station he is at or heading to
  const [reachedCount, setReachedCount] = useState(0); // stations he has reached (built)
  const [passed, setPassed] = useState(-2); // last station whose building went past the camera
  const [hurdlePassed, setHurdlePassed] = useState(-2); // last hurdle that went past the camera
  const [cleared, setCleared] = useState(0); // hurdles behind him
  const [moving, setMoving] = useState(false);
  const [started, setStarted] = useState(false);
  useMotionValueEvent(pos, "change", (v) => {
    setCurrent(clamp(Math.round(v), 0, STOPS));
    setReachedCount(clamp(Math.floor(v + 0.12) + 1, 0, STOPS + 1));
    setPassed(Math.floor(v - (runnerDepth - 40) / stepDepth));
    setHurdlePassed(
      Math.floor(v + HURDLE_BEFORE - (runnerDepth - 40) / stepDepth),
    );
    setCleared(Math.floor(v + HURDLE_BEFORE - 0.08));
    setStarted(v > START_POS + 0.05);
  });
  useMotionValueEvent(run, "change", (v) => setMoving(v > 0.25));

  const num = (n: number) =>
    isAr ? n.toLocaleString("ar-EG") : String(n).padStart(2, "0");
  const station = current < STOPS ? JOURNEY[current] : null;
  const built = (i: number) => i < reachedCount;
  const finished = reachedCount > STOPS;
  const deptName = (i: number) =>
    i < STOPS ? JOURNEY[i].dept[lang] : t("journey.finish.label");
  const active = current < STOPS && built(current) && !moving;

  const bubble = finished
    ? null
    : moving
      ? {
          icon: null,
          text: `${t("journey.going")} ${deptName(built(current) ? Math.min(current + 1, STOPS) : current)}`,
        }
      : active
        ? {
            icon: Hammer,
            text: `${t("journey.building")} ${deptName(current)}`,
          }
        : { icon: ArrowDown, text: t("journey.waiting") };

  // The buttons scroll the page to a station, so the runner gets there the same way the visitor would.
  const scrollToStation = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const p = (clamp(i, 0, STOPS) - START_POS) / (END_POS - START_POS);
    window.scrollTo({
      top: window.scrollY + rect.top + p * total,
      behavior: "smooth",
    });
  };

  const ctrl =
    "flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none";
  const Back = isAr ? ChevronRight : ChevronLeft;
  const Forward = isAr ? ChevronLeft : ChevronRight;

  const checker = (size: number) =>
    `repeating-conic-gradient(hsl(var(--ink)) 0 25%, hsl(var(--cream)) 0 50%) 0 0 / ${size}px ${size}px`;
  const laneLines = `repeating-linear-gradient(to right, transparent 0 ${roadHalf / 2 - 2}px, rgba(255,255,255,0.8) ${roadHalf / 2 - 2}px ${roadHalf / 2 + 2}px)`;
  const roadEdges = `linear-gradient(to right, hsl(var(--ink) / 0.12) 0, hsl(var(--ink) / 0.12) calc(50% - ${roadHalf}px), rgba(255,255,255,0.9) calc(50% - ${roadHalf}px), rgba(255,255,255,0.9) calc(50% - ${roadHalf - 5}px), hsl(var(--track)) calc(50% - ${roadHalf - 5}px), hsl(var(--track)) calc(50% + ${roadHalf - 5}px), rgba(255,255,255,0.9) calc(50% + ${roadHalf - 5}px), rgba(255,255,255,0.9) calc(50% + ${roadHalf}px), hsl(var(--ink) / 0.12) calc(50% + ${roadHalf}px))`;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem]"
      style={{
        height: Math.round(
          ((END_POS - START_POS) * SEGMENT_VH * vh) / 100 + vh,
        ),
      }}
    >
      <div
        className="sticky top-0 overflow-hidden flex flex-col pt-20 md:pt-24 pb-24 md:pb-8"
        style={{ height: vh }}
      >
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
              <p className="text-[11px] md:text-xs uppercase tracking-wider text-ink/55">
                {t("journey.station")}
              </p>
              <p className="font-headline tabular-nums text-2xl md:text-4xl font-semibold">
                <span className="text-primary">
                  {num(Math.min(current + 1, STOPS))}
                </span>
                <span className="text-ink/30"> / {num(STOPS)}</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 pb-1">
              <button
                type="button"
                className={ctrl}
                onClick={() => scrollToStation(current - 1)}
                disabled={current === 0}
                aria-label={t("journey.prev")}
              >
                <Back className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={ctrl}
                onClick={() => scrollToStation(current + 1)}
                disabled={current === STOPS}
                aria-label={t("journey.next")}
              >
                <Forward className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* The parts of the system built so far (click to go to one) */}
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 mt-3 md:mt-4">
          <ul
            className="flex flex-wrap gap-1 md:gap-2"
            aria-label={t("journey.collected")}
          >
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
                      built(i)
                        ? "bg-ink text-cream border-ink scale-100"
                        : "border-ink/15 text-ink/30 scale-90 hover:text-ink/60"
                    } ${i === current && active ? "ring-2 ring-primary ring-offset-2 ring-offset-cream" : ""}`}
                  >
                    <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* The scene: the road comes out of the horizon toward the viewer */}
        <div
          className="relative mt-2 md:mt-3 flex-none overflow-hidden"
          style={
            mobile
              ? { height: sceneH }
              : {
                  height: sceneH,
                  perspective,
                  perspectiveOrigin: `50% ${horizon * 100}%`,
                }
          }
          aria-hidden="true"
        >
          {mobile ? (
            <FlatRoad
              road={road}
              sceneH={sceneH}
              horizon={horizon}
              current={current}
              built={built}
              active={active}
              cleared={cleared}
              hurdlePassed={hurdlePassed}
              passed={passed}
              finished={finished}
              lang={lang}
              t={t}
            />
          ) : (
            <>
              {/* sky and a far skyline on the horizon */}
              <div
                className="absolute inset-x-0 top-0"
                style={{
                  height: sceneH * horizon,
                  background:
                    "linear-gradient(to bottom, hsl(var(--cream)) 40%, hsl(var(--cream-2)))",
                }}
              />
              <motion.div
                className="absolute left-1/2 h-12"
                style={{
                  top: sceneH * horizon - 48,
                  x: skylineX,
                  width: 2000,
                  marginLeft: -1000,
                }}
              >
                {skyline.map((b) => (
                  <span
                    key={b.left}
                    className="absolute bottom-0 bg-ink/[0.07]"
                    style={{ width: b.w, height: b.h, left: b.left }}
                  />
                ))}
              </motion.div>

              {/* the road plane, lying flat: its near edge is the bottom of the scene */}
              <motion.div
                className="absolute left-1/2"
                style={{
                  width: planeW,
                  marginLeft: -planeW / 2,
                  height: planeDepth,
                  top: sceneH - planeDepth,
                  transformOrigin: "50% 100%",
                  transform: "rotateX(90deg)",
                  transformStyle: "preserve-3d",
                  backgroundColor: "hsl(var(--cream-2))",
                  backgroundImage: `${laneLines}, ${roadEdges}`,
                }}
              >
                {/* marks across the road that flow toward the viewer */}
                {Array.from({ length: MARKS }).map((_, k) => (
                  <RoadMark key={k} road={road} index={k} roadHalf={roadHalf} />
                ))}
                {/* haze toward the horizon */}
                <div
                  className="absolute inset-x-0 top-0 h-[55%]"
                  style={{
                    background:
                      "linear-gradient(to bottom, hsl(var(--cream)) 0, hsl(var(--cream) / 0) 100%)",
                  }}
                />

                {/* start and finish painted across the road */}
                <Painted
                  road={road}
                  station={START_POS}
                  height={10}
                  className="bg-white/90"
                  style={{ width: roadHalf * 2, marginLeft: -roadHalf }}
                />
                <Painted
                  road={road}
                  station={STOPS}
                  height={28}
                  style={{
                    width: roadHalf * 2,
                    marginLeft: -roadHalf,
                    background: checker(14),
                  }}
                />

                {/* the start sign */}
                <Standing
                  road={road}
                  depth={startDepth}
                  x={isAr ? -sideX : sideX}
                  width={200}
                  height={160}
                  hidden={passed >= -1}
                >
                  <div
                    className="flex flex-col items-center"
                    style={{
                      transform: `scale(${buildScale})`,
                      transformOrigin: "50% 100%",
                    }}
                  >
                    <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream shadow-md">
                      {t("journey.start")}
                    </span>
                    <span className="h-10 w-1 bg-ink/40" />
                  </div>
                </Standing>

                {JOURNEY.map((s, i) => (
                  <StationOnRoad
                    key={s.key}
                    road={road}
                    station={s}
                    index={i}
                    label={s.dept[lang]}
                    done={built(i)}
                    here={i === current && active}
                    party={finished}
                    hidden={i <= passed || i > current + 4}
                    hurdleHidden={i <= hurdlePassed || i > current + 4}
                    cleared={i <= cleared}
                    x={(i % 2 === 0 ? -1 : 1) * (isAr ? -1 : 1) * sideX}
                    buildScale={buildScale}
                    hurdleW={hurdleW}
                    rtl={isAr}
                  />
                ))}

                {/* the finish gate */}
                <Standing
                  road={road}
                  depth={finishDepth}
                  x={0}
                  width={roadHalf * 2 + 80}
                  height={260}
                  hidden={passed >= STOPS}
                >
                  <div
                    className="flex flex-col items-center"
                    style={{
                      transform: `scale(${buildScale})`,
                      transformOrigin: "50% 100%",
                    }}
                  >
                    <div
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold shadow-md ${
                        finished
                          ? "bg-primary text-primary-foreground"
                          : "bg-ink text-cream"
                      }`}
                    >
                      <Flag className="h-4 w-4" />
                      {t("journey.finish.label")}
                    </div>
                    <div
                      className="flex items-end"
                      style={{ width: (roadHalf * 2) / buildScale + 20 }}
                    >
                      <span
                        className="h-24 w-1.5"
                        style={{ background: checker(6) }}
                      />
                      <span className="mb-20 h-1.5 flex-1 bg-ink/70" />
                      <span
                        className="h-24 w-1.5"
                        style={{ background: checker(6) }}
                      />
                    </div>
                  </div>
                </Standing>
              </motion.div>
            </>
          )}

          {/* the runner, running at the viewer, stays in place while the road comes to him */}
          <div className="absolute bottom-0 left-1/2 w-[160px] -ml-[80px]">
            <motion.div
              className="absolute bottom-1 left-1/2 h-3 w-20 md:w-24 -ml-10 md:-ml-12 rounded-[50%] bg-ink/30"
              style={{ scaleX: shadowScale, opacity: shadowFade }}
            />
            <motion.div
              className="absolute bottom-0 inset-x-0 flex justify-center"
              style={{ y: jump }}
            >
              {/* a little victory hop at the finish line */}
              <motion.div
                animate={finished ? { y: [0, -22, 0] } : { y: 0 }}
                transition={
                  finished
                    ? { duration: 0.5, repeat: Infinity, repeatDelay: 0.35 }
                    : { duration: 0.2 }
                }
              >
                <Runner
                  stride={stride}
                  run={run}
                  air={air}
                  className="h-[150px] w-[100px] md:h-[210px] md:w-[140px]"
                />
              </motion.div>
            </motion.div>

            {/* what he is doing right now */}
            {bubble && (
              <motion.div
                key={bubble.text}
                initial={{ opacity: 0, y: 6, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute bottom-[9.6rem] md:bottom-[13.4rem] left-1/2 flex w-max max-w-[80vw] items-center gap-1.5 rounded-2xl bg-ink px-3 py-1.5 text-xs md:text-sm font-semibold text-cream shadow-lg"
              >
                {bubble.icon ? (
                  <bubble.icon
                    className={`h-3.5 w-3.5 shrink-0 text-primary ${active ? "animate-bounce" : ""}`}
                  />
                ) : (
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
                        style={{ animationDelay: `${d * 150}ms` }}
                      />
                    ))}
                  </span>
                )}
                {bubble.text}
              </motion.div>
            )}

            {/* sparks while he builds */}
            {active && (
              <div className="absolute bottom-24 md:bottom-32 left-1/2">
                {[
                  [-30, -20],
                  [26, -24],
                  [-10, -34],
                  [36, -10],
                  [-38, -6],
                  [8, -30],
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

            {/* confetti at the finish line */}
            {finished &&
              CONFETTI.map((c, k) => (
                <motion.span
                  key={k}
                  className={`absolute bottom-24 left-1/2 ${c.color} ${c.shape}`}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    x: c.x,
                    y: [0, -c.up - 80, 120],
                    opacity: [1, 1, 0],
                    rotate: c.rotate,
                  }}
                  transition={{
                    duration: 2.4,
                    delay: c.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
          </div>

          {/* finish banner */}
          <AnimatePresence>
            {finished && (
              <motion.div
                className="absolute inset-x-0 top-2 flex justify-center pointer-events-none"
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
                        transition={{
                          delay: 0.4 + k * 0.07,
                          type: "spring",
                          stiffness: 380,
                          damping: 14,
                        }}
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
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 mt-3 md:mt-4 flex-1 min-h-0">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: moving ? 0.5 : 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {station ? (
              <>
                <div className="mb-2 md:mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-headline text-xl md:text-3xl font-semibold">
                    {station.dept[lang]}
                  </h3>
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
                <h3 className="font-headline text-3xl md:text-5xl font-semibold leading-tight">
                  {t("journey.finish.title")}
                </h3>
                <p className="mt-3 text-base md:text-xl text-ink-muted leading-relaxed">
                  {t("journey.finish.sub")}
                </p>
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
    <section
      id="journey"
      className="bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] py-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          tone="light"
          label={t("journey.label")}
          title={t("journey.title")}
        />
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
          <h3 className="font-headline text-3xl font-semibold">
            {t("journey.finish.title")}
          </h3>
          <p className="mt-3 text-lg text-ink-muted">
            {t("journey.finish.sub")}
          </p>
          <a
            href="#audit"
            className="mt-5 inline-flex rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"
          >
            {t("hero.cta1")}
          </a>
        </div>
      </div>
    </section>
  );
};

const JourneySection = () =>
  useReducedMotion() ? <JourneyList /> : <JourneyTrack />;

export default JourneySection;
