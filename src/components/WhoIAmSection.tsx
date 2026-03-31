import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Megaphone, Zap } from "lucide-react";

const WhoIAmSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -14;
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x, y });
    setGlowPos({ x: glowX, y: glowY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  const bdItems = [
    "Pipeline & Lead Generation",
    "Market & Competitor Analysis",
    "Account Management",
    "GTM Strategy & New Markets",
  ];
  const mktItems = [
    "Paid Ads Management",
    "Content Strategy",
    "Brand Positioning",
    "Marketing Automation & CRM",
    "Data Analysis & Reporting",
  ];
  const chips = ["5+ Years Experience", "BD + Marketing + AI", "Egypt & Gulf"];
  const headlineLines = [
    { text: "Business Developer.", gradient: false },
    { text: "Growth Marketer.", gradient: false },
    { text: "AI Systems Builder.", gradient: true },
  ];

  return (
    <section id="who-i-am" className="py-24 md:py-32 max-w-7xl mx-auto px-4 md:px-12" ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
        {/* ── Photo Side ── */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative rounded-2xl overflow-hidden h-[320px] md:h-[500px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`,
                transition: tilt.x === 0 ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)" : "transform 0.1s ease",
              }}
            >
              {/* Placeholder — replace with <img> when photo is added */}
              <div
                className="w-full h-full min-h-[400px] rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--secondary)/0.05))",
                  border: "1px solid hsl(var(--outline-variant)/0.15)",
                }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                    <span className="font-headline text-2xl font-bold text-primary">MW</span>
                  </div>
                  <span className="label-tech text-xs text-muted-foreground">Photo coming soon</span>
                </div>
              </div>

              {/* Dynamic glow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, hsl(184 100% 68% / 0.15), transparent 70%)`,
                  transition: "background 0.05s ease",
                }}
              />

              {/* Scanning line */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <motion.div
                  className="absolute left-0 right-0 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(184 100% 68% / 0.6), transparent)",
                  }}
                  animate={{ top: ["-2%", "102%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2,
                  }}
                />
              </div>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-primary/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-primary/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-primary/40 pointer-events-none" />

              {/* Floating badge — bottom-left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 glass-panel px-4 py-3 z-10"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="label-tech text-[10px] text-primary">Available for Projects</span>
                </div>
                <div className="label-tech text-[10px] text-muted-foreground mt-1">Egypt & Gulf Region</div>
              </motion.div>

              {/* Floating badge — top-right */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-6 right-6 glass-panel px-3 py-2 z-10"
              >
                <span className="label-tech text-[10px] text-foreground/70">5 Years Experience</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Text Side ── */}
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="label-tech text-[10px] text-primary mb-4"
          >
            // WHO I AM
          </motion.p>

          {/* Headline lines */}
          {headlineLines.map((line, i) => (
            <motion.h2
              key={line.text}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`font-headline text-3xl md:text-4xl font-bold ${line.gradient ? "gradient-text" : "text-foreground"}`}
            >
              {line.text}
            </motion.h2>
          ))}

          {/* Chips */}
          <div className="flex flex-wrap gap-3 mt-6">
            {chips.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="glass-panel px-4 py-2 label-tech text-sm"
                style={{ border: "1px solid hsl(var(--outline-variant) / 0.1)" }}
              >
                {chip}
              </motion.span>
            ))}
          </div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground text-base leading-relaxed max-w-lg mt-6"
          >
            5 years working at the intersection of Business Development and Marketing — building pipelines, launching campaigns, and growing revenue. Now I layer AI and automation on top to do in hours what used to take weeks.
          </motion.p>

          {/* BD + Marketing cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {[
              { icon: TrendingUp, title: "Business Development", items: bdItems },
              { icon: Megaphone, title: "Growth Marketing", items: mktItems },
            ].map((card, ci) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55 + ci * 0.15, duration: 0.5 }}
                className="rounded-xl p-4 md:px-5 hover:border-l-2 hover:border-l-primary hover:scale-[1.02] transition-all duration-300"
                style={{
                  background: "hsl(var(--surface-container) / 0.5)",
                  border: "1px solid hsl(var(--outline-variant) / 0.12)",
                  borderRadius: "12px",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <card.icon size={16} className="text-primary" />
                  <span className="font-headline text-sm font-semibold text-foreground">{card.title}</span>
                </div>
                <ul className="space-y-1.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* AI Layer badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-4 flex items-center gap-3 p-4 rounded-xl"
            style={{
              background: "hsl(var(--primary) / 0.06)",
              border: "1px solid hsl(var(--primary) / 0.2)",
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Zap size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">+ AI Systems Layer</div>
              <div className="label-tech text-[10px] text-muted-foreground mt-0.5">
                n8n · OpenAI · RAG · CRM Automation · AI Agents
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoIAmSection;
