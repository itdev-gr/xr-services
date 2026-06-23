import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

export const LANGUAGES = [
  { code: 'el', label: 'EL', flag: '🇬🇷', name: 'Ελληνικά' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'it', label: 'IT', flag: '🇮🇹', name: 'Italiano' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
];

export function MobileLanguageSwitcher({ onChange }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
    onChange?.();
  };

  return (
    <div ref={ref} className="relative px-6 py-5 border-t border-gray-200 shrink-0 flex justify-end">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 hover:border-[#c8102e]/30 transition-colors"
        aria-expanded={open}
        aria-label={t('nav.language')}
      >
        <span className="text-lg leading-none" aria-hidden="true">{current.flag}</span>
        <span>{current.name}</span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-6 right-6 bottom-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[110] max-h-64 overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                lang.code === i18n.language
                  ? 'bg-red-50 text-[#c8102e] font-bold'
                  : 'text-gray-900 font-medium hover:bg-gray-50'
              }`}
            >
              <span className="text-xl leading-none" aria-hidden="true">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LanguageSwitcher({ dark = false }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
          dark
            ? 'text-white hover:bg-white/10'
            : 'text-black hover:bg-gray-100'
        }`}
        aria-label="Select language"
      >
        <span className="text-base leading-none" aria-hidden="true">{current.flag}</span>
        <span className="font-semibold tracking-wide">{current.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                lang.code === i18n.language
                  ? 'bg-red-50 text-red-700 font-semibold'
                  : 'text-black hover:bg-gray-50'
              }`}
            >
              <span className="text-lg leading-none" aria-hidden="true">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
