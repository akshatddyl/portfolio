"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function Skills() {
  return (
    <Section id="skills" className="py-24 md:py-32">
      <SectionHeading label="Skills" title="Technologies I work with" />
      
      <div className="flex flex-col gap-10 mt-12">
        {skillCategories.map((category, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider mb-4">
              {category.name}
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap gap-3"
            >
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="px-3 py-2 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-sm text-[var(--color-foreground)] hover:border-[var(--accent)]/40 hover:shadow-sm transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}
