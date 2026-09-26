import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PlayCircle, GraduationCap, Plug, ArrowLeft, ArrowRight } from "lucide-react";
import portrait from "@/assets/mohamed-portrait.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import { usePointerMotion } from "@/components/motion/usePointerFine";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const WhyMeSection = () => {
  const { t, isAr } = useLanguage();
  const pointer = usePointerMotion();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const mx = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const chipX = useTransform(mx, (v) => v * 30);
  const chipY = useTransform(my, (v) => v * 22);
  const photoX = useTransform(mx, (v) => v * -10);
  const photoY = useTransform(my, (v) => v * -8);

  const points = [
    { icon: PlayCircle, text: t("why.p1") },
    { icon: GraduationCap, text: t("why.p2") },
    { icon: Plug, text: t("why.p3") },
  ];
  const stats = [
    { value: t("why.yearsV"), label: t("why.yearsL") },
    { value: t("proof.2v"), label: t("proof.2l") },
    { value: t("proof.3v"), label: t("proof.3l") },
  ];

  return (
    <section id="about" className="bg-cream text-ink py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:col-span-5">
          <div
            className="relative mx-auto max-w-sm"
            onMouseMove={(e) => {
              if (!pointer) return;
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
            }}
          >
            <div className="overflow-hidden rounded-[2rem] rotate-[-2deg] shadow-[0_40px_80px_-40px_rgba(20,22,26,0.6)]">
              <motion.img
                src={portrait}
                alt={isAr ? "محمد وحيد" : "Mohamed Waheed"}
                loading="lazy"
                width={560}
                height={632}
                className="w-full scale-110 object-cover"
                style={{ x: photoX, y: photoY }}
              />
            </div>
            <motion.div
              style={{ x: chipX, y: chipY }}
              className="absolute -bottom-5 ltr:-left-4 rtl:-right-4 rounded-2xl bg-primary px-5 py-3 text-primary-foreground shadow-xl"
            >
              <p className="font-headline text-2xl font-semibold">{t("why.yearsV")}</p>
              <p className="text-xs opacity-80">{t("why.yearsL")}</p>
            </motion.div>
            <motion.div
              style={{ x: chipY, y: chipX }}
              className="absolute top-6 ltr:-right-5 rtl:-left-5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream shadow-xl"
            >
              BD + Marketing + AI
            </motion.div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeader tone="light" label={t("why.label")} title={t("why.title")} sub={t("why.body")} />
          <ul className="-mt-6 space-y-3">
            {points.map((p) => (
              <li key={p.text} className="flex items-start gap-3">
                <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-xl bg-ink text-cream">
                  <p.icon size={17} />
                </span>
                <span className="pt-1.5 text-ink/85">{p.text}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-3 border-y border-ink/15">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse py-5 ltr:pr-3 rtl:pl-3">
                <dt className="mt-1 text-xs md:text-sm text-ink-muted">{s.label}</dt>
                <dd className="font-headline text-3xl md:text-4xl font-semibold">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Magnetic strength={0.2}>
              <Link to="/cv" className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 ps-6 pe-2 font-semibold text-cream">
                {t("why.cv")}
                <span className="flex w-10 h-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Arrow size={18} />
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
