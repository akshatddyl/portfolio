"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

export function Experience() {
  return (
    <Section id="experience" className="py-24 md:py-32">
      <SectionHeading label="Experience" title="Where I've worked" />
      <div className="mt-16 flex flex-col gap-8">
        {experience.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-[var(--color-foreground)]">
                    {item.role}
                  </h3>
                  {item.current && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 text-xs font-medium px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Current
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--color-foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                      {item.company}
                    </a>
                  ) : (
                    <span className="font-medium text-[var(--color-foreground)]">{item.company}</span>
                  )}
                  <span>•</span>
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{item.period}</span>
                </div>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {item.description.map((desc, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-3 text-[var(--accent)] mt-1.5">•</span>
                  <span className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {item.techUsed.map((tech, i) => (
                <Badge key={i} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
