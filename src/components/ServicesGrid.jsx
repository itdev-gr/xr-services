import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    key: 'accounting',
    titleKey: 'services.items.accounting.title',
    descKey: 'services.items.accounting.desc',
    href: '/services/accounting',
    bg: 'bg-gradient-to-br from-slate-700 to-slate-900',
    pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M54 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM34 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' fill='%23fff' fill-opacity='.05'/%3E%3C/svg%3E")`,
    emoji: '🧮',
  },
  {
    key: 'tax',
    titleKey: 'services.items.tax.title',
    descKey: 'services.items.tax.desc',
    href: '/services/tax',
    bg: 'bg-gradient-to-br from-[#0f1c3f] to-[#1a3060]',
    emoji: '📋',
  },
  {
    key: 'consulting',
    titleKey: 'services.items.consulting.title',
    descKey: 'services.items.consulting.desc',
    href: '/services/consulting',
    bg: 'bg-gradient-to-br from-gray-600 to-gray-800',
    emoji: '💼',
  },
  {
    key: 'audit',
    titleKey: 'services.items.audit.title',
    descKey: 'services.items.audit.desc',
    href: '/services/audit',
    bg: 'bg-gradient-to-br from-slate-800 to-slate-600',
    emoji: '🔍',
  },
  {
    key: 'monitoring',
    titleKey: 'nav.servicesItems.financial',
    descKey: 'services.items.monitoring.desc',
    href: '/services/monitoring',
    bg: 'bg-gradient-to-br from-[#1a2f5e] to-[#0a1228]',
    emoji: '📊',
  },
  {
    key: 'payroll',
    titleKey: 'nav.servicesItems.payroll',
    descKey: 'services.items.payroll.desc',
    href: '/services/payroll',
    bg: 'bg-gradient-to-br from-gray-700 to-gray-900',
    emoji: '💳',
  },
];

export default function ServicesGrid() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.sg-card'), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services-grid" ref={ref} className="py-20 bg-white">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#c8102e]" />
            {t('services.title')}
            <span className="w-8 h-px bg-[#c8102e]" />
          </div>
          <p className="text-[#0f1c3f] text-lg font-semibold max-w-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ key, titleKey, descKey, href, bg, emoji }) => (
            <div
              key={key}
              className="sg-card group cursor-pointer"
              onClick={() => navigate(href)}
            >
              {/* Image area */}
              <div className={`${bg} h-52 relative overflow-hidden rounded-t-2xl`}>
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Emoji placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl opacity-20 select-none">{emoji}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#c8102e]/0 group-hover:bg-[#c8102e]/20 transition-all duration-300" />
                {/* Arrow */}
                <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/0 group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <ArrowRight size={16} className="text-[#c8102e]" />
                </div>
              </div>

              {/* Text area */}
              <div className="pt-5 pb-2">
                <h3 className="font-black text-[#0f1c3f] text-sm uppercase tracking-wider mb-2 group-hover:text-[#c8102e] transition-colors duration-200">
                  {t(titleKey)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
