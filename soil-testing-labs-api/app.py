from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
import re
import os

# Initialize Google Gemini API with the embedded key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

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
    """Extract a valid JSON block from the response text."""
    json_pattern = r'\{.*\}|\[.*\]'
    match = re.search(json_pattern, text, re.DOTALL)
    
    if match:
        return match.group(0)
    return None

def get_gemini_response(location):
    """Send a message to Gemini API and get the response."""
    prompt = field_prompt + location
    response = chat.send_message(prompt, stream=True)
    
    # Capture the full response text
    response_text = "".join(chunk.text for chunk in response)
    return response_text

# API route to get soil testing labs based on location
@app.route('/find_soil_labs', methods=['POST'])
def find_soil_labs():
    data = request.get_json()

    # Validate input
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
            return jsonify(soil_labs), 200
        except json.JSONDecodeError:
            return jsonify({"error": "Error decoding the JSON data."}), 500
    else:
        return jsonify({"error": "No valid JSON found in the response."}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
