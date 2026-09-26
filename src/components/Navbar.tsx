import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X, MessageCircle, ChevronDown, Workflow, Car, UserRound, ListOrdered, FileText, LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WHATSAPP_URL } from "@/lib/contact";

interface NavLinkItem {
  label: string;
  href: string;
  // Routes are separate pages; everything else is a section of the homepage.
  route?: boolean;
  desc?: string;
  icon?: LucideIcon;
}

interface NavGroup {
  label: string;
  children: NavLinkItem[];
}

type NavEntry = NavLinkItem | NavGroup;

const isGroup = (entry: NavEntry): entry is NavGroup => "children" in entry;

const NavTarget = ({ item, className, onClick, children }: { item: NavLinkItem; className: string; onClick?: () => void; children: React.ReactNode }) =>
  item.route ? (
    <Link to={item.href} className={className} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <a href={item.href} className={className} onClick={onClick}>
      {children}
    </a>
  );

const Dropdown = ({ group, active }: { group: NavGroup; active: boolean }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`inline-flex items-center gap-1 text-[15px] transition-colors ${
          active || open ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {group.label}
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {active && <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />}
      </button>

      <AnimatePresence>
        {open && (
          // The top padding bridges the gap so the menu stays open while the mouse moves into it.
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
          >
            <ul className="w-80 rounded-2xl border border-border bg-surface-container p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
              {group.children.map((child) => (
                <li key={child.href}>
                  <NavTarget item={child} className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-container-high">
                    {child.icon && (
                      <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <child.icon size={18} />
                      </span>
                    )}
                    <span>
                      <span className="block font-semibold text-foreground">{child.label}</span>
                      {child.desc && <span className="mt-0.5 block text-sm text-muted-foreground">{child.desc}</span>}
                    </span>
                  </NavTarget>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t, toggle, lang, isAr } = useLanguage();

  // On the homepage section links are plain anchors; elsewhere they go back to the homepage section.
  const section = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const entries: NavEntry[] = [
    { label: t("nav.services"), href: section("services") },
    { label: t("nav.solutions"), href: "/solutions", route: true },
    { label: t("nav.caseStudies"), href: section("work") },
    {
      label: t("nav.products"),
      children: [
        { label: "FlowOS", href: "/flowos", route: true, desc: t("nav.flowosDesc"), icon: Workflow },
        { label: "DriveLead", href: "/drivelead", route: true, desc: t("nav.driveleadDesc"), icon: Car },
      ],
    },
    {
      label: t("nav.about"),
      children: [
        { label: t("nav.whyMe"), href: section("about"), desc: t("nav.whyMeDesc"), icon: UserRound },
        { label: t("nav.process"), href: section("process"), desc: t("nav.processDesc"), icon: ListOrdered },
        { label: t("nav.cv"), href: "/cv", route: true, desc: t("nav.cvDesc"), icon: FileText },
      ],
    },
  ];

  const isActive = (item: NavLinkItem) => !!item.route && location.pathname === item.href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname, location.hash]);

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
          {entries.map((entry) =>
            isGroup(entry) ? (
              <Dropdown key={entry.label} group={entry} active={entry.children.some(isActive)} />
            ) : (
              <li key={entry.href} className="relative">
                <NavTarget
                  item={entry}
                  className={`text-[15px] transition-colors ${
                    isActive(entry) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {entry.label}
                </NavTarget>
                {isActive(entry) && <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />}
              </li>
            ),
          )}
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
        <div
          id="mobile-menu"
          className="lg:hidden max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 pt-2"
        >
          {entries.map((entry) =>
            isGroup(entry) ? (
              <div key={entry.label} className="border-b border-border py-3">
                <p className="pb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{entry.label}</p>
                <ul>
                  {entry.children.map((child) => (
                    <li key={child.href}>
                      <NavTarget
                        item={child}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-xl py-2.5"
                      >
                        {child.icon && (
                          <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <child.icon size={18} />
                          </span>
                        )}
                        <span>
                          <span className={`block text-lg ${isActive(child) ? "text-primary" : "text-foreground"}`}>{child.label}</span>
                          {child.desc && <span className="block text-sm text-muted-foreground">{child.desc}</span>}
                        </span>
                      </NavTarget>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavTarget
                key={entry.href}
                item={entry}
                onClick={() => setMobileOpen(false)}
                className={`block border-b border-border py-3 text-lg ${isActive(entry) ? "text-primary" : "text-foreground"}`}
              >
                {entry.label}
              </NavTarget>
            ),
          )}
          <a href={section("contact")} onClick={() => setMobileOpen(false)} className="block py-3 text-lg text-foreground">
            {t("nav.contact")}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground"
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
