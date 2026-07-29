import { MDXRemote } from 'next-mdx-remote/rsc';
import { getItemBySlug, getSlugs } from '@/lib/mdx';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const slugs = getSlugs('blogs');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getItemBySlug('blogs', slug);
    return {
      title: `${post.frontmatter.title} | Akshat Dhondiyal`,
      description: post.frontmatter.summary || '',
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = getItemBySlug('blogs', slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto w-full px-6 pt-28 pb-16">
      {/* Back Link */}
      <div className="mb-12">
        <Link
          href="/blog"
          className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors inline-flex items-center gap-2"
        >
          &larr; back to blog
        </Link>
      </div>

      {/* Header */}
      <header className="mb-14">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-foreground)] mb-4 leading-tight">
          {post.frontmatter.title}
        </h1>
        <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-[0.2em]">
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:underline-offset-4 hover:prose-a:opacity-70 prose-table:border-collapse prose-th:border prose-th:border-[var(--color-border)] prose-th:p-3 prose-td:border prose-td:border-[var(--color-border)] prose-td:p-3 prose-code:text-[var(--accent)]">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
