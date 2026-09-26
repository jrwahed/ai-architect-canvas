import Reveal from "./Reveal";

interface SectionHeaderProps {
  label: string;
  title: string;
  sub?: string;
}

const SectionHeader = ({ label, title, sub }: SectionHeaderProps) => (
  <Reveal className="max-w-3xl mb-10 md:mb-14">
    <p className="text-sm font-medium text-primary mb-3">{label}</p>
    <h2 className="font-headline text-3xl md:text-[2.5rem] font-semibold leading-tight tracking-tight text-foreground text-balance">
      {title}
    </h2>
    {sub && <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">{sub}</p>}
  </Reveal>
);

export default SectionHeader;
