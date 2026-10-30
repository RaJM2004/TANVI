import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Phone, MapPin, MessageSquare, Package, AlertCircle } from 'lucide-react';

export interface ProductPackagingInfo {
  totalWeight: string;
  masterType: string;
  packFormula?: string;
  innerPackDetail?: string;
  badge: string;
  wholesaleOnlyNotice: string;
}

export interface ProductInfo {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  packaging?: ProductPackagingInfo;
}

interface QuoteModalProps {
  product: ProductInfo | null;
  onClose: () => void;
}

export const QuoteModal = ({ product, onClose }: QuoteModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanTitle = product.title.replace('\n', ' ');
    const whatsappNumber = '918082111250';

    const textLines = [
      `*New Wholesale Quote Request - Tanvi Impex*`,
      `----------------------------------------`,
      `*Product:* ${cleanTitle}`,
      product.packaging ? `*Bulk Master Packaging:* ${product.packaging.masterType}` : null,
      product.packaging?.packFormula ? `*Pack Breakdown:* ${product.packaging.packFormula}` : null,
      `*Supply Type:* Wholesale Bulk (Master Pack Only - Single Pieces Not Sold)`,
      `*Name / Company:* ${name.trim() || 'Not specified'}`,
      `*Phone / WhatsApp:* ${phone.trim() || 'Not specified'}`,
      location.trim() ? `*Delivery Location:* ${location.trim()}` : null,
      message.trim() ? `*Quantity / Requirements:* ${message.trim()}` : null,
      `----------------------------------------`,
      `Sent via Tanvi Impex Website`,
    ].filter(Boolean);

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      textLines.join('\n')
    )}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#1a110a] text-white border border-[#C28E3A]/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Top Decorative Header */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#2a1c12] to-[#1a110a] border-b border-white/10">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#C28E3A]/40 shadow-md shrink-0 bg-black/40">
                <img
                  src={product.image}
                  alt={product.title.replace('\n', ' ')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#C28E3A]/20 text-[#E5C158] border border-[#C28E3A]/40 rounded-full">
                    {product.packaging?.badge || product.tag}
                  </span>
                  {product.packaging?.totalWeight && (
                    <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-white/90 bg-white/10 rounded-full">
                      {product.packaging.totalWeight} Master
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white leading-tight truncate">
                  {product.title.replace('\n', ' ')}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-0.5">
                  {product.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4" name="wholesale_quote_form" id="wholesale-quote-form">
            {/* Wholesale Packaging Specification Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#C28E3A]/15 to-[#0F5A3B]/15 border border-[#C28E3A]/30 text-xs">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[#E5C158] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#E5C158]" />
                  Bulk Packaging:
                </span>
                <span className="font-mono font-extrabold text-white bg-black/40 px-2 py-0.5 rounded text-[11px]">
                  {product.packaging?.totalWeight || 'Wholesale Lot'}
                </span>
              </div>
              <p className="text-white/90 font-medium text-xs">
                {product.packaging?.packFormula 
                  ? `${product.packaging.masterType} (${product.packaging.packFormula})`
                  : product.packaging?.masterType || 'Standard Bulk Master Packaging'}
              </p>
              {product.packaging?.innerPackDetail && (
                <p className="text-[11px] text-white/70 italic mt-0.5">
                  {product.packaging.innerPackDetail}
                </p>
              )}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#F3B770] font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#F3B770]" />
                <span>Wholesale Only: Minimum Order Starts from 15kg • Sold in Full Master Packs</span>
              </div>
            </div>
            <div>
              <label htmlFor="quote-buyer-name" className="block text-xs font-bold uppercase tracking-wider text-[#C28E3A] mb-1.5">
                Your Name / Business Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="quote-buyer-name"
                  name="buyer_name"
                  autoComplete="name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel / ABC Enterprises"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#C28E3A] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-buyer-phone" className="block text-xs font-bold uppercase tracking-wider text-[#C28E3A] mb-1.5">
                WhatsApp / Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="quote-buyer-phone"
                  name="buyer_phone"
                  autoComplete="tel"
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#C28E3A] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-buyer-location" className="block text-xs font-bold uppercase tracking-wider text-[#C28E3A] mb-1.5">
                Delivery Location (City / State)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="quote-buyer-location"
                  name="delivery_location"
                  autoComplete="address-level2"
                  type="text"
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#C28E3A] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-buyer-message" className="block text-xs font-bold uppercase tracking-wider text-[#C28E3A] mb-1.5">
                Special Requirement / Notes (Optional)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" aria-hidden="true" />
                <textarea
                  id="quote-buyer-message"
                  name="special_requirements"
                  rows={2}
                  placeholder="Any packaging or delivery timeline instructions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#C28E3A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6e] text-white font-bold rounded-2xl text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              <span>Send Quote Request to WhatsApp</span>
              <Send className="w-4 h-4" />
            </motion.button>
            <p className="text-center text-[11px] text-white/40 mt-2">
              Opens WhatsApp directly with your pre-filled inquiry to Tanvi Impex.
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
