import { ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { usePointerMotion } from "./usePointerFine";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  glow?: string;
}

// Tilts in 3D toward the cursor and lights a spotlight under it.
const TiltCard = ({ children, className = "", max = 6, glow = "255 255 255 / 0.10" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = usePointerMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgb(${glow}), transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`group relative ${className}`}
    >
      {enabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default TiltCard;
