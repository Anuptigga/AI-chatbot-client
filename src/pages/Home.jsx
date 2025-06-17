import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import Navbar from "@/components/Navbar";

function Home(){
  return (
    <div className="relative">
        <Navbar/>
      <Chat/>
      <ChatInput/>
    </div>
  )
}
export default Home;