import React from 'react';
import { FaPlus } from 'react-icons/fa'; 
import ResumeForm from '../components/ResumeForm';

const CreateResumePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
        <FaPlus className="text-green-500" /> Create Your Resume
      </h1>
      <div className="max-w-3xl mx-auto">
        <ResumeForm />
      </div>
    </div>
  );
};

export default CreateResumePage;
