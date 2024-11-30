// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { Provider } from 'react-redux';
import store from './store.jsx';
import { AuthProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
     <AuthProvider>
    <AdminProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </AdminProvider>
    </AuthProvider>
    </Provider>
  </StrictMode>,
);
