import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUpLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES, SERVICE_GROUPS, ServiceGroup } from "@/data/services";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";
import TiltCard from "@/components/motion/TiltCard";

// Bento layout: one card per group, each with its own surface; every service links to its own page.
const GROUPS: {
  key: ServiceGroup;
  span: string;
  card: string;
  muted: string;
  row: string;
  iconBox: string;
  glow: string;
}[] = [
  {
    key: "sales",
    span: "md:col-span-7",
    card: "bg-ink text-cream",
    muted: "text-cream/60",
    row: "border-cream/10 hover:bg-cream/[0.06]",
    iconBox: "bg-primary text-primary-foreground",
    glow: "255 106 31 / 0.18",
  },
  {
    key: "strategy",
    span: "md:col-span-5",
    card: "bg-primary text-primary-foreground",
    muted: "text-primary-foreground/70",
    row: "border-primary-foreground/15 hover:bg-primary-foreground/[0.08]",
    iconBox: "bg-primary-foreground text-primary",
    glow: "255 255 255 / 0.22",
  },
  {
    key: "data",
    span: "md:col-span-5",
    card: "bg-white text-ink border border-ink/10",
    muted: "text-ink-muted",
    row: "border-ink/10 hover:bg-ink/[0.04]",
    iconBox: "bg-ink text-cream",
    glow: "255 106 31 / 0.10",
  },
  {
    key: "ops",
    span: "md:col-span-7",
    card: "bg-background text-foreground bg-[radial-gradient(80%_120%_at_100%_0%,hsl(216_100%_62%/0.3),transparent_60%)]",
    muted: "text-foreground/60",
    row: "border-white/10 hover:bg-white/[0.05]",
    iconBox: "bg-secondary text-secondary-foreground",
    glow: "80 150 255 / 0.2",
  },
];

const ServicesSection = () => {
  const { t, lang, isAr } = useLanguage();
  const Arrow = isAr ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="services" className="bg-cream text-ink pb-20 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader tone="light" label={t("services.label")} title={`${t("services.title1")} ${t("services.title2")}`} sub={t("services.sub")} />

        <div className="grid md:grid-cols-12 gap-4">
          {GROUPS.map((g, i) => {
            const items = SERVICES.filter((s) => s.group === g.key);
            return (
              <Reveal key={g.key} delay={(i % 2) * 0.08} className={g.span}>
                <TiltCard max={3} glow={g.glow} className={`h-full overflow-hidden rounded-[1.75rem] ${g.card}`}>
                  <div className="flex h-full flex-col p-6 md:p-8">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-headline text-2xl md:text-3xl font-semibold leading-tight">{SERVICE_GROUPS[g.key][lang]}</h3>
                      <span className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-sm ${g.row}`}>
                        {items.length.toLocaleString(isAr ? "ar-EG" : "en")} {t("services.count")}
                      </span>
                    </div>

                    <ul className="mt-6 flex flex-1 flex-col">
                      {items.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services/${s.slug}`}
                            className={`group flex items-start gap-4 border-t py-4 -mx-3 px-3 rounded-xl transition-colors ${g.row}`}
                          >
                            <span className={`flex w-10 h-10 shrink-0 items-center justify-center rounded-xl ${g.iconBox}`}>
                              <s.icon size={18} />
                            </span>
                            <span className="flex-1">
                              <span className="block font-semibold leading-snug">{s.title[lang]}</span>
                              <span className={`mt-1 block text-sm leading-relaxed ${g.muted}`}>{s.short[lang]}</span>
                            </span>
                            <Arrow size={18} className="mt-1 shrink-0 opacity-60 transition-transform duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
