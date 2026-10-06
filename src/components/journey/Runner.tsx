import { motion, MotionValue, useTime, useTransform } from "framer-motion";
import { ReactNode } from "react";

// Cartoon of Mohamed (curly dark hair, black sweater) running to the right.
// `stride` is the distance covered, so the legs move only while he runs; `lean` tilts him
// forward with speed. When `work` is 1 he stands and hammers, building that station's part.
// Character colours are part of the drawing, not the theme; the shoes use the brand orange.
const SKIN = "#E7B289";
const SKIN_SHADE = "#CF956C";
const HAIR = "#2A1810";
const SWEATER = "#17181C";
const SWEATER_BACK = "#2A2C33";
const PANTS = "#232B3D";
const PANTS_BACK = "#353F55";

const HAIR_CURLS: [number, number, number][] = [
  [44, 30, 7], [45, 21, 8], [52, 14, 8], [61, 10, 8], [70, 11, 8], [78, 16, 7.5],
  [83, 23, 6.5], [56, 19, 6], [66, 17, 6], [74, 21, 5.5], [41, 39, 5.5], [49, 26, 6],
];

// A wide, invisible bar at the joint keeps the group's box centred on x=60 with its top at the
// joint, so framer's origin (0.5, 0) is the joint itself however the limb below it swings.
const Joint = ({ y, rotate, children }: { y: number; rotate: MotionValue<number>; children: ReactNode }) => (
  <motion.g style={{ rotate, originX: 0.5, originY: 0 }}>
    <rect x="-40" y={y} width="200" height="0.5" fill="none" />
    {children}
  </motion.g>
);

interface RunnerProps {
  stride: MotionValue<number>;
  lean: MotionValue<number>;
  work: MotionValue<number>;
  className?: string;
}

const Runner = ({ stride, lean, work, className }: RunnerProps) => {
  const time = useTime();
  const phase = useTransform(stride, (s) => s * Math.PI * 2);
  const hit = useTransform(time, (t) => Math.sin(t / 70));

  // Legs: the thigh swings at the hip; the knee folds most while the foot travels back.
  const thighA = useTransform(phase, (p) => Math.sin(p) * 34);
  const thighB = useTransform(phase, (p) => Math.sin(p + Math.PI) * 34);
  const kneeA = useTransform(phase, (p) => 8 + Math.max(0, -Math.cos(p)) * 70);
  const kneeB = useTransform(phase, (p) => 8 + Math.max(0, -Math.cos(p + Math.PI)) * 70);

  // Arms swing opposite the legs with the elbows bent; the front one hammers while he works.
  const upperFront = useTransform(() => (work.get() ? -55 + hit.get() * 22 : -Math.sin(phase.get()) * 32));
  const foreFront = useTransform(() => (work.get() ? -45 + hit.get() * 28 : -62));
  const upperBack = useTransform(phase, (p) => Math.sin(p) * 32);
  const foreBack = useTransform(() => (work.get() ? -20 : -62));

  const bob = useTransform(() => (work.get() ? hit.get() * 1.2 : -Math.abs(Math.sin(phase.get())) * 4));
  const tilt = useTransform(() => (work.get() ? 4 : lean.get()));

  const leg = (thigh: MotionValue<number>, knee: MotionValue<number>, back = false) => (
    <Joint y={96} rotate={thigh}>
      <rect x="53" y="94" width="14" height="22" rx="7" fill={back ? PANTS_BACK : PANTS} />
      <Joint y={112} rotate={knee}>
        <rect x="54" y="110" width="12" height="20" rx="6" fill={back ? PANTS_BACK : PANTS} />
        <rect x="51" y="125" width="26" height="11" rx="5.5" fill="hsl(var(--primary))" opacity={back ? 0.8 : 1} />
        <rect x="51" y="132" width="26" height="4" rx="2" fill="#fff" opacity="0.85" />
      </Joint>
    </Joint>
  );

  const arm = (upper: MotionValue<number>, fore: MotionValue<number>, back = false) => (
    <Joint y={62} rotate={upper}>
      <rect x="54" y="60" width="12" height="20" rx="6" fill={back ? SWEATER_BACK : SWEATER} />
      <Joint y={77} rotate={fore}>
        <rect x="55" y="75" width="10" height="18" rx="5" fill={back ? SWEATER_BACK : SWEATER} />
        {!back && (
          <motion.g style={{ opacity: work }}>
            <rect x="58" y="89" width="4.5" height="22" rx="2" fill="#8A5A3B" />
            <rect x="50" y="106" width="20" height="9" rx="2.5" fill="#5B6270" />
            <rect x="50" y="106" width="20" height="3" rx="1.5" fill="#8C95A3" />
          </motion.g>
        )}
        <circle cx="60" cy="93" r="5.5" fill={back ? SKIN_SHADE : SKIN} />
      </Joint>
    </Joint>
  );

  return (
    <svg viewBox="-10 -20 140 160" className={className} aria-hidden="true">
      {/* the whole body leans around the feet */}
      <motion.g style={{ rotate: tilt, originX: 0.5, originY: 1 }}>
        <rect x="-40" y="-20" width="200" height="158" fill="none" />
        <motion.g style={{ y: bob }}>
          {leg(thighB, kneeB, true)}
          {arm(upperBack, foreBack, true)}

          {/* body */}
          <rect x="55" y="50" width="11" height="10" rx="3" fill={SKIN_SHADE} />
          <rect x="43" y="56" width="34" height="46" rx="14" fill={SWEATER} />
          <path d="M51 58 Q60 64 70 58" stroke="#2c2e35" strokeWidth="2" fill="none" />

          {leg(thighA, kneeA)}

          {/* head */}
          <g>
            <ellipse cx="63" cy="34" rx="21" ry="23" fill={SKIN} />
            <circle cx="44" cy="37" r="5.5" fill={SKIN_SHADE} />
            <path d="M46 44 Q52 58 64 57 Q76 57 82 44 Q78 52 64 53 Q52 53 46 44Z" fill={HAIR} opacity="0.22" />
            {HAIR_CURLS.map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={HAIR} />
            ))}
            <path d="M64 29 L72 28" stroke={HAIR} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M76 28 L82 29" stroke={HAIR} strokeWidth="2.4" strokeLinecap="round" />
            <ellipse cx="68" cy="35" rx="2" ry="2.6" fill={HAIR} />
            <ellipse cx="79" cy="35" rx="2" ry="2.6" fill={HAIR} />
            <path d="M75 37 Q78 42 75 43" stroke={SKIN_SHADE} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M68 47 Q74 51 79 46" stroke="#9b4a3c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>

          {arm(upperFront, foreFront)}
        </motion.g>
      </motion.g>
    </svg>
  );
};

export default Runner;
