import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLabels } from '../hooks/useLabels';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

import { getServiceImage } from '../config/services';
import OptimizedImage from './OptimizedImage';

const SERVICES = [
  {
    key: 'accounting',
    titleKey: 'services.items.accounting.title',
    href: '/services/accounting',
    bg: 'bg-gradient-to-br from-slate-700 to-slate-900',
    emoji: '🧮',
  },
  {
    key: 'tax',
    titleKey: 'services.items.tax.title',
    href: '/services/tax',
    bg: 'bg-gradient-to-br from-[#0f1c3f] to-[#1a3060]',
    emoji: '📋',
  },
  {
    key: 'consulting',
    titleKey: 'services.items.consulting.title',
    href: '/services/consulting',
    bg: 'bg-gradient-to-br from-gray-600 to-gray-800',
    emoji: '💼',
  },
  {
    key: 'audit',
    titleKey: 'services.items.audit.title',
    href: '/services/audit',
    bg: 'bg-gradient-to-br from-slate-800 to-slate-600',
    emoji: '🔍',
  },
  {
    key: 'payroll',
    titleKey: 'services.items.payroll.title',
    href: '/services/payroll',
    bg: 'bg-gradient-to-br from-gray-700 to-gray-900',
    emoji: '💳',
  },
];

export default function ServicesGrid() {
  const { t } = useTranslation();
  const { tu } = useLabels();
  const navigate = useNavigate();
  const ref = useRevealOnScroll('.sg-card', 100);

  return (
    <section id="services" ref={ref} className="py-12 md:py-20 bg-white">
      <div className="w-full max-w-[100rem] mx-auto px-3 sm:px-4 lg:px-5">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#c8102e]" />
            {tu('services.title')}
            <span className="w-8 h-px bg-[#c8102e]" />
          </div>
          <p className="text-[#0f1c3f] w-full text-center font-semibold leading-snug text-balance px-2 sm:px-0 text-base sm:text-lg md:text-xl lg:text-[1.35rem] lg:whitespace-nowrap">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-4 xl:gap-5 items-stretch">
          {SERVICES.map(({ key, titleKey, href, bg, emoji }) => {
            const image = getServiceImage(key);
            return (
              <div
                key={key}
                role="link"
                tabIndex={0}
                className="sg-card group relative cursor-pointer rounded-3xl overflow-hidden w-full aspect-[3/4] shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => navigate(href)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(href);
                  }
                }}
              >
                {image ? (
                  <OptimizedImage
                    src={image}
                    alt={t(`servicePage.items.${key}.imageAlt`, { defaultValue: t(titleKey) })}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    mobileSrc={false}
                  />
                ) : (
                  <div className={`absolute inset-0 ${bg}`}>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl opacity-20 select-none">{emoji}</span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.45)_38%,transparent_62%)]" />
                <div className="absolute inset-0 bg-[#c8102e]/0 group-hover:bg-[#c8102e]/10 transition-colors duration-300" />

                <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-6 sm:px-5 sm:pb-7 lg:pb-8 text-center">
                  <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl leading-snug mb-4 sm:mb-5 drop-shadow-sm px-1">
                    {t(titleKey)}
                  </h3>
                  <span className="inline-flex items-center gap-0.5 bg-white text-[#c8102e] font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shrink-0 group-hover:bg-[#c8102e] group-hover:text-white transition-colors duration-300">
                    {t('services.readMore')}
                    <ChevronRight size={18} strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
