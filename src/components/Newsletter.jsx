// Newsletter component
// TODO: Connect handleNewsletterSubmit() to one of:
//   - Mailchimp: POST to /3.0/lists/{list_id}/members
//   - Brevo (Sendinblue): POST to /v3/contacts
//   - Supabase: insert into 'newsletter_subscribers' table
//   - Custom API: POST to /api/newsletter/subscribe

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { subscribeToMailchimp } from '../utils/mailchimp';

export default function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('newsletter.errorEmail'));
      return;
    }
    setError('');
    setStatus('loading');
    try {
      await subscribeToMailchimp(email, 'newsletter');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('idle');
      setError('Κάτι πήγε στραβά. Δοκιμάστε ξανά.');
    }
  };

  return (
    <section className="bg-[#c8102e]">
      <div className="container-xl py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">

          {/* Left — Text */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
              {t('newsletter.title')}
            </h2>
            <p className="text-white text-base leading-relaxed max-w-sm">
              {t('newsletter.subtitle')}
            </p>
          </div>

          {/* Right — Form */}
          <div className="flex-1 min-w-0">
            {status === 'success' ? (
              <div className="flex items-center gap-3 text-white font-semibold">
                <CheckCircle size={22} />
                <span>{t('newsletter.success')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex gap-0 shadow-lg">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder={t('newsletter.placeholder')}
                    className="flex-1 min-w-0 bg-white text-black placeholder-gray-400 px-5 py-4 text-sm focus:outline-none rounded-l-xl"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-shrink-0 bg-[#0f1c3f] hover:bg-[#0a1228] text-white font-bold px-6 py-4 text-sm rounded-r-xl transition-colors duration-200 flex items-center gap-2 whitespace-nowrap disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {t('newsletter.submit')}
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
                {error && <p className="text-white/80 text-xs mt-2">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
