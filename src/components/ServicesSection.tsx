import { Target, Workflow, Network, LayoutDashboard, Check, Clock, ArrowUpRight, ArrowUpLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { whatsappWithText } from "@/lib/contact";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";
import TiltCard from "@/components/motion/TiltCard";

// Bento layout: each card gets its own surface so the grid reads as four distinct systems.
const SERVICES = [
  {
    key: "s1",
    icon: Target,
    span: "md:col-span-7",
    card: "bg-ink text-cream",
    muted: "text-cream/65",
    chip: "border-cream/20 text-cream/80",
    iconBox: "bg-primary text-primary-foreground",
    link: "bg-cream text-ink",
    glow: "255 106 31 / 0.18",
  },
  {
    key: "s2",
    icon: Workflow,
    span: "md:col-span-5",
    card: "bg-primary text-primary-foreground",
    muted: "text-primary-foreground/70",
    chip: "border-primary-foreground/25 text-primary-foreground/85",
    iconBox: "bg-primary-foreground text-primary",
    link: "bg-primary-foreground text-primary",
    glow: "255 255 255 / 0.22",
  },
  {
    key: "s3",
    icon: Network,
    span: "md:col-span-5",
    card: "bg-white text-ink border border-ink/10",
    muted: "text-ink-muted",
    chip: "border-ink/15 text-ink/70",
    iconBox: "bg-ink text-cream",
    link: "bg-ink text-cream",
    glow: "255 106 31 / 0.10",
  },
  {
    key: "s4",
    icon: LayoutDashboard,
    span: "md:col-span-7",
    card: "bg-background text-foreground bg-[radial-gradient(80%_120%_at_100%_0%,hsl(216_100%_62%/0.35),transparent_60%)]",
    muted: "text-foreground/65",
    chip: "border-white/15 text-foreground/80",
    iconBox: "bg-secondary text-secondary-foreground",
    link: "bg-foreground text-background",
    glow: "80 150 255 / 0.2",
  },
];

const ServicesSection = () => {
  const { t, isAr } = useLanguage();
  const Arrow = isAr ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="services" className="bg-cream text-ink pb-20 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader tone="light" label={t("services.label")} title={`${t("services.title1")} ${t("services.title2")}`} />

        <div className="grid md:grid-cols-12 gap-4">
          {SERVICES.map((s, i) => {
            const title = t(`services.${s.key}.title`);
            const deliverables = [1, 2, 3].map((n) => t(`services.${s.key}.d${n}`));
            return (
              <Reveal key={s.key} delay={(i % 2) * 0.08} className={s.span}>
                <TiltCard max={4} glow={s.glow} className={`h-full overflow-hidden rounded-[1.75rem] ${s.card}`}>
                  <article className="relative flex h-full min-h-[380px] flex-col p-7 md:p-9">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`flex w-12 h-12 items-center justify-center rounded-2xl ${s.iconBox}`}>
                        <s.icon size={22} />
                      </span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm ${s.chip}`}>
                        <Clock size={14} />
                        {t(`services.${s.key}.duration`)}
                      </span>
                    </div>

                    <h3 className="mt-8 font-headline text-2xl md:text-3xl font-semibold leading-tight">{title}</h3>
                    <p className={`mt-3 leading-relaxed ${s.muted}`}>{t(`services.${s.key}.problem`)}</p>

                    <ul className="mt-6 space-y-2">
                      {deliverables.map((d) => (
                        <li key={d} className="flex gap-2.5 text-[15px]">
                          <Check size={18} className="mt-0.5 shrink-0 opacity-80" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={whatsappWithText(`${t("services.askMsg")} ${title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-8 inline-flex items-center gap-3 self-start font-semibold"
                    >
                      {t("services.ask")}
                      <span
                        className={`flex w-10 h-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${s.link}`}
                      >
                        <Arrow size={18} />
                      </span>
                    </a>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
