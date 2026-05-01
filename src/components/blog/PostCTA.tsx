const HEALTHIE_URL =
  'https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=3464974&require_offering=true&offering_id=245235&hide_package_images=false&primary_color=000000';

// MailChimp: paste your form action URL from Audience → Signup forms → Embedded forms
const MAILCHIMP_ACTION = 'PASTE_MAILCHIMP_FORM_ACTION_URL_HERE';

export default function PostCTA() {
  return (
    <div style={{ marginTop: '3.5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>

      {/* Email opt-in */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Get notified when the next investigation drops.
        </h3>
        <p style={{ opacity: 0.65, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          No fluff. Just the research.
        </p>
        <form
          action={MAILCHIMP_ACTION}
          method="post"
          target="_blank"
          noValidate
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <input
            type="email"
            name="EMAIL"
            placeholder="your@email.com"
            required
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
          {/* MailChimp bot-protection — do not remove */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input type="text" name="b_REPLACE_WITH_HIDDEN_FIELD_NAME" tabIndex={-1} defaultValue="" />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              background: '#0d947e',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            I am in
          </button>
        </form>
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
