import { motion } from "framer-motion";
import type { StationWidgetKind } from "@/data/journey";

// Tiny, wordless "screens" that switch on once a station is built, so visitors see the
// mess turn into a working tool. Pure shapes, no numbers or names.
const on = (delay: number) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.3 } });

const Check = () => (
  <div className="flex h-full flex-col justify-center gap-[12%] px-[10%]">
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex items-center gap-[6%]">
        <motion.span
          className="h-2 w-2 shrink-0 rounded-sm bg-gain"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.35, type: "spring", stiffness: 400 }}
        />
        <motion.span
          className="h-1 rounded-full bg-cream/70"
          initial={{ width: 0 }}
          animate={{ width: `${70 - i * 15}%` }}
          transition={{ delay: 0.3 + i * 0.35, duration: 0.4 }}
        />
      </div>
    ))}
  </div>
);

const Bars = () => (
  <div className="flex h-full items-end justify-between gap-[6%] px-[10%] pb-[12%] pt-[14%]">
    {[45, 70, 38, 95, 60].map((h, i) => (
      <motion.span
        key={i}
        className={`w-full rounded-t-sm ${i === 3 ? "bg-primary" : "bg-cream/45"}`}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    ))}
  </div>
);

const Rows = () => (
  <div className="flex h-full flex-col justify-center gap-[10%] px-[8%]">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="flex items-center gap-[6%]"
        initial={{ x: -14, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25 + i * 0.3, duration: 0.35 }}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-cream/70" />
        <span className="h-1 flex-1 rounded-full bg-cream/40" />
        <span className="h-1.5 w-[22%] rounded-full bg-primary" />
      </motion.div>
    ))}
  </div>
);

const Flow = () => (
  <div className="relative h-full">
    <div className="absolute inset-x-[10%] top-1/2 h-px bg-cream/40" />
    {[10, 45, 80].map((left, i) => (
      <motion.span
        key={left}
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-md border border-cream/70 bg-ink"
        style={{ left: `${left}%` }}
        {...on(0.2 + i * 0.25)}
      />
    ))}
    <span
      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gain"
      style={{ animation: "journey-dot 1.4s linear infinite" }}
    />
  </div>
);

const Chat = () => (
  <div className="flex h-full flex-col justify-center gap-[10%] px-[8%]">
    <motion.span className="h-2.5 w-[55%] rounded-full rounded-bl-none bg-cream/40" {...on(0.2)} />
    <motion.span
      className="h-2.5 w-[62%] self-end rounded-full rounded-br-none bg-gain"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
    />
    <motion.span className="h-2.5 w-[40%] rounded-full rounded-bl-none bg-cream/40" {...on(1.5)} />
  </div>
);

const Kanban = () => (
  <div className="relative grid h-full grid-cols-3 gap-[5%] p-[8%]">
    {[0, 1, 2].map((c) => (
      <div key={c} className="flex flex-col gap-[10%] rounded-sm bg-cream/10 p-[8%]">
        {Array.from({ length: c === 2 ? 1 : 2 }).map((_, i) => (
          <span key={i} className="h-1.5 rounded-sm bg-cream/45" />
        ))}
      </div>
    ))}
    <motion.span
      className="absolute top-[22%] h-1.5 w-[22%] rounded-sm bg-primary"
      initial={{ left: "11%" }}
      animate={{ left: "68%" }}
      transition={{ delay: 0.5, duration: 1, ease: [0.45, 0, 0.55, 1] }}
    />
  </div>
);

const Doc = () => (
  <div className="relative mx-auto h-full w-[52%] py-[8%]">
    <div className="flex h-full flex-col gap-[9%] rounded-sm bg-cream/85 p-[10%]">
      {[90, 70, 80, 50].map((w, i) => (
        <span key={i} className="h-1 rounded-full bg-ink/40" style={{ width: `${w}%` }} />
      ))}
    </div>
    <span
      className="absolute inset-x-[-6%] h-0.5 bg-gain shadow-[0_0_6px_hsl(var(--gain))]"
      style={{ animation: "journey-scan 1.8s ease-in-out infinite" }}
    />
  </div>
);

const Line = () => (
  <svg viewBox="0 0 100 60" className="h-full w-full p-[8%]" preserveAspectRatio="none">
    <motion.polyline
      points="0,52 18,44 34,47 50,30 66,34 82,16 100,8"
      fill="none"
      stroke="hsl(var(--gain))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
    />
  </svg>
);

const Pulse = () => (
  <svg viewBox="0 0 100 60" className="h-full w-full p-[8%]" preserveAspectRatio="none">
    <motion.polyline
      points="0,32 28,32 36,14 44,48 52,24 58,32 100,32"
      fill="none"
      stroke="hsl(var(--gain))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const WIDGETS: Record<StationWidgetKind, () => JSX.Element> = {
  check: Check,
  bars: Bars,
  rows: Rows,
  flow: Flow,
  chat: Chat,
  kanban: Kanban,
  doc: Doc,
  line: Line,
  pulse: Pulse,
};

const StationWidget = ({ kind }: { kind: StationWidgetKind }) => {
  const Widget = WIDGETS[kind];
  return <Widget />;
};

export default StationWidget;
