import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "outline" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
    outline:
      "border border-[var(--color-border)] text-[var(--color-muted-foreground)]",
    accent:
      "bg-[var(--accent)]/10 text-[var(--accent)]",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
