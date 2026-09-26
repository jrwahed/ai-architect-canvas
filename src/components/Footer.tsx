import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT_EMAIL, LINKEDIN_URL, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/contact";

const Footer = () => {
  const { t, isAr } = useLanguage();

  const pageLinks = [
    { label: t("nav.services"), to: "/#services" },
    { label: t("nav.caseStudies"), to: "/#work" },
    { label: t("nav.process"), to: "/#process" },
    { label: t("nav.solutions"), to: "/solutions" },
    { label: "FlowOS", to: "/flowos" },
    { label: "DriveLead", to: "/drivelead" },
    { label: "CV", to: "/cv" },
  ];

  return (
    <footer className="border-t border-border bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-headline text-lg font-semibold text-foreground">{isAr ? "محمد وحيد" : "Mohamed Waheed"}</p>
          <p className="mt-2 max-w-xs text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">{t("footer.explore")}</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">{t("footer.contact")}</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                WhatsApp · <span dir="ltr">+{WHATSAPP_NUMBER}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground transition-colors break-all">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </li>
            <li>{t("footer.location")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 md:px-8 py-5 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {isAr ? "محمد وحيد" : "Mohamed Waheed"}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
