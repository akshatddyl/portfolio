"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projectsMeta, projectCategories } from "@/lib/data";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projectsMeta.filter((project) =>
    activeCategory === "All" ? true : project.categories.includes(activeCategory)
  );

  return (
    <Section id="projects" className="py-24 md:py-32">
      <SectionHeading
        label="Projects"
        title="What I've built"
        description="Each project is a deep dive into a real engineering problem."
      />

      <div className="flex flex-wrap items-center gap-2 mb-12">
        {projectCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--accent-foreground)]"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-[var(--accent)] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                layout: { duration: 0.3 }
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
