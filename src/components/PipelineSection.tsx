import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";

const ProcessSection = () => {
  const { t } = useLanguage();
  const steps = [1, 2, 3, 4, 5].map((n) => ({
    label: t(`process.s${n}.label`),
    desc: t(`process.s${n}.desc`),
  }));

  return (
    <section id="process" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={t("process.label")} title={t("process.heading")} />

        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.label} delay={i * 0.06}>
              <li className="h-full list-none rounded-2xl border border-border bg-surface-container p-5">
                <span className="font-headline tabular-nums text-sm font-medium text-primary" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-semibold text-foreground">{step.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {t("process.cta")}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default ProcessSection;
