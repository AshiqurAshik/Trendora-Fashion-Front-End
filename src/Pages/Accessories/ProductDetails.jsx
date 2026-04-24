import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RotateCcw, Star, Minus, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { AuthContext as ImportedAuthContext } from '../../Auth/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(ImportedAuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New success state for animation
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`http://localhost:5000/accessories/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => {
        console.log(err);
        toast.error("Failed to load product");
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!user?.email) {
      toast.error("Please login first");
      return;
    }

    if (!product) {
      toast.error("Product not loaded");
      return;
    }

    if (quantity > product.stock) {
      toast.error("Not enough stock");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gmail: user.email,
          product_name: product.name,
          product_image: product.image,
          price: product.price,
          quantity: quantity,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        toast.success("Added to cart 🛒");
        setTimeout(() => setIsSuccess(false), 2000); // Reset success state after 2s
      } else {
        toast.error(data.error || "Failed to add cart");
      }

    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }

    setLoading(false);
  };

  if (!product) {
    return (
      <div className="bg-stone-950 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#B58D7C]/20 border-t-[#B58D7C] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 text-white min-h-screen px-[6%] py-24 selection:bg-[#B58D7C]/30">
      <div className="max-w-7xl mx-auto">
        {/* BACK */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.history.back()}
          className="group flex items-center gap-3 text-white/40 hover:text-[#B58D7C] mb-12 transition-colors duration-300"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest font-light">Back</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] overflow-hidden rounded-sm group shadow-2xl shadow-black/50"
          >
            <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none group-hover:border-[#B58D7C]/30 transition-colors duration-500" />
            <img 
              src={product.image} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              alt={product.name}
            />
            {product.stock <= 0 && (
               <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                  <span className="border border-white/20 px-8 py-3 uppercase tracking-[0.4em] text-xs backdrop-blur-sm">Sold Out</span>
               </div>
            )}
          </motion.div>

          {/* DETAILS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >

            <p className="text-[#B58D7C] uppercase tracking-[0.4em] text-[11px] font-medium">
              {product.category}
            </p>

            <h1 className="text-5xl md:text-6xl font-serif italic mt-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-6">
              <p className="text-[#B58D7C] text-3xl font-light">
                ৳ {Number(product.price).toLocaleString('en-BD')}
              </p>
              <div className="h-4 w-[1px] bg-white/10 mx-2" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < 4 ? "fill-[#B58D7C] text-[#B58D7C]" : "text-white/20"} />
                ))}
                <span className="text-[10px] text-white/30 ml-2 uppercase tracking-tighter">(4.8/5.0)</span>
              </div>
            </div>

            <p className="text-white/50 mt-8 leading-relaxed font-light text-lg">
              {product.description}
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 border-y border-white/5 py-12">
              <Info label="Category" value={product.category} />
              <Info label="Stock" value={product.stock} />
              <Info label="Brand" value={product.brand} />
              <Info label="Material" value={product.material} />
              <Info label="Color" value={product.color} />
              <Info label="Style" value={product.style} />
            </div>

            {/* QUANTITY & ACTIONS */}
            <div className="mt-12 space-y-8">
              <div className="flex items-center gap-6">
                <p className="text-white/40 text-[11px] uppercase tracking-widest font-medium">Quantity</p>

                <div className="flex items-center border border-white/10 rounded-full p-1 bg-white/5">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:text-[#B58D7C] transition-colors rounded-full hover:bg-white/5"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="w-12 text-center text-sm font-medium">{quantity}</span>

                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:text-[#B58D7C] transition-colors rounded-full hover:bg-white/5"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                {product.stock > 0 && (
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">
                    {product.stock} pieces available
                  </span>
                )}
              </div>

              {/* ADD TO CART ACTION WITH ANIMATION */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
                  onClick={handleAddToCart}
                  disabled={loading || product.stock <= 0}
                  className="relative group flex-1 overflow-hidden"
                >
                  <div className={`
                    relative w-full py-5 flex items-center justify-center gap-4 transition-all duration-500 overflow-hidden
                    ${product.stock <= 0 
                      ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                      : isSuccess 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#B58D7C] text-white'
                    }
                  `}>
                    {/* Hover Overlay Layer */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out mix-blend-difference" />

                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" 
                        />
                      ) : isSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Check size={18} />
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="idle"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="flex items-center gap-4"
                        >
                          <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <span className="relative z-10 uppercase tracking-[0.3em] text-[11px] font-semibold">
                      {loading ? "Adding..." : isSuccess ? "Successfully Added" : product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </span>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={18} className="text-[#B58D7C]/60" />
                <span className="text-[9px] uppercase tracking-widest text-white/40">Global Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck size={18} className="text-[#B58D7C]/60" />
                <span className="text-[9px] uppercase tracking-widest text-white/40">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw size={18} className="text-[#B58D7C]/60" />
                <span className="text-[9px] uppercase tracking-widest text-white/40">30 Day Returns</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="group"
  >
    <p className="text-white/20 text-[9px] uppercase tracking-[0.2em] mb-2 font-bold group-hover:text-[#B58D7C] transition-colors">
      {label}
    </p>
    <p className="text-white/70 text-sm font-light tracking-wide border-l border-white/10 pl-3 group-hover:border-[#B58D7C] transition-colors">
      {value || "N/A"}
    </p>
  </motion.div>
);

export default ProductDetails;