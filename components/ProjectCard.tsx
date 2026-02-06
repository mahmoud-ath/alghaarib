
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden mb-4 bg-gray-200 aspect-[4/3] transition-all duration-500 ease-out group-hover:scale-[1.02]">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        {project.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg transform group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-900"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-lg leading-tight group-hover:underline underline-offset-4 decoration-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 font-light line-clamp-1">{project.description}</p>
        <div className="flex gap-2 pt-1">
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 border border-gray-900/10 rounded-full bg-white">
            {project.category}
          </span>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">
            {project.subcategory}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
