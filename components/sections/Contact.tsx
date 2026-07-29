"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { personalInfo } from "@/lib/data";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <Section id="contact" className="py-24 md:py-32">
      <SectionHeading
        label="Contact"
        title="Get in touch"
        description="Have a project in mind or want to chat? Drop me a message."
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Form */}
        <div className="order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-medium text-[var(--color-foreground)]">Name</label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent text-[var(--color-foreground)] transition-colors"
                disabled={status === "loading" || status === "success"}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium text-[var(--color-foreground)]">Email</label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent text-[var(--color-foreground)] transition-colors"
                disabled={status === "loading" || status === "success"}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium text-[var(--color-foreground)]">Message</label>
              <textarea
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent resize-none text-[var(--color-foreground)] transition-colors"
                disabled={status === "loading" || status === "success"}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto"
              disabled={status === "loading" || status === "success"}
              icon={
                status === "idle" ? <Send className="w-4 h-4" /> :
                status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> :
                <CheckCircle2 className="w-4 h-4" />
              }
            >
              {status === "idle" && "Send Message"}
              {status === "loading" && "Sending..."}
              {status === "success" && "Message sent!"}
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="order-1 lg:order-2 space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-6">Contact Information</h3>
            <div className="space-y-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center mr-4 group-hover:border-[var(--accent)]/50 group-hover:text-[var(--accent)] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm">{personalInfo.email}</span>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center mr-4 group-hover:border-[var(--accent)]/50 group-hover:text-[var(--accent)] transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <span className="text-sm">GitHub</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center mr-4 group-hover:border-[var(--accent)]/50 group-hover:text-[var(--accent)] transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <span className="text-sm">LinkedIn</span>
              </a>

              <div className="flex items-center text-[var(--color-muted-foreground)]">
                <div className="w-10 h-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
