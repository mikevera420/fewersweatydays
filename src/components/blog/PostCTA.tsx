import { useState, type FormEvent } from 'react';

const HEALTHIE_URL =
  'https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=3464974&require_offering=true&offering_id=245235&hide_package_images=false&primary_color=000000';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function PostCTA() {
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
        body: JSON.stringify({ email: email.trim() }),
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
    <div style={{ marginTop: '3.5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>

      {/* Email opt-in */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        {status === 'success' ? (
          <>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Check your email.
            </h3>
            <p style={{ opacity: 0.65, fontSize: '0.9rem' }}>
              The Mechanism Guide is on its way to your inbox.
            </p>
          </>
        ) : (
          <>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Get notified when the next investigation drops.
            </h3>
            <p style={{ opacity: 0.65, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              No fluff. Just the research.
            </p>
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'submitting'}
                autoComplete="email"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'inherit',
                  fontSize: '0.9rem',
                  minWidth: '220px',
                }}
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  background: '#0d947e',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: status === 'submitting' ? 'wait' : 'pointer',
                  border: 'none',
                  opacity: status === 'submitting' ? 0.7 : 1,
                }}
              >
                {status === 'submitting' ? 'Sending...' : 'I am in'}
              </button>
            </form>
            {status === 'error' && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#ff8a8a' }}>
                {errorMessage}
              </p>
            )}
          </>
        )}
      </div>

      {/* Booking CTA */}
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '0.75rem',
        }}
      >
        <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', opacity: 0.9 }}>
          Ready to stop managing it and start understanding it?
        </p>
        <a
          href={HEALTHIE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn-primary"
          data-cursor-hover
        >
          Book a $1 Strategy Session
        </a>
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', opacity: 0.5 }}>
          45 minutes. One dollar. No obligation.
        </p>
      </div>

    </div>
  );
}
