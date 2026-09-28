import { MessageCircle, PhoneCall, Search, FileCheck2, ShieldCheck, CalendarRange, UserRound } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { whatsappWithText } from "@/lib/contact";
import Magnetic from "@/components/motion/Magnetic";
import TiltCard from "@/components/motion/TiltCard";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

// The free diagnosis: the first step before any system is built.
const OfferSection = () => {
  const { t } = useLanguage();
  const steps = [
    { icon: PhoneCall, n: 1 },
    { icon: Search, n: 2 },
    { icon: FileCheck2, n: 3 },
  ].map((s) => ({ ...s, title: t(`offer.s${s.n}.t`), desc: t(`offer.s${s.n}.d`) }));
  const facts = [
    { icon: ShieldCheck, text: t("offer.promise") },
    { icon: CalendarRange, text: t("offer.timeline") },
    { icon: UserRound, text: t("offer.direct") },
  ];

  return (
    <section id="audit" className="bg-background pb-20 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={t("offer.label")} title={t("offer.title")} sub={t("offer.sub")} />

        <div className="grid lg:grid-cols-12 gap-4">
          <ol className="lg:col-span-7 grid gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="flex gap-5 rounded-[1.5rem] border border-border bg-surface-container p-6 md:p-7">
                  <span className="flex w-12 h-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <s.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-headline text-xl md:text-2xl font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="lg:col-span-5" delay={0.12}>
            <TiltCard max={4} glow="255 255 255 / 0.22" className="h-full rounded-[1.75rem] bg-primary text-primary-foreground">
              <div className="flex h-full flex-col p-7 md:p-9">
                <p className="font-headline text-5xl md:text-6xl font-semibold">{t("offer.free")}</p>
                <p className="mt-2 text-primary-foreground/75">{t("offer.freeSub")}</p>
                <ul className="mt-8 space-y-4">
                  {facts.map((f) => (
                    <li key={f.text} className="flex gap-3">
                      <f.icon size={20} className="mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{f.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <Magnetic>
                    <a
                      href={whatsappWithText(t("offer.msg"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full bg-primary-foreground py-2 ps-6 pe-2 font-semibold text-primary"
                    >
                      {t("offer.cta")}
                      <span className="flex w-10 h-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-[-12deg]">
                        <MessageCircle size={18} />
                      </span>
                    </a>
                  </Magnetic>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
