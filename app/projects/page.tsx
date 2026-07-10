import Link from 'next/link';
import { getAllItems } from '@/lib/mdx';

export const metadata = {
  title: 'Projects | akshat.',
};

export default function ProjectsPage() {
  const projects = getAllItems('projects');

  return (
    <div className="flex flex-col pt-4 md:pt-8 pb-16">
      {/* Top Left Back Link */}
      <div className="mb-12">
        <Link 
          href="/" 
          className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors inline-flex items-center gap-2"
        >
          &larr; back home
        </Link>
      </div>

      {/* Header */}
      <h1 className="font-serif italic text-4xl md:text-5xl font-bold tracking-tight mb-12">
        Projects
      </h1>

      {/* Projects List */}
      <div className="flex flex-col">
        {projects.length === 0 ? (
          <p className="text-[var(--color-muted-foreground)]">No projects found yet.</p>
        ) : (
          projects.map((project) => (
            <Link 
              key={project.slug} 
              href={`/projects/${project.slug}`}
              className="py-8 border-b border-[var(--color-border)] group first:border-t hover:bg-[var(--color-muted)]/30 transition-colors -mx-4 px-4 rounded-xl"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)]">
                  {new Date(project.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <h2 className="font-serif italic text-2xl font-medium text-[var(--color-foreground)] group-hover:opacity-80 transition-opacity">
                  {project.frontmatter.title}
                </h2>
                {project.frontmatter.summary && (
                  <p className="text-[var(--color-muted-foreground)] text-sm md:text-base leading-relaxed mt-1">
                    {project.frontmatter.summary}
                  </p>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
