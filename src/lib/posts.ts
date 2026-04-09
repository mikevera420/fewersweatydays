export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  content: string;
}

const modules = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Omit<BlogPost, 'content'>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Invalid frontmatter');

  const frontmatter = match[1];
  const content = match[2].trim();

  const get = (key: string): string => {
    const m = frontmatter.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'));
    return m ? m[1].replace(/^["']|["']$/g, '') : '';
  };

  const getArray = (key: string): string[] => {
    const m = frontmatter.match(new RegExp(`^${key}:\\s*\\[(.*)\\]`, 'm'));
    if (!m) return [];
    return m[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
  };

  return {
    meta: {
      slug: get('slug'),
      title: get('title'),
      category: get('category'),
      excerpt: get('excerpt'),
      date: get('date'),
      readTime: get('readTime'),
      tags: getArray('tags'),
      image: get('image') || undefined,
    },
    content,
  };
}

let _posts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (_posts) return _posts;

  _posts = Object.values(modules)
    .map((raw) => {
      const { meta, content } = parseFrontmatter(raw);
      return { ...meta, content };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return _posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const cats = new Set(getAllPosts().map((p) => p.category));
  return ['All', ...Array.from(cats).sort()];
}
