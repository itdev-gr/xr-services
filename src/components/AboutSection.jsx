import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpenCheck, ShieldCheck, Eye, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WHY_ITEMS = [
  {
    icon: BookOpenCheck,
    titleKey: 'about.why.experience.title',
    descKey: 'about.why.experience.desc',
  },
  {
    icon: ShieldCheck,
    titleKey: 'about.why.consistency.title',
    descKey: 'about.why.consistency.desc',
  },
  {
    icon: Eye,
    titleKey: 'about.why.transparency.title',
    descKey: 'about.why.transparency.desc',
  },
  {
    icon: Award,
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
        x: -30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
      gsap.from(ref.current.querySelectorAll('.why-item'), {
        x: 30,
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
    <section id="about" ref={ref} className="py-20 bg-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Η XR Services */}
          <div className="about-left">
            <div className="inline-flex items-center gap-2 text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-[#c8102e]" />
              {t('about.tagline')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f1c3f] mb-2 tracking-tight">
              {t('about.title')}
            </h2>
            <div className="w-12 h-1 bg-[#c8102e] rounded mb-6" />

            {/* Image placeholder */}
            <div className="w-full h-56 bg-gradient-to-br from-[#0f1c3f] to-[#1a2f5e] rounded-2xl mb-6 overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/XRS-ICON-2.png" alt="XR Services" className="h-24 w-auto object-contain opacity-60" />
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              {t('about.p1')}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t('about.p2')}
            </p>

            <a
              href="/company"
              onClick={(e) => { e.preventDefault(); window.location.href = '/company'; }}
              className="inline-flex items-center gap-2 bg-[#c8102e] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#a00d24] transition-colors duration-200 uppercase text-sm tracking-wider"
            >
              {t('about.cta')}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right — Γιατί να μας επιλέξετε */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-[#c8102e]" />
              {t('about.whyTagline')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f1c3f] mb-2 tracking-tight">
              {t('about.whyTitle')}
            </h2>
            <div className="w-12 h-1 bg-[#c8102e] rounded mb-8" />

            <div className="space-y-6">
              {WHY_ITEMS.map(({ icon: Icon, titleKey, descKey }) => (
                <div key={titleKey} className="why-item flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-[#c8102e]/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon size={22} className="text-[#c8102e]" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#0f1c3f] text-sm uppercase tracking-wider mb-1.5">
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

        </div>
      </div>
    </section>
  );
}
