import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — Uses GSAP's native smoothing combined with ScrollTrigger.
 * Provides buttery-smooth momentum scrolling without heavy libraries.
 */
export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // On mobile, use native scroll for better performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    // Set up smooth scroll
    let current = 0;
    let target = 0;
    const ease = 0.075;

    // Set body height to content height
    const setBodyHeight = () => {
      document.body.style.height = `${content.getBoundingClientRect().height}px`;
    };

    const smoothScroll = () => {
      target = window.scrollY;
      current += (target - current) * ease;
      
      gsap.set(content, {
        y: -current,
      });

      requestAnimationFrame(smoothScroll);
    };

    setBodyHeight();
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.overflow = 'hidden';

    requestAnimationFrame(smoothScroll);

    // Refresh ScrollTrigger and body height on resize
    const resizeObserver = new ResizeObserver(() => {
      setBodyHeight();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(content);

    // Also refresh ScrollTrigger to work with our smooth scroll
    ScrollTrigger.defaults({
      scroller: undefined, // Use window
    });
    ScrollTrigger.refresh();

    return () => {
      resizeObserver.disconnect();
      document.body.style.height = '';
      if (wrapper) {
        wrapper.style.position = '';
        wrapper.style.top = '';
        wrapper.style.left = '';
        wrapper.style.width = '';
        wrapper.style.height = '';
        wrapper.style.overflow = '';
      }
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
