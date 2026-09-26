import { Link } from "react-router-dom";
import { Workflow, Car, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TiltCard from "@/components/motion/TiltCard";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const ProductsSection = () => {
  const { t, isAr } = useLanguage();
  const Arrow = isAr ? ArrowUpLeft : ArrowUpRight;
  const products = [
    { name: "FlowOS", to: "/flowos", icon: Workflow, desc: t("products.flowos"), accent: "bg-primary text-primary-foreground" },
    { name: "DriveLead", to: "/drivelead", icon: Car, desc: t("products.drivelead"), accent: "bg-secondary text-secondary-foreground" },
  ];

  return (
    <section id="products" className="bg-cream text-ink rounded-b-[2rem] md:rounded-b-[2.5rem] py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader tone="light" label={t("products.label")} title={t("products.title")} />
        <div className="grid md:grid-cols-2 gap-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <TiltCard max={5} glow="255 106 31 / 0.16" className="rounded-[1.75rem] bg-ink text-cream">
                <Link to={p.to} className="flex min-h-[300px] flex-col p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className={`flex w-12 h-12 items-center justify-center rounded-2xl ${p.accent}`}>
                      <p.icon size={22} />
                    </span>
                    <span className="flex w-12 h-12 items-center justify-center rounded-full border border-cream/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                      <Arrow size={20} />
                    </span>
                  </div>
                  <h3 className="mt-auto pt-10 font-headline text-4xl md:text-5xl font-semibold">
                    <span className="inline-block" dir="ltr">
                      {p.name}
                    </span>
                  </h3>
                  <p className="mt-3 max-w-md text-cream/70 leading-relaxed">{p.desc}</p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
