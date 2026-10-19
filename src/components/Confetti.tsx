"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { showToast } from "./Toast";

export const PALETTE_COLORS = [
  "#CDBF98", // cream
  "#5E233C", // plum
  "#533B26", // umber
  "#886945", // bronze
  "#525844", // olive
  "#AB8C99", // mauve
];

export function firePaletteConfetti() {
  const duration = 1200;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 70,
      origin: { x: 0.2, y: 0.6 },
      colors: PALETTE_COLORS,
      disableForReducedMotion: true,
      zIndex: 10002,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 70,
      origin: { x: 0.8, y: 0.6 },
      colors: PALETTE_COLORS,
      disableForReducedMotion: true,
      zIndex: 10002,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export default function EasterEggListener() {
  const keyBuffer = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes inside form fields
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;

      keyBuffer.current.push(key);
      if (keyBuffer.current.length > 4) {
        keyBuffer.current.shift();
      }

      if (keyBuffer.current.join("") === "hire") {
        keyBuffer.current = [];
        firePaletteConfetti();

        showToast("Let's talk. Scroll to contact.", {
          label: "Contact",
          onClick: () => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              const topOffset =
                contactSection.getBoundingClientRect().top +
                window.scrollY -
                96;
              window.scrollTo({ top: topOffset, behavior: "smooth" });
            }
          },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
