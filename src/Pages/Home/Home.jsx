import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/* --- Shared Animation Variants --- */
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const SignatureCollection = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        // Taking only the first 3 for the "Signature" feature section
        setItems(res.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-32 bg-stone-950 px-[6%]">
      <div className="max-w-[1800px] mx-auto">
        
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          viewport={fadeIn.viewport}
          transition={fadeIn.transition}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
        >
          <div className="max-w-2xl">
            <span className="text-[#B58D7C] text-[10px] font-bold tracking-[0.6em] uppercase mb-6 block">
              Seasonal Selection
            </span>
            <h2 className="text-white text-6xl md:text-8xl font-serif italic leading-[0.9]">
              The Signature <br /> 
              <span className="font-sans not-italic font-black text-white/90 uppercase tracking-tighter">Series.</span>
            </h2>
          </div>

          <button
            onClick={() => navigate('/all-suit')}
            className="group relative flex items-center space-x-4 text-[10px] uppercase tracking-[0.4em] font-black text-white/70 hover:text-white transition-colors"
          >
            <span>Explore Full Archive</span>
            <div className="w-12 h-px bg-[#B58D7C] transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
          </button>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse space-y-6">
                <div className="aspect-[4/5] bg-white/5"></div>
                <div className="h-2 w-24 bg-white/5"></div>
                <div className="h-4 w-48 bg-white/5"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/6] overflow-hidden mb-10 bg-stone-900 border border-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-700" />
                  
                  {/* Floating price on hover */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="px-4 py-2 bg-stone-950/80 backdrop-blur-md border border-white/10 text-[11px] text-[#B58D7C] font-bold tracking-widest">
                      ৳ {Number(item.price).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[#B58D7C] text-[9px] font-bold tracking-[0.5em] uppercase">
                    {item.category || "Limited Edition"}
                  </p>
                  <h4 className="text-white text-2xl font-serif italic group-hover:text-[#B58D7C] transition-colors duration-500">
                    {item.name}
                  </h4>
                  <div className="w-8 h-px bg-white/10 group-hover:w-full transition-all duration-700"></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CraftsmanshipPhilosophy = () => {
  return (
    <section className="py-40 bg-[#0C0C0C] px-[6%] border-y border-white/5 overflow-hidden">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="lg:col-span-7 relative order-2 lg:order-1"
        >
          <div className="absolute -inset-4 border border-[#B58D7C]/20 -z-10 transform translate-x-8 translate-y-8"></div>
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
            className="w-full h-[700px] object-cover border border-white/5 shadow-2xl"
            alt="The Atelier"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 order-1 lg:order-2 lg:pl-12"
        >
          <span className="text-[#B58D7C] text-[10px] font-bold tracking-[0.8em] uppercase mb-10 block">
            Our Ethos
          </span>

          <h2 className="text-white text-5xl md:text-7xl font-serif italic mb-10 leading-[0.9]">
            Beyond <br /> <span className="not-italic font-sans font-black tracking-tighter uppercase opacity-80">The Seams.</span>
          </h2>

          <div className="space-y-8">
            <p className="text-stone-400 text-lg font-light leading-relaxed">
              At Trendora, we don't just measure limbs; we measure character. Our tailoring is an architectural study of the wearer.
            </p>
            <p className="text-stone-500 text-sm leading-loose">
              Every stitch serves a purpose. Every fold is intentional. In an age of fast consumption, we remain steadfast in the slow, meticulous art of the hand-rolled lapel and the floating canvas.
            </p>
            
            <div className="pt-8">
               <button className="px-12 py-5 border border-white/10 hover:border-[#B58D7C] text-[10px] uppercase font-black tracking-[0.4em] transition-all duration-500 group relative overflow-hidden">
                  <span className="relative z-10 group-hover:text-black">Discover the Archive</span>
                  <div className="absolute inset-0 bg-[#B58D7C] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
               </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { title: "The Dialogue", desc: "Understanding the lifestyle and silhouette through an intimate consultation." },
    { title: "The Blueprint", desc: "Capturing thirty unique data points to draft a custom pattern from scratch." },
    { title: "The Baste", desc: "A skeletal fitting that allows for meticulous adjustments to balance and drape." }
  ];

  return (
    <section className="py-40 bg-stone-950 px-[6%]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 relative">
        {/* Connection Line */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-white/5 hidden md:block"></div>
        
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3 }}
            className="relative z-10 group"
          >
            <div className="w-20 h-20 bg-stone-950 border border-[#B58D7C]/30 flex items-center justify-center mb-10 mx-auto transform group-hover:rotate-45 transition-transform duration-700">
              <span className="text-[#B58D7C] font-serif italic text-2xl transform group-hover:-rotate-45 transition-transform">
                0{i + 1}
              </span>
            </div>

            <div className="text-center space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.4em]">
                {step.title}
              </h4>
              <p className="text-stone-500 text-sm leading-loose max-w-[280px] mx-auto font-light">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="bg-stone-950 selection:bg-[#B58D7C] selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Hero Space Marker */}
      <div className="h-24 bg-stone-950"></div>

      <SignatureCollection />
      <CraftsmanshipPhilosophy />
      <ProcessSection />

      {/* Subtle Footer Identity */}
      <section className="py-24 text-center border-t border-white/5">
         <p className="text-[10px] tracking-[1.5em] uppercase text-white/10 font-black">Trendora &bull; Savile Row &bull; Est. 1924</p>
      </section>
    </div>
  );
};

export default Home;