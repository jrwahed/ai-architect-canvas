import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSolutions = location.pathname === "/solutions";
  const { t, toggle, lang } = useLanguage();

  const navItems = [
    { label: t("nav.about"), target: "about" },
    { label: t("nav.services"), target: "services" },
    { label: t("nav.caseStudies"), target: "case-studies" },
    { label: t("nav.process"), target: "process" },
    { label: t("nav.insights"), target: "blog" },
    { label: t("nav.contact"), target: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <Link to="/">
          <motion.span
            className="font-headline text-lg font-bold tracking-tight cursor-pointer text-primary text-glow-primary"
            whileHover={{ scale: 1.02 }}
          >
            MW
          </motion.span>
        </Link>

        {/* Center nav links — only on home page */}
        <div className="hidden md:flex items-center gap-8">
          {isHome &&
            navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollTo(item.target)}
                className={`font-label text-xs uppercase tracking-[0.15em] transition-all duration-300 relative ${
                  active === item.target
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {active === item.target && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
        </div>

        {/* Right side: Lang + Solutions + Book a Call */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-label uppercase tracking-wider text-muted-foreground hover:text-foreground ghost-border transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={14} />
            <span>{lang === "en" ? "AR" : "EN"}</span>
          </motion.button>

          {/* FlowOS link */}
          <Link
            to="/flowos"
            className={`hidden md:inline-flex px-4 py-2 text-xs font-label uppercase tracking-[0.15em] font-semibold ghost-border transition-all duration-300 ${
              location.pathname === "/flowos"
                ? "text-primary border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:border-[hsl(var(--outline-variant)/0.4)]"
            }`}
          >
            FlowOS
          </Link>

          {/* DriveLead link */}
          <Link
            to="/drivelead"
            className={`hidden md:inline-flex px-4 py-2 text-xs font-label uppercase tracking-[0.15em] font-semibold ghost-border transition-all duration-300 ${
              location.pathname === "/drivelead"
                ? "text-primary border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:border-[hsl(var(--outline-variant)/0.4)]"
            }`}
          >
            DriveLead
          </Link>

          {/* Solutions — secondary CTA */}
          <Link
            to="/solutions"
            className={`hidden md:inline-flex px-4 py-2 text-xs font-label uppercase tracking-[0.15em] font-semibold ghost-border transition-all duration-300 ${
              isSolutions
                ? "text-primary border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:border-[hsl(var(--outline-variant)/0.4)]"
            }`}
          >
            {t("nav.solutions")}
          </Link>

          {/* CV link */}
          <Link
            to="/cv"
            className={`hidden md:inline-flex px-4 py-2 text-xs font-label uppercase tracking-[0.15em] font-semibold ghost-border transition-all duration-300 ${
              location.pathname === "/cv"
                ? "text-primary border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:border-[hsl(var(--outline-variant)/0.4)]"
            }`}
          >
            CV
          </Link>

          {/* Book a Call — primary CTA */}
          <motion.a
            href="https://wa.me/201148627137"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px -5px hsl(184 100% 68% / 0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex px-5 py-2 text-xs font-label uppercase tracking-[0.15em] bg-primary text-primary-foreground font-semibold"
          >
            {t("nav.bookCall")}
          </motion.a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-px bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`w-5 h-px bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-px bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel px-6 py-6 space-y-4"
        >
          <Link
            to="/flowos"
            onClick={() => setMobileOpen(false)}
            className={`block w-full text-left font-label text-sm uppercase tracking-[0.1em] transition-colors ${
              location.pathname === "/flowos" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            FlowOS
          </Link>
          <Link
            to="/drivelead"
            onClick={() => setMobileOpen(false)}
            className={`block w-full text-left font-label text-sm uppercase tracking-[0.1em] transition-colors ${
              location.pathname === "/drivelead" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            DriveLead
          </Link>
          <Link
            to="/solutions"
            onClick={() => setMobileOpen(false)}
            className={`block w-full text-left font-label text-sm uppercase tracking-[0.1em] transition-colors ${
              isSolutions ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("nav.solutions")}
          </Link>
          <Link
            to="/cv"
            onClick={() => setMobileOpen(false)}
            className={`block w-full text-left font-label text-sm uppercase tracking-[0.1em] transition-colors ${
              location.pathname === "/cv" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            CV
          </Link>
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="block w-full text-left font-label text-sm uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
