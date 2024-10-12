from flask import Flask, request, jsonify
import numpy as np
import cv2
from tensorflow import keras
import os

# Initialize the Flask application
app = Flask(__name__)

# Load the model
model = keras.models.load_model('model/model.h5')
categories = ["broken", "discolored", "pure"]

# Set the image size
SIZE = 120

def preprocess_image(image_path):
    """Preprocess the image for prediction."""
    # Read the image
    nimage = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    # Resize and normalize the image
    image = cv2.resize(nimage, (SIZE, SIZE)) / 255.0
    return np.array(image).reshape(-1, SIZE, SIZE, 1)

@app.route('/')
def index():
    return "Welcome to the Seed Quality Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint for predicting seed quality."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    if not file:
        return jsonify({'error': 'No file provided'}), 400

    # Save the uploaded file temporarily
    image_path = os.path.join('./uploads', file.filename)
    file.save(image_path)

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

    # Optionally delete the uploaded file
    os.remove(image_path)

    return jsonify(result)

if __name__ == '__main__':
    # Create uploads directory if not exists
    os.makedirs('./uploads', exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
