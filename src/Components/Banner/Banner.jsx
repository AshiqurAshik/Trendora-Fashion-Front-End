import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay for premium depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />

        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0"
          className="w-full h-full object-cover"
          alt="Luxury Fashion"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          {/* Tagline */}
          <p className="text-white/70 text-[10px] md:text-xs tracking-[0.6em] uppercase mb-6">
            Heritage Craftsmanship
          </p>

          {/* Heading */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[1] mb-8">
            The Modern <br />
            <span className="font-sans not-italic font-black tracking-tight text-white">
              GENTLEMAN
            </span>
          </h1>

          {/* Divider line (premium touch) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-[1px] bg-white/40 mb-8"
          />

          {/* Actions */}
          <div className="flex items-center gap-8 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white text-white px-8 py-4 text-[11px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              View Collection
            </motion.button>

            {/* Secondary link */}
            <button className="text-white/60 hover:text-white transition text-[11px] tracking-[0.4em] uppercase flex items-center gap-3 group">
              The Story
              <span className="w-8 h-[1px] bg-white/40 group-hover:w-12 transition-all"></span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;