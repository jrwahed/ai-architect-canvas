import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence, useScroll } from "framer-motion";
import {
  Smartphone,
  ShoppingCart,
  Monitor,
  Building2,
  UtensilsCrossed,
  Truck,
  Hospital,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Settings2,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Target,
  Users,
  DollarSign,
  Clock,
  Zap,
  Database,
  LineChart,
  Mail,
  Phone,
  Bot,
  Workflow,
  ChevronRight,
  ChevronLeft,
  X,
  Eye,
  Layers,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { industries, type Industry, type Department } from "@/data/solutions-data";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import { Slider } from "@/components/ui/slider";

/* ───── Icon Maps ───── */
const industryIcons: Record<string, React.ElementType> = {
  "marketing-agencies": Smartphone,
  ecommerce: ShoppingCart,
  saas: Monitor,
  "real-estate": Building2,
  restaurants: UtensilsCrossed,
  logistics: Truck,
  healthcare: Hospital,
  education: GraduationCap,
};

const deptIcons: Record<string, React.ElementType> = {
  "إدارة الحملات": Target,
  "إدارة العملاء": Users,
  "المبيعات": DollarSign,
  "المخزون والعمليات": Layers,
  "التسويق": Smartphone,
  "المبيعات والـ Pipeline": TrendingUp,
  "نجاح العملاء": Users,
  "العمليات": Settings2,
  "الشؤون الأكاديمية": GraduationCap,
  "إدارة الشحن": Truck,
  "إدارة المواعيد والمرضى": Hospital,
};

const priorityMap: Record<string, string> = {
  أعلى: "sol.priority.highest",
  عالي: "sol.priority.high",
  متوسط: "sol.priority.medium",
};

const badgeMap: Record<string, string> = {
  "marketing-agencies": "sol.badge.mostPopular",
  "real-estate": "sol.badge.highestRoi",
  ecommerce: "sol.badge.fastestResults",
};

/* ───── Animated Counter Hook ───── */
function useAnimatedNumber(target: number, duration = 1500) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<number>();

  useEffect(() => {
    const start = current;
    const startTime = performance.now();
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(start + (target - start) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    
    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [target, duration]);

  return current;
}

/* ───── Pain Ticker ───── */
function PainTicker() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const pains = useMemo(() => [
    t("sol.painTicker.1"),
    t("sol.painTicker.2"),
    t("sol.painTicker.3"),
    t("sol.painTicker.4"),
    t("sol.painTicker.5"),
  ], [t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % pains.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [pains.length]);

  return (
    <div className="relative h-12 flex items-center justify-center mt-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="absolute px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm md:text-base font-label"
          style={{ boxShadow: "0 0 30px -8px hsl(var(--primary) / 0.3)" }}
        >
          {pains[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───── Particle Background (CSS only) ───── */
function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.06]">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animation: `float ${4 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => {
            const x1 = (i * 37 + 13) % 100;
            const y1 = (i * 53 + 7) % 100;
            const j = (i + 3) % 30;
            const x2 = (j * 37 + 13) % 100;
            const y2 = (j * 53 + 7) % 100;
            return (
              <line
                key={i}
                x1={`${x1}%`} y1={`${y1}%`}
                x2={`${x2}%`} y2={`${y2}%`}
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                opacity="0.3"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ───── Company Selector Card ───── */
function CompanyCard({
  industry,
  isSelected,
  onClick,
  index,
  isInView,
}: {
  industry: Industry;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  isInView: boolean;
}) {
  const { t, isAr } = useLanguage();
  const Icon = industryIcons[industry.id] || Monitor;
  const badgeKey = badgeMap[industry.id];
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x: Math.max(-5, Math.min(5, y)), y: Math.max(-5, Math.min(5, x)) });
  }, []);

  return (
    <motion.button
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.04 * index }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.4s ease",
      }}
      className={`relative flex-shrink-0 w-[200px] md:w-auto rounded-2xl p-5 md:p-6 text-start transition-all duration-400 group overflow-hidden ${
        isSelected
          ? "bg-[hsl(var(--surface-container))] border-2 border-primary/50 shadow-[0_0_50px_-12px_hsl(var(--primary)/0.35)]"
          : "bg-[hsl(var(--surface-container)/0.4)] border border-[hsl(var(--outline-variant)/0.1)] hover:border-primary/20 hover:bg-[hsl(var(--surface-container)/0.6)]"
      }`}
    >
      {/* Badge */}
      {badgeKey && (
        <div className="absolute top-2 end-2 px-2 py-0.5 rounded-full bg-primary/15 border border-primary/25 text-primary text-[9px] font-label font-bold uppercase tracking-wider">
          {t(badgeKey)}
        </div>
      )}

      {/* Glow on selected */}
      {isSelected && (
        <motion.div
          layoutId="company-glow"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08), transparent 70%)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            isSelected ? "bg-primary/20" : "bg-primary/8 group-hover:bg-primary/12"
          }`}>
            <Icon size={20} className={`transition-colors ${isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
          </div>
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 rounded-full bg-primary"
              style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.6)" }}
            />
          )}
        </div>

        <h3 className={`font-headline text-sm md:text-base font-bold leading-tight transition-colors ${
          isSelected ? "text-primary" : "text-foreground"
        }`}>
          {isAr ? industry.nameAr : industry.nameEn}
        </h3>
        <span className="text-[10px] font-label text-muted-foreground/50 tracking-wider uppercase mt-0.5 block">
          {isAr ? industry.nameEn : industry.nameAr}
        </span>

        {/* Hover pain stat */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: "auto", opacity: 1 }}
          className="overflow-hidden"
        >
          <p className="text-[10px] text-destructive/80 mt-2 font-label">
            {industry.wasteStat}
          </p>
        </motion.div>
      </div>
    </motion.button>
  );
}

/* ───── Before vs After ───── */
function BeforeAfterSection({ industry }: { industry: Industry }) {
  const { t, isAr } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="my-12">
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch">
        {/* BEFORE */}
        <motion.div
          initial={{ opacity: 0, x: isAr ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 border border-destructive/15 bg-destructive/[0.04]"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">❌</span>
            <h3 className="font-headline text-base font-bold text-destructive">{t("sol.beforeTitle")}</h3>
          </div>
          <ul className="space-y-3">
            {industry.beforePoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
              >
                <span className="text-destructive/60 mt-0.5 shrink-0">—</span>
                <span className="line-through decoration-destructive/30">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="hidden md:flex flex-col items-center justify-center gap-2"
        >
          <div className="w-px h-8 bg-gradient-to-b from-destructive/20 to-primary/20" />
          <div className="px-3 py-2 rounded-lg bg-[hsl(var(--surface-container))] border border-[hsl(var(--outline-variant)/0.15)] text-xs font-label text-muted-foreground whitespace-nowrap">
            {t("sol.weBuild")}
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-primary/20 to-primary/40" />
        </motion.div>

        {/* Mobile arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="md:hidden flex items-center justify-center py-2"
        >
          <div className="px-4 py-2 rounded-lg bg-[hsl(var(--surface-container))] border border-[hsl(var(--outline-variant)/0.15)] text-xs font-label text-muted-foreground">
            {t("sol.weBuild")}
          </div>
        </motion.div>

        {/* AFTER */}
        <motion.div
          initial={{ opacity: 0, x: isAr ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 border border-primary/15 bg-primary/[0.04]"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} className="text-primary" />
            <h3 className="font-headline text-base font-bold text-primary">{t("sol.afterTitle")}</h3>
          </div>
          <ul className="space-y-3">
            {industry.afterPoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                  className="shrink-0 mt-0.5"
                >
                  <Check size={14} className="text-primary" />
                </motion.div>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

/* ───── ROI Calculator ───── */
function ROICalculator({ industry }: { industry: Industry }) {
  const { t, isAr } = useLanguage();
  const [employees, setEmployees] = useState(3);
  const [salary, setSalary] = useState(8000);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const monthlyWaste = Math.round(employees * salary * industry.roiHoursPercent);
  const daysWasted = Math.round(employees * 20 * industry.roiHoursPercent * 10) / 10;

  const animatedWaste = useAnimatedNumber(monthlyWaste, 800);
  const animatedDays = useAnimatedNumber(Math.round(daysWasted), 800);

  const waMessage = encodeURIComponent(
    isAr
      ? `أنا مهتم بنظام ${industry.nameAr}. عندي ${employees} موظفين بيعملوا شغل يدوي وبيكلفوني حوالي ${monthlyWaste} جنيه/شهر.`
      : `I'm interested in the ${industry.nameEn} system. I have ${employees} employees doing manual work costing ~${monthlyWaste} EGP/month.`
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="my-12 rounded-2xl p-6 md:p-10 border border-primary/15 backdrop-blur-xl"
      style={{
        background: "linear-gradient(135deg, hsl(var(--surface-container) / 0.8), hsl(var(--surface-container-low) / 0.6))",
        boxShadow: "0 0 60px -20px hsl(var(--primary) / 0.15)",
      }}
    >
      <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
        {t("sol.roiTitle")}
      </h3>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Employees slider */}
        <div>
          <label className="text-sm font-label text-muted-foreground mb-3 block">
            {t("sol.roiEmployees")}: <span className="text-primary font-bold">{employees}</span>
          </label>
          <Slider
            value={[employees]}
            onValueChange={(v) => setEmployees(v[0])}
            min={1}
            max={20}
            step={1}
            className="w-full"
          />
        </div>

        {/* Salary slider */}
        <div>
          <label className="text-sm font-label text-muted-foreground mb-3 block">
            {t("sol.roiSalary")}: <span className="text-primary font-bold">{salary.toLocaleString()}</span>
          </label>
          <Slider
            value={[salary]}
            onValueChange={(v) => setSalary(v[0])}
            min={3000}
            max={30000}
            step={500}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <div className="text-center space-y-3 mb-8">
        <motion.p
          className="text-2xl md:text-3xl font-headline font-bold text-destructive"
          key={monthlyWaste}
        >
          {t("sol.roiWaste").replace("{amount}", animatedWaste.toLocaleString())}
        </motion.p>
        <p className="text-muted-foreground text-sm font-label">
          {t("sol.roiDays").replace("{days}", String(animatedDays))}
        </p>
        <p className="text-primary/70 text-xs font-label mt-4">
          {t("sol.roiTimeline")}
        </p>
      </div>

      <div className="flex justify-center">
        <motion.a
          href={`https://wa.me/201148627137?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, boxShadow: "0 0 40px -10px hsl(184 100% 68% / 0.5)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-label font-bold uppercase tracking-[0.12em] text-sm rounded-xl hover-glow transition-all"
        >
          <MessageCircle size={18} />
          {t("sol.roiCta")}
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ───── KPI Chip ───── */
function KpiChip({ kpi }: { kpi: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[hsl(var(--surface-container)/0.7)] border border-[hsl(var(--outline-variant)/0.08)] text-sm text-foreground/80">
      <LineChart size={12} className="text-primary/60 shrink-0" />
      <span className="truncate">{kpi}</span>
    </div>
  );
}

/* ───── Automation Flow Item ───── */
function AutomationFlowItem({
  name,
  description,
  index,
  isLast,
}: {
  name: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full group"
      >
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
              expanded
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)]"
                : "bg-primary/10 text-primary group-hover:bg-primary/20"
            }`}>
              {String(index + 1).padStart(2, "0")}
            </div>
            {!isLast && (
              <div className="w-px h-6 bg-[hsl(var(--outline-variant)/0.15)] mt-1" />
            )}
          </div>

          <div className="flex-1 pb-4 text-start">
            <div className="flex items-center justify-between">
              <span className="font-headline text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </span>
              <Zap size={12} className="text-primary/40 group-hover:text-primary/80 transition-colors shrink-0" />
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground text-xs leading-relaxed mt-1.5 overflow-hidden"
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </button>
    </div>
  );
}

/* ───── Department Card ───── */
function DepartmentCard({
  dept,
  industry,
  index,
  onViewDetails,
}: {
  dept: Department;
  industry: Industry;
  index: number;
  onViewDetails: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t, isAr } = useLanguage();
  const Icon = deptIcons[dept.name] || Settings2;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: Math.max(-8, Math.min(8, y)), y: Math.max(-8, Math.min(8, x)) });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.5s ease",
      }}
      className="group rounded-2xl bg-[hsl(var(--surface-container)/0.5)] border border-[hsl(var(--outline-variant)/0.1)] backdrop-blur-xl overflow-hidden hover:border-primary/20 transition-all duration-500"
    >
      {/* Header */}
      <div className="p-6 pb-4 border-b border-[hsl(var(--outline-variant)/0.08)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
            <Icon size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-headline text-base font-bold text-foreground">{dept.name}</h3>
            <span className="text-[10px] font-label text-muted-foreground/50 uppercase tracking-wider">
              {dept.kpis.length} KPIs — {dept.automations.length} {t("sol.automationsCount")}
            </span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={13} className="text-primary/70" />
          <span className="text-[10px] font-label font-semibold uppercase tracking-wider text-primary/70">
            {t("sol.kpis")}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {dept.kpis.slice(0, 4).map((kpi) => (
            <KpiChip key={kpi} kpi={kpi} />
          ))}
          {dept.kpis.length > 4 && (
            <div className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-primary/5 text-xs text-primary font-label">
              +{dept.kpis.length - 4}
            </div>
          )}
        </div>
      </div>

      {/* Automations Preview */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <Workflow size={13} className="text-primary/70" />
          <span className="text-[10px] font-label font-semibold uppercase tracking-wider text-primary/70">
            {t("sol.automations")}
          </span>
        </div>
        <div className="space-y-0">
          {dept.automations.map((a, i) => (
            <AutomationFlowItem
              key={a.name}
              name={a.name}
              description={a.description}
              index={i}
              isLast={i === dept.automations.length - 1}
            />
          ))}
        </div>
      </div>

      {/* View Details Button */}
      <div className="px-6 pb-6">
        <button
          onClick={onViewDetails}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/20 text-primary text-sm font-label font-semibold transition-all duration-300 group/btn"
        >
          <Eye size={14} />
          <span>{t("sol.viewCase")}</span>
          {isAr ? (
            <ChevronLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform" />
          ) : (
            <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

/* ───── Animated Result Stat ───── */
function ResultStat({ text, isInView }: { text: string; isInView: boolean }) {
  const numMatch = text.match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const animated = useAnimatedNumber(isInView ? num : 0, 1500);
  const display = numMatch ? text.replace(numMatch[0], String(animated)) : text;

  return (
    <div className="rounded-xl bg-[hsl(var(--surface-container)/0.7)] border border-[hsl(var(--outline-variant)/0.1)] p-4 text-center backdrop-blur-sm">
      <span className="font-headline text-lg md:text-xl font-bold text-primary text-glow-primary">{display}</span>
    </div>
  );
}

/* ───── Case Study Modal ───── */
function CaseStudyModal({
  industry,
  onClose,
}: {
  industry: Industry;
  onClose: () => void;
}) {
  const { t, isAr } = useLanguage();
  const Icon = industryIcons[industry.id] || Monitor;
  const [activeDept, setActiveDept] = useState(0);
  const dept = industry.departments[activeDept];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl mx-4 my-20 rounded-3xl bg-[hsl(var(--surface-container)/0.95)] border border-[hsl(var(--outline-variant)/0.15)] backdrop-blur-2xl overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Modal Header */}
        <div
          className="relative p-8 md:p-10 border-b border-[hsl(var(--outline-variant)/0.1)]"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), transparent 60%)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 end-6 w-10 h-10 rounded-xl bg-[hsl(var(--surface-container))] border border-[hsl(var(--outline-variant)/0.15)] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon size={28} className="text-primary" />
            </div>
            <div>
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">
                {isAr ? industry.nameAr : industry.nameEn}
              </h2>
              <span className="text-xs font-label text-primary/60 tracking-wider uppercase">
                {isAr ? industry.nameEn : industry.nameAr}
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
            {industry.tagline}
          </p>
        </div>

        {/* Problem / Solution */}
        <div className="p-8 md:p-10 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-6 border border-destructive/15 bg-destructive/5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-destructive" />
                <span className="text-sm font-headline font-bold text-destructive">{t("sol.problem")}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{industry.painPoint}</p>
            </div>
            <div className="rounded-2xl p-6 border border-primary/15 bg-primary/5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={16} className="text-primary" />
                <span className="text-sm font-headline font-bold text-primary">{t("sol.solution")}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{industry.solution}</p>
            </div>
          </div>

          {/* Department Tabs */}
          {industry.departments.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {industry.departments.map((d, i) => {
                const DIcon = deptIcons[d.name] || Settings2;
                return (
                  <button
                    key={d.name}
                    onClick={() => setActiveDept(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-label rounded-xl transition-all duration-300 ${
                      activeDept === i
                        ? "bg-primary text-primary-foreground font-bold shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)]"
                        : "bg-[hsl(var(--surface-container))] text-muted-foreground hover:text-foreground border border-[hsl(var(--outline-variant)/0.1)]"
                    }`}
                  >
                    <DIcon size={14} />
                    {d.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Department Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, x: isAr ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAr ? -10 : 10 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* KPIs */}
              <div className="rounded-2xl bg-[hsl(var(--surface-container-low)/0.5)] border border-[hsl(var(--outline-variant)/0.08)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={16} className="text-primary" />
                  <h4 className="text-xs font-label font-semibold uppercase tracking-wider text-primary">
                    {t("sol.kpis")}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {dept.kpis.map((kpi) => (
                    <KpiChip key={kpi} kpi={kpi} />
                  ))}
                </div>
              </div>

              {/* Automations */}
              <div className="rounded-2xl bg-[hsl(var(--surface-container-low)/0.5)] border border-[hsl(var(--outline-variant)/0.08)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Workflow size={16} className="text-primary" />
                  <h4 className="text-xs font-label font-semibold uppercase tracking-wider text-primary">
                    {t("sol.automations")}
                  </h4>
                </div>
                {dept.automations.map((a, i) => (
                  <AutomationFlowItem
                    key={a.name}
                    name={a.name}
                    description={a.description}
                    index={i}
                    isLast={i === dept.automations.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Results */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-primary" />
              <h4 className="text-xs font-label font-semibold uppercase tracking-wider text-primary">
                {t("sol.results")}
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {industry.results.map((r) => (
                <ResultStat key={r} text={r} isInView={true} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href={`https://wa.me/201148627137?text=${encodeURIComponent(
              isAr ? `مهتم بنظام ${industry.nameAr}` : `Interested in ${industry.nameEn} system`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01, boxShadow: "0 0 40px -10px hsl(184 100% 68% / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground font-headline font-bold text-base rounded-xl transition-shadow"
          >
            <MessageCircle size={20} />
            {t("sol.cta")}
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───── Sticky CTA Bar ───── */
function StickyCTABar({ industry, visible }: { industry: Industry; visible: boolean }) {
  const { t, isAr } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !visible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4"
    >
      <div
        className="w-full max-w-2xl flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-[hsl(var(--outline-variant)/0.15)]"
        style={{
          background: "hsl(var(--surface-container) / 0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -4px 30px -10px hsl(var(--primary) / 0.15)",
        }}
        dir={isAr ? "rtl" : "ltr"}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 rounded-full bg-primary shrink-0"
              style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
        />
        <span className="text-sm font-label text-foreground flex-1 truncate">
          {t("sol.stickyReady")} {isAr ? industry.nameAr : industry.nameEn}{t("sol.stickyQuestion")}
        </span>
        <a
          href={`https://wa.me/201148627137?text=${encodeURIComponent(
            isAr ? `مهتم بنظام ${industry.nameAr}` : `Interested in ${industry.nameEn} system`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-label font-bold uppercase tracking-wider rounded-xl hover-glow transition-all"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SOLUTIONS PAGE
   ═══════════════════════════════════════════════ */
const Solutions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialIndustry = searchParams.get("industry") || industries[0].id;
  const [selected, setSelected] = useState<string>(
    industries.find(i => i.id === initialIndustry) ? initialIndustry : industries[0].id
  );
  const [caseStudyIndustry, setCaseStudyIndustry] = useState<Industry | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const selectorRef = useRef<HTMLDivElement>(null);
  const selectorInView = useInView(selectorRef, { once: true, margin: "-80px" });
  const deptRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const resultsInView = useInView(resultsRef, { once: true, margin: "-50px" });
  const { t, isAr } = useLanguage();

  // Sticky bar visibility — show after scrolling past selector
  const selectorEndRef = useRef<HTMLDivElement>(null);
  const pastSelector = useInView(selectorEndRef, { once: false, margin: "0px" });
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    // Show sticky when we've scrolled past the selector section
    if (pastSelector) {
      setShowSticky(true);
    }
  }, [pastSelector]);

  const handleSelect = useCallback((id: string) => {
    setSelected(id);
    setSearchParams({ industry: id }, { replace: true });
  }, [setSearchParams]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const selectedIndustry = industries.find((i) => i.id === selected) || industries[0];

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      <Navbar />
      <div className="h-16" />

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6" dir={isAr ? "rtl" : "ltr"}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-label text-muted-foreground hover:text-foreground transition-colors group"
        >
          {isAr ? (
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          ) : (
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          )}
          {t("sol.backHome")}
        </Link>
      </div>

      {/* Ambient cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.06), transparent 60%)`,
        }}
      />

      {/* ── Hero ── */}
      <section className="relative py-24 md:py-32 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
        <ParticleBackground />

        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block font-label text-primary text-xs tracking-[0.2em] uppercase mb-6"
          >
            {t("sol.heroLabel")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="block gradient-text text-glow-primary">{t("sol.heroTitle1")}</span>
            <span className="block gradient-text text-glow-primary">{t("sol.heroTitle2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {t("sol.heroDesc")}
          </motion.p>

          <PainTicker />
        </div>
      </section>

      {/* ── SECTION 1: Company Selector ── */}
      <section className="pb-8 relative z-10" dir={isAr ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mb-6"
          >
            <Layers size={14} className="text-primary" />
            <span className="text-xs font-label font-semibold uppercase tracking-wider text-primary">
              {t("sol.selectIndustry")}
            </span>
          </motion.div>

          {/* Scrollable company cards */}
          <div ref={selectorRef} className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-4 lg:grid-cols-8 md:overflow-visible">
            {industries.map((ind, i) => (
              <CompanyCard
                key={ind.id}
                industry={ind}
                isSelected={selected === ind.id}
                onClick={() => handleSelect(ind.id)}
                index={i}
                isInView={selectorInView}
              />
            ))}
          </div>
          <div ref={selectorEndRef} />
        </div>
      </section>

      {/* ── SECTION 2: Department Breakdown ── */}
      <section className="py-16 md:py-24 relative z-10" dir={isAr ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Selected Industry Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndustry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {(() => {
                      const SIcon = industryIcons[selectedIndustry.id] || Monitor;
                      return <SIcon size={24} className="text-primary" />;
                    })()}
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
                      {isAr ? selectedIndustry.nameAr : selectedIndustry.nameEn}
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
                    {selectedIndustry.tagline}
                  </p>
                </div>

                <button
                  onClick={() => setCaseStudyIndustry(selectedIndustry)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/15 border border-primary/15 text-primary text-sm font-label font-semibold transition-all shrink-0 group"
                >
                  <Eye size={14} />
                  {t("sol.viewFullCase")}
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Before vs After */}
              <BeforeAfterSection industry={selectedIndustry} />

              {/* ROI Calculator */}
              <ROICalculator industry={selectedIndustry} />
            </motion.div>
          </AnimatePresence>

          {/* Departments Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndustry.id + "-depts"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={deptRef}
              className={`grid gap-4 ${
                selectedIndustry.departments.length === 1
                  ? "grid-cols-1 max-w-2xl"
                  : selectedIndustry.departments.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {selectedIndustry.departments.map((dept, i) => (
                <DepartmentCard
                  key={dept.name}
                  dept={dept}
                  industry={selectedIndustry}
                  index={i}
                  onViewDetails={() => setCaseStudyIndustry(selectedIndustry)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Results Banner */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndustry.id + "-results"}
              ref={resultsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-10 rounded-2xl bg-[hsl(var(--surface-container)/0.5)] border border-[hsl(var(--outline-variant)/0.1)] p-6 md:p-8"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.03), transparent 60%)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={16} className="text-primary" />
                <span className="text-xs font-label font-semibold uppercase tracking-wider text-primary">
                  {t("sol.results")}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedIndustry.results.map((r) => (
                  <ResultStat key={r} text={r} isInView={resultsInView} />
                ))}
              </div>

              <motion.a
                href={`https://wa.me/201148627137?text=${encodeURIComponent(
                  isAr ? `مهتم بنظام ${selectedIndustry.nameAr}` : `Interested in ${selectedIndustry.nameEn} system`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full mt-6 py-4 bg-primary text-primary-foreground font-headline font-bold text-sm md:text-base rounded-xl transition-shadow"
              >
                <MessageCircle size={18} />
                {t("sol.cta")}
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pb-24 md:pb-36 relative z-10" dir={isAr ? "rtl" : "ltr"}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[hsl(var(--surface-container)/0.5)] border border-[hsl(var(--outline-variant)/0.1)] p-10 md:p-16 backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, hsl(var(--surface-container) / 0.7), hsl(var(--surface-container-low) / 0.5))",
            }}
          >
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {t("sol.bottomTitle1")}
              <br />
              <span className="gradient-text">{t("sol.bottomTitle2")}</span>
            </h2>
            <p className="text-muted-foreground mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {t("sol.bottomDesc")}
            </p>

            <motion.a
              href="https://wa.me/201148627137"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-label font-bold uppercase tracking-[0.12em] text-sm rounded-xl hover-glow transition-all duration-300"
            >
              <MessageCircle size={18} />
              {t("sol.bottomCta")}
            </motion.a>
          </motion.div>

          <p className="text-muted-foreground/40 text-sm mt-10">
            Mohamed Waheed — AI-Powered Growth Systems Builder
          </p>
        </div>
      </section>

      {/* ── Sticky CTA Bar ── */}
      <AnimatePresence>
        <StickyCTABar industry={selectedIndustry} visible={showSticky} />
      </AnimatePresence>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {caseStudyIndustry && (
          <CaseStudyModal
            industry={caseStudyIndustry}
            onClose={() => setCaseStudyIndustry(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Solutions;
