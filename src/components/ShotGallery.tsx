import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";
import TiltCard from "@/components/motion/TiltCard";

interface Shot {
  key: string;
  label: string;
  caption: string;
  src: string;
}

// Tabs over a set of screenshots: one large screen at a time with its caption.
const ShotGallery = ({ shots }: { shots: Shot[] }) => {
  const [active, setActive] = useState(0);
  const shot = shots[active];

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {shots.map((s, i) => (
          <button
            key={s.key}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              i === active ? "bg-primary text-primary-foreground" : "border border-border text-foreground/80 hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6">
        <AnimatePresence mode="wait">
          <motion.figure
            key={shot.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <TiltCard max={3} glow="255 106 31 / 0.10" className="rounded-2xl">
              <BrowserFrame src={shot.src} alt={shot.caption} />
            </TiltCard>
            <figcaption className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">{shot.caption}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShotGallery;
