import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';
import { QuoteModal, type ProductPackagingInfo } from './QuoteModal';

export type ProductPackaging = ProductPackagingInfo;

const categories = [
  {
    id: 'all',
    name: 'All Products',
    image: 'https://media.istockphoto.com/id/1729805246/photo/full-frame-of-assorted-nuts-variety.jpg?s=612x612&w=0&k=20&c=-V3OnrwidVXdkxWlrTjCW3OOU_7QAJomok9jxFfKYKU=',
  },
  {
    id: 'almonds',
    name: 'Almonds',
    image: 'https://www.health.com/thmb/xklPFBrlPpwcHND_ov5EZwLHAwc=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/almonds-GettyImages-683814187-2000-44a06e730fac4c60a10cbb5f9642b589.jpg',
  },
  {
    id: 'pistachios',
    name: 'Pistachios',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSahHvhRckHW6g_q8hQDjGNHAjkuOCDgK5ra-5pFbAdnVmB7FcvDLzLjv0&s=10',
  },
  {
    id: 'seeds',
    name: 'Seeds',
    image: '/category-seeds.png',
  },
];

const products = [
  // 1. California Super Premium Almond - 15kg
  {
    id: "california-super-premium-almond",
    title: "CALIFORNIA SUPER\nPREMIUM ALMOND",
    subtitle: "Superior Grade Nutrient-Rich California Almonds",
    tag: "15kg Bag",
    packaging: {
      totalWeight: "15kg",
      masterType: "15kg Master Bag",
      badge: "15kg Bag",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 15kg Master Bag • Not Sold as Single Pieces",
    },
    image: "/hero3.png",
    bg: "from-[#F7F0E4] to-[#EDE2CC]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/almond-nuts.html#2849741926197",
    theme: "legacy",
    categories: ["almonds", "bestsellers", "newarrivals"],
  },

  // 2. California Almond - 15kg
  {
    id: "california-almond-15kg",
    title: "CALIFORNIA\nALMOND",
    subtitle: "Superior Grade California Almonds",
    tag: "15kg Bag",
    packaging: {
      totalWeight: "15kg",
      masterType: "15kg Master Bag",
      badge: "15kg Bag",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 15kg Bulk Pack • Not Sold as Single Pieces",
    },
    image: "/Premium%2015%20kg%20Almond%20Bag%20Display.png",
    bg: "from-[#FAF3E7] to-[#EDE0C9]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/california-almonds.html#2851925363948",
    theme: "portrait",
    categories: ["almonds", "bestsellers", "newarrivals"],
  },

  // 3. California Special BrainNut Almond - 15kg
  {
    id: "california-special-brainnut-almond",
    title: "CALIFORNIA SPECIAL\nBRAINNUT ALMOND",
    subtitle: "Premium Handpicked California Almonds",
    tag: "15kg Bag",
    packaging: {
      totalWeight: "15kg",
      masterType: "15kg Master Bag",
      badge: "15kg Bag",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 15kg Master Box • Not Sold as Single Pieces",
    },
    image: "/hero1.png",
    bg: "from-[#FDF6EC] to-[#F5E6D0]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/california-almonds.html#2851925363948",
    theme: "legacy",
    categories: ["almonds", "bestsellers"],
  },

  // 4. Special Almond - 15kg
  {
    id: "premium-brainnut-almonds",
    title: "SPECIAL ALMOND",
    subtitle: "Pure California Almonds Harvested in Natural Surroundings",
    tag: "15kg Master Box",
    packaging: {
      totalWeight: "15kg",
      masterType: "15kg Master Carton",
      badge: "15kg Master Box",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 15kg Master Box • Not Sold as Single Pieces",
    },
    image: "/Premium BRAINNUT Almonds in Nature.png",
    bg: "from-[#FDF6EC] to-[#F5E6D0]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/california-almonds.html#2851925363948",
    theme: "landscape",
    categories: ["almonds", "newarrivals", "bestsellers"],
  },

  // 5. Special Almond Premium - 15kg
  {
    id: "nutbold-almond-carton",
    title: "SPECIAL ALMOND\nPREMIUM",
    subtitle: "Master Pack Sunlit Harvest California Almonds",
    tag: "15kg Master Box",
    packaging: {
      totalWeight: "15kg",
      masterType: "15kg Master Carton",
      badge: "15kg Master Box",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 15kg Master Box • Not Sold as Single Pieces",
    },
    image: "/Nútböld Almond Carton in Sunlit Nature.png",
    bg: "from-[#F7F0E4] to-[#EDE2CC]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/almond-nuts.html#2849741926197",
    theme: "landscape",
    categories: ["almonds", "newarrivals"],
  },

  // 6. Super Special - 5kg * 3pac = 15kg
  {
    id: "nutbold-special-selected-almonds",
    title: "SUPER SPECIAL",
    subtitle: "Special Selected California Almonds",
    tag: "15kg (5kg × 3 pac)",
    packaging: {
      totalWeight: "15kg",
      masterType: "15kg Master Carton",
      packFormula: "5kg × 3 pac = 15kg",
      innerPackDetail: "Contains 3 individual 5kg packs inside each 15kg master carton",
      badge: "15kg (5kg × 3 pac)",
      wholesaleOnlyNotice: "Wholesale Only • Sold as 15kg Master Pack (3 × 5kg packs) • Single 5kg pack not sold separately",
    },
    image: "/Premium Almonds Rustic Packaging.png",
    bg: "from-[#F5EEDC] to-[#E5D7BC]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/california-almonds.html#2851925363948",
    theme: "square",
    categories: ["almonds", "bestsellers"],
  },

  // 7. Independent Jumbo Almond - 15kg
  {
    id: "independent-jumbo-almond",
    title: "INDEPENDENT\nJUMBO ALMOND",
    subtitle: "King Size Extra Bold Kernels",
    tag: "15kg Bag",
    packaging: {
      totalWeight: "15kg",
      masterType: "15kg Master Bag",
      badge: "15kg Bag",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 15kg Master Bag • Not Sold as Single Pieces",
    },
    image: "/BRAINNUT%2015KG%20Almonds%20Showcase.png",
    bg: "from-[#F0EDE6] to-[#E4DDD0]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/dry-fruits.html#2851925299912",
    theme: "landscape",
    categories: ["almonds"],
  },

  // 8. Independent Regular Almonds - 30kg
  {
    id: "independent-regular-almonds",
    title: "INDEPENDENT\nREGULAR ALMONDS",
    subtitle: "100% Natural Selected Grade Wholesale Almonds",
    tag: "30kg Bulk Bag",
    packaging: {
      totalWeight: "30kg",
      masterType: "30kg Bulk Master Bag",
      badge: "30kg Bulk Bag",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 30kg Master Bag • Not Sold as Single Pieces",
    },
    image: "/hero6.png",
    bg: "from-[#F9F5EE] to-[#EFE4D2]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/dry-almond.html#2851925479030",
    theme: "legacy",
    categories: ["almonds"],
  },

  // Pistachios (4 Products)
  // 9. Irani Roasted Pistachio (1 KG) - 1kg * 20pac = 20kg
  {
    id: "irani-roasted-pistachio",
    title: "IRANI ROASTED\nPISTACHIO (1 KG)",
    subtitle: "Authentic Lightly Salted & Crunchy Irani Pistachios",
    tag: "20kg Master Carton",
    packaging: {
      totalWeight: "20kg",
      masterType: "20kg Master Carton",
      packFormula: "1kg × 20 pac = 20kg",
      innerPackDetail: "Contains 20 individual 1kg freshness pouches inside each 20kg master carton",
      badge: "20kg (1kg × 20 pac)",
      wholesaleOnlyNotice: "Wholesale Only • Sold as 20kg Master Carton (20 × 1kg) • Single 1kg pack not sold separately",
    },
    image: "/Premium Irani Pistachio Pouch.png",
    bg: "from-[#EEF2E6] to-[#DBE2CF]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/roasted-pistachio.html#2858557187773",
    theme: "square",
    categories: ["pistachios"],
  },

  // 10. California Roasted Pistachio (1 KG) - 1kg * 20pac = 20kg
  {
    id: "california-roasted-pistachio",
    title: "CALIFORNIA ROASTED\nPISTACHIO (1 KG)",
    subtitle: "Finest Grade Crunchy Roasted & Salted California Pistachios",
    tag: "20kg Master Carton",
    packaging: {
      totalWeight: "20kg",
      masterType: "20kg Master Carton",
      packFormula: "1kg × 20 pac = 20kg",
      innerPackDetail: "Contains 20 individual 1kg pouches inside each 20kg master carton",
      badge: "20kg (1kg × 20 pac)",
      wholesaleOnlyNotice: "Wholesale Only • Sold as 20kg Master Carton (20 × 1kg) • Single 1kg pack not sold separately",
    },
    image: "/Premium Salted Pistachio Packshot.png",
    bg: "from-[#EDEEE6] to-[#D9DBC8]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/roasted-pistachio.html#2858557187773",
    theme: "square",
    categories: ["pistachios"],
  },

  // 11. California Pistachio (250g) - 250g * 40 pac = 10kg
  {
    id: "california-pistachio",
    title: "CALIFORNIA\nPISTACHIO (250g)",
    subtitle: "Premium California Roasted & Salted Pistachios",
    tag: "10kg Master Carton",
    packaging: {
      totalWeight: "10kg",
      masterType: "10kg Master Carton",
      packFormula: "250g × 40 pac = 10kg",
      innerPackDetail: "Contains 40 individual 250g pouches inside each 10kg master carton",
      badge: "10kg (250g × 40 pac)",
      wholesaleOnlyNotice: "Wholesale Only • Sold as 10kg Master Carton (40 × 250g) • Single 250g pack not sold separately",
    },
    image: "/Premium California Pistachio Pouch.png",
    bg: "from-[#F2F5EB] to-[#E0E7D6]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/pistachio-nut.html#2858557187655",
    theme: "square",
    categories: ["pistachios"],
  },

  // 12. Irani Pistachio (250g) - 250g * 40 pac = 10kg
  {
    id: "irani-pistachio",
    title: "IRANI\nPISTACHIO (250g)",
    subtitle: "Authentic Roasted & Lightly Salted Irani Pistachios",
    tag: "10kg Master Carton",
    packaging: {
      totalWeight: "10kg",
      masterType: "10kg Master Carton",
      packFormula: "250g × 40 pac = 10kg",
      innerPackDetail: "Contains 40 individual 250g pouches inside each 10kg master carton",
      badge: "10kg (250g × 40 pac)",
      wholesaleOnlyNotice: "Wholesale Only • Sold as 10kg Master Carton (40 × 250g) • Single 250g pack not sold separately",
    },
    image: "/hero8.png",
    bg: "from-[#EDEEE6] to-[#D9DBC8]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/roasted-pistachio.html#2858557187773",
    theme: "legacy",
    categories: ["pistachios"],
  },

  // Seeds
  // 13. Pumpkin Seed G - 12.5kg
  {
    id: "pumpkin-seed-g",
    title: "PUMPKIN\nSEED G",
    subtitle: "Grade AAA High-Protein & Zinc Seeds in 12.5kg Wholesale Master Pack",
    tag: "12.5kg Bulk",
    packaging: {
      totalWeight: "12.5kg",
      masterType: "12.5kg Master Carton",
      badge: "12.5kg Bulk Bag",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 12.5kg Master Pack • Not Sold as Single Pieces",
    },
    image: "/Premium Pumpkin Seeds Harvest Display.png",
    bg: "from-[#F5EDE4] to-[#E8DBCB]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/pumpkin-seeds-g.html#2858557187812",
    theme: "landscape",
    categories: ["seeds", "newarrivals", "bestsellers"],
  },

  // 14. Sunflower Seed G - 12.5kg
  {
    id: "sunflower-seed-g",
    title: "SUNFLOWER\nSEED G",
    subtitle: "100% Natural Wholesome Crunch Seeds in 12.5kg Wholesale Master Pack",
    tag: "12.5kg Bulk",
    packaging: {
      totalWeight: "12.5kg",
      masterType: "12.5kg Master Carton",
      badge: "12.5kg Bulk Bag",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 12.5kg Master Pack • Not Sold as Single Pieces",
    },
    image: "/Premium Sunflower Seeds Packaging in Nature.png",
    bg: "from-[#FDF9EE] to-[#EFE7D0]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/dry-fruits.html#2851925299912",
    theme: "landscape",
    categories: ["seeds", "newarrivals"],
  },

  // 15. Chia Seed - 25kg
  {
    id: "chia-seed",
    title: "CHIA\nSEED",
    subtitle: "Omega-3 Packed Natural Superfood in 25kg Bulk Master Bag",
    tag: "25kg Bulk",
    packaging: {
      totalWeight: "25kg",
      masterType: "25kg Bulk Master Bag",
      badge: "25kg Bulk Bag",
      wholesaleOnlyNotice: "Wholesale Bulk Supply • Sold as 25kg Bulk Master Bag • Not Sold as Single Pieces",
    },
    image: "/hero11.png",
    bg: "from-[#ECF0E6] to-[#D5DCCA]",
    url: "https://www.indiamart.com/tanviimpexnavimumbai/chia-seed.html#2858557187962",
    theme: "legacy",
    categories: ["seeds", "bestsellers"],
  },
];

const ProductSection = ({
  product,
  index,
  isReversed,
  onGetQuote,
}: {
  product: (typeof products)[0];
  index: number;
  isReversed: boolean;
  onGetQuote: (product: (typeof products)[0]) => void;
}) => {
  return (
    <div
      id={product.id}
      className={`scroll-mt-24 w-full min-h-[70vh] md:min-h-[85vh] bg-gradient-to-br ${product.bg} relative overflow-hidden flex items-center`}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #2D2318 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div
          className={`flex flex-col-reverse ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
            } items-center gap-8 md:gap-4 py-16 md:py-0`}
        >
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-1 ${isReversed ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}
          >
            {/* Single Tag */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5, type: 'spring', bounce: 0.4 }}
              className={`inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#2D2318] text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-md ${isReversed ? 'md:ml-auto' : ''
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#C28E3A] animate-pulse" />
              {product.tag}
            </motion.div>

            {/* Large Title */}
            <h3
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-[#2D2318] leading-[0.9] tracking-tight mb-6 uppercase"
              style={{ fontFamily: "'Inter', sans-serif", whiteSpace: 'pre-line' }}
            >
              {product.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[#5C4D3C]/75 text-lg md:text-xl font-medium tracking-wide mb-2">
              {product.subtitle}
            </p>

            {/* Clean inline packaging detail */}
            <div className={`flex flex-wrap items-center gap-2 mb-8 text-xs sm:text-sm font-semibold text-[#0F5A3B] ${isReversed ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
              <span className="inline-flex items-center gap-1.5 bg-[#0F5A3B]/10 px-3 py-1 rounded-full border border-[#0F5A3B]/20">
                <Package size={13} className="text-[#0F5A3B]" />
                <span>
                  Packaging: {product.packaging.packFormula ? `${product.packaging.masterType} (${product.packaging.packFormula})` : product.packaging.masterType}
                </span>
              </span>
              <span className="text-[#8C3A00] font-medium text-xs bg-[#FAF3E7] px-2.5 py-1 rounded-full border border-[#C28E3A]/30">
                Bulk Wholesale Only (No Single Pieces)
              </span>
            </div>

            {/* CTA */}
            <div className={`flex flex-wrap items-center gap-4 ${isReversed ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
              <motion.button
                type="button"
                onClick={() => onGetQuote(product)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-magnetic
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#0F5A3B] text-white font-bold tracking-widest uppercase text-xs rounded-full hover:bg-[#0A3D28] transition-colors duration-300 shadow-lg relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10">Get Best Quote</span>
                <svg
                  className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700" />
              </motion.button>

              <motion.a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#2D2318]/20 text-[#2D2318] font-bold tracking-widest uppercase text-xs rounded-full hover:bg-[#2D2318]/5 transition-colors duration-300"
              >
                <span>IndiaMART Page</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Image Side */}
          <div className="flex-1 flex items-center justify-center relative w-full">
            {product.theme === 'landscape' ? (
              /* New Landscape Theme for newly uploaded packaging photography */
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[460px] sm:max-w-[540px] md:max-w-[580px] lg:max-w-[620px] aspect-[3/2]"
              >
                <img
                  src={product.image}
                  alt={product.title.replace('\n', ' ')}
                  className="w-full h-full object-cover object-center rounded-3xl shadow-2xl border border-black/5"
                />

                {/* Image glow */}
                <div className="absolute -inset-4 bg-[#C28E3A]/10 rounded-[2rem] -z-10 blur-2xl pointer-events-none" />

                {/* Quality Seal Badge for Landscape */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7, type: 'spring', bounce: 0.3 }}
                  className={`absolute ${isReversed
                    ? '-bottom-4 -left-2 sm:-left-4 md:-left-6'
                    : '-bottom-4 -right-2 sm:-right-4 md:-right-6'
                    } w-20 h-20 md:w-24 md:h-24 z-20`}
                >
                  <div className="w-full h-full rounded-full border-[3px] border-[#2D2318] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md shadow-xl relative overflow-hidden">
                    <svg
                      className="absolute inset-0 w-full h-full animate-spin-slow"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <path
                          id={`circle-ls-${index}`}
                          d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                      </defs>
                      <text
                        className="text-[8px] md:text-[7px] uppercase tracking-[0.25em] fill-[#2D2318] font-bold"
                      >
                        <textPath href={`#circle-ls-${index}`}>
                          ★ SATISFACTION ★ GUARANTEED ★ PREMIUM ★ QUALITY
                        </textPath>
                      </text>
                    </svg>
                    <span className="text-2xl md:text-3xl font-black text-[#2D2318] relative z-10">
                      100
                    </span>
                    <span className="text-[8px] md:text-[10px] font-bold text-[#5C4D3C] uppercase tracking-wider relative z-10">
                      % Pure
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* Original Theme for previous images: portrait box, 80% focus to capture right-side pouches, and dynamic tilt */
              <motion.div
                initial={{ scale: 0.85, opacity: 0, rotate: isReversed ? -10 : 10, y: 50 }}
                whileInView={{ scale: 1, opacity: 1, rotate: isReversed ? -3 : 3, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[280px] h-[350px] sm:w-[340px] sm:h-[420px] md:w-[420px] md:h-[520px] lg:w-[480px] lg:h-[580px]"
              >
                <img
                  src={product.image}
                  alt={product.title.replace('\n', ' ')}
                  className={`w-full h-full object-cover ${product.theme === 'legacy' ? 'object-[80%_center]' : 'object-center'} rounded-3xl shadow-2xl`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.tried) {
                      target.dataset.tried = 'true';
                      target.src = decodeURI(product.image);
                    }
                  }}
                />

                {/* Image glow */}
                <div className="absolute -inset-4 bg-[#C28E3A]/5 rounded-[2rem] -z-10 blur-2xl pointer-events-none" />

                {/* Quality Seal Badge for Previous Theme */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7, type: 'spring', bounce: 0.3 }}
                  className={`absolute ${isReversed
                    ? 'bottom-4 left-0 md:-left-8'
                    : 'bottom-4 right-0 md:-right-8'
                    } w-20 h-20 md:w-28 md:h-28 z-20`}
                >
                  <div className="w-full h-full rounded-full border-[3px] border-[#2D2318] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm shadow-lg relative overflow-hidden">
                    <svg
                      className="absolute inset-0 w-full h-full animate-spin-slow"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <path
                          id={`circle-lg-${index}`}
                          d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                      </defs>
                      <text
                        className="text-[8px] md:text-[7px] uppercase tracking-[0.25em] fill-[#2D2318] font-bold"
                      >
                        <textPath href={`#circle-lg-${index}`}>
                          ★ SATISFACTION ★ GUARANTEED ★ PREMIUM ★ QUALITY
                        </textPath>
                      </text>
                    </svg>
                    <span className="text-2xl md:text-3xl font-black text-[#2D2318] relative z-10">
                      100
                    </span>
                    <span className="text-[8px] md:text-[10px] font-bold text-[#5C4D3C] uppercase tracking-wider relative z-10">
                      % Pure
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryParam && ['almonds', 'pistachios', 'seeds'].includes(categoryParam) ? categoryParam : 'all'
  );

  useEffect(() => {
    if (categoryParam && ['almonds', 'pistachios', 'seeds'].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    } else if (!categoryParam) {
      setActiveCategory('all');
    }
  }, [categoryParam]);

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.categories.includes(activeCategory));

  const activeCategoryObj = categories.find((c) => c.id === activeCategory);

  return (
    <section id="products" className="relative z-10">
      {/* Section Header & Circular Category Segregation Navigation */}
      <div className="pt-4 sm:pt-6 md:pt-8 pb-8 md:pb-12 bg-background text-center border-b border-black/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 mb-6 md:mb-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-3">
            Our Products
          </h2>
          <div
            className="h-1 w-20 bg-[#C28E3A] mx-auto mb-4"
            data-animate-divider
          />
          <p
            className="text-black/60 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            data-animate-lines
          >
            Sourced with care, packed with trust. Discover our finest selection
            of premium California almonds, authentic pistachios, and nutrient-dense seeds.
          </p>
        </motion.div>

        {/* Circular Category Badges (as requested) */}
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="flex items-center justify-start md:justify-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto md:overflow-visible pt-2 sm:pt-4 pb-2 px-6 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none flex-shrink-0 transition-transform active:scale-95 py-2"
                >
                  {/* Large Round Circular Thumbnail */}
                  <div
                    className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden transition-all duration-300 bg-white ${isActive
                      ? 'ring-4 md:ring-[5px] ring-[#C28E3A] ring-offset-4 md:ring-offset-[6px] ring-offset-[#FAF6F0] scale-105 shadow-[0_16px_38px_rgba(194,142,58,0.38)]'
                      : 'border-2 md:border-3 border-black/10 hover:border-[#C28E3A]/70 shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_32px_rgba(194,142,58,0.22)] hover:scale-105'
                      }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Subtle inner shadow for depth */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_3px_10px_rgba(0,0,0,0.18)] pointer-events-none" />
                  </div>

                  {/* Category Name Underneath */}
                  <span
                    className={`mt-4 text-base sm:text-lg md:text-xl font-bold tracking-wide transition-colors ${isActive
                      ? 'text-[#C28E3A]'
                      : 'text-[#2D2318]/90 group-hover:text-[#C28E3A]'
                      }`}
                  >
                    {cat.name}
                  </span>

                  {/* Active Indicator Bar */}
                  <div className="h-1.5 w-8 md:w-10 mt-2 rounded-full transition-all duration-300">
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="w-full h-full bg-[#C28E3A] rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Filter Counter & Quick Reset */}
          <div className="mt-6 flex items-center justify-center gap-3 text-xs sm:text-sm text-black/55">
            <span>
              Showing <strong className="text-black font-semibold">{filteredProducts.length}</strong> items in{' '}
              <strong className="text-[#C28E3A] font-semibold">{activeCategoryObj?.name}</strong>
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => handleSelectCategory('all')}
                className="underline hover:text-[#C28E3A] font-medium transition-colors cursor-pointer ml-1"
              >
                (Show All)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full-page Product Sections with Animated Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {filteredProducts.map((product, index) => (
            <ProductSection
              key={`${activeCategory}-${product.title}-${index}`}
              product={product}
              index={index}
              isReversed={index % 2 !== 0}
              onGetQuote={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Dropdown Quotation Modal */}
      <QuoteModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
