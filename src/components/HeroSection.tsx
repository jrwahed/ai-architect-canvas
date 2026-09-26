import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle, Megaphone, Sparkles, UserCheck, Timer } from "lucide-react";
import heroPhoto from "@/assets/mohamed-hero.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import { WHATSAPP_URL } from "@/lib/contact";
import AnimatedWords from "@/components/motion/AnimatedWords";
import Magnetic from "@/components/motion/Magnetic";
import { usePointerMotion } from "@/components/motion/usePointerFine";

const glass = "rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]";

const HeroSection = () => {
  const { t, isAr } = useLanguage();
  const reduce = useReducedMotion();
  const pointer = usePointerMotion();

  // Cursor position over the hero, -0.5..0.5 on each axis; every layer moves by a different amount.
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const spotX = useMotionValue(70);
  const spotY = useMotionValue(40);
  const photoX = useTransform(mx, (v) => v * -28);
  const photoY = useTransform(my, (v) => v * -18);
  const nearX = useTransform(mx, (v) => v * 46);
  const nearY = useTransform(my, (v) => v * 30);
  const farX = useTransform(mx, (v) => v * 22);
  const farY = useTransform(my, (v) => v * 16);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}% ${spotY}%, hsl(20 100% 56% / 0.16), transparent 65%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pointer) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
    spotX.set(px * 100);
    spotY.set(py * 100);
  };

  const flow = [
    { icon: Megaphone, text: t("flow.s1") },
    { icon: Sparkles, text: t("flow.s2") },
    { icon: UserCheck, text: t("flow.s3") },
  ];
  const chips = [1, 2, 3, 4].map((n) => t(`chips.${n}`));
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <section id="hero" className="bg-background px-2.5 pt-[4.5rem] pb-3 md:px-4 md:pt-20 md:pb-4">
      <div
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] bg-surface-container-low min-h-[calc(100svh-5.5rem)] md:min-h-0 md:h-[calc(100vh-6.5rem)] md:max-h-[880px] md:min-h-[620px]"
      >
        {/* Photo: mirrored in Arabic so the face stays opposite the text */}
        <div className="absolute inset-0 rtl:-scale-x-100">
          <motion.img
            src={heroPhoto}
            alt=""
            width={1448}
            height={1086}
            fetchPriority="high"
            className="absolute -inset-[4%] w-[108%] h-[60%] md:h-[108%] max-w-none object-cover object-[62%_15%] md:object-[60%_35%]"
            style={{ x: photoX, y: photoY }}
            initial={reduce ? false : { scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="absolute inset-x-0 top-[28%] h-[30%] md:hidden bg-gradient-to-t from-surface-container-low to-transparent" />
        <div className="absolute inset-0 hidden md:block ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-background via-background/70 to-transparent" />
        {pointer && <motion.div aria-hidden="true" className="absolute inset-0 mix-blend-screen" style={{ background: spotlight }} />}

        {/* Floating cards on the photo side */}
        <motion.div
          className="hidden md:block absolute top-28 ltr:right-10 rtl:left-10 z-10"
          style={{ x: nearX, y: nearY }}
        >
          <motion.div {...enter(0.9)} className={`${glass} px-4 py-3 md:px-5 md:py-4`}>
            <p className="font-headline text-2xl md:text-3xl font-semibold text-white">{t("proof.1v")}</p>
            <p className="mt-0.5 max-w-[11rem] text-xs md:text-sm text-white/70">{t("proof.1l")}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:block absolute top-[46%] ltr:right-10 rtl:left-10 z-10"
          style={{ x: farX, y: farY }}
        >
          <motion.div {...enter(1.05)} className={`${glass} p-4 w-[17rem]`}>
            <p className="text-sm text-white/70">{t("chips.title")}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/90">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:block absolute bottom-10 ltr:right-10 rtl:left-10 z-10"
          style={{ x: nearX, y: nearY }}
        >
          <motion.div {...enter(1.2)} className={`${glass} p-4 w-[19rem]`}>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gain opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-gain" />
                </span>
                {t("flow.title")}
              </p>
              <span className="text-[11px] text-white/60">{t("flow.example")}</span>
            </div>
            <ol className="mt-3 space-y-1.5">
              {flow.map((step, i) => (
                <motion.li
                  key={step.text}
                  initial={reduce ? false : { opacity: 0, x: isAr ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.3, duration: 0.4 }}
                  className="flex items-center gap-2.5 rounded-lg bg-white/5 px-2.5 py-2 text-[13px] text-white/90"
                >
                  <step.icon size={15} className="shrink-0 text-primary" />
                  {step.text}
                </motion.li>
              ))}
            </ol>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-gain/10 px-2.5 py-2 text-[13px]">
              <span className="flex items-center gap-2 text-white/90">
                <Timer size={15} className="text-gain" />
                {t("flow.s4")}
              </span>
              <span className="font-semibold text-gain" dir="auto">
                {t("flow.s4v")}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <div className="relative z-20 flex h-full min-h-[inherit] flex-col justify-end md:justify-center px-5 pb-8 pt-[44svh] md:px-14 md:py-14 lg:px-16">
          <div className="max-w-[40rem]">
            <motion.p
              {...enter(0.2)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/85 backdrop-blur"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t("hero.eyebrow")}
            </motion.p>

            <h1 className="mt-5 font-headline text-[2.25rem] leading-[1.1] sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white">
              <AnimatedWords text={`${t("hero.line1")} ${t("hero.line2")}`} delay={0.3} />{" "}
              <AnimatedWords text={t("hero.line3")} delay={0.55} className="text-primary" />
            </h1>

            <motion.p {...enter(0.8)} className="mt-6 max-w-lg text-base md:text-lg text-white/75 leading-relaxed whitespace-pre-line">
              {t("hero.subtitle")}
            </motion.p>

            <motion.div {...enter(0.95)} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary py-2 ps-6 pe-2 font-semibold text-primary-foreground"
                >
                  {t("hero.cta1")}
                  <span className="flex w-10 h-10 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover:rotate-[-12deg]">
                    <MessageCircle size={18} />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 py-2 ps-6 pe-2 font-semibold text-white backdrop-blur"
                >
                  {t("hero.cta2")}
                  <span className="flex w-10 h-10 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0.5">
                    <ArrowDown size={18} />
                  </span>
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
