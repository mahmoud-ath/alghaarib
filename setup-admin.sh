#!/bin/bash

echo "🚀 Setting up Portfolio Admin Dashboard..."

# Install required dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/images
mkdir -p public/videos

# Start the admin server
echo "🔧 Starting admin server on localhost:3001..."
npm run admin

echo "✨ Admin dashboard is ready!"
echo "📍 Open: http://localhost:3001"