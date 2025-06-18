// Home.tsx
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import Navbar from "@/components/Navbar";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        {" "}
        {/* This enables browser scroll */}
        <Chat />
      </div>
      <ChatInput />
    </div>
  );
}
export default Home;
