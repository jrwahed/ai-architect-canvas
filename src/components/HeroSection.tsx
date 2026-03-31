import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-neural.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t, lang } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hud-grid"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 800px 600px at ${50 + mousePos.x * 10}% ${40 + mousePos.y * 10}%, hsl(184 100% 68% / 0.06), transparent 60%), radial-gradient(ellipse 600px 400px at 70% 60%, hsl(270 100% 50% / 0.05), transparent 60%)`,
        }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ y: imageY }}
      >
        <motion.img
          src={heroImage}
          alt="AI automation systems visualization"
          className="w-full h-full object-cover opacity-30"
          width={1920}
          height={1080}
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) scale(1.1)`,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-px bg-primary/10 animate-scan-line" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center"
        style={{ y: textY, opacity }}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 glass-panel mb-8 max-w-full"
        >
          <span className="status-dot shrink-0" />
          <span className="label-tech text-[10px] sm:text-xs truncate">{t("hero.badge")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-snug max-w-4xl mx-auto"
        >
          <span className="block text-muted-foreground">{t("hero.line1")}</span>
          <span className="block text-muted-foreground mt-1">{t("hero.line2")}</span>
          <span className="block gradient-text mt-3">{t("hero.line3")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed md:leading-loose font-body whitespace-pre-line"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-4 mt-12 flex-wrap"
        >
          <motion.a
            href="https://wa.me/201148627137"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px -5px hsl(184 100% 68% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground hover-glow"
          >
            {t("hero.cta1")}
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold ghost-border text-foreground backdrop-blur-sm hover:bg-surface-bright/50 transition-colors"
          >
            {t("hero.cta2")}
          </motion.button>
          <Link to="/solutions">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-6 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {t("nav.solutions")}
            </motion.span>
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
