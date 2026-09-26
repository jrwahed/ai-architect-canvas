import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/home/SectionHeader";
import Reveal from "@/components/home/Reveal";
import Magnetic from "@/components/motion/Magnetic";

const ProcessSection = () => {
  const { t } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);
  // The line fills as the steps scroll past the middle of the screen.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const steps = [1, 2, 3, 4, 5].map((n) => ({
    label: t(`process.s${n}.label`),
    desc: t(`process.s${n}.desc`),
  }));

  return (
    <section id="process" className="bg-background py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader label={t("process.label")} title={t("process.heading")} />
          <Reveal>
            <Magnetic>
              <a
                href="#contact"
                className="-mt-4 inline-flex items-center rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"
              >
                {t("process.cta")}
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <ol ref={listRef} className="lg:col-span-7 relative">
          <div aria-hidden="true" className="absolute top-2 bottom-2 ltr:left-[1.2rem] rtl:right-[1.2rem] w-px bg-border" />
          <motion.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 ltr:left-[1.2rem] rtl:right-[1.2rem] w-px origin-top bg-primary"
            style={{ scaleY: fill }}
          />
          {steps.map((step, i) => (
            <li key={step.label} className="relative flex gap-6 pb-12 last:pb-0">
              <motion.span
                className="relative z-10 flex w-10 h-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm"
                initial={{ backgroundColor: "hsl(222 36% 9%)", borderColor: "hsl(222 24% 17%)", color: "hsl(220 14% 70%)" }}
                whileInView={{ backgroundColor: "hsl(20 100% 56%)", borderColor: "hsl(20 100% 56%)", color: "hsl(20 80% 7%)" }}
                viewport={{ once: true, amount: 1, margin: "0px 0px -35% 0px" }}
                transition={{ duration: 0.4 }}
              >
                <span dir="ltr">{String(i + 1).padStart(2, "0")}</span>
              </motion.span>
              <Reveal className="pt-1.5">
                <h3 className="font-headline text-xl md:text-2xl font-semibold text-foreground">{step.label}</h3>
                <p className="mt-2 max-w-md text-muted-foreground leading-relaxed">{step.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
