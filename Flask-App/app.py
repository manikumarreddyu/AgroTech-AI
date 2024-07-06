# from flask import Flask, render_template

# app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template('index.html')


# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify, render_template
import numpy as np
import pandas as pd
# from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle

# Create a Flask application instance
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

# Enable CORS for all routes, allowing requests from any origin
# CORS(app,resources={r"/*":{"origins":"*"}})

import os
# import sklearn
# Get the current directory of the script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Load models
# crop_model = pickle.load(open(os.path.join(current_dir, 'models', 'crop_recommendation_model.pkl'), 'rb'))
# fertilizer_model = pickle.load(open(os.path.join(current_dir, 'models', 'fertilizer.pkl'), 'rb'))
# classifier_model = pickle.load(open(os.path.join(current_dir, 'models', 'classifier.pkl'), 'rb'))
# soil_quality_model = pickle.load(open(os.path.join(current_dir, 'models', 'soil_quality.pkl'), 'rb'))




# Define a route for handling HTTP GET requests to the root URL
# @app.route('/api', methods=['GET'])
# def get_data():
#     data = {
#         "message":"API is Running"
#     }
#     return jsonify(data)
  
# Define a route for making predictions
# @app.route('/car_predict', methods=['POST'])
# def car_predict():
#     try:
#         data = request.get_json()
#         query_df = pd.DataFrame([data])
#         prediction = car_price_model.predict(query_df)
#         return jsonify({'Prediction': list(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)})
    
# @app.route('/crop_predict', methods=['POST'])
# def crop_predict():
#     try:
#         data = request.get_json()
#         query_df = pd.DataFrame([data])
#         prediction = crop_model.predict(query_df)
#         return jsonify({'Prediction': list(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)})
    
# @app.route('/fertilizer_predict', methods=['POST'])
# def fertilizer_predict():
#     try:
#         data = request.get_json()
#         query_df = pd.DataFrame([data])
#         prediction = fertilizer_model.classes_[classifier_model.predict(query_df)]
#         return jsonify({'Prediction': str(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)})
    
# @app.route('/soil_quality_predict', methods=['POST'])
# def soil_quality_predict():
#     data = request.get_json()
#     features = np.array([
#         data['N'], data['P'], data['K'], data['pH'], data['EC'],
#         data['OC'], data['S'], data['Zn'], data['Fe'], data['Cu'],
#         data['Mn'], data['B']
#     ]).reshape(1, -1)  # Convert to 2D array
#     prediction = soil_quality_model.predict(features)
#     return jsonify({'prediction': str(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
