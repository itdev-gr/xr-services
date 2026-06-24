import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import {
  grantAnalyticsConsent,
  hasAnalyticsConsent,
  saveAnalyticsConsent,
} from '../utils/analytics';
import { useLabels } from '../hooks/useLabels';

export default function CookieBanner() {
  const { t } = useTranslation();
  const { tu } = useLabels();
  const acceptedRef = useRef(false);
  const [hidden, setHidden] = useState(() => hasAnalyticsConsent());

  const accept = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (acceptedRef.current || hidden || hasAnalyticsConsent()) return;
    acceptedRef.current = true;

    saveAnalyticsConsent();
    setHidden(true);
    void grantAnalyticsConsent();
  }, [hidden]);

  if (hidden || typeof document === 'undefined') return null;

  return createPortal(
    <div
      id="xr-cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label={t('cookieBanner.ariaLabel')}
      className="fixed inset-x-0 bottom-0 z-[100000] border-t border-white/10 bg-[#0f1c3f] shadow-[0_-8px_30px_rgba(0,0,0,0.25)] pb-[max(0px,env(safe-area-inset-bottom))]"
    >
      <div className="container-xl py-4 md:py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <p className="text-white text-sm sm:text-[15px] leading-relaxed md:pr-6">
            {t('cookieBanner.message')}{' '}
            <a
              href="/cookies"
              className="text-[#c8102e] font-semibold underline underline-offset-2 hover:text-[#e01535] transition-colors whitespace-nowrap"
            >
              {t('cookieBanner.learnMore')}
            </a>
          </p>

          <button
            type="button"
            onClick={accept}
            onPointerUp={accept}
            className="shrink-0 w-full sm:w-auto min-h-[48px] sm:min-h-[44px] self-stretch sm:self-auto bg-[#c8102e] hover:bg-[#a00d24] active:bg-[#a00d24] text-white font-bold text-sm px-6 py-3 sm:py-2.5 rounded-md uppercase tracking-wide touch-manipulation cursor-pointer select-none"
          >
            {tu('cookieBanner.accept')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
