
export type Category = 'Design' | 'Video' | 'Both';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  subcategory: string;
  thumbnailUrl: string;
  galleryImages?: string[];
  isVideo?: boolean;
  videoUrl?: string; // Placeholder for video source
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
