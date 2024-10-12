import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("auth");
  });

  const login = (token) => {
    localStorage.setItem("auth", JSON.stringify(token));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("auth");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
