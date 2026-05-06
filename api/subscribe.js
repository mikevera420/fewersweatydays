// FewerSweatyDays / Hyperhidrosis funnel — newsletter + lead magnet capture
// Mirrors the dontwantsugar pattern, simplified for HH (no quiz fields).
// Subscribes the email to MailChimp with tag 'hh' so the existing HH Customer
// Journey fires Email 1, which delivers the Mechanism Guide PDF link.

async function saveToSupabase(payload) {
  const url = process.env.SUPABASE_URL;
  // Anon key is sufficient — the contacts table has an RLS policy
  // ("Allow anonymous lead capture") that grants INSERT to the anon role.
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn('Supabase env vars missing; skipping CRM save');
    return;
  }
  try {
    const res = await fetch(`${url}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error('Supabase save failed:', res.status, txt.slice(0, 200));
    }
  } catch (err) {
    console.error('Supabase save error:', err.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { first_name, email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Please provide an email address.' });
  }

  const sanitizedFirstName = first_name ? String(first_name).trim().slice(0, 100) : '';
  const sanitizedEmail = String(email).trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!process.env.MAILCHIMP_API_KEY) {
    console.error('MAILCHIMP_API_KEY missing');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const auth = Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64');

  const payload = {
    email_address: sanitizedEmail,
    status: 'subscribed',
    merge_fields: {
      FNAME: sanitizedFirstName,
      SFUNNEL: 'hh',
    },
    tags: ['hh'],
  };

  try {
    const response = await fetch(
      'https://us10.api.mailchimp.com/3.0/lists/95e2a14c14/members',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok && data.title !== 'Member Exists') {
      console.error('Mailchimp error:', data);
      return res.status(500).json({ error: data.detail || 'Subscription failed' });
    }

    // If "Member Exists", still tag them with hh so the HH journey fires
    if (data.title === 'Member Exists') {
      const subscriberHash = await (async () => {
        const enc = new TextEncoder().encode(sanitizedEmail);
        const buf = await crypto.subtle.digest('MD5', enc).catch(() => null);
        if (!buf) {
          // Fallback: use Node crypto
          const { createHash } = await import('node:crypto');
          return createHash('md5').update(sanitizedEmail).digest('hex');
        }
        return Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
      })();

      try {
        await fetch(
          `https://us10.api.mailchimp.com/3.0/lists/95e2a14c14/members/${subscriberHash}/tags`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${auth}`,
            },
            body: JSON.stringify({ tags: [{ name: 'hh', status: 'active' }] }),
          }
        );
      } catch (tagErr) {
        console.error('Tag-on-existing error:', tagErr.message);
      }
    }

    // Save to Supabase CRM (non-blocking)
    await saveToSupabase({
      first_name: sanitizedFirstName,
      email: sanitizedEmail,
      source_funnel: 'hh_funnel',
      stage: 'lead',
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Network error:', error);
    return res.status(500).json({ error: 'Network error' });
  }
}
