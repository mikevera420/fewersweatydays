import { useEffect } from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Terms() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-legal">
      <section className="legal-hero">
        <div className="section-inner">
          <ScrollReveal><div className="section-label">Legal</div></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="legal-hero-title">Terms of Service</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="legal-hero-sub">Last updated: April 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="content-section">
        <div className="section-inner legal-prose">
          <ScrollReveal>
            <h2>What This Service Is</h2>
            <p>
              FewerSweatyDays provides lifestyle coaching and educational content for people dealing
              with hyperhidrosis. Our services are provided by a National Board Certified Health &
              Wellness Coach (NBC-HWC) through Avantia Health Optimization LLC.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>What This Service Is Not</h2>
            <p>
              <strong>This is not medical treatment.</strong> FewerSweatyDays does not diagnose, treat,
              cure, or prevent any disease or medical condition. Our coaching is not a substitute for
              professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              As a health and wellness coach, Mike Vera operates within the NBC-HWC scope of practice:
              partnering with clients to facilitate lifestyle changes through evidence-informed strategies.
              He does not prescribe medications, order tests, or provide medical diagnoses.
            </p>
            <p>
              If you are experiencing a medical emergency, contact your local emergency services
              immediately. Always consult with a qualified healthcare provider before making changes
              to any treatment plan.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Strategy Sessions</h2>
            <p>
              Strategy sessions are booked through Healthie and cost $1. Sessions are 45 minutes and
              conducted virtually. By booking a session, you agree to:
            </p>
            <ul>
              <li>Show up on time or provide at least 24 hours notice for cancellation</li>
              <li>Engage honestly about your health history and current situation</li>
              <li>Understand that the session is exploratory — not a commitment to ongoing coaching</li>
            </ul>
            <p>
              No-shows or late cancellations may result in being unable to book future sessions.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Coaching Engagements</h2>
            <p>
              If you choose to proceed with ongoing coaching after your strategy session, the terms
              of that engagement (duration, frequency, pricing, and expectations) will be agreed upon
              separately. All coaching engagements are voluntary and can be ended by either party
              with reasonable notice.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Content Disclaimer</h2>
            <p>
              The blog posts, articles, and educational content on this website are for informational
              purposes only. They reflect the author's interpretation of publicly available research
              and personal experience. They are not medical advice.
            </p>
            <p>
              While we strive to reference credible, peer-reviewed research, we make no guarantees
              about the completeness or applicability of any information to your specific situation.
              Individual results vary. What works for one person may not work for another.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Intellectual Property</h2>
            <p>
              All content on FewerSweatyDays.com — including text, images, and design — is the
              property of Avantia Health Optimization LLC. You're welcome to share links to our
              content, but please don't reproduce or distribute it without written permission.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Limitation of Liability</h2>
            <p>
              Avantia Health Optimization LLC and Mike Vera are not liable for any outcomes resulting
              from the use of information provided through this website or coaching services. By using
              this site and our services, you acknowledge that lifestyle changes carry inherent
              uncertainty and that results are not guaranteed.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the website after changes
              are posted constitutes acceptance of the updated terms.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Reach out at{' '}
              <a href="mailto:hello@fewersweatydays.com">hello@fewersweatydays.com</a>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
