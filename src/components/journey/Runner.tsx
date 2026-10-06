import { MotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

// Cartoon of Mohamed (curly dark hair, black sweater, orange shoes) seen from the FRONT, running
// toward the viewer. The pose comes from a classic 8-key run cycle (hip, knee, foot, shoulder and
// elbow angles, as seen from the side) which is projected onto the screen: a limb swung toward the
// viewer looks shorter and thicker, one swung away looks shorter and thinner.
// `stride` is the distance covered (in cycles), `run` blends from standing (0) to running (1),
// `air` blends to a tucked hurdle pose. Every joint is drawn from numbers each frame, so it renders
// the same in every browser. Character colours are part of the drawing; shoes use the brand orange.
const SKIN = "#E8B48C";
const SKIN_SHADE = "#CC9469";
const HAIR = "#2A1810";
const HAIR_LIGHT = "#3C241A";
const SWEATER = "#1A1B20";
const SWEATER_LIGHT = "#2B2D35";
const PANTS = "#242D42";
const SHOE = "hsl(var(--primary))";
const OUTLINE = "rgba(20, 14, 10, 0.28)";

// Eight keys over one cycle, for one leg. Forward (toward the viewer) is positive.
const THIGH = [34, 20, 2, -18, -30, -24, -4, 20];
const KNEE = [10, 32, 22, 18, 80, 112, 96, 50];
const BOB = [1, 5, 2, -5, 1, 5, 2, -5];
const ARM = [36, 30, 10, -16, -38, -30, -10, 14];
const ELBOW = [96, 92, 84, 74, 66, 72, 82, 92];

const IDLE = { thigh: 0, knee: 4, arm: -4, elbow: 20 };
const HURDLE = { thigh: 72, knee: 100, arm: 40, elbow: 70 };

// Limb lengths and joints, in the drawing's own coordinates (120 wide, 180 tall).
const L = { thigh: 34, shin: 32, upper: 24, fore: 22 };
const HIP_Y = 104;
const SHOULDER_Y = 66;
const HIP_X = [49, 71]; // near (viewer's left) and far leg
const SHOULDER_X = [36, 84];
const DEPTH = 0.0075; // how much nearer parts grow per unit of depth
const RAD = Math.PI / 180;

const KEYS = THIGH.length;
// Catmull-Rom interpolation over a periodic key table; t is in cycles.
const key = (table: number[], t: number) => {
  const x = (((t % 1) + 1) % 1) * KEYS;
  const i = Math.floor(x);
  const f = x - i;
  const p0 = table[(i - 1 + KEYS) % KEYS];
  const p1 = table[i % KEYS];
  const p2 = table[(i + 1) % KEYS];
  const p3 = table[(i + 2) % KEYS];
  return 0.5 * (2 * p1 + (-p0 + p2) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f + (-p0 + 3 * p1 - 3 * p2 + p3) * f * f * f);
};
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
const n = (v: number) => v.toFixed(2);

interface RunnerProps {
  stride: MotionValue<number>;
  run: MotionValue<number>;
  air: MotionValue<number>;
  className?: string;
}

type Part =
  | "body" | "head"
  | "thigh0" | "shin0" | "foot0" | "thigh1" | "shin1" | "foot1"
  | "upper0" | "fore0" | "hand0" | "upper1" | "fore1" | "hand1";

const Runner = ({ stride, run, air, className }: RunnerProps) => {
  const refs = useRef<Partial<Record<Part, SVGElement | null>>>({});
  const set = (name: Part) => (el: SVGElement | null) => {
    refs.current[name] = el;
  };

  useAnimationFrame((time) => {
    const r = refs.current;
    if (!r.body) return;
    const t = stride.get();
    const k = run.get();
    const a = air.get();
    const angle = (table: number[], offset: number, idle: number, hurdle: number) =>
      mix(mix(idle, key(table, t + offset), k), hurdle, a);

    const seg = (el: SVGElement | null | undefined, x1: number, y1: number, x2: number, y2: number, w: number) => {
      if (!el) return;
      el.setAttribute("x1", n(x1));
      el.setAttribute("y1", n(y1));
      el.setAttribute("x2", n(x2));
      el.setAttribute("y2", n(y2));
      el.setAttribute("stroke-width", n(w));
    };
    const dot = (el: SVGElement | null | undefined, cx: number, cy: number, rx: number, ry: number) => {
      if (!el) return;
      el.setAttribute("cx", n(cx));
      el.setAttribute("cy", n(cy));
      el.setAttribute("rx", n(rx));
      el.setAttribute("ry", n(ry));
    };

    // Legs: the two legs are half a cycle apart. A thigh swung forward comes toward the viewer.
    for (const i of [0, 1] as const) {
      const thigh = angle(THIGH, i * 0.5, IDLE.thigh, HURDLE.thigh) * RAD;
      const knee = angle(KNEE, i * 0.5, IDLE.knee, HURDLE.knee) * RAD;
      const x = HIP_X[i] + Math.sin(t * Math.PI * 2 + i * Math.PI) * 1.5 * k;
      const kneeY = HIP_Y + L.thigh * Math.cos(thigh);
      const kneeZ = L.thigh * Math.sin(thigh);
      const shinAngle = thigh - knee; // the shin folds back behind the thigh
      const ankleY = kneeY + L.shin * Math.cos(shinAngle);
      const ankleZ = kneeZ + L.shin * Math.sin(shinAngle);
      seg(r[`thigh${i}`], x, HIP_Y, x, kneeY, 15 * (1 + kneeZ * DEPTH * 0.5));
      seg(r[`shin${i}`], x, kneeY, x, ankleY, 12 * (1 + ankleZ * DEPTH * 0.5));
      // the shoe: a sole seen from the front when the foot is up and back, a toe when it's forward
      const up = Math.max(0, -ankleZ) / 40;
      dot(r[`foot${i}`], x, ankleY + 3 - up * 2, 9 * (1 + ankleZ * DEPTH * 0.6), 5 + up * 4);
    }

    // Arms swing opposite to the leg on the same side, with the elbow bent.
    for (const i of [0, 1] as const) {
      const arm = angle(ARM, i * 0.5, IDLE.arm, HURDLE.arm) * RAD;
      const elbow = angle(ELBOW, i * 0.5, IDLE.elbow, HURDLE.elbow) * RAD;
      const x = SHOULDER_X[i];
      const elbowY = SHOULDER_Y + L.upper * Math.cos(arm);
      const elbowZ = L.upper * Math.sin(arm);
      const foreAngle = arm + elbow; // the forearm folds up in front
      const handY = elbowY + L.fore * Math.cos(foreAngle);
      const handZ = elbowZ + L.fore * Math.sin(foreAngle);
      // the arm drifts a little toward the body as it swings forward
      const dx = (i === 0 ? 1 : -1) * Math.max(0, handZ) * 0.12;
      seg(r[`upper${i}`], x, SHOULDER_Y, x + dx * 0.4, elbowY, 12 * (1 + elbowZ * DEPTH * 0.5));
      seg(r[`fore${i}`], x + dx * 0.4, elbowY, x + dx, handY, 10 * (1 + handZ * DEPTH * 0.5));
      const hr = 6 * (1 + handZ * DEPTH);
      dot(r[`hand${i}`], x + dx, handY, hr, hr);
    }

    const breathe = Math.sin(time / 650) * 1.2;
    const bob = mix(breathe, key(BOB, t) * 1.1, k) * (1 - a);
    const sway = Math.sin(t * Math.PI * 2) * 3 * k * (1 - a);
    const grow = 1 + 0.03 * k; // a touch bigger while he runs at you
    r.body!.setAttribute("transform", `translate(60 ${n(172 + bob)}) rotate(${n(sway)}) scale(${n(grow)}) translate(-60 -172)`);
    r.head!.setAttribute("transform", `rotate(${n(-sway * 0.6)} 60 48)`);
  });

  const limb = (name: Part, color: string) => (
    <line ref={set(name)} stroke={color} strokeLinecap="round" x1="0" y1="0" x2="0" y2="0" strokeWidth="12" />
  );

  return (
    <svg viewBox="0 0 120 180" className={className} aria-hidden="true">
      <g ref={set("body")}>
        {/* legs */}
        {limb("thigh1", PANTS)}
        {limb("shin1", PANTS)}
        <ellipse ref={set("foot1")} fill={SHOE} stroke={OUTLINE} strokeWidth="1" />
        {limb("thigh0", PANTS)}
        {limb("shin0", PANTS)}
        <ellipse ref={set("foot0")} fill={SHOE} stroke={OUTLINE} strokeWidth="1" />

        {/* torso */}
        <path
          d="M38 62 q0 -8 8 -9 h28 q8 1 8 9 l3 36 q0 7 -7 7 h-34 q-7 0 -7 -7z"
          fill={SWEATER}
          stroke={OUTLINE}
          strokeWidth="1"
        />
        <path d="M48 62 q12 8 24 0" stroke={SWEATER_LIGHT} strokeWidth="2.2" fill="none" />
        <path d="M44 100 h32" stroke={SWEATER_LIGHT} strokeWidth="2" opacity="0.6" />
        {/* neck */}
        <rect x="53" y="50" width="14" height="12" rx="4" fill={SKIN_SHADE} />

        {/* head, facing the viewer */}
        <g ref={set("head")}>
          <ellipse cx="60" cy="34" rx="20" ry="21" fill={SKIN} stroke={OUTLINE} strokeWidth="1" />
          {/* ears */}
          <ellipse cx="40" cy="36" rx="3.5" ry="5" fill={SKIN_SHADE} stroke={OUTLINE} strokeWidth="0.8" />
          <ellipse cx="80" cy="36" rx="3.5" ry="5" fill={SKIN_SHADE} stroke={OUTLINE} strokeWidth="0.8" />
          {/* hair: a cap with curls around the edge */}
          <path d="M40 30 q0 -22 20 -22 q20 0 20 22 q-5 -6 -12 -3 q-8 -8 -16 0 q-7 -3 -12 3z" fill={HAIR} />
          {(
            [
              [41, 26, 6.5], [44, 18, 6.5], [50, 12, 6.5], [58, 9, 6.5], [66, 10, 6.5], [73, 15, 6.5],
              [78, 23, 6], [80, 30, 5], [40, 33, 5], [52, 16, 4.5], [64, 15, 4.5], [72, 21, 4.5],
            ] as const
          ).map(([cx, cy, rr]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={rr} fill={HAIR} />
          ))}
          <circle cx="54" cy="13" r="3" fill={HAIR_LIGHT} />
          <circle cx="68" cy="14" r="2.5" fill={HAIR_LIGHT} />
          {/* brows, eyes, nose, mouth */}
          <path d="M48 30 q4 -3 9 -1" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M63 29 q5 -2 9 1" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <ellipse cx="53" cy="36" rx="3" ry="3.4" fill="#fff" />
          <ellipse cx="67" cy="36" rx="3" ry="3.4" fill="#fff" />
          <circle cx="53.5" cy="36.5" r="1.9" fill={HAIR} />
          <circle cx="67.5" cy="36.5" r="1.9" fill={HAIR} />
          <path d="M60 38 q-3 6 1 7" stroke={SKIN_SHADE} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M53 47 q7 6 14 0" stroke="#9b4a3c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M55 48 q5 3 10 0" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* arms, in front of the body */}
        {limb("upper0", SWEATER)}
        {limb("fore0", SWEATER)}
        <ellipse ref={set("hand0")} fill={SKIN} stroke={OUTLINE} strokeWidth="1" />
        {limb("upper1", SWEATER)}
        {limb("fore1", SWEATER)}
        <ellipse ref={set("hand1")} fill={SKIN} stroke={OUTLINE} strokeWidth="1" />
      </g>
    </svg>
  );
};

export default Runner;
