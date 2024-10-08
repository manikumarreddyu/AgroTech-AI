from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from groq import Groq

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load API key
working_dir = os.path.dirname(os.path.abspath(__file__))
config_data = json.load(open(f"{working_dir}/config.json"))
GROQ_API_KEY = config_data["GROQ_API_KEY"]
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

client = Groq()

@app.route('/chat', methods=['POST'])
def chat():
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
