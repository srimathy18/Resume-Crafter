import React from "react";

const TemplateCard = ({ template, onSelect }) => {
  return (
    <div
      className="border shadow-md rounded-lg overflow-hidden hover:scale-105 transition-all cursor-pointer"
      onClick={() => onSelect(template)}
    >
      <img
        src={template.thumbnail}
        alt={template.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{template.name}</h2>
        <p className="text-sm text-gray-600">{template.description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
