from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
import re
import pandas as pd
import os

# Initialize Google Gemini API with the embedded key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Define research prompt template for finding electrical and electronics shops
field_prompt = (
    "As an expert in location-based services and geospatial data, your task is to provide a precise and accurate list of nearby electrical and electronics shops "
    "for the specified location. Please return the response in a well-structured JSON format. "
    "Each entry should include the shop's name, latitude, longitude, and a direct Google Maps link for easy navigation. "
    "Ensure the JSON output follows this structure: [{'name': 'Shop 1', 'latitude': lat, 'longitude': lon, 'link': 'https://www.google.com/maps/...'}, ...]. "
    "Please make sure the response is clean and contains only the JSON data, without any additional explanations or text."
)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to load Gemini Pro model and get responses
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

def extract_json(text):
    # Use regex to find a valid JSON block in the response
    json_pattern = r'(\[.*?\]|\{.*?\})'
    match = re.search(json_pattern, text, re.DOTALL)
    
    if match:
        return match.group(0)
    else:
        return None

def get_gemini_response(location):
    prompt = field_prompt + f" {location}"  # Ensure there's a space before the location
    response = chat.send_message(prompt, stream=True)
    
    # Capture the full response text
    response_text = ""
    for chunk in response:
        response_text += chunk.text
    
    return response_text

# API route to get nearby electrical and electronics shops based on location
@app.route('/find_ee_shops', methods=['POST'])
def find_ee_shops():
    data = request.get_json()

    if not data or 'location' not in data:
        return jsonify({"error": "Location not provided"}), 400

    location_input = data['location']
    response = get_gemini_response(location_input)
    
    # Extract JSON from the response text
    json_data = extract_json(response)
    
    if json_data:
        try:
            # Parse the extracted JSON
            ee_shops = json.loads(json_data)

            # Check if the extracted data is a list
            if isinstance(ee_shops, list):
                return jsonify(ee_shops), 200
            else:
                return jsonify({"error": "Unexpected format: JSON is not a list."}), 500
        except json.JSONDecodeError:
            return jsonify({"error": "Error decoding the JSON data."}), 500
    else:
        return jsonify({"error": "No valid JSON found in the response."}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
