from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from groq import Groq
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load API key
working_dir = os.path.dirname(os.path.abspath(__file__))
config_data = json.load(open(f"{working_dir}/config.json"))
GROQ_API_KEY = config_data["GROQ_API_KEY"]
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

client = Groq()

# Rate limiting variables
RATE_LIMIT = 20  # Maximum 20 requests per minute
rate_limit_store = {}  # Store to track user requests by IP

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

@app.route('/AgroTech-ChatBot', methods=['POST'])
def chat():
    ip = request.remote_addr
    if is_rate_limited(ip):
        return jsonify({"error": "Rate limit exceeded. Please wait and try again."}), 429

    data = request.json
    user_prompt = data.get('prompt')

    # Prepare messages for the LLM
    messages = [{'role': "system", "content": "You are a helpful assistant"}]
    if user_prompt:
        messages.append({"role": "user", "content": user_prompt})

        # Get response from LLM
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages
        )
        assistant_response = response.choices[0].message.content
        return jsonify({"response": assistant_response})
    
    return jsonify({"error": "No prompt provided"}), 400

if __name__ == '__main__':
    app.run(port=5000)
