import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SidebarContextProvider } from './context/sidebarContext';
import { AuthContextProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SidebarContextProvider>
        <App />
      </SidebarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
