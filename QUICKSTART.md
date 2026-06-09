# 🚀 Quick Start Guide

## **Get Running in 2 Minutes**

### **Prerequisites**
- Python 3.8+ installed
- Node.js 16+ installed
- Terminal/Command Prompt access

---

## **Windows Users**

### **Automatic Setup (Easiest)**
```bash
cd "c:\Users\saksh\Downloads\hinglish nlp"
.\setup.bat
```

### **Manual Setup**

**Terminal 1 - Backend:**
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate.bat
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open: **http://localhost:5173**

---

## **Mac/Linux Users**

### **Automatic Setup (Easiest)**
```bash
cd "/path/to/hinglish nlp"
chmod +x setup.sh
./setup.sh
```

### **Manual Setup**

**Terminal 1 - Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open: **http://localhost:5173**

---

## **What You'll See**

### **Frontend (http://localhost:5173)**
- Clean, modern UI with glassmorphism design
- Input textarea for Hinglish text
- Example buttons for quick testing
- Real-time prediction results
- Confidence scores and probability charts
- Prediction history panel
- Dark/light theme toggle

### **Backend (http://localhost:8000)**
- Health check: `http://localhost:8000/health`
- API docs: `http://localhost:8000/docs` (Swagger UI)
- Prediction: `POST http://localhost:8000/predict`

---

## **Example Test**

### **Via Frontend**
1. Open http://localhost:5173
2. Type or click example: "Oye bhosdike kaisa hai"
3. Click "Analyze"
4. See results!

### **Via API (curl)**
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Oye bhosdike kaisa hai"}'
```

### **Expected Response**
```json
{
  "prediction": "abusive_friendly",
  "confidence": 92.5,
  "scores": {
    "abusive_friendly": 92.5,
    "abusive_hostile": 2.1,
    "non_abusive_positive": 3.2,
    "non_abusive_negative": 2.2
  }
}
```

---

## **Demo Mode vs Real Model**

### **Currently: Demo Mode** ✅
- No heavy dependencies (torch, transformers)
- Instant setup and testing
- Mock predictions for demonstration

### **To Use Real Model**
1. Uncomment in `backend/requirements.txt`:
   ```
   torch==2.1.0
   transformers==4.35.2
   ```

2. Install: `pip install -r requirements.txt`

3. Download base model:
   ```bash
   cd backend
   python download_model.py
   ```

4. Fine-tune on your Hinglish dataset

5. Place trained model in `backend/saved_model/`

---

## **Keyboard Shortcuts**

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Analyze text |
| `Shift + Enter` | Analyze text |

---

## **Project Structure**

```
hinglish nlp/
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API service
│   │   ├── utils/            # Helpers
│   │   ├── styles/           # CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── backend/                   # FastAPI application
│   ├── app/
│   │   ├── api/              # Routes
│   │   ├── core/             # Config
│   │   ├── models/           # Model loading
│   │   ├── schemas/          # Data validation
│   │   ├── services/         # Prediction logic
│   │   └── main.py
│   ├── saved_model/          # Model directory
│   ├── venv/                 # Virtual environment
│   └── requirements.txt
│
├── README.md                 # Full documentation
├── QUICKSTART.md            # This file
└── setup.bat / setup.sh     # Setup scripts
```

---

## **Common Issues**

### **"Port 5173 already in use"**
```bash
npm run dev -- --port 3000
```

### **"Port 8000 already in use"**
```bash
uvicorn app.main:app --reload --port 8001
```

### **"ModuleNotFoundError: No module named..."**
Make sure virtual environment is activated:
```bash
# Windows
.\venv\Scripts\activate.bat

# Mac/Linux
source venv/bin/activate
```

### **"npm: command not found"**
Install Node.js from https://nodejs.org/

### **"python: command not found"**
Install Python from https://python.org/

---

## **Next Steps**

1. ✅ **Test the application** - Use examples and test with your own text
2. 📚 **Read full documentation** - See README.md for complete guide
3. 🎨 **Customize UI** - Edit components in `frontend/src/`
4. 🤖 **Add your model** - Replace mock with real trained model
5. 🚀 **Deploy** - Follow deployment section in README.md

---

## **Deployment Quick Links**

- **Frontend → Vercel**: `vercel.json` configured
- **Backend → Render**: `render.yaml` configured
- Full deployment guide in README.md

---

## **Questions?**

1. Check **README.md** for comprehensive documentation
2. Check **TROUBLESHOOTING** section in README.md
3. Review **API Documentation** at http://localhost:8000/docs

---

**Happy coding! 🎉**
