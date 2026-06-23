import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { grantAnalyticsConsent, hasAnalyticsConsent } from '../utils/analytics';

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (hasAnalyticsConsent()) return;

    setVisible(true);
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const handleAccept = () => {
    grantAnalyticsConsent();
    setMounted(false);
    window.setTimeout(() => setVisible(false), 250);
  };

  if (!visible || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('cookieBanner.ariaLabel')}
      className={`fixed bottom-0 left-0 right-0 z-[10000] border-t border-white/10 bg-[#0f1c3f] shadow-[0_-8px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out ${
        mounted ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(30deg, rgba(255,255,255,0.15) 12%, transparent 12.5%, transparent 50%, rgba(255,255,255,0.15) 50.5%, rgba(255,255,255,0.15) 62%, transparent 62.5%, transparent)',
          backgroundSize: '24px 42px',
        }}
      />

      <div className="container-xl relative py-4 md:py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <p className="text-white text-sm sm:text-[15px] leading-relaxed md:pr-6">
            {t('cookieBanner.message')}{' '}
            <Link
              to="/cookies"
              className="text-[#c8102e] font-semibold underline underline-offset-2 hover:text-[#e01535] transition-colors whitespace-nowrap"
            >
              {t('cookieBanner.learnMore')}
            </Link>
          </p>

          <button
            type="button"
            onClick={handleAccept}
            className="shrink-0 self-start md:self-auto bg-[#c8102e] hover:bg-[#a00d24] text-white font-bold text-sm px-6 py-2.5 rounded-md transition-colors duration-200 uppercase tracking-wide"
          >
            {t('cookieBanner.accept')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
