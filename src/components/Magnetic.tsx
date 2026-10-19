"use client";

import { useRef } from "react";
import { motion, useSpring } from "motion/react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // max offset percentage (default 0.28)
  radius?: number; // activation distance in px (default 80)
}

export default function Magnetic({
  children,
  className = "",
  strength = 0.28,
  radius = 80,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 220, damping: 24 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    ) {
      return;
    }
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
