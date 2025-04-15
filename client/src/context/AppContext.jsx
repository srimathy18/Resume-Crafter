import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setTokenState] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const fetchUserProfile = async () => {
    if (!token) return;

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
      toast.error("Session expired. Please log in again.");
      logout();
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (token) fetchUserProfile();
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

export const useAppContext = () => useContext(AppContext);
