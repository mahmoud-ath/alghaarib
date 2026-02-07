import React, { useState } from 'react';
import { Project } from '../types';

interface VideoProjectModalProps {
  project: Project;
  onClose: () => void;
}

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  // Updated regex to handle YouTube Shorts and regular videos
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (videoUrl: string): string => {
  const videoId = getYouTubeVideoId(videoUrl);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  return videoUrl; // fallback to original URL
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (videoUrl: string): string => {
  const videoId = getYouTubeVideoId(videoUrl);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return '';
};

const VideoProjectModal: React.FC<VideoProjectModalProps> = ({ project, onClose }) => {
  // State for multiple videos
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Get all videos (main video + additional videos)
  const allVideos = [
    ...(project.videoUrl ? [project.videoUrl] : []),
    ...(project.videoUrls || [])
  ].filter(Boolean);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % allVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + allVideos.length) % allVideos.length);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && allVideos.length > 1) prevVideo();
      if (e.key === 'ArrowRight' && allVideos.length > 1) nextVideo();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, allVideos.length]);

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
          {/* ENHANCED VIDEO LAYOUT - Multiple Videos Support */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* Video Info Section - Enhanced with Navigation */}
            <div className="lg:w-1/3 p-6 lg:p-8 space-y-6 flex flex-col justify-center bg-white/60 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{project.subcategory}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{project.title}</h2>
              </div>
              
              <p className="text-base text-gray-600 leading-relaxed font-light">
                {project.description}
              </p>
              
              <div className="flex items-center space-x-3">
                <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1.5 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full shadow-lg">
                  {project.category}
                </span>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <span>{allVideos.length > 1 ? `${allVideos.length} Videos` : 'Video Project'}</span>
                </div>
              </div>

              {/* Video Navigation for Multiple Videos */}
              {allVideos.length > 1 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-sm font-medium text-gray-700">
                      Video {currentVideoIndex + 1} of {allVideos.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={prevVideo}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </button>
                    <button
                      onClick={nextVideo}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Video Thumbnails Strip */}
                  <div className="flex space-x-2 overflow-x-auto p-2">
                    {allVideos.map((videoUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentVideoIndex(idx)}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentVideoIndex 
                            ? 'border-red-500 ring-2 ring-red-200' 
                            : 'border-gray-300 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={getYouTubeThumbnail(videoUrl)}
                          alt={`Video ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Video Player - Larger */}
            <div className="lg:w-2/3 bg-black flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              <iframe
                key={currentVideoIndex} // Force re-render when video changes
                src={getYouTubeEmbedUrl(allVideos[currentVideoIndex] || project.videoUrl || '')}
                title={`${project.title} - Video ${currentVideoIndex + 1}`}
                className="w-full h-full relative z-10"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoProjectModal;