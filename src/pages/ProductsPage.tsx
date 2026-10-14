import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Footer } from '../components/Footer';
import { ShieldCheck, Phone, Store, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const pageTitle = categoryParam === 'almonds'
    ? 'Wholesale California Almonds Importer & Supplier | Tanvi Impex Mumbai'
    : categoryParam === 'pistachios'
    ? 'Wholesale Irani & California Pistachios Bulk Supplier | Tanvi Impex'
    : categoryParam === 'seeds'
    ? 'Wholesale Pumpkin, Sunflower & Chia Seeds Bulk Importer | Tanvi Impex'
    : 'Wholesale Dry Fruits & Nuts Bulk Catalog | Tanvi Impex APMC Navi Mumbai';

  const pageDescription = 'Explore Tanvi Impex wholesale dry fruits and nuts catalog. 15kg California Almond master boxes, 20kg Irani Pistachios, wholesale pumpkin, sunflower and chia seeds at APMC Navi Mumbai mandi rates.';

  return (
    <div className="min-h-screen bg-background text-[#2D2318] pt-20 md:pt-24">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={`https://www.tanviimpex.com/products${categoryParam ? `?category=${categoryParam}` : ''}`}
      />
      
      {/* Top Breadcrumb & Page Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-1">
        <h1 className="sr-only">Wholesale Dry Fruits, California Almonds, Irani Pistachios & Seeds Catalog</h1>
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-black/10 text-xs sm:text-sm text-black/60">
          <div className="flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#C28E3A] font-medium transition-colors">
              <ArrowLeft size={14} />
              Home
            </Link>
            <span>/</span>
            <span className="text-[#C28E3A] font-semibold">Products Catalog</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1 text-[#0F5A3B] font-semibold bg-[#0F5A3B]/10 px-3 py-1 rounded-full">
              <ShieldCheck size={14} />
              IndiaMART TrustSEAL Verified
            </span>
            <span className="hidden sm:inline text-black/40">|</span>
            <span className="hidden sm:inline font-mono">FSSAI: 11522998001006</span>
          </div>
        </div>
      </div>

      {/* Main Catalog View with Segregation and All Products */}
      <FeaturedProducts />

      {/* Bulk & Wholesale Inquiries Section */}
      <section className="py-16 md:py-24 bg-[#FAF7F2] relative overflow-hidden">
        {/* Subtle decorative background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C28E3A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1B140E] via-[#241A12] to-[#120C07] border border-[#C28E3A]/25 shadow-[0_25px_60px_-15px_rgba(45,35,24,0.35)] p-8 sm:p-12 md:p-14">
            
            {/* Background subtle radial auras */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#C28E3A]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#0F5A3B]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Headline & Value Propositions */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#C28E3A]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                  <Sparkles size={14} className="text-[#E5C158]" />
                  Direct Importer & Wholesale Desk
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-[1.15]">
                  Looking for <span className="text-[#E5C158]">15kg Bulk Boxes</span> or Custom Packing?
                </h3>

                <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                  Headquartered at APMC Market-1, Vashi, Tanvi Impex supplies 15kg master cartons, 20kg wholesale cases, bulk sacks up to 30kg, and custom commercial packaging to wholesalers, sweet manufacturers, and retail chains across 23 states.
                </p>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2.5 text-white/90 text-sm font-medium justify-center lg:justify-start">
                    <CheckCircle2 size={18} className="text-[#C28E3A] shrink-0" />
                    <span>Direct Port Sourcing</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white/90 text-sm font-medium justify-center lg:justify-start">
                    <CheckCircle2 size={18} className="text-[#C28E3A] shrink-0" />
                    <span>Pan-India Supply</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white/90 text-sm font-medium justify-center lg:justify-start">
                    <CheckCircle2 size={18} className="text-[#C28E3A] shrink-0" />
                    <span>APMC Mandi Rates</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-conversion Action Card */}
              <div className="lg:col-span-5 w-full">
                <div className="bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-2xl">
                  <div className="text-center sm:text-left mb-1">
                    <span className="text-xs uppercase tracking-wider text-[#E5C158] font-bold block mb-1">Commercial Desk</span>
                    <h4 className="text-xl font-bold text-white">Get Real-time Mandi Rates</h4>
                  </div>

                  {/* Primary WhatsApp CTA */}
                  <a
                    href="https://wa.me/918082111250?text=Hello%20Tanvi%20Impex%2C%20I%20am%20interested%20in%20bulk%20wholesale%20quotations%20for%20dry%20fruits."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold text-sm sm:text-base flex items-center justify-between shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                      <span>WhatsApp Wholesale Desk</span>
                    </span>
                    <span className="text-xs bg-black/20 px-2.5 py-1 rounded-md font-mono">Fast Reply</span>
                  </a>

                  {/* Secondary Phone & IndiaMART row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="tel:02249608280"
                      className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-[#C28E3A] text-white hover:text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/15 transition-all hover:border-transparent shadow-sm"
                    >
                      <Phone size={15} />
                      <span>Call Mandi Office</span>
                    </a>

                    <a
                      href="https://www.indiamart.com/tanviimpexnavimumbai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/15 transition-all hover:border-transparent shadow-sm"
                    >
                      <Store size={15} />
                      <span>IndiaMART Store</span>
                    </a>
                  </div>

                  <p className="text-center text-white/50 text-[11px] mt-1">
                    Direct warehouse billing • GST registered • APMC Market-1, Vashi
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
