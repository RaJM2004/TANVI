import React from 'react';
import { Link } from 'react-router-dom';

export const CampaignGallery: React.FC = () => {
  return (
    <section className="w-full pt-2 sm:pt-4 md:pt-6 pb-12 sm:pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top Banner: California Pistachio Premium Nature Banner */}
        <div className="w-full mb-6 sm:mb-8 md:mb-10">
          <Link
            to="/products?category=pistachios#california-roasted-pistachio"
            className="group block w-full cursor-pointer relative"
          >
            <img
              src="/California%20Pistachio%20Premium%20Nature%20Banner.png"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.tried) {
                  target.dataset.tried = 'true';
                  target.src = '/California Pistachio Premium Nature Banner.png';
                }
              }}
              alt="California Pistachio Premium Nature Banner"
              className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-95"
            />
          </Link>
        </div>

        {/* Two Images Side by Side: Almonds & Pistachios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 md:mb-10">
          <div className="w-full">
            <Link
              to="/products?category=almonds#nutbold-special-selected-almonds"
              className="group block w-full cursor-pointer relative"
            >
              <img
                src="/Special Selected Almonds Poster.png"
                alt="Special Selected Almonds Poster"
                className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-95"
              />
            </Link>
          </div>
          <div className="w-full">
            <Link
              to="/products?category=pistachios#irani-roasted-pistachio"
              className="group block w-full cursor-pointer relative"
            >
              <img
                src="/Nature’s Goodness_ Irani Pistachios.png"
                alt="Nature’s Goodness Irani Pistachios"
                className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-95"
              />
            </Link>
          </div>
        </div>

        {/* Two Images Side by Side: Sunflower Seeds & Pumpkin Seeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          <div className="w-full">
            <Link
              to="/products?category=seeds#sunflower-seed-g"
              className="group block w-full cursor-pointer relative"
            >
              <img
                src="/Premium Sunflower Seeds Banner.png"
                alt="Premium Sunflower Seeds Banner"
                className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-95"
              />
            </Link>
          </div>
          <div className="w-full">
            <Link
              to="/products?category=seeds#pumpkin-seed-g"
              className="group block w-full cursor-pointer relative"
            >
              <img
                src="/Premium Pumpkin Seeds, Naturally Pure.png"
                alt="Premium Pumpkin Seeds, Naturally Pure"
                className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-95"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
