import React from 'react';

function ResumeCard({ resume, onEdit, onDelete, onDownload }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{resume.name}</h3>
      <p className="text-sm text-gray-600">Template: {resume.templateName}</p>

      {/* Buttons for different actions */}
      <div className="mt-4 flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onEdit(resume.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => onDelete(resume.id)}
        >
          Delete
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => onDownload(resume.id)}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default ResumeCard;
