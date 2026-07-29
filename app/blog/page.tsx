import Link from 'next/link';
import { getAllItems } from '@/lib/mdx';

export const metadata = {
  title: 'Blog | Akshat Dhondiyal',
  description: 'Technical blog posts on distributed systems, AI, and systems programming.',
};

export default function BlogPage() {
  const blogs = getAllItems('blogs');

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
        Blog
      </h1>
      <p className="text-[var(--color-muted-foreground)] mb-12">
        Thoughts on engineering, distributed systems, and lessons learned building software.
      </p>

      {/* Blog List */}
      <div className="flex flex-col">
        {blogs.length === 0 ? (
          <p className="text-[var(--color-muted-foreground)]">No posts found yet.</p>
        ) : (
          blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="py-8 border-b border-[var(--color-border)] group first:border-t hover:bg-[var(--color-muted)]/30 transition-colors -mx-4 px-4 rounded-xl"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest font-medium text-[var(--accent)]">
                  {new Date(blog.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {blog.frontmatter.title}
                </h2>
                {blog.frontmatter.summary && (
                  <p className="text-[var(--color-muted-foreground)] text-sm md:text-base leading-relaxed mt-1">
                    {blog.frontmatter.summary}
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
