import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WHATSAPP_URL } from "@/lib/contact";

// Sticky call-to-action for phones, shown once the visitor scrolls past the hero.
const MobileCTABar = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex gap-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-3 py-3 text-[15px] font-semibold text-primary-foreground"
        >
          <MessageCircle size={17} className="shrink-0" />
          {t("hero.cta1")}
        </a>
        <a
          href="#contact"
          tabIndex={visible ? 0 : -1}
          className="flex items-center justify-center whitespace-nowrap rounded-xl border border-border px-3 py-3 text-[15px] font-semibold text-foreground"
        >
          {t("cta.mobileForm")}
        </a>
      </div>
    </div>
  );
};

export default MobileCTABar;
