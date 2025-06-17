import axios from "./axios";

// Get all chats
export const getAllChats = async () => {
  const res = await axios.get("/chat/getAllChats", { withCredentials: true });
  return res.data;
};

// Get a single chat by ID
export const getSingleChat = async (chatId) => {
  const res = await axios.get(`/chat/${chatId}`, { withCredentials: true });
  return res.data;
};

// Send a prompt to the AI (create or continue chat)
export const sendPrompt = async ({ prompt, chatId }) => {
  const res = await axios.post(
    "/openrouter/query",
    { prompt, chatId },
    { withCredentials: true }
  );
  return res.data;
};

// Start a new chat (by sending a prompt without chatId)
export const startNewChat = async (prompt) => {
  const res = await axios.post(
    "/openrouter/query",
    { prompt },
    { withCredentials: true }
  );
  return res.data;
};
