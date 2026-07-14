import React from 'react';
import { Link } from 'react-router-dom';
import Antigravity from '../components/Antigravity';

const PARTICLE_CONFIG = {
  count: 300,
  magnetRadius: 10,
  ringRadius: 10,
  waveSpeed: 0.4,
  waveAmplitude: 1,
  particleSize: 2,
  lerpSpeed: 0.1,
  color: '#88d892ff',
  autoAnimate: false,
  particleVariance: 1,
  rotationSpeed: 0,
  depthFactor: 1,
  pulseSpeed: 3,
  particleShape: 'capsule' as const,
  fieldStrength: 10,
};

const HomePage: React.FC = () => {
  return (
    <div className="h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24 relative flex flex-col overflow-hidden">
      {/* Antigravity Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Antigravity {...PARTICLE_CONFIG} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between pt-6 pb-2">
        <div>
          <h1 className="text-lg md:text-xl font-semibold tracking-tighter">
            ALGHAARIB
          </h1>
          <p className="text-[10px] md:text-xs text-gray-400 font-light tracking-[0.2em] uppercase">
            Graphic Designer & Video Editor
          </p>
        </div>
        <img
          src="/icon/alghaarib21.png"
          alt="ALGHAARIB"
          className="h-8 md:h-10 opacity-60 hover:opacity-100 transition-opacity"
        />
      </header>

      {/* Hero */}
      <section className="flex-1 relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-0 gap-4 lg:gap-12">
        {/* Left: Big Typography */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm md:text-base text-[#88d892] font-light tracking-[0.3em] uppercase mb-2">
            Graphic Design &bull; Motion &bull; Brand Identity
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.85]">
            <span className="block">CRAFTING</span>
            <span className="block text-gray-600 font-just-sans-outline">VISUAL</span>
            <span className="block text-gray-600">STORIES.</span>
          </h2>
        </div>

        {/* Right: Creative Navigation */}
        <div className="flex-1 flex flex-col items-end gap-4 w-full max-w-sm">
          <Link
            to="/work"
            className="group w-full"
          >
            <div className="relative overflow-hidden border-b border-gray-300 py-4 transition-all duration-500 hover:border-[#88d892]">
              <span className="text-3xl md:text-4xl font-bold tracking-tight transition-all duration-500 group-hover:text-[#88d892] group-hover:translate-x-2 inline-block">
                WORK
              </span>
              <span className="ml-3 text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 inline-block text-[#88d892]">
                →
              </span>
              <p className="text-xs text-gray-400 mt-1 font-light tracking-wide uppercase transition-all duration-500 group-hover:text-[#88d892]/70">
                View Portfolio
              </p>
            </div>
          </Link>

          <Link
            to="/contact"
            className="group w-full"
          >
            <div className="relative overflow-hidden border-b border-[#88d892] py-4 transition-all duration-500 hover:border-gray-300">
              <span className="text-3xl md:text-4xl font-bold tracking-tight transition-all duration-500 text-[#88d892] group-hover:text-gray-300 group-hover:translate-x-2 inline-block">
                CONTACT
              </span>
              <span className="ml-3 text-lg opacity-100 transition-all duration-500 translate-x-0 group-hover:opacity-0 group-hover:translate-x-4 inline-block text-[#88d892]">
                →
              </span>
              <p className="text-xs text-[#88d892]/70 mt-1 font-light tracking-wide uppercase transition-all duration-500 group-hover:text-gray-400">
                Start a Project
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] md:text-xs text-gray-400 font-light tracking-wide">
        <span>Tangier, Morocco</span>
        <span className="hidden sm:block text-gray-300">✦</span>
        <span>Available for projects</span>
        <span className="hidden sm:block text-gray-300">✦</span>
        <a
          href="mailto:madgharib21@gmail.com"
          className="hover:text-[#88d892] transition-colors"
        >
          madgharib21@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default HomePage;