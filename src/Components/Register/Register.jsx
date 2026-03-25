import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

const IconArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

const Register = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customLocation, setCustomLocation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    interest: '',
    location: 'London - Savile Row'
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imgError, setImgError] = useState(false);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message) => {
    setToast(message);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 3 && password !== confirmPassword) {
      showToast("Verification failed: Passwords do not match.");
      return;
    }
    if (step < 3) setStep(step + 1);
    else handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (formData.email === "admin@trendora.com") {
        throw new Error("This electronic mail is already registered in our archives.");
      }

      console.log("Account Created Locally:", {
        user: formData.email,
        profile: formData,
        timestamp: new Date().toISOString()
      });

      setIsSubmitted(true);
    } catch (err) {
      showToast(err.message || "An error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 rounded-full border border-[#B58D7C] flex items-center justify-center mx-auto mb-10">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
              <IconCheck />
            </motion.div>
          </div>
          <h2 className="text-white text-4xl font-serif italic mb-6">Application Received</h2>
          <p className="text-stone-400 font-light leading-relaxed mb-10">
            Your credentials have been secured. Your request for membership is being reviewed by our atelier. A personal concierge will contact you at <strong>{formData.email}</strong> shortly.
          </p>
          <Link to={'/'} className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B58D7C] hover:text-white transition-colors">
            Return to Entrance
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Toast Notification Simulation */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900 border border-red-900/50 p-4 min-w-[320px] shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="w-1 h-8 bg-red-600" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-bold mb-1">Security Error</p>
                <p className="text-white text-xs font-light">{toast}</p>
              </div>
              <button onClick={() => setToast(null)} className="ml-auto text-stone-500 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left: Atmospheric Panel */}
      <div className="hidden lg:flex lg:w-1/3 relative border-r border-white/5 bg-stone-900/50 flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-stone-950/75 z-10" />
          {!imgError ? (
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale brightness-50 transition-transform duration-[10000ms] hover:scale-110"
              alt="Luxury Fabric"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-stone-900 flex items-center justify-center">
                <div className="text-stone-800 font-serif italic text-8xl opacity-20 select-none">Trendora</div>
            </div>
          )}
        </div>

        <div className="relative z-10">
          <div className="w-12 h-[1px] bg-[#B58D7C] mb-8" />
          <h2 className="text-white text-3xl font-serif italic leading-tight">
            The Bespoke <br /> Partnership
          </h2>
          <p className="text-stone-300 text-sm font-light mt-6 leading-relaxed">
            Joining our atelier is the first step toward a lifetime of precision tailoring and exclusive access to the world's rarest textiles.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`h-1 transition-all duration-500 ${step >= s ? 'w-8 bg-[#B58D7C]' : 'w-4 bg-stone-800'}`}
              />
            ))}
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold">
            Step 0{step} of 03
          </p>
        </div>
      </div>

      {/* Right: Interactive Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-stone-950">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.form 
              key={step}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              onSubmit={nextStep}
              className="space-y-12"
            >
              <header>
                <h3 className="text-[#B58D7C] text-[10px] font-bold tracking-[0.6em] uppercase mb-4">Membership Request</h3>
                <h1 className="text-white text-4xl md:text-5xl font-serif italic">
                  {step === 1 && "Personal Details"}
                  {step === 2 && "Sartorial Profile"}
                  {step === 3 && "Security Settings"}
                </h1>
              </header>

              <div className="space-y-10">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2 group">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">Given Name</label>
                        <input required type="text" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light" placeholder="Alexander" />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">Surname</label>
                        <input required type="text" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light" placeholder="Sterling" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2 group">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">Electronic Mail</label>
                        <input required type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light" placeholder="a.sterling@private.com" />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">Phone Number</label>
                        <input required type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">Primary Address</label>
                      <input required type="text" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light" placeholder="Street, City, Country" />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-6">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 block">Primary Interest</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Bespoke Suits', 'Evening Wear', 'Luxury Accessories', 'Corporate Wardrobe'].map((option) => (
                          <label key={option} className="border border-stone-800 p-4 cursor-pointer hover:border-[#B58D7C] transition-colors group relative">
                            <input 
                                type="radio" 
                                name="interest" 
                                checked={formData.interest === option}
                                onChange={() => handleInputChange('interest', option)}
                                className="hidden peer" 
                                required
                            />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 peer-checked:text-white transition-colors">{option}</span>
                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#B58D7C] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6 group">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">Preferred Location</label>
                      {!customLocation ? (
                        <div className="relative">
                          <select 
                            value={formData.location}
                            onChange={(e) => {
                                if (e.target.value === "Other") setCustomLocation(true);
                                else handleInputChange('location', e.target.value);
                            }}
                            className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light appearance-none cursor-pointer"
                          >
                            <option className="bg-stone-950">London - Savile Row</option>
                            <option className="bg-stone-950">Milan - Via Montenapoleone</option>
                            <option className="bg-stone-950">New York - Fifth Ave</option>
                            <option className="bg-stone-950" value="Other">Write my own location...</option>
                          </select>
                        </div>
                      ) : (
                        <div className="relative">
                          <input 
                            autoFocus
                            type="text" 
                            className="w-full bg-transparent border-b border-stone-800 py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light" 
                            placeholder="Enter your city/region" 
                            onChange={(e) => handleInputChange('location', e.target.value)}
                          />
                          <button 
                            type="button"
                            onClick={() => setCustomLocation(false)}
                            className="absolute right-0 bottom-3 text-[8px] uppercase tracking-widest text-[#B58D7C]"
                          >
                            Select from list
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2 group relative">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">Account Password</label>
                        <div className="relative">
                          <input 
                            required 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-stone-800 py-3 pr-10 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light" 
                            placeholder="••••••••" 
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-600 hover:text-[#B58D7C] transition-colors"
                          >
                            {showPassword ? <IconEyeOff /> : <IconEye />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-500 group-focus-within:text-[#B58D7C] transition-colors">Confirm Password</label>
                        <input 
                          required 
                          type={showPassword ? "text" : "password"} 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full bg-transparent border-b ${password && confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-stone-800'} py-3 text-white focus:outline-none focus:border-[#B58D7C] transition-colors font-light`} 
                          placeholder="••••••••" 
                        />
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 pt-4">
                      <label className="flex items-center space-x-3 cursor-pointer mt-1">
                        <div className="w-4 h-4 border border-stone-800 rounded-sm flex items-center justify-center hover:border-[#B58D7C] transition-colors">
                          <input required type="checkbox" className="hidden peer" />
                          <div className="w-2 h-2 bg-[#B58D7C] opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                      </label>
                      <p className="text-stone-500 text-[10px] uppercase tracking-widest leading-relaxed">
                        I acknowledge that membership is subject to verification and agree to the <a href="#" className="text-white underline underline-offset-4">Terms of the Atelier</a>.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-8 pt-10">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-white text-stone-950 py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#B58D7C] hover:text-white transition-all duration-500 flex items-center justify-center space-x-4"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{step === 3 ? "Complete Registration" : "Continue"}</span>
                      {step < 3 && <IconArrowRight />}
                    </>
                  )}
                </button>
                
                {step > 1 && (
                  <button 
                    type="button" 
                    onClick={() => setStep(step - 1)}
                    className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                )}
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-position: right 0 center; background-repeat: no-repeat; background-size: 1em; }
      `}</style>
    </div>
  );
};

export default Register;