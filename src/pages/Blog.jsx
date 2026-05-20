import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ARTICLE_BG_COLORS = [
  'bg-gradient-to-br from-[#0f1c3f] to-[#1a2f5e]',
  'bg-gradient-to-br from-[#c8102e] to-[#a00d24]',
  'bg-gradient-to-br from-gray-700 to-gray-900',
  'bg-gradient-to-br from-[#1a2f5e] to-[#0f1c3f]',
  'bg-gradient-to-br from-[#a00d24] to-[#c8102e]',
  'bg-gradient-to-br from-gray-800 to-gray-700',
];

const ARTICLE_ICONS = ['📊', '📱', '🔢', '📋', '🏛️', '💼'];

const EXTRA_ARTICLES = [
  { date: '24 Απριλίου 2026', title: 'ΕΦΚΑ 2026: Νέες Εισφορές Αυτοαπασχολούμενων', excerpt: 'Αναλυτική παρουσίαση των νέων ποσοστών εισφορών για ελεύθερους επαγγελματίες και αυτοαπασχολούμενους για το 2026.' },
  { date: '17 Απριλίου 2026', title: 'Φορολόγηση Μερισμάτων: Τι Αλλάζει', excerpt: 'Νέο πλαίσιο φορολόγησης μερισμάτων από εταιρείες. Τι πρέπει να γνωρίζουν οι μέτοχοι και οι διαχειριστές.' },
  { date: '10 Απριλίου 2026', title: 'e-Τιμολόγιο: Πλήρης Οδηγός Εφαρμογής', excerpt: 'Βήμα-βήμα οδηγός για την υποχρεωτική εφαρμογή του ηλεκτρονικού τιμολογίου. Προθεσμίες και τεχνικές απαιτήσεις.' },
];

export default function Blog() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.blog-animate'), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const articles = ['article1', 'article2', 'article3'];

  return (
    <>
      <Helmet>
        <title>Ενημέρωση | XR Services</title>
        <meta name="description" content="Άρθρα και νέα για φορολογία, λογιστική και επιχειρηματικές εξελίξεις από την XR Services." />
      </Helmet>

      <div ref={ref}>
        {/* Hero banner */}
        <div className="bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] py-16 md:py-20">
          <div className="container-xl">
            <div className="blog-animate flex items-center gap-2 text-white/50 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">Αρχική</Link>
              <span>/</span>
              <span className="text-white">{t('nav.articles')}</span>
            </div>
            <h1 className="blog-animate text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{t('nav.articles')}</h1>
          </div>
        </div>

        {/* Articles grid */}
        <div className="py-16 bg-gray-50/50">
          <div className="container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((key, i) => (
                <article
                  key={key}
                  className="blog-animate group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`${ARTICLE_BG_COLORS[i]} h-48 flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-6xl opacity-30">{ARTICLE_ICONS[i]}</span>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                      <Calendar size={11} />
                      {t(`articles.items.${key}.date`)}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                      <Clock size={11} />
                      <span>5 λεπτά ανάγνωση</span>
                    </div>
                    <h2 className="font-bold text-[#0f1c3f] text-lg leading-tight mb-3 group-hover:text-[#c8102e] transition-colors duration-200">
                      {t(`articles.items.${key}.title`)}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                      {t(`articles.items.${key}.excerpt`)}
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 text-[#c8102e] text-sm font-semibold hover:gap-3 transition-all duration-200">
                      {t('articles.readMore')}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              ))}

              {/* Extra articles */}
              {EXTRA_ARTICLES.map((article, i) => (
                <article
                  key={article.title}
                  className="blog-animate group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`${ARTICLE_BG_COLORS[i + 3]} h-48 flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-6xl opacity-30">{ARTICLE_ICONS[i + 3]}</span>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                      <Calendar size={11} />
                      {article.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                      <Clock size={11} />
                      <span>4 λεπτά ανάγνωση</span>
                    </div>
                    <h2 className="font-bold text-[#0f1c3f] text-lg leading-tight mb-3 group-hover:text-[#c8102e] transition-colors duration-200">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 text-[#c8102e] text-sm font-semibold hover:gap-3 transition-all duration-200">
                      {t('articles.readMore')}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#0f1c3f] font-semibold hover:text-[#c8102e] transition-colors"
              >
                <ArrowLeft size={16} />
                Επιστροφή στην Αρχική
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
