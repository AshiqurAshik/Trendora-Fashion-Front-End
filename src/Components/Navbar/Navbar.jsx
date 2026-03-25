import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

/* ICONS */
const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
    <circle cx="9" cy="21" r="1.5" />
    <circle cx="18" cy="21" r="1.5" />
    <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 1.95-1.57L23 6H6" />
  </svg>
);

const IconMenu = () => (
  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="1.5">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const IconX = () => (
  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Collections", path: "/" },
    { name: "Tailoring", path: "/tailoring" },
    { name: "Accessories", path: "/accessories" },
    { name: "Heritage", path: "/heritage" },
    { name: "Concierge", path: "/concierge" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-stone-950/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="h-[80px] flex items-center">
          <div className="w-[92%] max-w-[1400px] mx-auto flex items-center justify-between">

            {/* LOGO */}
            <NavLink to="/" className="flex flex-col leading-none">
              <span className="text-white text-lg md:text-xl tracking-[0.5em] font-light">
                TREND<span className="font-bold">ORA</span>
              </span>
              <span className="text-[7px] tracking-[0.8em] uppercase text-white/40 mt-1">
                Homme Atelier
              </span>
            </NavLink>

            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex items-center gap-12 text-[11px] uppercase tracking-[0.3em] font-semibold">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition duration-300 ${
                        isActive ? "text-white" : "text-white/50"
                      } group-hover:text-white`
                    }
                  >
                    {link.name}
                  </NavLink>

                  {/* ACTIVE + HOVER UNDERLINE */}
                  <NavLink to={link.path}>
                    {({ isActive }) => (
                      <span
                        className={`absolute -bottom-2 left-0 h-[1px] bg-white transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* RIGHT */}
            <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em]">
              <NavLink
                to="/login"
                className="text-white/50 hover:text-white transition"
              >
                Sign In
              </NavLink>

              <button className="relative">
                <motion.div whileHover={{ scale: 1.15 }}>
                  <IconCart />
                </motion.div>

                <span className="absolute -top-1 -right-2 bg-white text-black text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
            </div>

            {/* MOBILE BUTTON */}
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-40 flex flex-col justify-between py-20"
          >
            {/* TOP SPACE */}
            <div />

            {/* VERTICAL NAV (CENTERED) */}
            <div className="flex flex-col items-center space-y-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-3xl font-serif italic transition ${
                      isActive ? "text-white" : "text-white/50"
                    } hover:text-white`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* BOTTOM */}
            <div className="text-center text-white/40 text-xs tracking-widest">
              © TRENDORA
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;