
import React from 'react';
import { Project } from '../types';
import DesignProjectModal from './DesignProjectModal';
import VideoProjectModal from './VideoProjectModal';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Route to the appropriate specialized modal based on project type
  if (project.isVideo) {
    return <VideoProjectModal project={project} onClose={onClose} />;
  } else {
    return <DesignProjectModal project={project} onClose={onClose} />;
  }
};

export default ProjectModal;
