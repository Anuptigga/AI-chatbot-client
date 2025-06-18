import { useEffect, useState } from "react";
import {
  getAllChats,
  updateChatTitle,
  deleteChat,
} from "@/services/chatService";
import useChat from "@/hooks/useChat";
import useAuth from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarIcon, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const [chats, setChats] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const { selectedChatId, handleSelectChat, handleNewChat } = useChat();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (isLogin) {
      getAllChats()
        .then((data) => setChats(data))
        .catch(() => setChats([]));
    } else {
      setChats([]);
    }
  }, [isLogin]);

  const refreshChats = () => {
    getAllChats()
      .then((data) => setChats(data))
      .catch(() => setChats([]));
  };

  const handleEdit = (chat) => {
    setEditingId(chat._id);
    setEditTitle(chat.title);
  };

  const handleEditSubmit = async (chatId) => {
    if (editTitle.trim()) {
      await updateChatTitle(chatId, editTitle.trim());
      setEditingId(null);
      setEditTitle("");
      refreshChats();
    }
  };

  const handleDelete = async (chatId) => {
    await deleteChat(chatId);
    refreshChats();
    if (selectedChatId === chatId) {
      handleNewChat();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="m-2">
          <SidebarIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 px-4 py-6">
        <SheetHeader>
          <SheetTitle>Chats</SheetTitle>
          <SheetDescription>
            Select a chat to view messages or start a new chat.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Button
            className="flex items-center gap-2 mb-2"
            onClick={handleNewChat}
            variant="default"
          >
            <Plus size={16} /> New Chat
          </Button>
          <div className="flex flex-col gap-2">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`flex items-center gap-2 rounded-lg px-2 py-1 transition-colors ${
                  selectedChatId === chat._id
                    ? "bg-muted font-semibold"
                    : "hover:bg-accent"
                }`}
              >
                {editingId === chat._id ? (
                  <>
                    <input
                      className="flex-1 px-2 py-1 rounded border text-sm bg-background"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditSubmit(chat._id);
                        if (e.key === "Escape") {
                          setEditingId(null);
                          setEditTitle("");
                        }
                      }}
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-green-600"
                      onClick={() => handleEditSubmit(chat._id)}
                      title="Save"
                    >
                      <Check size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setEditingId(null);
                        setEditTitle("");
                      }}
                      title="Cancel"
                    >
                      <X size={18} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="flex-1 justify-start px-2 py-1 text-left truncate"
                      onClick={() => handleSelectChat(chat._id)}
                    >
                      {chat.title}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-blue-600"
                      onClick={() => handleEdit(chat)}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(chat._id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
