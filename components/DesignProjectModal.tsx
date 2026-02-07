import React, { useState } from 'react';
import { Project } from '../types';

interface DesignProjectModalProps {
  project: Project;
  onClose: () => void;
}

const DesignProjectModal: React.FC<DesignProjectModalProps> = ({ project, onClose }) => {
  // Gallery state for design projects
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryView, setIsGalleryView] = useState(false);
  
  // Get all images (thumbnail + gallery images) for design projects
  const allImages = [
    ...(project.thumbnailUrl ? [project.thumbnailUrl] : []),
    ...(project.galleryImages || [])
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryView(true);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isGalleryView) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') setIsGalleryView(false);
      }
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isGalleryView, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 lg:p-6 animate-in fade-in duration-500">
      {/* Enhanced Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 backdrop-blur-xl" 
        onClick={onClose}
      />
      
      {/* Enhanced Modal Container - Better Sizing */}
      <div className="relative w-full max-w-6xl bg-white shadow-2xl overflow-hidden rounded-xl flex flex-col h-[90vh] border border-gray-100">
        {/* Enhanced Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-full group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto">
          {isGalleryView ? (
            /* ENHANCED FULL SCREEN GALLERY */
            <div className="relative bg-gradient-to-br from-black via-gray-900 to-black h-full min-h-[80vh] flex items-center justify-center">
              {/* Enhanced Gallery Navigation */}
              <button
                onClick={() => setIsGalleryView(false)}
                className="absolute top-6 left-6 z-20 p-3 text-white hover:text-gray-300 transition-all duration-200 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              
              {/* Enhanced Previous/Next buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 z-10 p-4 text-white hover:text-gray-300 transition-all duration-200 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm group hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 z-10 p-4 text-white hover:text-gray-300 transition-all duration-200 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm group hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </>
              )}

              {/* Enhanced Current Image */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <div className="w-full max-w-4xl h-full max-h-[70vh] flex items-center justify-center">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${project.title} image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </div>

              {/* Enhanced Image Counter & Info */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
                <div className="bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20">
                  {currentImageIndex + 1} of {allImages.length}
                </div>
                
                {/* Dynamic Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="flex space-x-3 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/20 max-w-fit mx-auto">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                          idx === currentImageIndex 
                            ? 'border-white shadow-lg scale-110 ring-2 ring-white/50' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {idx === currentImageIndex && (
                          <div className="absolute inset-0 bg-white/20"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ENHANCED DESIGN PROJECT LAYOUT */
            <div className="p-8 md:p-12 lg:p-16 space-y-12 bg-gradient-to-br from-white via-gray-50/30 to-white min-h-full">
              {/* Enhanced Project Info */}
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-full">{project.subcategory}</span>
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  {project.title}
                </h2>
                
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light mb-8 max-w-3xl">
                  {project.description}
                </p>
                
                <div className="flex items-center space-x-6">
                  <span className="text-sm uppercase tracking-widest font-semibold px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full shadow-lg">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="9" cy="9" r="2"/>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                    </svg>
                    <span className="text-sm font-medium">{allImages.length} Image{allImages.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Gallery */}
              <div className="max-w-6xl mx-auto space-y-8">
                {allImages.length > 0 && (
                  <>
                    {/* Enhanced Main Featured Image */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl bg-white p-4" onClick={() => handleImageClick(0)}>
                      <div className="w-full aspect-video overflow-hidden rounded-xl">
                        <img
                          src={allImages[0]}
                          alt={`${project.title} featured`}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-start p-8">
                        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                          </svg>
                        </div>
                      </div>
                      {allImages.length > 1 && (
                        <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                          +{allImages.length - 1} more
                        </div>
                      )}
                    </div>

                    {/* Enhanced Additional Images Grid */}
                    {allImages.length > 1 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allImages.slice(1, Math.min(8, allImages.length)).map((img, idx) => (
                          <div
                            key={idx + 1}
                            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg bg-white p-3 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            onClick={() => handleImageClick(idx + 1)}
                          >
                            <div className="aspect-square overflow-hidden rounded-lg">
                              <img
                                src={img}
                                alt={`${project.title} image ${idx + 2}`}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                              />
                            </div>
                            <div className="absolute inset-3 rounded-lg bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                              <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                                </svg>
                              </div>
                            </div>
                            {idx === 6 && allImages.length > 8 && (
                              <div className="absolute inset-3 rounded-lg bg-black/80 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-white font-bold text-xl">+{allImages.length - 8}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignProjectModal;