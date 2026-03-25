import React from 'react';
import { motion } from 'framer-motion';

/* --- Shared Animation Variants --- */
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const SignatureCollection = () => {
  const items = [
    {
      id: 1,
      title: "The Midnight Tuxedo",
      category: "Evening Wear",
      img: "https://images.unsplash.com/photo-1594932224828-b4b059b6f68e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Viccuna Wool Overcoat",
      category: "Outerwear",
      img: "https://images.unsplash.com/photo-1617130863188-5850a4d55d1d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Charcoal Herringbone",
      category: "Business",
      img: "https://images.unsplash.com/photo-1598808503746-f34c53b20ef3?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-32 bg-stone-950 px-[6%]">
      <div className="max-w-[1800px] mx-auto">
        <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[#B58D7C] text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Seasonal Selection</span>
            <h2 className="text-white text-5xl md:text-7xl font-serif italic">The Signature <br/> Collection</h2>
          </div>
          <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 hover:text-white transition-colors border-b border-white/20 pb-2 self-start md:self-auto">
            View All Series
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-stone-900">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <p className="text-[#B58D7C] text-[9px] font-bold tracking-[0.4em] uppercase mb-2">{item.category}</p>
              <h4 className="text-white text-xl font-light tracking-wide">{item.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CraftsmanshipPhilosophy = () => {
  return (
    <section className="py-32 bg-stone-900 px-[6%] border-y border-white/5">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative order-2 lg:order-1"
        >
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-[600px] object-cover rounded-sm opacity-80"
            alt="Atelier"
          />
          <div className="absolute -bottom-10 -right-10 hidden xl:block w-64 h-64 bg-[#B58D7C] p-10">
            <p className="text-white text-sm font-serif italic leading-relaxed">
              "A suit should be an extension of the man, whispering authority rather than shouting for attention."
            </p>
            <p className="text-white/60 text-[8px] uppercase tracking-[0.3em] mt-6 font-bold">— Arthur Trendora</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="order-1 lg:order-2"
        >
          <span className="text-[#B58D7C] text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block">Our Ethos</span>
          <h2 className="text-white text-5xl md:text-6xl font-serif italic mb-8 leading-tight">Beyond The Seams</h2>
          <p className="text-stone-400 text-lg font-light leading-relaxed mb-10">
            At Trendora, we don't just measure limbs; we measure character. Each bespoke piece undergoes over 80 hours of hand-canvassing, ensuring a drape that evolves with your body over decades, not seasons.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10">
            <div>
              <h5 className="text-white text-3xl font-serif italic mb-2">4,500+</h5>
              <p className="text-stone-500 text-[9px] uppercase tracking-[0.3em] font-bold">Stitches per lapel</p>
            </div>
            <div>
              <h5 className="text-white text-3xl font-serif italic mb-2">12 Weeks</h5>
              <p className="text-stone-500 text-[9px] uppercase tracking-[0.3em] font-bold">Average lead time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { title: "Consultation", desc: "Selecting from our archive of 3,000+ luxury fabrics." },
    { title: "Measurement", desc: "Capturing 40+ unique data points of your physique." },
    { title: "Fitting", desc: "Fine-tuning the basted garment for perfect proportions." }
  ];

  return (
    <section className="py-40 bg-stone-950 px-[6%]">
      <div className="max-w-[1800px] mx-auto text-center mb-24">
        <motion.span {...fadeIn} className="text-[#B58D7C] text-[10px] font-bold tracking-[0.6em] uppercase block mb-4">The Journey</motion.span>
        <motion.h2 {...fadeIn} className="text-white text-5xl md:text-7xl font-serif italic">The Bespoke Process</motion.h2>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-[40px] left-0 w-full h-[1px] bg-white/5 z-0" />
        
        {steps.map((step, i) => (
          <motion.div 
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full border border-[#B58D7C]/30 bg-stone-950 flex items-center justify-center mb-8 group-hover:border-[#B58D7C] transition-colors duration-500">
              <span className="text-[#B58D7C] font-serif italic text-2xl">0{i + 1}</span>
            </div>
            <h4 className="text-white text-xl font-bold tracking-widest uppercase mb-4">{step.title}</h4>
            <p className="text-stone-500 text-sm font-light leading-relaxed max-w-[250px]">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="bg-stone-950">
      <SignatureCollection />
      <CraftsmanshipPhilosophy />
      <ProcessSection />

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
};

export default Home;