# Paddy Disease Prediction Backend

This contains the backend for a Paddy Disease Prediction application built using Flask. It allows users to upload an image of a paddy leaf, and the model will predict the disease affecting the plant. The backend returns detailed information about the predicted disease.

## Features

- Upload paddy leaf images for disease prediction.
- Supports models for accurate predictions.
- Provides detailed descriptions, symptoms, and recommended actions for each disease.
- Cross-Origin Resource Sharing (CORS) enabled.

## Technology Stack

- **Backend**: Flask (Python)
- **Machine Learning**: TensorFlow (Keras)
- **Models Used**: CNN
- **Other Tools**: Flask-CORS for handling CORS requests

## Class Labels

The following class labels are used to predict the disease:

- Bacterial Leaf Blight
- Bacterial Leaf Streak
- Bacterial Panicle Blight
- Blast
- Brown Spot
- Dead Heart
- Downy Mildew
- Hispa
- Normal (Healthy)
- Tungro

## Disease Descriptions

Each disease label is associated with a detailed description, including:

- **Description**: A brief explanation of the disease.
- **Symptoms**: Common symptoms observed in the plant.
- **Impact**: The effect of the disease on plant yield and growth.
- **Recommended Action**: Suggestions for managing the disease.

## API Endpoints

### 1. Health Check

- **Endpoint**: `/`
- **Method**: `GET`
- **Response**: 
  ```json
  {
      "message": "PADDY API is Running"
  }
### 2. Submit Image for Prediction
- **Endpoint**: /submit_paddy
- **Method**: POST
- **Description**: This endpoint allows users to upload an image and get a disease prediction.
- **Request Body**:
A multipart/form-data containing an image file with the key image.
Response:
A JSON object containing the predicted disease label and detailed information.
Example response:
```
{
    "prediction": "Blast",
    "details": {
        "label": "blast",
        "description": "A fungal disease that attacks leaves, stems, and panicles, forming blast-like lesions.",
        "symptoms": "Spindle-shaped lesions with brown borders and gray centers on leaves.",
        "impact": "Severe yield losses due to damaged leaf tissue and weakened stems.",
        "recommended_action": "Apply appropriate fungicides, use resistant varieties, and ensure proper field drainage."
    }
}
```

## File Structure
```
├── app.py              # Flask application code
├── prediction.py       # Model prediction logic
├── model             # Directory containing pre-trained models
│   └── rice_model.h5
├── uploaded_image      # Directory where uploaded images are temporarily saved
```
