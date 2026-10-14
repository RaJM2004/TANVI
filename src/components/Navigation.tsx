import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/', isPage: true },
  { name: 'Products', path: '/products', isPage: true },
  { name: 'Our Story', path: '/#about', hash: '#about' },
  { name: 'Quality', path: '/#quality', hash: '#quality' },
  { name: 'Infrastructure', path: '/#infrastructure', hash: '#infrastructure' },
  { name: 'Reviews', path: '/#reviews', hash: '#reviews' },
];

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    setIsOpen(false);

    if (link.isPage) {
      if (location.pathname === link.path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(link.path);
      }
      return;
    }

    // Section anchor link
    if (location.pathname === '/') {
      if (link.hash) {
        const element = document.querySelector(link.hash);
        if (element) {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    } else {
      navigate(link.path);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-700 px-4 sm:px-6 pointer-events-none ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div 
        className={`w-full max-w-7xl flex items-center justify-between transition-all duration-700 pointer-events-auto rounded-[2rem] ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border border-white/50 px-6 py-3' 
            : 'bg-white/50 backdrop-blur-md shadow-sm border border-white/30 px-6 py-3'
        }`}
      >
        {/* Logo */}
        <motion.div 
          className="flex-shrink-0 z-50 relative group cursor-pointer" 
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            id="navbar-logo"
            src="/Tanvi%20Impex%20Dry%20Fruits%20Logo.png" 
            alt="Tanvi Impex Dry Fruits Logo" 
            className="h-9 md:h-11 w-auto object-contain"
          />
        </motion.div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center relative gap-2">
          {navLinks.map((link, index) => {
            const isCurrentPage = link.isPage && location.pathname === link.path;

            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-5 py-2 text-sm font-bold transition-colors z-10 ${
                  isCurrentPage ? 'text-[#C28E3A]' : 'text-gray-900 hover:text-[#C28E3A]'
                }`}
              >
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {isCurrentPage && hoveredIndex !== index && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C28E3A] rounded-full" />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Section: Contacts & CTA */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-4">
            <motion.a 
              href="tel:02249608280" 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 hover:text-[#C28E3A] hover:shadow-md transition-all border border-gray-100" 
              title="Call Us"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/__tanviimpex__/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 hover:text-[#E1306C] hover:shadow-md transition-all border border-gray-100" 
              title="Follow us on Instagram (@__tanviimpex__)"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
            <motion.a 
              href="mailto:accounts@tanviimpex.com" 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 hover:text-[#C28E3A] hover:shadow-md transition-all border border-gray-100" 
              title="Email Us"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={18} />
            </motion.a>
          </div>

          <motion.a
            href="https://wa.me/918082111250"
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden inline-flex items-center justify-center px-7 py-3 text-sm font-bold bg-gray-900 text-white rounded-full shadow-md"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C28E3A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              Chat with Us
              <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.a>
        </div>
        
        {/* Mobile menu toggle */}
        <motion.button 
          className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm z-50 text-black"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-5 h-5 flex flex-col justify-center gap-[5px]">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} 
              className="block h-[2px] w-full bg-current rounded-full origin-center" 
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }} 
              className="block h-[2px] w-full bg-current rounded-full" 
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} 
              className="block h-[2px] w-full bg-current rounded-full origin-center" 
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(10px)' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute top-[88px] left-4 right-4 md:hidden pointer-events-auto bg-white/95 backdrop-blur-3xl rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden"
          >
            <div className="p-7 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isCurrentPage = link.isPage && location.pathname === link.path;

                return (
                  <motion.a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
                    className={`font-bold text-[1.4rem] py-3.5 border-b border-black/5 hover:translate-x-2 transition-all duration-300 flex items-center justify-between ${
                      isCurrentPage ? 'text-[#C28E3A]' : 'text-gray-900 hover:text-[#C28E3A]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isCurrentPage && <span className="text-xs bg-[#C28E3A]/10 text-[#C28E3A] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">Active</span>}
                  </motion.a>
                );
              })}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="flex justify-around py-5 bg-gray-50/80 rounded-2xl border border-black/5">
                  <motion.a whileTap={{ scale: 0.95 }} href="tel:02249608280" className="flex flex-col items-center gap-2.5 text-sm font-semibold text-gray-700">
                    <div className="p-3.5 bg-white rounded-full shadow-sm text-black"><Phone size={20} /></div>
                    Call Us
                  </motion.a>
                  <motion.a whileTap={{ scale: 0.95 }} href="mailto:accounts@tanviimpex.com" className="flex flex-col items-center gap-2.5 text-sm font-semibold text-gray-700">
                    <div className="p-3.5 bg-white rounded-full shadow-sm text-black"><Mail size={20} /></div>
                    Email Us
                  </motion.a>
                </div>
                <motion.a
                  href="https://wa.me/918082111250"
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4.5 font-bold text-lg bg-gradient-to-r from-[#C28E3A] to-[#D4AF37] hover:from-[#b07f32] hover:to-[#bfa132] text-white rounded-2xl text-center shadow-[0_8px_20px_-6px_rgba(194,142,58,0.5)] transition-all"
                >
                  Chat on WhatsApp
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
