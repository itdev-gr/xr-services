export async function subscribeToMailchimp(email, source = 'website') {
  const response = await fetch('/api/mailchimp-subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Subscription failed');
  }

  return data;
}
