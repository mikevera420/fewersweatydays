import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import HeroCanvas from '../components/canvas/HeroCanvas';
import PostCard from '../components/blog/PostCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getAllPosts } from '../lib/posts';

export default function Home() {
  const heroLabelRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroEmpathyRef = useRef<HTMLParagraphElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  const latestPosts = getAllPosts().slice(0, 3);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (heroLabelRef.current) tl.to(heroLabelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    if (heroTitleRef.current) tl.to(heroTitleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4');
    if (heroEmpathyRef.current) tl.to(heroEmpathyRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    if (heroSubRef.current) tl.to(heroSubRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    if (heroScrollRef.current) tl.to(heroScrollRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero-section">
        <HeroCanvas />
        <div className="hero-content">
          <div ref={heroLabelRef} className="hero-label" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            Hyperhidrosis &middot; Lifestyle Change &middot; Real Answers
          </div>
          <h1 ref={heroTitleRef} className="hero-title" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <span className="hero-title-gradient">Fewer Sweaty Days</span>
          </h1>
          <p ref={heroEmpathyRef} className="hero-empathy" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            You've tried the products. What about the pattern underneath?
          </p>
          <p ref={heroSubRef} className="hero-subhead" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            Research-backed writing on the nervous system science your dermatologist didn't have time to explain.
          </p>
        </div>
        <div ref={heroScrollRef} className="hero-scroll-hint" style={{ opacity: 0, transform: 'translateY(10px)' }}>
          <span>Start Reading</span>
          <ArrowDown size={18} className="hero-scroll-arrow" />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="latest-section">
        <div className="latest-inner">
          <ScrollReveal>
            <div className="section-label">Latest</div>
          </ScrollReveal>
          <div className="latest-grid">
            {latestPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
          <div className="latest-footer">
            <ScrollReveal delay={0.3}>
              <Link to="/blog" data-cursor-hover>View all posts &rarr;</Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="about-teaser">
        <div className="about-teaser-inner">
          <ScrollReveal>
            <img src="/images/mike-vera-profile.png" alt="Mike Vera" className="about-teaser-photo" />
            <p>
              I'm Mike. I've had hyperhidrosis my entire life. I changed shirts three times a day.
              I avoided handshakes. Now I help other people change the pattern underneath.
            </p>
            <Link to="/about" data-cursor-hover>Read my story &rarr;</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Coaching Mention */}
      <section className="coaching-banner">
        <div className="coaching-banner-inner">
          <ScrollReveal>
            <p className="coaching-banner-text">
              Ready to go deeper? I offer <span className="text-gradient-sweep">1-on-1 lifestyle coaching</span> for hyperhidrosis.
            </p>
            <Link to="/work-with-me" className="cta-btn-primary" data-cursor-hover>Work With Me</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
