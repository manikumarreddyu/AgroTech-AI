from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
import re
import pandas as pd

# Embed API keys directly
GOOGLE_API_KEY = "AIzaSyAGJryFFaaRZKbpPe_r6S5lXyaV1NyywFU"

# Initialize Google Gemini API with the embedded key
genai.configure(api_key=GOOGLE_API_KEY)

# Define research prompt template for soil testing labs
field_prompt = (
    "As an expert in location-based services and geospatial data, your task is to provide a precise and accurate list of nearby soil testing labs "
    "for the specified location. Please return the response in a well-structured JSON format. "
    "Each entry should include the lab's name, latitude, longitude, and a direct Google Maps link for easy navigation. "
    "Ensure the JSON output follows this structure: [{'name': 'Lab 1', 'latitude': lat, 'longitude': lon, 'link': 'https://www.google.com/maps/...'}, ...]. "
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
    json_pattern = r'\{.*\}|\[.*\]'
    match = re.search(json_pattern, text, re.DOTALL)
    
    if match:
        return match.group(0)
    else:
        return None

def get_gemini_response(location):
    prompt = field_prompt + location
    response = chat.send_message(prompt, stream=True)
    
    # Capture the full response text
    response_text = ""
    for chunk in response:
        response_text += chunk.text
    
    return response_text

# API route to get soil testing labs based on location
@app.route('/find_soil_labs', methods=['POST'])
def find_soil_labs():
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
            soil_labs = json.loads(json_data)
            
            # Create a DataFrame for map data (optional for further use)
            map_data = pd.DataFrame({
                "name": [lab['name'] for lab in soil_labs],
                "latitude": [lab['latitude'] for lab in soil_labs],
                "longitude": [lab['longitude'] for lab in soil_labs],
                "link": [lab['link'] for lab in soil_labs]
            })
            
            # Return the JSON response with nearby soil labs
            return jsonify(soil_labs), 200
        except json.JSONDecodeError:
            return jsonify({"error": "Error decoding the JSON data."}), 500
    else:
        return jsonify({"error": "No valid JSON found in the response."}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
