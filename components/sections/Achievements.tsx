"use client";

import { motion } from "framer-motion";
import { FolderGit2, GitBranch, PenTool, Layers } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  FolderGit2: <FolderGit2 className="w-6 h-6" />,
  GitBranch: <GitBranch className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Achievements() {
  return (
    <Section id="achievements" className="py-24 md:py-32">
      <SectionHeading label="Achievements" title="Notable highlights" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--accent)]/30 transition-colors"
          >
            <div className="text-[var(--accent)] mb-4 flex items-center justify-center w-12 h-12 bg-background rounded-lg border border-[var(--color-border)]">
              {iconMap[achievement.icon]}
            </div>
            <h3 className="text-base font-semibold text-[var(--color-foreground)] mt-3 mb-1">
              {achievement.title}
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              {achievement.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
