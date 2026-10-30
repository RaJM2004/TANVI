import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  directAnswer: string;
  detailAnswer: string;
}

const faqs: FAQItem[] = [
  {
    id: "official-wholesale-website",
    question: "Is there an official website to order wholesale from Tanvi Impex?",
    directAnswer: "Yes, Tanvi Impex operates an official online wholesale portal at tanviimpex.com/products where commercial buyers can view the product catalog, check packaging specifications, and request real-time wholesale quotations.",
    detailAnswer: "Wholesale orders and mandi rate requests can also be submitted directly via WhatsApp at +91 8082111250, by phone at our APMC Vashi desk (022 49608280), or via our verified IndiaMART TrustSEAL profile."
  },
  {
    id: "minimum-order-quantity",
    question: "What is the minimum order quantity for wholesale orders?",
    directAnswer: "The minimum order quantity at Tanvi Impex starts from 15kg, supplied exclusively in full commercial master cartons, boxes, and bulk sacks.",
    detailAnswer: "Our standard master packaging includes 15kg almond bags/boxes, 20kg pistachio cartons (1kg × 20 pouches), and 12.5kg to 25kg bulk sacks for seeds. Single retail pieces are not sold."
  },
  {
    id: "pan-india-delivery",
    question: "Do you deliver dry fruits to all states across India?",
    directAnswer: "Yes, Tanvi Impex delivers wholesale consignments to 23 states across India directly from our APMC Market-1 distribution hub in Vashi, Navi Mumbai.",
    detailAnswer: "We partner with trusted cold-chain and dry freight logistics providers to ensure product crunch, freshness, and quality are preserved throughout transit."
  },
  {
    id: "quality-standards",
    question: "How does Tanvi Impex ensure dry fruit quality and grading?",
    directAnswer: "All dry fruits undergo multi-stage quality grading, optical sorting, and moisture checks under FSSAI License No. 11522998001006 at our APMC Vashi warehousing facility.",
    detailAnswer: "We source directly from certified partner orchards in California (USA) and Iran through JNPT (Nhava Sheva) port, ensuring 100% natural and unadulterated product lines."
  },
  {
    id: "gst-wholesale-prices",
    question: "Are Tanvi Impex wholesale prices inclusive of GST?",
    directAnswer: "No, wholesale mandi quotations provided by Tanvi Impex are exclusive of statutory GST, which is itemized separately on the final tax invoice.",
    detailAnswer: "Applicable statutory GST rates (typically 5% or 12% depending on the specific dry fruit or seed category) are clearly itemized on our official business invoices."
  },
  {
    id: "sample-requests",
    question: "Can commercial buyers request product samples before placing bulk orders?",
    directAnswer: "Yes, verified commercial buyers, sweet manufacturers, and retail distributors can request product samples to evaluate grade, count, and crunch before booking bulk consignments.",
    detailAnswer: "Contact our wholesale sales desk via phone or WhatsApp at +91 8082111250 with your business name and delivery location to arrange sample shipments."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white" id="faq" aria-labelledby="faq-section-title">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C28E3A] text-sm font-bold uppercase tracking-[0.2em] mb-4">Direct Answers &amp; Guidance</p>
          <h2 id="faq-section-title" className="text-4xl md:text-5xl font-serif text-black mb-6">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-24 bg-[#C28E3A] mx-auto" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="border border-black/10 rounded-2xl overflow-hidden bg-[#FDFDFD]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={`faq-btn-${faq.id}`}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-black/[0.02] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C28E3A]"
                >
                  <h3 id={headingId} className="font-bold text-black text-lg pr-8 font-sans">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C28E3A]/10 flex items-center justify-center text-[#C28E3A]"
                    aria-hidden="true"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-black/75 leading-relaxed border-t border-black/5 pt-4 text-sm sm:text-base space-y-2">
                        {/* Direct Answer for Featured Snippets / AI Overviews / Voice Engine */}
                        <p className="font-semibold text-[#1A110A] leading-relaxed">
                          {faq.directAnswer}
                        </p>
                        <p className="text-black/65 font-normal">
                          {faq.detailAnswer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
