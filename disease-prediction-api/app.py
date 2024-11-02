import os
from flask import Flask, jsonify, request
from PIL import Image
import numpy as np
import tensorflow as tf
import pandas as pd
from flask_cors import CORS

# Load disease and supplement information
disease_info = pd.read_csv('disease_info.csv', encoding='cp1252')
supplement_info = pd.read_csv('supplement_info.csv', encoding='cp1252')

# Load TensorFlow Lite model
interpreter = tf.lite.Interpreter(model_path="plant_disease_detection.tflite")
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Preprocess image and run inference
def predict(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))  # Resize to match model's input size
    input_data = np.array(image, dtype=np.float32) / 255.0  # Normalize the image
    input_data = np.expand_dims(input_data, axis=0)  # Add batch dimension

    interpreter.set_tensor(input_details[0]['index'], input_data)  # Set input tensor
    interpreter.invoke()  # Run inference

    output_data = interpreter.get_tensor(output_details[0]['index'])  # Get output
    pred = np.argmax(output_data)  # Get predicted index
    return pred

# Flask App Setup
app = Flask(__name__)
CORS(app)

# Create upload directory if it doesn't exist
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/', methods=['GET'])
def get_data():
    return jsonify({"message": "API is Running"})

@app.route('/submit', methods=['POST'])
def submit():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image = request.files['image']
    
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Save the uploaded image
        file_path = os.path.join(UPLOAD_FOLDER, image.filename)
        image.save(file_path)

        # Predict disease
        pred = predict(file_path)

        # Check if prediction is valid
        if pred not in disease_info.index or pred not in supplement_info.index:
            return jsonify({'error': "Invalid prediction value"}), 500

        # Retrieve information from the dataframes
        title = str(disease_info['disease_name'].iloc[pred])
        description = str(disease_info['description'].iloc[pred])
        prevent = str(disease_info['Possible Steps'].iloc[pred])
        image_url = str(disease_info['image_url'].iloc[pred])
        supplement_name = str(supplement_info['supplement name'].iloc[pred])
        supplement_image_url = str(supplement_info['supplement image'].iloc[pred])
        supplement_buy_link = str(supplement_info['buy link'].iloc[pred])

        return jsonify({
            'title': title,
            'desc': description,
            'prevent': prevent,
            'image_url': image_url,
            'pred': int(pred),  # Convert to regular Python int
            'sname': supplement_name,
            'simage': supplement_image_url,
            'buy_link': supplement_buy_link
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
