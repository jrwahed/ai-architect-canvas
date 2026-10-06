import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, FileText, HelpCircle, MessageCircleQuestion } from "lucide-react";
import type { JourneyStation } from "@/data/journey";
import StationWidget from "./StationWidget";

// One part of the company beside the track: a pale, empty block with problems floating around it
// until Mohamed gets there; then it lights up and its screen switches on. Drawn as a box with a
// visible side and roof so it has depth.
const CHAOS = [
  { Icon: AlertTriangle, pos: "-left-4 top-2", tilt: "-12deg", delay: "0s" },
  { Icon: MessageCircleQuestion, pos: "-right-5 top-9", tilt: "10deg", delay: "0.6s" },
  { Icon: FileText, pos: "-left-5 bottom-6", tilt: "8deg", delay: "1.1s" },
  { Icon: HelpCircle, pos: "-right-3 bottom-14", tilt: "-8deg", delay: "0.3s" },
];

interface BuildingProps {
  station: JourneyStation;
  label: string;
  built: boolean;
  active: boolean;
  party: boolean;
  rtl: boolean;
}

const Building = ({ station, label, built, active, party, rtl }: BuildingProps) => {
  const Icon = station.icon;
  // The side face shows on the side away from the viewer's start, so it reads as a box.
  const sideClass = rtl ? "left-0 origin-top-right" : "right-0 origin-top-left";
  const roofSkew = rtl ? "-skew-x-[45deg] origin-bottom-right" : "skew-x-[45deg] origin-bottom-left";
  return (
    <div className="flex flex-col items-center">
      {/* sign */}
      <div
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 md:px-3 md:py-1.5 text-[11px] md:text-sm font-semibold shadow-md transition-colors duration-500 ${
          active ? "bg-primary text-primary-foreground" : built ? "bg-ink text-cream" : "bg-white text-ink/55 border border-ink/10"
        }`}
      >
        <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
        {label}
      </div>
      <div className={`h-2.5 w-0.5 ${built ? "bg-ink/60" : "bg-ink/15"}`} />

      <div className="relative">
        {/* roof */}
        <div
          className={`absolute -top-3 inset-x-0 h-3 md:-top-4 md:h-4 transition-colors duration-700 ${roofSkew} ${
            built ? "bg-ink/70" : "bg-ink/[0.05]"
          }`}
        />
        {/* side face */}
        <div
          className={`absolute top-0 bottom-0 w-3 md:w-4 transition-colors duration-700 ${sideClass} ${
            built ? "bg-ink/75" : "bg-ink/[0.045]"
          }`}
          style={{ transform: `${rtl ? "translateX(-100%)" : "translateX(100%)"} skewY(${rtl ? 45 : -45}deg)` }}
        />
        {/* ground shadow */}
        <div className="absolute -bottom-1 left-1/2 h-3 w-[130%] -translate-x-1/2 rounded-[50%] bg-ink/15 blur-[3px]" />

        {/* front face */}
        <div
          className={`relative h-[104px] w-[108px] md:h-[144px] md:w-[150px] border transition-all duration-700 ${
            built ? "bg-ink border-ink" : "bg-ink/[0.07] border-ink/10 border-dashed"
          } ${active ? "shadow-[0_0_56px_hsl(var(--primary)/0.5)]" : built ? "shadow-lg" : ""}`}
        >
          {/* windows */}
          <div className="grid grid-cols-5 gap-1.5 md:gap-2 px-2.5 pt-2.5 md:px-3.5 md:pt-3.5">
            {Array.from({ length: 10 }).map((_, w) => (
              <span
                key={w}
                className={`h-1.5 md:h-2.5 rounded-[2px] transition-colors duration-500 ${built ? "bg-primary/85" : "bg-ink/10"}`}
                style={{
                  transitionDelay: built ? `${250 + w * 60}ms` : "0ms",
                  animation: built && (active || party) ? `journey-blink ${1.2 + (w % 3) * 0.4}s ease-in-out infinite` : undefined,
                }}
              />
            ))}
          </div>

          {/* screen */}
          <div
            className={`absolute inset-x-2.5 bottom-2.5 md:inset-x-3.5 md:bottom-3.5 h-[52%] overflow-hidden rounded-md border transition-colors duration-500 ${
              built ? "bg-background border-white/10 shadow-[inset_0_0_12px_hsl(var(--primary)/0.15)]" : "bg-ink/[0.06] border-transparent"
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
    </div>
  );
};

export default Building;
