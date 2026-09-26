import { Target, Workflow, Network, LayoutDashboard, Check, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { whatsappWithText } from "@/lib/contact";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";

const SERVICES = [
  { key: "s1", icon: Target },
  { key: "s2", icon: Workflow },
  { key: "s3", icon: Network },
  { key: "s4", icon: LayoutDashboard },
];

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 md:py-28 bg-surface-container-low border-y border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label={t("services.label")}
          title={`${t("services.title1")} ${t("services.title2")}`}
        />

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {SERVICES.map(({ key, icon: Icon }, i) => {
            const title = t(`services.${key}.title`);
            const deliverables = [1, 2, 3].map((n) => t(`services.${key}.d${n}`));
            return (
              <Reveal key={key} delay={(i % 2) * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-surface-container p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex w-10 h-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-headline text-xl font-semibold text-foreground">{title}</h3>
                  </div>

                  <p className="mt-5 text-sm font-medium text-leak">{t("services.problem")}</p>
                  <p className="mt-1.5 text-muted-foreground leading-relaxed">{t(`services.${key}.problem`)}</p>

                  <p className="mt-5 text-sm font-medium text-primary">{t("services.delivers")}</p>
                  <ul className="mt-2 space-y-2">
                    {deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[15px] text-foreground/90">
                        <Check size={18} className="mt-0.5 shrink-0 text-primary" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                      <Clock size={14} />
                      {t("services.duration")}: {t(`services.${key}.duration`)}
                    </span>
                    <a
                      href={whatsappWithText(`${t("services.askMsg")} ${title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
                    >
                      <MessageCircle size={16} />
                      {t("services.ask")}
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
