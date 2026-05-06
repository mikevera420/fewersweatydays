import { useState, type FormEvent } from 'react';
import ScrollReveal from '../ui/ScrollReveal';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Try again.');
      }

      setStatus('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setErrorMessage(message);
      setStatus('error');
    }
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <ScrollReveal>
          {status === 'success' ? (
            <div className="newsletter-success">
              <h2 className="newsletter-headline">Check your email.</h2>
              <p className="newsletter-sub">
                The Mechanism Guide is on its way to your inbox. If you don't see it in a few minutes, check your spam folder.
              </p>
            </div>
          ) : (
            <>
              <div className="newsletter-eyebrow">Free Guide</div>
              <h2 className="newsletter-headline">
                The Hyperhidrosis Mechanism Your Dermatologist Didn't Have Time to Explain
              </h2>
              <p className="newsletter-sub">
                A research-backed look at the nervous system feedback loop driving primary focal hyperhidrosis, and what the evidence says about interrupting it. Fourteen pages, fully cited.
              </p>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="newsletter-input"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                  autoComplete="given-name"
                />
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className="newsletter-submit"
                  disabled={status === 'submitting'}
                  data-cursor-hover
                >
                  {status === 'submitting' ? 'Sending...' : 'Send me the guide'}
                </button>
              </form>
              {status === 'error' && (
                <p className="newsletter-error">{errorMessage}</p>
              )}
              <p className="newsletter-fineprint">
                One email with the PDF, plus occasional research-backed writing on lifestyle and the nervous system. Unsubscribe any time.
              </p>
            </>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
