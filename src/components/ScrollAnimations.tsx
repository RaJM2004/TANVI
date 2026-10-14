import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollAnimations = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Wait for DOM to be ready
    const timeout = setTimeout(() => {
      // ── Paragraph line-by-line reveal ──
      const paragraphs = document.querySelectorAll('[data-animate-lines]');
      paragraphs.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Counter animations ──
      const counters = document.querySelectorAll('[data-count-to]');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-count-to') || '0', 10);
        const suffix = counter.getAttribute('data-count-suffix') || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            (counter as HTMLElement).textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      // ── Decorative dividers ──
      const dividers = document.querySelectorAll('[data-animate-divider]');
      dividers.forEach((div) => {
        gsap.fromTo(
          div,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: div,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Parallax elements ──
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.2');
        gsap.to(el, {
          y: () => speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null; // This component only adds scroll triggers
};
