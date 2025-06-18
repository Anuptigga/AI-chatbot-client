import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatProvider } from './contexts/ChatContext'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
    </ChatProvider>
  </StrictMode>,
)
