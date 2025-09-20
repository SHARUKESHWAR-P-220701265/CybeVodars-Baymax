import { ArrowLeft, Save as SaveIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function JournalPage({ onBack }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const moods = useMemo(
    () => [
      { key: "😊", label: "Happy", cls: "m-happy" },
      { key: "😌", label: "Calm", cls: "m-calm" },
      { key: "😡", label: "Angry", cls: "m-angry" },
      { key: "😴", label: "Tired", cls: "m-tired" },
      { key: "🤩", label: "Excited", cls: "m-excited" },
    ],
    []
  );

  function saveEntry() {
    if (!date) {
      alert("Please select a date before saving.");
      return;
    }
    const newEntry = { id: Date.now(), date, mood, text };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("journalEntries", JSON.stringify(updated));
    setText("");
    setMood("");
    setDate("");
  }

  const moodClass = (m) => (moods.find((x) => x.key === m)?.cls ?? "");

  const styles = `
  .journal-page {
    --bg: #ffffff;
    --text: #0f172a;
    --muted: #475569;
    --border: #e5e7eb;
    --blue: #3b82f6;
    --blue-light: #eff6ff;
    --yellow-light: #fffbeb;
    --shadow: 0 10px 25px rgba(15,23,42,.05);

    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    font-family: Inter, system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .jp-header { position:sticky; top:0; background:#fff; border-bottom:1px solid var(--border); z-index:10; }
  .jp-header-inner {
    max-width: 980px; margin:0 auto; padding:14px 18px;
    display:grid; grid-template-columns:44px 1fr 44px; align-items:center;
  }
  .back-btn {
    width:40px; height:40px; border:1px solid var(--border); border-radius:10px;
    background:#fff; display:grid; place-items:center; cursor:pointer;
    transition: background .2s, transform .1s;
  }
  .back-btn:hover { background: var(--blue-light); transform: translateY(-1px); }
  .jp-title { text-align:center; font-size:20px; font-weight:800; }
  .ghost { width:44px; height:44px; }

  .jp-main { max-width:980px; margin:22px auto 64px; padding:0 18px; display:grid; gap:18px; }

  .card { border:1px solid var(--border); border-radius:16px; box-shadow:var(--shadow); padding:16px; }
  .entry-card { background: var(--blue-light); }
  .entries-card { background: var(--yellow-light); }
  .card h2 { margin:0 0 8px; font-size:16px; font-weight:800; }
  .card-sub { margin:-4px 0 12px; color: var(--muted); font-size:13px; }

  .form-row.two { display:grid; gap:12px; grid-template-columns:1fr; }
  @media (min-width:900px){ .form-row.two { grid-template-columns: 320px 1fr; } }

  .input-wrap { display:grid; gap:6px; }
  .label { font-size:14px; font-weight:600; color:var(--muted); }

  .date-field input[type="date"] {
    height:42px; border:1px solid var(--border); border-radius:10px;
    padding:0 12px; font-size:14px; color:var(--text); background:#fff;
  }

  .moods { display:flex; flex-wrap:wrap; gap:10px; }
  .mood-btn {
    padding:8px 12px; border:1px solid var(--border); border-radius:12px;
    background:#fff; cursor:pointer; font-weight:600; display:inline-flex; align-items:center; gap:8px;
  }
  .mood-btn.selected { border:2px solid var(--blue); background: var(--blue-light); }

  .notes {
    width:100%; min-height:140px; border:1px solid var(--border); border-radius:12px;
    padding:12px; font-size:14px; background:#fff; color:var(--text);
  }

  .primary { background:var(--blue); border:none; color:#fff; padding:10px 16px; border-radius:12px; cursor:pointer; font-weight:600; }
  .primary:hover { filter:brightness(.95); }

  .entries-card .list { display:grid; gap:12px; }
  .entry {
    background:#fff; border:1px solid var(--border); border-radius:14px; padding:12px; position:relative;
  }
  .entry-head { display:flex; justify-content:space-between; margin-bottom:6px; font-weight:600; }
  .entry-text { color:var(--muted); font-size:14px; }

  /* mood tints for entries */
  .entry.m-happy   { background: #ecfdf5; border-color: #86efac; }
  .entry.m-calm    { background: #eff6ff; border-color: #93c5fd; }
  .entry.m-angry   { background: #fff1f2; border-color: #fda4af; }
  .entry.m-tired   { background: #eef2ff; border-color: #c7d2fe; }
  .entry.m-excited { background: #fffbeb; border-color: #fcd34d; }
  `;

  return (
    <div className="journal-page">
      <style>{styles}</style>

      <header className="jp-header">
        <div className="jp-header-inner">
          <button className="back-btn" onClick={onBack}><ArrowLeft /></button>
          <div className="jp-title">Journal</div>
          <div className="ghost" />
        </div>
      </header>

      <main className="jp-main">
        {/* New Entry */}
        <section className="card entry-card">
          <h2>New Entry</h2>
          <p className="card-sub">Pick a date, choose your mood, jot a few thoughts.</p>

          <div className="form-row two">
            <div className="input-wrap">
              <label className="label">Date of Entry</label>
              <div className="date-field">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div className="input-wrap">
              <label className="label">Mood</label>
              <div className="moods">
                {moods.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`mood-btn ${m.cls} ${mood === m.key ? "selected" : ""}`}
                    onClick={() => setMood(m.key)}
                  >
                    <span>{m.key}</span> {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea
            className="notes"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today?"
          />

          <button className="primary" onClick={saveEntry}><SaveIcon size={16}/> Save</button>
        </section>

        {/* Saved Journals */}
        <section className="card entries-card">
          <h2>Saved Journals</h2>
          {entries.length === 0 ? (
            <p>No entries yet.</p>
          ) : (
            <div className="list">
              {entries.map((entry) => (
                <article key={entry.id} className={`entry ${moodClass(entry.mood)}`}>
                  <div className="entry-head">
                    <span>{entry.date}</span>
                    {entry.mood && <span>{entry.mood}</span>}
                  </div>
                  {entry.text && <div className="entry-text">{entry.text}</div>}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
