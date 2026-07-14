import React from 'react';
import { Link } from 'react-router-dom';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/alghaarib21' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Vimeo', href: '#' },
];

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col">
      {/* Header */}
      <header className="pt-8 pb-4 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-tighter hover:text-[#88d892] transition-colors">
          ALGHAARIB
        </Link>
        <Link to="/work" className="text-[11px] text-gray-400 font-light tracking-[0.15em] uppercase hover:text-[#88d892] transition-colors">
          Work
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center text-center py-16">
        <p className="text-xs text-gray-400 font-light tracking-[0.3em] uppercase mb-6">
          Get in touch
        </p>

        <a
          href="mailto:madgharib21@gmail.com"
          aria-label="Send email to Mahmoud Alghaarib"
          className="group relative inline-block mb-4"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-500 group-hover:text-[#88d892]">
            madgharib21@gmail.com
          </span>
          <span className="block h-px bg-gray-300 mt-2 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
          <span className="block h-px bg-[#88d892] mt-1 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left delay-100" />
        </a>

        <p className="text-sm text-gray-400 font-light">
          Based in Morocco &bull; Available Worldwide
        </p>

        <div className="flex items-center gap-8 mt-12">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 font-light tracking-wide hover:text-[#88d892] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-[10px] text-gray-300 font-light tracking-[0.15em] uppercase">
        Every frame tells a story.
      </footer>
    </div>
  );
};

export default ContactPage;