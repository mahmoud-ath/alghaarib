import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 border border-gray-900 text-gray-900 font-medium uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;