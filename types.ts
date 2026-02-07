
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
  videoUrl?: string; // Primary video URL
  videoUrls?: string[]; // Additional video URLs for playlists/collections
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
