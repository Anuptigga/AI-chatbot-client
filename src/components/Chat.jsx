import { useEffect, useRef } from "react";
import { getSingleChat } from "@/services/chatService";
import useChat from "@/hooks/useChat";

function Chat() {
  const { selectedChatId, messages, setMessages } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (selectedChatId) {
      getSingleChat(selectedChatId)
        .then((chat) => setMessages(chat.chat))
        .catch(() => setMessages([]));
    } else {
      setMessages([]);
    }
  }, [selectedChatId, setMessages]);

  useEffect(()=>{
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behaviour:"smooth"})
    }
  },[messages]);

  return (
    <div className="w-[95%] lg:w-[60%] mx-auto pt-20 pb-40">
      {" "}
      {/* Increased bottom padding */}
      {messages.map((message) => (
        <div
          key={message._id}
          className={`flex mb-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            <p
              className={`text-xs mt-1 ${
                message.role === "user"
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              }`}
            >
              {new Date(message.time || Date.now()).toLocaleDateString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
      <div ref={bottomRef}/>
    </div>
  );
}
export default Chat;
