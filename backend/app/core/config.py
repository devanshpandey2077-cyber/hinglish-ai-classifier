import os

# Model configuration
MODEL_DIR = os.path.join(os.path.dirname(__file__), "../../saved_model")

try:
    import torch
    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
except ImportError:
    DEVICE = "cpu"

# Class labels
CLASS_LABELS = {
    0: "abusive_friendly",
    1: "abusive_hostile",
    2: "non_abusive_positive",
    3: "non_abusive_negative"
}

# Reverse mapping for easier access
LABEL_TO_ID = {v: k for k, v in CLASS_LABELS.items()}

# Color mapping for UI
CLASS_COLORS = {
    "abusive_friendly": "#22c55e",  # Green
    "abusive_hostile": "#ef4444",   # Red
    "non_abusive_positive": "#3b82f6",  # Blue
    "non_abusive_negative": "#f97316"   # Orange
}
