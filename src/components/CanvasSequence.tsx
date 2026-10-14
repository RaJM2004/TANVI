import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImageSequence } from '../hooks/useImageSequence';

gsap.registerPlugin(ScrollTrigger);

export const CanvasSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { images, isFullyLoaded } = useImageSequence();
  const frameRef = useRef({ frame: 0 });

  useEffect(() => {
    if (!isFullyLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameRef.current.frame);
    };

    const renderFrame = (index: number) => {
      if (images[index]) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio and scaling to cover/contain
        const img = images[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        // Cover logic (like object-fit: cover)
        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        // Apply a zoom multiplier to crop out the watermark edges
        const zoom = 1.15;
        drawWidth *= zoom;
        drawHeight *= zoom;
        
        // Recalculate offsets to keep it perfectly centered while zoomed
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = (canvas.height - drawHeight) / 2;

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initial render
    renderFrame(0);

    // GSAP ScrollTrigger
    const scrollAnimation = gsap.to(frameRef.current, {
      frame: images.length - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Smooth scrubbing
        onUpdate: () => {
          // Use requestAnimationFrame for smoother rendering
          requestAnimationFrame(() => renderFrame(Math.round(frameRef.current.frame)));
        }
      }
    });

    return () => {
      window.removeEventListener('resize', updateDimensions);
      scrollAnimation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isFullyLoaded, images]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-background">
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover md:scale-[1.08] origin-center transition-opacity duration-700 ${
            isFullyLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Soft radial gradient to blend edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050505_100%)] pointer-events-none" />
      </div>
    </div>
  );
};
