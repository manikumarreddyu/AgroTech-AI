from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import logging
from groq import Groq
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load API key
working_dir = os.path.dirname(os.path.abspath(__file__))
try:
    with open(os.path.join(working_dir, 'config.json')) as config_file:
        config_data = json.load(config_file)
        GROQ_API_KEY = config_data.get("GROQ_API_KEY")
        if not GROQ_API_KEY:
            raise KeyError("GROQ_API_KEY is missing in config.json.")
        os.environ["GROQ_API_KEY"] = GROQ_API_KEY
        logger.info("API key loaded successfully.")
except FileNotFoundError:
    logger.error("config.json file not found. Please add your API key in config.json.")
    raise
except KeyError as e:
    logger.error(str(e))
    raise
except Exception as e:
    logger.error(f"Failed to load API key: {e}")
    raise

client = Groq()

# Rate limiting variables
RATE_LIMIT = 20  # Maximum 20 requests per minute
rate_limit_store = {}  # Store to track user requests by IP

# Predefined responses for common questions
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
    # ... other predefined responses ...
}

def is_rate_limited(ip):
    current_time = time.time()
    if ip not in rate_limit_store:
        rate_limit_store[ip] = []
    
    # Filter out requests older than 60 seconds
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if current_time - t < 60]
    
    # Check if the number of requests exceeds the rate limit
    if len(rate_limit_store[ip]) >= RATE_LIMIT:
        logger.warning(f"Rate limit exceeded for IP: {ip}")
        return True
    rate_limit_store[ip].append(current_time)
    return False

@app.route('/AgroTech-ChatBot', methods=['POST'])
def chat():
    ip = request.remote_addr
    if is_rate_limited(ip):
        return jsonify({"error": "Rate limit exceeded. Please wait and try again."}), 429

    data = request.json
    user_prompt = data.get('prompt', '').strip()

    if not user_prompt:
        logger.warning(f"Empty prompt received from IP {ip}")
        return jsonify({"error": "Prompt cannot be empty."}), 400

    # Check if the prompt matches a pre-made response
    if user_prompt in premade_requests:
        logger.info(f"Premade response provided for IP {ip}: {user_prompt}")
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
        logger.info(f"Response generated for IP {ip}")
        return jsonify({"response": assistant_response})
    except Exception as e:
        logger.error(f"Error generating response for IP {ip}: {e}")
        return jsonify({"error": "There was an error processing your request. Please try again later."}), 500

if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode for development purposes
