import { useEffect, useState, useMemo } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Confetti from "react-confetti";

// ✅ Only the 5 tasks you want
const defaultTasks = [
  { id: 1, text: "Drink a glass of water" },
  { id: 2, text: "5-minute stretch" },
  { id: 3, text: "Deep breathing x 10" },
  { id: 5, text: "Walk for 5 minutes" },
  { id: 8, text: "Clean a tiny space" },
];

export default function DailyTasksPage({ onBack }) {
  const [completed, setCompleted] = useState({});
  const [points, setPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedTasks");
    const savedPoints = localStorage.getItem("totalPoints");
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    if (savedPoints) setPoints(parseInt(savedPoints, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completed));
  }, [completed]);

  const todayKey = (id) => `${id}-${new Date().toDateString()}`;

  function toggleTask(id) {
    const key = todayKey(id);
    const already = !!completed[key];
    const newCompleted = { ...completed, [key]: !already };
    setCompleted(newCompleted);

    const updated = already ? Math.max(0, points - 10) : points + 10;
    setPoints(updated);
    localStorage.setItem("totalPoints", String(updated));

    if (!already) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2200);
    }
  }

  const doneCount = defaultTasks.filter((t) => completed[todayKey(t.id)]).length;
  const progress = useMemo(
    () => (doneCount / defaultTasks.length) * 100,
    [doneCount]
  );

  const styles = `
  .tasks-page {
    --bg: #ffffff;
    --text: #0f172a;
    --muted: #475569;
    --border: #e5e7eb;
    --blue: #2563eb;

    /* row accent cycle */
    --c1:#e9f2ff; --c1-b:#93c5fd;
    --c2:#ecfdf5; --c2-b:#86efac;
    --c3:#fff7ed; --c3-b:#fdba74;
    --c4:#f5f3ff; --c4-b:#c4b5fd;
    --c5:#fdf2f8; --c5-b:#f9a8d4;

    /* complete state */
    --ok-bg:#f0fdf4; --ok-brd:#86efac; --ok-fg:#065f46;

    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    display: flex; flex-direction: column;
  }

  /* Header */
  .tasks-header {
    position: sticky; top: 0; z-index: 10;
    background: #fff; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px;
  }
  .tasks-header h1 { font-size: 20px; font-weight: 800; margin: 0 auto; }
  .resource-back-btn {
    width: 40px; height: 40px; display: grid; place-items: center;
    border: 1px solid var(--border); border-radius: 10px;
    background: #f1f5f9; color: var(--text);
    cursor: pointer; transition: background .2s, transform .08s;
  }
  .resource-back-btn:hover { background: #e0e7ff; transform: translateY(-1px); }

  .tasks-main { max-width: 980px; margin: 22px auto 64px; padding: 0 18px; }

  /* Progress */
  .progress-row {
    display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 14px;
    margin-bottom: 10px;
  }
  .progress-text { font-size: 14px; font-weight: 700; color: var(--muted); }
  .points-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 12px; border-radius: 999px;
    background: #eef5ff; color: var(--blue);
    font-weight: 700; border: 1px solid #dbe7ff;
  }
  .bar { height: 8px; background: #f1f5f9; border-radius: 999px; overflow: hidden; grid-column: 1 / -1; }
  .bar > span {
    display: block; height: 100%;
    background: linear-gradient(90deg, #93c5fd, #2563eb);
    width: 0%; border-radius: 999px; transition: width .35s ease;
  }

  /* Tasks list */
  .tasks-list { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 12px; }
  .task-item {
    position: relative; background: #fff;
    border: 1px solid var(--border); border-radius: 14px;
    padding: 12px 14px;
    transition: transform .08s, box-shadow .2s, border-color .2s, background .2s;
    box-shadow: 0 1px 2px rgba(15,23,42,.04);
  }
  .task-item:hover { transform: translateY(-1px); border-color: #d9e4ff; box-shadow: 0 8px 16px rgba(15,23,42,.06); }
  .task-item::before {
    content: ""; position: absolute; left: 8px; top: 8px; bottom: 8px; width: 6px; border-radius: 6px;
    background: var(--c1-b); opacity: .5;
  }
  .task-item:nth-child(5n+1)::before { background: var(--c1-b); }
  .task-item:nth-child(5n+2)::before { background: var(--c2-b); }
  .task-item:nth-child(5n+3)::before { background: var(--c3-b); }
  .task-item:nth-child(5n+4)::before { background: var(--c4-b); }
  .task-item:nth-child(5n+5)::before { background: var(--c5-b); }

  /* faint row fill */
  .task-item:nth-child(5n+1) { background: var(--c1); }
  .task-item:nth-child(5n+2) { background: var(--c2); }
  .task-item:nth-child(5n+3) { background: var(--c3); }
  .task-item:nth-child(5n+4) { background: var(--c4); }
  .task-item:nth-child(5n+5) { background: var(--c5); }

  .task-label { display: flex; align-items: center; gap: 12px; font-size: 15px; color: var(--text); }
  .task-label input[type="checkbox"] { accent-color: var(--blue); width: 18px; height: 18px; cursor: pointer; }

  /* Completed */
  .task-item.done { background: var(--ok-bg) !important; border-color: var(--ok-brd); box-shadow: 0 10px 24px rgba(16,185,129,.15); }
  .task-item.done .task-label span { color: var(--ok-fg); text-decoration: line-through; text-decoration-thickness: 2px; }
  `;

  return (
    <div className="tasks-page">
      <style>{styles}</style>
      {showConfetti && <Confetti recycle={false} numberOfPieces={220} />}

      <header className="tasks-header">
        <button className="resource-back-btn" onClick={onBack} aria-label="back">
          <ArrowLeft />
        </button>
        <h1>Daily Tasks</h1>
        <div className="spacer-ghost" />
      </header>

      <main className="tasks-main">
        <div className="progress-row">
          <div className="progress-text">
            {doneCount}/{defaultTasks.length} completed today
          </div>
          <div className="points-badge">
            <CheckCircle2 size={16} /> {points} pts
          </div>
          <div className="bar">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <ul className="tasks-list">
          {defaultTasks.map((t) => {
            const key = todayKey(t.id);
            const isDone = !!completed[key];
            return (
              <li key={t.id} className={`task-item ${isDone ? "done" : ""}`}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleTask(t.id)}
                  />
                  <span>{t.text}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
