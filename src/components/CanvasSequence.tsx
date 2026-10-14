import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImageSequence } from '../hooks/useImageSequence';

gsap.registerPlugin(ScrollTrigger);

export const CanvasSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldPreload, setShouldPreload] = useState(false);

  // Use progressive lazy-loaded image sequence
  const { imagesRef, isInitialLoaded } = useImageSequence(shouldPreload);
  const frameRef = useRef({ frame: 0 });

  // 1. Proximity observer: start background frame streaming when user scrolls near the 3D section
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldPreload(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px 600px 0px' }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Render and animation setup (initializes once when frame 1 is ready)
  useEffect(() => {
    if (!isInitialLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Helper: find closest loaded frame if requested frame is still downloading
    const getBestAvailableImage = (index: number): HTMLImageElement | null => {
      const arr = imagesRef.current;
      if (arr[index]) return arr[index];
      // Search backwards for the nearest available loaded frame
      for (let i = index - 1; i >= 0; i--) {
        if (arr[i]) return arr[i];
      }
      // Or forward fallback
      for (let i = index + 1; i < arr.length; i++) {
        if (arr[i]) return arr[i];
      }
      return null;
    };

    const renderFrame = (index: number) => {
      const img = getBestAvailableImage(index);
      if (img && img.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
        } else {
          drawWidth = canvas.height * imgRatio;
        }

        const zoom = 1.15;
        drawWidth *= zoom;
        drawHeight *= zoom;

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(frameRef.current.frame));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initial render of first frame
    renderFrame(0);

    // Scoped GSAP Context that only affects this component
    const ctx = gsap.context(() => {
      gsap.to(frameRef.current, {
        frame: 239,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: () => {
            requestAnimationFrame(() => renderFrame(Math.round(frameRef.current.frame)));
          },
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      ctx.revert();
    };
  }, [isInitialLoaded]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-background">
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover md:scale-[1.08] origin-center transition-opacity duration-700 ${
            isInitialLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Soft radial gradient to blend edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050505_100%)] pointer-events-none" />
      </div>
    </div>
  );
};
