import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedWordsProps {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}

// Reveals a line word by word, each word sliding up from behind a mask.
// Visibility is observed on the whole line: the masked words themselves are clipped and never "intersect".
const AnimatedWords = ({ text, className = "", delay = 0, inView = false }: AnimatedWordsProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const show = inView ? seen : true;
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={show ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.7, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default AnimatedWords;
