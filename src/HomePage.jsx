import { useState, useEffect } from "react";
import {
  Menu,
  Users,
  Activity,
  Send,
  Calendar,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Trophy,
} from "lucide-react";

export default function HomePage({
  onOpenChat,
  onOpenResourceHub,
  onOpenJournal,
  onOpenCommunity, // 👈 added
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  // points shown in header
  const [totalPoints, setTotalPoints] = useState(0);

  // sliders
  const [happyLevel, setHappyLevel] = useState(60);
  const [energyLevel, setEnergyLevel] = useState(45);

  // localStorage-backed task completion so tile shows progress
  const [completedTasks, setCompletedTasks] = useState({});

  // only for counting on the tile (the real list lives in DailyTasksPage)
  const dailyTasks = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));

  useEffect(() => {
    const savedCompletedTasks = localStorage.getItem("completedTasks");
    const savedPoints = localStorage.getItem("totalPoints");
    if (savedCompletedTasks) setCompletedTasks(JSON.parse(savedCompletedTasks));
    if (savedPoints) setTotalPoints(parseInt(savedPoints, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const getCompletedTasksCount = () => {
    const today = new Date().toDateString();
    return dailyTasks.filter((t) => completedTasks[`${t.id}-${today}`]).length;
  };

  function handleSend(e) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatInput("");
    onOpenChat();
  }

  return (
    <div className="page-root">
      {/* Header */}
      <header className="header header-gradient">
        <div className="header-inner">
          <button
            aria-label="menu"
            onClick={() => setSidebarOpen(true)}
            className="btn-icon"
            title="Menu"
          >
            <Menu className="icon" />
          </button>

          <div className="brand">
            <div className="brand-logo">BM</div>
            <div>
              <div className="brand-title">BayMax</div>
              <div className="brand-tag">Care. Listen. Support.</div>
            </div>
          </div>

          <button aria-label="profile" className="profile-btn" title="Profile">
            AK
          </button>
        </div>

        {/* Points Bar */}
        <div className="points-bar">
          <div className="points-info">
            <Trophy className="points-icon" />
            <span className="points-text">{totalPoints} Points</span>
          </div>
          <div className="points-progress">
            <div
              className="points-progress-fill"
              style={{ width: `${Math.min(totalPoints % 100, 100)}%` }}
            />
          </div>
          <div className="points-level">
            Level {Math.floor(totalPoints / 100) + 1}
          </div>
        </div>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="overlay">
          <div className="overlay-back" onClick={() => setSidebarOpen(false)} />
          <aside className="sidebar">
            <div className="sidebar-head">
              <div className="sidebar-title">Menu</div>
              <button
                className="close-plain"
                onClick={() => setSidebarOpen(false)}
              >
                Close
              </button>
            </div>

            <nav className="sidebar-nav">
              {/* Chatbot */}
              <button
                onClick={() => {
                  onOpenChat();
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <MessageCircle className="nav-icon" />
                <span>Chatbot</span>
              </button>

              {/* Journal */}
              <button
                onClick={() => {
                  onOpenJournal();
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <BookOpen className="nav-icon" /> <span>Journal</span>
              </button>

              {/* Resource Hub */}
              <button
                onClick={() => {
                  onOpenResourceHub("resourceHub");
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <GraduationCap className="nav-icon" />{" "}
                <span>Resource Hub</span>
              </button>

              {/* Activities -> Daily Tasks page */}
              <button
                onClick={() => {
                  onOpenResourceHub("dailyTasks");
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <Activity className="nav-icon" /> <span>Activities</span>
              </button>

              {/* Community */}
              <button
                onClick={() => {
                  onOpenCommunity(); // 👈 navigate to community
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <Users className="nav-icon" /> <span>Community</span>
              </button>

              {/* Counseling (placeholder) */}
              <button
                onClick={() => {
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <Calendar className="nav-icon" /> <span>Book Counseling</span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="content">
        <div className="greeting">Hey Akshay, what do you want to do ??</div>

        {/* Sliders */}
        <section className="sliders">
          <div className="slider-row">
            <label className="slider-label">Happy</label>
            <div className="slider-control">
              <input
                type="range"
                min="0"
                max="100"
                value={happyLevel}
                onChange={(e) => setHappyLevel(Number(e.target.value))}
                className="range"
                aria-label="Happy level"
              />
              <div className="range-value">{happyLevel}%</div>
            </div>
          </div>

          <div className="slider-row">
            <label className="slider-label">Energy</label>
            <div className="slider-control">
              <input
                type="range"
                min="0"
                max="100"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="range"
                aria-label="Energy level"
              />
              <div className="range-value">{energyLevel}%</div>
            </div>
          </div>
        </section>

        {/* Tiles */}
        <div className="tiles-grid">
          {/* Journal */}
          <button
            className="tile tile-journal"
            onClick={() => onOpenJournal()}
            aria-label="Journal"
          >
            <div className="tile-left">
              <div className="tile-icon circle-purple">
                <BookOpen />
              </div>
            </div>
            <div className="tile-body">
              <div className="tile-title">Journal</div>
              <div className="tile-sub">Log your daily journal</div>
            </div>
          </button>

          {/* Community */}
          <button
            className="tile tile-community"
            onClick={() => onOpenCommunity()} // 👈 navigate to community
            aria-label="Community"
          >
            <div className="tile-left">
              <div className="tile-icon circle-green">
                <Users />
              </div>
            </div>
            <div className="tile-body">
              <div className="tile-title">Community</div>
              <div className="tile-sub">Join support rooms</div>
            </div>
          </button>

          {/* Activities -> open Daily Tasks page */}
          <button
            className="tile tile-activities"
            onClick={() => onOpenResourceHub("dailyTasks")}
            aria-label="Activities"
          >
            <div className="tile-left">
              <div className="tile-icon circle-yellow">
                <Activity />
              </div>
            </div>
            <div className="tile-body">
              <div className="tile-title">Activities</div>
              <div className="tile-sub">
                {getCompletedTasksCount()}/10 completed today
              </div>
            </div>
          </button>

          {/* Counseling (placeholder) */}
          <button
            className="tile tile-counsel"
            onClick={() => {}}
            aria-label="Book Counseling"
          >
            <div className="tile-left">
              <div className="tile-icon circle-orange">
                <Calendar />
              </div>
            </div>
            <div className="tile-body">
              <div className="tile-title">Book Counseling</div>
              <div className="tile-sub">Book anonymously</div>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Chatbox */}
      <div className="fixed-chat">
        <form onSubmit={handleSend} className="chat-form" role="search">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Talk to BayMax..."
            className="chat-input"
            aria-label="Quick chat to BayMax"
          />
          <button type="submit" className="chat-send" aria-label="Send quick chat">
            Send <Send className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}
