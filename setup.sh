#!/bin/bash
# Complete setup script for Hinglish Abuse Detector

set -e

echo "🚀 Setting up Hinglish Abuse Context Detector..."
echo ""

# Check for required tools
echo "✓ Checking requirements..."
command -v python3 >/dev/null 2>&1 || { echo "Python 3 is required but not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Node.js/npm is required but not installed."; exit 1; }

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Downloading model (this may take a few minutes)..."
python download_model.py

cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend

echo "Installing npm dependencies..."
npm install

echo "Building frontend..."
npm run build

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 Ready to run!"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  source venv/bin/activate  # macOS/Linux"
echo "  .\\venv\\Scripts\\activate  # Windows"
echo "  uvicorn app.main:app --reload"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:5173 in your browser!"
