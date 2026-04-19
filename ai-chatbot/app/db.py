from pymongo import MongoClient

client = MongoClient("mongodb+srv://pmeet1963_db_user:iKGx9LNBWRcJiMpm@cluster0.zsor37v.mongodb.net/shopeNest_ecom")

db = client["shopeNest_ecom"]

products_collection = db["products"]