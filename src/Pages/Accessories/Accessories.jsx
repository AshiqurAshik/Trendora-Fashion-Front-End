import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

/* --- SVG Icons --- */
const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const Accessories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 1, name: "Silk Ties", count: "42 Styles", img: "https://images.unsplash.com/photo-1589754340354-94e8990f70f6?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Leather Goods", count: "18 Pieces", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Timepieces", count: "Limited Edition", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Cufflinks", count: "Bespoke Metals", img: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&q=80&w=800" },
  ];

  const featuredProducts = [
    {
      name: "The Midnight Grenadine",
      category: "Hand-Rolled Silk Tie",
      price: "$245",
      img: "https://images.unsplash.com/photo-1598565793131-255746777bc8?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Veau Box Briefcase",
      category: "Full-Grain Leather",
      price: "$2,850",
      img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Sterling Silver Links",
      category: "Signature Series",
      price: "$480",
      img: "https://images.unsplash.com/photo-1611930513474-6725c8328178?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-stone-950 text-white min-h-screen selection:bg-[#B58D7C] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Hero Header */}
      <section className="pt-40 pb-20 px-[4%] border-b border-white/5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <p className="text-[#B58D7C] text-[10px] font-bold tracking-[0.6em] uppercase mb-6">Finishing Touches</p>
            <h1 className="text-5xl md:text-7xl font-serif italic leading-none">
              Accoutrements <br />
              <span className="font-sans not-italic font-black text-white/90 uppercase tracking-tighter">of Character.</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-xs md:text-sm max-w-xs leading-relaxed uppercase tracking-widest font-light"
          >
            A curated selection of the finest materials globally sourced, designed to complement the bespoke silhouette.
          </motion.p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-24 px-[4%]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-stone-900 border border-white/5">
                <img 
                  src={cat.img} 
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/0 transition-colors duration-500" />
              </div>
              <h3 className="text-[11px] font-bold tracking-[0.4em] uppercase mb-1">{cat.name}</h3>
              <p className="text-white/30 text-[9px] uppercase tracking-widest">{cat.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 bg-[#0C0C0C] border-y border-white/5 px-[4%]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl font-serif italic">Seasonal Highlights</h2>
            <button className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] text-[#B58D7C] hover:text-white transition-colors">
              <span>View All</span>
              <IconArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden mb-8 border border-white/5">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">{product.category}</p>
                    <h4 className="text-lg font-serif italic mb-4">{product.name}</h4>
                  </div>
                  <span className="text-sm font-light text-[#B58D7C]">{product.price}</span>
                </div>
                <button className="w-full py-4 border border-white/10 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-black transition-all duration-500">
                  Add to Collection
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Teaser */}
      <section className="py-40 px-[4%] text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">
              "The details are not the details. <br /> They make the design."
            </h2>
            <p className="text-white/20 mt-8 text-[11px] uppercase tracking-[0.8em]">Charles Eames</p>
          </motion.div>
          
          <div className="pt-8">
            <button className="px-12 py-5 bg-[#B58D7C] text-white text-[10px] uppercase font-black tracking-[0.4em] hover:bg-[#a67d6c] transition-colors shadow-2xl">
              Inquire Bespoke
            </button>
          </div>
        </div>
      </section>

      {/* Subtle Footer Spacer */}
      <footer className="py-20 border-t border-white/5 opacity-10 text-center">
        <span className="text-[10px] uppercase tracking-[2em]">Trendora Essentials</span>
      </footer>
    </div>
  );
};

export default Accessories;