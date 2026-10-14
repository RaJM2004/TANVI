
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutUs = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path circular wipe reveal for video
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(75% at 50% 50%)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Parallax on video element
      if (videoRef.current && videoContainerRef.current) {
        gsap.to(videoRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Counter animation for "8+"
      if (counterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 8,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counterRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(obj.val) + '+';
            }
          },
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="py-32 bg-[#1a110a] text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#2a1c12] -skew-x-12 translate-x-32 hidden lg:block opacity-50" />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#C28E3A 1px, transparent 1px), linear-gradient(90deg, #C28E3A 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image/Visual Side (Now takes up more width) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-8 relative h-[400px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl"
          >
            <div ref={videoContainerRef} className="absolute inset-0" style={{ clipPath: 'circle(0% at 50% 50%)' }}>
              <div className="absolute inset-0 bg-black/20 z-10" />
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-[120%] object-cover scale-[1.35] origin-top-left md:origin-center md:scale-[1.3]"
              >
                <source src="/Video.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-6 rounded-xl md:rounded-2xl"
            >
              <p ref={counterRef} className="text-2xl md:text-4xl font-serif text-[#C28E3A] mb-0 md:mb-1 leading-none">0+</p>
              <p className="text-[9px] md:text-sm font-medium tracking-widest md:tracking-wider uppercase text-white mt-1">Years of Excellence</p>
            </motion.div>
          </motion.div>
          
          {/* Text Side (Takes up remaining width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <p className="text-[#C28E3A] text-sm font-bold uppercase tracking-[0.2em] mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight text-[#C28E3A]">
              Crafting purity through nature's finest.
            </h2>
            
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Established in 2019 and headquartered in Navi Mumbai, Tanvi Impex has quickly grown to become a leading wholesaler, trader, and distributor of premium California Almonds, Pistachios, and Dry Fruits.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                Operating from the heart of the APMC market region, we are dedicated to sourcing the finest quality dry fruits directly from trusted farms. Our commitment to uncompromising quality ensures that every product reaching your table is a testament to nature's perfection.
              </motion.p>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-magnetic
              className="mt-12 px-8 py-4 border border-[#C28E3A] text-[#C28E3A] hover:bg-[#C28E3A] hover:text-white transition-colors duration-300 rounded-full text-sm font-bold tracking-[0.1em] uppercase relative overflow-hidden group"
            >
              <span className="relative z-10">Discover More</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#C28E3A] transition-transform duration-500" />
            </motion.button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
