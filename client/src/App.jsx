import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import UserDashboard from "./dashboard/userdashboard";
import ChooseTemplate from "./dashboard/ChooseTemplate";
import GeneratedResume from "./dashboard/GeneratedResume";
import ResumeForm from "./dashboard/ResumeForm";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<UserDashboard/>}/>
      <Route path="/resume-form" element={<ResumeForm />} />
      <Route path="/choose-template" element={< ChooseTemplate/>} />
       <Route path="/generated-resume" element={<GeneratedResume />} />

    </Routes>
   
  );
}

export default App;
