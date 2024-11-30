import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (token) {
        try {
          const response = await axios.post("http://localhost:5000/api/user/verify/token", {
            token,
          });

          if (response.data.success) {
            setIsLoggedIn(true);
            setIsAdmin(response.data.data.isAdmin); // Set isAdmin from response
          } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
          }
        } catch (error) {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
