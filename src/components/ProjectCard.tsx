"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { ProjectItem } from "@/content/site";
import {
  VisualCvePatcher,
  VisualAura,
  VisualUpTimeX,
  VisualPitWall,
} from "./ProjectVisuals";
import { IconArrowUpRight, IconGitHub } from "./Icons";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDrawer: (project: ProjectItem) => void;
  className?: string;
}

export default function ProjectCard({
  project,
  onOpenDrawer,
  className = "",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt spring config
  const springConfig = { stiffness: 220, damping: 24 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Glare position
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice() || !cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const xRel = (e.clientX - (left + width / 2)) / (width / 2);
    const yRel = (e.clientY - (top + height / 2)) / (height / 2);

    mouseX.set(xRel);
    mouseY.set(yRel);

    const xPercent = ((e.clientX - left) / width) * 100;
    const yPercent = ((e.clientY - top) / height) * 100;
    setGlarePos({ x: xPercent, y: yPercent });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice()) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Max rotate 8°
  const rotateX = useTransform(mouseY, [-1, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [-1, 1], [-8, 8]);

  // Color mapping based on bgToken
  const isMauve = project.bgToken === "mauve";
  const bgClass =
    project.bgToken === "plum"
      ? "bg-[var(--plum)] text-[var(--paper)]"
      : project.bgToken === "umber"
      ? "bg-[var(--band-umber)] text-[var(--paper)]"
      : project.bgToken === "olive"
      ? "bg-[var(--olive)] text-[var(--paper)]"
      : "bg-[var(--mauve)] text-[var(--ink)]";

  const renderVisual = () => {
    switch (project.id) {
      case "cve-patcher":
        return <VisualCvePatcher />;
      case "aura":
        return <VisualAura />;
      case "uptimex":
        return <VisualUpTimeX />;
      case "pitwall":
        return <VisualPitWall />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className={`relative h-full flex flex-col ${className}`}
    >
      <motion.div
        ref={cardRef}
        data-cursor="view"
        role="button"
        tabIndex={0}
        aria-label={`Open details for project ${project.title}`}
        onClick={() => onOpenDrawer(project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenDrawer(project);
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className={`relative flex-1 flex flex-col justify-between p-6 sm:p-8 border border-[var(--paper)]/15 select-none cursor-pointer overflow-hidden ${bgClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]`}
      >
        {/* Radial Glare following pointer */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(239, 232, 210, 0.18), transparent 70%)`,
            }}
          />
        )}

        {/* Top: Index & Tags */}
        <div className="flex items-start justify-between gap-4 z-20">
          <span className="font-anton text-2xl sm:text-3xl tracking-tight opacity-75">
            {project.index}
          </span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                  isMauve
                    ? "border-[var(--ink)]/30 text-[var(--ink)]"
                    : "border-[var(--paper)]/30 text-[var(--paper)]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Middle Visual Diagram */}
        <div className="my-6 z-20 w-full">{renderVisual()}</div>

        {/* Bottom Content */}
        <div className="z-20 flex flex-col items-start">
          <h3 className="display-m uppercase tracking-tight leading-tight mb-2">
            {project.title}
          </h3>
          <p
            className={`text-sm sm:text-base leading-relaxed line-clamp-2 ${
              isMauve ? "text-[var(--ink)]/85" : "text-[var(--paper)]/85"
            }`}
          >
            {project.summary}
          </p>
        </div>

        {/* Bottom-right 56px Circular Arrow Button */}
        <div className="mt-6 flex justify-end items-center z-20">
          <div
            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
              isMauve
                ? "border-[var(--ink)]/40 text-[var(--ink)] bg-[var(--paper)]/40"
                : "border-[var(--paper)]/40 text-[var(--paper)] bg-[var(--paper)]/10"
            }`}
          >
            <IconArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Hover Slide-up Bottom Panel (0.4s) */}
        <div
          className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-[var(--paper)]/15 backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] z-30 flex flex-col justify-between ${
            isHovered
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--umber)] text-[var(--paper)] border border-[var(--bronze)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="font-anton text-sm uppercase tracking-wider text-[var(--paper)]">
              Click to inspect project
            </span>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View source repository"
                  className="p-2.5 rounded-full bg-[var(--plum)] text-[var(--paper)] hover:bg-[var(--bronze)] transition-colors"
                >
                  <IconGitHub className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View live deployment"
                  className="p-2.5 rounded-full bg-[var(--bronze)] text-[var(--paper)] hover:bg-[var(--plum)] transition-colors"
                >
                  <IconArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
