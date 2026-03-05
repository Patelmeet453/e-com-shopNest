import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import axios from "axios";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi 👋 I’m ShopNest Assistant. Ask me about delivery, returns, payments or products.",
    },
  ]);

  const messagesEndRef = useRef(null);

  /* =========================
     AUTO SCROLL TO BOTTOM
  ========================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* =========================
     SEND MESSAGE
  ========================= */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { message: userText },
        { headers: { "Content-Type": "application/json" } },
      );

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.response },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry 😢 I couldn’t process your request right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= FLOATING OPEN BUTTON ================= */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 right-6 z-50
            bg-emerald-600 hover:bg-emerald-700
            text-white p-4 rounded-full
            shadow-lg shadow-emerald-600/30
            transition
          "
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* ================= CHAT WINDOW ================= */}
      {open && (
        <div
          className="
            fixed bottom-24 right-6 z-50
            w-[340px] sm:w-[380px]
            h-[480px] sm:h-[540px]
            bg-gradient-to-br from-[#020617] to-emerald-950
            border border-emerald-900/40
            rounded-2xl shadow-2xl
            flex flex-col
          "
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-900/40">
            <h3 className="text-emerald-400 font-semibold">
              ShopNest Assistant
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* ================= MESSAGES ================= */}
          <div
            className="
              flex-1 overflow-y-auto p-4 space-y-3 text-sm
              scrollbar-thin scrollbar-thumb-emerald-600/40
            "
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    px-4 py-2 rounded-xl max-w-[80%] leading-relaxed
                    ${
                      m.from === "user"
                        ? "bg-emerald-600 text-white"
                        : "bg-black/40 text-gray-200"
                    }
                  `}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-xs text-gray-400">Bot is typing...</p>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ================= INPUT ================= */}
          <div className="p-3 border-t border-emerald-900/40 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="
                flex-1 px-4 py-2 rounded-full
                bg-black/30 text-white
                border border-emerald-900/40
                focus:outline-none focus:ring-1 focus:ring-emerald-600
                text-sm
              "
            />

            <button
              onClick={sendMessage}
              className="
                bg-emerald-600 hover:bg-emerald-700
                text-white px-4 py-2 rounded-full
              "
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
