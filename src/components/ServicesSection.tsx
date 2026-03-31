import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Workflow, Link2, BarChart3, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceIcons = [Target, Workflow, Link2, BarChart3];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
    {
      id: "01", icon: serviceIcons[0],
      title: t("services.s1.title"), titleEn: t("services.s1.titleEn"),
      problem: t("services.s1.problem"), solution: t("services.s1.solution"),
      deliverables: [t("services.s1.d1"), t("services.s1.d2"), t("services.s1.d3"), t("services.s1.d4"), t("services.s1.d5")],
      duration: t("services.s1.duration"),
    },
    {
      id: "02", icon: serviceIcons[1],
      title: t("services.s2.title"), titleEn: t("services.s2.titleEn"),
      problem: t("services.s2.problem"), solution: t("services.s2.solution"),
      deliverables: [t("services.s2.d1"), t("services.s2.d2"), t("services.s2.d3"), t("services.s2.d4"), t("services.s2.d5")],
      duration: t("services.s2.duration"),
    },
    {
      id: "03", icon: serviceIcons[2],
      title: t("services.s3.title"), titleEn: t("services.s3.titleEn"),
      problem: t("services.s3.problem"), solution: t("services.s3.solution"),
      deliverables: [t("services.s3.d1"), t("services.s3.d2"), t("services.s3.d3"), t("services.s3.d4"), t("services.s3.d5")],
      duration: t("services.s3.duration"),
    },
    {
      id: "04", icon: serviceIcons[3],
      title: t("services.s4.title"), titleEn: t("services.s4.titleEn"),
      problem: t("services.s4.problem"), solution: t("services.s4.solution"),
      deliverables: [t("services.s4.d1"), t("services.s4.d2"), t("services.s4.d3"), t("services.s4.d4"), t("services.s4.d5")],
      duration: t("services.s4.duration"),
    },
  ];

  return (
    <section id="services" className="section-gap relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="label-tech text-primary block mb-4"
        >
          {t("services.label")}
        </motion.span>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-[0.95]"
          >
            {t("services.title1")}
            <br />
            <span className="gradient-text">{t("services.title2")}</span>
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="label-tech text-muted-foreground max-w-xs"
          >
            {t("services.subtitle")}
          </motion.span>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group glass-panel rounded-2xl p-5 md:p-8 transition-all duration-300 hover:border-l-[3px] hover:border-l-primary/50"
                style={{ borderLeft: "3px solid transparent" }}
              >
                {/* Header */}
                <div className="flex items-start gap-3 md:gap-4 mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="label-tech text-muted-foreground/50 text-[10px]">{service.id}</span>
                    </div>
                    <h3 className="font-headline text-lg md:text-xl font-bold text-foreground leading-tight">
                      {service.title}
                    </h3>
                    <p className="label-tech text-[10px] text-primary/60 mt-0.5">{service.titleEn}</p>
                  </div>
                </div>

                {/* Problem + Solution row */}
                <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-6">
                  {/* Problem */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "hsl(var(--destructive) / 0.05)",
                      border: "1px solid hsl(var(--destructive) / 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={14} className="text-destructive/70" />
                      <span className="label-tech text-[10px] text-destructive/80">{t("services.problem")}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.problem}</p>
                  </div>

                  {/* Solution */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "hsl(var(--primary) / 0.05)",
                      border: "1px solid hsl(var(--primary) / 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 size={14} className="text-primary/70" />
                      <span className="label-tech text-[10px] text-primary/80">{t("services.solution")}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.solution}</p>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="mb-6">
                  <span className="label-tech text-[10px] text-muted-foreground/60 block mb-3">{t("services.delivers")}</span>
                  <div className="grid md:grid-cols-2 gap-2">
                    {service.deliverables.map((d, di) => (
                      <div key={di} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-primary/60 mt-0.5 shrink-0" strokeWidth={1.5} />
                        <span className="text-sm text-muted-foreground">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: duration + price + CTA */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/10">
                  {/* Duration chip */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground"
                    style={{ background: "hsl(var(--surface-container))" }}
                  >
                    <Clock size={12} />
                    <span>{service.duration}</span>
                  </div>


                  <div className="flex-1" />

                  {/* CTA */}
                  <a
                    href="https://wa.me/201148627137"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors hover-glow rounded-lg px-3 py-1.5"
                  >
                    Book a Call →
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
