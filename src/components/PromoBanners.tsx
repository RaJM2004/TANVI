import { motion } from 'framer-motion';

export const PromoBanners = () => {
  return (
    <section className="w-full bg-[#1A1A1A] py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.05]" 
        style={{ backgroundImage: 'radial-gradient(circle at center, #C28E3A 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Side */}
        <div className="flex-1 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C28E3A] font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            Special Offer
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight"
          >
            Premium California Almonds
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg mb-8 max-w-lg mx-auto md:mx-0"
          >
            Directly sourced, freshly packed. Get the best wholesale rates on jumbo almonds this season.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="px-8 py-4 bg-[#C28E3A] text-white font-bold uppercase tracking-wider text-sm rounded-full hover:bg-white hover:text-black transition-colors duration-300"
          >
            Shop Now
          </motion.button>
        </div>

        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 relative"
        >
          <div className="relative w-full max-w-md mx-auto aspect-square bg-[#C28E3A]/10 rounded-full flex items-center justify-center p-8">
            <img 
              src="/hero1.png" 
              alt="Premium Almonds" 
              className="w-full h-full object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500"
            />
            {/* Price Tag */}
            <div className="absolute top-10 right-10 bg-white text-[#2D2318] w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl rotate-12">
              <span className="text-xs font-bold uppercase tracking-wider">From</span>
              <span className="text-xl font-black">₹650</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
