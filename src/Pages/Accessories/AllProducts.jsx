import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const Navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch('http://localhost:5000/accessories/all')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        // 🔥 EXTRACT UNIQUE CATEGORIES FROM BACKEND
        const uniqueCats = [
          'All',
          ...new Set(data.map((item) => item.category?.trim())),
        ].filter(Boolean);

        setCategories(uniqueCats);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) =>
          item.category?.trim().toLowerCase() === activeCategory.toLowerCase(),
      );
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);

  return (
    <div className="bg-stone-950 text-white min-h-screen flex flex-col">
      <div className="flex-grow px-[4%] py-24">
        {/* HEADER */}
        <div className="max-w-[1600px] mx-auto mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-white/50 hover:text-[#B58D7C] mb-6 group transition-colors"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="uppercase tracking-[0.2em] text-[10px]">
                Go Back
              </span>
            </button>

            <h1 className="text-4xl md:text-6xl font-serif italic">
              All Accessories
            </h1>

            <p className="text-white/40 mt-4 uppercase tracking-widest text-xs">
              Watches • Shoes • Belts • Cufflinks
            </p>
          </div>
        </div>

        {/* CATEGORY BAR (FROM BACKEND) */}
        <div className="max-w-[1600px] mx-auto mb-12 flex flex-wrap gap-4 border-b border-white/5 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.2em] px-6 py-2 border transition duration-300 ${
                activeCategory === cat
                  ? 'border-[#B58D7C] text-[#B58D7C] bg-[#B58D7C]/5'
                  : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group"
            >
              {/* IMAGE CONTAINER WITH PREMIUM VIEW DETAILS */}
              <div className="relative aspect-[3/4] overflow-hidden mb-4 border border-white/5 bg-stone-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 ease-out"
                />

                {/* REFINED PREMIUM OVERLAY */}
                <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6">
                  <button
                    onClick={() => Navigate(`/accessories/${item.id}`)}
                    className="relative overflow-hidden w-full h-12 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] font-light transition-all duration-500 border border-white/20 backdrop-blur-md hover:border-[#B58D7C] hover:text-[#B58D7C]"
                  >
                    View Details
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <p className="text-[9px] uppercase tracking-widest text-white/30">
                {item.category}
              </p>

              <h3 className="text-lg font-serif italic">{item.name}</h3>

              <p className="text-[#B58D7C] mt-1">
                ৳ {Number(item.price).toLocaleString('en-BD')}
              </p>
            </motion.div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/20 uppercase tracking-widest text-xs">
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
