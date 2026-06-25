export const COOKIE_CONSENT_KEY = 'xr_cookie_consent';
export const GA_MEASUREMENT_ID = 'G-W4379VWJ0B';

let analyticsInitPromise = null;
let consentGrantedInMemory = false;

function readConsent(storage) {
  try {
    return storage.getItem(COOKIE_CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

export function hasAnalyticsConsent() {
  if (consentGrantedInMemory) return true;
  if (typeof window === 'undefined') return false;
  return readConsent(localStorage) || readConsent(sessionStorage);
}

export function saveAnalyticsConsent() {
  consentGrantedInMemory = true;

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'granted');
  } catch {
    // ignore storage errors
  }

  try {
    sessionStorage.setItem(COOKIE_CONSENT_KEY, 'granted');
  } catch {
    // ignore storage errors
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('xr:cookie-consent'));
  }
}

function loadGtagScript() {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export function initAnalytics() {
  if (analyticsInitPromise) return analyticsInitPromise;

  analyticsInitPromise = (async () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

    const cookieConsent = hasAnalyticsConsent() ? 'granted' : null;

    window.gtag('js', new Date());
    window.gtag('consent', 'default', {
      analytics_storage: cookieConsent === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });

    await loadGtagScript();

    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: cookieConsent === 'granted',
    });
  })();

  return analyticsInitPromise;
}

export async function grantAnalyticsConsent() {
  saveAnalyticsConsent();

  void initAnalytics().then(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname + window.location.search,
      });
    }
  });
}

export function trackPageView(path) {
  if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
}
