import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mocking a slight delay for luxury feel
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Visual/Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-stone-900 items-center justify-center p-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-stone-950/60 z-10" />
          {!imgError ? (
            <img 
              src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale opacity-40 transition-opacity duration-1000"
              alt="Luxury Fabric Detail"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-stone-900 flex items-center justify-center">
               <div className="w-32 h-[1px] bg-white/10" />
            </div>
          )}
        </div>
        
        <div className="relative z-20 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-[1px] w-12 bg-[#B58D7C] mx-auto mb-8" />
            <h2 className="text-white text-3xl font-serif italic max-w-sm mx-auto leading-relaxed">
              Enter the realm of bespoke elegance and timeless craftsmanship.
            </h2>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-stone-950 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <header className="mb-12">
            <h3 className="text-[#B58D7C] text-[10px] font-bold tracking-[0.6em] uppercase mb-4">Client Portal</h3>
            <h1 className="text-white text-4xl font-serif italic">Welcome Back</h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2 group">
              <label className="block text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">
                Email Address
              </label>
              <input 
                type="email" 
                required
                className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light tracking-wide"
                placeholder="email@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2 group relative">
              <label className="block text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">
                Secret Phrase
              </label>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light tracking-wide"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-stone-600 hover:text-white transition-colors"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-4 h-4 border border-stone-800 rounded-sm flex items-center justify-center group-hover:border-[#B58D7C] transition-colors">
                  <input type="checkbox" className="hidden peer" />
                  <div className="w-2 h-2 bg-[#B58D7C] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Remember Me</span>
              </label>
              <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-[#B58D7C] hover:text-white transition-colors">
                Forgotten Credential?
              </a>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-stone-950 py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#B58D7C] hover:text-white transition-all duration-500 mt-8 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center"
                  >
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                ) : (
                  <motion.span 
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Authorize Access
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link to={'/register'} className="text-center text-stone-600 text-[10px] uppercase tracking-[0.2em] pt-8">
              Don't have an account? <a href="#" className="text-white hover:text-[#B58D7C] transition-colors ml-2">Request Membership</a>
            </Link>
          </form>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        input::placeholder { color: rgba(255, 255, 255, 0.1); }
      `}</style>
    </div>
  );
};

export default Login;