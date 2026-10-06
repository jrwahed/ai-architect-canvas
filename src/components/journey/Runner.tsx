import { motion, MotionValue, useTime, useTransform } from "framer-motion";

// Cartoon of Mohamed (curly dark hair, black sweater) running to the right.
// `stride` is the distance covered, so the legs move only while he runs.
// When `work` is 1 he stands and hammers, building the part of the system at that station.
// Character colours are part of the drawing, not the theme; the shoes use the brand orange.
const SKIN = "#E7B289";
const SKIN_SHADE = "#CF956C";
const HAIR = "#2A1810";
const SWEATER = "#17181C";
const PANTS = "#232B3D";

const HAIR_CURLS: [number, number, number][] = [
  [44, 30, 7], [45, 21, 8], [52, 14, 8], [61, 10, 8], [70, 11, 8], [78, 16, 7.5],
  [83, 23, 6.5], [56, 19, 6], [66, 17, 6], [74, 21, 5.5], [41, 39, 5.5], [49, 26, 6],
];

interface RunnerProps {
  stride: MotionValue<number>;
  work: MotionValue<number>;
  className?: string;
}

const Runner = ({ stride, work, className }: RunnerProps) => {
  const time = useTime();
  const swing = useTransform(stride, (s) => Math.sin(s * Math.PI * 2));
  const legFront = useTransform(swing, (v) => v * 38);
  const legBack = useTransform(swing, (v) => -v * 38);
  const armFront = useTransform(() =>
    work.get() ? -78 + Math.sin(time.get() / 70) * 30 : -swing.get() * 45,
  );
  const armBack = useTransform(swing, (v) => v * 45);
  const bob = useTransform(() => (work.get() ? Math.sin(time.get() / 70) * 1.2 : -Math.abs(swing.get()) * 3));

  const leg = (rotate: MotionValue<number>, shade = false) => (
    <motion.g style={{ rotate, originX: 0.5, originY: 0 }}>
      <rect x="53" y="96" width="14" height="34" rx="7" fill={PANTS} opacity={shade ? 0.75 : 1} />
      <rect x="51" y="125" width="26" height="11" rx="5.5" fill="hsl(var(--primary))" />
      <rect x="51" y="132" width="26" height="4" rx="2" fill="#fff" opacity="0.85" />
    </motion.g>
  );

  return (
    <svg viewBox="-10 -20 140 160" className={className} aria-hidden="true">
      <motion.g style={{ y: bob }}>
        {leg(legBack, true)}
        <motion.g style={{ rotate: armBack, originX: 0.5, originY: 0 }}>
          <rect x="54" y="62" width="12" height="30" rx="6" fill={SWEATER} opacity={0.7} />
          <circle cx="60" cy="93" r="5.5" fill={SKIN_SHADE} />
        </motion.g>

        {/* body */}
        <rect x="55" y="50" width="11" height="10" rx="3" fill={SKIN_SHADE} />
        <rect x="43" y="56" width="34" height="46" rx="14" fill={SWEATER} />
        <path d="M51 58 Q60 64 70 58" stroke="#2c2e35" strokeWidth="2" fill="none" />

        {leg(legFront)}

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

        {/* front arm, holding a hammer while he builds */}
        <motion.g style={{ rotate: armFront, originX: 0.5, originY: 0 }}>
          <rect x="54" y="62" width="12" height="30" rx="6" fill={SWEATER} />
          <motion.g style={{ opacity: work }}>
            <rect x="58" y="88" width="4.5" height="24" rx="2" fill="#8A5A3B" />
            <rect x="51" y="106" width="18" height="9" rx="2.5" fill="#5B6270" />
          </motion.g>
          <circle cx="60" cy="93" r="5.5" fill={SKIN} />
        </motion.g>
      </motion.g>
    </svg>
  );
};

export default Runner;
