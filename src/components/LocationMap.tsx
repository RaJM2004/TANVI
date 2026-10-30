import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Phone, Clock, Star } from 'lucide-react';

export const LocationMap: React.FC = () => {
  const googleMapsUrl = "https://www.google.com/maps/place/TANVI+IMPEX/@19.0749001,73.0068883,16z/data=!4m6!3m5!1s0x3be7c15075af2b81:0xcd69493888961ae2!8m2!3d19.0749001!4d73.0068883";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=TANVI+IMPEX+APMC+Market-1+Vashi+Navi+Mumbai&destination_place_id=ChIJgSuvdVDh5zsR4hqWiDhJad8";

  return (
    <section className="py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden" id="location">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C28E3A]/30 text-[#C28E3A] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <MapPin size={14} className="text-[#C28E3A]" />
            APMC Vashi Depot & Trading Floor
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D2318] mb-4 tracking-tight"
          >
            Visit Our Headquarters
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#2D2318]/70 text-base md:text-lg leading-relaxed font-light"
          >
            Conveniently located at APMC Market, Turbhe, Vashi — the epicenter of India’s premier spice and dry fruit wholesale commerce.
          </motion.p>
        </div>

        {/* Map Container with Embedded Iframe & Interactive Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[520px] md:h-[580px] rounded-[2.5rem] overflow-hidden border border-black/10 shadow-[0_20px_50px_rgba(45,35,24,0.1)] bg-white"
        >
          {/* Real Google Maps Embed Iframe */}
          <iframe
            title="Tanvi Impex TANVI IMPEX - Exact Google Maps Location"
            src="https://maps.google.com/maps?q=19.0749001,73.0068883(TANVI%20IMPEX)&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[15%] contrast-[1.05]"
          />

          {/* Floating Google Maps Location Card (Styled exactly like the reference) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 max-w-[340px] sm:max-w-[380px] w-[calc(100%-2rem)] sm:w-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.18)] border border-black/10">

              {/* Header with Title & Action Icons */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2D2318] leading-tight">
                    Tanvi Impex
                  </h3>
                  <span className="text-[11px] font-semibold text-[#C28E3A] uppercase tracking-wider block mt-0.5">
                    H - 33 • APMC Market - 1
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in Google Maps"
                    className="w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#C28E3A] hover:text-white text-[#2D2318] flex items-center justify-center transition-colors shadow-sm"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Get Directions"
                    className="w-9 h-9 rounded-full bg-[#1A73E8] hover:bg-[#1557b0] text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Navigation size={16} />
                  </a>
                </div>
              </div>

              {/* Exact Address */}
              <p className="text-xs sm:text-[13px] text-black/75 leading-relaxed mb-3">
                H-33 APMC Market-1, Phase-2, Sector-19, Vashi, Navi Mumbai, Maharashtra 400705, India
              </p>

              {/* Star Rating Badge (IndiaMART Verified) */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-black/5 text-xs">
                <span className="font-bold text-black">4.3</span>
                <div className="flex items-center gap-0.5 text-[#F4B400]">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={13} fill="#F4B400" className="text-[#F4B400]" />
                  ))}
                  <div className="relative inline-block w-[13px] h-[13px]">
                    <Star size={13} fill="rgba(0,0,0,0.12)" className="text-black/10" />
                    <div className="absolute inset-0 overflow-hidden w-[30%]">
                      <Star size={13} fill="#F4B400" className="text-[#F4B400]" />
                    </div>
                  </div>
                </div>
                <a
                  href="https://www.indiamart.com/tanviimpexnavimumbai/testimonial.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 hover:text-[#00A699] font-semibold flex items-center gap-1 transition-colors"
                  title="Verify all ratings live on official IndiaMART testimonial page"
                >
                  <span>(75 IndiaMART Reviews)</span>
                </a>
              </div>

              {/* Quick Info & Working Hours */}
              <div className="space-y-1.5 text-xs text-black/70 mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#C28E3A] shrink-0" />
                  <span>Mon – Sat: <strong>9:30 AM – 7:30 PM</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#C28E3A] shrink-0" />
                  <a href="tel:02249608280" className="hover:text-[#C28E3A] font-semibold">
                    022 4960 8280
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#1A73E8] hover:bg-[#1557b0] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors text-center"
                >
                  <Navigation size={14} />
                  <span>Get Directions</span>
                </a>
                <a
                  href="tel:02249608280"
                  className="py-2.5 px-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#2D2318] text-[#2D2318] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-black/10 transition-colors"
                >
                  <Phone size={14} />
                  <span>Call Desk</span>
                </a>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
