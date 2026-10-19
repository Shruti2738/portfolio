"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "motion/react";
import { SITE_CONTENT } from "@/content/site";
import RevealLines from "./RevealLines";

function StatCounter({
  targetValue,
  label,
}: {
  targetValue: number;
  label: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const duration = 1400; // 1.4s

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic
      const current = Math.floor(
        (1 - Math.pow(1 - progress, 3)) * targetValue
      );
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(targetValue);
      }
    };

    requestAnimationFrame(step);
  }, [inView, targetValue]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-start cursor-pointer group py-2"
    >
      <motion.div
        animate={{ rotate: isHovered ? -3 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="font-anton text-6xl sm:text-[72px] text-[var(--umber)] dark:text-[var(--paper)] leading-none select-none"
      >
        {displayValue < 10 ? `0${displayValue}` : displayValue}
      </motion.div>
      <div className="relative mt-2 font-inter font-semibold text-sm text-[var(--umber)]/80 dark:text-[var(--paper)]/80">
        <span>{label}</span>
        {/* Bronze underline draws in from the left on hover */}
        <motion.span
          className="absolute -bottom-1 left-0 h-[3px] bg-[var(--bronze)]"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const monogramRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const springConfig = { stiffness: 120, damping: 20 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(
        window.innerWidth >= 900 &&
          window.matchMedia("(pointer: fine)").matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !monogramRef.current) return;
    const { left, top, width, height } =
      monogramRef.current.getBoundingClientRect();
    const xRel = (e.clientX - (left + width / 2)) / (width / 2);
    const yRel = (e.clientY - (top + height / 2)) / (height / 2);
    mouseX.set(xRel);
    mouseY.set(yRel);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Monogram 3D tilt: rotateX/Y up to 6°
  const rotateX = useTransform(mouseY, [-1, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [-1, 1], [-6, 6]);

  return (
    <section
      id="about"
      className="relative w-full border-t border-[var(--umber)]/20 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Half (6 cols desktop, --cream background) */}
        <div className="lg:col-span-6 bg-[var(--band-cream)] band-padding px-6 sm:px-12 lg:px-16 flex flex-col justify-center">
          <div className="w-12 h-1 bg-[var(--bronze)] mb-4" />
          <RevealLines
            as="h2"
            lines={["ABOUT ME"]}
            className="display-l text-[var(--umber)] dark:text-[var(--paper)] leading-none"
          />

          <p className="mt-8 text-base sm:text-lg leading-relaxed text-[var(--umber)]/90 dark:text-[var(--paper)]/90 max-w-[58ch]">
            {SITE_CONTENT.personal.profile}
          </p>

          {/* Stats Row */}
          <div className="mt-12 pt-8 border-t border-[var(--umber)]/25 dark:border-[var(--paper)]/25 grid grid-cols-3 gap-4 sm:gap-8">
            {SITE_CONTENT.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col ${
                  idx > 0
                    ? "border-l border-[var(--umber)]/25 dark:border-[var(--paper)]/25 pl-4 sm:pl-6"
                    : ""
                }`}
              >
                <StatCounter targetValue={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Half (6 cols desktop, --umber background, 3D Monogram) */}
        <div
          ref={monogramRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
          className="lg:col-span-6 bg-[var(--band-umber)] min-h-[320px] sm:min-h-[460px] lg:min-h-[520px] relative overflow-hidden flex items-center justify-center p-8 select-none"
        >
          {/* Drifting Floating Bronze Squares (16px, loops 8s) */}
          <motion.div
            animate={{
              x: [0, 24, -16, 0],
              y: [0, -32, 18, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-12 left-12 w-4 h-4 bg-[var(--bronze)] pointer-events-none z-20"
          />
          <motion.div
            animate={{
              x: [0, -20, 28, 0],
              y: [0, 36, -24, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-12 right-12 w-4 h-4 bg-[var(--bronze)] pointer-events-none z-20"
          />

          {/* Giant Distressed 3D Tilt SR Monogram */}
          <motion.div
            style={
              isDesktop
                ? {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }
                : undefined
            }
            className="relative flex items-center justify-center leading-none"
          >
            <span
              className="font-anton text-[40vw] lg:text-[22vw] text-[var(--plum)] tracking-tighter opacity-90 block leading-none select-none filter contrast-125"
              style={{
                textShadow: "0 0 40px rgba(94, 35, 60, 0.4)",
              }}
            >
              SR
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
