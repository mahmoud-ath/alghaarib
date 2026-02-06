# Admin Dashboard

This directory contains the admin dashboard for managing portfolio projects locally.

## Features

- ✅ Full CRUD operations for projects
- ✅ Image upload with preview
- ✅ Video upload support
- ✅ Real-time portfolio data editing
- ✅ Local file management
- ✅ Responsive design

## How to Use

1. **Start the admin server:**
   ```bash
   npm run admin
   ```

2. **Open the admin dashboard:**
   - Navigate to: http://localhost:3001

3. **Manage your projects:**
   - Add new projects with the "Add New Project" button
   - Edit existing projects by clicking the edit icon
   - Delete projects with the trash icon
   - Upload images and videos directly

4. **View your portfolio:**
   - Click "View Portfolio" button to open http://localhost:5173
   - All changes are reflected immediately

## File Structure

```
admin/
├── index.html          # Admin dashboard HTML
├── admin-app.js        # React admin application
└── README.md           # This file

server/
└── admin-server.js     # Express server for CRUD operations
```

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/upload` - Upload images/videos
- `GET /api/files/:folder` - List uploaded files
- `DELETE /api/files/:folder/:filename` - Delete file

## Image/Video Management

Uploaded files are saved to:
- Images: `public/images/`
- Videos: `public/videos/`

The system automatically generates unique filenames and returns the proper URLs for your projects.json file.