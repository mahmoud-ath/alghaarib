import React from 'react';
import { Link } from 'react-router-dom';
import Antigravity from '../components/Antigravity';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24 relative">
      {/* Antigravity Background */}
      <div className="fixed inset-0 w-full h-full z-0" style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}>
        <Antigravity
          count={300}
          magnetRadius={10}
          ringRadius={10}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={2}
          lerpSpeed={0.1}
          color="#88d892ff"
          autoAnimate={false}
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      {/* Header */}
      <header className="pt-24 pb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-2">
          ALGHAARIB
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light tracking-wide uppercase">
          Graphic Designer & Video Editor
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-24 max-w-2xl relative z-10">
        <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light">
          Hi! I'm a passionate graphic designer and video editor who loves expressing creativity through visuals, motion, and storytelling. Design and editing are more than just tools for me they're about bringing ideas to life, capturing emotion, and inspiring others through impactful visuals and creative flow.
        </p>
      </section>

      {/* Navigation */}
      <section className="mb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <Link 
            to="/work" 
            className="group block p-8 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-4 group-hover:text-gray-600 transition-colors">
              View My Work
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Explore my portfolio of graphic design projects and video editing work, showcasing creative solutions across various mediums.
            </p>
            <div className="mt-6 text-sm uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
              Browse Projects →
            </div>
          </Link>

          <Link 
            to="/contact" 
            className="group block p-8 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-4 group-hover:text-gray-600 transition-colors">
              Get In Touch
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Ready to collaborate on your next project? Let's discuss how we can bring your creative vision to life together.
            </p>
            <div className="mt-6 text-sm uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
              Contact Me →
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-xs text-gray-400 uppercase tracking-widest relative z-10">
        &copy; {new Date().getFullYear()} ALGHAARIB. All Rights Reserved.
      </footer>
    </div>
  );
};

export default HomePage;