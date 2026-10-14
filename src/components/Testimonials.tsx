import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ThumbsUp,
  CheckCircle2,
  MapPin,
  Calendar,
  Quote,
  Award,
  Info,
} from 'lucide-react';

export interface Review {
  id: number;
  name: string;
  location: string;
  date: string;
  product: string;
  rating: number;
  text: string;
  initials: string;
  helpfulCount: number;
  verifiedBuyer?: boolean;
}

// Exactly the 2 authentic client testimonials
const initialReviews: Review[] = [
  {
    id: 1,
    name: 'SAYAN Ghosh',
    location: 'Hooghly, West Bengal',
    date: '13-May-26',
    product: 'Almond Nuts',
    rating: 5,
    text: 'Excellent quality Almond Nuts. The packaging was secure and the delivery was on time. Highly recommended for bulk buyers.',
    initials: 'SG',
    helpfulCount: 14,
    verifiedBuyer: true,
  },
  {
    id: 2,
    name: 'Monika Mehta',
    location: 'Mumbai, Maharashtra',
    date: '12-August-25',
    product: 'California mini special brainnut',
    rating: 5,
    text: 'The California mini special brainnuts are premium quality. Very satisfied with the product and the quick response from the team.',
    initials: 'MM',
    helpfulCount: 18,
    verifiedBuyer: true,
  },
];

// User's exact uploaded rating breakdown metrics
const ratingBreakdown = [
  { stars: 5, pct: 55 },
  { stars: 4, pct: 20 },
  { stars: 3, pct: 10 },
  { stars: 2, pct: 5 },
  { stars: 1, pct: 10 },
];

const satisfactionMetrics = [
  { label: 'Quality', pct: 100 },
  { label: 'Delivery', pct: 100 },
  { label: 'Response', pct: 90 },
];

export const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [likedReviews, setLikedReviews] = useState<{ [id: number]: boolean }>({});
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [activeProductFilter, setActiveProductFilter] = useState<'all' | string>('all');

  // Toggle helpful like
  const handleLike = (id: number) => {
    const isCurrentlyLiked = !!likedReviews[id];
    setLikedReviews((prev) => ({ ...prev, [id]: !isCurrentlyLiked }));
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            helpfulCount: isCurrentlyLiked ? r.helpfulCount - 1 : r.helpfulCount + 1,
          };
        }
        return r;
      })
    );
  };

  // Filtered reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedStarFilter !== null && r.rating !== selectedStarFilter) {
      return false;
    }
    if (activeProductFilter !== 'all') {
      return r.product.toLowerCase().includes(activeProductFilter.toLowerCase());
    }
    return true;
  });

  return (
    <section id="reviews" className="pt-4 sm:pt-6 md:pt-8 pb-20 md:pb-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Subtle luxury geometric grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#C28E3A 1px, transparent 1px), linear-gradient(90deg, #C28E3A 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 15%, rgba(194,142,58,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D2318] font-bold tracking-tight mb-4"
          >
            Ratings &amp; Reviews
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-1 w-20 bg-gradient-to-r from-[#C28E3A] to-[#E5C158] mx-auto rounded-full mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#5C4D3C] text-sm sm:text-base leading-relaxed"
          >
            Real feedback from our wholesale buyers and partners across India who rely on our strict APMC quality standards and dependable supply.
          </motion.p>
        </div>

        {/* Ratings Summary Card (Overall Rating | Rating Breakdown | User Satisfaction) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-black/6 shadow-[0_10px_35px_rgba(45,35,24,0.05)] mb-14"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between items-center">
            {/* 1. Overall Rating (4.3 / 5 & 69 Ratings) */}
            <div className="flex flex-col items-center justify-center min-w-[200px] text-center w-full lg:w-auto">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl sm:text-6xl font-serif font-bold text-[#2D2318] leading-none">
                  4.3
                </span>
                <span className="text-xl sm:text-2xl font-semibold text-[#5C4D3C]/70">/ 5</span>
              </div>

              {/* 4 Full Stars + 30% Partial 5th Star */}
              <div className="flex items-center gap-1 my-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FACC15] text-[#FACC15]" />
                ))}
                <div className="relative">
                  <Star className="w-5 h-5 fill-black/10 text-black/10" />
                  <div className="absolute inset-0 overflow-hidden w-[30%]">
                    <Star className="w-5 h-5 fill-[#FACC15] text-[#FACC15]" />
                  </div>
                </div>
                <Info size={14} className="text-[#5C4D3C]/50 ml-1 cursor-pointer hover:text-[#C28E3A] transition-colors" />
              </div>

              <span className="text-xs sm:text-sm font-semibold text-[#5C4D3C]">
                69 Ratings
              </span>
            </div>

            {/* Vertical Divider 1 */}
            <div className="hidden lg:block w-px h-36 bg-black/8" />

            {/* 2. Interactive Rating Breakdown Bars */}
            <div className="flex-1 w-full max-w-md flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2D2318] mb-1">
                <span>Rating Breakdown</span>
                {selectedStarFilter && (
                  <button
                    type="button"
                    onClick={() => setSelectedStarFilter(null)}
                    className="text-[11px] text-[#C28E3A] hover:underline font-bold cursor-pointer capitalize"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {ratingBreakdown.map((row) => {
                const isSelected = selectedStarFilter === row.stars;
                return (
                  <button
                    key={row.stars}
                    type="button"
                    onClick={() =>
                      setSelectedStarFilter(isSelected ? null : row.stars)
                    }
                    className={`w-full flex items-center gap-3 text-xs text-[#5C4D3C] px-2 py-1 rounded-lg transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#C28E3A]/10 font-bold text-[#8A5A32]'
                        : 'hover:bg-black/3'
                    }`}
                  >
                    <span className="w-12 whitespace-nowrap font-medium flex items-center gap-1">
                      {row.stars} <Star size={11} className="fill-[#FACC15] text-[#FACC15]" />
                    </span>
                    <div className="flex-1 h-2.5 bg-[#FAF6EE] rounded-full overflow-hidden border border-black/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#C28E3A] to-[#D9A74A] rounded-full"
                      />
                    </div>
                    <span className="w-10 text-right font-medium text-[#2D2318]">
                      {row.pct}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Vertical Divider 2 */}
            <div className="hidden lg:block w-px h-36 bg-black/8" />

            {/* 3. User Satisfaction */}
            <div className="flex-1 w-full max-w-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1 font-bold text-xs uppercase tracking-wider text-[#2D2318]">
                <ThumbsUp size={16} className="text-[#0F5A3B]" />
                <span>User Satisfaction</span>
              </div>

              <div className="space-y-3">
                {satisfactionMetrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-xs text-[#5C4D3C] mb-1 font-medium">
                      <span>{metric.label}</span>
                      <span className="font-bold text-[#2D2318]">{metric.pct}%</span>
                    </div>
                    <div className="h-2 bg-[#FAF6EE] rounded-full overflow-hidden border border-black/4">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#0F5A3B] to-[#1F7A52] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Most Relevant Reviews Title & Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-[#2D2318] font-serif">
            Most Relevant Reviews
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'almond', label: 'Almonds' },
              { id: 'brainnut', label: 'California Mini Special Brainnut' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveProductFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeProductFilter === tab.id
                    ? 'bg-[#2D2318] text-white shadow-xs'
                    : 'bg-white text-[#5C4D3C] hover:bg-[#F3EDE2] border border-black/6'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* The 2 Authentic Client Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => {
              const isLiked = !!likedReviews[review.id];

              return (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-black/6 shadow-[0_8px_30px_rgba(45,35,24,0.04)] hover:shadow-[0_16px_40px_rgba(194,142,58,0.12)] transition-all duration-300 flex flex-col justify-between relative group"
                >
                  {/* Subtle Quote Icon */}
                  <Quote
                    size={44}
                    className="absolute top-6 right-6 text-[#C28E3A]/10 pointer-events-none group-hover:text-[#C28E3A]/20 transition-colors"
                  />

                  <div>
                    {/* Top Row: Stars + Date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`transition-transform duration-200 ${
                              i < review.rating
                                ? 'fill-[#FACC15] text-[#FACC15]'
                                : 'fill-black/10 text-black/10'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#5C4D3C]/70">
                        <Calendar size={13} className="text-[#C28E3A]" />
                        <span>{review.date}</span>
                      </div>
                    </div>

                    {/* Review Body */}
                    <p className="text-sm sm:text-base text-[#2D2318] leading-relaxed mb-6 font-normal">
                      "{review.text}"
                    </p>

                    {/* Product Tag */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FAF6EE] border border-[#C28E3A]/20 text-xs font-semibold text-[#8A5A32] mb-6">
                      <Award size={13} className="text-[#C28E3A] flex-shrink-0" />
                      <span className="truncate">Product: {review.product}</span>
                    </div>
                  </div>

                  {/* Reviewer Details + Interactive Helpful Like Button */}
                  <div className="pt-5 border-t border-black/6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FAF6EE] to-[#EAE0D0] text-[#8A5A32] border border-[#C28E3A]/30 flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                        {review.initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-[#2D2318] truncate">
                            {review.name}
                          </h4>
                          {review.verifiedBuyer && (
                            <span title="Verified Wholesale Buyer">
                              <CheckCircle2 size={14} className="text-[#0F5A3B] flex-shrink-0" />
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#5C4D3C]/70 flex items-center gap-1 truncate mt-0.5">
                          <MapPin size={11} className="text-[#C28E3A] flex-shrink-0" />
                          <span>{review.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Interactive Helpful Upvote */}
                    <button
                      type="button"
                      onClick={() => handleLike(review.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                        isLiked
                          ? 'bg-[#0F5A3B]/10 border-[#0F5A3B]/30 text-[#0F5A3B] scale-105 shadow-xs'
                          : 'bg-white hover:bg-[#FAF6EE] border-black/8 text-[#5C4D3C]'
                      }`}
                      title="Mark review as helpful"
                    >
                      <ThumbsUp
                        size={13}
                        className={isLiked ? 'fill-[#0F5A3B] text-[#0F5A3B]' : 'text-[#8A5A32]'}
                      />
                      <span>Helpful ({review.helpfulCount})</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
