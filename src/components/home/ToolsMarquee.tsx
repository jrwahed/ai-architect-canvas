import { useLanguage } from "@/contexts/LanguageContext";
import Marquee from "@/components/motion/Marquee";

// Tools listed on the CV page ("Tools I build with").
const TOOLS = [
  "n8n",
  "OpenAI API",
  "AI Agents",
  "RAG",
  "WhatsApp",
  "HubSpot",
  "Zoho CRM",
  "Make",
  "Zapier",
  "Meta Ads",
  "Google Ads",
  "GA4",
  "Looker Studio",
  "Google Sheets",
];

const ToolsMarquee = () => {
  const { t } = useLanguage();
  return (
    <section aria-label={t("marquee.label")} className="bg-background py-8 md:py-10">
      <p className="mb-5 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {t("marquee.label")}
      </p>
      <Marquee className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {TOOLS.map((tool) => (
          <span key={tool} className="flex items-center gap-10 whitespace-nowrap font-headline text-2xl md:text-3xl font-medium text-foreground/60">
            {tool}
            <span className="text-primary text-lg" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
};

export default ToolsMarquee;
