import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IconArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const AllSuit = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get('http://localhost:5000/products')
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching suits:", err);
        setLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate(-1); // ✅ better than window.history.back()
  };

  return (
    <div className="bg-stone-950 min-h-screen selection:bg-[#B58D7C] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-stone-950/80 backdrop-blur-md border-b border-white/5 py-6">
        <div className="w-[92%] max-w-[1600px] mx-auto flex items-center justify-between">
          
          <button 
            onClick={goBack}
            className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-[#B58D7C] transition-all group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              <IconArrowLeft />
            </span>
            <span className="font-bold">Back</span>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-white text-lg font-light tracking-[0.4em]">
              TREND<span className="font-bold">ORA</span>
            </span>
          </div>

          <div className="w-20 lg:block hidden"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-40 pb-32 px-[4%]">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header Section */}
          <header className="mb-20">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#B58D7C] text-[10px] font-bold tracking-[0.6em] uppercase mb-4"
            >
              Ready-to-Wear
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif italic text-white"
            >
              All Suits
            </motion.h1>

            <div className="h-px w-24 bg-white/10 mt-10"></div>
          </header>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-2 border-[#B58D7C] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
              {items.map((item, i) => (
                <motion.div 
                  key={item.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-8 border border-white/5 bg-stone-900">
                    
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1594932224491-ca2e3c83bb31?auto=format&fit=crop&q=80&w=800"} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/600x800/1c1917/b58d7c?text=Trendora+Suit";
                      }}
                    />

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                    {/* View Details Button */}
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-stone-950/80 backdrop-blur-sm">
                      <button 
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="w-full py-4 border border-white/10 text-[9px] uppercase tracking-[0.4em] font-black text-white hover:bg-white hover:text-black transition-all"
                      >
                        View Details
                      </button>
                    </div>

                  </div>

                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">
                        Premium Collection
                      </p>

                      <h3 className="text-xl font-serif italic text-white group-hover:text-[#B58D7C] transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-light text-[#B58D7C] tracking-tighter">
                        ৳ {Number(item.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && items.length === 0 && (
            <div className="text-center py-40 border border-white/5 bg-white/[0.02]">
              <p className="font-serif italic text-2xl text-white/40">
                No garments currently available in this collection.
              </p>

              <button 
                onClick={goBack} 
                className="mt-8 text-[10px] uppercase tracking-widest text-[#B58D7C] underline"
              >
                Return to main
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-20">
        <p className="text-[10px] tracking-[1em] uppercase font-black">
          Trendora Homme Atelier
        </p>
      </footer>
    </div>
  );
};

export default AllSuit;