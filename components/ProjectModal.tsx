
import React from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-white/90 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl bg-white shadow-2xl overflow-hidden rounded-sm flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex-1 overflow-y-auto">
          {project.isVideo ? (
            /* VIDEO LAYOUT: Details Left, Video Right */
            <div className="flex flex-col md:flex-row h-full min-h-[400px]">
              <div className="md:w-1/3 p-8 md:p-12 space-y-6 flex flex-col justify-center">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-gray-400">{project.subcategory}</span>
                  <h2 className="text-3xl font-bold mt-2">{project.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="pt-4">
                  <span className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1 border border-gray-900 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="md:w-2/3 bg-black flex items-center justify-center aspect-video md:aspect-auto">
                <video 
                  src={project.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ) : (
            /* IMAGE LAYOUT: Details Top, Gallery Below */
            <div className="p-8 md:p-12 space-y-12">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">{project.subcategory}</span>
                <h2 className="text-4xl font-bold mt-2 mb-6">{project.title}</h2>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                  {project.galleryImages?.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`${project.title} slide ${idx + 1}`}
                      className="w-full h-auto object-cover rounded-sm shadow-sm"
                    />
                  )) || (
                    <img 
                      src={project.thumbnailUrl} 
                      alt={project.title} 
                      className="w-full h-auto object-cover rounded-sm"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
