"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import { SITE_CONTENT, PathItem } from "@/content/site";
import RevealLines from "./RevealLines";
import { IconArrowUpRight } from "./Icons";

function PathNodeCard({
  item,
  index,
  isLeft,
}: {
  item: PathItem;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative mb-10 flex w-full last:mb-0 ${
        isLeft ? "lg:justify-start" : "lg:justify-end"
      }`}
    >
      <div className="relative w-full pl-10 lg:w-[calc(50%-36px)] lg:pl-0">
        <motion.article
          initial={{
            opacity: 0,
            y: 20,
            x: isLeft ? -12 : 12,
          }}
          animate={
            isInView
              ? { opacity: 1, y: 0, x: 0 }
              : { opacity: 0, y: 20, x: isLeft ? -12 : 12 }
          }
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative overflow-hidden border border-[var(--ink)]/15 bg-[var(--paper)]/60 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ink)]/30 hover:bg-[var(--paper)]/80 hover:shadow-lg sm:p-7"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-[var(--ink)]/15 transition-colors duration-300 group-hover:bg-[var(--ink)]" />

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 border border-[var(--ink)]/15 bg-[var(--ink)]/[0.04] px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--ink)]/75">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ink)]/60" />
              {item.period}
            </span>

            <span className="font-mono text-xs text-[var(--ink)]/40">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mb-2 font-anton text-xl uppercase leading-tight tracking-wide text-[var(--ink)] sm:text-2xl">
            {item.title}
          </h3>

          <p className="mb-4 text-sm font-semibold leading-relaxed text-[var(--ink)]/75">
            {item.institution}
          </p>

          {item.description && (
            <p className="whitespace-pre-line text-sm leading-7 text-[var(--ink)]/80">
              {item.description}
            </p>
          )}

          {item.id === "btech" && (
            <div className="mt-6 border-t border-[var(--ink)]/15 pt-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="font-anton text-sm uppercase tracking-wider text-[var(--ink)]">
                  CSE Core Knowledge
                </h4>
                <span className="font-mono text-xs text-[var(--ink)]/55">
                  8 MODULES
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { name: "Data Structures & Algorithms", status: "Core" },
                  { name: "Object-Oriented Programming", status: "Core" },
                  { name: "Introduction to AI", status: "Core" },
                  { name: "Design & Analysis of Algorithms", status: "Working" },
                  { name: "Database Systems Design", status: "Working" },
                  { name: "Discrete Structures", status: "Working" },
                  { name: "Digital Systems Design", status: "Working" },
                  { name: "Computing Paradigms", status: "Working" },
                ].map((module) => (
                  <div
                    key={module.name}
                    className="flex min-h-[64px] items-center justify-between gap-2 border border-[var(--ink)]/15 bg-[var(--paper)]/50 px-3 py-3"
                  >
                    <span className="text-xs font-medium leading-relaxed text-[var(--ink)] sm:text-sm">
                      {module.name}
                    </span>
                    <span
                      className={`shrink-0 border px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${
                        module.status === "Core"
                          ? "border-[var(--ink)]/25 bg-[var(--ink)]/10 text-[var(--ink)]"
                          : "border-[var(--ink)]/15 text-[var(--ink)]/60"
                      }`}
                    >
                      {module.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.link && (
            <div className="mt-5">
              <a
                href={item.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--ink)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--paper)] transition-colors hover:bg-[var(--plum)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
              >
                <span>{item.link.label}</span>
                <IconArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </motion.article>
      </div>

      <div className="absolute left-3 top-7 z-10 flex -translate-x-1/2 items-center justify-center lg:left-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 22,
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--ink)]/30 bg-[var(--band-mauve)] shadow-sm"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink)]" />
        </motion.div>
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
      className="relative w-full border-t border-[var(--ink)]/20 bg-[var(--band-mauve)] band-padding"
    >
      <div className="content-constraint">
        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink)]/65">
          About
        </p>

        <span className="mb-4 block h-1 w-12 bg-[var(--ink)]" />

        <RevealLines
          as="h2"
          lines={["PATH"]}
          className="display-l mb-6 leading-none text-[var(--ink)]"
        />

        <p className="mb-16 max-w-xl text-sm leading-relaxed text-[var(--ink)]/70 sm:text-base">
          Education, milestones, and experiences shaping my path in technology.
        </p>

        <div ref={containerRef} className="relative w-full">
          <div className="pointer-events-none absolute bottom-0 left-3 top-0 w-[2px] -translate-x-1/2 lg:left-1/2">
            <div className="absolute inset-0 bg-[var(--ink)]/15" />
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute left-0 top-0 h-full w-full origin-top bg-[var(--ink)]/70"
            />
          </div>

          <div className="relative z-10 flex flex-col">
            {pathItems.map((item, index) => (
              <PathNodeCard
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}