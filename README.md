# Hinglish Abuse Context Detector - AI SaaS Application

A production-ready AI SaaS application for classifying Hinglish text into four abuse context categories using deep learning.

## Features

- **Real-time Classification**: Instantly classify Hinglish text into 4 categories
- **4 Classification Categories**:
  - 🟢 Abusive Friendly (e.g., "Oye bhosdike kaisa hai")
  - 🔴 Abusive Hostile (e.g., "Madarchod chup ho ja")
  - 🔵 Non-abusive Positive (e.g., "Love you bro")
  - 🟠 Non-abusive Negative (e.g., "Wah kya coding hai")

- **Premium UI/UX**:
  - Glassmorphism design
  - Dark/Light theme toggle
  - Animated components with Framer Motion
  - Responsive design
  - Toast notifications
  - Loading states

- **Advanced Features**:
  - Character and word counter
  - Keyboard shortcuts (Ctrl+Enter to analyze)
  - Prediction history with localStorage
  - Copy-to-clipboard functionality
  - Example buttons for quick testing
  - Confidence percentage display
  - Probability distribution charts

## Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **FastAPI** - Modern Python web framework
- **PyTorch** - Deep learning framework
- **Transformers** - HuggingFace library for NLP
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Project Structure

```
project/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API services
│   │   ├── assets/           # Images, icons, etc
│   │   ├── styles/           # CSS files
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Static files
│   ├── index.html            # HTML template
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── core/             # Configuration
│   │   ├── models/           # Model loading
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helper functions
│   │   └── main.py           # FastAPI app
│   ├── saved_model/          # Pre-trained model
│   └── requirements.txt
├── README.md
├── .gitignore
├── vercel.json               # Vercel deployment config
└── render.yaml               # Render deployment config
```

## Installation

### Prerequisites
- Node.js 16+
- Python 3.8+
- Git

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/Scripts/activate  # Windows
# or
source venv/bin/activate      # macOS/Linux
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Add pre-trained model**:
   - Place your trained model in `backend/saved_model/`
   - Required files:
     - `config.json`
     - `pytorch_model.bin` or `model.safetensors`
     - `tokenizer.json` or `tokenizer_config.json`
     - `vocab.txt` (if using BERT-like models)

5. **Run backend**:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set environment variables** (optional):
```bash
# Create .env.local file
echo "VITE_API_URL=http://localhost:8000" > .env.local
```

4. **Run frontend**:
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## Training the Model

To train your own model:

```bash
# 1. Prepare your dataset with columns: text, label
#    Labels should be: abusive_friendly, abusive_hostile, non_abusive_positive, non_abusive_negative

# 2. Create a training script (example structure)
python train.py --model distilbert-base-uncased --dataset your_dataset.csv --output_dir backend/saved_model

# 3. The script should:
#    - Load the dataset
#    - Fine-tune a transformer model
#    - Save the model and tokenizer
#    - Create config.json with label mappings
```

## API Documentation

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response**:
```json
{
  "status": "healthy",
  "message": "Backend is running and model is loaded"
}
```

#### 2. Root Endpoint
```http
GET /
```

**Response**:
```json
{
  "message": "Hinglish Abuse Context Detector API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "predict": "/predict (POST)"
  }
}
```

#### 3. Make Prediction
```http
POST /predict
Content-Type: application/json

{
  "text": "Oye bhosdike kaisa hai"
}
```

**Response**:
```json
{
  "prediction": "abusive_friendly",
  "confidence": 98.2,
  "scores": {
    "abusive_friendly": 98.2,
    "abusive_hostile": 0.6,
    "non_abusive_positive": 0.8,
    "non_abusive_negative": 0.4
  }
}
```

## Deployment

### Frontend - Vercel

1. **Connect your repository to Vercel**
2. **Set environment variables**:
   - `VITE_API_URL`: Your backend API URL
3. **Deploy**:
```bash
npm run build
# Vercel handles deployment automatically
```

### Backend - Render

1. **Create new Web Service on Render**
2. **Connect your repository**
3. **Set environment variables and deployment settings**:
   - Runtime: Python 3.11
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

Refer to `render.yaml` for additional configuration.

## Usage

### Via Web Interface
1. Open the frontend in your browser
2. Enter Hinglish text in the textarea
3. Click "Analyze" or press Ctrl+Enter
4. View results with confidence scores and probability distribution
5. Check history for past predictions

### Via API
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Oye bhosdike kaisa hai"}'
```

## Keyboard Shortcuts

- **Ctrl+Enter**: Submit text for analysis
- **Shift+Enter**: Also submits text for analysis

## Troubleshooting

### Backend Issues

**Error: Module not found**
```
Solution: Run `pip install -r requirements.txt` in a fresh virtual environment
```

**Error: CUDA out of memory**
```
Solution: The backend will automatically fall back to CPU if CUDA is unavailable
```

**Error: Model not found**
```
Solution: Ensure saved_model/ directory contains all required files:
- config.json
- pytorch_model.bin or model.safetensors
- tokenizer configuration files
```

### Frontend Issues

**Error: API connection failed**
```
Solution: 
1. Ensure backend is running on the configured port
2. Check VITE_API_URL environment variable
3. Verify CORS is enabled on backend
```

**Port already in use**
```
Solution: Kill the process using the port or run on a different port:
npm run dev -- --port 3000
```

### CORS Issues

If you get CORS errors, ensure the backend has CORS middleware enabled (already configured in `app/main.py`).

## Performance Optimization

- Frontend builds with Vite for fast load times
- Model uses quantization for faster inference
- React components are optimized with memoization
- Lazy loading for components where applicable
- CSS is optimized with Tailwind purging

## Security

- CORS properly configured
- Input validation on both frontend and backend
- Environment variables for sensitive configuration
- No hardcoded API URLs in frontend

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check React/FastAPI documentation
4. Open an issue on GitHub

## Future Enhancements

- [ ] Multi-language support
- [ ] User authentication and profiles
- [ ] Batch prediction API
- [ ] Advanced analytics dashboard
- [ ] Model versioning
- [ ] A/B testing framework
- [ ] Rate limiting and usage analytics
- [ ] Export results as PDF/CSV

---

**Built with ❤️ using React, FastAPI, and Transformers**
