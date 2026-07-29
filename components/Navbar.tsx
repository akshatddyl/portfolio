"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { navItems, personalInfo } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    navItems.forEach((item) => {
      // item.href is like '#about'
      const id = item.href.substring(1);
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const id = href.substring(1);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl bg-[var(--background)]/80 border-b border-[var(--color-border)]/50 transition-colors">
      <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-semibold text-[var(--color-foreground)] transition-colors"
        >
          {personalInfo.shortName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                activeSection === item.href
                  ? "text-[var(--color-foreground)]"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {item.label}
              {activeSection === item.href && (
                <motion.div
                  layoutId="activeSectionIndicator"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--color-foreground)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="primary"
            size="sm"
            href={personalInfo.resume}
            target="_blank"
            icon={<FileText className="w-4 h-4" />}
          >
            Resume
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[var(--color-foreground)] p-2 -mr-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-[var(--background)] border-b border-[var(--color-border)] p-4 shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`text-lg font-medium px-2 py-1 transition-colors ${
                    activeSection === item.href
                      ? "text-[var(--color-foreground)]"
                      : "text-[var(--color-muted-foreground)]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  href={personalInfo.resume}
                  target="_blank"
                  icon={<FileText className="w-4 h-4" />}
                >
                  Resume
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
