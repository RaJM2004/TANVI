import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StoryOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use scoped GSAP context so animations do not conflict with or kill other triggers
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.story-text') as HTMLElement[];

      sections.forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 1, // Smooth scrub with user scroll
          },
        });

        tl.fromTo(
          section,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
        )
          // Hold the text fully visible for a moment as user scrolls
          .to(section, { opacity: 1, duration: 1 })
          // Fade out and slide up
          .to(section, { opacity: 0, y: -100, duration: 2, ease: 'power2.in' });
      });

      // Recalculate triggers
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full pointer-events-none z-20" style={{ height: '400vh' }}>

      {/* 1st Stop - Introduction */}
      <div className="h-screen w-full flex items-center justify-start px-6 md:px-24 pt-24 md:pt-32 absolute top-[50vh]">
        <div className="story-text max-w-xl drop-shadow-2xl">
          <p className="text-[#C28E3A] font-bold tracking-widest uppercase mb-3 text-xs md:text-sm">The Origin</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">Uncompromising <br /> Quality.</h2>
          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md">
            Sourced directly from the finest orchards in California. We select only the most premium, whole almonds to ensure a perfect bite every single time.
          </p>
        </div>
      </div>

      {/* 2nd Stop - Nutrition Profile */}
      <div className="h-screen w-full flex items-center justify-end px-6 md:px-24 pt-24 md:pt-32 absolute top-[150vh]">
        <div className="story-text max-w-xl text-left md:text-right drop-shadow-2xl">
          <p className="text-[#C28E3A] font-bold tracking-widest uppercase mb-3 text-xs md:text-sm">Health First</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">Nutritionally <br /> Dense.</h2>
          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md">
            A powerhouse of natural energy. Packed with Vitamin E, Magnesium, and essential plant-based proteins that fuel your active lifestyle.
          </p>
        </div>
      </div>

      {/* 3rd Stop - The Process */}
      <div className="h-screen w-full flex items-center justify-start px-6 md:px-24 pt-24 md:pt-32 absolute top-[250vh]">
        <div className="story-text max-w-xl drop-shadow-2xl">
          <p className="text-[#C28E3A] font-bold tracking-widest uppercase mb-3 text-xs md:text-sm">The Craft</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">The Perfect <br /> Crunch.</h2>
          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md">
            Carefully processed to preserve their natural oils and flavor profile. No artificial preservatives, just pure, unadulterated goodness.
          </p>
        </div>
      </div>

    </div>
  );
};
