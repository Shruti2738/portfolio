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
    fetch(
      "https://api.github.com/users/Shruti2738/repos?sort=pushed&per_page=4",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    )
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(
            data.slice(0, 3).map((repo) => ({
              name: repo.name,
              url: repo.html_url,
              description: repo.description,
              stars: repo.stargazers_count,
              language: repo.language,
            }))
          );
        }
      })
      .catch(() => {
        // Fail silently if GitHub is unavailable.
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fullName = "SHRUTI RAVIKUMAR";

  return (
    <footer className="relative w-full overflow-hidden border-t border-[#35251F]/20 bg-[#F3E9DC] pt-16 text-[#35251F] dark:border-[#F3E9DC]/20 dark:bg-[#35251F] dark:text-[#F3E9DC]">
      <div className="content-constraint flex flex-col justify-between">
        {/* Recently Active Repositories */}
        {repos.length > 0 && (
          <div className="mb-12 border-b border-[#35251F]/15 pb-8 dark:border-[#F3E9DC]/20">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5A463D] dark:text-[#F3E9DC]/75">
              <IconGitHub className="h-3.5 w-3.5 text-[#8A5B36] dark:text-[#D0A16B]" />
              <span>Recently Active Repositories</span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between border border-[#35251F]/15 bg-[#35251F]/5 p-4 transition-all hover:border-[#8A5B36] dark:border-[#F3E9DC]/20 dark:bg-[#F3E9DC]/5 dark:hover:border-[#D0A16B]"
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-[#35251F] dark:text-[#F3E9DC]">
                      {repo.name}
                    </span>

                    <IconArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#8A5B36] transition-transform group-hover:translate-x-0.5 dark:text-[#D0A16B]" />
                  </div>

                  {repo.description && (
                    <p className="mb-2 line-clamp-1 text-xs text-[#5A463D] dark:text-[#F3E9DC]/75">
                      {repo.description}
                    </p>
                  )}

                  {repo.language && (
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8A5B36] dark:text-[#D0A16B]">
                      {repo.language}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Copyright, Social Links and Back to Top */}
        <div className="flex flex-col items-center justify-between gap-8 border-b border-[#35251F]/20 pb-16 dark:border-[#F3E9DC]/20 md:flex-row">
          {/* Copyright */}
          <div className="order-2 text-center text-sm font-semibold text-[#5A463D] dark:text-[#F3E9DC]/80 md:order-1 md:text-left">
            © 2026 Shruti Ravikumar. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="order-1 flex items-center gap-8 text-sm font-semibold md:order-2">
            <a
              href={SITE_CONTENT.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#35251F] transition-colors hover:text-[#8A5B36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8A5B36] dark:text-[#F3E9DC] dark:hover:text-[#D0A16B] dark:focus-visible:outline-[#D0A16B]"
            >
              LinkedIn
            </a>

            <a
              href={SITE_CONTENT.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#35251F] transition-colors hover:text-[#8A5B36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8A5B36] dark:text-[#F3E9DC] dark:hover:text-[#D0A16B] dark:focus-visible:outline-[#D0A16B]"
            >
              GitHub
            </a>

            <a
              href={"mailto:" + SITE_CONTENT.personal.email}
              className="text-[#35251F] transition-colors hover:text-[#8A5B36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8A5B36] dark:text-[#F3E9DC] dark:hover:text-[#D0A16B] dark:focus-visible:outline-[#D0A16B]"
            >
              Email
            </a>
          </div>

          {/* Back to Top */}
          <div className="order-3">
            <Magnetic strength={0.25} radius={60}>
              <button
                type="button"
                onClick={scrollToTop}
                onMouseEnter={() => setArrowRotated(true)}
                onMouseLeave={() => setArrowRotated(false)}
                aria-label="Back to top"
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[#35251F]/30 text-[#35251F] transition-all hover:bg-[#65405D] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8A5B36] dark:border-[#F3E9DC]/40 dark:text-[#F3E9DC] dark:hover:bg-[#D0A16B] dark:hover:text-[#35251F] dark:focus-visible:outline-[#D0A16B]"
              >
                <motion.span
                  animate={{ rotate: arrowRotated ? 360 : 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-xl"
                >
                  ↑
                </motion.span>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Giant Cropped Name */}
        <div className="relative w-full select-none overflow-hidden pt-8">
          <div className="-mb-[3.5vw] flex justify-center whitespace-nowrap">
            {fullName.split("").map((letter, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -24 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 24,
                }}
                className={
                  "inline-block cursor-default font-anton text-[15vw] uppercase leading-none tracking-tighter text-[#35251F] transition-colors dark:text-[#F3E9DC] " +
                  (letter === " " ? "w-[4vw]" : "")
                }
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