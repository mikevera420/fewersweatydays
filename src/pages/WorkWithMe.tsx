import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PillarGrid from '../components/coaching/PillarGrid';
import ScrollReveal from '../components/ui/ScrollReveal';

const faqs = [
  { q: 'Is this medical treatment?', a: 'No. I\'m a National Board Certified Health & Wellness Coach (NBC-HWC), not a physician. I provide lifestyle guidance and behavior change coaching. I do not diagnose, treat, or prescribe. If you need medical treatment for hyperhidrosis, I encourage you to work with a dermatologist — and I can help you make the most of that relationship.' },
  { q: 'I\'ve had HH my whole life. Can lifestyle changes really make a difference?', a: 'Lifestyle changes don\'t "cure" hyperhidrosis. What they do is shift the baseline that determines how severe and how frequent your episodes are. Most people with HH have never had anyone look at the patterns underneath the symptoms — the stress, sleep, nutrition, and environment factors that keep the system stuck in overdrive. That\'s the gap this fills.' },
  { q: 'What happens in a strategy session?', a: 'We talk for 45 minutes. You tell me your story — when it started, what you\'ve tried, how it affects your life. I help you see the patterns you might be missing and give you a clear picture of what a coaching engagement would look like for your specific situation. No pitch. No pressure. If it\'s not a fit, I\'ll tell you.' },
  { q: 'Why $1?', a: 'Because "free" attracts people who aren\'t serious. One dollar filters for people who actually want to do the work. It\'s a nominal commitment that says "I\'m ready to have this conversation."' },
  { q: 'How long is a typical coaching engagement?', a: 'Most clients work with me for 3-6 months. The first month is assessment and protocol design. Months 2-4 are implementation and adjustment. Months 5-6 are refinement and independence building. Some people need less time, some need more. We figure that out together.' },
  { q: 'Do you work with people outside the US?', a: 'Yes. All sessions are virtual. I work with clients in multiple time zones. The only requirement is a stable internet connection and a willingness to do the work.' },
];

const priceComparisons = [
  { treatment: 'Botox injections (per session)', cost: '$1,000 - $1,500', freq: 'Every 3-6 months' },
  { treatment: 'ETS surgery', cost: '$15,000 - $30,000', freq: 'One-time (but 98% get compensatory sweating)' },
  { treatment: 'Prescription antiperspirants', cost: '$30 - $100/mo', freq: 'Ongoing, treats symptom only' },
  { treatment: 'MiraDry', cost: '$2,000 - $3,000', freq: 'Per session (underarms only)' },
];

export default function WorkWithMe() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const healthieUrl = 'https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=3464974&require_offering=true&offering_id=229095&hide_package_images=false&primary_color=000000';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-work">
      <section className="work-hero">
        <div className="section-inner">
          <ScrollReveal><div className="section-label">Work With Me</div></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="work-hero-title">Lifestyle coaching built specifically for hyperhidrosis</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="work-hero-sub">
              Not a dermatology appointment. Not a meditation app. A real plan for the part of
              hyperhidrosis nobody addresses — the lifestyle patterns underneath your symptoms.
              Built by someone who's been there.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <a href={healthieUrl} target="_blank" rel="noopener noreferrer" className="cta-btn-primary" data-cursor-hover>Book a $1 Strategy Session</a>
          </ScrollReveal>
        </div>
      </section>

      <section className="content-section bg-warm">
        <div className="section-inner">
          <ScrollReveal><h2 className="section-title">The Six Pillars</h2></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-sub">Every coaching engagement addresses all six systems. Click to explore.</p>
          </ScrollReveal>
          <PillarGrid />
        </div>
      </section>

      <section className="content-section bg-neutral">
        <div className="section-inner">
          <ScrollReveal><h2 className="section-title">What the strategy session looks like</h2></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="session-steps">
              <div className="session-step">
                <div className="session-step-num">01</div>
                <div>
                  <h3>You talk. I listen.</h3>
                  <p>Tell me everything. When it started, what triggers it, what you've tried, how it's affected your life. No judgment. No rushing.</p>
                </div>
              </div>
              <div className="session-step">
                <div className="session-step-num">02</div>
                <div>
                  <h3>I show you the pattern.</h3>
                  <p>Based on what you tell me, I'll help you see the nervous system patterns you've been missing. The feedback loops, the triggers, the gaps in your current approach.</p>
                </div>
              </div>
              <div className="session-step">
                <div className="session-step-num">03</div>
                <div>
                  <h3>You decide what's next.</h3>
                  <p>If coaching makes sense for your situation, I'll explain exactly what it looks like. If it doesn't, I'll tell you that too. No sales pitch. No artificial urgency.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="content-section bg-cool">
        <div className="section-inner">
          <ScrollReveal><h2 className="section-title">What you're comparing against</h2></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="section-sub">The medical system's options for hyperhidrosis — and what they actually cost.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="price-table-wrap">
              <table className="price-table">
                <thead>
                  <tr><th>Treatment</th><th>Cost</th><th>Frequency</th></tr>
                </thead>
                <tbody>
                  {priceComparisons.map((row, i) => (
                    <tr key={i}><td>{row.treatment}</td><td>{row.cost}</td><td>{row.freq}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="content-section bg-warm">
        <div className="section-inner">
          <ScrollReveal><h2 className="section-title">Frequently asked questions</h2></ScrollReveal>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className={`faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)} data-cursor-hover>
                    <span>{faq.q}</span>
                    <ChevronDown size={20} className={`faq-chevron${openFaq === i ? ' rotated' : ''}`} />
                  </button>
                  <div className={`faq-answer${openFaq === i ? ' visible' : ''}`}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section section-cta bg-cool">
        <div className="section-inner section-cta-inner">
          <ScrollReveal>
            <h2 className="cta-headline">One conversation. No obligation.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="cta-body">45 minutes with someone who actually understands what you're dealing with. That's all this is.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <a href={healthieUrl} target="_blank" rel="noopener noreferrer" className="cta-btn-primary cta-btn-large alive" data-cursor-hover>Book a $1 Strategy Session</a>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="cta-fine-print">45 minutes. $1. No obligation. Just answers.</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
