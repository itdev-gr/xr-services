import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ArrowLeft, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.blog-animate'), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('nav.articles')} | XR Services</title>
        <meta name="description" content={t('articles.subtitle')} />
      </Helmet>

      <div ref={ref}>
        <div className="bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] py-16 md:py-20">
          <div className="container-xl">
            <div className="blog-animate flex items-center gap-2 text-white/50 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <span>/</span>
              <span className="text-white">{t('nav.articles')}</span>
            </div>
            <h1 className="blog-animate text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {t('nav.articles')}
            </h1>
            <p className="blog-animate text-white/70 text-base max-w-2xl">
              {t('articles.subtitle')}
            </p>
          </div>
        </div>

        <div className="py-16 md:py-20 bg-gray-50/50">
          <div className="container-xl">
            <div className="blog-animate max-w-lg mx-auto text-center bg-white rounded-2xl border border-gray-100 px-8 py-14 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                <Newspaper size={28} className="text-[#c8102e]" />
              </div>
              <h2 className="text-xl font-black text-[#0f1c3f] mb-3">
                {t('articles.emptyTitle')}
              </h2>
              <p className="text-black text-sm sm:text-base leading-relaxed">
                {t('articles.emptyMessage')}
              </p>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#0f1c3f] font-semibold hover:text-[#c8102e] transition-colors"
              >
                <ArrowLeft size={16} />
                {t('companyPage.backHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
