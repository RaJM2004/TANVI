import React from 'react';

export const GlobalReach: React.FC = () => {
  return (
    <section
      id="infrastructure"
      className="w-full pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4 bg-gradient-to-b from-[#FAF6EE] via-[#F3EDE2] to-[#FAF6EE] relative z-10 overflow-hidden"
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
        <h2 className="sr-only">Pan-India Cold Chain Nut Supply Network Across 23 States</h2>
        <div className="w-full overflow-hidden">
          <img
            src="/Pan-India Premium Nut Supply Network.webp"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.tried) {
                target.dataset.tried = 'true';
                target.src = '/Pan-India Premium Nut Supply Network.png';
              }
            }}
            alt="Wide Reach, Dedicated Care - Pan-India Premium Nut Supply Network across 23 states"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
};
