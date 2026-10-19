"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const pointerQuery = window.matchMedia("(pointer: fine)");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  pointerQuery.addEventListener("change", callback);
  motionQuery.addEventListener("change", callback);

  return () => {
    pointerQuery.removeEventListener("change", callback);
    motionQuery.removeEventListener("change", callback);
  };
}

function getPointerSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return hasFinePointer && !prefersReducedMotion;
}

function getServerPointerSnapshot(): boolean {
  return false;
}

export default function Cursor() {
  const isEnabled = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );

  const [cursorType, setCursorType] = useState<
    "default" | "link" | "view" | "drag" | "hidden"
  >("default");
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 120, damping: 20 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isEnabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Inputs, textareas, contenteditable -> hide custom cursor, show native text caret
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        target.closest("input, textarea, [contenteditable]")
      ) {
        setCursorType("hidden");
        return;
      }

      // Check for custom cursor data attributes
      const viewTarget = target.closest('[data-cursor="view"]');
      if (viewTarget) {
        setCursorType("view");
        return;
      }

      const dragTarget = target.closest('[data-cursor="drag"]');
      if (dragTarget) {
        setCursorType("drag");
        return;
      }

      // Check for links and buttons
      const isInteractive = target.closest(
        'a, button, [role="button"], input[type="submit"]'
      );
      if (isInteractive) {
        setCursorType("link");
        return;
      }

      setCursorType("default");
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isEnabled, mouseX, mouseY]);

  if (!isEnabled || cursorType === "hidden") {
    return null;
  }

  let ringSize = 38;
  let ringClasses = "border border-[var(--bronze)] bg-transparent";
  let ringContent: React.ReactNode = null;
  const scale = isPressed ? 0.8 : 1;

  if (cursorType === "link") {
    ringSize = 38 * 1.8;
    ringClasses = "border border-[var(--bronze)] bg-[var(--mauve)]/25";
  } else if (cursorType === "view") {
    ringSize = 84;
    ringClasses =
      "bg-[var(--plum)] border border-[var(--paper)] text-[var(--paper)] font-anton tracking-wider text-xs flex items-center justify-center font-bold shadow-lg";
    ringContent = "VIEW";
  } else if (cursorType === "drag") {
    ringSize = 72;
    ringClasses =
      "bg-[var(--umber)] border border-[var(--bronze)] text-[var(--paper)] font-anton tracking-wider text-xs flex items-center justify-center font-bold shadow-lg";
    ringContent = "DRAG";
  }

  return (
    <>
      {/* Instant dot with difference mix-blend */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--cream)] pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          scale: cursorType === "view" || cursorType === "drag" ? 0 : 1,
        }}
      />

      {/* Lagging spring ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-colors duration-200 ${ringClasses}`}
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          scale,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        {ringContent}
      </motion.div>
    </>
  );
}
