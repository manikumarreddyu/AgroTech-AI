from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the crop recommendation model
crop_model = joblib.load('crop_rotation_recommendation_model.pkl')

# Define mappings directly in the Flask code
previous_crop_mapping = {
    'Groundnut': 1,
    'Millets': 2,
    'Wheat': 3,
    'Maize': 4,
    'Cotton': 5,
    'Sorghum': 6,
    'Barley': 7
}

soil_type_mapping = {
    'Loamy': 1,
    'Clayey': 2,
    'Sandy': 3,
    'Saline': 4,
}

crop_mapping = {
    1: 'Wheat',
    2: 'Rice',
    3: 'Millets',
    4: 'Cotton',
    5: 'Groundnut',
    6: 'Maize',
    7: 'Sorghum',
    8: 'Barley',
}

@app.route('/crop_recommendation', methods=['POST'])
def crop_recommendation():
    try:
        # Get data from the POST request
        data = request.json
        logger.info("Received data: %s", data)  # Log received data

        # Validate required fields
        required_fields = ['Previous Crop', 'Soil Type', 'Moisture Level', 'Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Extract features from the data
        previous_crop = data.get('Previous Crop')
        soil_type = data.get('Soil Type')
        moisture_level = data.get('Moisture Level')
        nitrogen = data.get('Nitrogen (N)')
        phosphorus = data.get('Phosphorus (P)')
        potassium = data.get('Potassium (K)')

        # Prepare data for prediction
        input_data = pd.DataFrame([{
            "Previous Crop": previous_crop_mapping.get(previous_crop, -1),  # Map to integer
            "Soil Type": soil_type_mapping.get(soil_type, -1),  # Map to integer
            "Moisture Level": moisture_level,
            "Nitrogen (N)": nitrogen,
            "Phosphorus (P)": phosphorus,
            "Potassium (K)": potassium
        }])

        # Make prediction
        prediction = crop_model.predict(input_data)
        logger.info("Prediction: %s", prediction)

        if prediction[0] in crop_mapping:
            recommended_crop = crop_mapping[prediction[0]]
        else:
            return jsonify({'Recommended Crop': 'No prediction available'}), 500

        return jsonify({'Recommended Crop': recommended_crop})

    except Exception as e:
        logger.error("Error occurred: %s", str(e))
        return jsonify({'error': 'An error occurred while processing your request.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
