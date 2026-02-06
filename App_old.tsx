
import React, { useState, useMemo, useEffect } from 'react';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import SkillSection from './components/SkillSection';
import { PROJECTS } from './constants';
import { Project } from './types';

type MainTab = 'All' | 'Design' | 'Video';

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();
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
    if (activeTab === 'All') return [];
    const subs = new Set<string>();
    PROJECTS.forEach(p => {
      if (p.category === activeTab || p.category === 'Both') {
        subs.add(p.subcategory);
      }
    });
    return ['All', ...Array.from(subs)];
  }, [activeTab]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesMain = activeTab === 'All' || project.category === activeTab || project.category === 'Both';
      const matchesSub = activeSub === 'All' || project.subcategory === activeSub;
      return matchesMain && matchesSub;
    });
  }, [activeTab, activeSub]);

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24">
      {/* Header */}
      <header className="pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-2">
          ALGHAARIB
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light tracking-wide uppercase">
          Graphic Designer & Video Editor
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-24 max-w-2xl">
        <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light">
          Hi! I’m a passionate graphic designer and video editor who loves expressing creativity through visuals, motion, and storytelling. Design and editing are more than just tools for me they’re about bringing ideas to life, capturing emotion, and inspiring others through impactful visuals and creative flow.
        </p>
      </section>

      {/* Work Showcase */}
      <section className="mb-32">
        <div className="space-y-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Work</h2>
            
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
      <SkillSection />

      {/* Contact Section */}
      <section id="contact" className="py-32 text-center">
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Let's Collaborate
          </h2>
          <a
            href="mailto:hello@alghaarib.design"
            className="block text-2xl md:text-4xl font-bold hover:underline underline-offset-8 decoration-1 decoration-gray-300 transition-all"
          >
            hello@alghaarib.design
          </a>
          
          <p className="text-gray-500 font-medium">Available for freelance projects</p>
          
          <div className="flex justify-center gap-10 pt-4">
            <a href="#" className="hover:text-gray-500 transition-all transform hover:-translate-y-1">LinkedIn</a>
            <a href="#" className="hover:text-gray-500 transition-all transform hover:-translate-y-1">Instagram</a>
            <a href="#" className="hover:text-gray-500 transition-all transform hover:-translate-y-1">Behance</a>
            <a href="#" className="hover:text-gray-500 transition-all transform hover:-translate-y-1">Vimeo</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-xs text-gray-400 uppercase tracking-widest">
        &copy; {currentYear} ALGHAARIB. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
