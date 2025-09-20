import { useState } from "react";
import HomePage from "./HomePage";
import ResourceHubPage from "./ResourceHubPage";
import DailyTasksPage from "./DailyTasksPage";
import ChatPage from "./ChatBotPage";
import JournalPage from "./JournalPage";
import "./index.css";

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      {screen === "home" && (
        <HomePage
          onOpenChat={() => setScreen("chat")}
          onOpenJournal={() => setScreen("journal")}
          onOpenResourceHub={(target) => {
            if (target === "dailyTasks") setScreen("dailyTasks");
            else setScreen("resourceHub");
          }}
        />
      )}

      {screen === "resourceHub" && (
        <ResourceHubPage onBack={() => setScreen("home")} />
      )}

      {screen === "dailyTasks" && (
        <DailyTasksPage onBack={() => setScreen("home")} />
      )}

      {screen === "chat" && <ChatPage onBack={() => setScreen("home")} />}
      {screen === "journal" && <JournalPage onBack={() => setScreen("home")} />}
    </>
  );
}
