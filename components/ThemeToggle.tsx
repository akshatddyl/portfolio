"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button 
        className="relative z-50 w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm" 
        title="Loading theme"
      >
        <div className="w-4 h-4" />
      </button>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = (e: React.MouseEvent) => {
    try {
      const nextTheme = isDark ? "light" : "dark";

      if (!document.startViewTransition) {
        setTheme(nextTheme);
        return;
      }

      const x = e.clientX ?? window.innerWidth / 2;
      const y = e.clientY ?? window.innerHeight / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        try {
          setTheme(nextTheme);
        } catch (e) {
          console.error("Error setting theme", e);
        }
      });

      transition.ready.then(() => {
        try {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 500,
              easing: "ease-out",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        } catch (err) {
          console.error("Animation error:", err);
        }
      }).catch(err => {
        console.error("Transition ready error:", err);
      });
    } catch (err) {
      console.error("Toggle error:", err);
      try {
        setTheme(isDark ? "light" : "dark");
      } catch (e) {}
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative z-50 w-9 h-9 rounded-full bg-muted flex items-center justify-center text-[var(--color-foreground)] hover:bg-[var(--color-border)] transition-colors focus:outline-none"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
