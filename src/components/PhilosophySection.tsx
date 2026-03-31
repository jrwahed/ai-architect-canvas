import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserPlus,
  Puzzle,
  Shuffle,
  BarChart3,
  Search,
  Workflow,
  Bot,
  Server,
  ArrowRight,
  Zap,
  XCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const chaosItems = [
  { key: "w1", icon: UserPlus },
  { key: "w2", icon: Puzzle },
  { key: "w3", icon: Shuffle },
  { key: "w4", icon: BarChart3 },
];

const systemSteps = [
  { key: "r1", icon: Search },
  { key: "r2", icon: Workflow },
  { key: "r3", icon: Bot },
  { key: "r4", icon: Server },
];

const WrongCard = ({
  item,
  index,
  isInView,
  isAr,
  t,
}: {
  item: (typeof chaosItems)[0];
  index: number;
  isInView: boolean;
  isAr: boolean;
  t: (key: string) => string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={item.key}
      initial={{ opacity: 0, x: isAr ? 30 : -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.4 + index * 0.12, duration: 0.5 }}
      whileHover={{
        x: [0, -4, 4, -2, 0],
        transition: { duration: 0.35, type: "tween" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex items-center gap-4 cursor-default transition-all duration-300"
      style={{
        background: isHovered
          ? "hsl(var(--destructive) / 0.10)"
          : "hsl(var(--destructive) / 0.06)",
        border: "1px solid hsl(var(--destructive) / 0.15)",
        borderInlineStart: isHovered
          ? "3px solid hsl(var(--destructive) / 0.8)"
          : "3px solid hsl(var(--destructive) / 0.5)",
        borderRadius: "12px",
        padding: "16px 20px",
      }}
    >
      {/* Strikethrough line on hover */}
      <motion.div
        className="absolute inset-x-5 top-1/2 h-px pointer-events-none"
        style={{ background: "hsl(var(--destructive) / 0.5)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.25 }}
      />

      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "hsl(var(--destructive) / 0.15)" }}
      >
        <XCircle
          size={18}
          style={{ color: "hsl(var(--destructive) / 0.7)" }}
          strokeWidth={1.5}
        />
      </div>
      <span className="text-muted-foreground text-sm leading-relaxed">
        {t(`philosophy.${item.key}`)}
      </span>
    </motion.div>
  );
};

const RightCard = ({
  step,
  index,
  isInView,
  isAr,
  t,
  isLast,
}: {
  step: (typeof systemSteps)[0];
  index: number;
  isInView: boolean;
  isAr: boolean;
  t: (key: string) => string;
  isLast: boolean;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <motion.div
      key={step.key}
      initial={{ opacity: 0, x: isAr ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.7 + index * 0.12, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      className="flex items-center justify-between gap-4 cursor-default relative overflow-visible"
      style={{
        background: isHovered
          ? "hsl(var(--surface-container) / 0.9)"
          : "hsl(var(--surface-container) / 0.6)",
        border: "1px solid hsl(var(--outline-variant) / 0.12)",
        borderInlineStart: isHovered
          ? "2px solid hsl(var(--primary) / 0.4)"
          : "1px solid hsl(var(--outline-variant) / 0.12)",
        borderRadius: "12px",
        padding: "18px 20px",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered
          ? "transform 0.08s ease, background 0.3s, border 0.3s"
          : "transform 0.5s ease, background 0.3s, border 0.3s",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative z-10 font-headline font-bold text-sm"
          style={{
            background: "hsl(var(--primary) / 0.12)",
            color: "hsl(var(--primary))",
            boxShadow: isHovered
              ? "0 0 20px -4px hsl(var(--primary) / 0.5)"
              : "0 0 12px -4px hsl(var(--primary) / 0.3)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {index + 1}
        </div>
        <span className="font-headline font-semibold text-foreground text-sm leading-relaxed">
          {t(`philosophy.${step.key}`)}
        </span>
      </div>
      <Icon
        size={18}
        className="text-primary/25 transition-colors shrink-0"
        style={{
          color: isHovered
            ? "hsl(var(--primary) / 0.6)"
            : "hsl(var(--primary) / 0.25)",
        }}
        strokeWidth={1.5}
      />
      {!isLast && (
        <div
          className="absolute pointer-events-none"
          style={{
            insetInlineStart: "15px",
            bottom: "-12px",
            width: "1px",
            height: "12px",
            background: "linear-gradient(to bottom, hsl(var(--primary) / 0.2), transparent)",
          }}
        />
      )}
    </motion.div>
  );
};

const PhilosophySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, isAr } = useLanguage();

  return (
    <section className="section-gap relative overflow-hidden" ref={ref}>
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
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{ top: `${15 + i * 14}%`, left: `${10 + i * 15}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="label-tech text-primary block mb-4"
        >
          {t("philosophy.label")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-16 max-w-[600px]"
        >
          {isAr ? "المقاربة الغلط" : "Wrong approach"}{" "}
          <span className="gradient-text italic">
            {isAr ? "vs السيستم الصح" : "vs the right system"}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-stretch">
          {/* ═══ LEFT — CHAOS ═══ */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group/card relative rounded-2xl border border-destructive/25 backdrop-blur-sm p-8 md:p-10 transition-shadow duration-500 hover:shadow-[0_0_40px_-10px_hsl(0_70%_50%/0.15)]"
            style={{
              background:
                "linear-gradient(135deg, hsl(0 70% 40% / 0.08) 0%, transparent 60%)",
            }}
          >
            {/* Red glow */}
            <div className="absolute -inset-3 bg-gradient-to-br from-destructive/15 via-transparent to-destructive/5 blur-3xl rounded-3xl opacity-50 group-hover/card:opacity-80 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 max-w-[420px]">
              <span className="label-tech text-destructive/70 text-[10px] block mb-2 tracking-[0.2em]">
                {isAr ? "الطريقة الغلط" : "THE WRONG WAY"}
              </span>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
                {t("philosophy.wrongTitle")}
              </h3>
              <p className="text-muted-foreground/60 text-sm leading-relaxed mb-8">
                {t("philosophy.wrongSub")}
              </p>

              <div className="space-y-3">
                {chaosItems.map((item, i) => (
                  <WrongCard
                    key={item.key}
                    item={item}
                    index={i}
                    isInView={isInView}
                    isAr={isAr}
                    t={t}
                  />
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? { opacity: [0.5, 1, 0.5] }
                    : {}
                }
                transition={{
                  delay: 1,
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-base mt-8 border-t border-destructive/15 pt-5 italic leading-relaxed"
                style={{ color: "hsl(var(--destructive) / 0.8)" }}
              >
                {t("philosophy.wrongFooter")}
              </motion.p>
            </div>
          </motion.div>

          {/* ═══ CENTER — Transition ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="hidden md:flex flex-col items-center justify-center gap-3 px-3"
          >
            <div className="w-px h-20 bg-gradient-to-b from-destructive/30 to-transparent" />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                boxShadow: [
                  "0 0 15px hsl(var(--primary) / 0.2)",
                  "0 0 30px hsl(var(--primary) / 0.4)",
                  "0 0 15px hsl(var(--primary) / 0.2)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center"
            >
              <Zap size={24} className="text-primary" />
            </motion.div>
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-primary/30" />
          </motion.div>

          {/* Mobile transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex md:hidden items-center justify-center py-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-destructive/30 to-transparent" />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 10px hsl(var(--primary) / 0.2)",
                    "0 0 20px hsl(var(--primary) / 0.4)",
                    "0 0 10px hsl(var(--primary) / 0.2)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center"
              >
                <ArrowRight size={18} className="text-primary" />
              </motion.div>
              <div className="h-px w-10 bg-gradient-to-l from-primary/30 to-transparent" />
            </div>
          </motion.div>

          {/* ═══ RIGHT — SYSTEM ═══ */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group/card relative rounded-2xl border border-primary/30 backdrop-blur-sm p-8 md:p-10 transition-shadow duration-500 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)]"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary) / 0.06) 0%, hsl(var(--secondary) / 0.03) 100%)",
            }}
          >
            {/* Cyan glow */}
            <div className="absolute -inset-3 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 blur-3xl rounded-3xl opacity-50 group-hover/card:opacity-80 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 max-w-[420px]">
              <span className="label-tech text-primary/70 text-[10px] block mb-2 tracking-[0.2em]">
                {isAr ? "الطريقة الصح" : "THE RIGHT WAY"}
              </span>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
                {t("philosophy.rightTitle")}
              </h3>
              <p className="text-muted-foreground/60 text-sm leading-relaxed mb-8">
                {t("philosophy.rightSub")}
              </p>

              <div className="space-y-3">
                {systemSteps.map((step, i) => (
                  <RightCard
                    key={step.key}
                    step={step}
                    index={i}
                    isInView={isInView}
                    isAr={isAr}
                    t={t}
                    isLast={i === systemSteps.length - 1}
                  />
                ))}
              </div>

              {/* Result badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "hsl(var(--primary) / 0.1)",
                  border: "1px solid hsl(var(--primary) / 0.2)",
                  boxShadow: "0 0 20px -8px hsl(var(--primary) / 0.4)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-label text-primary">
                  {t("philosophy.result")}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
