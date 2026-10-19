"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectItem, SITE_CONTENT } from "@/content/site";
import { IconArrowUpRight, IconGitHub } from "./Icons";

interface ProjectDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectDrawer({
  project,
  onClose,
  onSelectProject,
}: ProjectDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const projects = SITE_CONTENT.projects;
  const currentIndex = project
    ? projects.findIndex((p) => p.id === project.id)
    : -1;

  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  useEffect(() => {
    if (project) {
      previousFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        } else if (e.key === "ArrowLeft") {
          onSelectProject(prevProject);
        } else if (e.key === "ArrowRight") {
          onSelectProject(nextProject);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
        if (previousFocus.current) {
          previousFocus.current.focus();
        }
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [project, onClose, onSelectProject, prevProject, nextProject]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9500] bg-[var(--umber)]/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details for ${project.title}`}
            initial={{ transform: "translate3d(100%, 0, 0)" }}
            animate={{ transform: "translate3d(0%, 0, 0)" }}
            exit={{ transform: "translate3d(100%, 0, 0)" }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
            }}
            className="fixed top-0 right-0 bottom-0 z-[9501] w-full max-w-[560px] bg-[var(--cream)] text-[var(--umber)] shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar with Index and 48px Close Button */}
            <div className="p-6 sm:p-8 flex items-center justify-between border-b border-[var(--umber)]/20">
              <div className="flex items-center gap-3">
                <span className="font-anton text-2xl text-[var(--bronze)]">
                  {project.index}
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider text-[var(--umber)]/70">
                  Project Dossier
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project dossier"
                className="w-12 h-12 rounded-full border border-[var(--umber)]/30 flex items-center justify-center hover:bg-[var(--plum)] hover:text-[var(--paper)] transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
              >
                <span className="text-2xl font-light leading-none">✕</span>
              </button>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-start">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--umber)]/10 text-[var(--umber)] border border-[var(--umber)]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-[var(--umber)] leading-tight mb-4">
                {project.title}
              </h2>

              {/* Summary */}
              <p className="text-base sm:text-lg leading-relaxed text-[var(--umber)]/90 mb-8 font-medium">
                {project.summary}
              </p>

              {/* Bullets Section */}
              <div className="space-y-4 pt-6 border-t border-[var(--umber)]/20 mb-8">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[var(--bronze)]">
                  System Architecture & Contributions
                </h4>
                <ul className="space-y-4">
                  {project.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-[var(--umber)]/90"
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--plum)] mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External Links (only rendered when they exist) */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--umber)]/20">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 px-6 bg-[var(--plum)] text-[var(--paper)] text-sm font-semibold flex items-center gap-2 hover:bg-[var(--bronze)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                    >
                      <span>Live Site</span>
                      <IconArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 px-6 border border-[var(--umber)] text-[var(--umber)] text-sm font-semibold flex items-center gap-2 hover:bg-[var(--umber)] hover:text-[var(--paper)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                    >
                      <IconGitHub className="w-4 h-4" />
                      <span>GitHub Repo</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Navigation: Prev / Next project */}
            <div className="p-6 sm:p-8 bg-[var(--umber)]/5 border-t border-[var(--umber)]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="flex items-center gap-2 text-sm font-semibold text-[var(--umber)] hover:text-[var(--plum)] transition-colors cursor-pointer"
              >
                <span>←</span>
                <span>{prevProject.title.split(":")[0]}</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="flex items-center gap-2 text-sm font-semibold text-[var(--umber)] hover:text-[var(--plum)] transition-colors cursor-pointer"
              >
                <span>{nextProject.title.split(":")[0]}</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
