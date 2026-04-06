import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tailoring = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    preference: 'Full Bespoke Suit',
    styleNote: 'Modern Classic',
    message: ''
  });

  const steps = [
    {
      no: "01",
      title: "The Consultation",
      desc: "An intimate dialogue at our Savile Row atelier to understand your lifestyle, preferences, and the architecture of your silhouette.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
    },
    {
      no: "02",
      title: "Fabric Selection",
      desc: "Choose from over 5,000 seasonal cloths, including rare vicuña, ultra-fine merinos, and exclusive English silks.",
      image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800"
    },
    {
      no: "03",
      title: "The First Fitting",
      desc: "The 'baste' fitting. A skeletal version of your suit is hand-stitched to perfect the balance and drape before the final construction.",
      image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const formSteps = [
    { id: 1, label: "Identity" },
    { id: 2, label: "Style" },
    { id: 3, label: "Appointment" },
    { id: 4, label: "Preferences" },
    { id: 5, label: "Review" }
  ];

  const getFormattedDate = () => {
    if (!formState.date) return { day: '--', month: 'SELECT', year: '----' };
    const d = new Date(formState.date);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      day: d.getDate().toString().padStart(2, '0'),
      month: months[d.getMonth()],
      year: d.getFullYear()
    };
  };

  const dateDisplay = getFormattedDate();

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen selection:bg-[#B58D7C] selection:text-white font-sans overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@100;300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #B58D7C30; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #B58D7C60; }

        .premium-date-input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          z-index: 10;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .premium-date-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(181, 141, 124, 0.15);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .premium-date-card:hover {
          border-color: rgba(181, 141, 124, 0.5);
          background: rgba(181, 141, 124, 0.03);
          transform: translateY(-2px);
        }
      `}} />
      
      {/* Hero Banner - Single Image Layout */}
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover scale-105"
            alt="Tailored Navy Suit Detail"
          />
          {/* Layered gradients for depth and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-[92%] max-w-[1600px] mx-auto pt-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="text-[#B58D7C] text-[11px] font-bold tracking-[0.8em] uppercase mb-8 flex items-center">
              <span className="w-12 h-[1px] bg-[#B58D7C] mr-4"></span>
              The Art of Bespoke
            </p>
            <h1 className="text-6xl md:text-9xl font-serif italic leading-[0.85] mb-12">
              Bespoke <br /> 
              <span className="font-sans not-italic font-black tracking-tighter text-white/90 uppercase block mt-4">Artistry.</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-12 mt-16">
              <p className="text-white/60 text-sm leading-loose max-w-md tracking-wide font-light">
                At Trendora, tailoring is not a service; it is a ritual. Every garment is hand-cut and sewn in-house, requiring over 80 hours of meticulous labor by master artisans.
              </p>
              <div className="hidden md:block w-[1px] h-24 bg-white/10"></div>
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#B58D7C] font-bold">Location</span>
                <span className="text-sm font-serif italic">Savile Row, London</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-30"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] [writing-mode:vertical-rl]">Explore Process</span>
          <div className="w-[1px] h-12 bg-white"></div>
        </motion.div>
      </section>

      {/* The Process Grid */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="w-[92%] max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 space-y-6 md:space-y-0">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif italic tracking-tight">The Three Fittings</h2>
              <p className="text-white/40 text-xs uppercase tracking-widest">A journey from measurement to masterpiece</p>
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#B58D7C] font-bold border border-[#B58D7C]/20 px-6 py-3">Standard Delivery: 8-12 Weeks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-20">
            {steps.map((step, i) => (
              <motion.div 
                key={step.no}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden mb-8 aspect-[4/5] rounded-sm">
                  <img 
                    src={step.image}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    alt={step.title}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <span className="absolute top-6 left-6 text-6xl font-black text-white/10 tracking-tighter">{step.no}</span>
                </div>
                <h3 className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#B58D7C] mb-4">{step.title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed font-light">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Section */}
      <section className="py-40 px-[6%] border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-serif italic">The Atelier Service.</h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-md">
                Every bespoke appointment is an individual experience. Our master tailors ensure that every detail—from the pitch of the sleeve to the roll of the lapel—is calibrated to your specific posture and preference.
              </p>
            </div>
            <div className="grid grid-cols-12 gap-4 h-[600px]">
              <div className="col-span-7 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover rounded-sm border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Tailor making adjustments during a fitting"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-4 h-full pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-1/2 object-cover rounded-sm border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Suited Cuff Detail"
                />
                <div className="h-1/2 border border-[#B58D7C]/30 flex flex-col justify-center p-8 bg-[#B58D7C]/5">
                   <p className="text-[10px] uppercase tracking-[0.4em] text-[#B58D7C] mb-4">Quality Pledge</p>
                   <p className="text-lg font-serif italic text-white/80 leading-snug">"The difference between a suit and a masterpiece lies in the last 10% of hand-work."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#0f0f0f] border border-white/5 p-8 md:p-12 lg:p-20 rounded-sm relative shadow-2xl overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#B58D7C]/5 rounded-full blur-[100px]"></div>
            
            <div className="flex justify-between items-center mb-20 border-b border-white/5 pb-10">
              {formSteps.map((s) => (
                <div key={s.id} className="flex flex-col items-center space-y-3 relative group">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${currentStep >= s.id ? 'bg-[#B58D7C] scale-125 shadow-[0_0_15px_rgba(181,141,124,0.5)]' : 'bg-white/10'}`}></div>
                  <span className={`text-[8px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${currentStep === s.id ? 'text-[#B58D7C]' : 'text-white/20'}`}>
                    {s.label}
                  </span>
                  {s.id < 5 && <div className={`absolute top-[4px] left-[100%] w-[calc(100%-16px)] h-[1px] transition-colors duration-700 ${currentStep > s.id ? 'bg-[#B58D7C]/40' : 'bg-white/5'}`}></div>}
                </div>
              ))}
            </div>

            <div className="min-h-[420px]">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <div className="w-24 h-24 border border-[#B58D7C] rounded-full flex items-center justify-center mx-auto mb-10">
                    <svg className="w-10 h-10 text-[#B58D7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-4xl font-serif italic mb-6">Request Transmitted.</h3>
                  <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase max-w-xs mx-auto leading-[2.5]">Our lead concierge will contact you shortly to finalize your invitation.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: IDENTITY */}
                    {currentStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                        <div className="space-y-4">
                          <h4 className="text-[10px] uppercase tracking-[0.8em] text-[#B58D7C] font-bold">Step 01 / Identity</h4>
                          <h3 className="text-4xl font-serif italic">Bespoke Guest Details.</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-3">
                            <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Full Name</label>
                            <input required type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-base focus:border-[#B58D7C] outline-none transition-colors uppercase tracking-widest font-light" placeholder="Ex: ALEXANDER VANCE" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Direct Line</label>
                            <input required type="tel" className="w-full bg-transparent border-b border-white/10 py-4 text-base focus:border-[#B58D7C] outline-none transition-colors font-light" placeholder="+44 --- ---- ---" value={formState.phone} onChange={(e) => setFormState({...formState, phone: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Electronic Mail</label>
                          <input required type="email" className="w-full bg-transparent border-b border-white/10 py-4 text-base focus:border-[#B58D7C] outline-none transition-colors italic font-light" placeholder="concierge@trendora.com" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: STYLE */}
                    {currentStep === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                        <div className="space-y-4">
                          <h4 className="text-[10px] uppercase tracking-[0.8em] text-[#B58D7C] font-bold">Step 02 / Style</h4>
                          <h3 className="text-4xl font-serif italic">The Preferred Cut.</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['Full Bespoke Suit', 'Evening Tuxedo', 'Casual Luxury', 'Executive Wardrobe'].map(opt => (
                            <button key={opt} type="button" onClick={() => setFormState({...formState, preference: opt})} className={`p-8 text-left border rounded-sm transition-all duration-700 ${formState.preference === opt ? 'border-[#B58D7C] bg-[#B58D7C]/10' : 'border-white/5 hover:border-white/20'}`}>
                              <span className={`text-[10px] uppercase tracking-[0.4em] font-bold block ${formState.preference === opt ? 'text-[#B58D7C]' : 'text-white/40'}`}>{opt}</span>
                            </button>
                          ))}
                        </div>
                        <div className="space-y-3 pt-4">
                          <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Style Direction</label>
                          <select className="w-full bg-transparent border-b border-white/10 py-4 text-base focus:border-[#B58D7C] outline-none appearance-none cursor-pointer font-light" value={formState.styleNote} onChange={(e) => setFormState({...formState, styleNote: e.target.value})}>
                            <option value="Modern Classic" className="bg-[#0f0f0f]">Modern Classic</option>
                            <option value="Traditional English" className="bg-[#0f0f0f]">Traditional English</option>
                            <option value="Contemporary Minimal" className="bg-[#0f0f0f]">Contemporary Minimal</option>
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: APPOINTMENT */}
                    {currentStep === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                        <div className="space-y-4">
                          <h4 className="text-[10px] uppercase tracking-[0.8em] text-[#B58D7C] font-bold">Step 03 / Appointment</h4>
                          <h3 className="text-4xl font-serif italic">The Golden Hour.</h3>
                        </div>

                        <div className="relative group pt-6">
                          <div className="premium-date-card p-10 md:p-14 relative flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex items-baseline space-x-6">
                              <div className="flex flex-col items-center">
                                <span className="text-[10px] tracking-[0.3em] text-[#B58D7C] font-black mb-2">DD</span>
                                <span className="text-7xl md:text-8xl font-sans font-thin tracking-tighter text-white/90">{dateDisplay.day}</span>
                              </div>
                              <div className="h-16 w-px bg-white/10 self-center"></div>
                              <div className="flex flex-col">
                                <span className="text-[10px] tracking-[0.3em] text-[#B58D7C] font-black mb-2">MM</span>
                                <span className="text-4xl md:text-5xl font-serif italic">{dateDisplay.month}</span>
                              </div>
                              <div className="flex flex-col pl-4">
                                <span className="text-[10px] tracking-[0.3em] text-white/20 font-black mb-2">YYYY</span>
                                <span className="text-xl font-sans font-light tracking-[0.2em] text-white/40">{dateDisplay.year}</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-center md:items-end space-y-4">
                              <div className="w-16 h-16 rounded-full border border-[#B58D7C]/40 flex items-center justify-center group-hover:scale-110 group-hover:border-[#B58D7C] transition-all duration-700 bg-black shadow-[0_0_30px_rgba(181,141,124,0.1)]">
                                <svg className="w-6 h-6 text-[#B58D7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className="text-[9px] uppercase tracking-[0.5em] text-[#B58D7C] font-bold">Modify Invitation</span>
                            </div>

                            <input 
                              required 
                              type="date" 
                              className="premium-date-input" 
                              value={formState.date} 
                              onChange={(e) => setFormState({...formState, date: e.target.value})} 
                            />
                          </div>

                          <div className="mt-10 flex items-start space-x-6 px-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#B58D7C] mt-1.5"></div>
                            <p className="text-[11px] leading-relaxed text-white/40 font-light tracking-wide italic">
                              Bespoke fittings are exclusive and require confirmation. Please select your preferred commencement date for the initial consultation.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: PREFERENCES */}
                    {currentStep === 4 && (
                      <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                        <div className="space-y-4">
                          <h4 className="text-[10px] uppercase tracking-[0.8em] text-[#B58D7C] font-bold">Step 04 / Preferences</h4>
                          <h3 className="text-4xl font-serif italic">A Personal Touch.</h3>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Special Requirements & Occasions</label>
                          <textarea rows="4" className="w-full bg-transparent border border-white/10 p-8 text-base focus:border-[#B58D7C] outline-none transition-colors resize-none font-light leading-relaxed rounded-sm" placeholder="Tell us about the purpose of your garment..." value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 5: REVIEW */}
                    {currentStep === 5 && (
                      <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                        <div className="space-y-4">
                          <h4 className="text-[10px] uppercase tracking-[0.8em] text-[#B58D7C] font-bold">Step 05 / Review</h4>
                          <h3 className="text-4xl font-serif italic">Final Confirmation.</h3>
                        </div>
                        <div className="space-y-8 border-y border-white/5 py-10">
                          <div className="flex justify-between items-baseline group">
                            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Guest Identity</span>
                            <span className="text-sm font-bold tracking-[0.2em] group-hover:text-[#B58D7C] transition-colors">{formState.name || 'ANONYMOUS'}</span>
                          </div>
                          <div className="flex justify-between items-baseline group">
                            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Date Requested</span>
                            <span className="text-sm font-bold tracking-[0.2em]">{formState.date || 'PENDING'}</span>
                          </div>
                          <div className="flex justify-between items-baseline group">
                            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Requested Service</span>
                            <span className="text-sm italic font-serif text-[#B58D7C]">{formState.preference} — {formState.styleNote}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center space-x-6 pt-12 border-t border-white/5">
                    {currentStep > 1 && (
                      <button type="button" onClick={handleBack} className="px-10 py-6 border border-white/10 text-[10px] uppercase tracking-[0.5em] font-black hover:bg-white/5 transition-all">Back</button>
                    )}
                    {currentStep < 5 ? (
                      <button type="button" onClick={handleNext} className="flex-1 py-6 bg-[#B58D7C] text-black text-[10px] uppercase font-black tracking-[0.6em] hover:bg-[#a37e6f] transition-all relative group overflow-hidden">Next Stage</button>
                    ) : (
                      <button type="submit" disabled={isSubmitting} className="flex-1 py-6 bg-[#B58D7C] text-black text-[10px] uppercase font-black tracking-[0.6em] hover:bg-[#a37e6f] transition-all disabled:opacity-50">{isSubmitting ? 'Transmitting...' : 'Confirm Consultation'}</button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <div className="pb-32 pt-20 flex flex-col items-center justify-center space-y-8 bg-gradient-to-b from-transparent to-[#050505]">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-[#B58D7C] to-transparent"></div>
        <div className="text-center space-y-4">
          <p className="text-[11px] uppercase tracking-[1em] text-white/20">Established MMXXIV</p>
          <p className="text-4xl font-serif italic text-white/90 tracking-tighter">Trendora Homme Atelier</p>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#B58D7C] font-bold">The Pinnacle of Sartorial Craft</p>
        </div>
      </div>
    </div>
  );
};

export default Tailoring;