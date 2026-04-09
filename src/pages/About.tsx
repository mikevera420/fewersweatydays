import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { GraduationCap, FlaskConical, Dumbbell, BadgeCheck } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';

const timeline = [
  { label: 'Childhood', text: 'Hyperhidrosis starts. No explanation. No name for it. Just the reality of being the kid who sweats through everything.' },
  { label: 'Temple University', text: 'Psychology degree. Started understanding why the brain does what it does — and why mine seemed stuck in overdrive.' },
  { label: 'Penn State', text: 'Cognitive research at the Cognition Lab. Dug into the science of how the nervous system processes threat and stress.' },
  { label: 'Graduate School', text: 'Master\'s in Exercise Science. Connected the dots between movement, autonomic function, and symptom patterns.' },
  { label: 'NBC-HWC', text: 'National Board Certified Health & Wellness Coach. The credential that lets me do this work within a clear scope of practice.' },
  { label: 'FewerSweatyDays', text: 'Built the thing I wish existed when I was looking for help. Research-backed writing and coaching for people with HH.' },
];

const credentials = [
  { icon: GraduationCap, label: 'Psychology — Temple University', color: '#5b8def' },
  { icon: FlaskConical, label: 'Cognition Lab — Penn State', color: '#8b7ae8' },
  { icon: Dumbbell, label: "Master's — Exercise Science", color: '#e87c5d' },
  { icon: BadgeCheck, label: 'NBC-HWC Certified', color: '#2dd4b3' },
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const credRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Timeline drawing animation — line grows as you scroll, dots pop in
  useEffect(() => {
    if (!timelineRef.current || !timelineLineRef.current) return;

    const dots = timelineRef.current.querySelectorAll('.timeline-dot');
    const items = timelineRef.current.querySelectorAll('.timeline-content');

    // Animate the timeline line drawing down
    gsap.fromTo(timelineLineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5,
        }
      }
    );

    // Dots scale in with bounce
    dots.forEach((dot, i) => {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5,
          delay: i * 0.12,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 82%',
            once: true,
          }
        }
      );
    });

    // Content slides in from left with stagger
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          }
        }
      );
    });
  }, []);

  // Credentials — rotate in slightly
  useEffect(() => {
    if (!credRef.current) return;
    const badges = credRef.current.querySelectorAll('.credential-badge');
    badges.forEach((badge, i) => {
      gsap.fromTo(badge,
        { opacity: 0, y: 15, rotation: -3 },
        {
          opacity: 1, y: 0, rotation: 0,
          duration: 0.6,
          delay: i * 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badge,
            start: 'top 88%',
            once: true,
          }
        }
      );
    });
  }, []);

  return (
    <div className="page-about">
      <section className="about-hero">
        <div className="section-inner">
          <ScrollReveal><div className="section-label">About</div></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="about-hero-title">I spent my whole life engineering around a condition nobody could see.</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="about-hero-sub">Then I stopped hiding and started understanding.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro card — photo + short version side by side */}
      <section className="content-section bg-neutral">
        <div className="section-inner">
          <ScrollReveal>
            <div className="about-intro-card">
              <img src="/images/mike-vera-profile.png" alt="Mike Vera" className="about-intro-photo" />
              <div className="about-intro-text">
                <h2>The short version</h2>
                <p>
                  I've had hyperhidrosis my entire life. I changed shirts three times a day. I avoided
                  handshakes. I turned down opportunities because they involved situations I couldn't control.
                  I did everything the medical system suggested — prescriptions, clinical-strength antiperspirants,
                  even considered surgery — and none of it addressed the actual problem.
                </p>
                <p>
                  The actual problem was my nervous system. It was stuck in overdrive, and every
                  "treatment" was attacking the output while ignoring the signal.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="content-section bg-cool">
        <div className="section-inner about-prose">
          <ScrollReveal>
            <h2>The journey</h2>
          </ScrollReveal>
          <div className="about-timeline" ref={timelineRef}>
            <div className="about-timeline-line" ref={timelineLineRef} />
            {timeline.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-label">{item.label}</span>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="content-section bg-warm">
        <div className="section-inner about-prose">
          <ScrollReveal>
            <h2>The credentials</h2>
          </ScrollReveal>
          <div className="credential-badges" ref={credRef}>
            {credentials.map((cred, i) => {
              const Icon = cred.icon;
              return (
                <div key={i} className="credential-badge" style={{ borderColor: `${cred.color}30`, opacity: 0 }}>
                  <div className="credential-badge-icon-wrap" style={{ background: `${cred.color}15` }}>
                    <Icon size={20} style={{ color: cred.color }} />
                  </div>
                  <span>{cred.label}</span>
                </div>
              );
            })}
          </div>
          <ScrollReveal>
            <p>
              I didn't become a health coach because I thought it sounded nice. I became one because the
              intersection of neuroscience, behavior change, and how the nervous system regulates itself is exactly where
              hyperhidrosis lives — and nobody was connecting those dots.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="content-section">
        <div className="section-inner about-prose">
          <ScrollReveal>
            <h2>The philosophy</h2>
            <div className="about-callout">
              <p>
                <strong>I am not a doctor. I do not treat hyperhidrosis.</strong> I coach people through
                lifestyle changes that influence the nervous system patterns underneath their symptoms.
              </p>
            </div>
            <p>
              That means stress management that actually targets your baseline. Nutrition strategies
              that support a calmer system. Movement patterns that build resilience.
              Sleep optimization that gives your body a chance to reset. Social reintegration
              that breaks the isolation loop.
            </p>
            <p>None of this replaces medical care. All of it fills the gap that medical care leaves wide open.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why this exists */}
      <section className="content-section bg-neutral">
        <div className="section-inner about-prose">
          <ScrollReveal>
            <h2>Why this exists</h2>
            <p>
              FewerSweatyDays exists because when I was looking for help, the only things I found were
              product reviews, surgery testimonials, and well-meaning advice from people who didn't actually
              have HH. Nobody was talking about the nervous system. Nobody was connecting the research.
              Nobody was saying what I needed to hear:
            </p>
            <blockquote>The sweating isn't the problem. The pattern underneath is. And that pattern can change.</blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section section-cta bg-cool">
        <div className="section-inner section-cta-inner">
          <ScrollReveal>
            <h2 className="cta-headline">Ready to talk?</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="cta-body">
              If any of this resonates, I'd like to hear your story. No pitch. No pressure. Just a
              conversation with someone who gets it.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link to="/work-with-me" className="cta-btn-primary alive" data-cursor-hover>Book a $1 Strategy Session</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
