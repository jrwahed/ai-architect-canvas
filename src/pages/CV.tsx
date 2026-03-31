import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Download, Brain, TrendingUp, Settings2, Workflow, BarChart3, Users,
  ChevronDown, ExternalLink, Mail, Phone, MapPin, Megaphone, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { downloadCV } from "@/utils/cvPdfData";

/* ─── Counting number hook ─── */
function useCountUp(end: number, duration = 1500, inView: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, inView]);
  return val;
}

/* ─── Data ─── */
const expertise = [
  { icon: Brain, title: "AI-Driven Growth Systems" },
  { icon: TrendingUp, title: "Revenue Pipeline Architecture" },
  { icon: Settings2, title: "Operating Model Design" },
  { icon: Workflow, title: "Workflow Automation" },
  { icon: BarChart3, title: "Executive Dashboards" },
  { icon: Users, title: "Cross-Department Engineering" },
];

const experiences = [
  {
    role: "AI-Driven Business Development & Operating Systems Consultant",
    company: "Freelance",
    location: "Cairo, Egypt",
    duration: "2+ Years",
    current: true,
    description: "Designed and implemented AI-integrated operating models for companies across marketing, legal, commercial, and operational environments.",
    expandMetrics: [
      { value: "3x", label: "Execution Speed" },
      { value: "10x", label: "Cost Reduction" },
      { value: "95%+", label: "Data Accuracy" },
    ],
  },
  {
    role: "Business Development & Growth Lead",
    company: "Cloudilic | Dragify.ai",
    duration: "3 Months",
    description: "Led validation of AI-powered automation platform. Mapped 15+ monetizable automation scenarios.",
    expandMetrics: [{ value: "40%", label: "Feature Clarity Improvement" }],
  },
  {
    role: "Business Developer & Account Manager",
    company: "KMF Agency",
    duration: "6 Months",
    description: "Generated new business contributing to 20% growth in client acquisition pipeline.",
    expandMetrics: [
      { value: "35%", label: "Lead Quality Improvement" },
      { value: "50%", label: "Opportunity Visibility" },
    ],
  },
  {
    role: "Business Developer",
    company: "Point Trade",
    duration: "6 Months",
    description: "Competitor analysis across 10+ players. Reduced execution misalignment by 30%.",
  },
  {
    role: "Marketing & Growth Specialist",
    company: "CMG Holding",
    duration: "6 Months",
    description: "Multi-channel campaigns increasing lead flow ~25%. Improved funnel visibility.",
  },
];

const projects = [
  {
    tag: "Marketing Operations",
    title: "Marketing Operating Model Redesign",
    metrics: [
      { value: "3x", label: "Speed Increase" },
      { value: "95%", label: "Content Consistency" },
      { value: "-70%", label: "Reactive Dependency" },
    ],
  },
  {
    tag: "Legal AI",
    title: "Legal RAG Knowledge System",
    metrics: [
      { value: "Hours→Secs", label: "Response Time" },
      { value: "45min→5min", label: "Research Time" },
      { value: "10x", label: "Cost Reduction" },
    ],
  },
  {
    tag: "AI Intelligence",
    title: "Client Intelligence System (RAG)",
    metrics: [
      { value: "15min→10sec", label: "Data Search" },
      { value: "95%+", label: "Data Accuracy" },
      { value: "+60%", label: "Team Productivity" },
    ],
  },
  {
    tag: "Operations",
    title: "Organizational Operating Model",
    metrics: [
      { value: "Daily+Weekly", label: "Operating Rhythm" },
      { value: "100%", label: "Decision Visibility" },
      { value: "0", label: "New Hires Needed" },
    ],
  },
  {
    tag: "HR Automation",
    title: "AI-Based Recruitment System",
    metrics: [
      { value: "7d→24h", label: "Hiring Cycle" },
      { value: "+85%", label: "Evaluation Accuracy" },
      { value: "Automated", label: "Screening" },
    ],
  },
  {
    tag: "Financial Intelligence",
    title: "Financial Intelligence Dashboard",
    metrics: [
      { value: "-75%", label: "Manual Workload" },
      { value: "99%", label: "Data Accuracy" },
      { value: "Real-time", label: "Visibility" },
    ],
  },
];

const toolCategories = [
  { label: "Automation", tools: ["n8n", "Zapier", "Make"] },
  { label: "AI Systems", tools: ["OpenAI API", "AI Agents", "RAG Architectures"] },
  { label: "CRM Platforms", tools: ["HubSpot", "Zoho CRM"] },
  { label: "Analytics & Reporting", tools: ["GA4", "Looker Studio", "Google Sheets"] },
  { label: "Performance Marketing", tools: ["Meta Ads", "Google Ads"] },
  { label: "Project Management", tools: ["Notion", "Trello", "Jira"] },
];

/* ─── Sub-components ─── */

const SectionLabel = ({ children }: { children: string }) => (
  <motion.p
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    className="label-tech text-[10px] mb-4"
  >
    {children}
  </motion.p>
);

const StatCard = ({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) => {
  const count = useCountUp(value, 1500, inView);
  return (
    <div className="text-center p-4">
      <span className="font-headline text-2xl md:text-3xl font-bold gradient-text">
        {count}{suffix}
      </span>
      <p className="label-tech text-[10px] mt-1">{label}</p>
    </div>
  );
};

const ExperienceCard = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="flex gap-4 md:gap-8" ref={ref}>
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15, duration: 0.4 }}
          className={`w-3 h-3 rounded-full border-2 z-10 ${
            exp.current
              ? "border-primary bg-primary status-dot"
              : "border-primary/40 bg-background"
          }`}
        />
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 min-h-[40px]" style={{ background: "hsl(var(--primary) / 0.15)" }} />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.15, duration: 0.5 }}
        className="glass-panel rounded-2xl p-5 md:p-6 mb-6 flex-1 group hover:border-l-[3px] hover:border-l-primary/50 transition-all duration-300"
        style={{ borderRadius: "16px" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-headline text-sm md:text-base font-semibold text-foreground">
              {exp.role}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {exp.company}{exp.location ? ` — ${exp.location}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-tech text-[10px]">{exp.duration}</span>
            {exp.current && (
              <span
                className="text-[10px] font-label font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                  border: "1px solid hsl(var(--primary) / 0.2)",
                }}
              >
                Current
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>

        {exp.expandMetrics && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 mt-3 text-xs text-primary hover:text-primary/80 transition-colors font-label"
            >
              {expanded ? "Hide results" : "Show key results"}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-3 mt-3">
                    {exp.expandMetrics.map((m) => (
                      <div
                        key={m.label}
                        className="px-3 py-2 rounded-lg"
                        style={{
                          background: "hsl(var(--primary) / 0.05)",
                          border: "1px solid hsl(var(--primary) / 0.1)",
                        }}
                      >
                        <span className="font-headline text-sm font-bold text-primary">{m.value}</span>
                        <span className="text-[10px] text-muted-foreground ml-2">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
};

/* ─── Who I Am Section ─── */
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

/* ─── Main Page ─── */
const CV = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden hud-grid">
        {/* Parallax bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 800px 600px at ${50 + mousePos.x * 10}% ${40 + mousePos.y * 10}%, hsl(184 100% 68% / 0.06), transparent 60%), radial-gradient(ellipse 600px 400px at 70% 60%, hsl(270 100% 50% / 0.05), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-primary/10 animate-scan-line" />
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 w-full pt-24 pb-16"
          style={{ y: textY, opacity }}
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 glass-panel mb-6"
              >
                <span className="status-dot shrink-0" />
                <span className="label-tech text-[10px]">Available for Projects — Egypt &amp; Gulf</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight gradient-text"
              >
                Mohamed Waheed
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <p className="font-headline text-lg md:text-xl text-muted-foreground mt-3">
                  AI-Integrated Business Growth Architect
                </p>
                <p className="font-headline text-base text-muted-foreground/60 mt-1">
                  &amp; Operating Systems Designer
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-6 max-w-lg text-sm md:text-base text-muted-foreground leading-relaxed"
              >
                2+ years designing scalable operating systems that connect marketing, sales, and operations into unified revenue engines. Specialized in workflow automation, AI-driven systems, and executive dashboard design.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <motion.button
                  onClick={downloadCV}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px -5px hsl(184 100% 68% / 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-label uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground cursor-pointer"
                >
                  <Download size={14} />
                  Download CV PDF
                </motion.button>
                <motion.a
                  href="https://wa.me/201148627137"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-label uppercase tracking-[0.15em] font-semibold ghost-border text-foreground hover:bg-surface-bright/50 transition-colors"
                >
                  Book a Call →
                </motion.a>
              </motion.div>
            </div>

            {/* Right — Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="glass-panel rounded-2xl p-2"
              style={{ borderRadius: "16px" }}
            >
              <div className="grid grid-cols-2">
                <StatCard value={2} suffix="+" label="Years Experience" inView={statsInView} />
                <StatCard value={6} suffix="" label="Companies Impacted" inView={statsInView} />
                <div className="col-span-2 h-px" style={{ background: "hsl(var(--outline-variant) / 0.1)" }} />
                <StatCard value={10} suffix="x" label="Cost Reduction" inView={statsInView} />
                <StatCard value={95} suffix="%+" label="Data Accuracy Achieved" inView={statsInView} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════ WHO I AM ═══════ */}
      <WhoIAmSection />

      {/* ═══════ CORE EXPERTISE ═══════ */}
      <section className="section-gap max-w-7xl mx-auto px-4 md:px-12">
        <SectionLabel>// Core Expertise</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {expertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel rounded-2xl p-5 group hover:border-primary/30 transition-all duration-300"
              style={{ borderRadius: "16px" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ background: "hsl(var(--primary) / 0.1)" }}
              >
                <item.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <h3 className="font-headline text-sm font-semibold text-foreground">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ EXPERIENCE TIMELINE ═══════ */}
      <section className="section-gap max-w-4xl mx-auto px-4 md:px-12">
        <SectionLabel>// Experience</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-10"
        >
          Where I built the expertise
        </motion.h2>

        <div className="relative">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════ PROJECTS & RESULTS ═══════ */}
      <section className="section-gap max-w-7xl mx-auto px-4 md:px-12">
        <SectionLabel>// Selected Projects</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-10"
        >
          Systems that delivered results
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 0 30px -10px hsl(184 100% 68% / 0.2)" }}
              className="glass-panel rounded-2xl p-5 md:p-6 transition-all duration-300"
              style={{ borderRadius: "16px" }}
            >
              <span
                className="label-tech text-[10px]"
                style={{ color: "hsl(var(--primary) / 0.6)" }}
              >
                {proj.tag}
              </span>
              <h3 className="font-headline text-sm md:text-base font-bold text-foreground mt-2 mb-4">
                {proj.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {proj.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="px-3 py-2 rounded-lg flex-1 min-w-[90px]"
                    style={{
                      background: "hsl(var(--primary) / 0.05)",
                      border: "1px solid hsl(var(--primary) / 0.1)",
                    }}
                  >
                    <p className="font-headline text-sm font-bold text-primary">{m.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TOOLS & STACK ═══════ */}
      <section className="section-gap max-w-5xl mx-auto px-4 md:px-12">
        <SectionLabel>// Tech Stack</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-10"
        >
          Tools I build with
        </motion.h2>

        <div className="space-y-6">
          {toolCategories.map((cat) => (
            <div key={cat.label}>
              <p className="font-label text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mb-2">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "hsl(184 100% 68% / 0.3)",
                      color: "hsl(184 100% 68%)",
                    }}
                    className="glass-panel px-4 py-2 font-label text-sm text-foreground/80 cursor-default transition-all duration-200"
                    style={{ borderRadius: "10px" }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="section-gap max-w-3xl mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-2xl p-8 md:p-12 text-center"
          style={{ borderRadius: "16px" }}
        >
          <p className="label-tech text-[10px] mb-4">// Let's Work Together</p>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to build your growth system?
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
            Whether you're a company looking for an AI systems architect or a team looking for a growth consultant — let's talk in 15 minutes.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <motion.a
              href="https://wa.me/201148627137"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px -5px hsl(184 100% 68% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-label uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground"
            >
              WhatsApp
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/moohamedwaheed/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-label uppercase tracking-[0.15em] font-semibold ghost-border text-foreground hover:bg-surface-bright/50 transition-colors"
            >
              <ExternalLink size={14} />
              LinkedIn
            </motion.a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <a href="mailto:moohamedwahed@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail size={12} /> moohamedwahed@gmail.com
            </a>
            <span className="flex items-center gap-1.5">
              <Phone size={12} /> +20 114 862 7137
            </span>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default CV;
