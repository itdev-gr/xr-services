import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Bell, X, CheckCircle } from 'lucide-react';
import { subscribeToMailchimp } from '../utils/mailchimp';
import { hasAnalyticsConsent } from '../utils/analytics';

const STORAGE_KEY = 'xr-notification-prompt';
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 4000;

function getStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function shouldShowPrompt() {
  if (typeof window === 'undefined') return false;
  if (!hasAnalyticsConsent()) return false;

  const stored = getStoredState();
  if (stored?.subscribed) return false;

  if (stored?.dismissedAt) {
    const daysSince = (Date.now() - stored.dismissedAt) / (1000 * 60 * 60 * 24);
    return daysSince >= DISMISS_DAYS;
  }

  return true;
}

function persistState(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
}

export default function NotificationPrompt() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState('prompt');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!shouldShowPrompt()) return;

    const timer = window.setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setMounted(true));
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const hide = () => {
    setMounted(false);
    window.setTimeout(() => {
      setVisible(false);
      setStep('prompt');
      setEmail('');
      setError('');
      setLoading(false);
    }, 300);
  };

  const handleDismiss = () => {
    persistState({ dismissedAt: Date.now() });
    hide();
  };

  const handleYes = () => {
    setError('');
    setStep('email');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('notificationPrompt.emailInvalid'));
      return;
    }

    setError('');
    setLoading(true);

    try {
      await subscribeToMailchimp(email, 'popup');
      persistState({ subscribed: true, subscribedAt: Date.now() });
      setStep('success');
      window.setTimeout(hide, 2200);
    } catch (err) {
      setError(err.message || t('notificationPrompt.error'));
    } finally {
      setLoading(false);
    }
  };

  if (!visible || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      aria-label={t('notificationPrompt.ariaLabel')}
      className={`fixed inset-0 z-[9999] grid place-items-center p-4 sm:p-6 transition-opacity duration-300 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-[#0f1c3f]/20 backdrop-blur-[2px]" aria-hidden="true" />

      <div
        className={`relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out ${
          mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.98] translate-y-2'
        }`}
      >
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
          aria-label={t('notificationPrompt.close')}
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center px-6 pt-7 pb-5 sm:px-7">
          <div className="w-12 h-12 rounded-full bg-[#0f1c3f]/5 flex items-center justify-center mb-4">
            {step === 'success' ? (
              <CheckCircle size={22} className="text-[#c8102e]" aria-hidden="true" />
            ) : (
              <Bell size={22} className="text-[#0f1c3f]" aria-hidden="true" />
            )}
          </div>

          {step === 'prompt' && (
            <>
              <p className="text-[15px] sm:text-base text-black leading-relaxed mb-6">
                {t('notificationPrompt.message')}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-[#0f1c3f] border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {t('notificationPrompt.notYet')}
                </button>
                <button
                  type="button"
                  onClick={handleYes}
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#0f1c3f] hover:bg-[#1a2f5e] rounded-xl transition-colors"
                >
                  {t('notificationPrompt.yes')}
                </button>
              </div>
            </>
          )}

          {step === 'email' && (
            <>
              <p className="text-[15px] sm:text-base text-black leading-relaxed mb-5">
                {t('notificationPrompt.emailLead')}
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder={t('notificationPrompt.emailPlaceholder')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#c8102e] transition-colors"
                  autoFocus
                  required
                />

                {error && (
                  <p className="text-red-500 text-xs text-left">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 text-sm font-bold text-white bg-[#c8102e] hover:bg-[#a00d24] rounded-xl transition-colors disabled:opacity-70"
                >
                  {loading ? t('notificationPrompt.emailLoading') : t('notificationPrompt.emailSubmit')}
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <p className="text-[15px] sm:text-base text-black leading-relaxed mb-2">
              {t('notificationPrompt.success')}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
