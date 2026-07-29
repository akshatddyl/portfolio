"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <Section id="education" className="py-24 md:py-32">
      <SectionHeading label="Education" title="Academic background" />
      <div className="mt-16 flex flex-col gap-8">
        {education.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 md:p-8 flex gap-4 md:gap-6"
          >
            <div className="hidden md:flex shrink-0 mt-1 h-12 w-12 items-center justify-center rounded-full bg-[var(--color-muted)] border border-[var(--color-border)]">
              <GraduationCap className="h-6 w-6 text-[var(--color-foreground)]" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-foreground)] flex items-center gap-2">
                    <span className="md:hidden">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    {item.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[var(--color-muted-foreground)]">
                    {item.institutionUrl ? (
                      <a
                        href={item.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--color-foreground)] hover:text-[var(--accent)] transition-colors"
                      >
                        {item.institution}
                      </a>
                    ) : (
                      <span className="font-medium text-[var(--color-foreground)]">{item.institution}</span>
                    )}
                    <span>•</span>
                    <span>{item.location}</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-[var(--color-muted-foreground)] whitespace-nowrap md:mt-1">
                  {item.period}
                </div>
              </div>
              <ul className="space-y-3">
                {item.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-3 text-[var(--accent)] mt-1.5">•</span>
                    <span className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
