# paddy_prediction.py

import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

# Load your trained model
model = load_model('models/rice_model.h5', compile=False)

# Class labels for the paddy diseases
modified_class_label = [
    'Bacterial Leaf Blight', 'Bacterial Leaf Streak', 'Bacterial Panicle Blight', 'Blast',
    'Brown Spot', 'Dead Heart', 'Downy Mildew', 'Hispa', 'Normal', 'Tungro'
]

LABEL_DESCRIPTION = [
    {
        "label": "bacterial_leaf_blight",
        "description": "A bacterial infection that causes dark, water-soaked lesions on the leaves of the sugarcane plant.",
        "symptoms": "Yellowing and browning of the leaves, water-soaked spots, and leaf curling.",
        "impact": "Severe infection can lead to yield loss due to impaired photosynthesis.",
        "recommended_action": "Apply copper-based bactericides and practice crop rotation to reduce bacterial spread."
    },
    {
        "label": "bacterial_leaf_streak",
        "description": "A bacterial disease that manifests as long, narrow streaks on the sugarcane leaves.",
        "symptoms": "Yellow streaks along the veins of leaves, which eventually turn brown and die.",
        "impact": "Leads to reduced photosynthesis and weaker plants, resulting in lower yields.",
        "recommended_action": "Improve field drainage, avoid overhead irrigation, and use resistant varieties."
    },
    {
        "label": "bacterial_panicle_blight",
        "description": "A bacterial disease affecting the panicle, leading to poor grain filling and discolored panicles.",
        "symptoms": "Browning and blighting of the panicle, poor seed formation.",
        "impact": "Significant yield reduction due to poor grain development.",
        "recommended_action": "Remove infected plants, ensure good field hygiene, and use disease-resistant varieties."
    },
    {
        "label": "blast",
        "description": "A fungal disease that attacks leaves, stems, and panicles, forming blast-like lesions.",
        "symptoms": "Spindle-shaped lesions with brown borders and gray centers on leaves.",
        "impact": "Severe yield losses due to damaged leaf tissue and weakened stems.",
        "recommended_action": "Apply appropriate fungicides, use resistant varieties, and ensure proper field drainage."
    },
    {
        "label": "brown_spot",
        "description": "A fungal infection that causes brown lesions on leaves, particularly older leaves.",
        "symptoms": "Small, round to oval brown spots with gray or brown centers.",
        "impact": "Moderate to severe defoliation, reduced photosynthesis, and yield loss.",
        "recommended_action": "Apply foliar fungicides, improve air circulation, and maintain crop health with balanced fertilization."
    },
    {
        "label": "dead_heart",
        "description": "A condition where the central shoot of the sugarcane plant dies, often due to insect or disease damage.",
        "symptoms": "The central shoot dies and turns brown, while surrounding leaves remain unaffected.",
        "impact": "Reduced yield due to stunted plant growth and loss of the main shoot.",
        "recommended_action": "Remove affected plants and control pests or pathogens causing the condition."
    },
    {
        "label": "downy_mildew",
        "description": "A fungal disease that affects the leaves, causing a downy, mold-like growth on the surface.",
        "symptoms": "White to grayish fungal growth on the underside of leaves, along with yellowing and browning.",
        "impact": "Weakened plants, reduced photosynthesis, and yield loss.",
        "recommended_action": "Apply appropriate fungicides, practice crop rotation, and avoid overhead irrigation."
    },
    {
        "label": "hispa",
        "description": "An insect pest that causes damage to sugarcane by feeding on the leaves, leaving white streaks.",
        "symptoms": "White, linear streaks along the leaves, caused by larvae feeding within the leaf tissues.",
        "impact": "Severe infestations can lead to significant leaf area loss, reducing photosynthesis and yield.",
        "recommended_action": "Use insecticides and biological controls like parasitic wasps to manage hispa populations."
    },
    {
        "label": "normal",
        "description": "The sugarcane plant is healthy and vigorous, displaying bright green leaves without any signs of disease.",
        "symptoms": "None observed.",
        "impact": "No adverse effects on yield; optimal growth.",
        "recommended_action": "Maintain regular care practices, including proper irrigation and nutrient management."
    },
    {
        "label": "tungro",
        "description": "A viral disease transmitted by leafhoppers, causing stunted growth and discoloration of leaves.",
        "symptoms": "Yellow-orange discoloration of leaves, stunted growth, and poor tillering.",
        "impact": "Severe yield loss due to stunted plants and reduced grain production.",
        "recommended_action": "Use resistant varieties, control leafhopper populations, and remove infected plants."
    }
]

def preprocess_image(image_path, target_size=(256, 256)):
    """Load and preprocess the image for prediction."""
    img = load_img(image_path, target_size=target_size)
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = tf.cast(img_array / 255.0, tf.float32)
    return img_array

def predict_paddy(image_path):
    """Predict the class of the paddy image."""
    processed_image = preprocess_image(image_path)
    predictions = model.predict(processed_image)
    predicted_class = np.argmax(predictions, axis=1)
    return predicted_class[0]  # Return the class index

def paddy_prediction(image_path):
    """Main function to handle the prediction logic."""
    try:
        label_index = predict_paddy(image_path)
        label = modified_class_label[label_index]
        details = LABEL_DESCRIPTION[label_index]

        os.remove(image_path)  # Clean up the image after prediction
        return {
            'prediction': label,
            'details': details
        }
    except Exception as e:
        return {"error": str(e)}
