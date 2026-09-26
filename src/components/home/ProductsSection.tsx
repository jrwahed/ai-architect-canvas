import { Link } from "react-router-dom";
import { Workflow, Car, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const ProductsSection = () => {
  const { t, isAr } = useLanguage();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const products = [
    { name: "FlowOS", to: "/flowos", icon: Workflow, desc: t("products.flowos") },
    { name: "DriveLead", to: "/drivelead", icon: Car, desc: t("products.drivelead") },
  ];

  return (
    <section id="products" className="py-20 md:py-28 bg-surface-container-low border-y border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={t("products.label")} title={t("products.title")} />
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <Link
                to={p.to}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface-container p-6 md:p-7 transition-colors hover:border-primary/50"
              >
                <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon size={22} />
                </span>
                <h3 className="mt-5 font-headline text-2xl font-semibold text-foreground">
                  <span className="inline-block" dir="auto">{p.name}</span>
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{p.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                  {t("products.cta")}
                  <Arrow size={18} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
