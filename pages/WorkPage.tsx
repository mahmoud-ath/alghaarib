import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SkillSection from '../components/SkillSection';
import { useProjectData } from '../hooks/useProjectData';
import { Project } from '../types';

type MainTab = 'All' | 'Design' | 'Video';

const WorkPage: React.FC = () => {
  const { data, loading, error } = useProjectData();
  const [activeTab, setActiveTab] = useState<MainTab>('All');
  const [activeSub, setActiveSub] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Reset subcategory when main tab changes
  useEffect(() => {
    setActiveSub('All');
  }, [activeTab]);

  // Handle body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Derive available subcategories based on active main tab
  const availableSubcategories = useMemo(() => {
    if (!data || activeTab === 'All') return [];
    const subs = new Set<string>();
    data.projects.forEach(p => {
      if (p.category === activeTab || p.category === 'Both') {
        subs.add(p.subcategory);
      }
    });
    return ['All', ...Array.from(subs)];
  }, [activeTab, data]);

  const filteredProjects = useMemo(() => {
    if (!data) return [];
    return data.projects.filter(project => {
      const matchesMain = activeTab === 'All' || project.category === activeTab || project.category === 'Both';
      const matchesSub = activeSub === 'All' || project.subcategory === activeSub;
      return matchesMain && matchesSub;
    });
  }, [activeTab, activeSub, data]);

  if (loading) {
    return (
      <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading projects: {error}</p>
            <Link to="/" className="text-blue-600 hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24">
      {/* Header with Navigation */}
      <header className="pt-24 pb-16">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-2xl font-semibold tracking-tighter hover:text-gray-600 transition-colors">
            ALGHAARIB
          </Link>
          <Link to="/contact" className="text-sm uppercase tracking-widest text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-2">
          My Work
        </h1>
        <p className="text-lg text-gray-500 font-light tracking-wide uppercase">
          Portfolio & Projects
        </p>
      </header>

      {/* Work Showcase */}
      <section className="mb-32">
        <div className="space-y-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Projects</h2>
            
            {/* Main Tabs */}
            <div className="flex gap-8 border-b border-gray-100 md:border-none overflow-x-auto no-scrollbar pb-2">
              <button 
                onClick={() => setActiveTab('All')}
                className={`pb-2 md:pb-0 text-sm font-bold uppercase tracking-widest transition-all duration-300 relative whitespace-nowrap ${
                  activeTab === 'All' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                All
                {activeTab === 'All' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('Design')}
                className={`pb-2 md:pb-0 text-sm font-bold uppercase tracking-widest transition-all duration-300 relative whitespace-nowrap ${
                  activeTab === 'Design' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Graphic Design
                {activeTab === 'Design' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('Video')}
                className={`pb-2 md:pb-0 text-sm font-bold uppercase tracking-widest transition-all duration-300 relative whitespace-nowrap ${
                  activeTab === 'Video' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Video Editing
                {activeTab === 'Video' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>

          {/* Subcategory Filter Bar */}
          {availableSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-3 animate-in fade-in slide-in-from-top-1 duration-300">
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(sub)}
                  className={`text-xs uppercase tracking-widest font-medium transition-all duration-200 ${
                    activeSub === sub 
                      ? 'text-black underline underline-offset-4 decoration-1' 
                      : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div 
                key={`${activeTab}-${activeSub}-${project.id}`} 
                className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProject(project)} 
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 italic">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Skills & Tools */}
      <SkillSection skillCategories={data.skillCategories} tools={data.tools} />

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-xs text-gray-400 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ALGHAARIB. All Rights Reserved.
      </footer>
    </div>
  );
};

export default WorkPage;