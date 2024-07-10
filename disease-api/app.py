import os
from flask import Flask, jsonify, request
from PIL import Image
from flask_cors import CORS, cross_origin
import torchvision.transforms.functional as TF
import CNN
import numpy as np
import torch
import pandas as pd

# Create a Flask application instance
app = Flask(__name__)
application = app

# Enable CORS for all routes, allowing requests from any origin
CORS(app, resources={r"/*": {"origins": "*"}})

# Ensure the directory for uploaded files exists
UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the disease and supplement information
disease_info = pd.read_csv('disease_info.csv', encoding='cp1252')
supplement_info = pd.read_csv('supplement_info.csv', encoding='cp1252')

# Load the model
model = CNN.CNN(39)
model.load_state_dict(torch.load("plant_disease_model_1_latest.pt"))
model.eval()

def prediction(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message": "API is Running"
    }
    return jsonify(data)

# Define a route for handling file submissions
@app.route('/submit', methods=['POST'])
@cross_origin()
def submit():
    if request.method == 'POST':
        try:
            image = request.files['image']
            filename = image.filename
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(file_path)
            print(file_path)
            pred = prediction(file_path)
            title = disease_info['disease_name'][pred]
            description = disease_info['description'][pred]
            prevent = disease_info['Possible Steps'][pred]
            image_url = disease_info['image_url'][pred]
            supplement_name = supplement_info['supplement name'][pred]
            supplement_image_url = supplement_info['supplement image'][pred]
            supplement_buy_link = supplement_info['buy link'][pred]
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
            print(f"Error during prediction: {e}")
            return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
