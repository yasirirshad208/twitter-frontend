// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </AdminProvider>
  </StrictMode>,
);
