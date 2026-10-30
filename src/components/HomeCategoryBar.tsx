import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'all',
    name: 'All Products',
    image: 'https://media.istockphoto.com/id/1729805246/photo/full-frame-of-assorted-nuts-variety.jpg?s=612x612&w=0&k=20&c=-V3OnrwidVXdkxWlrTjCW3OOU_7QAJomok9jxFfKYKU=',
    path: '/products',
  },
  {
    id: 'almonds',
    name: 'Almonds',
    image: 'https://www.health.com/thmb/xklPFBrlPpwcHND_ov5EZwLHAwc=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/almonds-GettyImages-683814187-2000-44a06e730fac4c60a10cbb5f9642b589.jpg',
    path: '/products?category=almonds',
  },
  {
    id: 'pistachios',
    name: 'Pistachios',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSahHvhRckHW6g_q8hQDjGNHAjkuOCDgK5ra-5pFbAdnVmB7FcvDLzLjv0&s=10',
    path: '/products?category=pistachios',
  },
  {
    id: 'seeds',
    name: 'Seeds',
    image: '/category-seeds.webp',
    path: '/products?category=seeds',
  },
];

export const HomeCategoryBar = () => {
  const [activeHoverId, setActiveHoverId] = useState<string>('all');

  return (
    <section className="pt-10 sm:pt-12 md:pt-14 pb-2 md:pb-3 bg-background text-center relative z-10" aria-label="Product Categories">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="sr-only">Wholesale Categories: California Almonds, Irani Pistachios &amp; Superfood Seeds</h2>
        {/* Exact Circular Category Segregation Row */}
        <div
          className="flex items-center justify-start md:justify-center gap-7 sm:gap-10 md:gap-14 lg:gap-20 overflow-x-auto md:overflow-visible pt-8 sm:pt-10 pb-2 px-6 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseLeave={() => setActiveHoverId('all')}
        >
          {categories.map((cat) => {
            const isActive = activeHoverId === cat.id;

            return (
              <Link
                key={cat.id}
                to={cat.path}
                onMouseEnter={() => setActiveHoverId(cat.id)}
                className="flex flex-col items-center group cursor-pointer focus:outline-none flex-shrink-0 transition-transform active:scale-95 py-2"
              >
                {/* Large Round Circular Thumbnail with Gold Ring & Shadow */}
                <div
                  className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden transition-all duration-300 bg-white ${
                    isActive
                      ? 'ring-4 md:ring-[5px] ring-[#C28E3A] ring-offset-4 md:ring-offset-[6px] ring-offset-[#FAF6F0] scale-105 shadow-[0_16px_38px_rgba(194,142,58,0.38)]'
                      : 'border-2 md:border-3 border-black/10 hover:border-[#C28E3A]/70 shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_32px_rgba(194,142,58,0.22)] hover:scale-105'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={`${cat.name} Wholesale Category - Tanvi Impex`}
                    width="192"
                    height="192"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Subtle inner shadow for rich depth */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_3px_10px_rgba(0,0,0,0.18)] pointer-events-none" />
                </div>

                {/* Category Name Underneath */}
                <span
                  className={`mt-4 text-base sm:text-lg md:text-xl font-bold tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#C28E3A]'
                      : 'text-[#2D2318]/90 group-hover:text-[#C28E3A]'
                  }`}
                >
                  {cat.name}
                </span>

                {/* Active / Hover Indicator Bar */}
                <div className="h-1.5 w-8 md:w-10 mt-2 rounded-full transition-all duration-300">
                  {isActive && (
                    <motion.div
                      layoutId="homeCategoryActivePill"
                      className="w-full h-full bg-[#C28E3A] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
