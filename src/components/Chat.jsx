import { useEffect } from "react";
import { getSingleChat } from "@/services/chatService";
import useChat from "@/hooks/useChat";

function Chat() {
  const {selectedChatId, messages,setMessages}=useChat();

  useEffect(()=>{
    if(selectedChatId){
      getSingleChat(selectedChatId).then((chat)=>setMessages(chat.chat))
      .catch(()=>setMessages([]))
    }
    else{
      setMessages([])
    }
  },[selectedChatId,setMessages]);


  return (
    <div className=" relative w-full flex justify-center pt-20">
      <div className=" w-[95%] lg:w-[60%] ">
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
                {new Date(message.time|| Date.now()).toLocaleDateString([],{
                  hour:"2-digit",
                  minute:"2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Chat;
