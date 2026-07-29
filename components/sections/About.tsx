"use client";

import { motion } from "framer-motion";
import { User, Code2, Sparkles, BookOpen, LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutCards } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  User,
  Code2,
  Sparkles,
  BookOpen,
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

export function About() {
  return (
    <Section id="about" className="py-24 md:py-32">
      <SectionHeading label="About" title="Get to know me" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      >
        {aboutCards.map((card, index) => {
          const IconComponent = iconMap[card.icon];
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--accent)]/30 transition-colors duration-200"
            >
              {IconComponent && (
                <div className="mb-4">
                  <IconComponent size={20} className="text-[var(--accent)]" />
                </div>
              )}
              <h3 className="font-semibold text-[var(--color-foreground)] mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
