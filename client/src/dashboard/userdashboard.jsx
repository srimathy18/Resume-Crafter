import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../dashboard/UserNavbar';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleCreateResume = () => {
    navigate('/resume-form'); // Step 1: Go to form
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f3ff] via-[#e6e7ff] to-[#dcdfff]">
      <UserNavbar />
      <div className="max-w-6xl mx-auto pt-32 px-4">
  <div
    onClick={handleCreateResume}
    className="cursor-pointer w-64 h-40 bg-white border border-blue-600 shadow-md rounded-2xl flex flex-col justify-center items-center hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    <div className="text-4xl font-bold">+</div>
    <div className="mt-2 text-lg font-semibold">Create Resume</div>
  </div>
</div>


    </div>
  );
};

export default UserDashboard;
