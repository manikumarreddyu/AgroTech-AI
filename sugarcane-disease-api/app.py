import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from prediction import predict_sugarcane  # Importing the prediction function

# Class labels for sugarcane diseases
CLASS_LABELS = ['Healthy', 'Mosaic', 'RedRot', 'Rust', 'Yellow']
# Detailed descriptions for each class label
LABEL_DESCRIPTION = [
    {
        "label": "Healthy",
        "description": "The sugarcane plant is healthy and vigorous, displaying bright green leaves without any signs of disease.",
        "symptoms": "None observed.",
        "impact": "No adverse effects on yield; optimal growth.",
        "recommended_action": "Maintain regular care practices."
    },
    {
        "label": "Mosaic",
        "description": "The plant exhibits mosaic patterns on the leaves, indicating a viral infection that disrupts normal leaf development.",
        "symptoms": "Yellow and green mottled patterns on leaves, stunted growth.",
        "impact": "Can lead to significant yield losses if not controlled.",
        "recommended_action": "Remove infected plants to prevent the spread of the virus and consider resistant varieties for replanting."
    },
    {
        "label": "RedRot",
        "description": "This plant shows symptoms of red rot, a serious fungal disease affecting the stalk.",
        "symptoms": "Discoloration of the stalk, soft rot, and decay at the base.",
        "impact": "Severe yield loss; can lead to crop failure if untreated.",
        "recommended_action": "Implement crop rotation, use resistant varieties, and apply appropriate fungicides."
    },
    {
        "label": "Rust",
        "description": "The presence of rust is indicated by orange-brown pustules on the undersides of leaves.",
        "symptoms": "Leaf spotting and premature leaf drop.",
        "impact": "Can reduce photosynthesis, leading to lower yields.",
        "recommended_action": "Apply fungicides as necessary and remove infected leaves."
    },
    {
        "label": "Yellow",
        "description": "The leaves of this sugarcane plant are turning yellow, which may indicate stress from various factors, including nutrient deficiency or disease.",
        "symptoms": "Yellowing of leaves, potential wilting.",
        "impact": "Can indicate declining health and potential yield reduction if not addressed.",
        "recommended_action": "Investigate potential causes such as nutrient deficiencies or water stress and take corrective actions."
    }
]

# Flask App initialization
app = Flask(__name__)
application = app  # For compatibility with some WSGI servers
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route('/', methods=['GET'])
def get_data():
    # Simple GET endpoint to check if the API is running
    data = {
        "message": "SUGARCANE API is Running",
    }
    return jsonify(data)  # Return a JSON response

@app.route('/submit_sugarcane', methods=['POST'])
def submit():
    # Endpoint to handle image submission and prediction
    if request.method == 'POST':
        try:
            # Check if an image is included in the request
            if 'image' not in request.files:
                return jsonify({'error': 'No image part in the request'}), 400
            image = request.files['image']  # Get the uploaded image
            filename = image.filename  # Get the filename
            file_path = os.path.join('uploaded_image', filename)  # Create the full file path
            image.save(file_path)  # Save the image to the specified directory
            
            # Predict the disease based on the uploaded image
            pred = predict_sugarcane(file_path)
            label_index = int(pred)  # Convert prediction to integer index
            
            # Check if prediction is valid (0-4 for class labels)
            if label_index > 4:
                raise ValueError("Invalid prediction value")
            label = CLASS_LABELS[label_index]  # Get the corresponding label
            os.remove(file_path)  # Remove the uploaded image to save space
            
            # Return the prediction and details about the disease
            return jsonify({
                'prediction': label,
                'details': LABEL_DESCRIPTION[label_index]
            })
        
        except Exception as e:
            print("error:", str(e))  # Log the error
            return jsonify({'error': str(e)}), 500  # Return error response

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask application in debug mode


# GITHUB : https://github.com/IkkiOcean