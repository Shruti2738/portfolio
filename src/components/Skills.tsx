"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE_CONTENT, SkillCategory } from "@/content/site";
import RevealLines from "./RevealLines";

export default function Skills() {
  const categories: SkillCategory[] = SITE_CONTENT.skillCategories;
  const [activeCategoryId, setActiveCategoryId] = useState(
    categories[0]?.id ?? ""
  );

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ??
    categories[0];

  if (!activeCategory) return null;

  return (
    <section
      id="skills"
      className="relative w-full border-t border-[var(--paper)]/15 bg-[var(--band-umber)] band-padding"
    >
      <div className="content-constraint">
        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--bronze)]">
          Skills
        </p>

        <span className="mb-4 block h-1 w-12 bg-[var(--bronze)]" />

        <RevealLines
          as="h2"
          lines={["SKILLS"]}
          className="display-l mb-6 leading-none text-[var(--paper)]"
        />

        <p className="mb-12 max-w-xl text-sm leading-relaxed text-[var(--paper)]/65 sm:text-base">
          Technologies, tools, and core concepts I use to build and explore.
        </p>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <nav
            aria-label="Skill categories"
            className="flex gap-2 overflow-x-auto border-b border-[var(--paper)]/15 pb-4 scrollbar-none lg:col-span-4 lg:flex-col lg:overflow-visible lg:border-b-0 lg:pb-0"
          >
            {categories.map((category, index) => {
              const isActive = category.id === activeCategoryId;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategoryId(category.id)}
                  aria-pressed={isActive}
                  className={`group flex shrink-0 items-center justify-between gap-4 border px-4 py-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)] lg:w-full lg:px-5 ${
                    isActive
                      ? "border-[var(--bronze)]/70 bg-[var(--plum)] text-[var(--paper)]"
                      : "border-[var(--paper)]/10 bg-transparent text-[var(--paper)]/55 hover:border-[var(--paper)]/30 hover:text-[var(--paper)]"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[var(--bronze)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-anton text-lg uppercase tracking-wide sm:text-xl">
                      {category.name}
                    </span>
                  </span>

                  <span
                    className={`text-lg transition-transform duration-300 ${
                      isActive
                        ? "translate-x-0 text-[var(--bronze)]"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                    }`}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="min-h-[360px] border border-[var(--paper)]/15 bg-[var(--paper)]/[0.025] p-4 sm:p-7 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--paper)]/15 pb-5">
                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--bronze)]">
                      Skill set
                    </p>
                    <h3 className="font-anton text-2xl uppercase leading-tight tracking-wide text-[var(--paper)] sm:text-3xl">
                      {activeCategory.name}
                    </h3>
                  </div>

                  <span className="shrink-0 font-mono text-xs text-[var(--paper)]/50">
                    {String(activeCategory.skills.length).padStart(2, "0")}{" "}
                    ITEMS
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {activeCategory.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: Math.min(index * 0.035, 0.25),
                      }}
                      className="group flex min-h-[76px] items-center justify-between gap-3 border border-[var(--paper)]/15 bg-[var(--umber)]/40 px-4 py-4 transition-colors duration-300 hover:border-[var(--bronze)]/70 hover:bg-[var(--plum)]/60"
                    >
                      <span className="font-inter text-sm font-medium leading-relaxed text-[var(--paper)] sm:text-base">
                        {skill.name}
                      </span>
                      <span
                        className="shrink-0 text-[var(--bronze)] opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </motion.div>
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