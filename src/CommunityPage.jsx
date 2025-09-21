import { useState, useEffect, useMemo } from "react";

const CHANNELS = [
  { id: "general", name: "General Support", description: "Talk about anything" },
  { id: "anxiety", name: "Anxiety", description: "Coping tips, peer help" },
  { id: "sleep", name: "Sleep & Recovery", description: "Sleep hygiene, routines" },
  { id: "study", name: "Study Stress", description: "Deadlines, focus, burnout" },
];

// local storage helpers
function loadMessages(channelId) {
  const key = `cm_msgs_${channelId}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [
    { id: 1, user: "BayMax", text: `Welcome to #${channelId}!`, ts: Date.now() }
  ];
}

function saveMessage(channelId, msg) {
  const key = `cm_msgs_${channelId}`;
  const list = loadMessages(channelId);
  list.push(msg);
  localStorage.setItem(key, JSON.stringify(list));
}

export default function CommunityPage({ onBack }) {
  const [current, setCurrent] = useState("general");
  const [messages, setMessages] = useState(() => loadMessages("general"));
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages(loadMessages(current));
  }, [current]);

  const channel = useMemo(
    () => CHANNELS.find(c => c.id === current) || CHANNELS[0],
    [current]
  );

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = { id: crypto.randomUUID(), user: "You", text: input.trim(), ts: Date.now() };
    saveMessage(current, msg);
    setMessages(m => [...m, msg]);
    setInput("");
  }

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside style={styles.rail}>
        <div style={styles.railHeader}>
          <div style={styles.title}>Community</div>
          <button style={styles.back} onClick={onBack}>← Home</button>
        </div>
        <div style={styles.sectionLabel}>Channels</div>
        <ul style={styles.channelList}>
          {CHANNELS.map(c => (
            <li
              key={c.id}
              style={{ ...styles.channel, ...(c.id === current ? styles.channelActive : {}) }}
              onClick={() => setCurrent(c.id)}
            >
              <span style={{ opacity: 0.6, marginRight: 4 }}>#</span> {c.name}
              <div style={styles.chanDesc}>{c.description}</div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat */}
      <main style={styles.chat}>
        <header style={styles.chatHeader}>
          <div style={styles.chatTitle}><span style={{ opacity: 0.6 }}>#</span>{channel.name}</div>
          <div style={styles.chatSub}>{channel.description}</div>
        </header>

        <section style={styles.msgs}>
          {messages.map(m => (
            <div key={m.id} style={styles.msg}>
              <div style={styles.avatar}>{m.user[0]}</div>
              <div style={styles.bubble}>
                <div style={styles.meta}>
                  <span style={styles.user}>{m.user}</span>
                  <span style={styles.time}>{new Date(m.ts).toLocaleTimeString()}</span>
                </div>
                <div>{m.text}</div>
              </div>
            </div>
          ))}
        </section>

        <form style={styles.inputbar} onSubmit={handleSend}>
          <input
            style={styles.input}
            placeholder={`Message #${channel.id}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button style={styles.send}>Send ➤</button>
        </form>
      </main>
    </div>
  );
}

/* Inline styles */
const styles = {
  root: { display: "grid", gridTemplateColumns: "280px 1fr", height: "100vh", background: "#f4f6f8" },
  rail: { background: "#0f172a", color: "#e2e8f0", padding: "16px 12px" },
  railHeader: { display: "flex", justifyContent: "space-between", marginBottom: 12 },
  title: { fontWeight: 700 },
  back: { background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" },
  sectionLabel: { fontSize: 12, letterSpacing: ".08em", color: "#94a3b8", margin: "12px 8px", textTransform: "uppercase" },
  channelList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 },
  channel: { padding: "10px 12px", borderRadius: 10, cursor: "pointer" },
  channelActive: { background: "#1e293b", outline: "1px solid #334155" },
  chanDesc: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  chat: { display: "flex", flexDirection: "column" },
  chatHeader: { padding: "16px 20px", background: "white", borderBottom: "1px solid #e5e7eb" },
  chatTitle: { fontWeight: 700 },
  chatSub: { color: "#6b7280", fontSize: 14 },
  msgs: { flex: 1, overflow: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 },
  msg: { display: "flex", gap: 10 },
  avatar: { width: 34, height: 34, borderRadius: "50%", background: "#1e293b", color: "white", display: "flex", alignItems: "center", justifyContent: "center" },
  bubble: { background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "10px 12px", maxWidth: 720 },
  meta: { fontSize: 12, color: "#6b7280", marginBottom: 4, display: "flex", gap: 8 },
  user: { fontWeight: 600 },
  time: { fontSize: 11, opacity: 0.6 },
  inputbar: { display: "flex", gap: 8, padding: "12px 16px", background: "white", borderTop: "1px solid #e5e7eb" },
  input: { flex: 1, border: "1px solid #cbd5e1", borderRadius: 20, padding: "10px 14px" },
  send: { border: "none", borderRadius: 20, padding: "10px 16px", background: "#0f172a", color: "white", cursor: "pointer" },
};

