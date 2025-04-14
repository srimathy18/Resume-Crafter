import React from 'react';

const GeneratedResume = () => {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Your Generated Resume</h2>
      {/* Render resume using selected template */}
      <div className="resume-preview border p-4 bg-white shadow-lg">
        {/* Example: <Template1 data={resumeData} /> */}
      </div>

      <div className="mt-4 space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Download PDF</button>
      </div>
    </div>
  );
};

export default GeneratedResume;
