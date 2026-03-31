import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, GitBranch, BarChart3, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const pillars = [
    { label: t("about.pillar1"), icon: Zap },
    { label: t("about.pillar2"), icon: GitBranch },
    { label: t("about.pillar3"), icon: BarChart3 },
  ];

  const stats = [
    { value: t("about.stat1v"), label: t("about.stat1l") },
    { value: t("about.stat2v"), label: t("about.stat2l") },
    { value: t("about.stat3v"), label: t("about.stat3l") },
    { value: t("about.stat4v"), label: t("about.stat4l") },
  ];

  return (
    <section id="about" className="section-gap relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="label-tech text-primary">{t("about.label")}</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-headline text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight"
            >
              {t("about.title1")}
              <br />
              <span className="gradient-text">{t("about.title2")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 max-w-xl text-muted-foreground leading-relaxed md:leading-loose text-base"
            >
              {t("about.p1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 max-w-xl text-foreground leading-relaxed md:leading-loose text-base font-medium"
            >
              {t("about.p2")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 space-y-3"
            >
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <p.icon size={16} className="text-primary shrink-0" />
                  <span className="label-tech text-foreground/80">{p.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-panel p-8 md:p-10"
            >
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="font-headline text-3xl md:text-4xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="label-tech mt-2 text-primary/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 h-px neon-line opacity-30" />

              <div className="mt-8 flex items-center gap-3">
                <span className="status-dot" />
                <span className="label-tech">{t("about.accepting")}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 25px -5px hsl(184 100% 68% / 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-6 w-full py-3 font-label text-xs uppercase tracking-[0.15em] font-semibold ghost-border text-foreground hover:bg-surface-bright/50 transition-colors"
              >
                {t("about.cta")}
              </motion.button>

              <div className="mt-4 flex items-center justify-center">
                <a
                  href="https://www.linkedin.com/in/moohamedwaheed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors duration-200 text-xs tracking-wide"
                >
                  <Linkedin size={14} className="opacity-70" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
