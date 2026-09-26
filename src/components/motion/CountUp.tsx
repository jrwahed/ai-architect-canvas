import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const toLatin = (s: string) => s.replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));
const toArabic = (s: string) => s.replace(/\d/g, (d) => AR_DIGITS[Number(d)]);

// Counts the first number in `value` up from zero when it scrolls into view ("75%", "+60%", "١٢").
const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const usesArabic = /[٠-٩]/.test(value);
  const match = toLatin(value).match(/^(\D*)(\d+)(.*)$/s);
  const [shown, setShown] = useState(match && !reduce ? `${match[1]}0${match[3]}` : toLatin(value));

  useEffect(() => {
    if (!match || reduce || !inView) return;
    const target = Number(match[2]);
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(`${match[1]}${Math.round(v)}${match[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className} dir="auto">
      {match ? (usesArabic ? toArabic(shown) : shown) : value}
    </span>
  );
};

export default CountUp;
