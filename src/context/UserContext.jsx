// src/context/UserContext.js
import React, { createContext, useContext, useReducer } from 'react';
import userReducer from '../reducers/userReducer';

// Create the context
const UserContext = createContext();

// Initial state
const initialState = {
  users: [],
  loading: true,
  error: null,
};

// UserContext Provider
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
