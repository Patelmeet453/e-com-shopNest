import pickle
import json
import random
import os
from app.db import products_collection

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
    

# def check_product_query(message: str):

#     message = message.lower()

#     products = products_collection.find()

#     for product in products:
#         name = product["name"].lower()

#         if name in message:
#             return f"{product['name']} costs ₹{product['price']}. Category: {product['category']}"

#     return None

def check_product_query(message: str):
    print("🔥 Function called with:", message)
    message = message.lower()

    # ------------------------
    # 1️⃣ CATEGORY SEARCH
    # ------------------------

    if "laptop" in message:
        products = products_collection.find({"category": "laptop"})
        category_name = "laptop"
    elif "earphone" in message or "headphone" in message:
        products = products_collection.find({"category": "earphone"})
        category_name = "earphone"
    elif "mobile" in message or "phone" in message:
        products = products_collection.find({"category": "mobile"})
        category_name = "mobile"
    elif "watch" in message:
        products = products_collection.find({"category": "watch"})
        category_name = "watch"
    else:
        products = None
        category_name = None

    if products:
        product_list = list(products)

        if len(product_list) == 0:
            return "No products found in this category."

        response = "Here are some available products:\n"

        for product in product_list[:5]:  # limit results
            response += f"{product['name']} - ₹{product['price']}\n"

        # return response
        return {
            "type": "category",
            "message": response,
            "category": category_name
        }

    # ------------------------
    # 2️⃣ EXACT PRODUCT SEARCH
    # ------------------------

    products = products_collection.find()

    for product in products:
        name = product["name"].lower()

        if name in message:
            # return f"{product['name']} costs ₹{product['price']}. Category: {product['category']}"
            return {
    "type": "product",
    "message": f"{product['name']} costs ₹{product['price']}. Category: {product['category']}",
    "productId": str(product["_id"])
}

    return None

def get_chatbot_reply(message: str):
     # NEW FEATURE → check product first
    product_response = check_product_query(message)

    if product_response:
        return product_response
    
    X = vectorizer.transform([message])
    
    #  # 3️⃣ Confidence threshold
    # probs = model.predict_proba(X)[0]
    # max_prob = max(probs)

   
    # if max_prob < 0.45:
    #     return "Sorry, I can only help with products, orders, delivery, payments, and ShopNest services."

    
    tag = model.predict(X)[0]
    

    for intent in intents["intents"]:
        if intent["tag"] == tag:
            return random.choice(intent["responses"])

    return "Sorry, I didn't understand that."










# back up code



# import pickle
# import json
# import random
# import os
# from app.db import products_collection

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "chatbot_model.pkl")
# VECT_PATH = os.path.join(BASE_DIR, "..", "models", "vectorizer.pkl")
# DATA_PATH = os.path.join(BASE_DIR, "..", "data", "intents.json")

# with open(MODEL_PATH, "rb") as f:
#     model = pickle.load(f)

# with open(VECT_PATH, "rb") as f:
#     vectorizer = pickle.load(f)

# with open(DATA_PATH, "r", encoding="utf-8") as f:
#     intents = json.load(f)
    

# # def check_product_query(message: str):

# #     message = message.lower()

# #     products = products_collection.find()

# #     for product in products:
# #         name = product["name"].lower()

# #         if name in message:
# #             return f"{product['name']} costs ₹{product['price']}. Category: {product['category']}"

# #     return None

# def check_product_query(message: str):

#     message = message.lower()

#     # ------------------------
#     # 1️⃣ CATEGORY SEARCH
#     # ------------------------

#     if "laptop" in message:
#         products = products_collection.find({"category": "laptop"})
#     elif "mobile" in message or "phone" in message:
#         products = products_collection.find({"category": "mobile"})
#     elif "earphone" in message or "headphone" in message:
#         products = products_collection.find({"category": "earphones"})
#     else:
#         products = None

#     if products:
#         product_list = list(products)

#         if len(product_list) == 0:
#             return "No products found in this category."

#         response = "Here are some available products:\n"

#         for product in product_list[:5]:  # limit results
#             response += f"{product['name']} - ₹{product['price']}\n"

#         return response

#     # ------------------------
#     # 2️⃣ EXACT PRODUCT SEARCH
#     # ------------------------

#     products = products_collection.find()

#     for product in products:
#         name = product["name"].lower()

#         if name in message:
#             return f"{product['name']} costs ₹{product['price']}. Category: {product['category']}"

#     return None

# def get_chatbot_reply(message: str):
#      # NEW FEATURE → check product first
#     product_response = check_product_query(message)

#     if product_response:
#         return product_response
    
#     X = vectorizer.transform([message])
    
#     #  # 3️⃣ Confidence threshold
#     # probs = model.predict_proba(X)[0]
#     # max_prob = max(probs)

   
#     # if max_prob < 0.45:
#     #     return "Sorry, I can only help with products, orders, delivery, payments, and ShopNest services."

    
#     tag = model.predict(X)[0]
    

#     for intent in intents["intents"]:
#         if intent["tag"] == tag:
#             return random.choice(intent["responses"])

#     return "Sorry, I didn't understand that."
