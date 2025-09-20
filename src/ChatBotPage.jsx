import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft } from "lucide-react";

export default function ChatbotPage({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const u = { id: Date.now(), who: "user", text: chatInput };
    const b = { id: Date.now() + 1, who: "bot", text: "BayMax: (I’m here — how can I help?)" };
    setMessages((prev) => [...prev, u, b]);
    setChatInput("");
  }

  return (
    <div className="chat-page">
      <header className="chat-header chat-header-gradient">
        <button className="btn-icon" onClick={onBack} aria-label="Back">
          <ArrowLeft />
        </button>
        <div className="chat-title">BayMax Chat</div>
      </header>

      <div className="chat-area" ref={ref}>
        {messages.length === 0 && <div className="chat-empty">Say hello — this is a mock chat UI.</div>}
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble ${m.who === "user" ? "user" : "bot"}`}>
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="chat-input-row">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input-full"
          aria-label="Type message"
        />
        <button type="submit" className="chat-send-full" aria-label="Send">
          <Send />
        </button>
      </form>
    </div>
  );
}
