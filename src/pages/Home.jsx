import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import Navbar from "../components/Navbar";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    { message: "Hello! How can I help you?", owner: "ai" },
    {
      message: "I want to know who is the winner of IPL this year",
      owner: "user",
    },
  ]);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { message: msg, owner: "user" }]);
    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { message: "Let me check that for you...", owner: "ai" },
      ]);
    }, 800);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar
          expanded={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
        />
        <div className="w-full flex flex-col">
          <ChatArea messages={messages} />
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
export default Home;
