"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Section({ id, children, className = "", fullWidth = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${fullWidth ? "" : "max-w-5xl mx-auto w-full px-6 md:px-8"} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
