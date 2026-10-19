"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroProps {
  onComplete?: () => void;
}

function subscribeIntro() {
  return () => {};
}

function getIntroSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return false;
  try {
    return !sessionStorage.getItem("intro-seen");
  } catch {
    return false;
  }
}

function getServerIntroSnapshot(): boolean {
  return false;
}

export default function Intro({ onComplete }: IntroProps) {
  const shouldShow = useSyncExternalStore(
    subscribeIntro,
    getIntroSnapshot,
    getServerIntroSnapshot
  );

  const [active, setActive] = useState(true);
  const [count, setCount] = useState(0);

  const finish = useCallback(() => {
    setActive(false);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("intro-seen", "true");
      } catch {}
    }
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!shouldShow || !active) {
      onComplete?.();
      return;
    }

    const startTime = performance.now();
    const duration = 1100;

    let rafId: number;
    const updateCounter = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (2 - progress) * 100);
      setCount(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(updateCounter);
      } else {
        setTimeout(finish, 100);
      }
    };
    rafId = requestAnimationFrame(updateCounter);

    const handleKeyDown = () => {
      finish();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldShow, active, finish, onComplete]);

  if (!shouldShow || !active) {
    return null;
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          onClick={finish}
          role="dialog"
          aria-label="Welcome intro"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[10001] bg-[var(--plum)] text-[var(--cream)] flex flex-col justify-between p-8 md:p-14 select-none cursor-pointer"
        >
          {/* Top subtle bar */}
          <div className="flex justify-between items-center text-xs text-[var(--paper)]/60 font-mono">
            <span>SR // PORTFOLIO</span>
            <span>SYSTEM INIT</span>
          </div>

          {/* Centered SR display */}
          <div className="flex items-center justify-center my-auto overflow-hidden">
            <div className="flex font-anton text-[22vw] leading-none tracking-tight text-[var(--cream)] select-none">
              <span className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ transform: "translate3d(0, 110%, 0)" }}
                  animate={{ transform: "translate3d(0, 0%, 0)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  S
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ transform: "translate3d(0, 110%, 0)" }}
                  animate={{ transform: "translate3d(0, 0%, 0)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  R
                </motion.span>
              </span>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="flex justify-between items-end text-sm text-[var(--paper)]">
            <div className="font-mono text-base tracking-widest">
              <span>{count < 10 ? `0${count}` : count}</span>
              <span className="opacity-40"> / 100</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-[var(--paper)]/60">
              Click or press Esc to skip
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
