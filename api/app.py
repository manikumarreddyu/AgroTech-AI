from flask import Flask, request, jsonify
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai
import numpy as np
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle 
from datetime import datetime
import random
from datetime import datetime
from flask import Blueprint
from math import ceil
from sklearn.preprocessing import LabelEncoder
import logging
import tensorflow as tf
from PIL import Image
import io
import os
import json
from groq import Groq
import time
import re
import joblib

# Create a Flask application instance
app = Flask(__name__)
application=app
 

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

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

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})


crop_recommendation_model = pickle.load(open('crop_recommendation.pkl', 'rb'))
fertilizer_model = pickle.load(open('fertilizer.pkl', 'rb'))
classifier_model = pickle.load(open('classifier.pkl', 'rb'))
soil_quality_model=pickle.load(open('soil_quality.pkl' ,'rb'))
crop_rotation_recommendation_model = joblib.load('crop_rotation_recommendation_model.pkl')

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)

# Function to load Gemini Pro model and get responses
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

def extract_json(text):
    # Use regex to find a valid JSON block in the response
    json_pattern = r'\{.*\}|\[.*\]'
    match = re.search(json_pattern, text, re.DOTALL)
    
    if match:
        return match.group(0)
    else:
        return None

def get_gemini_response(location):
    prompt = field_prompt + location
    response = chat.send_message(prompt, stream=True)
    
    # Capture the full response text
    response_text = ""
    for chunk in response:
        response_text += chunk.text
    
    return response_text

# API route to get soil testing labs based on location
@app.route('/soil_labs', methods=['POST'])
def find_soil_labs():
    data = request.get_json()

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
            
            # Create a DataFrame for map data (optional for further use)
            map_data = pd.DataFrame({
                "name": [lab['name'] for lab in soil_labs],
                "latitude": [lab['latitude'] for lab in soil_labs],
                "longitude": [lab['longitude'] for lab in soil_labs],
                "link": [lab['link'] for lab in soil_labs]
            })
            
            # Return the JSON response with nearby soil labs
            return jsonify(soil_labs), 200
        except json.JSONDecodeError:
            return jsonify({"error": "Error decoding the JSON data."}), 500
    else:
        return jsonify({"error": "No valid JSON found in the response."}), 500

# Load API key
working_dir = os.path.dirname(os.path.abspath(__file__))
config_data = json.load(open(f"{working_dir}/config.json"))
GROQ_API_KEY = config_data["GROQ_API_KEY"]
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

client = Groq()

# Rate limiting variables
RATE_LIMIT = 20  # Maximum 20 requests per minute
rate_limit_store = {}  # Store to track user requests by IP


# Premade requests
premade_requests = {
    "What is AgroTech AI?": (
        "AgroTech AI is a cutting-edge platform that uses artificial intelligence to improve farming practices. "
        "It helps farmers make better decisions by providing insights based on data, ultimately leading to more efficient and productive agriculture. "
        "To learn more about us, feel free to visit our <a href='https://agro-tech-ai.vercel.app/aboutus' style='color: blue; text-decoration: underline;'>About Us page</a>."
    ),
    "How does the equipment rental platform work?": (
        "Our equipment rental platform lets farmers easily rent advanced farming equipment when they need it. "
        "This on-demand service allows you to access the latest tools without the high costs of ownership, helping you to enhance your farming operations."
    ),
    "Is there any training for using the technology?": (
        "Yes, we provide detailed training modules designed to help farmers learn how to use our technology effectively. "
        "These modules cover everything from basic operations to advanced features, ensuring that you feel confident in using our tools."
    ),
    "How do I get started with AgroTech AI?": (
        "To get started, go to the <a href='https://agro-tech-ai.vercel.app/login' style='color: blue; text-decoration: underline;'>Login</a> in the navigation bar. "
        "From there, select 'Don’t have an account? Sign Up' and fill in your name, email, and password to explore our AI-powered tools and services!"
    ),
    "Why use AI in agriculture?": (
        "AI optimizes resources, predicts crop yields, and reduces waste, improving the overall efficiency of farming practices. "
        "Check out our <a href='https://agro-tech-ai.vercel.app' style='color: blue; text-decoration: underline;'>home page</a> to learn more."
    ),
    "How do we do it?": (
        "We use machine learning models to analyze data, optimize crop yields, and automate various agricultural processes. "
        "Visit our <a href='https://agro-tech-ai.vercel.app/aboutus' style='color: blue; text-decoration: underline;'>About Us page</a> to learn more about our approach."
    ),
    "What kind of solutions does AgroTech AI offer?": (
        "AgroTech AI offers solutions like precision farming, automated irrigation, and pest control using AI-driven analytics. "
        "These solutions help farmers increase productivity and improve their overall yield."
    ),
    "What features does AgroTech AI offer?": (
        "Our platform provides features such as soil analysis, crop monitoring, and AI-driven decision-making tools. "
        "Check out the navigation bar on our <a href='https://agro-tech-ai.vercel.app' style='color: blue; text-decoration: underline;'>website</a> to access all the features available."
    ),
    "How do I create an account?": (
        "To sign up, go to the <a href='https://agro-tech-ai.vercel.app/login' style='color: blue; text-decoration: underline;'>Login</a> in the navigation bar, then select 'Don’t have an account? Sign Up.' "
        "Fill in your name, email, and password, and you're done! You'll then be able to start exploring our amazing features."
    ),
    "Where can I find more information about your features?": (
        "You can find detailed information about all our features on our <a href='https://agro-tech-ai.vercel.app' style='color: blue; text-decoration: underline;'>home page</a>. "
        "This area provides insights into how each tool works and how it can benefit your farming practices."
    )
}


def is_rate_limited(ip):
    current_time = time.time()
    if ip not in rate_limit_store:
        rate_limit_store[ip] = []
    
    # Filter out requests older than 60 seconds
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if current_time - t < 60]
    
    # Check if the number of requests exceeds the rate limit
    if len(rate_limit_store[ip]) >= RATE_LIMIT:
        return True
    rate_limit_store[ip].append(current_time)
    return False

@app.route('/chatbot', methods=['POST'])
def chat():
    ip = request.remote_addr
    if is_rate_limited(ip):
        return jsonify({"error": "Rate limit exceeded. Please wait and try again."}), 429

    data = request.json
    user_prompt = data.get('prompt')

    # Check if the prompt matches a pre-made prompt

    if premade_requests.get(user_prompt):
        return jsonify({"response": premade_requests[user_prompt]})

    # If not a pre-made prompt, use the LLM
    messages = [
        {'role': "system", "content": "You are an AI assistant for AgroTech AI, an innovative platform that leverages artificial intelligence to enhance agricultural practices. Provide helpful and accurate information about AgroTech AI's services and agricultural technology."},
        {"role": "user", "content": user_prompt}
    ]

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages
        )
        assistant_response = response.choices[0].message.content
        return jsonify({"response": assistant_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Load TFLite Model and allocate tensors
interpreter = tf.lite.Interpreter(model_path="plant_disease_model.tflite")
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
    try:
        # Load and preprocess the image
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image = image.resize((224, 224))
        input_arr = np.array(image)
        input_arr = np.expand_dims(input_arr, axis=0).astype(np.float32) / 255.0

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

@app.route('/disease_predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No image selected for uploading"}), 400

    try:
        img_bytes = file.read()
        result_index = model_prediction(img_bytes)

        if result_index is None:
            return jsonify({"error": "Prediction failed"}), 500

        class_name = CLASS_NAMES[result_index]
        return jsonify({"prediction": class_name}), 200

    except Exception as e:
        print(f"Error in /predict: {e}")
        return jsonify({"error": "An error occurred during prediction"}), 500

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

@app.route('/crop_rotation', methods=['POST'])
def crop_recommendation():
    try:
        # Get data from the POST request
        data = request.json
        print("Received data:", data)  # Debugging: Log received data

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
        prediction = crop_rotation_recommendation_model.predict(input_data)
        print("Prediction:", prediction)

        if prediction[0] in crop_mapping:
            recommended_crop = crop_mapping[prediction[0]]
        else:
            return jsonify({'Recommended Crop': 'No prediction available'})

        return jsonify({'Recommended Crop': str(recommended_crop)})

    except Exception as e:
        return jsonify({'error': str(e)})
 




  
# Define a route for making predictions  
@app.route('/crop_predict', methods=['POST'])
def crop_predict():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        prediction = crop_recommendation_model.predict(query_df)
        return jsonify({'Prediction': list(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/fertilizer_predict', methods=['POST'])
def fertilizer_predict():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        prediction = fertilizer_model.classes_[classifier_model.predict(query_df)]
        return jsonify({'Prediction': str(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})
    
    # Define your predefined categories
soil_types = ['Clayey', 'Sandy', 'Black', 'Loamy', 'Red']
crop_types = ['Barley', 'Groundnuts', 'Wheat', 'Tobacco', 'Sugarcane', 
              'Pulses', 'Paddy', 'Oil Seeds', 'Maize', 'Millets', 'Cotton']


    
@app.route('/soil_quality_predict', methods=['POST'])
def soil_quality_predict():
    data = request.get_json()
    features = np.array([
        data['N'], data['P'], data['K'], data['pH'], data['EC'],
        data['OC'], data['S'], data['Zn'], data['Fe'], data['Cu'],
        data['Mn'], data['B']
    ]).reshape(1, -1)  # Convert to 2D array
    prediction = soil_quality_model.predict(features)
    return jsonify({'prediction': str(prediction[0])})

@app.route('/price_predict', methods=['GET'])
def price_predict():
    commodity_dict = {
        "arhar": "crops/Arhar.csv",
        "bajra": "crops/Bajra.csv",
        "barley": "crops/Barley.csv",
        "copra": "crops/Copra.csv",
        "cotton": "crops/Cotton.csv",
        "sesamum": "crops/Sesamum.csv",
        "gram": "crops/Gram.csv",
        "groundnut": "crops/Groundnut.csv",
        "jowar": "crops/Jowar.csv",
        "maize": "crops/Maize.csv",
        "masoor": "crops/Masoor.csv",
        "moong": "crops/Moong.csv",
        "niger": "crops/Niger.csv",
        "paddy": "crops/Paddy.csv",
        "ragi": "crops/Ragi.csv",
        "rape": "crops/Rape.csv",
        "jute": "crops/Jute.csv",
        "safflower": "crops/Safflower.csv",
        "soyabean": "crops/Soyabean.csv",
        "sugarcane": "crops/Sugarcane.csv",
        "sunflower": "crops/Sunflower.csv",
        "urad": "crops/Urad.csv",
        "wheat": "crops/Wheat.csv"
    }

    annual_rainfall = [29, 21, 37.5, 30.7, 52.6, 150, 299, 251.7, 179.2, 70.5, 39.8, 10.9]
    base = {
        "Paddy": 1245.5,
        "Arhar": 3200,
        "Bajra": 1175,
        "Barley": 980,
        "Copra": 5100,
        "Cotton": 3600,
        "Sesamum": 4200,
        "Gram": 2800,
        "Groundnut": 3700,
        "Jowar": 1520,
        "Maize": 1175,
        "Masoor": 2800,
        "Moong": 3500,
        "Niger": 3500,
        "Ragi": 1500,
        "Rape": 2500,
        "Jute": 1675,
        "Safflower": 2500,
        "Soyabean": 2200,
        "Sugarcane": 2250,
        "Sunflower": 3700,
        "Urad": 4300,
        "Wheat": 1350
    }
    commodity_list = []


    class Commodity:
        def __init__(self, csv_name):
            self.name = csv_name
            dataset = pd.read_csv(csv_name)
            self.X = dataset.iloc[:, :-1].values
            self.Y = dataset.iloc[:, 3].values
            from sklearn.tree import DecisionTreeRegressor
            depth = random.randrange(7, 18)
            self.regressor = DecisionTreeRegressor(max_depth=depth)
            self.regressor.fit(self.X, self.Y)

        def getPredictedValue(self, value):
            if value[1] >= 2019:
                fsa = np.array(value).reshape(1, 3)
                return self.regressor.predict(fsa)[0]
            else:
                c = self.X[:, 0:2]
                x = []
                for i in c:
                    x.append(i.tolist())
                fsa = [value[0], value[1]]
                ind = 0
                for i in range(0, len(x)):
                    if x[i] == fsa:
                        ind = i
                        break
                return self.Y[i]

        def getCropName(self):
            a = self.name.split('.')
            return a[0]


    def TopFiveWinners():
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        prev_month = current_month - 1
        prev_rainfall = annual_rainfall[prev_month - 1]
        current_month_prediction = []
        prev_month_prediction = []
        change = []

        for i in commodity_list:
            current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
            current_month_prediction.append(current_predict)
            prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
            prev_month_prediction.append(prev_predict)
            change.append((((current_predict - prev_predict) * 100 /prev_predict), commodity_list.index(i)))
        sorted_change = change
        sorted_change.sort(reverse=True)

        to_send = []
        for j in range(0, 5):
            perc, i = sorted_change[j]
            name = commodity_list[i].getCropName().split('/')[1]
            to_send.append([name, round((current_month_prediction[i] * base[name]) /100, 2), round(perc, 2)])
        return to_send


    def TopFiveLosers():
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        prev_month = current_month - 1
        prev_rainfall = annual_rainfall[prev_month - 1]
        current_month_prediction = []
        prev_month_prediction = []
        change = []

        for i in commodity_list:
            current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
            current_month_prediction.append(current_predict)
            prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
            prev_month_prediction.append(prev_predict)
            change.append((((current_predict - prev_predict) * 100 /prev_predict), commodity_list.index(i)))
        sorted_change = change
        sorted_change.sort()
        to_send = []
        for j in range(0, 5):
            perc, i = sorted_change[j]
            name = commodity_list[i].getCropName().split('/')[1]
            to_send.append([name, round((current_month_prediction[i] * base[name]) /100, 2), round(perc, 2)])
        return to_send


    def SixMonthsForecast():
        month1 = []
        month2 = []
        month3 = []
        month4 = []
        month5 = []
        month6 = []
        for i in commodity_list:
            crop = SixMonthsForecastHelper(i.getCropName())
            k = 0
            for j in crop:
                time = j[0]
                price = j[1]
                change = j[2]
                if k == 0:
                    month1.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 1:
                    month2.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 2:
                    month3.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 3:
                    month4.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 4:
                    month5.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 5:
                    month6.append((price, change, i.getCropName().split("/")[1], time))
                k += 1
        month1.sort()
        month2.sort()
        month3.sort()
        month4.sort()
        month5.sort()
        month6.sort()
        crop_month_wise = []
        crop_month_wise.append([month1[0][3], month1[len(month1) - 1][2], month1[len(month1) - 1][0],
                                month1[len(month1) - 1][1], month1[0][2], month1[0][0], month1[0][1]])
        crop_month_wise.append([month2[0][3], month2[len(month2) - 1][2], month2[len(month2) - 1][0],
                                month2[len(month2) - 1][1], month2[0][2], month2[0][0], month2[0][1]])
        crop_month_wise.append([month3[0][3], month3[len(month3) - 1][2], month3[len(month3) - 1][0],
                                month3[len(month3) - 1][1], month3[0][2], month3[0][0], month3[0][1]])
        crop_month_wise.append([month4[0][3], month4[len(month4) - 1][2], month4[len(month4) - 1][0],
                                month4[len(month4) - 1][1], month4[0][2], month4[0][0], month4[0][1]])
        crop_month_wise.append([month5[0][3], month5[len(month5) - 1][2], month5[len(month5) - 1][0],
                                month5[len(month5) - 1][1], month5[0][2], month5[0][0], month5[0][1]])
        crop_month_wise.append([month6[0][3], month6[len(month6) - 1][2], month6[len(month6) - 1][0],
                                month6[len(month6) - 1][1], month6[0][2], month6[0][0], month6[0][1]])
        return crop_month_wise


    def SixMonthsForecastHelper(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.split("/")[1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 7):
            if current_month + i <= 12:
                month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
            else:
                month_with_year.append(
                    (current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
        wpis = []
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        change = []

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), y, r])
            wpis.append(current_predict)
            change.append(((current_predict - current_wpi) * 100) /current_wpi)

        crop_price = []
        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2), round(change[i], 2)])

        return crop_price


    def CurrentMonth(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        current_price = (base[name.capitalize()] * current_wpi) /100
        return current_price


    def TwelveMonthsForecast(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 13):
            if current_month + i <= 12:
                month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
            else:
                month_with_year.append(
                    (current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
        max_index = 0
        min_index = 0
        max_value = 0
        min_value = 9999
        wpis = []
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        change = []

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), y, r])
            if current_predict > max_value:
                max_value = current_predict
                max_index = month_with_year.index((m, y, r))
            if current_predict < min_value:
                min_value = current_predict
                min_index = month_with_year.index((m, y, r))
            wpis.append(current_predict)
            change.append(((current_predict - current_wpi) * 100) /current_wpi)

        max_month, max_year, r1 = month_with_year[max_index]
        min_month, min_year, r2 = month_with_year[min_index]
        min_value = min_value * base[name.capitalize()] /100
        max_value = max_value * base[name.capitalize()] /100
        crop_price = []
        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2), round(change[i], 2)])

        x = datetime(max_year, max_month, 1)
        x = x.strftime("%b %y")
        max_crop = [x, round(max_value, 2)]
        x = datetime(min_year, min_month, 1)
        x = x.strftime("%b %y")
        min_crop = [x, round(min_value, 2)]

        return max_crop, min_crop, crop_price


    def TwelveMonthPrevious(name):
        name = name.lower()
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        commodity = commodity_list[0]
        wpis = []
        crop_price = []
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 13):
            if current_month - i >= 1:
                month_with_year.append((current_month - i, current_year, annual_rainfall[current_month - i - 1]))
            else:
                month_with_year.append(
                    (current_month - i + 12, current_year - 1, annual_rainfall[current_month - i + 11]))

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), 2013, r])
            wpis.append(current_predict)

        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2)])
        new_crop_price = []
        for i in range(len(crop_price) - 1, -1, -1):
            new_crop_price.append(crop_price[i])
        return new_crop_price


    arhar = Commodity(commodity_dict["arhar"])
    commodity_list.append(arhar)
    bajra = Commodity(commodity_dict["bajra"])
    commodity_list.append(bajra)
    barley = Commodity(commodity_dict["barley"])
    commodity_list.append(barley)
    copra = Commodity(commodity_dict["copra"])
    commodity_list.append(copra)
    cotton = Commodity(commodity_dict["cotton"])
    commodity_list.append(cotton)
    sesamum = Commodity(commodity_dict["sesamum"])
    commodity_list.append(sesamum)
    gram = Commodity(commodity_dict["gram"])
    commodity_list.append(gram)
    groundnut = Commodity(commodity_dict["groundnut"])
    commodity_list.append(groundnut)
    jowar = Commodity(commodity_dict["jowar"])
    commodity_list.append(jowar)
    maize = Commodity(commodity_dict["maize"])
    commodity_list.append(maize)
    masoor = Commodity(commodity_dict["masoor"])
    commodity_list.append(masoor)
    moong = Commodity(commodity_dict["moong"])
    commodity_list.append(moong)
    niger = Commodity(commodity_dict["niger"])
    commodity_list.append(niger)
    paddy = Commodity(commodity_dict["paddy"])
    commodity_list.append(paddy)
    ragi = Commodity(commodity_dict["ragi"])
    commodity_list.append(ragi)
    rape = Commodity(commodity_dict["rape"])
    commodity_list.append(rape)
    jute = Commodity(commodity_dict["jute"])
    commodity_list.append(jute)
    safflower = Commodity(commodity_dict["safflower"])
    commodity_list.append(safflower)
    soyabean = Commodity(commodity_dict["soyabean"])
    commodity_list.append(soyabean)
    sugarcane = Commodity(commodity_dict["sugarcane"])
    commodity_list.append(sugarcane)
    sunflower = Commodity(commodity_dict["sunflower"])
    commodity_list.append(sunflower)
    urad = Commodity(commodity_dict["urad"])
    commodity_list.append(urad)
    wheat = Commodity(commodity_dict["wheat"])
    commodity_list.append(wheat)

     
    # Retrieve data for different sections
    top_gainers = TopFiveWinners()
    top_losers = TopFiveLosers()
    six_months_forecast = SixMonthsForecast()
    # max_crop, min_crop, crop_price = TwelveMonthsForecast('wheat')  # Example crop, you can choose any
    # Pass data to the HTML template
    commodities = ['arhar','bajra','barley','copra','urad','gram','groundnut','jowar','jute','maize','masoor','moong','niger','paddy','ragi','rape']
    num_buttons_per_row = 8
    num_rows = ceil(len(commodities) /num_buttons_per_row)
    chunks = [commodities[i:i+num_buttons_per_row] for i in range(0, len(commodities), num_buttons_per_row)]
    
    return jsonify({ 'top_gainers': top_gainers,'top_losers': top_losers,'six_months_forecast': six_months_forecast,'commodities': commodities,'chunks': chunks})


@app.route('/commodity_predict', methods=['POST'])
def commodity_profile():
    
    commodity_dict = {
        "arhar": "crops/Arhar.csv",
        "bajra": "crops/Bajra.csv",
        "barley": "crops/Barley.csv",
        "copra": "crops/Copra.csv",
        "cotton": "crops/Cotton.csv",
        "sesamum": "crops/Sesamum.csv",
        "gram": "crops/Gram.csv",
        "groundnut": "crops/Groundnut.csv",
        "jowar": "crops/Jowar.csv",
        "maize": "crops/Maize.csv",
        "masoor": "crops/Masoor.csv",
        "moong": "crops/Moong.csv",
        "niger": "crops/Niger.csv",
        "paddy": "crops/Paddy.csv",
        "ragi": "crops/Ragi.csv",
        "rape": "crops/Rape.csv",
        "jute": "crops/Jute.csv",
        "safflower": "crops/Safflower.csv",
        "soyabean": "crops/Soyabean.csv",
        "sugarcane": "crops/Sugarcane.csv",
        "sunflower": "crops/Sunflower.csv",
        "urad": "crops/Urad.csv",
        "wheat": "crops/Wheat.csv"
    }

    annual_rainfall = [29, 21, 37.5, 30.7, 52.6, 150, 299, 251.7, 179.2, 70.5, 39.8, 10.9]
    base = {
        "Paddy": 1245.5,
        "Arhar": 3200,
        "Bajra": 1175,
        "Barley": 980,
        "Copra": 5100,
        "Cotton": 3600,
        "Sesamum": 4200,
        "Gram": 2800,
        "Groundnut": 3700,
        "Jowar": 1520,
        "Maize": 1175,
        "Masoor": 2800,
        "Moong": 3500,
        "Niger": 3500,
        "Ragi": 1500,
        "Rape": 2500,
        "Jute": 1675,
        "Safflower": 2500,
        "Soyabean": 2200,
        "Sugarcane": 2250,
        "Sunflower": 3700,
        "Urad": 4300,
        "Wheat": 1350
    }
    commodity_list = []


    class Commodity:
        def __init__(self, csv_name):
            self.name = csv_name
            dataset = pd.read_csv(csv_name)
            self.X = dataset.iloc[:, :-1].values
            self.Y = dataset.iloc[:, 3].values
            from sklearn.tree import DecisionTreeRegressor
            depth = random.randrange(7, 18)
            self.regressor = DecisionTreeRegressor(max_depth=depth)
            self.regressor.fit(self.X, self.Y)

        def getPredictedValue(self, value):
            if value[1] >= 2019:
                fsa = np.array(value).reshape(1, 3)
                return self.regressor.predict(fsa)[0]
            else:
                c = self.X[:, 0:2]
                x = []
                for i in c:
                    x.append(i.tolist())
                fsa = [value[0], value[1]]
                ind = 0
                for i in range(0, len(x)):
                    if x[i] == fsa:
                        ind = i
                        break
                return self.Y[i]

        def getCropName(self):
            a = self.name.split('.')
            return a[0]


    def TopFiveWinners():
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        prev_month = current_month - 1
        prev_rainfall = annual_rainfall[prev_month - 1]
        current_month_prediction = []
        prev_month_prediction = []
        change = []

        for i in commodity_list:
            current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
            current_month_prediction.append(current_predict)
            prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
            prev_month_prediction.append(prev_predict)
            change.append((((current_predict - prev_predict) * 100 /prev_predict), commodity_list.index(i)))
        sorted_change = change
        sorted_change.sort(reverse=True)

        to_send = []
        for j in range(0, 5):
            perc, i = sorted_change[j]
            name = commodity_list[i].getCropName().split('/')[1]
            to_send.append([name, round((current_month_prediction[i] * base[name]) /100, 2), round(perc, 2)])
        return to_send


    def TopFiveLosers():
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        prev_month = current_month - 1
        prev_rainfall = annual_rainfall[prev_month - 1]
        current_month_prediction = []
        prev_month_prediction = []
        change = []

        for i in commodity_list:
            current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
            current_month_prediction.append(current_predict)
            prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
            prev_month_prediction.append(prev_predict)
            change.append((((current_predict - prev_predict) * 100 /prev_predict), commodity_list.index(i)))
        sorted_change = change
        sorted_change.sort()
        to_send = []
        for j in range(0, 5):
            perc, i = sorted_change[j]
            name = commodity_list[i].getCropName().split('/')[1]
            to_send.append([name, round((current_month_prediction[i] * base[name]) /100, 2), round(perc, 2)])
        return to_send


    def SixMonthsForecast():
        month1 = []
        month2 = []
        month3 = []
        month4 = []
        month5 = []
        month6 = []
        for i in commodity_list:
            crop = SixMonthsForecastHelper(i.getCropName())
            k = 0
            for j in crop:
                time = j[0]
                price = j[1]
                change = j[2]
                if k == 0:
                    month1.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 1:
                    month2.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 2:
                    month3.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 3:
                    month4.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 4:
                    month5.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 5:
                    month6.append((price, change, i.getCropName().split("/")[1], time))
                k += 1
        month1.sort()
        month2.sort()
        month3.sort()
        month4.sort()
        month5.sort()
        month6.sort()
        crop_month_wise = []
        crop_month_wise.append([month1[0][3], month1[len(month1) - 1][2], month1[len(month1) - 1][0],
                                month1[len(month1) - 1][1], month1[0][2], month1[0][0], month1[0][1]])
        crop_month_wise.append([month2[0][3], month2[len(month2) - 1][2], month2[len(month2) - 1][0],
                                month2[len(month2) - 1][1], month2[0][2], month2[0][0], month2[0][1]])
        crop_month_wise.append([month3[0][3], month3[len(month3) - 1][2], month3[len(month3) - 1][0],
                                month3[len(month3) - 1][1], month3[0][2], month3[0][0], month3[0][1]])
        crop_month_wise.append([month4[0][3], month4[len(month4) - 1][2], month4[len(month4) - 1][0],
                                month4[len(month4) - 1][1], month4[0][2], month4[0][0], month4[0][1]])
        crop_month_wise.append([month5[0][3], month5[len(month5) - 1][2], month5[len(month5) - 1][0],
                                month5[len(month5) - 1][1], month5[0][2], month5[0][0], month5[0][1]])
        crop_month_wise.append([month6[0][3], month6[len(month6) - 1][2], month6[len(month6) - 1][0],
                                month6[len(month6) - 1][1], month6[0][2], month6[0][0], month6[0][1]])
        return crop_month_wise


    def SixMonthsForecastHelper(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.split("/")[1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 7):
            if current_month + i <= 12:
                month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
            else:
                month_with_year.append(
                    (current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
        wpis = []
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        change = []

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), y, r])
            wpis.append(current_predict)
            change.append(((current_predict - current_wpi) * 100) /current_wpi)

        crop_price = []
        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2), round(change[i], 2)])

        return crop_price


    def CurrentMonth(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        current_price = (base[name.capitalize()] * current_wpi) /100
        return current_price


    def TwelveMonthsForecast(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 13):
            if current_month + i <= 12:
                month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
            else:
                month_with_year.append(
                    (current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
        max_index = 0
        min_index = 0
        max_value = 0
        min_value = 9999
        wpis = []
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        change = []

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), y, r])
            if current_predict > max_value:
                max_value = current_predict
                max_index = month_with_year.index((m, y, r))
            if current_predict < min_value:
                min_value = current_predict
                min_index = month_with_year.index((m, y, r))
            wpis.append(current_predict)
            change.append(((current_predict - current_wpi) * 100) /current_wpi)

        max_month, max_year, r1 = month_with_year[max_index]
        min_month, min_year, r2 = month_with_year[min_index]
        min_value = min_value * base[name.capitalize()] /100
        max_value = max_value * base[name.capitalize()] /100
        crop_price = []
        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2), round(change[i], 2)])

        x = datetime(max_year, max_month, 1)
        x = x.strftime("%b %y")
        max_crop = [x, round(max_value, 2)]
        x = datetime(min_year, min_month, 1)
        x = x.strftime("%b %y")
        min_crop = [x, round(min_value, 2)]

        return max_crop, min_crop, crop_price


    def TwelveMonthPrevious(name):
        name = name.lower()
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        commodity = commodity_list[0]
        wpis = []
        crop_price = []
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 13):
            if current_month - i >= 1:
                month_with_year.append((current_month - i, current_year, annual_rainfall[current_month - i - 1]))
            else:
                month_with_year.append(
                    (current_month - i + 12, current_year - 1, annual_rainfall[current_month - i + 11]))

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), 2013, r])
            wpis.append(current_predict)

        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2)])
        new_crop_price = []
        for i in range(len(crop_price) - 1, -1, -1):
            new_crop_price.append(crop_price[i])
        return new_crop_price
    
    
    def cropimg(crop_name):
        crop_data = {
        "wheat":["../assets/crops/wheat.png", "U.P., Punjab, Haryana, Rajasthan, M.P., bihar", "rabi","Sri Lanka, United Arab Emirates, Taiwan"],
        "paddy":["../assets/crops/paddy.png", "W.B., U.P., Andhra Pradesh, Punjab, T.N.", "kharif","Bangladesh, Saudi Arabia, Iran"],
        "barley":["../assets/crops/barley.png", "Rajasthan, Uttar Pradesh, Madhya Pradesh, Haryana, Punjab", "rabi","Oman, UK, Qatar, USA"],
        "maize":["../assets/crops/maize.png", "Karnataka, Andhra Pradesh, Tamil Nadu, Rajasthan, Maharashtra", "kharif", "Hong Kong, United Arab Emirates, France"],
        "bajra":["../assets/crops/bajra.png", "Rajasthan, Maharashtra, Haryana, Uttar Pradesh and Gujarat", "kharif", "Oman, Saudi Arabia, Israel, Japan"],
        "copra":["../assets/crops/copra.png", "Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, Orissa, West Bengal","rabi", "Veitnam, Bangladesh, Iran, Malaysia"],
        "cotton":["../assets/crops/cotton.png", "Punjab, Haryana, Maharashtra, Tamil Nadu, Madhya Pradesh, Gujarat", " China, Bangladesh, Egypt"],
        "masoor":["../assets/crops/masoor.png", "Uttar Pradesh, Madhya Pradesh, Bihar, West Bengal, Rajasthan", "rabi", "Pakistan, Cyprus,United Arab Emirates"],
        "gram":["../assets/crops/gram.png", "Madhya Pradesh, Maharashtra, Rajasthan, Uttar Pradesh, Andhra Pradesh & Karnataka", "rabi", "Veitnam, Spain, Myanmar"],
        "groundnut":["../assets/crops/groundnut.png", "Andhra Pradesh, Gujarat, Tamil Nadu, Karnataka, and Maharashtra", "kharif", "Indonesia, Jordan, Iraq"],
        "arhar":["../assets/crops/arhar.png", "Maharashtra, Karnataka, Madhya Pradesh and Andhra Pradesh", "kharif", "United Arab Emirates, USA, Chicago"],
        "sesamum":["../assets/crops/sesamum.png", "Maharashtra, Rajasthan, West Bengal, Andhra Pradesh, Gujarat", "rabi", "Iraq, South Africa, USA, Netherlands"],
        "jowar":["../assets/crops/jowar.png", "Maharashtra, Karnataka, Andhra Pradesh, Madhya Pradesh, Gujarat", "kharif", "Torronto, Sydney, New York"],
        "moong":["../assets/crops/moong.png", "Rajasthan, Maharashtra, Andhra Pradesh", "rabi", "Qatar, United States, Canada"],
        "niger":["../assets/crops/niger.png", "Andha Pradesh, Assam, Chattisgarh, Gujarat, Jharkhand", "kharif", "United States of American,Argenyina, Belgium"],
        "rape":["../assets/crops/rape.png", "Rajasthan, Uttar Pradesh, Haryana, Madhya Pradesh, and Gujarat", "rabi", "Veitnam, Malaysia, Taiwan"],
        "jute":["../assets/crops/jute.png", " West Bengal , Assam , Orissa , Bihar , Uttar Pradesh", "kharif", "JOrdan, United Arab Emirates, Taiwan"],
        "safflower":["../assets/crops/safflower.png",  "Maharashtra, Karnataka, Andhra Pradesh, Madhya Pradesh, Orissa", "kharif", " Philippines, Taiwan, Portugal"],
        "soyabean":["../assets/crops/soyabean.png",  "Madhya Pradesh, Maharashtra, Rajasthan, Madhya Pradesh and Maharashtra", "kharif", "Spain, Thailand, Singapore"],
        "urad":["../assets/crops/urad.png",  "Andhra Pradesh, Maharashtra, Madhya Pradesh, Tamil Nadu", "rabi", "United States, Canada, United Arab Emirates"],
        "ragi":["../assets/crops/ragi.png",  "Maharashtra, Tamil Nadu and Uttarakhand", "kharif", "United Arab Emirates, New Zealand, Bahrain"],
        "sunflower":["../assets/crops/sunflower.png",  "Karnataka, Andhra Pradesh, Maharashtra, Bihar, Orissa", "rabi", "Phillippines, United States, Bangladesh"],
        "sugarcane":["../assets/crops/sugarcane.png","Uttar Pradesh, Maharashtra, Tamil Nadu, Karnataka, Andhra Pradesh" , "kharif", "Kenya, United Arab Emirates, United Kingdom"]
        }
        return crop_data[crop_name]


    arhar = Commodity(commodity_dict["arhar"])
    commodity_list.append(arhar)
    bajra = Commodity(commodity_dict["bajra"])
    commodity_list.append(bajra)
    barley = Commodity(commodity_dict["barley"])
    commodity_list.append(barley)
    copra = Commodity(commodity_dict["copra"])
    commodity_list.append(copra)
    cotton = Commodity(commodity_dict["cotton"])
    commodity_list.append(cotton)
    sesamum = Commodity(commodity_dict["sesamum"])
    commodity_list.append(sesamum)
    gram = Commodity(commodity_dict["gram"])
    commodity_list.append(gram)
    groundnut = Commodity(commodity_dict["groundnut"])
    commodity_list.append(groundnut)
    jowar = Commodity(commodity_dict["jowar"])
    commodity_list.append(jowar)
    maize = Commodity(commodity_dict["maize"])
    commodity_list.append(maize)
    masoor = Commodity(commodity_dict["masoor"])
    commodity_list.append(masoor)
    moong = Commodity(commodity_dict["moong"])
    commodity_list.append(moong)
    niger = Commodity(commodity_dict["niger"])
    commodity_list.append(niger)
    paddy = Commodity(commodity_dict["paddy"])
    commodity_list.append(paddy)
    ragi = Commodity(commodity_dict["ragi"])
    commodity_list.append(ragi)
    rape = Commodity(commodity_dict["rape"])
    commodity_list.append(rape)
    jute = Commodity(commodity_dict["jute"])
    commodity_list.append(jute)
    safflower = Commodity(commodity_dict["safflower"])
    commodity_list.append(safflower)
    soyabean = Commodity(commodity_dict["soyabean"])
    commodity_list.append(soyabean)
    sugarcane = Commodity(commodity_dict["sugarcane"])
    commodity_list.append(sugarcane)
    sunflower = Commodity(commodity_dict["sunflower"])
    commodity_list.append(sunflower)
    urad = Commodity(commodity_dict["urad"])
    commodity_list.append(urad)
    wheat = Commodity(commodity_dict["wheat"])
    commodity_list.append(wheat)
    
    
    data = request.get_json()
    name = data.get('cropName')  # Accessing 'crop' key from the JSON data
     
    max_crop, min_crop, forecast_crop_values = TwelveMonthsForecast(name)
    prev_crop_values = TwelveMonthPrevious(name)
    forecast_x = [i[0] for i in forecast_crop_values]
    forecast_y = [i[1] for i in forecast_crop_values]
    previous_x = [i[0] for i in prev_crop_values]
    previous_y = [i[1] for i in prev_crop_values]
    current_price = CurrentMonth(name)
    #print(max_crop)
    #print(min_crop)
    #print(forecast_crop_values)
    #print(prev_crop_values)
    #print(str(forecast_x))
    crop_data = cropimg(name)
    return jsonify( {
        "name":name,
        "max_crop": max_crop,
        "min_crop": min_crop,
        "forecast_values": forecast_crop_values,
        "forecast_x": forecast_x,
        "forecast_y":forecast_y,
        "previous_values": prev_crop_values,
        "previous_x":previous_x,
        "previous_y":previous_y,
        "current_price": current_price,
        "image_url":crop_data[0],
        "prime_loc":crop_data[1],
        "type_c":crop_data[2],
        "export":crop_data[3]
    })
    
        

if __name__ == '__main__':
    app.run(debug=True, port=5000)

