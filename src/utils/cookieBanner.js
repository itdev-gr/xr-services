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
  document.getElementById('xr-cookie-banner')?.remove();
  void grantAnalyticsConsent();
}

function bindAcceptButton(button) {
  if (!button || button.dataset.bound === 'true') return;
  button.dataset.bound = 'true';
  button.addEventListener('click', acceptCookies, { capture: true });
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
        <button
          type="button"
          class="xr-cookie-banner__button"
          data-cookie-accept
          onclick="window.__xrAcceptCookies && window.__xrAcceptCookies(event)"
        >${copy.accept}</button>
      </div>
    </div>
  `;

  bindAcceptButton(bar.querySelector('[data-cookie-accept]'));
  return bar;
}

export function initCookieBanner() {
  if (typeof document === 'undefined') return;

  window.__xrAcceptCookies = acceptCookies;

  if (hasAnalyticsConsent()) {
    document.getElementById('xr-cookie-banner')?.remove();
    return;
  }

  let bar = document.getElementById('xr-cookie-banner');
  if (!bar) {
    document.body.appendChild(buildBanner());
    return;
  }

  bindAcceptButton(bar.querySelector('[data-cookie-accept]'));
}
