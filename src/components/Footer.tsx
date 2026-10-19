"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SITE_CONTENT } from "@/content/site";
import Magnetic from "./Magnetic";
import { IconGitHub, IconArrowUpRight } from "./Icons";

interface GitHubRepo {
  name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
}

export default function Footer() {
  const [arrowRotated, setArrowRotated] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    // Optional bonus: fetch recently pushed repos, fails silently
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : { repos: [] }))
      .then((data) => {
        if (Array.isArray(data.repos) && data.repos.length > 0) {
          setRepos(data.repos.slice(0, 3));
        }
      })
      .catch(() => {
        // Fail silently
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fullName = "SHRUTI RAVIKUMAR";

  return (
    <footer className="relative w-full bg-[var(--band-cream)] pt-16 border-t border-[var(--umber)]/20 overflow-hidden">
      <div className="content-constraint flex flex-col justify-between">
        {/* Optional Recently Pushed Strip (if available) */}
        {repos.length > 0 && (
          <div className="mb-12 pb-8 border-b border-[var(--umber)]/15">
            <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-widest font-semibold text-[var(--umber)]/60">
              <IconGitHub className="w-3.5 h-3.5 text-[var(--bronze)]" />
              <span>Recently Active Repositories</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[var(--umber)]/5 border border-[var(--umber)]/15 hover:border-[var(--bronze)] transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-sm text-[var(--umber)] truncate">
                      {repo.name}
                    </span>
                    <IconArrowUpRight className="w-3.5 h-3.5 text-[var(--bronze)] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  {repo.description && (
                    <p className="text-xs text-[var(--umber)]/70 line-clamp-1 mb-2">
                      {repo.description}
                    </p>
                  )}
                  {repo.language && (
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--bronze)] font-semibold">
                      {repo.language}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Top Row: Copyright / Links / Back to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 border-b border-[var(--umber)]/20">
          {/* Left: Copyright */}
          <div className="text-sm font-semibold text-[var(--umber)]/80 order-2 md:order-1 text-center md:text-left">
            © 2026 Shruti Ravikumar. All rights reserved.
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-8 text-sm font-semibold text-[var(--umber)] order-1 md:order-2">
            <a
              href={SITE_CONTENT.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--plum)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
            >
              LinkedIn
            </a>
            <a
              href={SITE_CONTENT.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--plum)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
            >
              GitHub
            </a>
            <a
              href={`mailto:${SITE_CONTENT.personal.email}`}
              className="hover:text-[var(--plum)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
            >
              Email
            </a>
          </div>

          {/* Right: 56px Circular Back-to-Top Button */}
          <div className="order-3">
            <Magnetic strength={0.25} radius={60}>
              <button
                type="button"
                onClick={scrollToTop}
                onMouseEnter={() => setArrowRotated(true)}
                onMouseLeave={() => setArrowRotated(false)}
                aria-label="Back to top"
                className="w-14 h-14 rounded-full border border-[var(--umber)]/30 text-[var(--umber)] flex items-center justify-center hover:bg-[var(--plum)] hover:text-[var(--paper)] transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
              >
                <motion.span
                  animate={{ rotate: arrowRotated ? 360 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xl inline-block"
                >
                  ↑
                </motion.span>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Beneath: Giant Cropped Name with Wave Hover */}
        <div className="relative w-full overflow-hidden pt-8 select-none">
          <div className="flex justify-center whitespace-nowrap -mb-[3.5vw]">
            {fullName.split("").map((letter, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -24 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 24,
                }}
                className={`font-anton text-[15vw] leading-none uppercase tracking-tighter text-[var(--umber)] dark:text-[var(--paper)] inline-block transition-colors cursor-default ${
                  letter === " " ? "w-[4vw]" : ""
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
