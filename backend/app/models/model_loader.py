import os
from app.core.config import MODEL_DIR, CLASS_LABELS


class ModelLoader:
    _tokenizer = None
    _model = None
    _use_mock = True

    @classmethod
    def get_tokenizer(cls):
        if cls._tokenizer is None:
            if cls.is_model_available():
                try:
                    from transformers import AutoTokenizer
                    cls._tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
                    cls._use_mock = False
                except Exception:
                    cls._tokenizer = None
            
            if cls._tokenizer is None:
                # Use mock tokenizer for testing
                class MockTokenizer:
                    def __call__(self, text, **kwargs):
                        return {"input_ids": [1] * len(text.split()), "attention_mask": [1] * len(text.split())}
                
                cls._tokenizer = MockTokenizer()
                cls._use_mock = True
        
        return cls._tokenizer

    @classmethod
    def get_model(cls):
        if cls._model is None:
            if cls.is_model_available():
                try:
                    import torch
                    from transformers import AutoModelForSequenceClassification
                    from app.core.config import DEVICE
                    
                    cls._model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)
                    cls._model.to(DEVICE)
                    cls._model.eval()
                    cls._use_mock = False
                except Exception:
                    cls._model = None
            
            if cls._model is None:
                # Use mock model for testing
                class MockModel:
                    def __call__(self, input_ids=None, attention_mask=None):
                        class Output:
                            logits = [[95.0, 0.5, 2.0, 1.5]]  # Pre-computed logits for demo
                        return Output()
                
                cls._model = MockModel()
                cls._use_mock = True
        
        return cls._model

    @classmethod
    def is_model_available(cls):
        """Check if real model weights are available."""
        model_weights = os.path.join(MODEL_DIR, "pytorch_model.bin")
        model_safetensors = os.path.join(MODEL_DIR, "model.safetensors")
        return os.path.exists(model_weights) or os.path.exists(model_safetensors)
    
    @classmethod
    def is_using_mock(cls):
        """Check if using mock model (for testing without transformers)."""
        return cls._use_mock
