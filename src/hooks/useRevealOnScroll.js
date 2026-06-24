import { useEffect, useRef } from 'react';

export function useRevealOnScroll(itemSelector = '.reveal-item', staggerMs = 80) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll(itemSelector);
    if (!items.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    items.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${index * staggerMs}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [itemSelector, staggerMs]);

  return ref;
}
