import { memo, useEffect, useState } from 'react';

// The 23 states where deliveries are active
const activeStates = [
  "IN-MH", "IN-DL", "IN-KA", "IN-GJ", "IN-RJ", 
  "IN-TN", "IN-WB", "IN-UP", "IN-MP", "IN-PB", 
  "IN-HR", "IN-KL", "IN-TG", "IN-AP", "IN-BR", 
  "IN-OR", "IN-AS", "IN-JH", "IN-CT", "IN-UT", 
  "IN-HP", "IN-GA", "IN-JK"
];

interface Point {
  state: string;
  cx: number;
  cy: number;
  isHub: boolean;
}

const MapChart = () => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [deliveryPoints, setDeliveryPoints] = useState<Point[]>([]);

  // 1. Fetch SVG
  useEffect(() => {
    fetch('/india-map.svg')
      .then(res => res.text())
      .then(text => {
        // Inject the precise bounding box so the SVG scales perfectly
        const fixedSvg = text.replace('<svg ', '<svg viewBox="0 0 612 782" preserveAspectRatio="none" ');
        setSvgContent(fixedSvg);
      })
      .catch(err => console.error("Failed to load map SVG", err));
  }, []);

  // 2. Compute exact mathematical centroids using the browser's layout engine
  useEffect(() => {
    if (!svgContent) return;
    
    const timer = setInterval(() => {
      const svg = document.querySelector('.india-map-container .base-map');
      if (!svg) return;
      
      const mhPath = svg.querySelector('#IN-MH') as SVGGraphicsElement;
      if (!mhPath) return; 
      
      try {
        const mhBbox = mhPath.getBBox();
        if (mhBbox.width === 0) return; // Wait for layout
        
        // Layout is ready! Let's compute all points
        clearInterval(timer);
        
        const computedPoints: Point[] = [];
        
        activeStates.forEach(stateId => {
          const path = svg.querySelector(`#${stateId}`) as SVGGraphicsElement;
          if (path) {
            const bbox = path.getBBox();
            const cx = bbox.x + bbox.width / 2;
            let cy = bbox.y + bbox.height / 2;
            
            // Optical adjustments for weirdly shaped states so dot is on land
            if (stateId === "IN-MH") cy -= 15;
            if (stateId === "IN-UP") cy += 15;
            
            computedPoints.push({
              state: stateId,
              cx,
              cy,
              isHub: stateId === "IN-MH"
            });
          }
        });
        
        setDeliveryPoints(computedPoints);
      } catch {
        // keep polling
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [svgContent]);

  const hub = deliveryPoints.find(p => p.isHub);

  return (
    <div className="relative w-full aspect-[612/782] max-w-[600px] mx-auto india-map-container">
      <style>{`
        .india-map-container svg.base-map {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
        }
        
        /* Base uniform style for ALL states */
        .india-map-container .base-map path {
          fill: #2a1910 !important;
          stroke: rgba(194, 142, 58, 0.2) !important;
          stroke-width: 0.8px !important;
          transition: all 0.3s ease;
        }
        
        /* Hover effect for states */
        .india-map-container .base-map path:hover {
          fill: #3e2716 !important;
        }
        
        .network-line {
          animation: march 20s linear infinite;
        }

        @keyframes march {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      
      {/* 1. Base Map Layer */}
      {svgContent ? (
        <div 
          className="absolute inset-0 w-full h-full"
          dangerouslySetInnerHTML={{ __html: svgContent.replace('<svg', '<svg class="base-map"') }} 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#C28E3A]">
          Loading map...
        </div>
      )}
      
      {/* 2. Network Overlay Layer (Only renders when centroids are calculated) */}
      {deliveryPoints.length > 0 && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 612 782" 
          preserveAspectRatio="none"
        >
          {/* Draw Connecting Lines from Hub to all other points */}
          {hub && deliveryPoints.filter(p => !p.isHub).map(point => (
            <line
              key={`line-${point.state}`}
              x1={hub.cx}
              y1={hub.cy}
              x2={point.cx}
              y2={point.cy}
              stroke="#C28E3A"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.5"
              className="network-line"
            />
          ))}

          {/* Draw all Dots */}
          {deliveryPoints.map(point => (
            <g key={`dot-${point.state}`}>
              {/* Solid Center */}
              <circle
                cx={point.cx}
                cy={point.cy}
                r={point.isHub ? "8" : "4"}
                fill="#C28E3A"
                filter="drop-shadow(0 0 5px rgba(194, 142, 58, 0.8))"
              />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
};

export default memo(MapChart);
export { MapChart as IndiaMapVisualization };
