// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { Provider } from 'react-redux';
import store from './store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <AdminProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </AdminProvider>
    </Provider>
  </StrictMode>,
);
