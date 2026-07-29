"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import type { ProjectMeta } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardProps {
  project: ProjectMeta;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link 
        href={`/projects/${project.slug}`} 
        className="group block bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden h-full flex flex-col relative"
      >
        <div className="h-1 w-full bg-gradient-to-r from-[var(--accent)] to-[var(--color-muted)] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="p-6 flex flex-col flex-grow">
          {project.categories?.length > 0 && (
            <div className="text-[10px] uppercase tracking-[0.15em] text-[var(--accent)] font-medium mb-3">
              {project.categories.join(", ")}
            </div>
          )}
          
          <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-4 line-clamp-3 flex-grow">
            {project.summary}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack?.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="default">{tech}</Badge>
            ))}
            {project.techStack?.length > 5 && (
              <Badge variant="default">+{project.techStack.length - 5}</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 mt-auto border-t border-[var(--color-border)] pt-4">
            {project.github && (
              <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </div>
            )}
            {project.live && (
              <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
