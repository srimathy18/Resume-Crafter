import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, Download } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Login from "./login";

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    title: "AI Content Generation",
    desc: "Let AI write bullet points and summaries tailored to your experience and job roles.",
  },
  {
    icon: <FileText className="w-6 h-6 text-white" />,
    title: "Modern Templates",
    desc: "Pick from a variety of clean and professional resume designs.",
  },
  {
    icon: <Download className="w-6 h-6 text-white" />,
    title: "One-Click PDF Export",
    desc: "Download your resume instantly in high-quality PDF format.",
  },
];

const Home = () => {
  const { showLogin, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-20 bg-gradient-to-br from-[#f2f3ff] via-[#e6e7ff] to-[#dcdfff]">
      {/* Hero Section */}
      <div className="w-full max-w-7xl flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-left">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-[#7A73D1]">ResumeCrafter</span>
          </motion.h1>

          <motion.p
            className="text-gray-700 mb-8 text-base md:text-lg max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create a stunning, professional resume in minutes using AI tools
            designed to showcase your strengths and land your dream job.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              className="bg-[#7A73D1] hover:bg-[#625acc] px-8 py-3 text-white text-lg rounded-xl shadow-md transition duration-300 hover:scale-105"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </motion.div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2">
          <motion.img
            src="./resume.jpg"
            alt="Resume Builder Preview"
            className="rounded-2xl border-[6px] border-[#7A73D1] shadow-2xl transition-all duration-300 hover:scale-105 w-full max-w-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-24 w-full max-w-6xl px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3 text-center">How It Works</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Our AI-powered resume builder helps you craft personalized, professional resumes with ease. Here's what you get:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-72 bg-white/80 backdrop-blur-lg flex flex-col justify-between p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300 rounded-2xl">
                <CardContent className="flex flex-col items-center text-center h-full">
                  <div className="bg-[#7A73D1] p-4 rounded-full shadow-md mb-5 transition-transform hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl text-gray-800">{feature.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && <Login />}
    </div>
  );
};

export default Home;
