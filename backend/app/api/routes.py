from fastapi import APIRouter, HTTPException
from app.schemas.prediction import PredictionRequest, PredictionResponse, HealthResponse
from app.models.model_loader import ModelLoader
from app.services.prediction_service import predict

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint to verify backend is running.
    """
    if ModelLoader.is_model_available():
        return {
            "status": "healthy",
            "message": "Backend is running and model is loaded"
        }
    else:
        return {
            "status": "warning",
            "message": "Backend is running but model not found in saved_model/ (using demo mode)"
        }


@router.post("/predict", response_model=PredictionResponse)
async def predict_abuse_context(request: PredictionRequest):
    """
    Predict the abuse context of input text.
    
    Args:
        request: PredictionRequest with text field
        
    Returns:
        PredictionResponse with prediction, confidence, and scores
    """
    try:
        tokenizer = ModelLoader.get_tokenizer()
        model = ModelLoader.get_model()
        
        result = predict(request.text, tokenizer, model)
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@router.get("/")
async def root():
    """
    Root endpoint.
    """
    return {
        "message": "Hinglish Abuse Context Detector API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "predict": "/predict (POST)"
        }
    }
