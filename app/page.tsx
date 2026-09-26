import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-0">
      {/* Avatar */}
      <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden border border-[var(--color-border)] shadow-sm bg-[var(--color-muted)] shrink-0">
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
      <h2 className={`${cormorant.className} italic font-normal text-5xl md:text-7xl leading-none tracking-tight text-center mb-1`}>
        Akshat Dhondiyal
      </h2>
      <p className="font-sans italic text-[var(--color-muted-foreground)] text-center mb-4 md:mb-5">
        CS undergrad & aspiring software engineer
      </p>

      {/* Bio */}
      <div className="w-full space-y-3 text-[var(--color-foreground)] leading-relaxed text-[15px] md:text-base text-left">
        <p>
          Hi, I'm pursuing a B.Tech in Computer Science & Engineering at Graphic Era Hill University and will graduate in 2028. Currently a Full Stack Developer Intern at TBI GEU. My primary interests include algorithms, computer architecture, backend engineering and linux.
        </p>
        <p>
          Currently balancing academics, programming, and whatever else catches my interest.
        </p>
        <p>
          I'm a big fan of open source software and always open to new opportunities and technical discussions. Feel free to explore my projects, read my blogs or get in touch.
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-6 text-sm text-[var(--color-muted-foreground)]">
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
