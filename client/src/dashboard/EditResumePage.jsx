import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const EditResumePage = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the resume ID from the URL

  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/resume/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumeData(response.data);
      } catch (error) {
        toast.error('Error fetching resume');
      }
    };

    fetchResume();
  }, [backendUrl, token, id]);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${backendUrl}/api/resume/${id}`, resumeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Resume updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error updating resume');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h1 className="text-2xl text-center text-neutral-700 font-medium mb-6">Edit Resume</h1>
        <div className="mb-4">
          <input
            type="text"
            name="fullName"
            value={resumeData.fullName}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Full Name"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={resumeData.email}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="phone"
            value={resumeData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Phone Number"
          />
        </div>

        <div className="mb-4">
          <textarea
            name="summary"
            value={resumeData.summary}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Summary"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="skills"
            value={resumeData.skills}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Skills"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="experience"
            value={resumeData.experience}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Experience"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="education"
            value={resumeData.education}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Education"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Resume
        </motion.button>
      </motion.form>
    </div>
  );
};

export default EditResumePage;
