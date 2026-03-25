import React from 'react';

// Inline SVG Icons
const IconInstagram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const IconFacebook = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IconTwitter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3.1 17 1.7 14.8 1.3 12c.9.1 1.8.1 2.6-.1-2.9-1.3-4-5-3.9-7.1 1.1.6 2.2.9 3.4.9C1.1 4.8 1.5 1.5 3.3.3c3.2 3.8 7.9 6.2 13 6.6.1-1 .5-2 1.3-2.8 2-2 5.3-2 7.2.1 1.1-.2 2.1-.7 3-1.3-.4 1.2-1.2 2.2-2.3 2.8 1-.1 1.9-.4 2.8-.8-.7 1.1-1.6 2-2.6 2.7z" />
  </svg>
);
const IconHome = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconCart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);
const IconTag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
);
const IconPhone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Mock Logo
const LogoPlaceholder = () => (
  <div className="text-xl font-light tracking-[0.5em] text-white">
    TREND<span className="font-bold">ORA</span>
    <p className="text-[7px] tracking-[0.8em] uppercase opacity-40 -mt-1">
      Homme Atelier
    </p>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-white py-20 border-t border-white/5 font-sans">
      <div className="w-[92%] max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {/* Brand */}
        <div className="flex flex-col items-start space-y-6">
          <LogoPlaceholder />
          <p className="text-[11px] leading-relaxed tracking-wider text-white/40 max-w-xs uppercase font-medium">
            Defining the modern silhouette through heritage craftsmanship and
            uncompromising luxury.
          </p>
        </div>

        {/* Links */}
        <div className="md:justify-self-center">
          <h4 className="text-[10px] font-black mb-8 uppercase tracking-[0.5em] text-[#B58D7C]">
            Navigation
          </h4>
          <ul className="space-y-4">
            {[
              { name: 'Collections' },
              { name: 'Tailoring' },
              { name: 'Accessories' },
              { name: 'The Heritage' },
            ].map((link) => (
              <li key={link.name}>
                <button className="group flex items-center space-x-3 transition-all duration-500 hover:pl-2 text-white/40 hover:text-white">
                  <span className="opacity-50 group-hover:text-[#B58D7C] transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                    {link.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Legal */}
        <div className="md:text-right flex flex-col md:items-end">
          <h4 className="text-[10px] font-black mb-8 uppercase tracking-[0.5em] text-[#B58D7C]">
            Connect
          </h4>
          <ul className="flex space-x-6 mb-12">
            {[IconInstagram, IconFacebook, IconTwitter].map((Icon, idx) => (
              <li
                key={idx}
                className="text-white/40 hover:text-[#B58D7C] cursor-pointer transition-all duration-500 hover:-translate-y-1"
              >
                <Icon />
              </li>
            ))}
          </ul>
          <div className="pt-8 border-t border-white/5 w-full md:w-auto">
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-bold">
              &copy; 2026 Trendora Maison. <br className="md:hidden" /> All
              Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
