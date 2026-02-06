
import React from 'react';
import { SkillCategory } from '../types';

interface SkillSectionProps {
  skillCategories?: SkillCategory[];
  tools?: string[];
}

const SkillSection: React.FC<SkillSectionProps> = ({ 
  skillCategories = [], 
  tools = [] 
}) => {
  return (
    <section id="skills" className="py-24 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        {skillCategories.map((cat) => (
          <div key={cat.title}>
            <h2 className="text-xl font-bold mb-6 tracking-tight uppercase">
              {cat.title}
            </h2>
            <ul className="space-y-3">
              {cat.skills.map((skill) => (
                <li key={skill} className="text-gray-600 flex items-center gap-3">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
          Software Proficiency
        </h3>
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-gray-900 font-medium italic">
          {tools.map((tool) => (
            <span key={tool} className="hover:text-gray-500 transition-colors">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
