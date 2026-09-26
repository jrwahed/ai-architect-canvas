import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const LeaksSection = () => {
  const { t } = useLanguage();
  const leaks = [1, 2, 3].map((n) => ({ title: t(`leaks.${n}.t`), desc: t(`leaks.${n}.d`) }));

  return (
    <section id="problem" className="bg-cream text-ink rounded-t-[2rem] md:rounded-t-[2.5rem] py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader tone="light" label={t("leaks.label")} title={t("leaks.title")} />

        <div role="list" className="border-t border-ink/15">
          {leaks.map((leak, i) => (
            <Reveal key={leak.title} delay={i * 0.06}>
              <div role="listitem" className="group relative grid gap-3 md:grid-cols-12 md:gap-8 border-b border-ink/15 py-8 md:py-10">
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-1px] ltr:left-0 rtl:right-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full"
                />
                <span className="md:col-span-2 font-mono text-sm text-ink/45" dir="ltr">
                  0{i + 1}
                </span>
                <h3 className="md:col-span-5 font-headline text-2xl md:text-4xl font-semibold leading-tight transition-colors duration-300 group-hover:text-primary">
                  {leak.title}
                </h3>
                <p className="md:col-span-5 text-lg text-ink-muted leading-relaxed">{leak.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-3xl font-headline text-2xl md:text-3xl font-medium leading-snug">{t("leaks.footer")}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default LeaksSection;
