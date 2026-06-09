# Model Training Instructions

This directory should contain your trained model files.

## Required Files:
1. `config.json` - Model configuration (provided)
2. `tokenizer_config.json` - Tokenizer configuration (provided)
3. `pytorch_model.bin` - Model weights (needs to be added)
4. `vocab.txt` - Vocabulary file (for BERT-like models)

## Steps to prepare the model:

1. Train or download a fine-tuned DistilBERT (or similar) model for Hinglish text classification
2. Save the model using HuggingFace Transformers:
   ```python
   model.save_pretrained('./backend/saved_model/')
   tokenizer.save_pretrained('./backend/saved_model/')
   ```

3. The model should output 4 classes:
   - 0: abusive_friendly
   - 1: abusive_hostile
   - 2: non_abusive_positive
   - 3: non_abusive_negative

## Sample Training Code:

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from datasets import load_dataset

# Load pre-trained model and tokenizer
model_name = "distilbert-base-multilingual-cased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=4)

# Load and prepare your dataset
dataset = load_dataset("csv", data_files={"train": "train.csv", "validation": "val.csv"})

def preprocess_function(examples):
    return tokenizer(examples["text"], truncation=True, max_length=512)

tokenized_dataset = dataset.map(preprocess_function, batched=True)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./saved_model",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
)

# Train
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["validation"],
)

trainer.train()

# Save the final model
model.save_pretrained("./backend/saved_model/")
tokenizer.save_pretrained("./backend/saved_model/")
```

## Dataset Format (CSV):

```csv
text,label
"Oye bhosdike kaisa hai",abusive_friendly
"Madarchod chup ho ja",abusive_hostile
"Love you bro",non_abusive_positive
"Wah kya coding hai",non_abusive_negative
```

For now, the backend will work with the provided config files and use HuggingFace's default tokenizer.
