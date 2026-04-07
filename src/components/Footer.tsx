import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative py-12 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-headline text-sm font-bold text-primary">
            MW
          </div>

          <p className="label-tech text-[10px] text-muted-foreground text-center">
            © {new Date().getFullYear()} Mohamed Waheed
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/moohamedwaheed/" },
              { label: "WhatsApp", href: "https://wa.me/201148627137" },
              { label: "Email", href: "mailto:moohamedwahed@gmail.com" },
              { label: "DriveLead", href: "/drivelead" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("/") ? undefined : "_blank"}
                rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
                whileHover={{ color: "hsl(184, 100%, 68%)" }}
                className="label-tech text-[10px] text-muted-foreground transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/5">
          <p className="text-[10px] text-muted-foreground/30 text-center leading-relaxed max-w-3xl mx-auto">
            {t("footer.seo")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
