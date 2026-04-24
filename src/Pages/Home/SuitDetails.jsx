import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from './../../Auth/AuthContext';

// --- Icons ---
const IconArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// --- Sub-components ---
const SizeChartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeData = [
    { label: 'S', chest: '88-92', waist: '76-80', sleeve: '61' },
    { label: 'M', chest: '93-97', waist: '81-85', sleeve: '63' },
    { label: 'L', chest: '98-102', waist: '86-90', sleeve: '65' },
    { label: 'XL', chest: '103-107', waist: '91-95', sleeve: '67' },
    { label: 'XXL', chest: '108-112', waist: '96-100', sleeve: '69' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl overflow-hidden rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-white/5">
          <div>
            <h3 className="text-xl font-serif italic text-white">Size Guide</h3>
            <p className="text-[10px] uppercase tracking-widest text-[#B58D7C] mt-1 font-bold">
              Measurements in Centimeters
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <IconClose />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">
                  Size
                </th>
                <th className="py-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">
                  Chest
                </th>
                <th className="py-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">
                  Waist
                </th>
                <th className="py-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">
                  Sleeve
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-white/70">
              {sizeData.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 font-bold text-[#B58D7C]">{row.label}</td>
                  <td className="py-4">{row.chest}</td>
                  <td className="py-4">{row.waist}</td>
                  <td className="py-4">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="space-y-4 pt-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
              How to Measure
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[12px] leading-relaxed text-white/40 italic">
              <div>
                <span className="text-[#B58D7C] font-bold block mb-1">
                  Chest
                </span>
                Measure around the fullest part of your chest, keeping the tape
                horizontal.
              </div>
              <div>
                <span className="text-[#B58D7C] font-bold block mb-1">
                  Waist
                </span>
                Measure around your natural waistline, inline with your navel.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/60 hover:text-white"
          >
            Close Guide
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---
const SuitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

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
    { label: 'Fabric', value: product.fabric },
    { label: 'Fit', value: product.fit },
    { label: 'Origin', value: product.origin },
    { label: 'Construction', value: product.construction },
  ];

  const handleAddToCart = async () => {
    try {
      const cartData = {
        gmail: user?.email,
        product_name: product.name,
        product_image: product.image,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
      };

      const res = await axios.post('http://localhost:5000/cart/add', cartData);

      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 2000);
    } catch (error) {
      console.error('❌ CART ERROR:', error.response?.data || error);
    }
  };

  const stockCount = product.stock || 0;
  const isLowStock = stockCount > 0 && stockCount <= 5;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#e5e5e5] selection:bg-[#B58D7C]/30 font-sans">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Main Page Scrollbar */
            ::-webkit-scrollbar {
              width: 4px;
            }
            ::-webkit-scrollbar-track {
              background: #0a0a0a;
            }
            ::-webkit-scrollbar-thumb {
              background: #B58D7C20;
              border-radius: 10px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #B58D7C50;
            }

            /* Modal Inner Scrollbar */
            .custom-scrollbar::-webkit-scrollbar {
              width: 2px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #B58D7C40;
            }
          `,
        }}
      />

      <AnimatePresence>
        {isSizeChartOpen && (
          <SizeChartModal
            isOpen={isSizeChartOpen}
            onClose={() => setIsSizeChartOpen(false)}
          />
        )}
      </AnimatePresence>

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
            TRENDORA
          </div>
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
                  {product.category} • Signature Line
                </span>

                <h1 className="text-5xl md:text-6xl font-serif italic text-white leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl font-light text-[#B58D7C]">
                      ৳ {Number(product.price).toLocaleString()}
                    </span>
                    <span className="text-xs text-white/30 tracking-widest uppercase italic">
                      Vat inclusive
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        stockCount > 0
                          ? isLowStock
                            ? 'bg-orange-500 animate-pulse'
                            : 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                      {stockCount > 0
                        ? isLowStock
                          ? `Only ${stockCount} Left`
                          : 'Available'
                        : 'Out of Stock'}
                    </span>
                  </div>
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
                      {spec.value || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div className="space-y-5">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
                    Select Size
                  </p>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-[9px] uppercase tracking-[0.2em] text-[#B58D7C] font-bold border-b border-[#B58D7C]/30 hover:border-[#B58D7C] transition-all"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Label */}
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
                    Quantity
                  </p>

                  {/* Counter */}
                  <div className="flex items-center border border-white/10 rounded-sm overflow-hidden bg-white/[0.02]">
                    {/* Minus */}
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="px-4 py-2 text-white/50 hover:text-white hover:bg-white/5 transition active:scale-95"
                    >
                      −
                    </button>

                    {/* Value */}
                    <span className="px-4 text-sm text-white font-medium tracking-wide">
                      {quantity}
                    </span>

                    {/* Plus */}
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-4 py-2 text-white/50 hover:text-white hover:bg-white/5 transition active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.available_sizes?.split(',').map((size) => {
                    const cleanSize = size.trim();
                    return (
                      <button
                        key={cleanSize}
                        onClick={() => setSelectedSize(cleanSize)}
                        className={`min-w-[64px] h-12 flex items-center justify-center text-xs transition-all rounded-sm border ${
                          selectedSize === cleanSize
                            ? 'border-[#B58D7C] bg-[#B58D7C] text-black font-bold'
                            : 'border-white/10 text-white/50 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {cleanSize}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-6">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || isAdding || stockCount === 0}
                  className={`relative w-full py-5 rounded-sm font-bold uppercase tracking-[0.4em] text-[11px] overflow-hidden group transition-all duration-300 ${
                    !selectedSize || stockCount === 0
                      ? 'bg-white/5 text-white/20 cursor-not-allowed'
                      : 'bg-[#B58D7C] text-black hover:bg-[#a37e6f] active:scale-[0.98]'
                  }`}
                >
                  {/* Shine Effect */}
                  {!(!selectedSize || stockCount === 0) && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  )}

                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2 relative z-10"
                      >
                        <IconCheck /> Item Added
                      </motion.div>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative z-10"
                      >
                        {stockCount === 0
                          ? 'Unavailable'
                          : selectedSize
                            ? 'Add to Wardrobe'
                            : 'Select a Size'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={() => navigate('/tailoring')}
                  className="relative w-full py-5 border border-white/10 rounded-sm text-white/60 font-bold uppercase tracking-[0.4em] text-[11px] overflow-hidden group hover:text-white transition-all duration-300"
                >
                  {/* Subtle Hover Glow */}
                  <span className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition"></span>

                  <span className="relative z-10">Book Private Fitting</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Signature Line */}
        <div className="mt-24 pt-12 border-t border-white/[0.03] flex flex-col items-center justify-center space-y-6 opacity-60">
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-[#B58D7C]/50 to-transparent"></div>
          <div className="text-center space-y-2">
            <p className="text-[10px] uppercase tracking-[0.8em] text-white/40">
              Established MMXXIV
            </p>
            <p className="text-2xl font-serif italic text-white/80 tracking-tighter">
              Trendora Atelier
            </p>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#B58D7C]">
              Defining the Modern Gentleman
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuitDetails;
