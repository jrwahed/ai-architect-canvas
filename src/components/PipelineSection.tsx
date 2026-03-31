import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Ear, Search, PenTool, Hammer, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const stepIcons = [Ear, Search, PenTool, Hammer, Rocket];

const ProcessSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const { t } = useLanguage();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const steps = [
    { id: 1, label: t("process.s1.label"), description: t("process.s1.desc") },
    { id: 2, label: t("process.s2.label"), description: t("process.s2.desc") },
    { id: 3, label: t("process.s3.label"), description: t("process.s3.desc") },
    { id: 4, label: t("process.s4.label"), description: t("process.s4.desc") },
    { id: 5, label: t("process.s5.label"), description: t("process.s5.desc") },
  ];

  const focusedStep = hoveredStep ?? activeStep;

  // Progress line fill percentage
  const lineProgress =
    focusedStep !== null ? ((focusedStep + 1) / steps.length) * 100 : 0;

  useEffect(() => {
    if (!isInView) return;
    // Auto-cycle only when nothing is hovered or clicked
    if (activeStep !== null || hoveredStep !== null) return;
    const timer = setInterval(() => {
      setActiveStep(null);
    }, 4000);
    return () => clearInterval(timer);
  }, [isInView, activeStep, hoveredStep]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.02);
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.02);
    },
    [mouseX, mouseY]
  );

  const parallaxX = useTransform(mouseX, (v) => v);
  const parallaxY = useTransform(mouseY, (v) => v);

  return (
    <section
      id="process"
      className="section-gap relative overflow-hidden"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/15"
          style={{
            top: `${10 + (i * 11) % 80}%`,
            left: `${5 + (i * 13) % 90}%`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="label-tech text-primary block mb-4"
        >
          {t("process.label")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-6"
        >
          {t("process.title1")}{" "}
          <span className="gradient-text">{t("process.title2")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground max-w-xl mb-16 text-base leading-relaxed"
        >
          {t("process.subtitle")}
        </motion.p>

        {/* ═══ DESKTOP TIMELINE ═══ */}
        <motion.div
          className="hidden md:block"
          style={{ x: parallaxX, y: parallaxY }}
        >
          {/* Progress line */}
          <div className="relative mx-auto mb-0" style={{ maxWidth: "90%" }}>
            <div className="absolute top-7 left-[10%] right-[10%] h-px bg-border/20" />
            <motion.div
              className="absolute top-7 left-[10%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--secondary)), hsl(var(--primary)))",
                boxShadow: "0 0 12px hsl(var(--primary) / 0.4)",
              }}
              animate={{ width: `${lineProgress * 0.8}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              const isFocused = focusedStep === i;
              const isDimmed = focusedStep !== null && !isFocused;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                  onHoverStart={() => setHoveredStep(i)}
                  onHoverEnd={() => setHoveredStep(null)}
                  onClick={() =>
                    setActiveStep(activeStep === i ? null : i)
                  }
                  whileHover={{ scale: 1.05 }}
                  className="relative cursor-pointer flex flex-col items-center text-center"
                >
                  {/* Number box */}
                  <motion.div
                    animate={{
                      boxShadow: isFocused
                        ? "0 0 30px hsl(var(--primary) / 0.4)"
                        : "0 0 0px transparent",
                      borderColor: isFocused
                        ? "hsl(var(--primary) / 0.5)"
                        : "hsl(var(--border) / 0.15)",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-14 h-14 rounded-xl backdrop-blur-sm flex items-center justify-center mb-4 transition-all duration-300 ${
                      isFocused
                        ? "bg-primary/15 border border-primary/40"
                        : "bg-surface-bright/30 border border-border/15"
                    }`}
                  >
                    <motion.span
                      animate={{ opacity: isDimmed ? 0.4 : 1 }}
                      className={`font-headline text-lg font-bold transition-colors duration-300 ${
                        isFocused ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {String(step.id).padStart(2, "0")}
                    </motion.span>
                  </motion.div>

                  {/* Active ring */}
                  {isFocused && (
                    <motion.div
                      layoutId="step-ring"
                      className="absolute top-0 w-14 h-14 rounded-xl border border-primary/30"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={{ opacity: isDimmed ? 0.3 : 0.7 }}
                    className="mb-2"
                  >
                    <Icon
                      size={16}
                      className={`transition-colors duration-300 ${
                        isFocused
                          ? "text-primary"
                          : "text-muted-foreground/50"
                      }`}
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    animate={{ opacity: isDimmed ? 0.4 : 1 }}
                    className={`font-headline text-sm font-bold mb-2 transition-colors duration-300 ${
                      isFocused ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </motion.h3>

                  {/* Description — appears on hover/active */}
                  <AnimatePresence>
                    {isFocused && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="text-muted-foreground text-xs leading-relaxed max-w-[180px]"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Glow behind focused step */}
                  {isFocused && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -inset-4 bg-primary/5 blur-2xl rounded-3xl pointer-events-none -z-10"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ MOBILE VERTICAL TIMELINE ═══ */}
        <div className="md:hidden relative">

          <div className="space-y-3">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              const isActive = activeStep === i;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => setActiveStep(isActive ? null : i)}
                  whileTap={{ scale: 1.02 }}
                  className={`relative flex gap-4 cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                    isActive
                      ? "bg-primary/[0.06] border border-primary/25 shadow-[0_0_15px_-5px_hsl(var(--primary)/0.15)]"
                      : "bg-surface-bright/[0.03] border border-border/10"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-surface-bright/30 border border-border/10"
                    }`}
                  >
                    <span
                      className={`font-headline text-sm font-bold transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {String(step.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        size={14}
                        className={`shrink-0 transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-muted-foreground/50"
                        }`}
                        strokeWidth={1.5}
                      />
                      <h3
                        className={`font-headline text-sm font-bold transition-colors duration-300 ${
                          isActive ? "text-foreground" : "text-foreground/80"
                        }`}
                      >
                        {step.label}
                      </h3>
                    </div>

                    <p className="text-muted-foreground/70 text-xs leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="https://wa.me/201148627137"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px -5px hsl(var(--primary) / 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                "0 0 15px -5px hsl(var(--primary) / 0.2)",
                "0 0 25px -5px hsl(var(--primary) / 0.4)",
                "0 0 15px -5px hsl(var(--primary) / 0.2)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="inline-block px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground hover-glow"
          >
            {t("process.cta")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
