import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router';

/* --- SVG Icons --- */
const IconArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Accessories = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    // 🔥 SINGLE API (categories + highlights)
    fetch('http://localhost:5000/categories-products')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
        setFeaturedProducts(data.highlights);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-stone-950 text-white min-h-screen selection:bg-[#B58D7C] selection:text-white">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* HERO */}
      <section className="pt-40 pb-20 px-[4%] border-b border-white/5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-[#B58D7C] text-[10px] font-bold tracking-[0.6em] uppercase mb-6">
              The Core Collection
            </p>

            <h1 className="text-5xl md:text-7xl font-serif italic leading-none">
              Sartorial <br />
              <span className="font-sans font-black uppercase not-italic">
                Essentials.
              </span>
            </h1>
          </motion.div>

          <p className="text-white/40 text-xs md:text-sm max-w-xs uppercase tracking-widest">
            Suits, Shoes, Watches, Belts & Cufflinks — modern craftsmanship
            essentials.
          </p>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="py-24 px-[4%]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories?.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-stone-900 border border-white/5">
                <img
                  src={
                    cat.products?.[0]?.image ||
                    'https://via.placeholder.com/400'
                  }
                  alt={cat.category}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              <h3 className="text-[11px] font-bold tracking-[0.4em] uppercase mb-1 group-hover:text-[#B58D7C]">
                {cat.category}
              </h3>

              <p className="text-white/30 text-[9px] uppercase tracking-widest">
                {cat.products?.length || 0} Items
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 HIGHLIGHTS (3 RANDOM PRODUCTS) */}
      <section className="py-32 bg-[#0C0C0C] border-y border-white/5 px-[4%]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl font-serif italic">Curated Highlights</h2>

            <button
              onClick={() => Navigate('/all-accessories')}
              className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] text-[#B58D7C]"
            >
              <span>View Full Line</span>
              <IconArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts?.map((product, i) => (
              <motion.div
                key={product.id || i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6 border border-white/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700"
                  />
                </div>

                <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">
                  {product.category}
                </p>

                <h4 className="text-lg font-serif italic">{product.name}</h4>

                <p className="text-[#B58D7C] mt-2">${product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 opacity-10 text-center">
        <span className="text-[10px] uppercase tracking-[2em]">
          Trendora Essentials
        </span>
      </footer>
    </div>
  );
};

export default Accessories;
