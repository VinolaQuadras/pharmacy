// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(/* Initial user state */);

  const login = (userData) => {
    // Perform login logic, set user data, and update the state
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, clear user data, and update the state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
