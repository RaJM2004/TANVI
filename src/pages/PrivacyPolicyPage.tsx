import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CheckCircle2, Building, Mail, Phone, MapPin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2318] pt-24 sm:pt-28">
      <SEO
        title="Privacy Policy | Tanvi Impex Wholesale Dry Fruits Mumbai"
        description="Official Privacy Policy for Tanvi Impex. Learn how we handle B2B wholesale client data, quotations, GST invoicing, and customer privacy under Indian commercial regulations."
        canonical="https://www.tanviimpex.com/privacy-policy"
      />

      {/* Breadcrumb Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 py-3 border-b border-black/10 text-xs sm:text-sm text-black/60">
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#C28E3A] font-medium transition-colors">
            <ArrowLeft size={14} />
            Home
          </Link>
          <span>/</span>
          <span className="text-[#C28E3A] font-semibold">Privacy Policy</span>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-black/8 shadow-[0_10px_35px_rgba(45,35,24,0.05)]">
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#0F5A3B]/10 text-[#0F5A3B] flex items-center justify-center shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2D2318] tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-[#5C4D3C]/70 mt-1">
                Last Updated: October 30, 2026 • Effective Date: January 1, 2019
              </p>
            </div>
          </div>

          <div className="h-1 w-20 bg-gradient-to-r from-[#C28E3A] to-[#E5C158] rounded-full mb-8" />

          {/* Legal Entity Grounding Box */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C28E3A]/20 mb-8 space-y-2 text-xs sm:text-sm text-[#5C4D3C]">
            <p className="font-bold text-[#2D2318] flex items-center gap-1.5">
              <Building size={16} className="text-[#C28E3A]" />
              <span>Tanvi Impex (Commercial Wholesale Importer &amp; Mandi Trader)</span>
            </p>
            <p>
              <strong>Registered Office:</strong> Ground Floor, H-33, APMC Market-1, Sector-19, Phase-2, Vashi, Navi Mumbai, Thane, Maharashtra – 400703, India.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1 font-mono text-xs">
              <span><strong>GSTIN:</strong> 27AAPFT0162R1ZG</span>
              <span><strong>FSSAI License:</strong> 11522998001006</span>
              <span><strong>LEI:</strong> 335800VW64XCC6IOKK11</span>
            </div>
          </div>

          {/* Body Sections */}
          <div className="space-y-8 text-sm sm:text-base text-[#2D2318] leading-relaxed">
            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>1. Overview &amp; Commercial Scope</span>
              </h2>
              <p className="text-[#5C4D3C]">
                Tanvi Impex operates strictly as a B2B direct container importer, wholesale trader, and bulk distributor specializing in California Almonds, Irani Pistachios, Chilean Walnuts, and natural edible seeds. We respect the confidentiality and privacy of our wholesale clients, retail chain procurement managers, food manufacturers, and mandi trading partners across India.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>2. Information We Collect</span>
              </h2>
              <p className="text-[#5C4D3C] mb-3">
                We only collect business contact and commercial transaction details submitted voluntarily when you request wholesale quotations, initiate WhatsApp orders, or establish a commercial trading account with us. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-[#5C4D3C]">
                <li>Contact person name, company/firm name, and trade designation.</li>
                <li>Commercial telephone, mobile, or WhatsApp number.</li>
                <li>Delivery address, warehouse destination city, and state for transport dispatch.</li>
                <li>GSTIN registration certificate and PAN details for statutory tax invoicing.</li>
                <li>Official corporate or commercial email address.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>3. Purpose &amp; Use of Information</span>
              </h2>
              <p className="text-[#5C4D3C] mb-3">
                All collected information is used strictly and exclusively for legitimate business purposes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-[#5C4D3C]">
                <li>Generating customized B2B wholesale quotation estimates based on current APMC Vashi mandi commodity rates.</li>
                <li>Coordinating dry-freight or cold-chain transport logistics to your designated receiving warehouse across 23 Indian states.</li>
                <li>Issuing statutory GST-compliant commercial tax invoices and delivery challans.</li>
                <li>Providing customer support, shipment tracking, and FSSAI quality assurance documentation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>4. Protection &amp; Confidentiality</span>
              </h2>
              <p className="text-[#5C4D3C]">
                We do not sell, rent, lease, or share buyer information with advertising networks, third-party data brokers, or marketing intermediaries. Buyer information is processed solely by authorized administrative personnel and verified logistics partners for order execution.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#0F5A3B]" />
                <span>5. Data Retention &amp; Statutory Compliance</span>
              </h2>
              <p className="text-[#5C4D3C]">
                In accordance with Indian tax laws, GST regulations, and agricultural trade compliance, transaction records and invoicing details are retained for the statutory period required by the Ministry of Corporate Affairs and the Goods and Services Tax Network (GSTN).
              </p>
            </section>

            <section className="pt-4 border-t border-black/8">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D2318] mb-3">
                6. Administrative Contact &amp; Inquiries
              </h2>
              <p className="text-[#5C4D3C] mb-4">
                If you have questions regarding this Privacy Policy or wish to update your business contact details, please contact our administrative desk:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/6">
                  <Mail size={16} className="text-[#C28E3A] mb-1.5" />
                  <p className="font-bold text-[#2D2318]">Email</p>
                  <a href="mailto:accounts@tanviimpex.com" className="text-[#0F5A3B] underline font-medium">
                    accounts@tanviimpex.com
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/6">
                  <Phone size={16} className="text-[#C28E3A] mb-1.5" />
                  <p className="font-bold text-[#2D2318]">Phone</p>
                  <a href="tel:02249608280" className="text-[#0F5A3B] underline font-medium">
                    022 49608280
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/6">
                  <MapPin size={16} className="text-[#C28E3A] mb-1.5" />
                  <p className="font-bold text-[#2D2318]">Depot</p>
                  <p className="text-[#5C4D3C] text-[11px] leading-tight">
                    APMC Market-1, Vashi, Navi Mumbai 400703
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
