import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BookOpen, Calculator, BriefcaseBusiness, Users,
  Search, BarChart3, Rocket, Building2, ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS = [
  Calculator, BookOpen, BriefcaseBusiness, Users,
  Search, BarChart3, Rocket, Building2,
];

const SERVICE_KEYS = [
  'accounting', 'tax', 'consulting', 'payroll',
  'audit', 'monitoring', 'startup', 'corporate',
];

export default function ServicesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.service-card'), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
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
    <section id="services" ref={ref} className="py-20 bg-gray-50/50">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#c8102e]" />
            {t('services.title')}
            <span className="w-8 h-px bg-[#c8102e]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0f1c3f] mb-4 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <div
                key={key}
                className="service-card group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#c8102e]/30 hover:shadow-lg hover:shadow-red-50 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 bg-[#0f1c3f]/5 group-hover:bg-[#c8102e]/10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon size={22} className="text-[#0f1c3f] group-hover:text-[#c8102e] transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-[#0f1c3f] text-base mb-2 leading-tight">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`services.items.${key}.desc`)}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[#c8102e] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Περισσότερα</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-[#0f1c3f] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#c8102e] transition-colors duration-300"
          >
            {t('hero.cta')}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
