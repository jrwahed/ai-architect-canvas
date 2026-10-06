import { motion, MotionValue, useTime, useTransform } from "framer-motion";
import { ReactNode } from "react";

// Cartoon of Mohamed (curly dark hair, black sweater, orange shoes) seen from the side, facing right.
// The pose comes from a classic 8-key run cycle (contact → down → pass → push-off → flight, twice)
// indexed by `stride` (distance covered, in cycles), so the legs move only when he moves.
// `run` blends between standing still (0) and full running (1); `air` blends to a hurdle pose.
// Character colours are part of the drawing, not the theme; the shoes use the brand orange.
const SKIN = "#E8B48C";
const SKIN_SHADE = "#CC9469";
const HAIR = "#2A1810";
const HAIR_LIGHT = "#3C241A";
const SWEATER = "#1A1B20";
const SWEATER_FAR = "#2B2D35";
const PANTS = "#242D42";
const PANTS_FAR = "#38435C";
const OUTLINE = "rgba(20, 14, 10, 0.28)";

// Eight keys over one cycle, for one leg. Forward is positive for the thigh and the arm.
const THIGH = [34, 20, 2, -18, -30, -24, -4, 20]; // hip angle
const KNEE = [10, 32, 22, 18, 80, 112, 96, 50]; // bend of the lower leg
const FOOT = [-10, 0, 0, 24, 32, 16, 6, -6]; // toe down is positive
const BOB = [1, 5, 2, -5, 1, 5, 2, -5]; // hip height, +down (two contacts per cycle)
const ARM = [36, 30, 10, -16, -38, -30, -10, 14]; // shoulder angle, same keys as the opposite leg
const ELBOW = [96, 92, 84, 74, 66, 72, 82, 92];

const IDLE = { thigh: 0, knee: 6, foot: 0, arm: -6, elbow: 24, lean: 2 };
const HURDLE = {
  near: { thigh: 58, knee: 4, foot: -14 },
  far: { thigh: -34, knee: 112, foot: 30 },
  armNear: { arm: 44, elbow: 36 },
  armFar: { arm: -34, elbow: 70 },
  lean: 20,
};

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
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * f +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f +
      (-p0 + 3 * p1 - 3 * p2 + p3) * f * f * f)
  );
};
const mix = (a: number, b: number, k: number) => a + (b - a) * k;

// A wide invisible bar at the joint keeps the group's box centred on x=60 with its top at the
// joint, so framer's origin (0.5, 0) is the joint itself however the limb below it swings.
const Joint = ({
  y,
  rotate,
  children,
}: {
  y: number;
  rotate: MotionValue<number>;
  children: ReactNode;
}) => (
  <motion.g style={{ rotate, originX: 0.5, originY: 0 }}>
    <rect x="-60" y={y} width="240" height="0.01" fill="none" />
    {children}
  </motion.g>
);

interface RunnerProps {
  stride: MotionValue<number>;
  run: MotionValue<number>;
  air: MotionValue<number>;
  lean: MotionValue<number>;
  className?: string;
}

const Runner = ({ stride, run, air, lean, className }: RunnerProps) => {
  const time = useTime();

  // Near limbs are drawn in front; the far leg and the near arm are half a cycle out of phase.
  const useLegAngle = (
    table: number[],
    offset: number,
    idle: number,
    hurdle: number,
  ) =>
    useTransform(() => {
      const r = run.get();
      const v = mix(idle, key(table, stride.get() + offset), r);
      return mix(v, hurdle, air.get());
    });

  const thighNear = useLegAngle(THIGH, 0, IDLE.thigh, HURDLE.near.thigh);
  const kneeNear = useLegAngle(KNEE, 0, IDLE.knee, HURDLE.near.knee);
  const footNear = useLegAngle(FOOT, 0, IDLE.foot, HURDLE.near.foot);
  const thighFar = useLegAngle(THIGH, 0.5, -IDLE.thigh, HURDLE.far.thigh);
  const kneeFar = useLegAngle(KNEE, 0.5, IDLE.knee, HURDLE.far.knee);
  const footFar = useLegAngle(FOOT, 0.5, IDLE.foot, HURDLE.far.foot);
  const armNear = useLegAngle(ARM, 0.5, IDLE.arm, HURDLE.armNear.arm);
  const elbowNear = useLegAngle(ELBOW, 0.5, IDLE.elbow, HURDLE.armNear.elbow);
  const armFar = useLegAngle(ARM, 0, IDLE.arm, HURDLE.armFar.arm);
  const elbowFar = useLegAngle(ELBOW, 0, IDLE.elbow, HURDLE.armFar.elbow);

  // SVG rotation is clockwise, so a forward swing is negative for a limb hanging down.
  const useNeg = (v: MotionValue<number>) => useTransform(v, (x) => -x);
  const rThighNear = useNeg(thighNear);
  const rThighFar = useNeg(thighFar);
  const rArmNear = useNeg(armNear);
  const rArmFar = useNeg(armFar);
  const rElbowNear = useNeg(elbowNear);
  const rElbowFar = useNeg(elbowFar);

  const bob = useTransform(() => {
    const r = run.get();
    const breathe = Math.sin(time.get() / 650) * 1.2;
    return mix(breathe, key(BOB, stride.get()), r) * (1 - air.get());
  });
  const torsoLean = useTransform(() => {
    const r = run.get();
    const sway = Math.sin(stride.get() * Math.PI * 4) * 1.5 * r;
    return mix(mix(IDLE.lean, lean.get(), r) + sway, HURDLE.lean, air.get());
  });
  const headTilt = useTransform(torsoLean, (l) => -l * 0.45);

  const leg = (
    thigh: MotionValue<number>,
    knee: MotionValue<number>,
    foot: MotionValue<number>,
    far = false,
  ) => (
    <g transform={far ? "translate(-4 0)" : undefined}>
      <Joint y={92} rotate={thigh}>
        <rect
          x="52"
          y="88"
          width="16"
          height="32"
          rx="8"
          fill={far ? PANTS_FAR : PANTS}
          stroke={OUTLINE}
          strokeWidth="1"
        />
        <Joint y={117} rotate={knee}>
          <rect
            x="53.5"
            y="113"
            width="13"
            height="30"
            rx="6.5"
            fill={far ? PANTS_FAR : PANTS}
            stroke={OUTLINE}
            strokeWidth="1"
          />
          <Joint y={140} rotate={foot}>
            {/* shoe: heel behind the ankle, toe in front */}
            <path
              d="M50 138 h26 q7 0 7 6 v3 q0 3 -3 3 h-30 q-4 0 -4 -4 v-4 q0 -4 4 -4z"
              fill="hsl(var(--primary))"
              opacity={far ? 0.78 : 1}
              stroke={OUTLINE}
              strokeWidth="1"
            />
            <path
              d="M50 147 h32"
              stroke="#fff"
              strokeWidth="2.2"
              opacity="0.9"
            />
            <path
              d="M62 139 q4 3 8 3"
              stroke="#fff"
              strokeWidth="1.3"
              fill="none"
              opacity="0.6"
            />
          </Joint>
        </Joint>
      </Joint>
    </g>
  );

  // The far limbs sit a little behind the near ones, so they peek out past the body instead of hiding.
  const arm = (
    upper: MotionValue<number>,
    fore: MotionValue<number>,
    far = false,
  ) => (
    <g transform={far ? "translate(-9 0)" : undefined}>
      <Joint y={56} rotate={upper}>
        <rect
          x="53.5"
          y="52"
          width="13"
          height="26"
          rx="6.5"
          fill={far ? SWEATER_FAR : SWEATER}
          stroke={OUTLINE}
          strokeWidth="1"
        />
        <Joint y={75} rotate={fore}>
          <rect
            x="54.5"
            y="72"
            width="11"
            height="22"
            rx="5.5"
            fill={far ? SWEATER_FAR : SWEATER}
            stroke={OUTLINE}
            strokeWidth="1"
          />
          <circle
            cx="60"
            cy="95"
            r="5.5"
            fill={far ? SKIN_SHADE : SKIN}
            stroke={OUTLINE}
            strokeWidth="1"
          />
        </Joint>
      </Joint>
    </g>
  );

  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
      <motion.g style={{ y: bob }}>
        {leg(rThighFar, kneeFar, footFar, true)}

        {/* upper body leans forward from the hips */}
        <motion.g style={{ rotate: torsoLean, originX: 0.5, originY: 1 }}>
          <rect x="-60" y="0" width="240" height="92" fill="none" />
          {arm(rArmFar, rElbowFar, true)}

          {/* torso */}
          <path
            d="M48 60 q0 -8 8 -9 h12 q8 1 8 9 l2 28 q0 6 -6 6 h-20 q-6 0 -6 -6z"
            fill={SWEATER}
            stroke={OUTLINE}
            strokeWidth="1"
          />
          <path
            d="M52 62 q8 6 18 0"
            stroke="#34363f"
            strokeWidth="2"
            fill="none"
          />
          {/* neck */}
          <rect x="57" y="44" width="10" height="10" rx="3" fill={SKIN_SHADE} />

          {/* head, drawn in three-quarter profile */}
          <motion.g style={{ rotate: headTilt, originX: 0.55, originY: 1 }}>
            <rect x="-60" y="0" width="240" height="48" fill="none" />
            <ellipse
              cx="64"
              cy="29"
              rx="17"
              ry="18"
              fill={SKIN}
              stroke={OUTLINE}
              strokeWidth="1"
            />
            {/* hair: a cap over the top and back, with curls on the edge */}
            <path
              d="M47 30 q-2 -22 18 -24 q14 -1 18 12 q-6 -3 -10 2 q-6 -6 -12 2 q-5 -4 -9 3 q-3 0 -5 5z"
              fill={HAIR}
            />
            {(
              [
                [48, 31, 6],
                [47, 23, 6.5],
                [51, 16, 6.5],
                [58, 11, 6.5],
                [66, 10, 6.5],
                [74, 13, 6],
                [79, 19, 5.5],
                [56, 18, 5],
                [64, 16, 5],
                [72, 19, 4.5],
                [50, 38, 4.5],
                [47, 16, 4],
              ] as const
            ).map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={HAIR} />
            ))}
            <circle cx="60" cy="14" r="3" fill={HAIR_LIGHT} />
            <circle cx="52" cy="22" r="2.5" fill={HAIR_LIGHT} />
            {/* ear */}
            <ellipse
              cx="50"
              cy="32"
              rx="3.2"
              ry="4.2"
              fill={SKIN_SHADE}
              stroke={OUTLINE}
              strokeWidth="0.8"
            />
            {/* brow, eye, nose, mouth */}
            <path
              d="M67 24 q5 -2.5 9 -0.5"
              stroke={HAIR}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="72" cy="29" rx="2.6" ry="3" fill="#fff" />
            <circle cx="73" cy="29.5" r="1.7" fill={HAIR} />
            <path
              d="M78 30 q4 4 1 8"
              stroke={SKIN_SHADE}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70 41 q4 3 8 -1"
              stroke="#9b4a3c"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </motion.g>

          {arm(rArmNear, rElbowNear)}
        </motion.g>

        {leg(rThighNear, kneeNear, footNear)}
      </motion.g>
    </svg>
  );
};

export default Runner;
