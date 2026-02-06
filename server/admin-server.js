const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// File paths
const PROJECTS_FILE = path.join(__dirname, '..', 'public', 'projects.json');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
    console.log('✓ Directories ensured');
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}

// Setup multer for file uploads (images only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGES_DIR);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').toLowerCase().replace(/[^a-z0-9]/g, '-');
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for images
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Helper functions
async function readProjectsFile() {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects file:', error);
    return { projects: [], skillCategories: [], tools: [] };
  }
}

async function writeProjectsFile(data) {
  try {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(data, null, 2));
    console.log('✓ Projects file updated');
  } catch (error) {
    console.error('Error writing projects file:', error);
    throw error;
  }
}

// Routes

// Serve admin dashboard
app.get('/', (req, res) => {
  res.redirect('/admin');
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'index.html'));
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const data = await readProjectsFile();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// Create new project
app.post('/api/projects', async (req, res) => {
  try {
    const data = await readProjectsFile();
    const newProject = {
      ...req.body,
      id: req.body.id || Date.now().toString()
    };
    
    data.projects.push(newProject);
    await writeProjectsFile(data);
    
    res.json({ success: true, project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const data = await readProjectsFile();
    const projectIndex = data.projects.findIndex(p => p.id === req.params.id);
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    data.projects[projectIndex] = {
      ...data.projects[projectIndex],
      ...req.body,
      id: req.params.id
    };
    
    await writeProjectsFile(data);
    
    res.json({ success: true, project: data.projects[projectIndex] });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const data = await readProjectsFile();
    const projectIndex = data.projects.findIndex(p => p.id === req.params.id);
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const deletedProject = data.projects.splice(projectIndex, 1)[0];
    await writeProjectsFile(data);
    
    res.json({ success: true, project: deletedProject });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Upload file (images only)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const url = `/images/${req.file.filename}`;
    
    res.json({
      success: true,
      url,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// List uploaded files (images only)
app.get('/api/files/images', async (req, res) => {
  try {
    const files = await fs.readdir(IMAGES_DIR);
    const fileList = files.map(file => ({
      name: file,
      url: `/images/${file}`
    }));
    
    res.json({ files: fileList });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// Delete file (images only)
app.delete('/api/files/images/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(IMAGES_DIR, filename);
    
    await fs.unlink(filePath);
    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio Admin Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Server error:', error);
  res.status(500).json({ error: error.message || 'Internal server error' });
});

// Start server
async function startServer() {
  await ensureDirectories();
  
  app.listen(PORT, () => {
    console.log(`
🚀 Portfolio Admin Server is running!

📍 Admin Dashboard: http://localhost:3001
📍 API Endpoint: http://localhost:3001/api
📍 Portfolio (if running): http://localhost:5173

✨ Ready to manage your portfolio projects!
    `);
  });
}

startServer().catch(console.error);