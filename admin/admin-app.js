const { useState, useEffect } = React;

// Helper functions for YouTube
const getYouTubeVideoId = (url) => {
  // Updated regex to handle YouTube Shorts and regular videos
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getYouTubePlaylistId = (url) => {
  // Extract playlist ID from YouTube URL
  const regex = /[?&]list=([a-zA-Z0-9_-]+)/;
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

const parsePlaylistVideos = (playlistUrl) => {
  // For now, return the playlist URL as single video
  // In a real implementation, you'd use YouTube API to get all videos
  return [playlistUrl];
};

const parseMultipleVideoUrls = (text) => {
  // Split by newlines and filter valid YouTube URLs
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const videoUrls = [];
  
  lines.forEach(line => {
    // Clean the URL (remove extra spaces, handle different formats)
    const cleanUrl = line.trim();
    
    // Check if it's a valid YouTube URL (video or playlist)
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
      // Check if it's a playlist
      if (cleanUrl.includes('list=')) {
        videoUrls.push(cleanUrl);
      } else if (getYouTubeVideoId(cleanUrl)) {
        // It's a single video
        videoUrls.push(cleanUrl);
      }
    }
  });
  
  return videoUrls;
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
function ImageUploader({ onImageUpload, currentImage, label, multiple = false }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleFileSelect = async (e) => {
    const files = multiple ? Array.from(e.target.files) : [e.target.files[0]];
    if (!files.length) return;

    setUploading(true);
    try {
      if (multiple) {
        // Upload multiple files
        const uploadPromises = files.map(file => api.uploadImage(file));
        const results = await Promise.all(uploadPromises);
        const urls = results.map(result => result.url);
        onImageUpload(urls);
      } else {
        // Upload single file
        const result = await api.uploadImage(files[0]);
        setPreview(result.url);
        onImageUpload(result.url);
      }
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
          multiple={multiple}
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {uploading && <div className="text-blue-600">Uploading...</div>}
      </div>
      {!multiple && preview && (
        <img src={preview} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
      )}
      {multiple && (
        <p className="text-xs text-gray-500 mt-1">
          Select multiple images to upload them all at once
        </p>
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
    videoUrls: [], // Array for multiple videos
    ...project
  });
  
  const [bulkVideoInput, setBulkVideoInput] = useState('');

  const handleChange = (field, value) => {
    console.log('handleChange called:', field, value); // Debug log
    
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate thumbnail from YouTube URL for video projects
      if (field === 'videoUrl' && value) {
        console.log('Processing videoUrl change:', value); // Debug log
        const videoId = getYouTubeVideoId(value);
        console.log('Extracted video ID:', videoId); // Debug log
        
        if (videoId) {
          const youtubeThumbnail = getYouTubeThumbnail(value);
          console.log('Generated thumbnail URL:', youtubeThumbnail); // Debug log
          
          if (youtubeThumbnail) {
            // Always set YouTube thumbnail for video URLs, but don't override custom uploads
            if (!updated.thumbnailUrl || !updated.thumbnailUrl.startsWith('/images/')) {
              updated.thumbnailUrl = youtubeThumbnail;
              console.log('Thumbnail updated to:', youtubeThumbnail); // Debug log
            }
          }
        }
      }
      
      // Auto-generate thumbnail when switching to video mode
      if (field === 'isVideo' && value && updated.videoUrl) {
        const youtubeThumbnail = getYouTubeThumbnail(updated.videoUrl);
        if (youtubeThumbnail && (!updated.thumbnailUrl || !updated.thumbnailUrl.startsWith('/images/'))) {
          updated.thumbnailUrl = youtubeThumbnail;
        }
      }
      
      // Clear video URL and reset thumbnail when switching away from video mode
      if (field === 'isVideo' && !value) {
        updated.videoUrl = '';
        if (updated.thumbnailUrl && updated.thumbnailUrl.includes('img.youtube.com')) {
          updated.thumbnailUrl = '';
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

  const addGalleryImages = (urls) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...urls]
    }));
  };

  const addVideoUrls = (urls) => {
    setFormData(prev => ({
      ...prev,
      videoUrls: [...(prev.videoUrls || []), ...urls]
    }));
  };

  const removeVideoUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      videoUrls: (prev.videoUrls || []).filter((_, i) => i !== index)
    }));
  };

  const processBulkVideos = () => {
    if (bulkVideoInput.trim()) {
      const videoUrls = parseMultipleVideoUrls(bulkVideoInput);
      if (videoUrls.length > 0) {
        addVideoUrls(videoUrls);
        setBulkVideoInput('');
        // Auto-set first video as main video if none exists
        if (!formData.videoUrl && videoUrls[0]) {
          handleChange('videoUrl', videoUrls[0]);
        }
      }
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure YouTube thumbnail is set for video projects without custom thumbnails
    const finalFormData = { ...formData };
    if (finalFormData.isVideo) {
      // Use primary videoUrl or first video from collection for thumbnail
      const primaryVideoUrl = finalFormData.videoUrl || finalFormData.videoUrls[0];
      if (primaryVideoUrl) {
        const youtubeThumbnail = getYouTubeThumbnail(primaryVideoUrl);
        // Use YouTube thumbnail if no custom thumbnail is uploaded
        if (!finalFormData.thumbnailUrl || 
            (!finalFormData.thumbnailUrl.startsWith('/images/') && youtubeThumbnail)) {
          finalFormData.thumbnailUrl = youtubeThumbnail;
        }
      }
    }
    
    onSave(finalFormData);
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail Image 
            {formData.isVideo && formData.videoUrl && getYouTubeVideoId(formData.videoUrl) && (
              <span className="text-green-600 text-xs ml-2">(Auto-generated from YouTube available)</span>
            )}
          </label>
          
          {/* Show current thumbnail */}
          {formData.thumbnailUrl && (
            <div className="mb-3">
              <img 
                src={formData.thumbnailUrl} 
                alt="Current thumbnail"
                className="h-24 w-auto object-cover rounded border shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.thumbnailUrl.includes('img.youtube.com') 
                  ? '🎬 YouTube Auto-Generated Thumbnail' 
                  : '📁 Custom Uploaded Thumbnail'}
              </p>
            </div>
          )}
          
          {/* Upload input */}
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                try {
                  const result = await api.uploadImage(file);
                  handleChange('thumbnailUrl', result.url);
                } catch (error) {
                  console.error('Upload failed:', error);
                }
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.isVideo 
              ? 'Upload custom thumbnail or leave blank to use YouTube auto-generated thumbnail'
              : 'Upload a thumbnail image for this project'}
          </p>
        </div>
        
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <ImageUploader
              label="Add Single Image"
              onImageUpload={addGalleryImage}
            />
            <ImageUploader
              label="Add Multiple Images"
              onImageUpload={addGalleryImages}
              multiple={true}
            />
          </div>
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
            <div className="flex space-x-2">
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => handleChange('videoUrl', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID, https://youtu.be/VIDEO_ID, or https://youtube.com/shorts/VIDEO_ID"
              />
              <button
                type="button"
                onClick={() => {
                  if (formData.videoUrl) {
                    const thumbnail = getYouTubeThumbnail(formData.videoUrl);
                    if (thumbnail) {
                      handleChange('thumbnailUrl', thumbnail);
                    }
                  }
                }}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                title="Refresh YouTube Thumbnail"
              >
                🎬 Auto
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Enter a YouTube video URL. Thumbnail will be auto-generated.
            </p>
            
            {/* Multiple Videos Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-3">Multiple Videos & Playlists</h4>
              
              {/* Current video URLs */}
              {(formData.videoUrls || []).length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Collection ({(formData.videoUrls || []).length} videos)
                  </label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {(formData.videoUrls || []).map((url, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded border">
                        <img 
                          src={getYouTubeThumbnail(url) || '/images/video-placeholder.jpg'} 
                          alt={`Video ${index + 1}`} 
                          className="w-16 h-12 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64x48/ddd/999?text=Video';
                          }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate" title={url}>{url}</p>
                          <p className="text-xs text-gray-500">
                            {url.includes('list=') ? '📋 Playlist' : '🎬 Single Video'}
                            {getYouTubeVideoId(url) && ` • ID: ${getYouTubeVideoId(url)}`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVideoUrl(index)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Remove video"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0,0 1,-2,2H7a2,2 0,0 1,-2,-2V6m3,0V4a2,2 0,0 1,2,-2h4a2,2 0,0 1,2,2v2"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Bulk video input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bulk Add Videos/Playlists
                </label>
                <textarea
                  value={bulkVideoInput}
                  onChange={(e) => setBulkVideoInput(e.target.value)}
                  placeholder={`Paste multiple YouTube URLs (one per line):
https://www.youtube.com/watch?v=VIDEO_ID1
https://www.youtube.com/watch?v=VIDEO_ID2
https://www.youtube.com/playlist?list=PLAYLIST_ID
https://youtu.be/VIDEO_ID3
https://youtube.com/shorts/VIDEO_ID4`}
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-500">
                    {bulkVideoInput.trim() && (
                      <span>
                        Lines: {bulkVideoInput.trim().split('\n').length} | 
                        Valid URLs: {parseMultipleVideoUrls(bulkVideoInput).length}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={processBulkVideos}
                    disabled={!bulkVideoInput.trim() || parseMultipleVideoUrls(bulkVideoInput).length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm transition-colors"
                  >
                    Add {parseMultipleVideoUrls(bulkVideoInput).length} Video{parseMultipleVideoUrls(bulkVideoInput).length !== 1 ? 's' : ''}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Supports: YouTube videos, YouTube Shorts, and YouTube playlists
                </p>
              </div>
            </div>
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
                href="http://localhost:3000" 
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