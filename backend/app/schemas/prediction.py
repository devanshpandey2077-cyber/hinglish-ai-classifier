from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=1024, description="Text to classify")


class PredictionResponse(BaseModel):
    prediction: str = Field(..., description="Predicted class")
    confidence: float = Field(..., ge=0, le=100, description="Confidence percentage")
    scores: dict = Field(..., description="Scores for all classes")


class HealthResponse(BaseModel):
    status: str
    message: str
