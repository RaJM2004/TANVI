import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const products = [
  { title: "California Almonds", image: "/hero1.png" },
  { title: "Dry Fruits & Spices", image: "/hero2.png" },
  { title: "Irani Pistachio", image: "/hero3.png" },
  { title: "Gold Almonds", image: "/hero4.png" },
  { title: "Chia Seeds", image: "/hero5.png" },
  { title: "Pumpkin Seeds", image: "/hero6.png" },
];

// Duplicate products for seamless infinite loop
const allItems = [...products, ...products];

export const ProductShowcase3D = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2; // Half because we duplicated

    // Infinite scroll animation
    const anim = gsap.to(track, {
      x: -totalWidth,
      duration: 25,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string | number) => parseFloat(String(x)) % totalWidth),
      },
    });

    return () => {
      anim.kill();
    };
  }, []);

  // Floating animation for individual cards
  const getFloatStyle = (index: number) => ({
    animationDelay: `${index * 0.4}s`,
    animationDuration: `${3 + (index % 3) * 0.5}s`,
  });

  return (
    <div ref={containerRef} className="w-full mb-16 relative overflow-hidden">
      {/* Gradient masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-8 py-8"
        style={{ willChange: 'transform' }}
      >
        {allItems.map((product, index) => (
          <div
            key={`${product.title}-${index}`}
            className="showcase-card flex-shrink-0 w-[220px] md:w-[280px] group cursor-pointer"
            style={getFloatStyle(index)}
          >
            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#C28E3A]/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#C28E3A]/40 transition-colors duration-500" />

              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* Title overlay on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-serif text-lg drop-shadow-lg">{product.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Center label */}
      <div className="text-center mt-4">
        <p className="text-[#C28E3A] text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
          Premium Collection
        </p>
      </div>
    </div>
  );
};
