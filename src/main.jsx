import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router'
import { AuthProvider } from './context/AuthProvider'
import { SocketProvider } from './context/SocketProvider'
import ChatFloatingButton from './components/chat/ChatFloatingButton'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <RouterProvider router={router}></RouterProvider>
        <ChatFloatingButton />
      </SocketProvider>
    </AuthProvider>
  </StrictMode>,
)
