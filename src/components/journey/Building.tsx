import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, FileText, HelpCircle, MessageCircleQuestion } from "lucide-react";
import type { JourneyStation } from "@/data/journey";
import StationWidget from "./StationWidget";

// One part of the company on the track: a pale, empty block with problems floating around it
// until Mohamed builds it; then it lights up and its screen switches on.
const CHAOS = [
  { Icon: AlertTriangle, pos: "-left-3 top-3", tilt: "-12deg", delay: "0s" },
  { Icon: MessageCircleQuestion, pos: "-right-4 top-8", tilt: "10deg", delay: "0.6s" },
  { Icon: FileText, pos: "-left-4 bottom-4", tilt: "8deg", delay: "1.1s" },
  { Icon: HelpCircle, pos: "-right-2 bottom-12", tilt: "-8deg", delay: "0.3s" },
];

interface BuildingProps {
  station: JourneyStation;
  label: string;
  built: boolean;
  active: boolean;
  party: boolean;
}

const Building = ({ station, label, built, active, party }: BuildingProps) => {
  const Icon = station.icon;
  return (
    <div className="flex flex-col items-center">
      {/* sign */}
      <div
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 md:px-3 md:py-1.5 text-[11px] md:text-sm font-semibold shadow-sm transition-colors duration-500 ${
          active ? "bg-primary text-primary-foreground" : built ? "bg-ink text-cream" : "bg-white text-ink/55 border border-ink/10"
        }`}
      >
        <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
        {label}
      </div>
      <div className={`h-2 w-0.5 ${built ? "bg-ink/60" : "bg-ink/15"}`} />

      {/* the building */}
      <div
        className={`relative h-[104px] w-[108px] md:h-[140px] md:w-[148px] rounded-t-xl border transition-all duration-700 ${
          built ? "bg-ink border-ink" : "bg-ink/[0.07] border-ink/10 border-dashed"
        } ${active ? "shadow-[0_0_48px_hsl(var(--primary)/0.45)]" : ""}`}
      >
        {/* windows */}
        <div className="grid grid-cols-5 gap-1.5 md:gap-2 px-2.5 pt-2.5 md:px-3.5 md:pt-3.5">
          {Array.from({ length: 10 }).map((_, w) => (
            <span
              key={w}
              className={`h-1.5 md:h-2.5 rounded-[2px] transition-colors duration-500 ${built ? "bg-primary/85" : "bg-ink/10"}`}
              style={{
                transitionDelay: built ? `${300 + w * 70}ms` : "0ms",
                animation: built && (active || party) ? `journey-blink ${1.2 + (w % 3) * 0.4}s ease-in-out infinite` : undefined,
              }}
            />
          ))}
        </div>

        {/* screen */}
        <div
          className={`absolute inset-x-2.5 bottom-2.5 md:inset-x-3.5 md:bottom-3.5 h-[52%] overflow-hidden rounded-md border transition-colors duration-500 ${
            built ? "bg-background border-white/10" : "bg-ink/[0.06] border-transparent"
          }`}
        >
          {built && <StationWidget kind={station.widget} />}
        </div>

        {/* problems floating around it until it is built */}
        <AnimatePresence>
          {!built &&
            CHAOS.map(({ Icon: Chaos, pos, tilt, delay }) => (
              <motion.span
                key={pos}
                className={`absolute ${pos}`}
                initial={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, rotate: 120, transition: { duration: 0.35 } }}
              >
                <span
                  className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-white text-leak shadow-md"
                  style={{ animation: `journey-float 2.4s ease-in-out ${delay} infinite`, ["--tilt" as string]: tilt }}
                >
                  <Chaos className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
              </motion.span>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Building;
