export const COOKIE_CONSENT_KEY = 'xr_cookie_consent';
export const GA_MEASUREMENT_ID = 'G-W4379VWJ0B';

export function hasAnalyticsConsent() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

export function grantAnalyticsConsent() {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'granted');
  } catch {
    // ignore storage errors
  }

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.search,
    });
  }
}

export function trackPageView(path) {
  if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
}
