import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-2 md:py-4">
      {/* Avatar */}
      <div className="relative w-24 h-24 mb-5 rounded-full overflow-hidden border border-[var(--color-border)] shadow-sm bg-[var(--color-muted)] shrink-0">
        <Image 
          src="/avatar.jpg" 
          alt="Akshat Dhondiyal"
          fill
          className="object-cover"
          sizes="96px"
          priority
        />
      </div>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-center mb-1">
        Akshat Dhondiyal
      </h1>
      <p className="font-sans italic text-[var(--color-muted-foreground)] text-center mb-6 md:mb-8">
        computer science student & full stack developer
      </p>

      {/* Bio */}
      <div className="w-full space-y-4 text-[var(--color-foreground)] leading-relaxed text-[15px] md:text-base text-left">
        <p>
          Hi, I'm a Computer Science student at Graphic Era Hill University and currently a Full Stack Developer Intern at TBI GEU. I am interested in competitive programming, systems programming and high performance backend engineering.
        </p>
        <p>
          Currently, I'm building scalable SaaS platforms utilizing FastAPI, Next.js, and pgvector. Outside of work, I engineer high-performance tools like SystemPulse in C++17 and compete across platforms like Codeforces, CodeChef, and LeetCode.
        </p>
        <p>
          I'm always open to new opportunities, hackathons, and technical deep dives. You can view my projects, read my blog, or reach out directly.
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-6 text-sm text-[var(--color-muted-foreground)]">
        <Link href="/blog" className="hover:text-[var(--color-foreground)] transition-colors">
          blog
        </Link>
        <Link href="/projects" className="hover:text-[var(--color-foreground)] transition-colors">
          projects
        </Link>
        <a href="https://github.com/akshatddyl" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors">
          github
        </a>
        <a href="https://drive.google.com/file/d/1lDeYA5jRNXzCQPvid-XqgchiqAxAqvJe/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors">
          resume
        </a>
        <a href="https://www.linkedin.com/in/akshatdhondiyal/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors">
          linkedin
        </a>
        <a href="mailto:akshatdhondiyal14@gmail.com" className="hover:text-[var(--color-foreground)] transition-colors">
          email
        </a>
      </div>
    </div>
  );
}
