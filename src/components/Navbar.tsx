import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WHATSAPP_URL } from "@/lib/contact";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t, toggle, lang, isAr } = useLanguage();

  const navItems = [
    { label: t("nav.services"), id: "services" },
    { label: t("nav.caseStudies"), id: "work" },
    { label: t("nav.process"), id: "process" },
    { label: t("nav.about"), id: "about" },
    { label: t("nav.products"), id: "products" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname, location.hash]);

  // On the homepage links are plain anchors; elsewhere they go back to the homepage section.
  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? "bg-background/90 backdrop-blur border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between gap-4" aria-label="Main">
        <Link to="/" className="font-headline text-lg font-semibold text-foreground">
          {isAr ? "محمد وحيد" : "Mohamed Waheed"}
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={hrefFor(item.id)} className="text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label={lang === "en" ? "التبديل للعربية" : "Switch to English"}
          >
            <Globe size={16} />
            <span>{lang === "en" ? "عربي" : "EN"}</span>
          </button>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <MessageCircle size={16} />
            {t("nav.bookCall")}
          </a>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="lg:hidden inline-flex w-10 h-10 items-center justify-center rounded-lg border border-border text-foreground"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-border bg-background px-5 pb-6 pt-2">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={hrefFor(item.id)}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-lg text-foreground border-b border-border"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={hrefFor("contact")} onClick={() => setMobileOpen(false)} className="block py-3 text-lg text-foreground">
                {t("nav.contact")}
              </a>
            </li>
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground"
          >
            <MessageCircle size={18} />
            {t("nav.bookCall")}
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
