import { useEffect, useRef } from 'react';

/**
 * Registers an IntersectionObserver on elements with class `reveal`
 * within the container. Adds `in-view` class when they enter the viewport.
 * Respects prefers-reduced-motion.
 */
export function useReveal(containerRef, deps = []) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef?.current ?? document;
    const elements = container.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Scroll progress hook — returns a ref to a progress element
 * that updates its scaleX transform via requestAnimationFrame.
 */
export function useScrollProgress() {
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const el = progressRef.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progressRef;
}
