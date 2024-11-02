# seed_quality_predictor.py
import numpy as np
import cv2
from tensorflow import keras
import os

# Load the model
model = keras.models.load_model('models/seed_quality_predict.h5')
categories = ["broken", "discolored", "pure"]

# Set the image size
SIZE = 120

def preprocess_image(image_path):
    """Preprocess the image for prediction."""
    # Read the image in grayscale
    nimage = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    # Check if the image was successfully loaded
    if nimage is None:
        raise ValueError(f"Image at path {image_path} could not be loaded.")

    # Resize and normalize the image
    image = cv2.resize(nimage, (SIZE, SIZE)) / 255.0
    return np.array(image).reshape(-1, SIZE, SIZE, 1)

def predict_seed_quality(image_file):
    """Predict the quality of seeds from the image."""
    try:
        # Save the uploaded file temporarily
        image_path = os.path.join('./uploads', image_file.filename)
        image_file.save(image_path)

        # Preprocess the image
        processed_image = preprocess_image(image_path)

        # Make prediction
        prediction = model.predict(processed_image)
        pclass = np.argmax(prediction)

        # Prepare the response
        result = {
            'class': categories[pclass],
            'confidence': float(np.max(prediction))
        }

        return result

    except Exception as e:
        return {"error": str(e)}

    finally:
        # Optionally delete the uploaded file
        if os.path.exists(image_path):
            os.remove(image_path)
