
import { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle, Store, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newsletterEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please enter a valid email address.');
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/accounts@tanviimpex.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          _subject: `New Newsletter Subscription - ${cleanEmail}`,
          _template: 'table',
          _captcha: 'false',
          subscriber_email: cleanEmail,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          note: 'Subscriber entered their email in the Tanvi Impex website footer newsletter form.',
        }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterMessage('Thank you for subscribing! We will keep you updated.');
        setNewsletterEmail('');
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setNewsletterStatus('error');
      setNewsletterMessage('Could not submit automatically. Please click below to email us:');
    }
  };

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
              <a href="https://www.instagram.com/__tanviimpex__/" target="_blank" rel="noopener noreferrer" title="Follow on Instagram (@__tanviimpex__)" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(220,39,67,0.4)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
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
                <a 
                  href="https://www.indiamart.com/tanviimpexnavimumbai/profile.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#C28E3A] underline decoration-[#C28E3A]/40 transition-colors"
                >
                  IndiaMart TrustSEAL Verified
                </a>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="shrink-0 text-[#C28E3A]" />
                <span>CEO: Bhushan Gajra</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="shrink-0 text-[#C28E3A]" />
                <span>GSTIN: 27AAPFT0162R1ZG</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="shrink-0 text-[#C28E3A]" />
                <span>FSSAI: 11522998001006</span>
              </li>
              <li className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.indiamart.com/tanviimpexnavimumbai/profile.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-white/20 transition-transform hover:scale-105"
                  title="Verify IndiaMART TrustSEAL Certificate"
                >
                  <img
                    src="/indiamart-logo.webp"
                    alt="IndiaMART"
                    className="h-5 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-[11px] font-bold text-gray-800">
                    <span className="text-[#2E3192]">india<span className="text-[#00A699]">mart</span></span>
                    <span className="text-[#00A699] ml-1">TrustSEAL</span>
                  </span>
                </a>
                <div
                  className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-white/20 transition-transform hover:scale-105"
                  title="FSSAI Food Safety Certified License No. 11522998001006"
                >
                  <img
                    src="/fssai-logo.webp"
                    alt="FSSAI License 11522998001006"
                    className="h-5 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-[10px] font-mono font-bold text-gray-800">
                    11522998001006
                  </span>
                </div>
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
            <p className="text-white/60 mb-4">Subscribe to receive updates, access to exclusive wholesale deals, and more.</p>

            {newsletterStatus === 'success' ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 text-emerald-300">
                <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>Subscribed Successfully!</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-3">
                  Thank you for subscribing. We will send wholesale updates & exclusive deals to your inbox.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setNewsletterStatus('idle');
                    setNewsletterMessage('');
                  }}
                  className="text-xs text-[#C28E3A] hover:underline hover:text-white transition-colors"
                >
                  Subscribe another email &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'error') setNewsletterStatus('idle');
                    }}
                    placeholder="Enter your email"
                    disabled={newsletterStatus === 'loading'}
                    className="bg-white/5 border border-white/10 px-4 py-3 rounded-l-lg w-full focus:outline-none focus:border-[#C28E3A] text-white placeholder-white/40 transition-colors duration-300 disabled:opacity-50 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="subscribe-btn bg-[#C28E3A] text-white px-5 py-3 rounded-r-lg font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-colors relative overflow-hidden group shrink-0 flex items-center justify-center min-w-[100px] disabled:opacity-75"
                  >
                    {newsletterStatus === 'loading' ? (
                      <Loader2 size={16} className="animate-spin text-white" />
                    ) : (
                      <>
                        <span className="relative z-10">Subscribe</span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white transition-transform duration-500" />
                      </>
                    )}
                  </button>
                </div>

                {newsletterStatus === 'error' && (
                  <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-red-400 font-medium">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{newsletterMessage}</span>
                    </div>
                    <a
                      href={`mailto:accounts@tanviimpex.com?subject=Newsletter%20Subscription&body=Please%20add%20my%20email%20to%20the%20Tanvi%20Impex%20newsletter%3A%20${encodeURIComponent(
                        newsletterEmail
                      )}`}
                      className="inline-block text-[#C28E3A] hover:underline font-semibold"
                    >
                      Click here to email accounts@tanviimpex.com directly
                    </a>
                  </div>
                )}
                <p className="text-[11px] text-white/40">
                  Submissions are sent directly to accounts@tanviimpex.com
                </p>
              </form>
            )}
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
