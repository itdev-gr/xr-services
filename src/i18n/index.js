import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import el from './locales/el.json';

const lazyLocales = {
  en: () => import('./locales/en.json'),
  de: () => import('./locales/de.json'),
  fr: () => import('./locales/fr.json'),
  es: () => import('./locales/es.json'),
  it: () => import('./locales/it.json'),
};

export async function ensureLocale(lng) {
  if (lng === 'el' || i18n.hasResourceBundle(lng, 'translation')) return;
  const loader = lazyLocales[lng];
  if (!loader) return;
  const mod = await loader();
  i18n.addResourceBundle(lng, 'translation', mod.default ?? mod);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      el: { translation: el },
    },
    fallbackLng: {
      default: ['en', 'el'],
      el: ['el'],
      en: ['en', 'el'],
      de: ['de', 'en'],
      fr: ['fr', 'en'],
      es: ['es', 'en'],
      it: ['it', 'en'],
    },
    lng: 'el',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', ensureLocale);
ensureLocale(i18n.language);

export default i18n;
