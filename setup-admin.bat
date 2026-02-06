@echo off

echo 🚀 Setting up Portfolio Admin Dashboard...

REM Create necessary directories
echo 📁 Creating directories...
if not exist "public\images" mkdir "public\images"

REM Start the admin server
echo 🔧 Starting admin server on localhost:3001...
call bun run admin

echo ✨ Admin dashboard is ready!
echo 📍 Open: http://localhost:3001

pause