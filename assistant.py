import speech_recognition as sr
import pyttsx3
import requests
import wikipedia
import pyjokes
import os
import json
from flask import Flask, render_template, jsonify
import webbrowser

# Text-to-Speech Initialization
engine = pyttsx3.init()
engine.setProperty('rate', 150)

# Speech Recognition Setup
recognizer = sr.Recognizer()

# Function to speak text
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Function to listen for voice input
def listen():
    with sr.Microphone() as source:
        print("Listening...")
        try:
            audio = recognizer.listen(source, timeout=5)
            command = recognizer.recognize_google(audio)
            print(f"User said: {command}")
            return command.lower()
        except sr.UnknownValueError:
            speak("Sorry, I didn't catch that. Could you repeat?")
            return None
        except sr.RequestError:
            speak("Sorry, speech recognition service is down.")
            return None

# Fetch Weather Information
def get_weather(city):
    api_key = "your_openweathermap_api_key"
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()
    if data.get("main"):
        temp = data['main']['temp']
        desc = data['weather'][0]['description']
        speak(f"The current temperature in {city} is {temp} degrees Celsius with {desc}.")
    else:
        speak(f"Sorry, I couldn't get the weather information for {city}.")

# Fetch News
def get_news():
    api_key = "your_newsapi_key"
    url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={api_key}"
    response = requests.get(url)
    news_data = response.json()
    articles = news_data["articles"][:5]
    news_list = []
    for article in articles:
        news_list.append(article["title"])
    speak("Here are the top news headlines.")
    for headline in news_list:
        speak(headline)

# Fetch Wikipedia Info
def get_wikipedia_info(query):
    speak(f"Searching Wikipedia for {query}.")
    result = wikipedia.summary(query, sentences=2)
    speak(result)

# Tell a Joke
def tell_joke():
    joke = pyjokes.get_joke()
    speak(joke)

# Play Music (Local Files)
def play_music():
    music_dir = "path_to_music_directory"
    songs = os.listdir(music_dir)
    os.startfile(os.path.join(music_dir, songs[0]))  # Play the first song in the directory
    speak("Playing music...")

# Main Function to Handle Commands
def handle_command(command):
    if 'weather' in command:
        speak("Which city?")
        city = listen()
        if city:
            get_weather(city)
    elif 'news' in command:
        get_news()
    elif 'joke' in command:
        tell_joke()
    elif 'wikipedia' in command:
        speak("What do you want to search on Wikipedia?")
        query = listen()
        if query:
            get_wikipedia_info(query)
    elif 'music' in command:
        play_music()
    else:
        speak("I am not sure how to help with that yet.")

# Flask Web Interface
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/command', methods=['POST'])
def command():
    command = listen()
    if command:
        handle_command(command)
        return jsonify({"status": "success", "command": command})
    else:
        return jsonify({"status": "failed"})

if __name__ == "__main__":
    app.run(debug=True)
