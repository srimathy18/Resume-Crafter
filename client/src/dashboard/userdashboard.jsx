import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../dashboard/UserNavbar';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const token = localStorage.getItem('token'); 
  const userId = localStorage.getItem('userId'); 

  const handleCreateResume = () => {
    navigate('/create-resume');
  };

  const fetchSavedDrafts = async () => {
    if (!userId || !token) {
      toast.error('User not authenticated');
      return;
    }
  
    try {
      const response = await axios.get(`/api/resumes/my-drafts?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.success) {
        setDrafts(response.data.drafts);
      } else {
        toast.error('No drafts found');
      }
    } catch (error) {
      console.error('Error fetching drafts:', error);
      toast.error('Failed to load saved drafts');
    }
  };
  
  
  const handleDeleteDraft = async (draftId) => {
    const confirmation = window.confirm('Are you sure you want to delete this draft?');
    if (confirmation) {
      try {
        const response = await axios.delete(`/api/resumes/delete/${draftId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          toast.success('Draft deleted successfully');
          setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft._id !== draftId)); // Update drafts after deletion
        } else {
          toast.error('Failed to delete draft');
        }
      } catch (error) {
        console.error('Error deleting draft:', error);
        toast.error('Failed to delete draft');
      }
    }
  };

  useEffect(() => {
    fetchSavedDrafts();
  }, [token, userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f3ff] via-[#e6e7ff] to-[#dcdfff]">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-32 px-4">
        {/* Create Resume Box */}
        <div
          onClick={handleCreateResume}
          className="cursor-pointer w-64 h-40 bg-white border border-blue-600 shadow-md rounded-2xl flex flex-col justify-center items-center hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          <div className="text-4xl font-bold">+</div>
          <div className="mt-2 text-lg font-semibold">Create Resume</div>
        </div>

        {/* Saved Drafts */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Your Saved Drafts</h2>
          {drafts.length === 0 ? (
            <p>No drafts saved yet.</p>
          ) : (
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drafts.map((draft) => (
                <li key={draft._id}>
                  <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-all">
                    <h3 className="text-xl font-semibold">{draft.resumeData?.personalInfo?.name || 'Unnamed'}</h3>
                    <p>{draft.resumeData?.personalInfo?.jobTitle || 'No Job Title'}</p>
                    <button
                      onClick={() => navigate(`/view-draft/${draft._id}`)}
                      className="mt-2 text-indigo-600 hover:underline"
                    >
                      View Draft
                    </button>
                    <button
                      onClick={() => navigate(`/edit-draft/${draft._id}`)}
                      className="mt-2 text-blue-600 hover:underline"
                    >
                      Edit Draft
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft._id)}
                      className="mt-2 text-red-600 hover:underline"
                    >
                      Delete Draft
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
