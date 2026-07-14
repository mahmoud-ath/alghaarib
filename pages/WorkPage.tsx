import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SkillSection from '../components/SkillSection';
import { useProjectData } from '../hooks/useProjectData';
import { Project } from '../types';

type MainTab = 'All' | 'Design' | 'Video';

const MAIN_TABS: { id: MainTab; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Design', label: 'Design' },
  { id: 'Video', label: 'Film' },
];

const WorkPage: React.FC = () => {
  const { data, loading, error } = useProjectData();
  const [activeTab, setActiveTab] = useState<MainTab>('All');
  const [activeSub, setActiveSub] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setActiveSub('All');
  }, [activeTab]);

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
      <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-sm text-gray-300 mb-2 tracking-wider">Loading archive</div>
          <div className="w-32 h-px bg-gray-200 mx-auto overflow-hidden">
            <div className="w-1/2 h-full bg-gray-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 font-light mb-2">Something went wrong loading the archive.</p>
          <Link to="/" className="text-sm text-gray-400 hover:text-[#88d892] transition-colors underline underline-offset-4">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24">
      {/* Header */}
      <header className="pt-8 pb-4 flex items-center justify-between mb-16">
        <Link to="/" className="text-sm font-semibold tracking-tighter hover:text-[#88d892] transition-colors">
          ALGHAARIB
        </Link>
        <Link to="/contact" className="text-[11px] text-gray-400 font-light tracking-[0.15em] uppercase hover:text-[#88d892] transition-colors">
          Contact
        </Link>
      </header>

      {/* Hero */}
      <section className="mb-20">
        <p className="text-xs text-gray-400 font-light tracking-[0.3em] uppercase mb-3">
          Selected Works 2023&ndash;2026
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {MAIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-black'
                  : 'text-gray-200 hover:text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Subcategory Filter */}
      {availableSubcategories.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-16">
          {availableSubcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`text-xs uppercase tracking-widest font-medium transition-all duration-200 ${
                activeSub === sub
                  ? 'text-black underline underline-offset-4 decoration-1'
                  : 'text-gray-300 hover:text-gray-500'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Project Grid */}
      <section className="mb-32">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-300 font-light text-lg">Nothing here.</p>
            <p className="text-gray-300 font-light text-sm mt-1">Try a different direction.</p>
          </div>
        )}
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
      <footer className="py-16 text-center">
        <p className="text-xs text-gray-300 font-light tracking-[0.15em] uppercase mb-1">
          Selected work ends here.
        </p>
        <Link
          to="/contact"
          className="text-xs text-gray-400 font-light tracking-[0.15em] uppercase hover:text-[#88d892] transition-colors underline underline-offset-4"
        >
          Let&rsquo;s create the next one &darr;
        </Link>
      </footer>
    </div>
  );
};

export default WorkPage;