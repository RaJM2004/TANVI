import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface VarietyItem {
  name: string;
  img: string;
  tag: string;
}

interface CategoryPortal {
  name: string;
  tagline: string;
  origin: string;
  badge: string;
  varieties: string;
  slug: string;
  bgPhoto: string;
  description: string;
  tags: string[];
  glowColor: string;
  buttonText: string;
  items: VarietyItem[];
}

const categoryPortals: CategoryPortal[] = [
  {
    name: "California Almonds",
    tagline: "Direct Orchards • Pure Nonpareil",
    origin: "California, USA",
    badge: "USA Import",
    varieties: "6 Premium Varieties",
    slug: "almonds",
    bgPhoto: "/category-almonds.jpg",
    description: "Golden-skinned Nonpareil supreme almonds with rich natural crunch, available in 15kg master cartons, 5kg × 3 packs, and 30kg bulk sacks.",
    tags: ["15kg Master Box", "5kg × 3 pac (15kg)", "30kg Master Sack"],
    glowColor: "rgba(194, 142, 58, 0.35)",
    buttonText: "Explore Almonds",
    items: [
      {
        name: "California Super Premium",
        img: "/hero3.png",
        tag: "15kg Box",
      },
      {
        name: "California Almond",
        img: "/Premium%2015%20kg%20Almond%20Bag%20Display.png",
        tag: "15 Kg Bag",
      },
      {
        name: "Super Special",
        img: "/Premium Almonds Rustic Packaging.png",
        tag: "15kg (5kg × 3)",
      },
      {
        name: "Special Almond",
        img: "/Premium BRAINNUT Almonds in Nature.png",
        tag: "15kg Pack",
      },
      {
        name: "Special Almond Premium",
        img: "/Nútböld Almond Carton in Sunlit Nature.png",
        tag: "15kg Master",
      },
      {
        name: "Special BrainNut",
        img: "/hero1.png",
        tag: "15kg Box",
      },
      {
        name: "Jumbo Almond",
        img: "/BRAINNUT%2015KG%20Almonds%20Showcase.png",
        tag: "15kg Bag",
      },
    ],
  },
  {
    name: "Gourmet Pistachios",
    tagline: "Roasted & Salted • Jumbo Open Shell",
    origin: "Iran & California",
    badge: "Roasted Gourmet",
    varieties: "4 Signature Packs",
    slug: "pistachios",
    bgPhoto: "/category-pistachios.jpg",
    description: "Oven-roasted crunchy pistachios balanced in pure sea salt, available in 20kg master cartons (1kg × 20) and 10kg master cartons (250g × 40).",
    tags: ["20kg Master (1kg × 20)", "10kg Master (250g × 40)", "Wholesale Only"],
    glowColor: "rgba(112, 138, 66, 0.35)",
    buttonText: "Explore Pistachios",
    items: [
      {
        name: "California 1kg",
        img: "/Premium Salted Pistachio Packshot.png",
        tag: "20kg (1kg × 20)",
      },
      {
        name: "Irani Roasted 1kg",
        img: "/Premium Irani Pistachio Pouch.png",
        tag: "20kg (1kg × 20)",
      },
      {
        name: "California (250g)",
        img: "/Premium California Pistachio Pouch.png",
        tag: "10kg (250g × 40)",
      },
      {
        name: "Irani (250g)",
        img: "/hero8.png",
        tag: "10kg (250g × 40)",
      },
    ],
  },
  {
    name: "Superfood Seeds",
    tagline: "Grade AAA Cleaned • Wholesome Raw",
    origin: "Pure Harvest",
    badge: "Raw Superfood",
    varieties: "3 Power Seeds",
    slug: "seeds",
    bgPhoto: "/category-seeds.png",
    description: "Cold-cleaned flat pumpkin (12.5kg), crisp sunflower (12.5kg), and pure chia seeds (25kg) brimming with plant zinc, magnesium, and dietary fiber.",
    tags: ["Pumpkin 12.5kg", "Sunflower 12.5kg", "Chia 25kg Bulk"],
    glowColor: "rgba(180, 125, 55, 0.35)",
    buttonText: "Explore Seeds",
    items: [
      {
        name: "Pumpkin Seed G",
        img: "/Premium Pumpkin Seeds Harvest Display.png",
        tag: "12.5kg Bulk",
      },
      {
        name: "Sunflower Seed G",
        img: "/Premium Sunflower Seeds Packaging in Nature.png",
        tag: "12.5kg Bulk",
      },
      {
        name: "Chia Seeds",
        img: "/hero11.png",
        tag: "25kg Bulk",
      },
    ],
  },
];

export const HomeFeaturedShowcase: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#FAF7F2] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#C28E3A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#0F5A3B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C28E3A]/30 text-[#C28E3A] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Sparkles size={14} className="text-[#C28E3A]" />
            Signature Collections
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D2318] mb-5 tracking-tight"
          >
            Explore by Category
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#2D2318]/70 text-base md:text-lg leading-relaxed font-light"
          >
            Discover Tanvi Impex’s three specialized import divisions. From California groves and Iranian harvest plains to nutrient-rich seed farms.
          </motion.p>
        </div>

        {/* 3 Immersive Interactive Category Portal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
          {categoryPortals.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * idx, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <Link
                to={`/products?category=${cat.slug}`}
                className="block h-full rounded-[2.5rem] bg-white border border-black/10 overflow-hidden shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_-15px_rgba(45,35,24,0.2)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Visual Upper Stage with Marquee & Atmosphere */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-gradient-to-b from-[#FAF4EA] to-[#F1E8D8] p-5 sm:p-6 flex flex-col justify-between">
                  {/* Subtle Background Texture */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${cat.bgPhoto}')` }}
                  />
                  
                  {/* Gentle gradient vignette for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F1E8D8] via-transparent to-black/5 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#2D2318] uppercase tracking-wider shadow-sm border border-black/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C28E3A]" />
                      {cat.badge}
                    </span>

                    <span className="text-xs font-semibold text-[#2D2318]/85 bg-white/85 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                      {cat.varieties}
                    </span>
                  </div>

                  {/* Continuous Infinite Marquee of All Varieties */}
                  <div className="relative z-10 w-full overflow-hidden my-auto py-2">
                    {/* Left & Right edge soft gradient fades */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF4EA] to-transparent z-20" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF4EA] to-transparent z-20" />

                    <div className="animate-card-marquee gap-3 py-1">
                      {[...cat.items, ...cat.items].map((item, pIdx) => (
                        <div
                          key={`${item.name}-${pIdx}`}
                          className="w-32 sm:w-36 h-36 sm:h-40 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-white/90 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex flex-col items-center justify-between shrink-0 hover:scale-105 transition-transform duration-300"
                        >
                          {/* Pack Tag */}
                          <span className="text-[9px] font-bold text-[#C28E3A] uppercase tracking-wider bg-[#FAF6F0] px-2 py-0.5 rounded-full w-full text-center truncate">
                            {item.tag}
                          </span>

                          {/* Product Image */}
                          <div className="w-full h-20 sm:h-24 flex items-center justify-center p-1">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform"
                            />
                          </div>

                          {/* Item Name */}
                          <span className="text-[11px] font-bold text-[#2D2318] text-center truncate w-full">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Origin Tag & Hover hint */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-black/60 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span>Origin:</span>
                      <strong className="text-black font-semibold">{cat.origin}</strong>
                    </div>
                    <span className="text-[10px] text-[#C28E3A] font-semibold tracking-wide uppercase bg-white/80 px-2 py-0.5 rounded-full shadow-xs">
                      Hover to pause
                    </span>
                  </div>
                </div>

                {/* Content Lower Stage */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2318] mb-1.5 group-hover:text-[#C28E3A] transition-colors">
                      {cat.name}
                    </h3>
                    
                    <p className="text-xs font-semibold text-[#C28E3A] tracking-wider uppercase mb-3">
                      {cat.tagline}
                    </p>

                    <p className="text-[#2D2318]/70 text-sm leading-relaxed mb-6 font-light">
                      {cat.description}
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#FAF6F0] text-[#5C4D3C] px-2.5 py-1 rounded-lg border border-black/5"
                        >
                          <CheckCircle2 size={12} className="text-[#C28E3A] shrink-0" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="font-serif font-bold text-sm tracking-wide text-[#2D2318] group-hover:text-[#C28E3A] transition-colors">
                      {cat.buttonText}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-[#FAF6F0] group-hover:bg-[#C28E3A] text-[#2D2318] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110">
                      <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Big Premium CTA Banner to Full Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] bg-gradient-to-r from-[#2D2318] via-[#1a110a] to-[#2D2318] p-8 sm:p-12 md:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10"
        >
          {/* Ambient gold glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#C28E3A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 text-[#C28E3A] text-xs font-bold uppercase tracking-widest mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              <ShieldCheck size={16} />
              Full Product Catalog Available
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 leading-tight !text-white">
              Direct Wholesale Containers & <span className="text-[#E5C158]">Consumer Freshness Packs</span>
            </h3>
            <p className="!text-white/85 text-sm sm:text-base leading-relaxed">
              Explore our complete inventory of 11 dry fruit varieties, 250g & 1kg pouches, 20kg bulk master boxes, and instant IndiaMART quotations directly from our APMC Vashi desk.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full lg:w-auto flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-gradient-to-r from-[#C28E3A] to-[#D4AF37] hover:from-[#d4af37] hover:to-[#e5c158] text-white font-bold tracking-widest uppercase text-xs rounded-full shadow-[0_8px_25px_rgba(194,142,58,0.4)] hover:shadow-[0_12px_32px_rgba(194,142,58,0.6)] transform hover:scale-105 active:scale-95 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <span>View All 11 Products in Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
