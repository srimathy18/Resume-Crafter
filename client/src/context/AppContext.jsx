import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setTokenState] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Set token and persist to localStorage
  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  // ✅ Fetch user profile from backend
  const fetchUserProfile = async () => {
    try {
      setLoadingUser(true);
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      toast.error("Session expired. Please login again.");
      logout();
    } finally {
      setLoadingUser(false);
    }
  };

  // ✅ Fetch user when token changes
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        showLogin,
        setShowLogin,
        token,
        setToken,
        user,
        setUser,
        backendUrl,
        logout,
        loadingUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
