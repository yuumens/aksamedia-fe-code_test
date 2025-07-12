import { createContext, useEffect, useState } from "react";
import { storage } from "../utils/storage";
import { STORAGE_KEYS, STATIC_CREDENTIALS } from "../utils/constants";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.get(STORAGE_KEYS.AUTH_USER);
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    if (
      username === STATIC_CREDENTIALS.username &&
      password === STATIC_CREDENTIALS.password
    ) {
      const userData = {
        id: 1,
        username: username,
        fullName: "Administrator",
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      storage.set(STORAGE_KEYS.AUTH_USER, userData);
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    storage.remove(STORAGE_KEYS.AUTH_USER);
  };

  const updateProfile = (fullName) => {
    if (user) {
      const updatedUser = { ...user, fullName };
      setUser(updatedUser);
      storage.set(STORAGE_KEYS.AUTH_USER, updatedUser);
      return { success: true };
    }
    return { success: false, error: "No user logged in" };
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const getCurrentUser = () => {
    return user;
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isAuthenticated,
    getCurrentUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
