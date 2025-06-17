import { createContext, useState } from "react";
export const ChatContext = createContext();
export function ChatProvider({children}){
    const [selectedChatId,setSelectedChatId]= useState(null)
    const [messages,setMessages]=useState([])
    const handleSelectChat=(chatId)=>{
        setSelectedChatId(chatId)
        setMessages([])
    }
    const handleNewChat=()=>{
        setSelectedChatId(null)
        setMessages([])
    }
    const handleNewMessage=(msg)=>{
        setMessages((prev)=>[...prev,msg]);
    }

return (
    <ChatContext.Provider
    value={{
        selectedChatId,setSelectedChatId,messages,setMessages,handleNewChat,handleNewMessage,handleSelectChat
    }}>
        {children}
    </ChatContext.Provider>
)
}
