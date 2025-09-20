// src/HomePage.jsx
import { useState } from "react";
import {
  Menu,
  Users,
  Activity,
  Gamepad2,
  Send,
  Calendar,
  MessageCircle,
  BookOpen,
} from "lucide-react";

export default function HomePage({ onOpenChat }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  // Sliders state
  const [happyLevel, setHappyLevel] = useState(60);
  const [energyLevel, setEnergyLevel] = useState(45);

  function handleSend(e) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatInput("");
    onOpenChat(); // quick-entry to full chat page
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
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="overlay">
          <div className="overlay-back" onClick={() => setSidebarOpen(false)} />
          <aside className="sidebar">
            <div className="sidebar-head">
              <div className="sidebar-title">Menu</div>
              <button className="close-plain" onClick={() => setSidebarOpen(false)}>
                Close
              </button>
            </div>

            <nav className="sidebar-nav">
              {/* CHATBOT entry in the menu */}
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

              <button
                onClick={() => {
                  setSidebarOpen(false);
                }}
                className="nav-item"
              >
                <BookOpen className="nav-icon" /> <span>Journal</span>
              </button>

              <button onClick={() => { setSidebarOpen(false); }} className="nav-item">
                <Users className="nav-icon" /> <span>Community</span>
              </button>

              <button onClick={() => { setSidebarOpen(false); }} className="nav-item">
                <Activity className="nav-icon" /> <span>Activity</span>
              </button>

              <button onClick={() => { setSidebarOpen(false); }} className="nav-item">
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
          <button className="tile tile-journal" aria-label="Journal">
            <div className="tile-left">
              <div className="tile-icon circle-purple"><BookOpen /></div>
            </div>
            <div className="tile-body">
              <div className="tile-title">Journal</div>
              <div className="tile-sub">Log your daily journal</div>
            </div>
          </button>

          <button className="tile tile-community" onClick={() => {}} aria-label="Community">
            <div className="tile-left">
              <div className="tile-icon circle-green"><Users /></div>
            </div>
            <div className="tile-body">
              <div className="tile-title">Community</div>
              <div className="tile-sub">Join support rooms</div>
            </div>
          </button>

          <button className="tile tile-activities" onClick={() => {}} aria-label="Activities">
            <div className="tile-left">
              <div className="tile-icon circle-yellow"><Activity /></div>
            </div>
            <div className="tile-body">
              <div className="tile-title">Activities</div>
              <div className="tile-sub">Track your progress</div>
            </div>
          </button>

          <button className="tile tile-counsel" onClick={() => {}} aria-label="Book Counseling">
            <div className="tile-left">
              <div className="tile-icon circle-orange"><Calendar /></div>
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
