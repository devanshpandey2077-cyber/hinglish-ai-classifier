#import torch
import numpy as np
from app.core.config import DEVICE, CLASS_LABELS


def predict(text: str, tokenizer, model) -> dict:
    """
    Predict the class of input text.
    
    Args:
        text: Input text to classify
        tokenizer: HuggingFace tokenizer or mock
        model: HuggingFace model or mock
        
    Returns:
        Dictionary with prediction, confidence, and scores
    """
    # Check if using mock
    is_mock = isinstance(model, type) and model.__class__.__name__ == 'MockModel'
    is_mock = is_mock or (hasattr(model, '__class__') and model.__class__.__name__ == 'MockModel')
    
    if is_mock:
        # Demo predictions based on text patterns
        text_lower = text.lower()
        
        # Simple rule-based demo predictions
        if any(word in text_lower for word in ['love', 'best', 'proud', 'brother', 'sister']):
            scores = {
                "abusive_friendly": 2.1,
                "abusive_hostile": 0.5,
                "non_abusive_positive": 95.2,
                "non_abusive_negative": 2.2
            }
        elif any(word in text_lower for word in ['madarchod', 'bsdk', 'chutiya', 'nikal', 'chup']):
            scores = {
                "abusive_friendly": 1.5,
                "abusive_hostile": 94.8,
                "non_abusive_positive": 1.2,
                "non_abusive_negative": 2.5
            }
        elif any(word in text_lower for word in ['oye', 'bhosdike', 'kaisa', 'saale', 'harami']):
            scores = {
                "abusive_friendly": 92.5,
                "abusive_hostile": 2.1,
                "non_abusive_positive": 3.2,
                "non_abusive_negative": 2.2
            }
        elif any(word in text_lower for word in ['wah', 'coding', 'expected', 'tumse']):
            scores = {
                "abusive_friendly": 1.2,
                "abusive_hostile": 2.3,
                "non_abusive_positive": 3.1,
                "non_abusive_negative": 93.4
            }
        else:
            # Default
            scores = {
                "abusive_friendly": 25.0,
                "abusive_hostile": 25.0,
                "non_abusive_positive": 25.0,
                "non_abusive_negative": 25.0
            }
    else:
        # Real model prediction
        inputs = tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=512,
            padding=True
        )
        
        inputs = {k: v.to(DEVICE) for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
        
        probabilities = torch.nn.functional.softmax(logits, dim=-1)[0]
        confidence_scores = (probabilities * 100).cpu().numpy()
        
        scores = {
            CLASS_LABELS[i]: float(confidence_scores[i])
            for i in range(len(CLASS_LABELS))
        }
    
    # Find the class with highest score
    predicted_class = max(scores, key=scores.get)
    confidence = scores[predicted_class]
    
    return {
        "prediction": predicted_class,
        "confidence": round(confidence, 2),
        "scores": {k: round(v, 2) for k, v in scores.items()}
    }
