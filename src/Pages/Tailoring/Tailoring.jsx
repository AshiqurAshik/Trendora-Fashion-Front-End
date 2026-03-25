import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Tailoring = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      no: "01",
      title: "The Consultation",
      desc: "An intimate dialogue at our Savile Row atelier to understand your lifestyle, preferences, and the architecture of your silhouette."
    },
    {
      no: "02",
      title: "Fabric Selection",
      desc: "Choose from over 5,000 seasonal cloths, including rare vicuña, ultra-fine merinos, and exclusive English silks."
    },
    {
      no: "03",
      title: "The First Fitting",
      desc: "The 'baste' fitting. A skeletal version of your suit is hand-stitched to perfect the balance and drape before the final construction."
    }
  ];

  return (
    <div className="bg-stone-950 text-white min-h-screen selection:bg-[#B58D7C] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
      
      {/* Editorial Introduction */}
      <section className="relative pt-48 pb-24 px-[4%]">
        <div className="max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <p className="text-[#B58D7C] text-[11px] font-bold tracking-[0.6em] uppercase mb-8">The Art of Bespoke</p>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-[0.9] mb-12">
              Bespoke <br /> 
              <span className="font-sans not-italic font-black tracking-tighter text-white/90 uppercase">Artistry.</span>
            </h1>
            <p className="text-white/40 text-sm leading-loose max-w-xl tracking-wide">
              At Trendora, tailoring is not a service; it is a ritual. Every garment is hand-cut and sewn in-house, requiring over 80 hours of meticulous labor by master artisans who have spent decades perfecting the drape. We believe a suit should be a second skin, reflecting the unique architecture of the wearer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Process Grid */}
      <section className="py-32 bg-[#0C0C0C] border-y border-white/5">
        <div className="w-[92%] max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 space-y-6 md:space-y-0">
            <h2 className="text-3xl font-serif italic tracking-tight">The Three Fittings</h2>
            <div className="w-24 h-[1px] bg-[#B58D7C] hidden md:block mb-4" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-bold">Standard Delivery: 8-12 Weeks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {steps.map((step, i) => (
              <motion.div 
                key={step.no}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="space-y-6"
              >
                <span className="text-5xl font-black text-white/5 tracking-tighter block">{step.no}</span>
                <h3 className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#B58D7C]">{step.title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed font-light">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Showcase - Images explicitly visible */}
      <section className="py-32 px-[4%]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.img 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800" 
                  className="w-full aspect-square object-cover shadow-2xl border border-white/5"
                  alt="Measuring Process"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x800/1c1917/b58d7c?text=Bespoke+Process'; }}
                />
                <motion.img 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  src="https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800" 
                  className="w-full aspect-[3/4] object-cover shadow-2xl border border-white/5"
                  alt="Fine Wool Fabric"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800/1c1917/b58d7c?text=Fine+Fabrics'; }}
                />
              </div>
              <div className="pt-12 space-y-4">
                <motion.img 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  src="https://images.unsplash.com/photo-1589754340354-94e8990f70f6?auto=format&fit=crop&q=80&w=800" 
                  className="w-full aspect-[3/4] object-cover shadow-2xl border border-white/5"
                  alt="Chalk Marking"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800/1c1917/b58d7c?text=Hand+Tailoring'; }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-20">
            <h2 className="text-4xl font-serif italic mb-8">A Legacy in Every Stitch.</h2>
            <div className="space-y-8 text-white/40 text-sm leading-loose">
              <p>
                From hand-rolled lapels to functional surgeon's cuffs, we celebrate the nuances that distinguish a garment from a masterpiece. Our buttons are exclusively ethically sourced horn and mother-of-pearl.
              </p>
              <div className="pt-8">
                <button className="relative py-4 px-10 group overflow-hidden border border-white/10 hover:border-[#B58D7C] transition-all duration-500">
                  <span className="relative z-10 text-[10px] uppercase font-black tracking-[0.4em] text-white">Book a Private Fitting</span>
                  <div className="absolute inset-0 bg-[#B58D7C] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding Space */}
      <section className="py-20 text-center border-t border-white/5">
        <p className="text-[10px] tracking-[1em] uppercase opacity-20 font-black">Trendora Homme Atelier &bull; Savile Row</p>
      </section>
    </div>
  );
};

export default Tailoring;