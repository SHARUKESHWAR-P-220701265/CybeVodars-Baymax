import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

export default function ChatPage({ onBack }) {
  const [val, setVal] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!val.trim()) return;
    // placeholder action
    alert("BayMax (demo): " + val);
    setVal("");
  }

  return (
    <div className="chat-page">
      <style>{`
        .chat-page {
          --bg: #f9fafb;
          --text: #0f172a;
          --muted: #64748b;
          --border: #e5e7eb;
          --blue: #2563eb;
          --blue-light: #eef5ff;

          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: Inter, system-ui, sans-serif;
        }

        /* Header */
        .tasks-header {
          position: sticky;
          top: 0;
          background: #fff;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 12px 16px;
          gap: 12px;
          z-index: 10;
        }
        .tasks-header h1 {
          flex: 1;
          text-align: center;
          margin: 0;
          font-size: 20px;
          font-weight: 700;
        }
        .resource-back-btn {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: #f1f5f9;
          display: grid;
          place-items: center;
          color: var(--text);
          cursor: pointer;
          transition: background 0.2s, transform 0.08s;
        }
        .resource-back-btn:hover {
          background: var(--blue-light);
          transform: translateY(-1px);
        }

        /* Main */
        .simple-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          gap: 16px;
        }

        /* Chat form */
        .chat-form.big {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: center;
          background: #fff;
          padding: 10px;
          border-radius: 14px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 12px rgba(15,23,42,0.06);
        }
        .chat-input {
          border: none;
          outline: none;
          background: #fff;
          padding: 12px 14px;
          font-size: 14px;
          border-radius: 10px;
          color: var(--text);
        }
        .chat-send {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--blue);
          border: none;
          color: #fff;
          font-weight: 600;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: filter 0.2s;
        }
        .chat-send:hover {
          filter: brightness(0.95);
        }
        .send-icon {
          width: 16px;
          height: 16px;
        }

        /* Placeholder text */
        .muted {
          text-align: center;
          font-size: 14px;
          color: var(--muted);
        }
      `}</style>

      <header className="tasks-header">
        <button className="resource-back-btn" onClick={onBack} aria-label="back">
          <ArrowLeft />
        </button>
        <h1>Chatbot</h1>
        <div className="spacer-ghost" />
      </header>

      <main className="simple-main">
        <form className="chat-form big" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Talk to BayMax..."
          />
          <button className="chat-send">
            Send <Send className="send-icon" />
          </button>
        </form>
        <p className="muted">Demo placeholder — hook up your chatbot logic here.</p>
      </main>
    </div>
  );
}
