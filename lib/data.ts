// ============================================================
// Central data store for the portfolio.
// Update content here — components will pick it up automatically.
// ============================================================

// ── Personal Info ──────────────────────────────────────────────
export const personalInfo = {
  name: "Akshat Dhondiyal",
  shortName: "akshat",
  tagline: "Building software that solves real problems.",
  roles: [
    "Software Engineer",
    "CS Undergraduate",
    "Systems Enthusiast",
  ],
  email: "akshatdhondiyal14@gmail.com",
  location: "Dehradun, Uttarakhand, India",
  github: "https://github.com/akshatddyl",
  linkedin: "https://www.linkedin.com/in/akshatdhondiyal/",
  resume:
    "https://drive.google.com/file/d/1lDeYA5jRNXzCQPvid-XqgchiqAxAqvJe/view?usp=sharing",
  university: "Graphic Era Hill University",
  graduationYear: 2028,
} as const;

// ── About Cards ────────────────────────────────────────────────
export const aboutCards = [
  {
    icon: "User",
    title: "Who I Am",
    description:
      "CS undergrad at Graphic Era Hill University, graduating in 2028. Currently interning as a Full Stack Developer at TBI GEU.",
  },
  {
    icon: "Code2",
    title: "What I Build",
    description:
      "Full-stack applications, Distributed systems, Developer tools, and Android apps — with a focus on solving hard engineering problems.",
  },
  {
    icon: "Sparkles",
    title: "Current Interests",
    description:
      "Algorithms, Computer Architecture, Backend Engineering, Distributed Systems, and AI/ML applications.",
  },
  {
    icon: "BookOpen",
    title: "Learning Now",
    description:
      "Microservices at scale, low-level systems programming in C 'n' C++, and exploring real time systems.",
  },
] as const;

// ── Skills ─────────────────────────────────────────────────────
export type SkillCategory = {
  name: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["C", "C++", "Java", "Python", "TypeScript", "Kotlin", "JavaScript", "SQL", "Bash"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Jetpack Compose", "Tailwind CSS", "HTML/CSS"],
  },
  {
    name: "Backend",
    skills: ["Spring Boot", "FastAPI", "Node.js", "REST APIs"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "Redis", "Neo4j", "Room", "Firestore"],
  },
  {
    name: "Tools and Technologies",
    skills: ["Docker", "Kubernetes", "Kafka", "Prometheus", "Grafana", "Firebase", "Linux", "Git", "GitHub", "GCC", "gdb"],
  },
  
];

// ── Projects (card metadata — full content lives in MDX) ──────
export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  techStack: string[];
  categories: string[];
  role: string;
  github: string;
  live?: string;
  featured: boolean;
};

export const projectsMeta: ProjectMeta[] = [
  {
    slug: "BookMyTicket",
    title: "BookMyTicket",
    summary:
      "A distributed event-ticketing platform built as six independently deployable Spring Boot microservices, using Redis-backed distributed locks and Kafka event fan-out to guarantee no two users can ever book the same seat.",
    techStack: ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "React", "Docker", "Kubernetes"],
    categories: ["Full Stack", "Systems"],
    role: "Sole Developer",
    github: "https://github.com/akshatddyl/BookMyTicket",
    featured: true,
  },
  {
    slug: "NaviGo",
    title: "NaviGo",
    summary:
      "An infrastructure-less Android app for accessible indoor navigation for visually impaired people.",
    techStack: ["Kotlin", "Jetpack Compose", "Gemini API", "Neo4j", "Firebase", "Room"],
    categories: ["AI", "Full Stack"],
    role: "Sole Developer",
    github: "https://github.com/akshatddyl/NaviGo",
    live: "https://drive.google.com/file/d/1o-7f47fvEoiPQeS911pKgs5wjGWcBl2K/view?usp=drivesdk",
    featured: true,
  },
  {
    slug: "SystemPulse",
    title: "SystemPulse",
    summary:
      "A distributed telemetry pipeline with lock-free C++ agents, a self-throttling broker, and a Python anomaly-detection service that flags anomalies in real time without offline training.",
    techStack: ["C++", "Python", "FastAPI", "Docker", "Prometheus", "Grafana"],
    categories: ["Systems", "AI"],
    role: "Sole Developer",
    github: "https://github.com/akshatddyl/SystemPulse",
    featured: true,
  },
  {
    slug: "Terminal-Based-Text-Editor",
    title: "Terminal-Based Text Editor",
    summary:
      "A terminal-native text editor written from scratch in C, backed entirely by custom data structures — a rope for O(log n) edits, a trie for instant auto-suggestions, and a hash table for real-time syntax highlighting.",
    techStack: ["C", "ncurses", "Data Structures", "Valgrind"],
    categories: ["Systems", "Open Source"],
    role: "Sole Developer",
    github: "https://github.com/akshatddyl/terminal-based-text-editor",
    featured: true,
  },
];

export const projectCategories = ["All", "Full Stack", "Systems", "AI", "Open Source"] as const;

// ── Experience ─────────────────────────────────────────────────
export type ExperienceEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  description: string[];
  techUsed: string[];
  current: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Developer Intern",
    company: "TBI GEU",
    companyUrl: "https://www.geu.ac.in",
    location: "Dehradun, India",
    period: "2025 – Present",
    description: [
      "Building and maintaining full-stack web applications for university incubation projects.",
      "Working across frontend and backend, implementing features end-to-end.",
      "Collaborating with cross-functional teams on real-world software delivery.",
    ],
    techUsed: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    current: true,
  },
];

// ── Education ──────────────────────────────────────────────────
export type EducationEntry = {
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  period: string;
  details: string[];
};

export const education: EducationEntry[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Graphic Era Hill University",
    institutionUrl: "https://www.gehu.ac.in",
    location: "Dehradun, India",
    period: "2024 – 2028",
    details: [
      "Relevant coursework: Data Structures & Algorithms, Operating Systems, Computer Architecture, Database Systems.",
      "Active member of the university coding community.",
      "Focus areas: Systems programming, distributed systems, AI applications.",
    ],
  },
];

// ── Timeline ───────────────────────────────────────────────────
export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  icon: string;
};

export const timeline: TimelineEvent[] = [
  {
    date: "2024",
    title: "Started B.Tech in CSE",
    description: "Began my Computer Science journey at Graphic Era Hill University.",
    icon: "GraduationCap",
  },
  {
    date: "Late 2025",
    title: "Built Terminal Text Editor",
    description:
      "First major project — a complete text editor in C with custom data structures. Learned the gap between Big-O theory and real-world performance.",
    icon: "Terminal",
  },
  {
    date: "2025",
    title: "Joined TBI GEU",
    description:
      "Started full-stack development internship at the university's Technology Business Incubator.",
    icon: "Briefcase",
  },
  {
    date: "Early 2026",
    title: "Built NaviGo",
    description:
      "Developed an indoor navigation app for visually impaired users using dead-reckoning, voice NLU, and Dijkstra's algorithm.",
    icon: "Navigation",
  },
  {
    date: "Mid 2026",
    title: "Built BookMyTicket",
    description:
      "Designed and built a distributed microservices ticketing platform with Redis locks and Kafka event streaming.",
    icon: "Ticket",
  },
  {
    date: "Mid 2026",
    title: "Built SystemPulse",
    description:
      "Created a distributed telemetry pipeline with C++ lock-free agents and real-time anomaly detection.",
    icon: "Activity",
  },
  {
    date: "Present",
    title: "Continuing to Build",
    description:
      "Exploring distributed systems, AI, and systems programming. Open to new opportunities.",
    icon: "Rocket",
  },
];

// ── Achievements ───────────────────────────────────────────────
export type Achievement = {
  title: string;
  description: string;
  icon: string;
};

export const achievements: Achievement[] = [
  {
    title: "4 Production-Grade Projects",
    description:
      "Built four significant projects spanning distributed systems, AI, mobile, and systems programming — each solving a real engineering problem.",
    icon: "FolderGit2",
  },
  {
    title: "Open Source Contributor",
    description:
      "All major projects are open source with detailed documentation and architecture diagrams.",
    icon: "GitBranch",
  },
  {
    title: "Technical Writing",
    description:
      "Write detailed technical blog posts breaking down engineering decisions and trade-offs behind each project.",
    icon: "PenTool",
  },
  {
    title: "Full Stack Proficiency",
    description:
      "Comfortable across the entire stack — from low-level C/C++ to frontend React/Next.js to cloud infrastructure with Docker and Kubernetes.",
    icon: "Layers",
  },
];

// ── Navigation ─────────────────────────────────────────────────
export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

// ── Command Palette ────────────────────────────────────────────
export const commands = [
  { label: "Go to Projects", action: "scroll", target: "#projects", icon: "FolderGit2" },
  { label: "Go to About", action: "scroll", target: "#about", icon: "User" },
  { label: "Go to Skills", action: "scroll", target: "#skills", icon: "Cpu" },
  { label: "Go to Experience", action: "scroll", target: "#experience", icon: "Briefcase" },
  { label: "Go to Contact", action: "scroll", target: "#contact", icon: "Mail" },
  { label: "View Resume", action: "link", target: personalInfo.resume, icon: "FileText" },
  { label: "Open GitHub", action: "link", target: personalInfo.github, icon: "Github" },
  { label: "Open LinkedIn", action: "link", target: personalInfo.linkedin, icon: "Linkedin" },
  { label: "Toggle Theme", action: "theme", target: "", icon: "Moon" },
  { label: "Go to Blog", action: "navigate", target: "/blog", icon: "BookOpen" },
  { label: "Open Terminal", action: "navigate", target: "/terminal", icon: "Terminal" },
] as const;
