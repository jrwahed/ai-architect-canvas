import { Hourglass, FileSpreadsheet, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const LeaksSection = () => {
  const { t } = useLanguage();
  const leaks = [
    { icon: Hourglass, title: t("leaks.1.t"), desc: t("leaks.1.d") },
    { icon: FileSpreadsheet, title: t("leaks.2.t"), desc: t("leaks.2.d") },
    { icon: EyeOff, title: t("leaks.3.t"), desc: t("leaks.3.d") },
  ];

  return (
    <section id="problem" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={t("leaks.label")} title={t("leaks.title")} />

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {leaks.map((leak, i) => (
            <Reveal key={leak.title} delay={i * 0.08}>
              <article className="h-full rounded-2xl border border-border bg-surface-container p-6">
                <span className="flex w-10 h-10 items-center justify-center rounded-xl bg-leak/10 text-leak">
                  <leak.icon size={20} />
                </span>
                <h3 className="mt-5 font-headline text-xl font-semibold text-foreground">{leak.title}</h3>
                <p className="mt-2.5 text-muted-foreground leading-relaxed">{leak.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-lg font-medium text-foreground">{t("leaks.footer")}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default LeaksSection;
