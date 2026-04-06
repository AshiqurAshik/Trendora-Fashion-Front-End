import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IconArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const AllSuit = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get('http://localhost:5000/products')
      .then(res => {
        const data = res.data;
        setItems(data);
        
        // Extract unique categories dynamically from the data
        const uniqueCats = ['All', ...new Set(data.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCats);
        
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching suits:", err);
        setLoading(false);
      });
  }, []);

  const goBack = () => {
    if (window.history.length <= 1) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  // Filter and Sort Logic combined in useMemo for performance
  const processedItems = useMemo(() => {
    let filtered = items.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [items, activeCategory, searchQuery, sortBy]);

  return (
    <div className="bg-stone-950 min-h-screen selection:bg-[#B58D7C] selection:text-white text-stone-300 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;600;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-stone-950/90 backdrop-blur-xl border-b border-white/5 py-6">
        <div className="w-[92%] max-w-[1800px] mx-auto flex items-center justify-between">
          <button 
            onClick={goBack}
            className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-[#B58D7C] transition-all group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              <IconArrowLeft />
            </span>
            <span className="font-semibold">Return</span>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-white text-xl font-light tracking-[0.5em]">
              TREND<span className="font-bold">ORA</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
             <div className="hidden md:block h-4 w-px bg-white/10"></div>
             <span className="hidden md:block text-[9px] uppercase tracking-[0.3em] text-white/20">Archive v.2.5</span>
          </div>
        </div>
      </nav>

      <main className="pt-48 pb-32 px-[6%]">
        <div className="max-w-[1800px] mx-auto">
          
          {/* Top Bar: Title & Search */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
            <header className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4 mb-6"
              >
                <div className="w-8 h-px bg-[#B58D7C]"></div>
                <p className="text-[#B58D7C] text-[10px] font-bold tracking-[0.6em] uppercase">
                  Atelier Ready-to-Wear
                </p>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-6xl md:text-8xl font-serif italic text-white leading-[0.85]"
              >
                The Full <br /> <span className="not-italic font-black uppercase tracking-tighter text-white/90">Catalog.</span>
              </motion.h1>
            </header>

            {/* Search & Sort Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto"
            >
              {/* Premium Search Input */}
              <div className="relative w-full sm:w-80 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#B58D7C] transition-colors">
                  <IconSearch />
                </div>
                <input 
                  type="text"
                  placeholder="Search pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-6 text-[11px] uppercase tracking-widest text-white outline-none focus:border-[#B58D7C]/50 focus:bg-white/[0.05] transition-all duration-500 rounded-none"
                />
              </div>

              {/* Sort Dropdown */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-stone-900 border border-white/10 py-4 px-6 text-[10px] uppercase tracking-[0.2em] text-white/70 outline-none focus:border-[#B58D7C] cursor-pointer appearance-none rounded-none pr-12 relative"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center' }}
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-10 overflow-x-auto no-scrollbar pb-8 border-b border-white/5 mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.4em] whitespace-nowrap transition-all duration-700 relative pb-4 group ${
                  activeCategory === cat ? 'text-[#B58D7C] font-black' : 'text-white/20 hover:text-white/60'
                }`}
              >
                {cat}
                <div className={`absolute bottom-0 left-0 h-[2px] bg-[#B58D7C] transition-all duration-700 ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-4'}`} />
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-[50vh] space-y-6">
              <div className="w-12 h-12 border-t-2 border-[#B58D7C] rounded-full animate-spin"></div>
              <p className="text-[10px] uppercase tracking-[0.8em] text-white/20 animate-pulse">Synchronizing Atelier Data</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              <AnimatePresence mode='popLayout'>
                {processedItems.map((item, i) => (
                  <motion.div 
                    key={item.id || item._id || i}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: (i % 6) * 0.1,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden mb-10 bg-stone-900 shadow-2xl">
                      {/* Product Image with Hover Zoom/Pan */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/800x1000/1c1917/b58d7c?text=Archive+Piece"; }}
                      />

                      {/* Overlay Gradients */}
                      <div className="absolute inset-0 bg-stone-950/20 transition-opacity duration-700 group-hover:opacity-0" />
                      <div className="absolute inset-0 ring-1 ring-white/5 ring-inset" />

                      {/* Premium Hover Actions */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-t from-stone-950 via-transparent to-transparent">
                        <button 
                          onClick={() => navigate(`/product/${item.id || item._id}`)}
                          className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#B58D7C] transition-colors duration-500"
                        >
                          View Selection
                        </button>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#B58D7C] text-[9px] font-bold tracking-[0.5em] uppercase">
                          {item.category || 'Atelier'}
                        </span>
                        <span className="text-white/10 text-[9px] font-mono tracking-widest">
                          #ID_{String(item.id || i).padStart(4, '0')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-2xl font-serif italic text-white group-hover:text-[#B58D7C] transition-colors duration-500 leading-tight">
                          {item.name}
                        </h3>
                        <div className="text-right flex flex-col items-end">
                           <p className="text-white font-light text-lg tracking-tighter">
                             ৳ {Number(item.price).toLocaleString()}
                           </p>
                           <div className="h-px w-0 group-hover:w-full bg-[#B58D7C]/50 transition-all duration-700 mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Results Empty State */}
          {!loading && processedItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-48 border border-white/5 bg-white/[0.01]"
            >
              <div className="max-w-md mx-auto space-y-6">
                <p className="font-serif italic text-3xl text-white/30">
                  The archive yields no matches for "{searchQuery || activeCategory}".
                </p>
                <p className="text-stone-500 text-xs tracking-widest leading-loose uppercase">
                  Please adjust your parameters or consult our <br /> digital concierge.
                </p>
                <button 
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); setSortBy('default'); }} 
                  className="mt-8 px-10 py-4 border border-white/10 text-[10px] uppercase tracking-widest text-white hover:border-[#B58D7C] transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Subtle Bottom Section */}
      <footer className="py-32 border-t border-white/5 text-center flex flex-col items-center">
        <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-10 rotate-45">
           <span className="rotate-[-45deg] text-[10px] text-[#B58D7C]">T</span>
        </div>
        <p className="text-[10px] tracking-[1.5em] uppercase font-black text-white/5 mb-4">
          Trendora &bull; London &bull; Savile Row
        </p>
        <p className="text-[8px] tracking-[0.2em] text-white/20 uppercase">All pieces are handcrafted upon request</p>
      </footer>
    </div>
  );
};

export default AllSuit;