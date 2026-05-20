import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteBanner() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.animate-item'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1228 0%, #0f1c3f 50%, #1a1a2e 100%)',
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#c8102e] to-transparent" />

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#c8102e]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="container-xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-item flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#c8102e]/20 border border-[#c8102e]/40 rounded-2xl flex items-center justify-center">
              <Quote size={28} className="text-[#c8102e]" />
            </div>
          </div>

          <blockquote className="animate-item text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-8 tracking-tight">
            "{t('quote.text')}"
          </blockquote>

          <div className="animate-item flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-white/40" />
            <cite className="text-white text-sm font-semibold tracking-wider not-italic uppercase">
              {t('quote.author')}
            </cite>
            <div className="h-px w-12 bg-white/40" />
          </div>

          {/* Trust indicators */}
          <div className="animate-item mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { num: '25+', text: 'Χρόνια στον κλάδο' },
              { num: '500+', text: 'Ικανοποιημένοι πελάτες' },
              { num: '24/7', text: 'Υποστήριξη & επικοινωνία' },
            ].map(({ num, text }) => (
              <div key={num} className="text-center">
                <div className="text-3xl font-black text-[#c8102e] mb-1">{num}</div>
                <div className="text-white text-xs font-medium uppercase tracking-wider">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
