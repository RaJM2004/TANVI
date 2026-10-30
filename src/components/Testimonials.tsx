import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  ThumbsUp,
  CheckCircle2,
  MapPin,
  Award,
  Info,
  ExternalLink,
} from 'lucide-react';
import { indiamartReviewsData, type IndiaMartReview } from '../data/indiamartReviews';

export type Review = IndiaMartReview;

// Rating breakdown matching official IndiaMART seller profile
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

// Vibrant avatar background colors matching the reference design
const avatarColorSchemes = [
  'bg-[#EAB308]/20 text-[#854D0E] border-[#EAB308]/40', // Amber
  'bg-[#0D9488]/15 text-[#0F766E] border-[#0D9488]/30', // Teal
  'bg-[#6366F1]/15 text-[#4338CA] border-[#6366F1]/30', // Indigo
  'bg-[#E11D48]/15 text-[#BE123C] border-[#E11D48]/30', // Rose / Maroon
  'bg-[#059669]/15 text-[#047857] border-[#059669]/30', // Emerald
  'bg-[#8B5CF6]/15 text-[#6D28D9] border-[#8B5CF6]/30', // Violet
  'bg-[#3B82F6]/15 text-[#1D4ED8] border-[#3B82F6]/30', // Blue
  'bg-[#F97316]/15 text-[#C2410C] border-[#F97316]/30', // Orange
];

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<IndiaMartReview[]>(indiamartReviewsData);
  const [likedReviews, setLikedReviews] = useState<{ [id: number]: boolean }>({});

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

  // Distribute all 75 IndiaMART reviews into 3 continuous moving columns
  const col1 = reviews.filter((_, i) => i % 3 === 0);
  const col2 = reviews.filter((_, i) => i % 3 === 1);
  const col3 = reviews.filter((_, i) => i % 3 === 2);

  // Render individual review card styled exactly like the user's reference screenshot
  const renderReviewCard = (review: IndiaMartReview) => {
    const isLiked = !!likedReviews[review.id];
    const colorScheme = avatarColorSchemes[review.id % avatarColorSchemes.length];

    return (
      <div
        key={`${review.id}`}
        className="bg-white rounded-2xl p-5 sm:p-6 border border-black/8 shadow-[0_4px_20px_rgba(45,35,24,0.04)] hover:shadow-[0_12px_32px_rgba(194,142,58,0.12)] transition-all duration-300 flex flex-col justify-between group relative select-text"
      >
        <div>
          {/* Header Row: Avatar + Name & Location + IndiaMART Logo Badge */}
          <div className="flex items-start justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-3 min-w-0">
              {/* Colorful Initials Avatar */}
              <div
                className={`w-11 h-11 rounded-full border flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${colorScheme}`}
              >
                {review.initials}
              </div>

              {/* Name + Verified Check + Date & City */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="font-bold text-sm sm:text-[15px] text-[#1A110A] truncate leading-tight">
                    {review.name}
                  </h4>
                  {review.verifiedBuyer && (
                    <span title="IndiaMART TrustSEAL Verified Buyer">
                      <CheckCircle2 size={15} className="text-[#00A699] shrink-0" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#5C4D3C]/75 flex items-center gap-1 mt-0.5 truncate">
                  <span className="font-medium">{review.date}</span>
                  <span className="opacity-40">•</span>
                  <MapPin size={11} className="text-[#C28E3A] shrink-0" />
                  <span className="truncate">{review.location}</span>
                </p>
              </div>
            </div>

            {/* IndiaMART Logo Icon (Clickable to verify live on official testimonial page) */}
            <a
              href="https://www.indiamart.com/tanviimpexnavimumbai/testimonial.html"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-1 rounded-lg bg-[#FAF8F5] hover:bg-[#FAF6EE] border border-black/5 hover:border-[#00A699]/40 transition-all"
              title="Verify on official IndiaMART page"
            >
              <img
                src="/indiamart-logo.webp"
                alt="IndiaMART Verified"
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </a>
          </div>

          {/* Review Body Text */}
          <p className="text-[13px] sm:text-sm text-[#2D2318] leading-relaxed mb-3.5 font-normal">
            "{review.text}"
          </p>

          {/* Product Tag & Quality/Delivery/Response Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF6EE] border border-[#C28E3A]/20 text-[11px] font-semibold text-[#8A5A32]">
              <Award size={12} className="text-[#C28E3A] shrink-0" />
              <span className="truncate">{review.product}</span>
            </span>

            {review.tags &&
              review.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0F5A3B]/8 text-[#0F5A3B] border border-[#0F5A3B]/20"
                >
                  <CheckCircle2 size={10} />
                  <span>{tag}</span>
                </span>
              ))}
          </div>
        </div>

        {/* Bottom Row: Golden Stars + Verify on IndiaMART Link + Helpful Button */}
        <div className="pt-3 border-t border-black/6 flex items-center justify-between gap-2">
          {/* Rating Stars (Golden ★★★★★) */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={15}
                className={`transition-transform duration-200 ${
                  i < review.rating
                    ? 'fill-[#F59E0B] text-[#F59E0B]'
                    : 'fill-black/10 text-black/10'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.indiamart.com/tanviimpexnavimumbai/testimonial.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#8A5A32] hover:text-[#00A699] hover:underline flex items-center gap-1 transition-colors"
              title={`Verify ${review.name}'s review live on IndiaMART`}
            >
              <span>Verify</span>
              <ExternalLink size={10} />
            </a>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleLike(review.id);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border cursor-pointer ${
                isLiked
                  ? 'bg-[#0F5A3B]/10 border-[#0F5A3B]/30 text-[#0F5A3B]'
                  : 'bg-[#FAF8F5] hover:bg-white border-black/8 text-[#5C4D3C]'
              }`}
              title="Helpful"
            >
              <ThumbsUp size={11} className={isLiked ? 'fill-[#0F5A3B]' : ''} />
              <span>{review.helpfulCount}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.a
            href="https://www.indiamart.com/tanviimpexnavimumbai/testimonial.html"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF6EE] hover:bg-[#F3EDE2] border border-[#C28E3A]/30 hover:border-[#00A699] text-[#8A5A32] hover:text-[#00A699] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs transition-all cursor-pointer group"
            title="Click to view and verify all live reviews on IndiaMART"
          >
            <img
              src="/indiamart-logo.webp"
              alt="IndiaMART"
              className="w-4 h-4 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <CheckCircle2 size={14} className="text-[#00A699]" />
            <span>IndiaMART TrustSEAL Verified Ratings (Verify Live ↗)</span>
          </motion.a>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D2318] font-bold tracking-tight mb-4"
          >
            IndiaMART Ratings &amp; Reviews
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
            Verified wholesale buyer feedback exclusively sourced from our official IndiaMART storefront. Direct ratings from commercial dry fruit buyers, wholesalers, and food manufacturers across India.
          </motion.p>
        </div>

        {/* Ratings Summary Card (Overall Rating | Rating Breakdown | User Satisfaction) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-black/6 shadow-[0_10px_35px_rgba(45,35,24,0.05)] mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between items-center">
            {/* 1. IndiaMART Overall Rating (4.3 / 5 & 69 Ratings) */}
            <div className="flex flex-col items-center justify-center min-w-[200px] text-center w-full lg:w-auto">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#8A5A32] mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#00A699]" />
                <span>IndiaMART Storefront</span>
              </span>
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

              <a
                href="https://www.indiamart.com/tanviimpexnavimumbai/testimonial.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-[#5C4D3C] hover:text-[#00A699] underline underline-offset-2 transition-colors flex items-center gap-1"
                title="Verify all 75 reviews on official IndiaMART testimonial page"
              >
                <span>75 IndiaMART Reviews (Verify Live)</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Vertical Divider 1 */}
            <div className="hidden lg:block w-px h-36 bg-black/8" />

            {/* 2. Interactive Rating Breakdown Bars */}
            <div className="flex-1 w-full max-w-md flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2D2318] mb-1">
                <span>Rating Breakdown</span>
              </div>

              {ratingBreakdown.map((row) => (
                <div
                  key={row.stars}
                  className="w-full flex items-center gap-3 text-xs text-[#5C4D3C] px-2 py-1 text-left"
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
                </div>
              ))}
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

        {/* 3 MOVING COLUMNS DISPLAY (INFINITE VERTICAL MARQUEE) */}
        <div className="relative h-[720px] overflow-hidden rounded-3xl bg-[#FAF8F5] border border-black/6 hover-pause">
          {/* Top Fade Gradient Mask */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent z-20 pointer-events-none" />

          {/* Bottom Fade Gradient Mask */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent z-20 pointer-events-none" />

          {/* 3 Animated Moving Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full px-4 sm:px-6">
            {/* Column 1 (Scrolls Upwards) */}
            <div className="overflow-hidden h-full">
              <div className="flex flex-col gap-5 animate-marquee-vertical-1">
                {col1.map((r) => renderReviewCard(r))}
                {/* Duplicate items for seamless continuous looping */}
                {col1.map((r) => renderReviewCard({ ...r, id: r.id + 1000 }))}
              </div>
            </div>

            {/* Column 2 (Scrolls Upwards with different timing) */}
            <div className="overflow-hidden h-full hidden md:block">
              <div className="flex flex-col gap-5 animate-marquee-vertical-2">
                {col2.map((r) => renderReviewCard(r))}
                {/* Duplicate items for seamless continuous looping */}
                {col2.map((r) => renderReviewCard({ ...r, id: r.id + 2000 }))}
              </div>
            </div>

            {/* Column 3 (Scrolls Upwards with third speed) */}
            <div className="overflow-hidden h-full hidden lg:block">
              <div className="flex flex-col gap-5 animate-marquee-vertical-3">
                {col3.map((r) => renderReviewCard(r))}
                {/* Duplicate items for seamless continuous looping */}
                {col3.map((r) => renderReviewCard({ ...r, id: r.id + 3000 }))}
              </div>
            </div>
          </div>
        </div>

        {/* Direct Wholesale Lead Conversion Funnel */}
        <div className="mt-14 rounded-3xl bg-gradient-to-br from-[#1A110A] to-[#2C1D12] border border-[#C28E3A]/30 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C28E3A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                Join Verified Wholesale Buyers Across 23 States
              </h4>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Direct orchard imports from California and Iran. Transparent APMC Vashi mandi wholesale rates with guaranteed freshness and fast dispatch. Minimum order starts from 15kg.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href="https://wa.me/918082111250?text=Hello%20Tanvi%20Impex%2C%20I%20am%20interested%20in%20placing%20a%20bulk%20wholesale%20order%20for%20dry%20fruits."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-lg transition-transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                <span>WhatsApp Wholesale Order</span>
              </a>

              <a
                href="https://www.indiamart.com/tanviimpexnavimumbai/testimonial.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-black font-bold text-sm tracking-wider uppercase border border-white/20 hover:border-transparent transition-all flex items-center justify-center gap-2"
              >
                <span>IndiaMART Storefront</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
