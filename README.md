# Alghaarib Portfolio

A modern portfolio website for showcasing design and video projects, built with React, TypeScript, and Vite.

## Features

- 🎨 **Modern Design** - Clean, minimalist portfolio layout
- 🎥 **YouTube Integration** - Embedded video projects with auto-thumbnails
- 📱 **Responsive** - Optimized for all screen sizes
- ⚡ **Fast** - Built with Vite for optimal performance
- 🛠️ **Admin Dashboard** - Local content management system
- 📂 **File Upload** - Image management for projects
- 🔄 **Real-time Updates** - Changes reflect immediately

## Project Structure

```
alghaarib-portfolio/
├── admin/                  # Local admin dashboard
├── components/             # React components
├── pages/                  # Page components
├── public/
│   ├── images/            # Uploaded project images
│   └── projects.json      # Portfolio content
├── server/                # Admin API server
└── hooks/                 # React hooks
```

## Getting Started

### Prerequisites
- **Bun** (recommended) or Node.js
- Modern web browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahmoud-ath/alghaarib.git
   cd alghaarib-portfolio
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

### Development

1. **Start the portfolio (development):**
   ```bash
   bun run dev
   ```
   Opens at: http://localhost:5173

2. **Start the admin dashboard:**
   ```bash
   bun run admin
   ```
   Opens at: http://localhost:3001

### Admin Dashboard

The admin dashboard allows you to:
- ✅ Add/edit/delete projects
- ✅ Upload project images
- ✅ Manage YouTube video URLs
- ✅ Auto-extract YouTube thumbnails
- ✅ Real-time portfolio updates

**Quick Start Admin:**
```bash
# Windows
setup-admin.bat

# Linux/Mac
./setup-admin.sh
```

## Deployment

### Vercel (Recommended)

1. **Build the portfolio:**
   ```bash
   bun run build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - All content from `public/` will be deployed
   - Admin dashboard stays local only

### Manual Deployment

1. **Build:**
   ```bash
   bun run build
   ```

2. **Deploy the `dist/` folder** to your hosting provider

## Content Management

### Adding Projects

1. Start admin dashboard: `bun run admin`
2. Click "Add New Project"
3. Fill in project details
4. Upload images or add YouTube URLs
5. Save - changes appear immediately

### YouTube Videos

- Paste any YouTube URL (watch or youtu.be format)
- Thumbnails are auto-extracted
- Videos play embedded in your portfolio
- Custom thumbnails can override YouTube thumbnails

### Project Categories

- **Design** - Graphic design, branding, print work
- **Video** - Motion graphics, commercials, documentaries  
- **Both** - Mixed media projects

## Scripts

```bash
# Portfolio development
bun run dev              # Start dev server
bun run build           # Build for production
bun run preview         # Preview production build

# Admin dashboard  
bun run admin           # Start admin server
bun run admin:dev       # Start with auto-reload
```

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Admin:** Express.js, Multer
- **Deployment:** Vercel-ready
- **Runtime:** Bun (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with admin dashboard
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For issues or questions, please open an issue in the GitHub repository.
