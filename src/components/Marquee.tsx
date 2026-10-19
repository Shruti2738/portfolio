"use client";

import { useRef, useEffect, useState, useSyncExternalStore } from "react";
import { SITE_CONTENT } from "@/content/site";

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerMotionSnapshot(): boolean {
  return false;
}

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getServerMotionSnapshot
  );

  const scrollVelocity = useRef(1);
  const lastScrollY = useRef(0);
  const positionX = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      // Scroll direction: down -> forward, up -> backward
      if (Math.abs(delta) > 0.5) {
        const targetVelocity =
          delta > 0
            ? 1 + Math.min(Math.abs(delta) * 0.05, 4)
            : -(1 + Math.min(Math.abs(delta) * 0.05, 4));
        scrollVelocity.current = targetVelocity;
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId: number;
    let currentSpeed = 1;

    const animate = () => {
      if (containerRef.current) {
        // Return velocity smoothly towards base direction (+1)
        if (scrollVelocity.current > 1) {
          scrollVelocity.current += (1 - scrollVelocity.current) * 0.04;
        } else if (scrollVelocity.current < -1) {
          scrollVelocity.current += (-1 - scrollVelocity.current) * 0.04;
        }

        // If hovered, ease speed to 0 over ~0.4s
        const targetSpeed = isHovered ? 0 : scrollVelocity.current;
        currentSpeed += (targetSpeed - currentSpeed) * 0.08;

        positionX.current -= currentSpeed * 0.8;

        const loopWidth = containerRef.current.scrollWidth / 2;
        if (loopWidth > 0) {
          if (positionX.current <= -loopWidth) {
            positionX.current += loopWidth;
          } else if (positionX.current >= 0) {
            positionX.current -= loopWidth;
          }
        }

        containerRef.current.style.transform = `translate3d(${positionX.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isHovered, prefersReducedMotion]);

  const items = SITE_CONTENT.marqueeItems;
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <section
      aria-label="Core Engineering Domains"
      className="relative w-full h-[72px] bg-[var(--plum)] border-y border-[var(--bronze)]/30 overflow-hidden flex items-center select-none"
    >
      {/* Screen reader only list */}
      <ul className="sr-only">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Marquee Content */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-hidden="true"
        className={`flex items-center gap-8 whitespace-nowrap will-change-transform ${
          prefersReducedMotion ? "justify-around w-full" : ""
        }`}
      >
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <span className="font-anton text-3xl sm:text-[40px] uppercase text-[var(--paper)] tracking-wide leading-none">
              {item}
            </span>
            <span className="w-3 h-3 bg-[var(--bronze)] inline-block flex-shrink-0 rotate-45" />
          </div>
        ))}
      </div>
    </section>
  );
}
