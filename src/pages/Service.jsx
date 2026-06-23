import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { isValidServiceSlug, getServiceImage } from '../config/services';

export default function Service() {
  const { slug } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!isValidServiceSlug(slug)) {
    return <Navigate to="/#services-grid" replace />;
  }

  const title = t(`services.items.${slug}.title`);
  const metaDescription = t(`servicePage.items.${slug}.metaDescription`);
  const intro = t(`servicePage.items.${slug}.intro`);
  const paragraphs = t(`servicePage.items.${slug}.paragraphs`, { returnObjects: true });
  const includes = t(`servicePage.items.${slug}.includes`, { returnObjects: true });

  const paragraphList = Array.isArray(paragraphs) ? paragraphs : [];
  const includeList = Array.isArray(includes) ? includes : [];
  const image = getServiceImage(slug);

  return (
    <>
      <Helmet>
        <title>{title} | XR Services</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <div>
        <div className="bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] py-14 md:py-18">
          <div className="container-xl">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/50 text-sm mb-5">
              <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <span>/</span>
              <Link to="/#services-grid" className="hover:text-white transition-colors">
                {t('servicePage.breadcrumbServices')}
              </Link>
              <span>/</span>
              <span className="text-white">{title}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black text-white tracking-tight leading-tight max-w-4xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="bg-white py-12 md:py-16">
          <div className="container-xl">
            <article className="max-w-3xl mx-auto">
              {image && (
                <div className="mb-10 md:mb-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto max-h-[420px] object-cover"
                  />
                </div>
              )}

              {intro && (
                <p className="text-lg md:text-xl text-black leading-relaxed mb-8 font-medium">
                  {intro}
                </p>
              )}

              <div className="space-y-5">
                {paragraphList.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-black text-base leading-[1.8]">
                    {paragraph}
                  </p>
                ))}
              </div>

              {includeList.length > 0 && (
                <div className="mt-12 pt-10 border-t border-gray-100">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f1c3f] mb-6">
                    {t('servicePage.includesTitle')}
                  </h2>
                  <ul className="space-y-3">
                    {includeList.map((item) => (
                      <li key={item.slice(0, 40)} className="flex items-start gap-3 text-black text-base leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#c8102e] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-14 pt-10 border-t border-gray-100">
                <h2 className="text-xl font-black text-[#0f1c3f] mb-3">
                  {t('servicePage.ctaTitle')}
                </h2>
                <p className="text-black text-base leading-relaxed mb-6">
                  {t('servicePage.ctaText')}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#c8102e] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#a00d24] transition-colors uppercase text-sm tracking-wider"
                >
                  {t('servicePage.ctaButton')}
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/#services-grid"
                  className="inline-flex items-center gap-2 text-[#0f1c3f] font-semibold hover:text-[#c8102e] transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  {t('servicePage.backToServices')}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
