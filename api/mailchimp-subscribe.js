import crypto from 'node:crypto';

function getSubscriberHash(email) {
  return crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!apiKey || !listId) {
    return res.status(500).json({ error: 'Mailchimp is not configured' });
  }

  const datacenter = apiKey.split('-').pop();
  if (!datacenter) {
    return res.status(500).json({ error: 'Invalid Mailchimp API key format' });
  }

  const { email, source = 'website' } = req.body ?? {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const status = process.env.MAILCHIMP_STATUS || 'subscribed';
  const payload = {
    email_address: email.trim().toLowerCase(),
    status_if_new: status,
    status,
  };

  if (source) {
    payload.tags = [String(source)];
  }

  const baseUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`;
  const headers = {
    Authorization: `apikey ${apiKey}`,
    'Content-Type': 'application/json',
  };

  try {
    let response = await fetch(baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (response.status === 400) {
      const errorBody = await response.json();
      const isMemberExists = errorBody?.title === 'Member Exists'
        || errorBody?.detail?.includes('already a list member');

      if (isMemberExists) {
        const hash = getSubscriberHash(email);
        response = await fetch(`${baseUrl}/${hash}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            email_address: email.trim().toLowerCase(),
            status_if_new: status,
            ...(source ? { tags: [String(source)] } : {}),
          }),
        });
      } else {
        return res.status(400).json({ error: errorBody?.detail || 'Subscription failed' });
      }
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errorBody?.detail || errorBody?.title || 'Subscription failed',
      });
    }

    const data = await response.json();
    return res.status(200).json({
      success: true,
      id: data.id,
      email: data.email_address,
    });
  } catch {
    return res.status(500).json({ error: 'Unable to connect to Mailchimp' });
  }
}
