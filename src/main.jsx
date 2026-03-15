import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router'
import { AuthProvider } from './context/AuthProvider'
import { SocketProvider } from './context/SocketProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <RouterProvider router={router}></RouterProvider>
      </SocketProvider>
    </AuthProvider>
  </StrictMode>,
)
