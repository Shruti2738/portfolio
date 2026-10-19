"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { SITE_CONTENT, SkillCategory } from "@/content/site";
import RevealLines from "./RevealLines";

function TerminalStrip() {
  const [typedText, setTypedText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const fullText = "$ shruti --skills --list";

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isInView, fullText]);

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--plum)] border border-[var(--bronze)]/50 text-[var(--paper)] font-mono text-xs sm:text-sm mb-10 select-none"
    >
      <span className="text-[var(--cream)]">{typedText}</span>
      <span className="w-2 h-4 bg-[var(--bronze)] inline-block animate-pulse" />
    </div>
  );
}

function SkillRow({
  name,
  level,
  percentage,
  delay,
}: {
  name: string;
  level: "Core" | "Working" | "Learning";
  percentage: number;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, transform: "translate3d(0, 12px, 0)" }}
      animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-4 transition-colors duration-200 border-b border-[var(--paper)]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-default ${
        isHovered ? "bg-[var(--paper)]/[0.06]" : "bg-transparent"
      }`}
    >
      {/* Skill Name */}
      <span className="font-inter font-semibold text-lg text-[var(--paper)] min-w-[200px]">
        {name}
      </span>

      {/* Bar Track + Level Label */}
      <div className="flex-1 flex items-center gap-4 max-w-md w-full">
        <div className="relative flex-1 h-[6px] bg-[var(--paper)]/15 overflow-hidden rounded-none">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-[var(--bronze)] relative"
          >
            {/* Shimmer effect on hover */}
            {isHovered && (
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--paper)]/40 to-transparent"
              />
            )}
          </motion.div>
        </div>

        {/* Level Label without percentages */}
        <span
          className={`text-xs uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full ${
            level === "Core"
              ? "bg-[var(--bronze)]/30 text-[var(--cream)] border border-[var(--bronze)]"
              : level === "Working"
              ? "bg-[var(--paper)]/10 text-[var(--paper)]/80 border border-[var(--paper)]/20"
              : "bg-[var(--plum)]/40 text-[var(--mauve)] border border-[var(--plum)]"
          }`}
        >
          {level}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const categories: SkillCategory[] = SITE_CONTENT.skillCategories;
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) || categories[0];

  return (
    <section
      id="skills"
      className="relative w-full bg-[var(--band-umber)] band-padding border-t border-[var(--paper)]/15"
    >
      <div className="content-constraint">
        <div className="w-12 h-1 bg-[var(--bronze)] mb-4" />
        <RevealLines
          as="h2"
          lines={["SKILLS"]}
          className="display-l text-[var(--paper)] leading-none mb-6"
        />

        {/* Terminal Strip */}
        <TerminalStrip />

        {/* Desktop 2-Panel Layout / Mobile Pill Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Vertical Tabs (Desktop 4 cols) */}
          <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 border-[var(--paper)]/15">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryId(cat.id)}
                  className="relative text-left py-3 px-4 lg:px-6 transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal flex items-center justify-between group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                >
                  {/* Sliding 4px Bronze Bar via shared layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="skills-tab-indicator"
                      className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-[var(--bronze)]"
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 24,
                      }}
                    />
                  )}

                  <span
                    className={`font-anton text-xl sm:text-2xl lg:text-[28px] uppercase tracking-wide transition-all ${
                      isActive
                        ? "text-[var(--paper)] opacity-100"
                        : "text-[var(--paper)] opacity-45 hover:opacity-75"
                    }`}
                  >
                    {cat.name}
                  </span>

                  {/* Mobile active indicator pill */}
                  {isActive && (
                    <span className="lg:hidden ml-2 w-2 h-2 rounded-full bg-[var(--bronze)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Group Panel (8 cols) */}
          <div className="lg:col-span-8 bg-[var(--band-umber)]/80 p-2 sm:p-6 border border-[var(--paper)]/15 min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <div className="pb-4 mb-2 border-b border-[var(--paper)]/20 flex items-center justify-between">
                  <h3 className="font-anton text-2xl uppercase tracking-tight text-[var(--paper)]">
                    {activeCategory.name}
                  </h3>
                  <span className="text-xs font-mono uppercase text-[var(--paper)]/60">
                    {activeCategory.skills.length} modules
                  </span>
                </div>

                <div className="flex flex-col">
                  {activeCategory.skills.map((skill, idx) => (
                    <SkillRow
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      percentage={skill.percentage}
                      delay={idx * 0.04}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
