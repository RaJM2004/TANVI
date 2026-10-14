
import { useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, CheckCircle, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!columnsRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered column reveal
      const columns = columnsRef.current?.children;
      if (columns) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: columnsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, columnsRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, #C28E3A 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #C28E3A 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img 
              src="/Tanvi%20Impex%20Dry%20Fruits%20Logo.png" 
              alt="Tanvi Impex Dry Fruits Logo" 
              className="h-11 w-auto mb-6 object-contain" 
            />
            <p className="text-white/60 mb-6 leading-relaxed">
              Premium dry fruits and spices, sourced with uncompromising quality standards for a healthier world.
            </p>
            <div className="flex gap-4">
              <a href="https://www.indiamart.com/tanviimpexnavimumbai/" target="_blank" rel="noopener noreferrer" title="View IndiaMart Profile" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C28E3A] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(194,142,58,0.3)]">
                <Store size={18} />
              </a>
              <a href="https://wa.me/918082111250?text=Hello%20Tanvi%20Impex%2C%20I%20am%20interested%20in%20your%20wholesale%20products.%20Please%20share%20more%20details." target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" /></svg>
              </a>
              <a href="mailto:accounts@tanviimpex.com" title="Send Email" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C28E3A] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(194,142,58,0.3)]">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide text-[#C28E3A]">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="/#about" className="hover:text-white transition-colors animated-underline">Our Story</a></li>
              <li><Link to="/products" className="hover:text-white transition-colors animated-underline">Products Catalog</Link></li>
              <li><a href="/#quality" className="hover:text-white transition-colors animated-underline">Quality Promise</a></li>
              <li><a href="/#infrastructure" className="hover:text-white transition-colors animated-underline">Infrastructure</a></li>
              <li><a href="/#reviews" className="hover:text-white transition-colors animated-underline">Client Reviews</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide text-[#C28E3A]">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex gap-3">
                <MapPin size={20} className="shrink-0 text-[#C28E3A]" />
                <span>H-33, APMC Market-1, Phase-2, Sector-19, Vashi, Navi Mumbai 400705</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="shrink-0 text-[#C28E3A]" />
                <span>IndiaMart TrustSEAL Verified</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="shrink-0 text-[#C28E3A]" />
                <span>GST: 27AAPFT0162R1ZG</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="shrink-0 text-[#C28E3A]" />
                <span>FSSAI: 11522998001006</span>
              </li>
              <li className="mt-4 pt-4 border-t border-white/10">
                <a href="tel:02249608280" className="flex gap-3 items-center group hover:text-[#C28E3A] transition-colors w-fit">
                  <Phone size={20} className="shrink-0 text-[#C28E3A] group-hover:scale-110 transition-transform" />
                  <span className="font-medium underline decoration-[#C28E3A]/30 underline-offset-4 group-hover:decoration-[#C28E3A]">02249608280</span>
                </a>
              </li>
              <li className="mt-4">
                <a
                  href="https://wa.me/918082111250?text=Hello%20Tanvi%20Impex%2C%20I%20am%20interested%20in%20your%20wholesale%20products.%20Please%20share%20more%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center group hover:text-[#25D366] transition-colors w-fit"
                >
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366] transition-colors shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-[#25D366] group-hover:text-white transition-colors">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" /></svg>
                  </div>
                  <span className="font-bold underline decoration-[#25D366]/30 underline-offset-4 group-hover:decoration-[#25D366]">Chat on WhatsApp</span>
                </a>
              </li>
              <li className="mt-4 pt-4 border-t border-white/10">
                <a href="mailto:accounts@tanviimpex.com" className="flex gap-3 items-center group hover:text-[#C28E3A] transition-colors w-fit">
                  <Mail size={20} className="shrink-0 text-[#C28E3A] group-hover:scale-110 transition-transform" />
                  <span className="font-medium underline decoration-[#C28E3A]/30 underline-offset-4 group-hover:decoration-[#C28E3A]">accounts@tanviimpex.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif tracking-wide text-[#C28E3A]">Newsletter</h4>
            <p className="text-white/60 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 px-4 py-3 rounded-l-lg w-full focus:outline-none focus:border-[#C28E3A] text-white transition-colors duration-300"
              />
              <button className="subscribe-btn bg-[#C28E3A] text-white px-6 py-3 rounded-r-lg font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-colors relative overflow-hidden group">
                <span className="relative z-10">Subscribe</span>
                {/* Ripple effect container */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white transition-transform duration-500" />
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
          <p>&copy; 2019 - {new Date().getFullYear()} Tanvi Impex. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors animated-underline">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors animated-underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
