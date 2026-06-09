@echo off
REM Complete setup script for Hinglish Abuse Detector on Windows

echo.
echo ===================================
echo Hinglish Abuse Context Detector
echo ===================================
echo.

REM Check for Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is required but not installed. Please install Python 3.8+
    exit /b 1
)

REM Check for Node.js
npm --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is required but not installed. Please install Node.js
    exit /b 1
)

REM Backend setup
echo.
echo 1. Setting up Backend...
echo.
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo Downloading model (this may take a few minutes)...
python download_model.py

cd ..

REM Frontend setup
echo.
echo 2. Setting up Frontend...
echo.
cd frontend

echo Installing npm dependencies...
call npm install

echo Building frontend...
call npm run build

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Ready to run the application!
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   venv\Scripts\activate.bat
echo   uvicorn app.main:app --reload
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Then open http://localhost:5173 in your browser!
echo.
pause
