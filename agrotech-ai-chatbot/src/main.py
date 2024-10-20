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

@app.route('/AgroTech-ChatBot', methods=['POST'])
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

if __name__ == '__main__':
    app.run()