import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  sendPrompt,
  startNewChat,
  getSingleChat,
} from "@/services/chatService";
import useChat from "@/hooks/useChat";

function ChatInput() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedChatId, setSelectedChatId, messages, setMessages } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);

    const optimisticMessage = {
      _id: Date.now(),
      role: "user",
      content: prompt,
      time: new Date().toISOString(),
    };
    setMessages([...messages, optimisticMessage]);

    try {
      let data;
      if (selectedChatId) {
        data = await sendPrompt({ prompt, chatId: selectedChatId });
        // Fetch latest messages from backend
        const chat = await getSingleChat(selectedChatId);
        setMessages(chat.chat);
      } else {
        data = await startNewChat(prompt);
        setSelectedChatId(data.chatId);
        // Fetch latest messages from backend
        const chat = await getSingleChat(data.chatId);
        setMessages(chat.chat);
      }
      setPrompt("");
    } catch (error) {
      console.error("Error sending prompt:", error);
      alert("Failed to send message. Please try again.");
      setMessages((msgs) => msgs.filter((msg) => msg._id !== optimisticMessage._id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-4 w-[95%] lg:w-[65%] p-4 border bg-background rounded-lg z-50 shadow-lg">
      <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
        <Input
          placeholder="Type your message..."
          className="flex-1"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Wait..." : "Send"}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Assistant can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}

export default ChatInput;
