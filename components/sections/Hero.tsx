"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/Button";

function useTypingEffect(words: string[], typingSpeed = 100, deletingSpeed = 50, delay = 2000) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleType = () => {
      const currentWord = words[loopNum % words.length];
      
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeedState(deletingSpeed);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeedState(typingSpeed);
      }

      if (!isDeleting && text === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), delay);
        return;
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeedState(typingSpeed);
        return;
      }
      
      timer = setTimeout(handleType, typingSpeedState);
    };

    timer = setTimeout(handleType, typingSpeedState);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, delay, typingSpeedState]);

  return text;
}

export function Hero() {
  const currentRole = useTypingEffect([...personalInfo.roles]);
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.3), transparent 40%)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--color-foreground)]">
              {personalInfo.name}
            </h1>
            
            <div className="h-8 md:h-10 lg:h-12 flex items-center text-xl md:text-2xl lg:text-3xl font-medium text-[var(--accent)]">
              <span>{currentRole}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block ml-[2px] w-[3px] h-[1em] bg-[var(--accent)]"
              />
            </div>
            
            <p className="text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl">
              {personalInfo.tagline}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              variant="primary"
              href="#projects"
              onClick={handleScrollToProjects}
              icon={<ArrowDown className="w-4 h-4" />}
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              href={personalInfo.resume}
              target="_blank"
              icon={<FileText className="w-4 h-4" />}
            >
              Resume
            </Button>
            <Button
              variant="ghost"
              href={personalInfo.github}
              target="_blank"
              icon={<GithubIcon className="w-4 h-4" />}
              aria-label="GitHub Profile"
            >
              GitHub
            </Button>
            <Button
              variant="ghost"
              href={personalInfo.linkedin}
              target="_blank"
              icon={<LinkedinIcon className="w-4 h-4" />}
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors inline-block"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </motion.div>
    </section>
  );
}
