import React from 'react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { CanvasSequence } from '../components/CanvasSequence';
import { StoryOverlay } from '../components/StoryOverlay';
import { HomeCategoryBar } from '../components/HomeCategoryBar';
import { CampaignGallery } from '../components/CampaignGallery';
import { AboutUs } from '../components/AboutUs';
import { QualityMetrics } from '../components/QualityMetrics';
import { GlobalReach } from '../components/GlobalReach';
import { Testimonials } from '../components/Testimonials';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <main>
      <SEO
        title="Tanvi Impex | Wholesale California Almonds, Irani Pistachios & Dry Fruits Importer Mumbai"
        description="Premier importer, trader and bulk distributor of California Almonds, Nútböld Almonds, Irani & California Pistachios, Pumpkin, Sunflower & Chia Seeds in APMC Market, Navi Mumbai."
        canonical="https://tanviimpex.com/"
      />
      {/* Hero Banner */}
      <Hero />

      {/* Interactive 3D Canvas Animation */}
      <div className="relative bg-black text-white">
        <CanvasSequence />
        <StoryOverlay />
      </div>

      {/* Circular Category Quick-Access Showcase */}
      <HomeCategoryBar />

      {/* Brand Visual Campaigns & Advertisement Posters */}
      <CampaignGallery />

      {/* Company Story & Legacy (Our Story) */}
      <AboutUs />

      {/* Quality Standards & Lab Testing */}
      <QualityMetrics />

      {/* Global Sourcing & Cold Storage Infrastructure */}
      <GlobalReach />

      {/* Client Reviews */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Global Footer */}
      <Footer />
    </main>
  );
};
