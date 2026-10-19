"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { SITE_CONTENT, PathItem } from "@/content/site";
import RevealLines from "./RevealLines";
import { IconArrowUpRight } from "./Icons";

function PathNodeCard({
  item,
  isLeft,
}: {
  item: PathItem;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-16 last:mb-0 w-full ${
        isLeft ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* Content Block (Occupies half width on desktop) */}
      <div
        className={`w-full lg:w-1/2 pl-12 lg:pl-0 ${
          isLeft ? "lg:pr-14 lg:text-right" : "lg:pl-14 lg:text-left"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, transform: isLeft ? "translate3d(-20px, 0, 0)" : "translate3d(20px, 0, 0)" }}
          animate={
            isInView
              ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
              : undefined
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 bg-[var(--paper)]/40 border border-[var(--ink)]/15 flex flex-col"
        >
          <div
            className={`flex items-center gap-2 mb-2 ${
              isLeft ? "lg:justify-end" : "lg:justify-start"
            }`}
          >
            <span className="font-mono text-xs uppercase font-bold text-[var(--ink)]/70 px-2.5 py-0.5 rounded-full bg-[var(--ink)]/10">
              {item.period}
            </span>
          </div>

          <h3 className="font-anton text-2xl uppercase tracking-tight text-[var(--ink)] mb-1">
            {item.title}
          </h3>

          <span className="font-inter font-semibold text-sm text-[var(--ink)]/80 mb-3 block">
            {item.institution}
          </span>

          {item.description && (
            <p className="text-sm leading-relaxed text-[var(--ink)]/85 mb-4">
              {item.description}
            </p>
          )}

          {item.link && (
            <div
              className={`mt-2 ${
                isLeft ? "lg:flex lg:justify-end" : "lg:flex lg:justify-start"
              }`}
            >
              <a
                href={item.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--plum)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
              >
                <span>{item.link.label}</span>
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </motion.div>
      </div>

      {/* 16px Filled Center Node that scales in */}
      <div className="absolute left-3 lg:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="w-4 h-4 rounded-full bg-[var(--ink)] border-2 border-[var(--mauve)] shadow-sm"
        />
      </div>
    </div>
  );
}

export default function Path() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathItems = SITE_CONTENT.path;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="path"
      className="relative w-full bg-[var(--band-mauve)] band-padding border-t border-[var(--ink)]/20"
    >
      <div className="content-constraint">
        <div className="w-12 h-1 bg-[var(--ink)] mb-4" />
        <RevealLines
          as="h2"
          lines={["PATH"]}
          className="display-l text-[var(--ink)] leading-none mb-16"
        />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full">
          {/* Vertical Self-Drawing SVG Line */}
          {/* Desktop: Centered, Mobile: Left 12px */}
          <div className="absolute top-0 bottom-0 left-3 lg:left-1/2 -translate-x-1/2 w-[3px] pointer-events-none">
            {/* Background track line */}
            <div className="absolute inset-0 bg-[var(--ink)]/20 w-full" />
            {/* Scroll-drawing line */}
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute top-0 left-0 w-full h-full bg-[var(--ink)] origin-top"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="relative z-10 flex flex-col">
            {pathItems.map((item, idx) => (
              <PathNodeCard
                key={item.id}
                item={item}
                isLeft={idx % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
