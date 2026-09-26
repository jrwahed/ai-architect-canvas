import { useLanguage } from "@/contexts/LanguageContext";

const ProofStrip = () => {
  const { t } = useLanguage();
  const items = [1, 2, 3].map((n) => ({ value: t(`proof.${n}v`), label: t(`proof.${n}l`) }));

  return (
    <section aria-label="Proof" className="border-y border-border bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-5 md:px-8 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-border">
        {items.map((item) => (
          <div key={item.label} className="py-7 sm:px-8 first:sm:ps-0">
            <p className="font-headline tabular-nums text-3xl md:text-4xl font-medium text-foreground">
              <span className="inline-block" dir="auto">{item.value}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProofStrip;
