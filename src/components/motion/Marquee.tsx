import { ReactNode } from "react";

// Infinite horizontal strip; content is duplicated so the loop is seamless.
const Marquee = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`relative flex overflow-hidden ${className}`} dir="ltr">
    {[0, 1].map((copy) => (
      <div
        key={copy}
        aria-hidden={copy === 1}
        className="flex shrink-0 items-center gap-10 pe-10 motion-safe:animate-marquee"
      >
        {children}
      </div>
    ))}
  </div>
);

export default Marquee;
