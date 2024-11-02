import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# MODELS
try: 
    # Load multiple pre-trained models for sugarcane disease prediction
    model1_VGG = load_model('./models/82_test_acc.h5')  # VGG model
    model2_mobile = load_model('./models/mobilenet_model.keras')  # MobileNet model
    model3 = load_model('./models/inceptionv3_80.h5')  # InceptionV3 model
    model4 = load_model('./models/model2_84percentacc.h5')  # Another model with a specified accuracy
    
    # Store the models in a list for ensemble prediction
    models = [model4, model1_VGG, model2_mobile, model3]
    MODEL_PRESENT = True  # Flag indicating models are loaded successfully
except Exception as e:
    print(f"Error loading models: {str(e)}")  # Print the error message
    MODEL_PRESENT = False  # Flag indicating models failed to load

# PREDICTION
def predict_sugarcane(filepath):
    """Predict the health of sugarcane based on the input image."""
    if not MODEL_PRESENT:
        return 0  # Returns 0 if models aren't present, indicating "Healthy"
    
    # Generate predictions from each model
    preds = [model.predict(preprocess_image(filepath)) for model in models]
    preds_array = np.array(preds)  # Convert predictions list to a NumPy array
    
    # Calculate the average predictions across models
    avg_preds = np.mean(preds_array, axis=0)
    ensemble_pred_label = np.argmax(avg_preds, axis=1)[0]  # Get the final predicted label
    
    return ensemble_pred_label  # Return the ensemble prediction

def preprocess_image(image_path, target_size=(224, 224)):
    """Preprocess the image before feeding it to the model."""
    # Load the image with the specified target size
    img = load_img(image_path, target_size=target_size)
    
    # Convert the image to a NumPy array
    img_array = img_to_array(img)
    
    # Reshape the image to match the model's input shape (add batch dimension)
    img_array = np.expand_dims(img_array, axis=0)
    
    # Rescale the pixel values to the range [0, 1]
    img_array /= 255.0
    
    return img_array  # Return the preprocessed image
