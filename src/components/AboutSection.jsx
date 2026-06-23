import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase, TrendingUp, MessageCircle, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WHY_ITEMS = [
  {
    icon: Briefcase,
    titleKey: 'about.why.professionalism.title',
    descKey: 'about.why.professionalism.desc',
  },
  {
    icon: TrendingUp,
    titleKey: 'about.why.evolution.title',
    descKey: 'about.why.evolution.desc',
  },
  {
    icon: MessageCircle,
    titleKey: 'about.why.communication.title',
    descKey: 'about.why.communication.desc',
  },
  {
    icon: GraduationCap,
    titleKey: 'about.why.quality.title',
    descKey: 'about.why.quality.desc',
  },
];

export default function AboutSection() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.about-left > *'), {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
      gsap.from(ref.current.querySelectorAll('.why-item'), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-12 md:py-20 bg-white overflow-hidden">
      {/* Faint watermark — bottom right */}
      <div
        className="absolute -bottom-12 -right-6 md:-right-2 lg:right-4 pointer-events-none select-none opacity-[0.07]"
        aria-hidden="true"
      >
        <img
          src="/XRS-MAIN-9.svg"
          alt=""
          className="w-[min(85vw,480px)] h-auto max-w-none"
        />
      </div>

      <div className="container-xl relative z-10 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-start min-w-0">

          {/* Left — Η XR Services */}
          <div className="about-left min-w-0 w-full">
            <div className="inline-flex items-center gap-2 text-[#c8102e] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-[#c8102e]" />
              {t('about.tagline')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f1c3f] mb-2 tracking-tight text-balance">
              {t('about.title')}
            </h2>
            <div className="w-12 h-1 bg-[#c8102e] rounded mb-5" />

            {/* Premium logo showcase */}
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-none mb-5 lg:mb-6 rounded-xl lg:rounded-2xl overflow-hidden border border-gray-100/80 shadow-[0_12px_32px_rgba(15,28,63,0.07)] lg:shadow-[0_16px_48px_rgba(15,28,63,0.08)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-[#eef2f7]" />
              <div
                className="absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(200,16,46,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(15,28,63,0.08) 0%, transparent 45%)',
                }}
              />
              <div className="relative px-6 py-7 lg:px-8 lg:py-10 flex items-center justify-center">
                <img
                  src="/XRS-MAIN-9.svg"
                  alt="XR Services"
                  className="w-full max-w-[200px] sm:max-w-[220px] lg:max-w-[300px] h-auto object-contain drop-shadow-[0_6px_18px_rgba(15,28,63,0.1)] lg:drop-shadow-[0_8px_24px_rgba(15,28,63,0.12)]"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>
              <div className="h-1 bg-gradient-to-r from-[#0f1c3f] via-[#c8102e] to-[#0f1c3f]" />
            </div>

            <div className="space-y-3 lg:space-y-4 mb-5 lg:mb-6">
              <p className="text-black text-[14px] sm:text-sm md:text-base leading-relaxed">
                {t('about.p1')}
              </p>
              <p className="text-black text-[14px] sm:text-sm md:text-base leading-relaxed">
                {t('about.p2')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-4 mb-5 lg:mb-8 w-full">
              {[
                { valueKey: 'about.highlights.experience', labelKey: 'about.highlights.experienceLabel' },
                { valueKey: 'about.highlights.team', labelKey: 'about.highlights.teamLabel' },
                { valueKey: 'about.highlights.coverage', labelKey: 'about.highlights.coverageLabel' },
              ].map(({ valueKey, labelKey }) => (
                <div
                  key={valueKey}
                  className="w-full min-w-0 rounded-lg lg:rounded-xl border border-gray-100 bg-gray-50/80 px-1.5 sm:px-2 lg:px-4 py-2.5 sm:py-3 lg:py-4 text-center flex flex-col items-center justify-center"
                >
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-[#c8102e] leading-none mb-1">
                    {t(valueKey)}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-wide text-black leading-tight">
                    {t(labelKey)}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/company"
              onClick={(e) => { e.preventDefault(); window.location.href = '/company'; }}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#c8102e] text-white font-bold px-5 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl hover:bg-[#a00d24] transition-colors duration-200 uppercase text-xs sm:text-sm tracking-wider"
            >
              {t('about.cta')}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right — Γιατί να μας επιλέξετε */}
          <div className="min-w-0 w-full">
            <div className="inline-flex items-center gap-2 text-[#c8102e] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-[#c8102e]" />
              {t('about.whyTagline')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f1c3f] mb-2 tracking-tight text-balance">
              {t('about.whyTitle')}
            </h2>
            <div className="w-12 h-1 bg-[#c8102e] rounded mb-6 md:mb-8" />

            <div className="space-y-5 md:space-y-6">
              {WHY_ITEMS.map(({ icon: Icon, titleKey, descKey }) => (
                <div key={titleKey} className="why-item flex items-start gap-4 sm:gap-5 group min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 group-hover:bg-[#c8102e]/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon size={20} className="text-[#c8102e] sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-[#0f1c3f] text-xs sm:text-sm uppercase tracking-wide sm:tracking-wider mb-1.5 text-balance">
                      {t(titleKey)}
                    </h3>
                    <p className="text-black text-[13px] sm:text-sm md:text-base leading-relaxed">
                      {t(descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
