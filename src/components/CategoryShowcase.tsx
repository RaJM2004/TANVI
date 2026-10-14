import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ["Best Sellers", "Dry Fruits", "Spices", "Combo Offers"];

const allProducts = [
  { id: 1, category: "Best Sellers", title: "California Almonds", price: "₹650", weight: "500g", image: "/hero1.png" },
  { id: 2, category: "Best Sellers", title: "Premium Cashews", price: "₹850", weight: "500g", image: "/hero2.png" },
  { id: 3, category: "Best Sellers", title: "Irani Pistachio", price: "₹950", weight: "500g", image: "/hero3.png" },
  { id: 4, category: "Best Sellers", title: "Walnut Kernels", price: "₹1200", weight: "500g", image: "/hero4.png" },
  
  { id: 5, category: "Dry Fruits", title: "Afghan Anjeer", price: "₹1100", weight: "500g", image: "/hero5.png" },
  { id: 6, category: "Dry Fruits", title: "Black Raisins", price: "₹400", weight: "500g", image: "/hero6.png" },
  { id: 7, category: "Dry Fruits", title: "Dried Cranberries", price: "₹600", weight: "500g", image: "/hero1.png" },
  { id: 8, category: "Dry Fruits", title: "Pine Nuts (Chilgoza)", price: "₹3500", weight: "500g", image: "/hero2.png" },

  { id: 9, category: "Spices", title: "Green Cardamom", price: "₹1800", weight: "500g", image: "/hero3.png" },
  { id: 10, category: "Spices", title: "Black Pepper", price: "₹450", weight: "500g", image: "/hero4.png" },
  { id: 11, category: "Spices", title: "Cinnamon Sticks", price: "₹300", weight: "500g", image: "/hero5.png" },
  { id: 12, category: "Spices", title: "Cloves (Laung)", price: "₹650", weight: "500g", image: "/hero6.png" },
];

export const CategoryShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("Best Sellers");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = allProducts.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeCategory]);

  return (
    <section className="py-20 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Tabs */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-serif text-[#2D2318] mb-8 text-center">Shop by Category</h2>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-gray-200 w-full md:w-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm md:text-base font-medium uppercase tracking-wider transition-colors relative ${
                  activeCategory === category ? 'text-[#C28E3A]' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#C28E3A]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 min-h-[500px]">
          <AnimatePresence mode='wait'>
            {filteredProducts.map((product) => (
              <div 
                key={`${product.id}-${activeCategory}`}
                className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Box */}
                <div className="relative aspect-square bg-[#F9F8F5] p-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <button className="w-full bg-white text-[#2D2318] py-2 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 hover:bg-[#C28E3A] hover:text-white transition-colors translate-y-4 group-hover:translate-y-0 duration-300">
                      <ShoppingCart size={16} /> Quick Add
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs text-gray-500 mb-1">{product.weight}</p>
                  <h3 className="text-sm md:text-base font-bold text-[#2D2318] mb-2 line-clamp-2">{product.title}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-[#C28E3A]">{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </AnimatePresence>
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              New products arriving soon in this category.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
