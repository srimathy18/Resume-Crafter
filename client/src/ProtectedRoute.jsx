import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../src/context/AppContext"; 

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext(); 

  if (!user) {
    // Not logged in? Redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected content
  return children;
};

export default ProtectedRoute;
