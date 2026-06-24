import { grantAnalyticsConsent, hasAnalyticsConsent, saveAnalyticsConsent } from './analytics';

const COPY = {
  el: {
    ariaLabel: 'Ειδοποίηση cookies',
    message: 'Χρησιμοποιούμε cookies 🍪 για καλύτερη εμπειρία πλοήγησης. Συνεχίζοντας, αποδέχεστε τα analytics cookies μας.',
    learnMore: 'Μάθετε περισσότερα',
    accept: 'ΣΥΜΦΩΝΩ',
  },
  en: {
    ariaLabel: 'Cookie notice',
    message: 'We use cookies 🍪 to offer you a better browsing experience. By continuing, you accept our analytics cookies.',
    learnMore: 'Learn more',
    accept: 'I AGREE',
  },
};

function getCopy() {
  const lang = (document.documentElement.lang || 'el').slice(0, 2);
  return COPY[lang] || COPY.el;
}

let accepting = false;

function acceptCookies(event) {
  if (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  if (accepting || hasAnalyticsConsent()) return;
  accepting = true;

  saveAnalyticsConsent();

  const bar = document.getElementById('xr-cookie-banner');
  if (bar) bar.remove();

  void grantAnalyticsConsent();
}

function buildBanner() {
  const copy = getCopy();
  const bar = document.createElement('div');
  bar.id = 'xr-cookie-banner';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-live', 'polite');
  bar.setAttribute('aria-label', copy.ariaLabel);

  bar.innerHTML = `
    <div class="xr-cookie-banner__inner">
      <div class="xr-cookie-banner__content">
        <p class="xr-cookie-banner__text">
          ${copy.message}
          <a class="xr-cookie-banner__link" href="/cookies">${copy.learnMore}</a>
        </p>
        <button type="button" class="xr-cookie-banner__button" data-cookie-accept>${copy.accept}</button>
      </div>
    </div>
  `;

  const button = bar.querySelector('[data-cookie-accept]');
  button.addEventListener('click', acceptCookies, { capture: true });
  button.addEventListener('touchend', acceptCookies, { capture: true, passive: false });

  return bar;
}

export function initCookieBanner() {
  if (typeof document === 'undefined') return;
  if (hasAnalyticsConsent()) return;
  if (document.getElementById('xr-cookie-banner')) return;

  window.__xrAcceptCookies = acceptCookies;
  document.body.appendChild(buildBanner());
}
