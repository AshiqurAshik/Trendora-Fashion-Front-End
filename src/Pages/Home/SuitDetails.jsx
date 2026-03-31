import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const IconArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SuitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border border-white/10 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-[#B58D7C] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const specs = [
    { label: "Fabric", value: product.fabric },
    { label: "Fit", value: product.fit },
    { label: "Origin", value: product.origin },
    { label: "Construction", value: product.construction }
  ];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#e5e5e5] selection:bg-[#B58D7C]/30 font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.03] px-[6%] py-5">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center space-x-3 text-[10px] uppercase tracking-[0.5em] text-white/40 hover:text-[#B58D7C]"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              <IconArrowLeft />
            </span>
            <span className="font-semibold">Return to Collection</span>
          </button>
          <div className="text-xl font-serif italic tracking-tighter text-white/90"> 
TRENDORA</div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-[6%] max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">

          {/* Image Section */}
          <motion.div className="lg:col-span-7">
            <div className="group relative aspect-[4/5] bg-stone-900/50 overflow-hidden rounded-sm ring-1 ring-white/5 shadow-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform transition-transform duration-[2s] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
              />
            </div>
          </motion.div>

          {/* Details Section */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-12">

              {/* Header */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.6em] text-[#B58D7C] font-bold">
                  Exclusively Tailored
                </span>

                <h1 className="text-5xl md:text-6xl font-serif italic text-white leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-light text-[#B58D7C]">
                    ৳ {Number(product.price).toLocaleString()}
                  </span>
                  <span className="text-xs text-white/30 tracking-widest uppercase italic">
                    Vat inclusive
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/50 leading-relaxed text-lg font-light max-w-xl">
                {product.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-y border-white/5 py-10">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-1.5 font-bold">
                      {spec.label}
                    </p>
                    <p className="text-sm text-white/80 font-medium tracking-wide">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div className="space-y-5">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
                  Select European Size
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {product.available_sizes?.split(',').map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size.trim())}
                      className={`min-w-[64px] h-12 flex items-center justify-center text-xs transition-all rounded-sm border ${
                        selectedSize === size.trim()
                          ? 'border-[#B58D7C] bg-[#B58D7C] text-black font-bold'
                          : 'border-white/10 text-white/50 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {size.trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || isAdding}
                  className="w-full py-5 rounded-sm font-bold uppercase tracking-[0.4em] text-[11px] bg-[#B58D7C] text-black"
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div key="added" className="flex items-center justify-center gap-2">
                        <IconCheck />
                        Item Added
                      </motion.div>
                    ) : (
                      <motion.span key="add">
                        {selectedSize ? "Add to Wardrobe" : "Select a Size"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <button
                  onClick={() => navigate('/concierge')}
                  className="w-full py-5 border border-white/10 rounded-sm text-white/60 font-bold uppercase tracking-[0.4em] text-[11px]"
                >
                  Book Private Fitting
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuitDetails;