import os
from flask import Flask, jsonify, request
from PIL import Image
import numpy as np
import tensorflow as tf
import pandas as pd
from flask_cors import CORS

disease_info = pd.read_csv('disease_info.csv', encoding='cp1252')
supplement_info = pd.read_csv('supplement_info.csv', encoding='cp1252')

# Load TensorFlow Lite model
interpreter = tf.lite.Interpreter(model_path="plant_disease_detection.tflite")
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Preprocess image and run inference
def prediction(image_path):
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
application = app
CORS(app)

@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message": "API is Running"
    }
    return jsonify(data)

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        try:
            image = request.files['image']
            filename = image.filename
            file_path = os.path.join('static/uploads', filename)
            image.save(file_path)

            pred = prediction(file_path)
            print(pred)
            
            # Check if prediction is valid
            if pred not in disease_info.index or pred not in supplement_info.index:
                raise ValueError("Invalid prediction value")

            # Retrieve information from the dataframes and convert values to standard Python types
            title = str(disease_info['disease_name'][pred])
            description = str(disease_info['description'][pred])
            prevent = str(disease_info['Possible Steps'][pred])
            image_url = str(disease_info['image_url'][pred])
            supplement_name = str(supplement_info['supplement name'][pred])
            supplement_image_url = str(supplement_info['supplement image'][pred])
            supplement_buy_link = str(supplement_info['buy link'][pred])

            # Convert `pred` (which is likely int64) to a regular Python int
            pred = int(pred)

            return jsonify({
                'title': title,
                'desc': description,
                'prevent': prevent,
                'image_url': image_url,
                'pred': pred,
                'sname': supplement_name,
                'simage': supplement_image_url,
                'buy_link': supplement_buy_link
            })
        except Exception as e:
            print("error:", str(e))
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)