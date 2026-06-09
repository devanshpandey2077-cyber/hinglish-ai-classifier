#!/usr/bin/env python3
"""
Script to download and set up the pre-trained model for Hinglish text classification.
This script downloads a base model that you can fine-tune for your dataset.
"""

import os
import sys
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def download_model():
    """Download distilbert-base-multilingual-cased model."""
    
    model_dir = Path(__file__).parent / "saved_model"
    model_dir.mkdir(exist_ok=True)
    
    print("📥 Downloading model and tokenizer from Hugging Face...")
    print("⏳ This may take a few minutes on first run...\n")
    
    try:
        # Download base model
        model_name = "distilbert-base-multilingual-cased"
        
        print(f"Loading model: {model_name}")
        model = AutoModelForSequenceClassification.from_pretrained(
            model_name,
            num_labels=4,
            cache_dir=str(model_dir)
        )
        
        print(f"Loading tokenizer: {model_name}")
        tokenizer = AutoTokenizer.from_pretrained(
            model_name,
            cache_dir=str(model_dir)
        )
        
        # Save to local directory
        model.save_pretrained(str(model_dir))
        tokenizer.save_pretrained(str(model_dir))
        
        print(f"\n✅ Model downloaded successfully to {model_dir}")
        print("\n📝 Next steps:")
        print("1. Fine-tune this model with your Hinglish dataset")
        print("2. The model is ready for inference with the backend")
        print("\n🚀 You can now run: uvicorn app.main:app --reload")
        
    except Exception as e:
        print(f"\n❌ Error downloading model: {e}")
        print("\nPlease ensure you have internet connection and try again.")
        sys.exit(1)

if __name__ == "__main__":
    download_model()
