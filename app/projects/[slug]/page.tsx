import { MDXRemote } from 'next-mdx-remote/rsc';
import { getItemBySlug, getSlugs } from '@/lib/mdx';
import { projectsMeta } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export function generateStaticParams() {
  const slugs = getSlugs('projects');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getItemBySlug('projects', slug);
    return {
      title: `${post.frontmatter.title} | Akshat Dhondiyal`,
      description: post.frontmatter.summary || '',
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function ProjectPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = getItemBySlug('projects', slug);
  } catch {
    notFound();
  }

  const meta = projectsMeta.find((p) => p.slug === slug);

  return (
    <article className="max-w-3xl mx-auto w-full px-6 pt-28 pb-16">
      {/* Back Link */}
      <div className="mb-12">
        <Link
          href="/projects"
          className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors inline-flex items-center gap-2"
        >
          &larr; back to projects
        </Link>
      </div>

      {/* Header */}
      <header className="mb-14">
        {meta && (
          <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--accent)] font-medium mb-4">
            {meta.categories.join(" · ")}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-foreground)] mb-4 leading-tight">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.summary && (
          <p className="text-[var(--color-muted-foreground)] text-base md:text-lg leading-relaxed mb-6">
            {post.frontmatter.summary}
          </p>
        )}

        {/* Tech stack + links */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--color-border)]">
          {meta && (
            <div className="flex flex-wrap gap-1.5 flex-1">
              {meta.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3">
            {(post.frontmatter.github || meta?.github) && (
              <a
                href={post.frontmatter.github || meta?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
            {(post.frontmatter.live || meta?.live) && (
              <a
                href={post.frontmatter.live || meta?.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:underline-offset-4 hover:prose-a:opacity-70 prose-table:border-collapse prose-th:border prose-th:border-[var(--color-border)] prose-th:p-3 prose-td:border prose-td:border-[var(--color-border)] prose-td:p-3 prose-code:text-[var(--accent)] prose-img:rounded-xl prose-img:border prose-img:border-[var(--color-border)]">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
