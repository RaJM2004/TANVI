import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  { id: 1, src: "/Video.mp4", title: "Premium Almonds Processing" },
  { id: 2, src: "/Video.mp4", title: "Fresh Cashews Sorting" },
  { id: 3, src: "/Video.mp4", title: "Wholesale Packaging" },
  { id: 4, src: "/Video.mp4", title: "Quality Check Process" },
];

const VideoCard = ({ video }: { video: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div 
      className="video-card relative aspect-[9/16] w-full rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Play Icon (Hidden when playing) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300">
            <Play className="text-white w-6 h-6" fill="white" />
          </div>
        </div>
      )}

      {/* Controls Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-medium text-sm md:text-base mb-2 drop-shadow-md">{video.title}</h3>
        <button 
          onClick={toggleMute}
          className="p-2 rounded-full bg-black/40 text-white hover:bg-[#C28E3A] transition-colors duration-300 backdrop-blur-sm"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export const VideoGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.video-card');
      
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  return (
    <section className="py-20 bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D2318] mb-2">Our Factory Reels</h2>
            <div className="h-1 w-16 bg-[#C28E3A]" />
          </div>
          <a href="#" className="hidden md:inline-flex items-center text-[#C28E3A] font-bold text-sm uppercase tracking-wider hover:text-[#2D2318] transition-colors">
            View All <span className="ml-2">→</span>
          </a>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <a href="#" className="inline-flex items-center text-[#C28E3A] font-bold text-sm uppercase tracking-wider">
            View All Reels <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
