from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle 

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})

car_price_model = pickle.load(open('car_price_model.pkl', 'rb'))
crop_model = pickle.load(open('crop_recommendation_model.pkl', 'rb'))


# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  
# Define a route for making predictions
@app.route('/car_predict', methods=['POST'])
def car_predict():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        prediction = car_price_model.predict(query_df)
        return jsonify({'Prediction': list(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/crop_predict', methods=['POST'])
def crop_predict2():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        prediction = crop_model.predict(query_df)
        return jsonify({'Prediction': list(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

# from flask import Flask, request, jsonify
# import pandas as pd
# from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
# import pickle 

# # Create a Flask application instance
# app = Flask(__name__)

# # Enable CORS for all routes, allowing requests from any origin
# CORS(app,resources={r"/*":{"origins":"*"}})


# model = pickle.load(open('ml_model2.pkl', 'rb'))

# # Define a route for handling HTTP GET requests to the root URL
# @app.route('/', methods=['GET'])
# def get_data():
#     data = {
#         "message":"API is Running"
#     }
#     return jsonify(data)
  
# # Define a route for making predictions
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         query_df = pd.DataFrame([data])
#         prediction = model.predict(query_df)
#         return jsonify({'Prediction': list(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)

# from flask import Flask, request, jsonify
# import pandas as pd
# from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
# import pickle

# # Create a Flask application instance
# app = Flask(__name__)

# # Enable CORS for all routes, allowing requests from any origin
# CORS(app,resources={r"/":{"origins":""}})

# cropmodel = pickle.load(open('crop_recommendation_model.pkl', 'rb'))
# carmodel = pickle.load(open('car_price_model.pkl', 'rb'))

# # Define a route for handling HTTP GET requests to the root URL
# @app.route('/', methods=['GET'])
# def get_data():
#     data = {
#         "message":"API is Running"
#     }
#     return jsonify(data)

 
  
# # Define a route for making predictions
# @app.route('/croppredict', methods=['POST'])
# def predictcrop():
#     try:
#         data = request.get_json()
#         query_df = pd.DataFrame([data])
#         prediction = cropmodel.predict(query_df)
#         return jsonify({'Prediction': list(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)})

# @app.route('/carpredict', methods=['POST'])
# def predictcar():
#     try:
#         data = request.get_json()
#         query_df = pd.DataFrame([data])
#         prediction = carmodel.predict(query_df)
#         return jsonify({'Prediction': list(prediction)})
#     except Exception as e:
#         return jsonify({'error': str(e)})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)