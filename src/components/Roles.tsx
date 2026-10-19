"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SITE_CONTENT } from "@/content/site";
import RevealLines from "./RevealLines";
import ImageWithFallback from "./ImageFallback";
import { IconArrowUpRight } from "./Icons";

export default function Roles() {
  const [openId, setOpenId] = useState<string | null>("auv-society");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const positions = SITE_CONTENT.positions;

  return (
    <section
      id="roles"
      className="relative w-full bg-[var(--band-cream)] band-padding border-t border-[var(--umber)]/20"
    >
      <div className="content-constraint">
        <div className="w-12 h-1 bg-[var(--bronze)] mb-4" />
        <RevealLines
          as="h2"
          lines={["ROLES OF", "RESPONSIBILITY"]}
          className="display-l text-[var(--umber)] dark:text-[var(--paper)] leading-none mb-12"
        />

        <div className="flex flex-col border-t border-[var(--umber)]/25 dark:border-[var(--paper)]/25">
          {positions.map((pos) => {
            const isOpen = openId === pos.id;
            const isHovered = hoveredId === pos.id;

            return (
              <div
                key={pos.id}
                className="relative border-b border-[var(--umber)]/25 dark:border-[var(--paper)]/25 transition-colors overflow-hidden"
              >
                {/* Hover Plum Fill Sweep with clip-path (0.45s) */}
                <div
                  className={`absolute inset-0 bg-[var(--plum)] pointer-events-none transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isHovered ? "clip-path-full" : "clip-path-zero"
                  }`}
                  style={{
                    clipPath: isHovered
                      ? "inset(0 0 0 0)"
                      : "inset(0 100% 0 0)",
                  }}
                />

                {/* Interactive Header Row */}
                <button
                  type="button"
                  onClick={() => toggleRow(pos.id)}
                  onMouseEnter={() => setHoveredId(pos.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-expanded={isOpen}
                  aria-controls={`role-content-${pos.id}`}
                  className="relative z-10 w-full py-9 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                >
                  {/* Left: Role Title in Display M */}
                  <span
                    className={`display-m transition-colors duration-300 ${
                      isHovered
                        ? "text-[var(--paper)]"
                        : "text-[var(--umber)] dark:text-[var(--paper)]"
                    }`}
                  >
                    {pos.role}
                  </span>

                  {/* Right: Org & Rotating Plus Icon */}
                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <span
                      className={`font-inter font-semibold text-base sm:text-lg transition-colors duration-300 ${
                        isHovered
                          ? "text-[var(--cream)]"
                          : "text-[var(--umber)]/80 dark:text-[var(--paper)]/80"
                      }`}
                    >
                      {pos.org}
                    </span>

                    <span
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "border-[var(--paper)]/40 text-[var(--paper)]"
                          : "border-[var(--umber)]/30 dark:border-[var(--paper)]/30 text-[var(--umber)] dark:text-[var(--paper)]"
                      }`}
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 24,
                        }}
                        className="font-light text-2xl leading-none select-none"
                      >
                        +
                      </motion.span>
                    </span>
                  </div>
                </button>

                {/* Accordion Content Panel (Height animation 0.5s) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`role-content-${pos.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.35, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-9 pt-2 text-[var(--umber)] dark:text-[var(--paper)]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          <div
                            className={
                              pos.image ? "lg:col-span-8" : "lg:col-span-12"
                            }
                          >
                            <ul className="space-y-3">
                              {pos.bullets.map((bullet, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3 text-base sm:text-lg leading-relaxed text-[var(--umber)]/90 dark:text-[var(--paper)]/90"
                                >
                                  <span className="w-2 h-2 rounded-full bg-[var(--bronze)] mt-2.5 flex-shrink-0" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>

                            {pos.repoUrl && (
                              <div className="mt-6">
                                <a
                                  href={pos.repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--plum)] text-[var(--paper)] text-sm font-semibold hover:bg-[var(--bronze)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                                >
                                  <span>View AUV-Tasks repo</span>
                                  <IconArrowUpRight className="w-4 h-4" />
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Photo Right if present (e.g. Row 3: school.jpg) */}
                          {pos.image && (
                            <div className="lg:col-span-4 relative aspect-[4/3] bg-[var(--umber)] overflow-hidden">
                              <ImageWithFallback
                                src={pos.image}
                                alt="The Outreach Club initiatives at Abu Dhabi Indian School"
                                fill
                                className="object-cover"
                                fallbackBg="var(--plum)"
                                fallbackColor="var(--paper)"
                                fallbackText="The Outreach Club"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
