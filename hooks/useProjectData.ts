import { useState, useEffect } from 'react';
import { Project, SkillCategory } from '../types';

interface ProjectData {
  projects: Project[];
  skillCategories: SkillCategory[];
  tools: string[];
}

export const useProjectData = () => {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const projectData = await response.json();
        
        // Sort projects by ID in descending order (newest first)
        if (projectData.projects) {
          projectData.projects.sort((a: Project, b: Project) => {
            return parseInt(b.id) - parseInt(a.id);
          });
        }
        
        setData(projectData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};