import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Heritage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timeline = [
    {
      year: '2012',
      title: 'The Founding',
      desc: "Arthur Trendora opens the first atelier on Savile Row, dedicated to 'The Architecture of the Gentleman'.",
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    },
    {
      year: '2018',
      title: 'Royal Warrant',
      desc: 'Trendora is granted the Royal Warrant for Tailoring, cementing its status as the peak of British sartorial excellence.',
      img: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800',
    },
    {
      year: '2021',
      title: 'Global Expansion',
      desc: "Opening of the Milan and Tokyo flagships, introducing the 'Soft Tailoring' revolution to a global audience.",
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    },
    {
      year: '2024',
      title: 'The New Era',
      desc: "Celebrating a century of craft with the launch of the 'Homme Atelier'—a fusion of heritage and modern innovation.",
      img: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="bg-stone-950 text-white min-h-screen selection:bg-[#B58D7C] selection:text-white pb-32">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .vertical-line { width: 1px; height: 100px; background: linear-gradient(to bottom, transparent, #B58D7C, transparent); }
      `}</style>

      {/* Hero Header */}
      <section className="pt-48 pb-24 px-[4%] text-center border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#B58D7C] text-[11px] font-bold tracking-[0.8em] uppercase mb-10"
          >
            A Century of Excellence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif italic mb-12"
          >
            Heritage.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-white/40 text-sm max-w-xl leading-loose tracking-widest font-light uppercase mx-auto">
              Rooted in the traditions of Savile Row, we have spent 100 years
              mastering the balance between thread and soul.
            </p>
            <div className="vertical-line mt-12" />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-[4%]">
        <div className="max-w-[1200px] mx-auto space-y-40">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 w-full"
              >
                <div className="aspect-[16/10] overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-105 hover:scale-100"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-6 text-center md:text-left"
              >
                <span className="text-6xl md:text-8xl font-black text-white/5 tracking-tighter block font-sans italic">
                  {item.year}
                </span>
                <h3 className="text-[12px] font-bold tracking-[0.5em] uppercase text-[#B58D7C]">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light max-w-md mx-auto md:mx-0">
                  {item.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-40 bg-white/5 border-y border-white/10">
        <div className="max-w-[1600px] mx-auto px-[4%]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="space-y-6">
              <h4 className="text-2xl font-serif italic">
                Unwavering Precision
              </h4>
              <p className="text-white/30 text-xs leading-loose tracking-wide">
                We believe that perfection is found in the final millimeter.
                Every seam is checked thrice, ensuring the architecture remains
                flawless for decades.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-serif italic">Noble Materials</h4>
              <p className="text-white/30 text-xs leading-loose tracking-wide">
                From the shepherds of the Scottish Highlands to the silk weavers
                of Lake Como, we source only from partners who share our respect
                for the earth.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-serif italic">Artisan Mentorship</h4>
              <p className="text-white/30 text-xs leading-loose tracking-wide">
                Our apprentice program ensures that the secrets of the master
                tailors are passed down, preserving the 'Trendora Hand' for the
                next century.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Space */}
      <section className="py-40 text-center px-[4%]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-4xl md:text-6xl font-serif italic leading-tight mb-12">
            "A suit is a conversation between history and the future."
          </p>
          <div className="w-12 h-[1px] bg-[#B58D7C] mx-auto mb-6" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-white/20">
            The Trendora Manifesto
          </span>
        </motion.div>
      </section>
    </div>
  );
};

export default Heritage;
