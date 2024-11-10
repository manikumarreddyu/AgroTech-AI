import pandas as pd
import joblib

# Load the crop recommendation model
crop_model = joblib.load('./models/crop_rotation_recommendation_model.pkl')

# Define mappings
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

def recommend_crop(data):
    try:
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

        if prediction[0] in crop_mapping:
            recommended_crop = crop_mapping[prediction[0]]
        else:
            return {'Recommended Crop': 'No prediction available'}

        return {'Recommended Crop': str(recommended_crop)}

    except Exception as e:
        return {'error': str(e)}
