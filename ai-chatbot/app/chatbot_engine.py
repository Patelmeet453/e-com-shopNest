import pickle
import json
import random
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "chatbot_model.pkl")
VECT_PATH = os.path.join(BASE_DIR, "..", "models", "vectorizer.pkl")
DATA_PATH = os.path.join(BASE_DIR, "..", "data", "intents.json")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(VECT_PATH, "rb") as f:
    vectorizer = pickle.load(f)

with open(DATA_PATH, "r", encoding="utf-8") as f:
    intents = json.load(f)

def get_chatbot_reply(message: str):
    X = vectorizer.transform([message])
    tag = model.predict(X)[0]

    for intent in intents["intents"]:
        if intent["tag"] == tag:
            return random.choice(intent["responses"])

    return "Sorry, I didn't understand that."
