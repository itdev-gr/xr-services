import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hotel, Factory, GraduationCap, HardHat, UtensilsCrossed, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SOLUTION_ICONS = [Hotel, Factory, GraduationCap, HardHat, UtensilsCrossed, ShoppingBag];
const SOLUTION_KEYS = ['hotels', 'manufacturing', 'education', 'construction', 'food', 'commerce'];

const SOLUTION_COLORS = [
  'from-blue-50 to-blue-100/50 border-blue-200/50 hover:border-blue-300',
  'from-orange-50 to-orange-100/50 border-orange-200/50 hover:border-orange-300',
  'from-green-50 to-green-100/50 border-green-200/50 hover:border-green-300',
  'from-yellow-50 to-yellow-100/50 border-yellow-200/50 hover:border-yellow-300',
  'from-red-50 to-red-100/50 border-red-200/50 hover:border-red-300',
  'from-purple-50 to-purple-100/50 border-purple-200/50 hover:border-purple-300',
];

const ICON_COLORS = [
  'text-blue-600 bg-blue-100',
  'text-orange-600 bg-orange-100',
  'text-green-600 bg-green-100',
  'text-yellow-600 bg-yellow-100',
  'text-red-600 bg-red-100',
  'text-purple-600 bg-purple-100',
];

export default function SpecialSolutions() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.solution-card'), {
        y: 40,
        opacity: 0,
        duration: 0.65,
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
    <section id="special-solutions" ref={ref} className="py-20 bg-white">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#c8102e]" />
            {t('specialSolutions.title')}
            <span className="w-8 h-px bg-[#c8102e]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0f1c3f] mb-4 tracking-tight">
            {t('specialSolutions.title')}
          </h2>
          <p className="text-black text-lg max-w-xl mx-auto">
            {t('specialSolutions.subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTION_KEYS.map((key, i) => {
            const Icon = SOLUTION_ICONS[i];
            return (
              <div
                key={key}
                className={`solution-card group bg-gradient-to-br ${SOLUTION_COLORS[i]} border rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${ICON_COLORS[i]}`}>
                  <Icon size={26} />
                </div>
                <h3 className="font-bold text-[#0f1c3f] text-lg mb-3">
                  {t(`specialSolutions.items.${key}.title`)}
                </h3>
                <p className="text-black text-sm leading-relaxed">
                  {t(`specialSolutions.items.${key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
