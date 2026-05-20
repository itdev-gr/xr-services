import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';


export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, { y: 30, opacity: 0, duration: 0.7 })
        .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = (e) => {
    e.preventDefault();
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] md:min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/herosection.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: '65% center' }}
        />
        {/* Dark overlay για readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1228]/85 via-[#0f1c3f]/70 to-[#0a1228]/40" />
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 py-20 md:py-28">
        <div className="max-w-2xl">
          {/* Main title */}
          <h1 ref={titleRef} className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-6 tracking-tight">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-base sm:text-lg text-white leading-relaxed mb-10 max-w-xl">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">
            <a
              href="#services"
              onClick={scrollToServices}
              className="inline-flex items-center gap-2 bg-[#c8102e] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#a00d24] transition-all duration-200 hover:-translate-y-0.5 uppercase tracking-wide"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
