import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24">
      {/* Header with Navigation */}
      <header className="pt-24 pb-16">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-2xl font-semibold tracking-tighter hover:text-gray-600 transition-colors">
            ALGHAARIB
          </Link>
          <Link to="/work" className="text-sm uppercase tracking-widest text-gray-600 hover:text-gray-900 transition-colors">
            Work
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-2">
          Let's Work Together
        </h1>
        <p className="text-lg text-gray-500 font-light tracking-wide uppercase">
          Contact & Collaboration
        </p>
      </header>

      {/* Contact Section */}
      <section className="py-32 text-center">
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Ready to Create Something Amazing?
          </h2>
          <a
            href="mailto:madgharib21@gmail.com"
            className="block text-2xl md:text-4xl font-bold hover:underline underline-offset-8 decoration-1 decoration-gray-300 transition-all"
          >
            madgharib21@gmail.com
          </a>
          
          <p className="text-gray-500 font-medium">Available for freelance projects</p>
          
          <div className="flex justify-center gap-10 pt-4">
            <a 
              href="#" 
              className="hover:text-gray-500 transition-all transform hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a 
              href="https://instagram.com/alghaarib21" 
                target="_blank" 
  rel="noopener noreferrer" 
              className="hover:text-gray-500 transition-all transform hover:-translate-y-1"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a 
              href="#" 
              className="hover:text-gray-500 transition-all transform hover:-translate-y-1"
              aria-label="Behance"
            >
              Behance
            </a>
            <a 
              href="#" 
              className="hover:text-gray-500 transition-all transform hover:-translate-y-1"
              aria-label="Vimeo"
            >
              Vimeo
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-32">
        <h2 className="text-2xl font-bold tracking-tight uppercase mb-12 text-center">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 border border-gray-200">
            <h3 className="text-xl font-bold tracking-tight uppercase mb-4">
              Graphic Design
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                Brand Identity & Logo Design
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                Print & Digital Media
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                Social Media Assets
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                UI/UX Design
              </li>
            </ul>
          </div>

          <div className="p-8 border border-gray-200">
            <h3 className="text-xl font-bold tracking-tight uppercase mb-4">
              Video Editing
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                Commercial & Promotional Videos
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                Motion Graphics & Animation
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                Documentary & Narrative Editing
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                Social Content Strategy
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-xs text-gray-400 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ALGHAARIB. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ContactPage;