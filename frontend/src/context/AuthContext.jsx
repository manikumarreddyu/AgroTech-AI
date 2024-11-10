import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize the logged-in state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const authData = localStorage.getItem('auth');
    return authData ? true : false;
  });

  // Initialize user data from localStorage
  const [userData, setUserData] = useState(() => {
    const authData = localStorage.getItem('auth');
    return authData ? JSON.parse(authData).user : null;
  });

  const login = (token, user) => {
    // Store authentication data in localStorage
    localStorage.setItem('auth', JSON.stringify({ token, user }));
    setIsLoggedIn(true);
    setUserData(user);
  };

  const logout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
    setUserData(null);
  };

  // Effect to set user data when the component mounts
  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const { user } = JSON.parse(authData);
      setUserData(user);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

