import Link from 'next/link';
import { getAllItems } from '@/lib/mdx';
import { projectsMeta } from '@/lib/data';

export const metadata = {
  title: 'Projects | Akshat Dhondiyal',
  description: 'Full-stack projects spanning distributed systems, AI/ML, and systems programming.',
};

export default function ProjectsPage() {
  const projects = getAllItems('projects');

  return (
    <div className="max-w-3xl mx-auto w-full px-6 pt-28 pb-16">
      {/* Back Link */}
      <div className="mb-12">
        <Link
          href="/"
          className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors inline-flex items-center gap-2"
        >
          &larr; back home
        </Link>
      </div>

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--color-foreground)]">
        Projects
      </h1>
      <p className="text-[var(--color-muted-foreground)] mb-12">
        Each project is a deep dive into a real engineering problem.
      </p>

      {/* Projects List */}
      <div className="flex flex-col">
        {projects.length === 0 ? (
          <p className="text-[var(--color-muted-foreground)]">No projects found yet.</p>
        ) : (
          projects.map((project) => {
            const meta = projectsMeta.find((p) => p.slug === project.slug);
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="py-8 border-b border-[var(--color-border)] group first:border-t hover:bg-[var(--color-muted)]/30 transition-colors -mx-4 px-4 rounded-xl"
              >
                <div className="flex flex-col gap-2">
                  {meta && (
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--accent)] font-medium">
                      {meta.categories.join(" · ")}
                    </span>
                  )}
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {project.frontmatter.title}
                  </h2>
                  {project.frontmatter.summary && (
                    <p className="text-[var(--color-muted-foreground)] text-sm md:text-base leading-relaxed mt-1">
                      {project.frontmatter.summary}
                    </p>
                  )}
                  {meta && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {meta.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
