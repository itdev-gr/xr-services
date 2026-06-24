import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_URL } from '../config/site';
import { innerPageSchema } from '../utils/schema';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VALUE_KEYS = ['integrity', 'respect', 'professionalism', 'reliability', 'confidentiality', 'improvement'];

const SECTIONS = [
  { id: 'vision', type: 'paragraphs', keys: ['p1', 'p2', 'p3'] },
  { id: 'values', type: 'values' },
  { id: 'history', type: 'paragraphs', keys: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'people', type: 'paragraphs', keys: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'careers', type: 'content' },
  { id: 'financials', type: 'content' },
  { id: 'network', type: 'content' },
];

function SectionContent({ section, t }) {
  if (section.type === 'values') {
    return (
      <div className="space-y-5">
        <p className="text-black text-sm sm:text-base leading-relaxed">{t('companyPage.values.intro')}</p>
        <ul className="space-y-4">
          {VALUE_KEYS.map((key) => (
            <li key={key} className="text-black text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-[#0f1c3f]">{t(`companyPage.values.items.${key}.title`)}</span>
              <span> – {t(`companyPage.values.items.${key}.desc`)}</span>
            </li>
          ))}
        </ul>
        <p className="text-black text-sm sm:text-base leading-relaxed">{t('companyPage.values.outro')}</p>
      </div>
    );
  }

  if (section.type === 'paragraphs') {
    return (
      <div className="space-y-4">
        {section.keys.map((key) => (
          <p key={key} className="text-black text-sm sm:text-base leading-relaxed">
            {t(`companyPage.${section.id}.${key}`)}
          </p>
        ))}
      </div>
    );
  }

  return (
    <p className="text-black text-sm sm:text-base leading-relaxed">
      {t(`companyPage.${section.id}.content`)}
    </p>
  );
}

export default function Company() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.section-card'), {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current.querySelector('.sections-grid'),
          start: 'top 80%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Seo
        title={t('companyPage.metaTitle')}
        description={t('companyPage.metaDescription')}
        path="/company"
        jsonLd={innerPageSchema({
          title: `${t('companyPage.metaTitle')} | XR Services`,
          description: t('companyPage.metaDescription'),
          path: '/company',
          breadcrumbs: [
            { name: t('nav.home'), url: SITE_URL },
            { name: t('nav.company'), url: `${SITE_URL}/company` },
          ],
        })}
      />

      <div ref={ref}>
        <div className="bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] py-16 md:py-20">
          <div className="container-xl">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <span>/</span>
              <span className="text-white">{t('nav.company')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {t('nav.company')}
            </h1>
          </div>
        </div>

        <div className="py-12 md:py-16 bg-gray-50/50 overflow-hidden">
          <div className="container-xl sections-grid space-y-6 md:space-y-8 min-w-0">
            {SECTIONS.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="section-card bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 min-w-0"
                >
                  <div className="flex flex-col md:flex-row min-w-0">
                    <div className="md:w-64 shrink-0 bg-gradient-to-br from-[#0f1c3f] to-[#1a2f5e] p-6 md:p-8 flex flex-col justify-center">
                      <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                        {t(`nav.companyItems.${section.id}`)}
                      </h2>
                    </div>
                    <div className="flex-1 p-5 sm:p-8 md:py-10 min-w-0">
                      <SectionContent section={section} t={t} />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="container-xl mt-12">
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
    </>
  );
}
