import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export default function QuoteBanner() {
  const { t } = useTranslation();
  const ref = useRevealOnScroll('.reveal-item', 120);

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-[#050d1f] via-[#0f1c3f] to-[#1a3a6b]"
    >
      {/* Navy gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(120deg, rgba(26, 58, 107, 0.55) 0%, transparent 45%, rgba(7, 20, 40, 0.4) 100%),
            radial-gradient(ellipse 80% 60% at 15% 50%, rgba(30, 64, 120, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 70% 55% at 85% 40%, rgba(15, 28, 63, 0.5) 0%, transparent 65%)
          `,
        }}
      />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.35) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#c8102e] to-transparent" />

      {/* Navy glow orbs — desktop only (blur is costly on mobile) */}
      <div className="hidden md:block absolute top-1/3 left-[10%] w-96 h-96 bg-[#1e4a8a]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 right-[8%] w-80 h-80 bg-[#0a2540]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-[#1a3a6b]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal-item flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#c8102e]/20 border border-[#c8102e]/40 rounded-2xl flex items-center justify-center">
              <Quote size={28} className="text-[#c8102e]" />
            </div>
          </div>

          <blockquote className="reveal-item text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-6 sm:mb-8 tracking-tight text-balance px-1">
            "{t('quote.text')}"
          </blockquote>

          <div className="reveal-item flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-white/40" />
            <cite className="text-white text-sm font-semibold tracking-wider not-italic uppercase">
              {t('quote.author')}
            </cite>
            <div className="h-px w-12 bg-white/40" />
          </div>

          {/* Trust indicators */}
          <div className="reveal-item mt-10 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-8 max-w-2xl mx-auto">
            {[
              { num: '25+', text: 'Χρόνια στον κλάδο' },
              { num: '500+', text: 'Ικανοποιημένοι πελάτες' },
              { num: '24/7', text: 'Υποστήριξη & επικοινωνία' },
            ].map(({ num, text }) => (
              <div key={num} className="text-center min-w-0 px-0.5">
                <div className="text-xl sm:text-3xl font-black text-[#c8102e] mb-1">{num}</div>
                <div className="text-white text-[9px] sm:text-xs font-medium uppercase tracking-wide leading-tight">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
