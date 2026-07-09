import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export type Frontmatter = {
  title: string;
  date: string;
  summary?: string;
  [key: string]: any;
};

export type MDXItem = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
};

export function getSlugs(dir: string): string[] {
  const dirPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getItemBySlug(dir: string, slug: string): MDXItem {
  const filePath = path.join(contentDirectory, dir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as Frontmatter,
    content,
  };
}

export function getAllItems(dir: string): MDXItem[] {
  const slugs = getSlugs(dir);
  const items = slugs.map((slug) => getItemBySlug(dir, slug));
  
  // Sort by date descending
  return items.sort((a, b) => {
    if (new Date(a.frontmatter.date) < new Date(b.frontmatter.date)) {
      return 1;
    }
    return -1;
  });
}
