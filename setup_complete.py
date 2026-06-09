#!/usr/bin/env python3
"""
Complete setup script for Hinglish Abuse Detector

This script automates the entire setup process for both frontend and backend.
"""

import os
import sys
import subprocess
import platform
from pathlib import Path

def run_command(cmd, cwd=None, shell=False):
    """Run a shell command and return success status."""
    try:
        result = subprocess.run(
            cmd if shell else cmd.split(),
            cwd=cwd,
            shell=shell,
            capture_output=True,
            text=True
        )
        return result.returncode == 0
    except Exception as e:
        print(f"❌ Error running command: {e}")
        return False

def setup_backend():
    """Setup backend dependencies."""
    print("\n" + "="*50)
    print("📦 BACKEND SETUP")
    print("="*50)
    
    backend_dir = Path(__file__).parent / "backend"
    
    # Create venv
    print("\n1️⃣  Creating virtual environment...")
    if not (backend_dir / "venv").exists():
        if not run_command(f"{sys.executable} -m venv venv", cwd=str(backend_dir)):
            print("❌ Failed to create virtual environment")
            return False
        print("✅ Virtual environment created")
    else:
        print("✅ Virtual environment already exists")
    
    # Install dependencies
    print("\n2️⃣  Installing Python dependencies...")
    pip_cmd = f"{sys.executable} -m pip install -r requirements.txt"
    if not run_command(pip_cmd, cwd=str(backend_dir)):
        print("⚠️  Some dependencies may not have installed (this is OK for demo mode)")
    else:
        print("✅ Dependencies installed")
    
    return True

def setup_frontend():
    """Setup frontend dependencies."""
    print("\n" + "="*50)
    print("🎨 FRONTEND SETUP")
    print("="*50)
    
    frontend_dir = Path(__file__).parent / "frontend"
    
    # Install npm dependencies
    print("\n1️⃣  Installing npm dependencies...")
    if not run_command("npm install", cwd=str(frontend_dir)):
        print("❌ Failed to install npm dependencies")
        return False
    print("✅ npm dependencies installed")
    
    # Build frontend
    print("\n2️⃣  Building frontend...")
    if not run_command("npm run build", cwd=str(frontend_dir)):
        print("⚠️  Build warnings (check above)")
    else:
        print("✅ Frontend build successful")
    
    return True

def print_instructions():
    """Print final instructions."""
    print("\n" + "="*60)
    print("🎉 SETUP COMPLETE!")
    print("="*60)
    
    print("\n📋 PROJECT STRUCTURE:")
    print("""
    hinglish-nlp/
    ├── frontend/               # React application
    │   ├── src/               # React components & pages
    │   ├── dist/              # Built files (ready for Vercel)
    │   └── package.json
    ├── backend/               # FastAPI application
    │   ├── app/               # Application code
    │   ├── saved_model/       # Model directory
    │   ├── venv/              # Python virtual environment
    │   └── requirements.txt
    └── README.md              # Full documentation
    """)
    
    print("\n🚀 HOW TO RUN:")
    print("\n   OPTION 1: Run Both Servers (Recommended)")
    print("   " + "-"*40)
    
    if platform.system() == "Windows":
        print("   Terminal 1 (Backend):")
        print("   cd backend")
        print("   .\\venv\\Scripts\\activate.bat")
        print("   uvicorn app.main:app --reload")
        print("")
        print("   Terminal 2 (Frontend):")
        print("   cd frontend")
        print("   npm run dev")
    else:
        print("   Terminal 1 (Backend):")
        print("   cd backend")
        print("   source venv/bin/activate")
        print("   uvicorn app.main:app --reload")
        print("")
        print("   Terminal 2 (Frontend):")
        print("   cd frontend")
        print("   npm run dev")
    
    print("\n   Then open: http://localhost:5173")
    
    print("\n   OPTION 2: Using Setup Scripts")
    print("   " + "-"*40)
    if platform.system() == "Windows":
        print("   Just run: .\\setup.bat")
    else:
        print("   Just run: ./setup.sh")
    
    print("\n📡 API ENDPOINTS:")
    print("   GET  http://localhost:8000/              → Root endpoint")
    print("   GET  http://localhost:8000/health        → Health check")
    print("   POST http://localhost:8000/predict       → Predict abuse context")
    
    print("\n📝 EXAMPLE API REQUEST:")
    print("""
   curl -X POST http://localhost:8000/predict \\
     -H "Content-Type: application/json" \\
     -d '{"text": "Oye bhosdike kaisa hai"}'
    """)
    
    print("\n🌐 DEPLOYMENT:")
    print("   Frontend → Vercel (vercel.json configured)")
    print("   Backend  → Render  (render.yaml configured)")
    print("")
    print("   See README.md for detailed deployment instructions")
    
    print("\n📚 FEATURES:")
    print("""
   ✓ 4-class Hinglish text classification
   ✓ Real-time predictions with confidence scores
   ✓ Probability distribution visualization
   ✓ Prediction history with localStorage
   ✓ Dark/light theme toggle
   ✓ Smooth animations with Framer Motion
   ✓ Premium glassmorphism UI design
   ✓ Fully responsive layout
   ✓ Error handling & toast notifications
   ✓ Keyboard shortcuts (Ctrl+Enter to submit)
   """)
    
    print("\n⚙️  NEXT STEPS:")
    print("""
   1. Replace mock model with trained model:
      - Train on your Hinglish dataset
      - Save to backend/saved_model/
      - Install torch & transformers in requirements.txt
   
   2. Customize UI:
      - Edit frontend/src/pages/Home.jsx
      - Modify colors in tailwind.config.js
      - Update assets in frontend/src/assets/
   
   3. Deploy:
      - Push to GitHub
      - Connect frontend to Vercel
      - Connect backend to Render
      - Set environment variables
   """)
    
    print("\n💡 DEMO MODE:")
    print("""
   Currently running in DEMO MODE with:
   - Mock model (returns simulated predictions)
   - No PyTorch/Transformers required
   - Fast setup and testing
   
   To use real model:
   1. Uncomment torch & transformers in backend/requirements.txt
   2. Add your trained model to backend/saved_model/
   3. Run: python backend/download_model.py (to download base model)
   4. Fine-tune on your dataset
   5. Update environment variables as needed
   """)
    
    print("\n❓ TROUBLESHOOTING:")
    print("""
   See README.md for detailed troubleshooting guide
   """)
    
    print("\n" + "="*60)
    print("Happy coding! 🚀")
    print("="*60 + "\n")

def main():
    """Main setup function."""
    print("\n")
    print("╔" + "="*58 + "╗")
    print("║" + " "*58 + "║")
    print("║" + "  🎯 Hinglish Abuse Context Detector - Setup".center(58) + "║")
    print("║" + " "*58 + "║")
    print("╚" + "="*58 + "╝")
    
    # Check prerequisites
    print("\n🔍 Checking prerequisites...")
    
    if not shutil.which("python3") and not shutil.which("python"):
        print("❌ Python is required. Please install Python 3.8+")
        sys.exit(1)
    
    if not shutil.which("npm"):
        print("❌ Node.js/npm is required. Please install Node.js")
        sys.exit(1)
    
    print("✅ Python found")
    print("✅ Node.js/npm found")
    
    # Setup backend
    if not setup_backend():
        print("\n⚠️  Backend setup had issues but continuing...")
    
    # Setup frontend
    if not setup_frontend():
        print("\n❌ Frontend setup failed")
        sys.exit(1)
    
    # Print instructions
    print_instructions()

if __name__ == "__main__":
    import shutil
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Setup cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Setup failed with error: {e}")
        sys.exit(1)
