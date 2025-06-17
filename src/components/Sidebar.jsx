import { useEffect, useState } from "react";
import { getAllChats } from "@/services/chatService";
import useChat from "@/hooks/useChat";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarIcon, Plus } from "lucide-react";

function Sidebar() {
  const [chats, setChats] = useState([]);
  const { selectedChatId, handleSelectChat, handleNewChat } = useChat();

  useEffect(() => {
    getAllChats()
      .then((data) => setChats(data))
      .catch(() => setChats([]));
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2">
          <SidebarIcon className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Chats</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded bg-primary text-primary-foreground mb-2"
            onClick={handleNewChat}
          >
            <Plus size={16} /> New Chat
          </button>
          {chats.map((chat) => (
            <button
              key={chat._id}
              className={`text-left px-3 py-2 rounded hover:bg-muted ${
                selectedChatId === chat._id ? "bg-muted font-bold" : ""
              }`}
              onClick={() => handleSelectChat(chat._id)}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
