import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const slides = [
  {
    id: 0,
    image: '/hero1.webp',
    subtitle: 'Pure Nutrition. Premium Quality.',
    title: 'Almonds',
    highlight: 'Natural & Healthy',
    description: 'Our almonds are carefully selected for their rich nutritional value, natural crunch, and wholesome goodness. Packed with protein, healthy fats, vitamins, and minerals – perfect for a healthy lifestyle.'
  },
  {
    id: 1,
    image: '/hero2.webp',
    subtitle: 'Exquisite Taste. Unmatched Purity.',
    title: 'Premium',
    highlight: 'Dry Fruits & Spices',
    description: 'Sourced from the finest farms around the world. We bring you the authentic taste and rich aromas of pure, unadulterated spices and premium dry fruits, crafted for culinary perfection.'
  },
  {
    id: 2,
    image: '/hero3.webp',
    subtitle: 'Global Export & Wholesale.',
    title: 'Trusted',
    highlight: 'Global Supply',
    description: 'A trusted partner for leading distributors worldwide. We guarantee bulk availability, rigorous quality checks, and timely international shipments for all our premium agricultural products.'
  },
  {
    id: 3,
    image: '/hero4.webp',
    subtitle: '100% Organic & Pure.',
    title: 'Nature\'s',
    highlight: 'Best Selection',
    description: 'Experience the true essence of nature. We ensure absolutely no artificial preservatives or colors in our products. Just pure, organic goodness delivered straight from the farm to your table.'
  },
  {
    id: 4,
    image: '/hero5.webp',
    subtitle: 'Meticulously Selected.',
    title: 'Handpicked',
    highlight: 'Gourmet Quality',
    description: 'Every single piece is meticulously handpicked and sorted to guarantee flawless quality, exceptional size, and superior taste for the most discerning palates.'
  },
  {
    id: 5,
    image: '/hero6.webp',
    subtitle: 'Health & Wellness.',
    title: 'Fuel Your',
    highlight: 'Active Lifestyle',
    description: 'Packed with essential nutrients, our premium selection is the perfect addition to a balanced diet. Elevate your daily nutrition with the finest nature has to offer.'
  },
  {
    id: 6,
    image: '/hero7.webp',
    subtitle: 'The Ultimate Collection.',
    title: 'Excellence',
    highlight: 'Uncompromised',
    description: '',
    textPosition: 'top',
    minimalText: true
  }
];

// Split text into animated words
const AnimatedTitle = ({ text, className }: { text: string; className: string }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll('.word');
    gsap.fromTo(
      words,
      { opacity: 0, y: 40, rotateX: 90, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.4)',
      }
    );
  }, [text]);

  return (
    <span ref={containerRef} className={className} style={{ perspective: '600px', display: 'inline' }}>
      {text.split(' ').map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word"
          style={{ display: 'inline-block', marginRight: '0.3em', transformOrigin: 'bottom' }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 second auto-play
    return () => clearInterval(timer);
  }, []);

  // Dynamically preload the next slide image ahead of time so slide transitions are instantaneous
  useEffect(() => {
    const nextIndex = (current + 1) % slides.length;
    const nextImg = new Image();
    nextImg.src = slides[nextIndex].image;
  }, [current]);

  // CTA shimmer animation
  useEffect(() => {
    if (!ctaRef.current) return;
    const shimmer = gsap.fromTo(
      ctaRef.current.querySelector('.cta-shimmer'),
      { x: '-100%' },
      { x: '200%', duration: 2, ease: 'power2.inOut', repeat: -1, repeatDelay: 3 }
    );
    return () => { shimmer.kill(); };
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="w-full relative overflow-hidden bg-background">
      
      {/* Floating decorative diamonds */}
      <div className="absolute inset-0 pointer-events-none z-[15] overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rotate-45 border border-[#C28E3A]/30 floating-diamond"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Container: Aspect ratio for mobile banner, full height for desktop */}
      <div className="w-full h-[50vh] min-h-[350px] md:min-h-0 md:h-[100vh] relative z-0">
        
        {/* Background Images Carousel */}
        <AnimatePresence initial={false}>
          <motion.img
            key={current}
            src={slides[current].image}
            alt={slides[current].title}
            loading={current === 0 ? "eager" : "lazy"}
            fetchPriority={current === 0 ? "high" : "auto"}
            decoding="async"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-right md:object-right"
          />
        </AnimatePresence>

        {/* Mobile-only Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent md:hidden z-[5] pointer-events-none"></div>

        {/* Absolute Overlay Typography */}
        <div className={`absolute inset-0 z-10 flex ${slides[current].textPosition === 'top' ? 'items-start pt-16 md:pt-20' : 'items-center'} pointer-events-none`}>
          <div className={`max-w-7xl mx-auto px-4 md:px-6 w-full ${slides[current].textPosition === 'top' ? '' : 'pt-4 md:pt-[80px]'}`}>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`p-0 pointer-events-auto ${
                  slides[current].textPosition === 'top'
                    ? 'text-center max-w-4xl mx-auto flex flex-col items-center'
                    : 'text-left w-[65%] md:max-w-xl'
                }`}
              >
                <div
                  role="heading"
                  aria-level={2}
                  className={`font-serif text-[#2D2318] leading-[1.1] ${slides[current].minimalText ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1' : 'text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-1 md:mb-4'}`}
                >
                  <AnimatedTitle text={slides[current].title} className="" />
                  {' '}
                  {slides[current].minimalText && <span className="text-[#5C4D3C] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl ml-2">{slides[current].highlight}</span>}
                </div>
                
                {!slides[current].minimalText && (
                  <p className="text-xl sm:text-2xl md:text-4xl text-[#5C4D3C] font-medium mb-2 md:mb-6 leading-tight font-serif">
                    {slides[current].highlight}
                  </p>
                )}
                
                {!slides[current].minimalText && (
                  <>
                    {/* Elegant Divider */}
                    <div className={`hidden md:flex items-center gap-4 mb-6 ${slides[current].textPosition === 'top' ? 'mx-auto' : ''}`} data-animate-divider>
                      <div className="h-[1px] w-12 bg-[#C28E3A]/50"></div>
                      <div className="w-2 h-2 rotate-45 bg-[#C28E3A] animate-spin-slow"></div>
                      <div className="h-[1px] w-12 bg-[#C28E3A]/50"></div>
                    </div>
                    {/* Mobile minimal divider */}
                    <div className={`flex md:hidden items-center gap-2 mb-2 ${slides[current].textPosition === 'top' ? 'mx-auto' : ''}`}>
                      <div className="w-1.5 h-1.5 rotate-45 bg-[#C28E3A]"></div>
                      <div className="h-[1px] w-8 bg-[#C28E3A]/50"></div>
                    </div>
                    
                    <p className={`text-[11px] sm:text-[12px] md:text-lg text-[#5C4D3C]/90 font-light leading-snug md:leading-relaxed mb-4 md:mb-10 ${
                      slides[current].textPosition === 'top' ? 'max-w-2xl text-center' : 'max-w-xs md:max-w-md'
                    }`}>
                      {slides[current].description}
                    </p>
                    
                    <div className={`flex flex-wrap gap-2 md:gap-4 ${slides[current].textPosition === 'top' ? 'justify-center' : ''}`}>
                      <Link 
                        ref={ctaRef as any}
                        to="/products"
                        data-magnetic
                        className="px-4 py-2 md:px-8 md:py-4 bg-[#0F5A3B] text-white font-bold tracking-widest uppercase text-[9px] md:text-xs rounded-sm md:rounded-full hover:bg-[#0A3D28] transition-colors duration-300 shadow-lg flex items-center justify-center gap-1 md:gap-2 transform hover:scale-105 active:scale-95 relative overflow-hidden"
                      >
                        <span className="relative z-10">Shop Now</span>
                        {/* Shimmer effect */}
                        <div className="cta-shimmer absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
                      </Link>
                      <a 
                        href="#about"
                        data-magnetic
                        className="px-4 py-2 md:px-8 md:py-4 bg-transparent border border-[#2D2318]/20 text-[#2D2318] font-bold tracking-widest uppercase text-[9px] md:text-xs rounded-sm md:rounded-full hover:border-[#C28E3A] hover:text-[#C28E3A] transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        Explore
                      </a>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 md:gap-6">
          <button 
            onClick={prevSlide}
            data-magnetic
            className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/50 backdrop-blur-md border border-[#2D2318]/10 flex items-center justify-center text-[#2D2318] hover:bg-[#C28E3A] hover:text-white hover:border-[#C28E3A] transition-all duration-300 shadow-sm"
          >
            <ChevronLeft size={14} className="md:w-5 md:h-5" />
          </button>

          <div className="flex gap-1.5 md:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                  index === current ? 'w-4 md:w-8 bg-[#C28E3A]' : 'w-1.5 md:w-2 bg-[#2D2318]/20 hover:bg-[#C28E3A]/50'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            data-magnetic
            className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/50 backdrop-blur-md border border-[#2D2318]/10 flex items-center justify-center text-[#2D2318] hover:bg-[#C28E3A] hover:text-white hover:border-[#C28E3A] transition-all duration-300 shadow-sm"
          >
            <ChevronRight size={14} className="md:w-5 md:h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
