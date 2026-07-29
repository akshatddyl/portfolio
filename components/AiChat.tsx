"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { personalInfo, projectsMeta, skillCategories, experience, education } from "@/lib/data";

// ── Local knowledge base ────────────────────────────────────────
type QAPair = { patterns: string[]; answer: string };

const knowledgeBase: QAPair[] = [
  {
    patterns: ["who", "about", "tell me", "introduce", "yourself"],
    answer: `${personalInfo.name} is a Computer Science undergraduate at ${personalInfo.university} (graduating ${personalInfo.graduationYear}). He's currently a Full Stack Developer Intern at TBI GEU, and is passionate about distributed systems, AI, and systems programming.`,
  },
  {
    patterns: ["skills", "technologies", "tech stack", "know", "work with", "languages", "tools"],
    answer: `Here are the technologies Akshat works with:\n\n${skillCategories.map((c) => `**${c.name}**: ${c.skills.join(", ")}`).join("\n\n")}`,
  },
  {
    patterns: ["project", "built", "portfolio", "work", "made"],
    answer: `Akshat has built ${projectsMeta.length} major projects:\n\n${projectsMeta.map((p) => `• **${p.title}** — ${p.summary.substring(0, 100)}...`).join("\n\n")}\n\nYou can explore each project in detail on the Projects section.`,
  },
  {
    patterns: ["ai", "machine learning", "ml", "artificial intelligence", "navigo"],
    answer: `Akshat's AI-related work includes:\n\n• **NaviGo** — An indoor navigation app using Gemini API for voice NLU, Neo4j vector search for semantic matching, and a custom Hindi stemmer for offline fallback.\n\n• **SystemPulse** — Uses online Z-score anomaly detection with no training data required.\n\nHe works with Gemini API, Neo4j Vector Search, NLP, and embeddings.`,
  },
  {
    patterns: ["systempulse", "telemetry", "monitoring", "anomaly"],
    answer: `**SystemPulse** is a distributed telemetry pipeline with lock-free C++ agents, a self-throttling broker, and a Python anomaly-detection service. Key highlights:\n\n• Lock-free ring buffer for single-producer/single-consumer\n• Condition variable-based blocking queue for multi-producer\n• Online Z-score anomaly detection without training data\n• Docker Compose scaling to 100+ agents`,
  },
  {
    patterns: ["bookmyticket", "ticket", "booking", "microservice"],
    answer: `**BookMyTicket** is a distributed event-ticketing platform built as 6 Spring Boot microservices. Key features:\n\n• Redis-backed distributed locks (SETNX + TTL)\n• Kafka event fan-out for async post-booking tasks\n• Spring Cloud Gateway for centralized JWT auth\n• One PostgreSQL schema per service`,
  },
  {
    patterns: ["editor", "terminal", "text editor", "rope", "c language", "c programming"],
    answer: `**Terminal-Based Text Editor** is written from scratch in C with zero dependencies beyond ncurses. It features:\n\n• Custom rope data structure for O(log n) edits\n• Trie-based autocomplete\n• Hash table-driven syntax highlighting\n• Boyer-Moore search directly on the rope\n• Verified leak-free with Valgrind`,
  },
  {
    patterns: ["experience", "intern", "job", "work experience"],
    answer: `${experience.map((e) => `**${e.role}** at ${e.company} (${e.period})${e.current ? " — Current" : ""}\n${e.description.join(" ")}`).join("\n\n")}`,
  },
  {
    patterns: ["education", "university", "college", "degree", "study"],
    answer: `${education.map((e) => `**${e.degree}** at ${e.institution} (${e.period})\n${e.details.join(" ")}`).join("\n\n")}`,
  },
  {
    patterns: ["contact", "email", "reach", "hire", "connect"],
    answer: `You can reach Akshat at:\n\n• Email: ${personalInfo.email}\n• LinkedIn: linkedin.com/in/akshatdhondiyal\n• GitHub: github.com/akshatddyl\n\nOr use the contact form below!`,
  },
  {
    patterns: ["resume", "cv"],
    answer: `You can view Akshat's resume here: ${personalInfo.resume}`,
  },
  {
    patterns: ["github", "open source", "repos", "repository"],
    answer: `Akshat's GitHub: github.com/akshatddyl\n\nAll major projects are open source with detailed documentation and architecture diagrams. Key repos: BookMyTicket, NaviGo, SystemPulse, terminal-based-text-editor.`,
  },
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  let bestMatch: QAPair | null = null;
  let bestScore = 0;

  for (const qa of knowledgeBase) {
    const score = qa.patterns.filter((p) => lower.includes(p)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch.answer;

  return "I can answer questions about Akshat's projects, skills, experience, education, and more. Try asking:\n\n• \"Tell me about Akshat\"\n• \"What technologies does he know?\"\n• \"Show me AI projects\"\n• \"Explain SystemPulse\"";
}

type Message = { role: "user" | "assistant"; content: string };

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm Akshat's portfolio assistant. Ask me anything about his projects, skills, or experience.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsTyping(true);

    // Simulate "thinking" delay
    setTimeout(() => {
      const answer = findAnswer(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setIsTyping(false);
    }, 600);
  }, [input]);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        aria-label={open ? "Close chat" : "Open AI assistant"}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "min(480px, 60vh)" }}
            role="dialog"
            aria-label="AI Assistant"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                <Bot size={14} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-foreground)]">Portfolio Assistant</p>
                <p className="text-[10px] text-[var(--color-muted-foreground)]">Ask about projects, skills & more</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-[var(--accent)]/10"
                        : "bg-[var(--color-muted)]"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={12} className="text-[var(--accent)]" />
                    ) : (
                      <User size={12} className="text-[var(--color-muted-foreground)]" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.role === "assistant"
                        ? "bg-[var(--color-muted)] text-[var(--color-foreground)]"
                        : "bg-[var(--accent)] text-[var(--accent-foreground)]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <Bot size={12} className="text-[var(--accent)]" />
                  </div>
                  <div className="bg-[var(--color-muted)] rounded-xl px-3 py-2 text-[13px]">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted-foreground)] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted-foreground)] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted-foreground)] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-[var(--color-muted)] rounded-lg px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                  aria-label="Chat message"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
