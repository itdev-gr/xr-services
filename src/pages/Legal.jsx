import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { ArrowLeft } from 'lucide-react';
import { isValidLegalPage } from '../config/legal';

export default function Legal({ page }) {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (!isValidLegalPage(page)) {
    return <Navigate to="/" replace />;
  }

  const title = t(`legalPages.${page}.title`);
  const metaDescription = t(`legalPages.${page}.metaDescription`);
  const intro = t(`legalPages.${page}.intro`);
  const updated = t(`legalPages.${page}.updated`);
  const sections = t(`legalPages.${page}.sections`, { returnObjects: true });
  const sectionList = Array.isArray(sections) ? sections : [];

  return (
    <>
      <Seo
        title={title}
        description={metaDescription}
        path={`/${page}`}
      />

      <div>
        <div className="bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] py-14 md:py-18">
          <div className="container-xl">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/50 text-sm mb-5">
              <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <span>/</span>
              <span className="text-white/70">{t('legalPages.common.breadcrumbLegal')}</span>
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
              {updated && (
                <p className="text-sm text-black/60 mb-6">
                  {t('legalPages.common.updatedLabel')}: {updated}
                </p>
              )}

              {intro && (
                <p className="text-lg text-black leading-relaxed mb-10 font-medium">
                  {intro}
                </p>
              )}

              <div className="space-y-10">
                {sectionList.map((section) => {
                  const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
                  return (
                    <section key={section.title}>
                      <h2 className="text-lg font-black text-[#0f1c3f] mb-4 tracking-tight">
                        {section.title}
                      </h2>
                      <div className="space-y-4">
                        {paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)} className="text-black text-base leading-[1.8]">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="mt-14 pt-10 border-t border-gray-100">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[#0f1c3f] font-semibold hover:text-[#c8102e] transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  {t('legalPages.common.backHome')}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
