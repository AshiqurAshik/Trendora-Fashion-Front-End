import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// Note: In your actual project, ensure the path to AuthContext is correct
import { AuthContext } from '../../Auth/AuthContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Tag,
} from 'lucide-react';
import { Navigate, useNavigate } from 'react-router';

const Cart = () => {
  const { user } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [shipping, setShipping] = useState(60);
  const Navigate = useNavigate();

  // 🔥 FETCH CART BY EMAIL (Restored original logic)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user || !user.email) {
          setLoading(false);
          return;
        }

        setLoading(true);

        const res = await axios.get(`http://localhost:5000/cart/${user.email}`);

        setItems(res.data);
      } catch (err) {
        console.error('❌ Cart fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // 🔥 CALCULATIONS
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = isApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  // 🔥 UPDATE QUANTITY (frontend only as per original request)
  const updateQuantity = async (index, delta) => {
    const item = items[index];
    const newQty = Math.max(1, item.quantity + delta);

    try {
      await axios.put(`http://localhost:5000/cart/update`, {
        gmail: user.email,
        product_name: item.product_name,
        quantity: newQty,
      });

      setItems((prev) =>
        prev.map((it, i) => (i === index ? { ...it, quantity: newQty } : it)),
      );
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  // 🔥 REMOVE ITEM
  const removeItem = async (index) => {
    const item = items[index];

    try {
      await axios.delete(`http://localhost:5000/cart/delete`, {
        data: {
          gmail: user.email,
          product_name: item.product_name,
        },
      });

      setItems((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/60 font-medium tracking-widest animate-pulse uppercase">
            Syncing Cart
          </p>
        </div>
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-black flex flex-col items-center justify-center text-white px-6">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>
          <ShoppingBag className="w-20 h-20 relative z-10 opacity-20" />
        </div>
        <h2 className="text-3xl font-light tracking-tight mb-2 text-center">
          Your bag is empty
        </h2>
        <p className="text-white/40 mb-8 text-center max-w-sm">
          No products found for your account. Start exploring our latest
          collections.
        </p>
        <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-colors">
          Browse Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end mt-10 justify-between mb-12 border-b border-white/10 pb-10 relative">
          <div className="relative">
            {/* Background Accent - Soft glow */}
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] -z-10" />

            <div className="flex items-center gap-4 mb-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-purple-500 to-transparent"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Current Order
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              My Selection
            </h1>
          </div>

          <div className="mt-8 md:mt-0 flex items-center group cursor-default">
            <div className="relative flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl transition-all duration-300 ease-out hover:scale-[1.02] hover:border-white/20">
              {/* Badge */}
              <div className="relative">
                <span className="flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 w-8 h-8 rounded-lg text-white font-bold text-sm shadow-lg shadow-purple-500/20">
                  {items.length}
                </span>
                {/* Subtle pulse for the count */}
                <span className="absolute inset-0 rounded-lg bg-purple-500 animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></span>
              </div>

              <div className="flex flex-col">
                <span className="text-white/90 font-semibold text-sm leading-none mb-1">
                  Items in bag
                </span>
              </div>

              <div className="ml-2 pl-4 border-l border-white/10 text-white/40 group-hover:text-white/80 transition-colors">
                <ShoppingBag size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* ITEMS LIST */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 rounded-2xl overflow-hidden p-4 md:p-6 flex flex-col md:flex-row gap-6"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="relative w-full md:w-32 h-32 flex-shrink-0 bg-neutral-900 rounded-xl overflow-hidden">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* INFO & CONTROLS */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-semibold tracking-tight group-hover:text-white transition-colors">
                          {item.product_name}
                        </h2>

                        <p className="text-white/40 text-xs mt-1">
                          Size:{' '}
                          <span className="text-white">
                            {item.size || 'N/A'}
                          </span>
                        </p>
                      </div>
                      <p className="text-lg font-bold tabular-nums">
                        ৳{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 md:mt-0">
                      <div className="flex items-center gap-1 bg-black border border-white/10 rounded-full p-0.5">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-medium tabular-nums text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[9px] uppercase tracking-widest text-white/40">
                            Item Total
                          </p>
                          <p className="font-bold tabular-nums">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="p-2 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex gap-4 items-center">
                <Truck size={20} className="text-white/40" />
                <div>
                  <h3 className="text-sm font-semibold">Standard Shipping</h3>
                  <p className="text-xs text-white/40">
                    Delivered within 3-5 business days
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex gap-4 items-center">
                <ShieldCheck size={20} className="text-white/40" />
                <div>
                  <h3 className="text-sm font-semibold">Buyer Protection</h3>
                  <p className="text-xs text-white/40">
                    Your purchase is safe with us
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY PANEL */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-6 tracking-tight">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center text-white/60">
                    <span>Subtotal</span>
                    <span className="font-medium text-white tabular-nums">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-start text-white/60">
                    <span>Shipping</span>

                    <div className="flex flex-col items-end gap-3">
                      <span className="font-medium text-white tabular-nums">
                        ৳{shipping}
                      </span>

                      {/* Premium toggle buttons */}
                      <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
                        <button
                          onClick={() => setShipping(60)}
                          className={`px-4 py-1.5 text-[10px] uppercase tracking-widest rounded-lg transition-all duration-200 ${
                            shipping === 60
                              ? 'bg-white text-black font-bold'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Inside Dhaka
                        </button>

                        <button
                          onClick={() => setShipping(100)}
                          className={`px-4 py-1.5 text-[10px] uppercase tracking-widest rounded-lg transition-all duration-200 ${
                            shipping === 100
                              ? 'bg-white text-black font-bold'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Outside Dhaka
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-white/60"></div>

                  {isApplied && (
                    <div className="flex justify-between items-center text-green-400 font-medium">
                      <div className="flex items-center gap-2 text-xs">
                        <Tag size={12} />
                        <span>PROMO APPLIED</span>
                      </div>
                      <span className="tabular-nums">
                        -৳{discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="my-6 border-t border-white/10 pt-6">
                  <div className="flex justify-between items-end">
                    <span className="text-white/60 font-medium text-sm">
                      Grand Total
                    </span>
                    <span className="text-3xl font-bold tracking-tighter tabular-nums">
                      ৳
                      {total.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>

                {/* PROMO CODE */}
                <div className="mt-8">
                  <div className="flex gap-2">
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-black border border-white/10 rounded-lg py-3 px-4 text-xs focus:outline-none focus:border-white/40 transition-colors uppercase tracking-widest"
                      placeholder="Promo Code"
                    />
                    <button
                      onClick={() => setIsApplied(true)}
                      disabled={!promoCode}
                      className="px-4 rounded-lg bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-700 disabled:opacity-30 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* CHECKOUT BUTTON */}
                <button className="group relative w-full mt-8 bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:bg-neutral-200">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Complete Order <ChevronRight size={14} />
                  </span>
                </button>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-20 grayscale">
                  <CreditCard size={20} />
                  <div className="h-4 w-8 bg-white rounded-sm" />
                  <div className="h-4 w-8 bg-white rounded-sm" />
                </div>
              </div>

              <button
                onClick={() => Navigate('/')}
                className="w-full flex items-center justify-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <ArrowLeft size={14} />
                <span> Return to Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
