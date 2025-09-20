import { useState } from "react";
import HomePage from "./HomePage";
import ChatbotPage from "./ChatbotPage";

export default function App() {
  const [view, setView] = useState("home");

  return (
    <>
      {view === "home" && <HomePage onOpenChat={() => setView("chat")} />}
      {view === "chat" && <ChatbotPage onBack={() => setView("home")} />}
    </>
  );
}
