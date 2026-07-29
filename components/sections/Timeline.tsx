"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  Terminal,
  Briefcase,
  Navigation,
  Ticket,
  Activity,
  Rocket,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Terminal,
  Briefcase,
  Navigation,
  Ticket,
  Activity,
  Rocket,
};

export function Timeline() {
  return (
    <Section id="journey" className="py-24 md:py-32">
      <SectionHeading label="Journey" title="My path so far" />
      <div className="mt-16 relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] md:-translate-x-1/2" />
        
        <div className="flex flex-col gap-12">
          {timeline.map((item, index) => {
            const Icon = iconMap[item.icon] || Activity;
            const isEven = index % 2 === 0;
            
            // On mobile, everything comes from the right, on desktop alternate
            const initialX = isEven ? -20 : 20;

            return (
              <div
                key={index}
                className={`relative flex items-center w-full ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] z-10 shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: typeof window !== "undefined" && window.innerWidth < 768 ? 20 : initialX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4 }}
                  className={`w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 ${
                    isEven ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider mb-2">
                      {item.date}
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
