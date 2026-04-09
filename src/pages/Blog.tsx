import { useState, useEffect } from 'react';
import PostCard from '../components/blog/PostCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getAllPosts, getCategories } from '../lib/posts';

export default function Blog() {
  const [active, setActive] = useState('All');
  const posts = getAllPosts();
  const categories = getCategories();
  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div>
      <section className="blog-hero">
        <div className="section-inner">
          <ScrollReveal><div className="section-label">Blog</div></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="blog-hero-title">Research-backed writing for people who sweat through everything</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="blog-hero-sub">
              Nervous system science, drug harms, psychology, and lifestyle strategies — from someone who's been there.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="blog-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`blog-filter-btn${active === cat ? ' active' : ''}`}
                  onClick={() => setActive(cat)}
                  data-cursor-hover
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="content-section" style={{ paddingTop: '2rem' }}>
        <div className="section-inner">
          <div className="blog-post-grid" key={active}>
            {filtered.length > 0 ? (
              filtered.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)
            ) : (
              <p className="blog-empty">No posts in this category yet. Check back soon.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
