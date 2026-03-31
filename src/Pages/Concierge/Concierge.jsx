import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const IconMapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const Concierge = () => {
  const [formState, setFormState] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ateliers = [
    { city: "London", address: "No. 12 Savile Row, Mayfair", phone: "+44 20 7946 0123" },
    { city: "Milan", address: "Via Montenapoleone, 8", phone: "+39 02 1234 5678" },
    { city: "Tokyo", address: "6-Chome Ginza, Chuo City", phone: "+81 3 5555 0192" },
    { city: "New York", address: "Madison Avenue, 66th St", phone: "+1 212 555 0198" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };
  

  return (
    <div className="bg-stone-950 text-white min-h-screen selection:bg-[#B58D7C] selection:text-white pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        input, textarea, select {
          background: transparent;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          width: 100%;
          padding: 1rem 0;
          font-size: 0.875rem;
          color: white;
          transition: border-color 0.3s ease;
        }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #B58D7C;
        }
        label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.4);
          font-weight: 700;
        }
      `}</style>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-[4%]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[#B58D7C] text-[11px] font-bold tracking-[0.8em] uppercase mb-10">Private Client Services</p>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-[0.85] mb-8">
              At Your <br />
              <span className="font-sans not-italic font-black text-white/90 uppercase tracking-tighter">Command.</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pb-4"
          >
            <p className="text-white/40 text-sm leading-loose max-w-md tracking-wide">
              Whether you require a personal fitting in your residence or a private viewing of our latest fabrics, our concierge team is dedicated to orchestrating every detail of your sartorial journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Interaction Area */}
      <section className="py-24 px-[4%] border-y border-white/5 bg-[#0C0C0C]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Appointment Form */}
          <div className="lg:col-span-7">
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col justify-center items-center text-center space-y-6 py-20 border border-white/5 bg-white/5"
              >
                <div className="w-16 h-16 rounded-full border border-[#B58D7C] flex items-center justify-center text-[#B58D7C]">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-2xl font-serif italic">Inquiry Received</h3>
                <p className="text-white/40 text-xs tracking-widest uppercase">A representative will contact you within 4 hours.</p>
                <button onClick={() => setFormState('idle')} className="text-[10px] uppercase tracking-widest text-[#B58D7C] underline pt-4">Send another message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-2">
                    <label>Full Name</label>
                    <input type="text" placeholder="ALEXANDER STERLING" required />
                  </div>
                  <div className="space-y-2">
                    <label>Service Requested</label>
                    <select>
                      <option>BESPOKE FITTING</option>
                      <option>FABRIC CONSULTATION</option>
                      <option>WARDROBE AUDIT</option>
                      <option>WEDDING ATELIER</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-2">
                    <label>Preferred Atelier</label>
                    <select>
                      <option>SAVILE ROW, LONDON</option>
                      <option>MONTENAPOLEONE, MILAN</option>
                      <option>GINZA, TOKYO</option>
                      <option>MADISON AVE, NYC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label>Email Address</label>
                    <input type="email" placeholder="A.STERLING@DOMAIN.COM" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label>Additional Notes</label>
                  <textarea rows="4" placeholder="PLEASE DETAIL ANY SPECIFIC REQUIREMENTS OR TIMELINES..."></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.6em] hover:bg-[#B58D7C] hover:text-white transition-all duration-500"
                >
                  {formState === 'submitting' ? 'Processing...' : 'Request Consultation'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Directory */}
          <div className="lg:col-span-5 space-y-20">
            <div>
              <h2 className="text-2xl font-serif italic mb-8">Global Ateliers</h2>
              <div className="space-y-10">
                {ateliers.map((shop, i) => (
                  <motion.div 
                    key={shop.city}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex justify-between items-start pb-6 border-b border-white/5 last:border-0"
                  >
                    <div>
                      <h4 className="text-[12px] font-bold tracking-[0.2em] uppercase mb-2 group-hover:text-[#B58D7C] transition-colors">{shop.city}</h4>
                      <p className="text-white/30 text-[11px] leading-relaxed flex items-center gap-2">
                        <IconMapPin /> {shop.address}
                      </p>
                    </div>
                    <a href={`tel:${shop.phone.replace(/\s/g, '')}`} className="text-white/20 hover:text-white transition-colors">
                      <IconPhone />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-white/[0.02] border border-white/5">
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#B58D7C] mb-4">Direct Access</h4>
              <p className="text-sm font-light text-white/60 mb-6 leading-loose">
                For immediate assistance or travel-related fittings, please call our 24/7 client line.
              </p>
              <p className="text-xl font-serif italic">+44 (0) 20 7000 0000</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Identity */}
      <footer className="py-24 text-center">
        <div className="mb-12 opacity-10">
           <span className="text-2xl font-light tracking-[0.5em]">TREND<span className="font-bold">ORA</span></span>
        </div>
        <p className="text-[9px] tracking-[1em] uppercase text-white/20 font-bold">World Class Tailoring &bull; Defined by You</p>
      </footer>
    </div>
  );
};

export default Concierge;