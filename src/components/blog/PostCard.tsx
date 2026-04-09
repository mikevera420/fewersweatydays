import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Brain, Pill, Heart, Zap, Leaf } from 'lucide-react';
import type { BlogPost } from '../../lib/posts';

const categoryGradients: Record<string, { from: string; to: string; icon: typeof BookOpen }> = {
  'Personal': { from: '#f6b87c', to: '#ed7822', icon: Heart },
  'Drug Harms': { from: '#f19447', to: '#b84616', icon: Pill },
  'Nervous System': { from: '#5fe8cc', to: '#0d947e', icon: Zap },
  'Psychology': { from: '#b8a9f0', to: '#7c6bc4', icon: Brain },
  'Lifestyle': { from: '#81c784', to: '#4caf50', icon: Leaf },
};
const defaultGradient = { from: '#f6b87c', to: '#0d947e', icon: BookOpen };

interface PostCardProps {
  post: BlogPost;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power2.out',
        });
      },
    });
    return () => trigger.kill();
  }, [index]);

  const showFallback = !post.image || imgError;
  const grad = categoryGradients[post.category] || defaultGradient;
  const FallbackIcon = grad.icon;

  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        ref={cardRef}
        className="post-card"
        style={{ opacity: 0, transform: 'translateY(30px)' }}
        data-category={post.category}
        data-cursor-hover
      >
        {showFallback ? (
          <div
            className="post-card-image post-card-gradient"
            style={{
              background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`,
            }}
          >
            <FallbackIcon size={48} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
          </div>
        ) : (
          <div className="post-card-image">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          </div>
        )}
        <div className="post-card-meta">
          <span className="post-card-tag">{post.category}</span>
          <span className="post-card-date">{post.readTime}</span>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );
}
