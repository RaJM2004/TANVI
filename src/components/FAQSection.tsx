import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is the minimum order quantity for wholesale orders?",
    answer: "Our minimum order quantity varies by product but generally starts at 10kg for dry fruits and 5kg for premium spices. Please contact our sales team for product-specific details."
  },
  {
    question: "Do you deliver to all 23 states in India?",
    answer: "Yes! We have a robust logistics network that ensures safe and timely delivery across 23 states in India. We partner with reliable transport services to maintain product freshness during transit."
  },
  {
    question: "How do you ensure the quality of your dry fruits?",
    answer: "Quality is our top priority. All our products undergo strict quality checks at our facility in APMC Navi Mumbai. We source directly from trusted farms and ensure they meet our 100% pure guarantee before packaging."
  },
  {
    question: "Are your prices inclusive of GST?",
    answer: "The prices quoted for bulk/wholesale orders are generally exclusive of GST. The applicable GST rates (e.g., 5% or 12%) will be added to your final invoice depending on the product category."
  },
  {
    question: "Can I request product samples before placing a bulk order?",
    answer: "Yes, we encourage first-time buyers to request samples to verify the quality. A nominal fee is charged for the samples and shipping, which can be adjusted against your first bulk order."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C28E3A] text-sm font-bold uppercase tracking-[0.2em] mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">Frequently Asked Questions</h2>
          <div className="h-1 w-24 bg-[#C28E3A] mx-auto" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-black/10 rounded-2xl overflow-hidden bg-[#FDFDFD]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-black/[0.02] transition-colors"
              >
                <span className="font-bold text-black text-lg pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C28E3A]/10 flex items-center justify-center text-[#C28E3A]"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-black/60 leading-relaxed border-t border-black/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
