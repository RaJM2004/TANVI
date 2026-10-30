import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle2, Building, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2318] pt-24 sm:pt-28">
      <SEO
        title="Terms of Wholesale Service | Tanvi Impex Mumbai"
        description="Official commercial terms of service for wholesale dry fruits, California almonds, and seeds orders at Tanvi Impex. Review 15kg MOQ, APMC mandi rates, GST compliance, and dispatch guidelines."
        canonical="https://www.tanviimpex.com/terms-of-service"
      />

      {/* Breadcrumb Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 py-3 border-b border-black/10 text-xs sm:text-sm text-black/60">
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#C28E3A] font-medium transition-colors">
            <ArrowLeft size={14} />
            Home
          </Link>
          <span>/</span>
          <span className="text-[#C28E3A] font-semibold">Terms of Service</span>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-black/8 shadow-[0_10px_35px_rgba(45,35,24,0.05)]">
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#C28E3A]/10 text-[#8A5A32] flex items-center justify-center shrink-0">
              <FileText size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2D2318] tracking-tight">
                Terms of Wholesale Service
              </h1>
              <p className="text-xs sm:text-sm text-[#5C4D3C]/70 mt-1">
                Last Updated: October 30, 2026 • Governing Business Law: Indian Commercial Code
              </p>
            </div>
          </div>

          <div className="h-1 w-20 bg-gradient-to-r from-[#C28E3A] to-[#E5C158] rounded-full mb-8" />

          {/* Legal Entity Grounding Box */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C28E3A]/20 mb-8 space-y-2 text-xs sm:text-sm text-[#5C4D3C]">
            <p className="font-bold text-[#2D2318] flex items-center gap-1.5">
              <Building size={16} className="text-[#C28E3A]" />
              <span>Tanvi Impex — Wholesale Mandi Terms of Engagement</span>
            </p>
            <p>
              By requesting commercial wholesale quotations, placing purchase orders, or taking delivery of dry fruit and seed consignments, commercial buyers acknowledge and agree to these Terms of Wholesale Service.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1 font-mono text-xs">
              <span><strong>GSTIN:</strong> 27AAPFT0162R1ZG</span>
              <span><strong>FSSAI License:</strong> 11522998001006</span>
              <span><strong>LEI:</strong> 335800VW64XCC6IOKK11</span>
            </div>
          </div>

          {/* Terms Articles */}
          <div className="space-y-8 text-sm sm:text-base text-[#2D2318] leading-relaxed">
            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>1. B2B Wholesale Scope &amp; 15kg Minimum Order Quantity (MOQ)</span>
              </h2>
              <div className="space-y-2 text-[#5C4D3C]">
                <p>
                  Tanvi Impex operates strictly as an institutional B2B wholesale importer and mandi distributor. We cater exclusively to commercial re-sellers, regional dry fruit distributors, confectioners, bakeries, food processing plants, and institutional procurement desks.
                </p>
                <div className="p-3.5 rounded-xl bg-[#0F5A3B]/5 border border-[#0F5A3B]/20 text-xs sm:text-sm font-medium text-[#0F5A3B] flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Wholesale Minimum:</strong> Minimum order quantities start strictly from <strong>15kg</strong>. All products are supplied exclusively in sealed commercial master packaging (e.g., 15kg almond bags/boxes, 20kg pistachio cartons, and 25kg bulk sacks). Single retail consumer units are not sold.
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>2. Pricing, Mandi Rates &amp; Statutory GST</span>
              </h2>
              <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-[#5C4D3C]">
                <li><strong>Dynamic Mandi Rates:</strong> All quotations reflect real-time APMC Vashi wholesale commodity rates, valid for the specific trading day or quotation validity window.</li>
                <li><strong>GST Invoicing:</strong> Stated rates are exclusive of statutory GST unless explicitly stated otherwise. Official GST tax invoices (itemizing 5% or 12% GST as applicable under Indian HSN classifications) are issued for 100% of commercial transactions.</li>
                <li><strong>Payment Terms:</strong> Confirmed commercial payment terms apply prior to consignment release from our APMC Vashi warehouse or JNPT container port staging area.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>3. Direct Import Origin &amp; Quality Certification</span>
              </h2>
              <p className="text-[#5C4D3C] mb-2">
                Consignments are directly imported from certified grower orchards:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-[#5C4D3C]">
                <li><strong>California Almonds:</strong> Central Valley, California, USA (Grade AAA Nonpareil, Carmel, and Independent varieties).</li>
                <li><strong>Irani Pistachios:</strong> Direct orchard consignments from Iran (Jumbo Kalleh Ghouchi, Long Akbari, and Round Fandoghi grades).</li>
                <li><strong>Walnuts &amp; Seeds:</strong> In-shell Chilean walnuts (25kg bags) and Grade AAA pumpkin, sunflower, and chia seeds.</li>
              </ul>
              <p className="text-[#5C4D3C] text-xs pt-1">
                All lots are warehoused and dispatched under FSSAI License No. 11522998001006 with strict cold-chain moisture and temperature standards.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>4. Pan-India Delivery &amp; Inspection Policy</span>
              </h2>
              <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-[#5C4D3C]">
                <li><strong>Logistics Network:</strong> Consignments are dispatched across 23 Indian states via verified freight carriers, scheduled transport lines, and refrigerated containers.</li>
                <li><strong>Receiving Inspection:</strong> Commercial buyers are required to inspect packaging seals and count cartons upon delivery. Any transit damage or outer seal discrepancy must be documented on the consignment note (LR) and reported to our administrative desk within 24 hours of delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>5. Governing Law &amp; Legal Jurisdiction</span>
              </h2>
              <p className="text-[#5C4D3C]">
                All commercial agreements, purchase orders, quotations, and disputes arising out of wholesale trade with Tanvi Impex shall be governed exclusively by the laws of India and subject to the exclusive jurisdiction of competent courts in Thane / Navi Mumbai, Maharashtra.
              </p>
            </section>

            <section className="pt-4 border-t border-black/8">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3">
                6. Commercial Inquiries &amp; Trading Desk
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/6">
                  <Mail size={16} className="text-[#C28E3A] mb-1.5" />
                  <p className="font-bold text-[#2D2318]">Commercial Desk</p>
                  <a href="mailto:accounts@tanviimpex.com" className="text-[#0F5A3B] underline font-medium">
                    accounts@tanviimpex.com
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/6">
                  <Phone size={16} className="text-[#C28E3A] mb-1.5" />
                  <p className="font-bold text-[#2D2318]">Trading Desk</p>
                  <a href="tel:02249608280" className="text-[#0F5A3B] underline font-medium">
                    022 49608280
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/6">
                  <MapPin size={16} className="text-[#C28E3A] mb-1.5" />
                  <p className="font-bold text-[#2D2318]">APMC Depot</p>
                  <p className="text-[#5C4D3C] text-[11px] leading-tight">
                    H-33, APMC Market-1, Vashi, Navi Mumbai 400703
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
