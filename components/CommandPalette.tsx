"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  User,
  Cpu,
  Briefcase,
  Mail,
  FileText,
  Moon,
  Sun,
  BookOpen,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { commands } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FolderGit2,
  User,
  Cpu,
  Briefcase,
  Mail,
  FileText,
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Moon,
  BookOpen,
  Terminal,
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme, systemTheme } = useTheme();
  const router = useRouter();

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const executeCommand = useCallback(
    (cmd: (typeof commands)[number]) => {
      setOpen(false);
      switch (cmd.action) {
        case "scroll": {
          const el = document.querySelector(cmd.target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          break;
        }
        case "link":
          window.open(cmd.target, "_blank", "noopener,noreferrer");
          break;
        case "navigate":
          router.push(cmd.target);
          break;
        case "theme": {
          const currentTheme = theme === "system" ? systemTheme : theme;
          setTheme(currentTheme === "dark" ? "light" : "dark");
          break;
        }
      }
    },
    [theme, systemTheme, setTheme, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      executeCommand(filtered[activeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[101] top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 border-b border-[var(--color-border)]">
                <Search size={16} className="text-[var(--color-muted-foreground)] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent py-3.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none"
                  aria-label="Search commands"
                />
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium text-[var(--color-muted-foreground)] bg-[var(--color-muted)] border border-[var(--color-border)]">
                  ESC
                </kbd>
              </div>
              {/* Command list */}
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-center text-sm text-[var(--color-muted-foreground)] py-8">
                    No commands found.
                  </p>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = iconMap[cmd.icon];
                    return (
                      <button
                        key={cmd.label}
                        onClick={() => executeCommand(cmd)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          i === activeIndex
                            ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                            : "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
                        }`}
                        role="option"
                        aria-selected={i === activeIndex}
                      >
                        {Icon && <Icon size={16} />}
                        <span className="flex-1 text-left">{cmd.label}</span>
                        {i === activeIndex && (
                          <ArrowRight size={14} className="text-[var(--accent)]" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-[var(--color-border)] flex items-center gap-4 text-[10px] text-[var(--color-muted-foreground)]">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-[var(--color-muted)] border border-[var(--color-border)]">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-[var(--color-muted)] border border-[var(--color-border)]">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-[var(--color-muted)] border border-[var(--color-border)]">esc</kbd>
                  close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
