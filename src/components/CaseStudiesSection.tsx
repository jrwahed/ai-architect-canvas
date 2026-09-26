import { useLanguage } from "@/contexts/LanguageContext";
import skyLeadsDashboard from "@/assets/sky-leads-dashboard.png";
import aiSystemDashboard from "@/assets/ai-system-dashboard.png";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";

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
    <section id="work" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={t("work.label")} title={t("work.title")} sub={t("work.sub")} />

        <div className="space-y-5">
          {FEATURED.map(({ key, image, results }, i) => (
            <Reveal key={key}>
              <article className="grid lg:grid-cols-2 gap-6 lg:gap-10 rounded-2xl border border-border bg-surface-container p-5 md:p-8">
                <figure className={i % 2 === 1 ? "lg:order-2" : undefined}>
                  <img
                    src={image}
                    alt={t(`cases.${key}.title`)}
                    loading="lazy"
                    className="w-full rounded-xl border border-border bg-surface-container-low"
                  />
                  <figcaption className="mt-2 text-sm text-muted-foreground">{t("work.shot")}</figcaption>
                </figure>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {i === 0 && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {t("work.featured")}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">{t(`cases.${key}.tag`)}</span>
                  </div>
                  <h3 className="mt-3 font-headline text-2xl md:text-[1.7rem] font-semibold leading-snug text-foreground text-balance">
                    {t(`cases.${key}.title`)}
                  </h3>

                  <p className="mt-5 text-sm font-medium text-leak">{t("work.before")}</p>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{t(`cases.${key}.problem`)}</p>

                  <p className="mt-4 text-sm font-medium text-primary">{t("work.built")}</p>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{t(`cases.${key}.solution`)}</p>

                  <dl className="mt-6 grid grid-cols-3 gap-3">
                    {results.map((r) => {
                      const res = result(key, r);
                      return (
                        <div key={r} className="flex flex-col-reverse rounded-xl bg-surface-container-high px-3 py-3">
                          <dt className="mt-1 text-xs text-muted-foreground">{res.label}</dt>
                          <dd className="font-headline tabular-nums text-xl font-medium text-gain">
                            <span className="inline-block" dir="auto">{res.value}</span>
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

        <h3 className="mt-14 mb-5 font-headline text-xl font-semibold text-foreground">{t("work.more")}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPACT.map(({ key, results }, i) => (
            <Reveal key={key} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface-container p-5">
                <p className="text-sm text-muted-foreground">{t(`cases.${key}.tag`)}</p>
                <h4 className="mt-2 font-semibold leading-snug text-foreground">{t(`cases.${key}.title`)}</h4>
                <dl className="mt-auto pt-5 grid grid-cols-2 gap-3">
                  {results.map((r) => {
                    const res = result(key, r);
                    return (
                      <div key={r} className="flex flex-col-reverse">
                        <dt className="text-xs text-muted-foreground">{res.label}</dt>
                        <dd className="font-headline tabular-nums text-lg font-medium text-gain">
                          <span className="inline-block" dir="auto">{res.value}</span>
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
