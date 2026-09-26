import AnimatedWords from "@/components/motion/AnimatedWords";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  label: string;
  title: string;
  sub?: string;
  tone?: "dark" | "light";
}

const SectionHeader = ({ label, title, sub, tone = "dark" }: SectionHeaderProps) => {
  const light = tone === "light";
  return (
    <div className="max-w-3xl mb-12 md:mb-16">
      <Reveal>
        <p
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs uppercase tracking-wider ${
            light ? "border-ink/15 text-ink/70" : "border-white/15 text-foreground/75"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {label}
        </p>
      </Reveal>
      <h2
        className={`mt-5 font-headline text-4xl md:text-6xl font-semibold leading-[1.08] tracking-tight text-balance ${
          light ? "text-ink" : "text-foreground"
        }`}
      >
        <AnimatedWords text={title} inView />
      </h2>
      {sub && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-lg leading-relaxed ${light ? "text-ink-muted" : "text-muted-foreground"}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeader;
