import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="404 — Η σελίδα δεν βρέθηκε"
        description="Η σελίδα που αναζητάτε δεν υπάρχει."
        noindex
      />

      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] px-4">
        <div className="text-center max-w-md">
          <p className="text-[#c8102e] text-7xl font-black mb-4">404</p>
          <h1 className="text-2xl font-black text-white mb-3">
            Η σελίδα δεν βρέθηκε
          </h1>
          <p className="text-white/70 mb-8 leading-relaxed">
            Η διεύθυνση που πληκτρολογήσατε δεν αντιστοιχεί σε σελίδα του site.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-[#c8102e] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#a00d24] transition-colors uppercase text-sm tracking-wider"
          >
            {t('nav.home')}
          </Link>
        </div>
      </div>
    </>
  );
}
