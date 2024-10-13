import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
model = load_model('model/rice_model.h5')



# label_names = ['bacterial_leaf_blight', 'bacterial_leaf_streak', 'bacterial_panicle_blight', 'blast',
#                'brown_spot', 'dead_heart', 'downy_mildew', 'hispa', 'normal', 'tungro']



def preprocess_image(image_path, target_size=(256, 256)):
    # Load the image
    img = load_img(image_path, target_size=target_size)
    # Convert the image to a NumPy array
    img_array = img_to_array(img)
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    # Rescale the pixel values to the range [0, 1]
    img_array = tf.cast(img_array / 255.0, tf.float32)
    return img_array
def predict_paddy(filepath):
    # Predict the class probabilities for the input image
    predictions = model.predict(preprocess_image(filepath))
    
    # Get the index of the highest probability class (the predicted class)
    predicted_class = np.argmax(predictions, axis=1)
    
    # Print the predicted class index (useful for debugging or logging)
    print(predicted_class)
    
    # Return the predicted class index
    return predicted_class


