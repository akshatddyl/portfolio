"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { personalInfo, projectsMeta, skillCategories, experience, education } from "@/lib/data";

type Line = { type: "input" | "output" | "error" | "ascii"; content: string };

const ASCII_BANNER = `
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║   █▀█ █▄▀ █▀ █░█ █▀█ ▀█▀                     ║
  ║   █▀█ █░█ ▄█ █▀█ █▀█ ░█░                     ║
  ║                                              ║
  ║   Portfolio Terminal v1.0                    ║
  ║   Type 'help' to get started.                ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
`;

function processCommand(cmd: string): Line[] {
  const trimmed = cmd.trim().toLowerCase();
  const args = trimmed.split(/\s+/);
  const command = args[0];

  switch (command) {
    case "":
      return [];

    case "help":
      return [
        { type: "output", content: "Available commands:" },
        { type: "output", content: "" },
        { type: "output", content: "  about       — Who is Akshat?" },
        { type: "output", content: "  skills      — Technologies & tools" },
        { type: "output", content: "  projects    — Featured projects" },
        { type: "output", content: "  experience  — Work experience" },
        { type: "output", content: "  education   — Academic background" },
        { type: "output", content: "  resume      — Open resume" },
        { type: "output", content: "  contact     — Contact information" },
        { type: "output", content: "  github      — Open GitHub profile" },
        { type: "output", content: "  home        — Go back to portfolio" },
        { type: "output", content: "  clear       — Clear terminal" },
        { type: "output", content: "  help        — Show this help" },
      ];

    case "about":
      return [
        { type: "output", content: `  ${personalInfo.name}` },
        { type: "output", content: "" },
        { type: "output", content: `  CS undergrad at ${personalInfo.university}` },
        { type: "output", content: `  Graduating ${personalInfo.graduationYear}` },
        { type: "output", content: `  Location: ${personalInfo.location}` },
        { type: "output", content: "" },
        {
          type: "output",
          content:
            "  Interests: algorithms, computer architecture, backend engineering,",
        },
        {
          type: "output",
          content: "  distributed systems, AI/ML, and Linux.",
        },
      ];

    case "skills":
      return skillCategories.flatMap((cat) => [
        { type: "output", content: "" },
        { type: "output", content: `  [${cat.name}]` },
        { type: "output", content: `  ${cat.skills.join(", ")}` },
      ]) as Line[];

    case "projects":
      return projectsMeta.flatMap((p) => [
        { type: "output", content: "" },
        { type: "output", content: `  ● ${p.title}` },
        { type: "output", content: `    ${p.summary.substring(0, 120)}...` },
        { type: "output", content: `    Tech: ${p.techStack.slice(0, 5).join(", ")}` },
        { type: "output", content: `    → ${p.github}` },
      ]) as Line[];

    case "experience":
      return experience.flatMap((e) => [
        { type: "output", content: "" },
        {
          type: "output",
          content: `  ${e.role} @ ${e.company}${e.current ? " (current)" : ""}`,
        },
        { type: "output", content: `  ${e.period} · ${e.location}` },
        ...e.description.map((d) => ({ type: "output" as const, content: `    ${d}` })),
      ]) as Line[];

    case "education":
      return education.flatMap((e) => [
        { type: "output", content: "" },
        { type: "output", content: `  ${e.degree}` },
        { type: "output", content: `  ${e.institution} (${e.period})` },
        ...e.details.map((d) => ({ type: "output" as const, content: `    ${d}` })),
      ]) as Line[];

    case "contact":
      return [
        { type: "output", content: `  Email:    ${personalInfo.email}` },
        { type: "output", content: `  GitHub:   ${personalInfo.github}` },
        { type: "output", content: `  LinkedIn: ${personalInfo.linkedin}` },
      ];

    case "resume":
      if (typeof window !== "undefined") {
        window.open(personalInfo.resume, "_blank");
      }
      return [{ type: "output", content: "  Opening resume..." }];

    case "github":
      if (typeof window !== "undefined") {
        window.open(personalInfo.github, "_blank");
      }
      return [{ type: "output", content: "  Opening GitHub profile..." }];

    case "home":
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
      return [{ type: "output", content: "  Navigating home..." }];

    default:
      return [
        {
          type: "error",
          content: `  Command not found: '${command}'. Type 'help' for available commands.`,
        },
      ];
  }
}

export default function TerminalPage() {
  const [lines, setLines] = useState<Line[]>([
    { type: "ascii", content: ASCII_BANNER },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto-focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const cmd = currentInput;
    setLines((prev) => [...prev, { type: "input", content: `visitor@akshat:~$ ${cmd}` }]);

    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
    } else {
      const output = processCommand(cmd);
      setLines((prev) => [...prev, ...output]);
    }

    if (cmd.trim()) {
      setHistory((prev) => [cmd, ...prev]);
    }
    setCurrentInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  const lineColor = (type: Line["type"]) => {
    switch (type) {
      case "input":
        return "text-[var(--accent)]";
      case "error":
        return "text-red-400";
      case "ascii":
        return "text-[var(--accent)]";
      default:
        return "text-[var(--color-foreground)]/80";
    }
  };

  return (
    <div
      className="min-h-screen bg-[var(--background)] flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex gap-1.5">
          <a
            href="/"
            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
            title="Go home"
            aria-label="Go home"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-[var(--color-muted-foreground)] ml-2 font-mono">
          visitor@akshat — portfolio terminal
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 font-mono text-sm leading-relaxed"
      >
        {lines.map((line, i) => (
          <div key={i} className={`${lineColor(line.type)} whitespace-pre-wrap`}>
            {line.content}
          </div>
        ))}

        {/* Current input line */}
        <div className="flex items-center mt-1">
          <span className="text-[var(--accent)] mr-2 shrink-0">visitor@akshat:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[var(--color-foreground)] focus:outline-none font-mono text-sm caret-[var(--accent)]"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
