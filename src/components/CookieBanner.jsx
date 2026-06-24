import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  COOKIE_CONSENT_KEY,
  grantAnalyticsConsent,
  hasAnalyticsConsent,
} from '../utils/analytics';
import { useLabels } from '../hooks/useLabels';

function shouldShowBanner() {
  if (typeof window === 'undefined') return false;
  return !hasAnalyticsConsent();
}

export default function CookieBanner() {
  const { t } = useTranslation();
  const { tu } = useLabels();
  const dismissedRef = useRef(false);
  const [show, setShow] = useState(shouldShowBanner);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'granted');
    } catch {
      // ignore storage errors (private mode)
    }

    setShow(false);
    void grantAnalyticsConsent();
  }, []);

  if (!show || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-label={t('cookieBanner.ariaLabel')}
      className="fixed inset-x-0 bottom-0 z-[100000] border-t border-white/10 bg-[#0f1c3f] shadow-[0_-8px_30px_rgba(0,0,0,0.25)] pb-[max(0px,env(safe-area-inset-bottom))]"
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(30deg, rgba(255,255,255,0.15) 12%, transparent 12.5%, transparent 50%, rgba(255,255,255,0.15) 50.5%, rgba(255,255,255,0.15) 62%, transparent 62.5%, transparent)',
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
            onClick={dismiss}
            className="shrink-0 w-full sm:w-auto min-h-[48px] sm:min-h-[44px] self-stretch sm:self-auto bg-[#c8102e] hover:bg-[#a00d24] active:bg-[#a00d24] text-white font-bold text-sm px-6 py-3 sm:py-2.5 rounded-md transition-colors duration-200 uppercase tracking-wide touch-manipulation cursor-pointer select-none [-webkit-tap-highlight-color:transparent]"
          >
            {tu('cookieBanner.accept')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
