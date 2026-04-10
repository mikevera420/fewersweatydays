import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuthorCard from '../components/blog/AuthorCard';
import PillarBlock from '../components/blog/PillarBlock';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getPostBySlug } from '../lib/posts';
import { renderMarkdown } from '../lib/markdown';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const html = renderMarkdown(post.content);

  return (
    <div>
      <section className="blog-post-hero">
        <Link to="/blog" className="blog-back-link" data-cursor-hover>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div className="blog-post-meta">
          <span className="post-card-tag">{post.category}</span>
          <span className="blog-post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="blog-post-read">{post.readTime}</span>
        </div>
        <h1 className="blog-post-title">{post.title}</h1>
        <p className="blog-post-excerpt">{post.excerpt}</p>
      </section>

      {post.image && (
        <div className="blog-post-featured-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}

      <section className="content-section" style={{ paddingTop: '2rem' }}>
        <div className="section-inner blog-post-body">
          <div className="prose-fsd" dangerouslySetInnerHTML={{ __html: html }} />
          {post.seriesSlug && post.seriesPosition !== undefined && (
            <ScrollReveal>
              <PillarBlock
                seriesSlug={post.seriesSlug}
                currentPosition={post.seriesPosition}
              />
            </ScrollReveal>
          )}
          <ScrollReveal>
            <AuthorCard />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
