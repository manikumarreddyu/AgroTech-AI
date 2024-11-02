import tensorflow as tf
import numpy as np
from PIL import Image
import io

# Load TFLite Model and allocate tensors
interpreter = tf.lite.Interpreter(model_path="./models/plant_disease_model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Define class names
CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 
    'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 
    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 
    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 
    'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
    'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 
    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 
    'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

def model_prediction(image_bytes):
    """Function to predict the plant disease from an image."""
    try:
        # Load and preprocess the image
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image = image.resize((224, 224))
        input_arr = np.array(image, dtype=np.float32) / 255.0  # Normalize the image
        input_arr = np.expand_dims(input_arr, axis=0)  # Add batch dimension

        # Set the tensor for the input
        interpreter.set_tensor(input_details[0]['index'], input_arr)

        # Run the model
        interpreter.invoke()

        # Get the output tensor and return the index of the max element
        output_data = interpreter.get_tensor(output_details[0]['index'])
        return int(np.argmax(output_data))
    
    except Exception as e:
        print(f"Error in model_prediction: {e}")
        return None

def get_class_name(index):
    """Function to get the class name based on the index."""
    if index is not None and 0 <= index < len(CLASS_NAMES):
        return CLASS_NAMES[index]
    return "Unknown Class"  # Improved handling for invalid index
