import React from 'react';

export const QualityMetrics: React.FC = () => {
  return (
    <section
      id="quality"
      className="w-full pt-12 sm:pt-16 md:pt-20 pb-2 sm:pb-3 md:pb-4 bg-gradient-to-b from-[#FAF6EE] via-[#F3EDE2] to-[#FAF6EE] relative z-10 overflow-hidden"
    >
      {/* Subtle Warm Luxury Gold Grid & Radial Ambience */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#C28E3A 1px, transparent 1px), linear-gradient(90deg, #C28E3A 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(194, 142, 58, 0.09) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="w-full overflow-hidden">
          <img
            src="/The Tanvi Impex Promise.png"
            alt="The Tanvi Impex Promise - 100% Natural, Export Quality, Rich in Nutrition, Premium Grade"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
};
