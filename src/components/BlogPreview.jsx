// Articles section — future enhancement: integrate newsletter sending when publishing new articles
// Connect to a CMS (Contentful, Sanity, or Supabase) and trigger Mailchimp/Brevo campaign on publish

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const ARTICLE_IMAGES = [
  'bg-gradient-to-br from-slate-700 to-slate-900',
  'bg-gradient-to-br from-[#0f1c3f] to-[#1a3060]',
  'bg-gradient-to-br from-gray-600 to-gray-800',
];

const ARTICLE_DATES = [
  { day: '15', month: 'Μαΐος', year: '2026' },
  { day: '8',  month: 'Μαΐος', year: '2026' },
  { day: '1',  month: 'Μαΐος', year: '2026' },
];

export default function BlogPreview() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.article-card'), {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const articles = ['article1', 'article2', 'article3'];

  return (
    <section id="articles" ref={ref} className="py-20 bg-white">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-[#c8102e]" />
              {t('articles.title')}
              <span className="w-8 h-px bg-[#c8102e]" />
            </div>
            <p className="text-gray-900 max-w-md font-medium">
              {t('articles.subtitle')}
            </p>
          </div>
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {articles.map((key, i) => (
            <article
              key={key}
              className="article-card group cursor-pointer"
              onClick={() => navigate('/blog')}
            >
              {/* Image with date badge */}
              <div className={`${ARTICLE_IMAGES[i]} h-52 relative overflow-hidden rounded-t-xl`}>
                {/* subtle grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-[#c8102e] text-white px-3 py-2 text-center min-w-[56px]">
                  <div className="text-2xl font-black leading-none">{ARTICLE_DATES[i].day}</div>
                  <div className="text-xs font-semibold mt-0.5">{ARTICLE_DATES[i].month}</div>
                  <div className="text-xs font-semibold">{ARTICLE_DATES[i].year}</div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-5 pb-2 border-b border-gray-100">
                <h3 className="font-bold text-[#0f1c3f] text-base leading-snug mb-3 group-hover:text-[#c8102e] transition-colors duration-200 line-clamp-2">
                  {t(`articles.items.${key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {t(`articles.items.${key}.excerpt`)}
                </p>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('/blog'); }}
                  className="inline-flex items-center gap-1.5 text-[#c8102e] text-sm font-semibold hover:gap-3 transition-all duration-200"
                >
                  {t('articles.readMore')}
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); navigate('/blog'); }}
            className="inline-flex items-center gap-2 bg-[#c8102e] text-white font-bold px-10 py-4 rounded-sm hover:bg-[#a00d24] transition-colors duration-200 uppercase tracking-widest text-sm"
          >
            Δείτε όλα τα άρθρα
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
