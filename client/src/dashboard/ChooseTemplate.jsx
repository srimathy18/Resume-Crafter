import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from '../data/templates';

const ChooseTemplate = () => {
  const navigate = useNavigate();

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#2563eb'); // default blue
  const [selectedFont, setSelectedFont] = useState('sans-serif');

  const handleGenerateResume = () => {
    // Send selectedTemplate, selectedColor, selectedFont to backend or AI
    // Save generated resume in DB/localStorage/context
    navigate('/dashboard'); // Show generated resume in dashboard
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-white">
      <h1 className="text-3xl font-bold text-center mb-10">Choose Template Style</h1>

      {/* Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`p-4 rounded-xl border shadow cursor-pointer ${
              selectedTemplate === template.id ? 'border-blue-600 ring-2 ring-blue-300' : ''
            }`}
          >
            <img src={template.thumbnail} alt={template.name} className="rounded mb-2" />
            <h2 className="font-semibold">{template.name}</h2>
          </div>
        ))}
      </div>

      {/* Color & Font */}
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <div>
          <label className="block font-medium mb-1">Choose Accent Color</label>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-16 h-10 border-2 border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Choose Font</label>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="p-2 border rounded w-full max-w-sm"
          >
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>

        <button
          onClick={handleGenerateResume}
          disabled={!selectedTemplate}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl mt-4 disabled:opacity-50"
        >
          Generate Resume
        </button>
      </div>
    </div>
  );
};

export default ChooseTemplate;
