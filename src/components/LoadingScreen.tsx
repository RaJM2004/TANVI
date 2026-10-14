import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'loading' | 'flying' | 'done'>('loading');
  const [targetTransform, setTargetTransform] = useState<{
    x: number;
    y: number;
    scale: number;
  }>({ x: 0, y: 0, scale: 1 });

  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // 1. Initial Loading Phase: Smooth progress bar and warm brand intro
    const progressTimer = setTimeout(() => {
      // 2. Measure navbar logo position dynamically
      const navLogo = document.querySelector('#navbar-logo');
      if (navLogo && logoRef.current) {
        const navRect = navLogo.getBoundingClientRect();
        const logoRect = logoRef.current.getBoundingClientRect();

        // Calculate center-to-center delta
        const deltaX =
          navRect.left + navRect.width / 2 - (logoRect.left + logoRect.width / 2);
        const deltaY =
          navRect.top + navRect.height / 2 - (logoRect.top + logoRect.height / 2);
        const scale = navRect.height / logoRect.height;

        setTargetTransform({ x: deltaX, y: deltaY, scale });
      } else {
        // Fallback for extreme layouts or unmounted states
        setTargetTransform({
          x: -window.innerWidth * 0.38,
          y: -window.innerHeight * 0.42,
          scale: 0.5,
        });
      }

      setPhase('flying');
    }, 1100);

    return () => clearTimeout(progressTimer);
  }, []);

  const handleAnimationComplete = () => {
    if (phase === 'flying') {
      setPhase('done');
      onComplete();
    }
  };

  if (phase === 'done') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'flying' ? 0 : 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-[#FAF7F2] flex items-center justify-center overflow-hidden pointer-events-none select-none"
      >
        {/* Subtle Ambient Radial Gold Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(194, 142, 58, 0.16) 0%, transparent 70%)',
          }}
        />

        {/* Subtle luxury micro-grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#C28E3A 1px, transparent 1px), linear-gradient(90deg, #C28E3A 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Central Logo & Progress Container */}
        <div className="relative flex flex-col items-center justify-center z-10">
          <motion.img
            ref={logoRef}
            src="/Tanvi%20Impex%20Dry%20Fruits%20Logo.png"
            alt="Tanvi Impex Logo"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={
              phase === 'loading'
                ? { scale: 1, opacity: 1 }
                : {
                    x: targetTransform.x,
                    y: targetTransform.y,
                    scale: targetTransform.scale,
                    opacity: 1,
                  }
            }
            transition={
              phase === 'loading'
                ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
            onAnimationComplete={handleAnimationComplete}
            className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-[0_12px_36px_rgba(194,142,58,0.22)] origin-center"
          />

          {/* Progress Indicator & Subtitle - Smoothly fades out when flying begins */}
          <motion.div
            animate={{
              opacity: phase === 'flying' ? 0 : 1,
              y: phase === 'flying' ? 12 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center mt-8 space-y-3"
          >
            {/* Elegant Golden Progress Track */}
            <div className="w-52 sm:w-64 h-[3px] bg-black/6 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-[#D9A74A] via-[#C28E3A] to-[#E5C158] rounded-full shadow-[0_0_12px_rgba(194,142,58,0.6)]"
              />
            </div>

            {/* Subtle Brand Tagline */}
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#2D2318]/55 uppercase">
              Premium Dry Fruits &bull; Navi Mumbai
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
