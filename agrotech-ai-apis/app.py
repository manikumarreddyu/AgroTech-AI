from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
import re
import os
from mushroom_edibility import check_mushroom_edibility
from crop_recommendation import recommend_crop
from seed_quality_predictor import predict_seed_quality
from plant_disease_detection import model_prediction, get_class_name

# Initialize Google Gemini API with the embedded key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Define research prompt templates for soil testing labs and electrical shops
soil_lab_prompt = (
    "As an expert in location-based services and geospatial data, your task is to provide a precise and accurate list of nearby soil testing labs "
    "for the specified location. Please return the response in a well-structured JSON format. "
    "Each entry should include the lab's name, latitude, longitude, and a direct Google Maps link for easy navigation."
)

ee_shop_prompt = (
    "As an expert in location-based services and geospatial data, your task is to provide a precise and accurate list of nearby electrical and electronics shops "
    "for the specified location. Please return the response in a well-structured JSON format. "
    "Each entry should include the shop's name, latitude, longitude, and a direct Google Maps link for easy navigation."
)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load Gemini Pro model
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

def extract_json(text):
    json_pattern = r'\{.*\}|\[.*\]'
    match = re.search(json_pattern, text, re.DOTALL)
    return match.group(0) if match else None

def get_gemini_response(location, prompt):
    full_prompt = f"{prompt} {location}"
    response = chat.send_message(full_prompt, stream=True)
    return ''.join(chunk.text for chunk in response)

# API route to get soil testing labs based on location
@app.route('/find_soil_labs', methods=['POST'])
def find_soil_labs():
    data = request.get_json()
    if not data or 'location' not in data:
        return jsonify({"error": "Location not provided"}), 400

    location_input = data['location']
    response = get_gemini_response(location_input, soil_lab_prompt)
    json_data = extract_json(response)

    if json_data:
        try:
            soil_labs = json.loads(json_data)
            return jsonify(soil_labs), 200
        except json.JSONDecodeError:
            return jsonify({"error": "Error decoding the JSON data."}), 500
    return jsonify({"error": "No valid JSON found in the response."}), 500

# API route to get nearby electrical and electronics shops based on location
@app.route('/find_ee_shops', methods=['POST'])
def find_ee_shops():
    data = request.get_json()
    if not data or 'location' not in data:
        return jsonify({"error": "Location not provided"}), 400

    location_input = data['location']
    response = get_gemini_response(location_input, ee_shop_prompt)
    json_data = extract_json(response)

    if json_data:
        try:
            ee_shops = json.loads(json_data)
            return jsonify(ee_shops), 200
        except json.JSONDecodeError:
            return jsonify({"error": "Error decoding the JSON data."}), 500
    return jsonify({"error": "No valid JSON found in the response."}), 500

# API route to check mushroom edibility
@app.route("/mushroom_edibility", methods=["POST"])
def mushroom_edibility():
    return check_mushroom_edibility()

# API route to recommend crops based on soil and previous crop information
@app.route('/crop_recommendation', methods=['POST'])
def crop_recommendation_route():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    try:
        print("Received data:", data)  # Debugging: Log received data
        result = recommend_crop(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# API route for seed quality prediction
@app.route('/predict_seed_quality', methods=['POST'])
def predict_seed_quality_route():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if not file:
        return jsonify({'error': 'No file provided'}), 400

    try:
        result = predict_seed_quality(file)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# API route for plant disease prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No image selected for uploading"}), 400

    try:
        img_bytes = file.read()
        result_index = model_prediction(img_bytes)

        if result_index is None:
            return jsonify({"error": "Prediction failed"}), 500

        class_name = get_class_name(result_index)
        return jsonify({"prediction": class_name}), 200 if class_name else jsonify({"error": "Invalid class index returned."}), 500
    except Exception as e:
        print(f"Error in /predict: {e}")
        return jsonify({"error": "An error occurred during prediction"}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
