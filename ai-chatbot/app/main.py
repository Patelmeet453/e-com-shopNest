from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.chatbot_engine import get_chatbot_reply

app = FastAPI(title="ShopNest AI Chatbot")

# 🔥 CORS CONFIGURATION (THIS FIXES YOUR ERROR)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "ShopNest AI Chatbot is running"}
  
@app.post("/chat")
def chat(req: ChatRequest):
    reply = get_chatbot_reply(req.message)
    return {"response": reply}
  
  
