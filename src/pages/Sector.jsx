import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { isValidSectorSlug } from '../config/sectors';

export default function Sector() {
  const { slug } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!isValidSectorSlug(slug)) {
    return <Navigate to="/" replace />;
  }

  const title = t(`nav.sectorItems.${slug}`);
  const metaDescription = t(`sectorPage.items.${slug}.metaDescription`);
  const intro = t(`sectorPage.items.${slug}.intro`);
  const text = t(`sectorPage.items.${slug}.text`);

  return (
    <>
      <Seo
        title={title}
        description={metaDescription}
        path={`/sectors/${slug}`}
      />

      <div>
        <div className="bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] py-14 md:py-18">
          <div className="container-xl">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/50 text-sm mb-5">
              <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <span>/</span>
              <span className="text-white/70">{t('sectorPage.breadcrumbSectors')}</span>
              <span>/</span>
              <span className="text-white">{title}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight max-w-4xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="bg-white py-12 md:py-16">
          <div className="container-xl">
            <article className="max-w-3xl mx-auto">
              {intro && (
                <p className="text-lg md:text-xl text-black leading-relaxed mb-6 font-medium">
                  {intro}
                </p>
              )}

              {text && (
                <p className="text-black text-base leading-[1.8]">
                  {text}
                </p>
              )}

              <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#c8102e] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#a00d24] transition-colors text-sm uppercase tracking-wider"
                >
                  {t('sectorPage.ctaButton')}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[#0f1c3f] font-semibold hover:text-[#c8102e] transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  {t('sectorPage.backHome')}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
