import { Link } from "react-router-dom";
import { PlayCircle, GraduationCap, Plug, ArrowLeft, ArrowRight } from "lucide-react";
import mohamedPhoto from "@/assets/mohamed-waheed.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const WhyMeSection = () => {
  const { t, isAr } = useLanguage();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const points = [
    { icon: PlayCircle, text: t("why.p1") },
    { icon: GraduationCap, text: t("why.p2") },
    { icon: Plug, text: t("why.p3") },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-surface-container-low border-y border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <Reveal className="md:col-span-5">
          <img
            src={mohamedPhoto}
            alt={isAr ? "محمد وحيد" : "Mohamed Waheed"}
            loading="lazy"
            className="w-full max-w-sm mx-auto aspect-square rounded-2xl object-cover object-[50%_20%] border border-border"
          />
        </Reveal>

        <div className="md:col-span-7">
          <SectionHeader label={t("why.label")} title={t("why.title")} sub={t("why.body")} />
          <ul className="-mt-4 space-y-3">
            {points.map((p) => (
              <li key={p.text} className="flex items-start gap-3 text-foreground">
                <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon size={17} />
                </span>
                <span className="pt-1">{p.text}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/cv"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4"
          >
            {t("why.cv")}
            <Arrow size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
