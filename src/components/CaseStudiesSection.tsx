import { useLanguage } from "@/contexts/LanguageContext";
import skyLeadsDashboard from "@/assets/sky-leads-dashboard.png";
import aiSystemDashboard from "@/assets/ai-system-dashboard.png";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import CountUp from "@/components/motion/CountUp";

// Cases shown with a real screenshot, then the rest as compact cards.
const FEATURED = [
  { key: "c1", image: skyLeadsDashboard, results: ["r1", "r2", "r4"] },
  { key: "c2", image: aiSystemDashboard, results: ["r1", "r2", "r4"] },
];
const COMPACT = [
  { key: "c3", results: ["r1", "r3"] },
  { key: "c5", results: ["r1", "r2"] },
  { key: "c6", results: ["r1", "r2"] },
  { key: "c7", results: ["r2", "r1"] },
];

const CaseStudiesSection = () => {
  const { t } = useLanguage();
  const result = (key: string, r: string) => ({ label: t(`cases.${key}.${r}l`), value: t(`cases.${key}.${r}v`) });

  return (
    <section id="work" className="bg-background py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={t("work.label")} title={t("work.title")} sub={t("work.sub")} />

        <div className="space-y-6 md:space-y-8">
          {FEATURED.map(({ key, image, results }, i) => (
            <Reveal key={key}>
              <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-[2rem] border border-border bg-surface-container p-5 md:p-10">
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <TiltCard max={5} glow="255 106 31 / 0.14" className="rounded-2xl">
                    <img
                      src={image}
                      alt={t(`cases.${key}.title`)}
                      loading="lazy"
                      className="w-full rounded-2xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
                    />
                  </TiltCard>
                  <p className="mt-3 text-sm text-muted-foreground">{t("work.shot")}</p>
                </div>

                <div className="lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {i === 0 && (
                      <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                        {t("work.featured")}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">{t(`cases.${key}.tag`)}</span>
                  </div>
                  <h3 className="mt-4 font-headline text-2xl md:text-3xl font-semibold leading-tight text-foreground text-balance">
                    {t(`cases.${key}.title`)}
                  </h3>

                  <p className="mt-6 text-sm font-medium text-leak">{t("work.before")}</p>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{t(`cases.${key}.problem`)}</p>

                  <p className="mt-4 text-sm font-medium text-primary">{t("work.built")}</p>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{t(`cases.${key}.solution`)}</p>

                  <dl className="mt-7 grid grid-cols-3 gap-2.5">
                    {results.map((r) => {
                      const res = result(key, r);
                      return (
                        <div key={r} className="flex flex-col-reverse rounded-2xl border border-border bg-background/60 p-3">
                          <dt className="mt-1 text-xs text-muted-foreground">{res.label}</dt>
                          <dd className="font-headline text-2xl font-semibold text-gain">
                            <CountUp value={res.value} />
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-16 mb-6 font-headline text-2xl font-semibold text-foreground">{t("work.more")}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPACT.map(({ key, results }, i) => (
            <Reveal key={key} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-border bg-surface-container p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50">
                <p className="text-sm text-muted-foreground">{t(`cases.${key}.tag`)}</p>
                <h4 className="mt-2 font-semibold leading-snug text-foreground">{t(`cases.${key}.title`)}</h4>
                <dl className="mt-auto pt-6 grid grid-cols-2 gap-3">
                  {results.map((r) => {
                    const res = result(key, r);
                    return (
                      <div key={r} className="flex flex-col-reverse">
                        <dt className="text-xs text-muted-foreground">{res.label}</dt>
                        <dd className="font-headline text-xl font-semibold text-gain">
                          <CountUp value={res.value} />
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
