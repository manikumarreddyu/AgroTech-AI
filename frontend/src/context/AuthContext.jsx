import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = (token, user) => {
    localStorage.setItem('auth', JSON.stringify({ token, user }));
    setIsLoggedIn(true);
    setUserData(user); // Set user data which includes role
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
