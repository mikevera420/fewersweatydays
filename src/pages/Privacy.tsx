import { useEffect } from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Privacy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-legal">
      <section className="legal-hero">
        <div className="section-inner">
          <ScrollReveal><div className="section-label">Legal</div></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="legal-hero-title">Privacy Policy</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="legal-hero-sub">Last updated: September 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="content-section">
        <div className="section-inner legal-prose">
          <ScrollReveal>
            <h2>Who We Are</h2>
            <p>
              FewerSweatyDays is a lifestyle coaching service operated by Avantia Health Optimization LLC.
              This website provides educational content and coaching services for people dealing with
              hyperhidrosis. When we say "we," "us," or "our," we mean Avantia Health Optimization LLC.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>What Information We Collect</h2>
            <p>
              <strong>When you book a strategy session:</strong> Scheduling is handled through Healthie,
              a HIPAA-compliant platform. When you book, Healthie collects your name, email address, and
              payment information. We do not store your payment details directly — that's handled entirely
              by Healthie's payment processor.
            </p>
            <p>
              <strong>When you allow analytics:</strong> We use Google Analytics to understand which
              pages people visit, how they arrived, general geographic region, device and browser type,
              and interactions such as clicks to an external booking link. We do not send names,
              email addresses, health details, or booking information. The embedded Healthie scheduler
              is a separate service, and we do not use Google Analytics to inspect what you enter there.
            </p>
            <p>
              <strong>When you contact us:</strong> If you email us at hello@fewersweatydays.com, we
              receive whatever information you include in your message.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our coaching services</li>
              <li>Schedule and manage your sessions</li>
              <li>Respond to your questions and requests</li>
              <li>Understand how people use our website so we can make it better</li>
            </ul>
            <p>
              We do not sell, rent, or share your personal information with third parties for their
              marketing purposes. Period.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Cookies</h2>
            <p>
              Google Analytics loads only after you select Allow analytics. It uses first-party cookies
              to distinguish visits and sessions. Your choice is stored in your browser. You can reopen
              Analytics choices from the site footer, decline analytics, clear cookies, or use Google's
              browser opt-out tool. Declining analytics does not prevent you from using the site.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Healthie</strong> — Session scheduling and client management (HIPAA-compliant)</li>
              <li><strong>Vercel</strong> — Website hosting</li>
              <li>
                <strong>Google Analytics</strong>: Consent-based website traffic and interaction
                measurement. Learn{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                  how Google uses information from sites that use its services
                </a>{' '}
                or install the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                  Google Analytics opt-out browser add-on
                </a>.
              </li>
            </ul>
            <p>Each of these services has their own privacy policy governing how they handle your data.</p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal
              information. If you'd like to exercise any of these rights, email us at
              hello@fewersweatydays.com and we'll respond within 30 days.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Health Information Disclaimer</h2>
            <p>
              FewerSweatyDays provides lifestyle coaching, not medical treatment. We are not a covered
              entity under HIPAA. However, we treat all health-related information shared during coaching
              sessions with the highest level of confidentiality and care. We will never share your
              personal health information without your explicit consent.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. When we do, we'll update the "last
              updated" date at the top. We encourage you to review this page periodically.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Contact</h2>
            <p>
              If you have questions about this privacy policy, reach out to us at{' '}
              <a href="mailto:hello@fewersweatydays.com">hello@fewersweatydays.com</a>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
