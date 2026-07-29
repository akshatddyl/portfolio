"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personalInfo, navItems } from "@/lib/data";
import { LiveClock } from "@/components/LiveClock";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
              {personalInfo.name}
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] max-w-xs leading-relaxed">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Center Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-[var(--color-foreground)] tracking-wider uppercase">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors w-fit"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/blog"
                className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors w-fit"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-[var(--color-foreground)] tracking-wider uppercase">
              Socials
            </h4>
            <div className="flex flex-col space-y-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors w-fit group"
              >
                <GithubIcon className="w-4 h-4 mr-2 group-hover:text-[var(--accent)] transition-colors" />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors w-fit group"
              >
                <LinkedinIcon className="w-4 h-4 mr-2 group-hover:text-[var(--accent)] transition-colors" />
                LinkedIn
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors w-fit group"
              >
                <Mail className="w-4 h-4 mr-2 group-hover:text-[var(--accent)] transition-colors" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[var(--color-border)] mt-8 pt-6 gap-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            © {currentYear} {personalInfo.name}
          </p>
          <div className="flex items-center space-x-2 text-sm text-[var(--color-muted-foreground)]">
            <span>{personalInfo.location}</span>
            <span className="hidden sm:inline-block text-[var(--color-border)]">|</span>
            <LiveClock /> <span>IST</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
