const { useState, useEffect } = React;

// Helper functions for YouTube
const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getYouTubeThumbnail = (videoUrl) => {
  const videoId = getYouTubeVideoId(videoUrl);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return null;
};

// API functions
const API_BASE = 'http://localhost:3001/api';

const api = {
  getProjects: async () => {
    const response = await fetch(`${API_BASE}/projects`);
    return response.json();
  },
  
  createProject: async (project) => {
    const response = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    return response.json();
  },
  
  updateProject: async (id, project) => {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    return response.json();
  },
  
  deleteProject: async (id) => {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },
  
  uploadImage: async (file, folder = 'images') => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
};

// Image Upload Component
function ImageUploader({ onImageUpload, currentImage, label }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await api.uploadImage(file);
      setPreview(result.url);
      onImageUpload(result.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {uploading && <div className="text-blue-600">Uploading...</div>}
      </div>
      {preview && (
        <img src={preview} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
      )}
    </div>
  );
}

// Project Form Component
function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Design',
    subcategory: '',
    thumbnailUrl: '',
    galleryImages: [],
    isVideo: false,
    videoUrl: '',
    ...project
  });

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate thumbnail from YouTube URL
      if (field === 'videoUrl' && value && updated.isVideo) {
        const youtubeThumbnail = getYouTubeThumbnail(value);
        if (youtubeThumbnail && !updated.thumbnailUrl.startsWith('/images/')) {
          updated.thumbnailUrl = youtubeThumbnail;
        }
      }
      
      return updated;
    });
  };

  const addGalleryImage = (url) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, url]
    }));
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {project ? 'Edit Project' : 'Add New Project'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Design">Design</option>
              <option value="Video">Video</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
            <input
              type="text"
              value={formData.subcategory}
              onChange={(e) => handleChange('subcategory', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <ImageUploader
          label="Thumbnail Image"
          currentImage={formData.thumbnailUrl}
          onImageUpload={(url) => handleChange('thumbnailUrl', url)}
        />
        
        {formData.isVideo && formData.videoUrl && getYouTubeVideoId(formData.videoUrl) && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Auto-Generated Thumbnail
            </label>
            <img 
              src={getYouTubeThumbnail(formData.videoUrl)} 
              alt="YouTube thumbnail"
              className="h-20 w-auto object-cover rounded border"
            />
            <p className="text-xs text-gray-500 mt-1">
              This thumbnail will be used automatically if you don't upload a custom one
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
          {formData.galleryImages.map((img, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <img src={img} alt={`Gallery ${index + 1}`} className="h-16 w-16 object-cover rounded" />
              <span className="flex-1 text-sm">{img}</span>
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="text-red-600 hover:text-red-800"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <ImageUploader
            label="Add Gallery Image"
            onImageUpload={addGalleryImage}
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isVideo}
              onChange={(e) => handleChange('isVideo', e.target.checked)}
              className="mr-2"
            />
            This project has a video
          </label>
        </div>

        {formData.isVideo && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => handleChange('videoUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter a YouTube video URL. It will be automatically embedded in your portfolio.
            </p>
          </div>
        )}

        <div className="flex space-x-2 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Project
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Project List Component
function ProjectList({ projects, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold">Projects</h2>
      </div>
      <div className="divide-y">
        {projects.map(project => (
          <div key={project.id} className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="h-16 w-16 object-cover rounded"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                }}
              />
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.category} - {project.subcategory}</p>
                <p className="text-gray-500 text-sm">{project.description.substring(0, 100)}...</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(project)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Admin Dashboard
function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const data = await api.getProjects();
      // Sort projects by ID in descending order (newest first)
      const sortedProjects = (data.projects || []).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      setProjects(sortedProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSave = async (projectData) => {
    try {
      if (editing) {
        await api.updateProject(editing.id, projectData);
      } else {
        // Generate new ID that's higher than existing ones
        const maxId = Math.max(...projects.map(p => parseInt(p.id)), 0);
        const newId = (maxId + 1).toString();
        await api.createProject({ ...projectData, id: newId });
      }
      
      await loadProjects();
      setEditing(null);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await api.deleteProject(id);
        await loadProjects();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleEdit = (project) => {
    setEditing(project);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Portfolio Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="http://localhost:5173" 
                target="_blank" 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View Portfolio
              </a>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add New Project
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {showForm ? (
          <ProjectForm
            project={editing}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <ProjectList
            projects={projects}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

// Render the app
ReactDOM.render(<AdminDashboard />, document.getElementById('admin-root'));