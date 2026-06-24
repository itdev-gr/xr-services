import { useTranslation } from 'react-i18next';
import OptimizedImage from './OptimizedImage';
import { useLabels } from '../hooks/useLabels';

export default function Hero() {
  const { t } = useTranslation();
  const { tu } = useLabels();

  const scrollToServices = (e) => {
    e.preventDefault();
    const scroll = () => {
      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    scroll();
    if (!document.querySelector('#services')) {
      window.setTimeout(scroll, 150);
    }
  };

  return (
    <section className="relative min-h-[60vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src="/herosection.png"
          alt={t('hero.imageAlt')}
          className="w-full h-full object-cover"
          style={{ objectPosition: '65% center' }}
          mobileSrc="/herosection-mobile.webp"
          priority
          width={1672}
          height={941}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1228]/85 via-[#0f1c3f]/70 to-[#0a1228]/40" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24 relative z-10 py-14 sm:py-20 md:py-28">
        <div className="max-w-2xl md:max-w-none">
          <h1 className="hero-fade-up text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 tracking-tight max-md:text-balance md:whitespace-nowrap">
            {t('hero.title')}
          </h1>

          <p className="hero-fade-up hero-fade-up-delay-1 text-base sm:text-lg text-white leading-relaxed mb-10 max-w-xl md:max-w-2xl">
            {t('hero.subtitle')}
          </p>

          <div className="hero-fade-up hero-fade-up-delay-2 flex flex-wrap gap-4 mb-16">
            <a
              href="#services"
              onClick={scrollToServices}
              className="inline-flex items-center justify-center gap-2 bg-[#c8102e] text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-[#a00d24] transition-all duration-200 hover:-translate-y-0.5 uppercase tracking-wide text-sm sm:text-base"
            >
              {tu('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
