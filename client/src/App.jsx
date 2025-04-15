import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // No Router import here
import { AppProvider } from "./context/AppContext"; 
import ProtectedRoute from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import Login from "./pages/login";
import UserDashboard from "./dashboard/UserDashboard";
import ResumeBuilder from "./dashboard/ResumeBuilder";           
import CoverLetterBuilder from "./dashboard/CoverLetterBuilder"; 



/* const NavbarWrapper = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/create-resume', '/create-cover-letter']; 
  if (hideNavbarPaths.includes(location.pathname)) return null;
  return <Navbar />;
};
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-resume"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-cover-letter"
          element={
            <ProtectedRoute>
              <CoverLetterBuilder />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
