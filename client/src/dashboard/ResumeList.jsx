import React from 'react';
import ResumeCard from './ResumeCard';

function ResumeList({ resumes, onEdit, onDelete, onDownload }) {
  if (resumes.length === 0) {
    return <p className="text-muted-foreground text-center">No resumes found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          onEdit={onEdit}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}

export default ResumeList;
