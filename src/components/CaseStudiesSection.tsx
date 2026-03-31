import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Cpu, Layers, LayoutDashboard, Users, BarChart3, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import skyLeadsDashboard from "@/assets/sky-leads-dashboard.png";
import aiSystemDashboard from "@/assets/ai-system-dashboard.png";
import aiContentSystem from "@/assets/ai-content-system.jpg";
import aiTeamOperations from "@/assets/ai-team-operations.jpg";
import aiHiringSystem from "@/assets/ai-hiring-system.jpg";
import aiFinancialSystem from "@/assets/ai-financial-system.jpg";

const CaseStudiesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const cases = [
    {
      tag: t("cases.c1.tag"),
      title: t("cases.c1.title"),
      problem: t("cases.c1.problem"),
      solution: t("cases.c1.solution"),
      icon: Target,
      results: [
        { label: t("cases.c1.r1l"), value: t("cases.c1.r1v") },
        { label: t("cases.c1.r2l"), value: t("cases.c1.r2v") },
        { label: t("cases.c1.r3l"), value: t("cases.c1.r3v") },
        { label: t("cases.c1.r4l"), value: t("cases.c1.r4v") },
      ],
    },
    {
      tag: t("cases.c2.tag"),
      title: t("cases.c2.title"),
      problem: t("cases.c2.problem"),
      solution: t("cases.c2.solution"),
      icon: Cpu,
      results: [
        { label: t("cases.c2.r1l"), value: t("cases.c2.r1v") },
        { label: t("cases.c2.r2l"), value: t("cases.c2.r2v") },
        { label: t("cases.c2.r3l"), value: t("cases.c2.r3v") },
        { label: t("cases.c2.r4l"), value: t("cases.c2.r4v") },
      ],
    },
    {
      tag: t("cases.c3.tag"),
      title: t("cases.c3.title"),
      problem: t("cases.c3.problem"),
      solution: t("cases.c3.solution"),
      icon: Layers,
      results: [
        { label: t("cases.c3.r1l"), value: t("cases.c3.r1v") },
        { label: t("cases.c3.r2l"), value: t("cases.c3.r2v") },
        { label: t("cases.c3.r3l"), value: t("cases.c3.r3v") },
        { label: t("cases.c3.r4l"), value: t("cases.c3.r4v") },
      ],
    },
    {
      tag: t("cases.c5.tag"),
      title: t("cases.c5.title"),
      problem: t("cases.c5.problem"),
      solution: t("cases.c5.solution"),
      icon: LayoutDashboard,
      results: [
        { label: t("cases.c5.r1l"), value: t("cases.c5.r1v") },
        { label: t("cases.c5.r2l"), value: t("cases.c5.r2v") },
        { label: t("cases.c5.r3l"), value: t("cases.c5.r3v") },
        { label: t("cases.c5.r4l"), value: t("cases.c5.r4v") },
      ],
    },
    {
      tag: t("cases.c6.tag"),
      title: t("cases.c6.title"),
      problem: t("cases.c6.problem"),
      solution: t("cases.c6.solution"),
      icon: Users,
      results: [
        { label: t("cases.c6.r1l"), value: t("cases.c6.r1v") },
        { label: t("cases.c6.r2l"), value: t("cases.c6.r2v") },
        { label: t("cases.c6.r3l"), value: t("cases.c6.r3v") },
        { label: t("cases.c6.r4l"), value: t("cases.c6.r4v") },
      ],
    },
    {
      tag: t("cases.c7.tag"),
      title: t("cases.c7.title"),
      problem: t("cases.c7.problem"),
      solution: t("cases.c7.solution"),
      icon: BarChart3,
      results: [
        { label: t("cases.c7.r1l"), value: t("cases.c7.r1v") },
        { label: t("cases.c7.r2l"), value: t("cases.c7.r2v") },
        { label: t("cases.c7.r3l"), value: t("cases.c7.r3v") },
        { label: t("cases.c7.r4l"), value: t("cases.c7.r4v") },
      ],
    },
  ];

  return (
    <section id="case-studies" className="section-gap relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="label-tech text-primary block mb-4"
        >
          {t("cases.label")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-6"
        >
          {t("cases.title1")}{" "}
          <span className="gradient-text italic">{t("cases.title2")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground max-w-xl mb-12 md:mb-16 text-base leading-relaxed"
        >
          {t("cases.subtitle")}
        </motion.p>

        <div className="space-y-20 md:space-y-28">
          {cases.map((cs, i) => (
            <CaseStudyItem key={cs.tag} cs={cs} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="text-muted-foreground mb-6 text-lg">{t("cases.cta")}</p>
          <motion.a
            href="https://wa.me/201148627137"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground hover-glow"
          >
            {t("cases.ctaBtn")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

interface CaseItem {
  tag: string;
  title: string;
  problem: string;
  solution: string;
  icon: React.ElementType;
  results: { label: string; value: string }[];
}

const CaseStudyItem = ({ cs, index }: { cs: CaseItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const reversed = index % 2 !== 0;
  const Icon = cs.icon;
  const caseImages: (string | null)[] = [skyLeadsDashboard, aiSystemDashboard, aiContentSystem, aiTeamOperations, aiHiringSystem, aiFinancialSystem];
  const caseLabels = ["SKY LEADS DASHBOARD", "REAL SYSTEM OUTPUT", "AI SYSTEM FLOW", "INTERNAL OPERATING SYSTEM", "AI HIRING SYSTEM", "FINANCIAL INTELLIGENCE SYSTEM"];
  const caseCaptions = ["Campaign performance overview", "Live dashboard used in production", "AI-powered content operations pipeline", "Live team visibility + AI coordination", "Automated screening + scoring + hiring decisions", "Real-time insights + automated financial decisions"];
  const hasImage = caseImages[index] != null;
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid md:grid-cols-5 gap-8 items-center ${reversed ? "md:direction-rtl" : ""}`}
    >
      <div className={`md:col-span-3 relative overflow-hidden group ${reversed ? "md:order-2" : ""}`}>
        {hasImage ? (
          <div className="relative rounded-sm overflow-hidden border border-border/20">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <img
                src={caseImages[index]!}
                alt={caseLabels[index]}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 label-tech text-[10px] text-primary/80 tracking-widest">
                {caseLabels[index]}
              </span>
              <span className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                {caseCaptions[index]}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative rounded-sm overflow-hidden border border-border/20 glass-panel flex items-center justify-center h-[300px] md:h-[450px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Icon size={80} className="text-primary/20" strokeWidth={1} />
          </div>
        )}
      </div>

      <div className={`md:col-span-2 ${reversed ? "md:order-1" : ""}`}>
        <span className="label-tech text-secondary mb-3 block">{cs.tag}</span>
        <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
          {cs.title}
        </h3>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="label-tech text-primary/80 mb-1 flex items-center gap-1.5">
              <AlertTriangle size={12} />
              {t("cases.problemLabel")}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{cs.problem}</p>
          </div>
          <div>
            <h4 className="label-tech text-primary/80 mb-1 flex items-center gap-1.5">
              <CheckCircle2 size={12} />
              {t("cases.solutionLabel")}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{cs.solution}</p>
          </div>
        </div>

        <div className={`flex gap-4 flex-wrap ${reversed ? "md:justify-end" : ""}`}>
          {cs.results.map((r) => (
            <div key={r.label} className="glass-panel px-5 py-3">
              <span className="label-tech text-[10px] text-muted-foreground">{r.label}</span>
              <div className="font-headline text-lg font-bold text-primary mt-1">{r.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default CaseStudiesSection;
