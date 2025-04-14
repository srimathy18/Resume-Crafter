import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResumeDetailsPage = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`/api/resume/${id}`);
        setResume(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching resume');
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {resume ? (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-neutral-700">{resume.fullName}</h1>
          <p className="text-sm text-neutral-500">{resume.email}</p>
          <p className="text-sm text-neutral-500">{resume.phone}</p>

          <h2 className="text-lg font-semibold mt-6">Summary</h2>
          <p>{resume.summary}</p>

          <h2 className="text-lg font-semibold mt-6">Skills</h2>
          <p>{resume.skills}</p>

          <h2 className="text-lg font-semibold mt-6">Experience</h2>
          <p>{resume.experience}</p>

          <h2 className="text-lg font-semibold mt-6">Education</h2>
          <p>{resume.education}</p>

          <button
            onClick={() => navigate(`/edit-resume/${resume._id}`)}
            className="mt-6 text-blue-600 hover:underline"
          >
            Edit Resume
          </button>
        </div>
      ) : (
        <p>Resume not found.</p>
      )}
    </div>
  );
};

export default ResumeDetailsPage;
