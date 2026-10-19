"use client";

import { useState } from "react";
import { SITE_CONTENT, ProjectItem } from "@/content/site";
import RevealLines from "./RevealLines";
import ProjectCard from "./ProjectCard";
import ProjectDrawer from "./ProjectDrawer";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = SITE_CONTENT.projects;
  const project1 = projects[0]; // cve_patcher (7 cols)
  const project2 = projects[1]; // aura (5 cols)
  const project3 = projects[2]; // uptimex (5 cols)
  const project4 = projects[3]; // pitwall (7 cols)
  const project5 = projects[4]; // dashing raptor (12 cols)

  return (
    <section
      id="work"
      className="relative w-full bg-[var(--band-cream)] band-padding border-t border-[var(--umber)]/20"
    >
      <div className="content-constraint">
        <div className="w-12 h-1 bg-[var(--bronze)] mb-4" />
        <RevealLines
          as="h2"
          lines={["SELECTED WORK"]}
          className="display-l text-[var(--umber)] dark:text-[var(--paper)] leading-none mb-12"
        />

        {/* Asymmetric 12-Column Grid */}
        <div className="flex flex-col gap-6">
          {/* Row 1: Card 1 (7 cols) + Card 2 (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 min-h-[420px]">
              <ProjectCard
                project={project1}
                onOpenDrawer={(p) => setSelectedProject(p)}
              />
            </div>
            <div className="lg:col-span-5 min-h-[420px]">
              <ProjectCard
                project={project2}
                onOpenDrawer={(p) => setSelectedProject(p)}
              />
            </div>
          </div>

          {/* Row 2: Card 3 (5 cols) + Card 4 (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 min-h-[420px]">
              <ProjectCard
                project={project3}
                onOpenDrawer={(p) => setSelectedProject(p)}
              />
            </div>
            <div className="lg:col-span-7 min-h-[420px]">
              <ProjectCard
                project={project4}
                onOpenDrawer={(p) => setSelectedProject(p)}
              />
            </div>
          </div>

          {/* Row 3: Card 5 (12 cols, 280px min-height) */}
          <div className="w-full min-h-[280px]">
            <ProjectCard
              project={project5}
              onOpenDrawer={(p) => setSelectedProject(p)}
            />
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />
    </section>
  );
}
