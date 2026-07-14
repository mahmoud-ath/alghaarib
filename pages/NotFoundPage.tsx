import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
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
      <main className="flex-1 flex flex-col justify-center max-w-2xl py-16">
        {/* Timeline bar */}
        <div className="relative mb-10">
          <div className="h-px bg-gray-200 w-full" />
          <div className="absolute top-0 left-[32%] w-px h-8 bg-gray-300">
            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full border-2 border-[#88d892] bg-white animate-pulse" />
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-mono">
            <span className="text-gray-300">00:00:00</span>
            <span className="text-[#88d892] font-medium">00:04:04</span>
            <span className="text-gray-300">00:10:00</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4 font-mono text-gray-200">
          00:04:04
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light mb-8 leading-relaxed">
          Looks like this scene<br />
          didn't make the final cut.
        </p>
        <Link
          to="/"
          className="text-sm font-light tracking-[0.2em] uppercase text-gray-400 hover:text-[#88d892] transition-colors w-fit"
        >
          ← Return to Portfolio
        </Link>
      </main>
    </div>
  );
};

export default NotFoundPage;