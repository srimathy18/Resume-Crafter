import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { templates } from '../resume/ResumeTemplates';
import WorkExperience from '../resume/WorkExperience';
import Education from '../resume/Education';
import Skills from '../resume/Skills';
import Projects from '../resume/Projects';
import Hobbies from '../resume/Hobbies';
import { FaDownload, FaSave, FaMagic } from 'react-icons/fa';
import { generatePDF } from '../services/documentUtils';
import axios from 'axios';

const initialResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    experience: '',
    industry: '',
    objective: ''
  },
  experience: [{ title: '', company: '', duration: '', industry: '', responsibilities: [''] }],
  education: [{ degree: '', school: '', field: '', duration: '', description: '' }],
  skills: [''],
  projects: [{ name: '', technologies: '', industry: '', description: '' }],
  hobbies: ['']
};

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const resumeRef = useRef();

  const token = localStorage.getItem('token'); 

  // Function to replace unsupported oklch color values with rgb
  const replaceOklchColors = () => {
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const rules = styleSheets[i].cssRules;
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          if (rule.style) {
            for (let k = 0; k < rule.style.length; k++) {
              const property = rule.style[k];
              if (rule.style[property] && rule.style[property].includes('oklch')) {
                rule.style[property] = rule.style[property].replace(/oklch\([^)]*\)/g, 'rgb(0, 0, 0)');
              }
            }
          }
        }
      } catch (error) {
        console.error('Error processing stylesheets:', error);
      }
    }
  };

  // Export PDF function
  const handleExportPDF = async () => {
    if (!resumeRef.current) {
      toast.error('Resume content not ready');
      return;
    }

    try {
      setLoading(true);
      
      // Calling  this func to replace 'oklch' colors before generating the PDF
      replaceOklchColors();

      const fileName = `${resumeData.personalInfo.name || 'My'}_Resume`;
      await generatePDF(resumeRef.current, fileName);
      toast.success('Resume exported successfully!');
    } catch (error) {
      console.error('Error exporting resume:', error);
      toast.error('Failed to export resume');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!resumeData.personalInfo.name) {
      toast.error('Please fill in at least your name before saving');
      return;
    }

    setSavingDraft(true);
    try {
      const draftContent = {
        resumeData,
        selectedTemplate,
        lastModified: new Date().toISOString()
      };

      // Corrected the Authorization header with backticks for string interpolation
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Call the API to save or update the draft
      const response = draftId
        ? await axios.put(`/api/resumes/update/${draftId}`, draftContent, config)
        : await axios.post('/api/resumes/save', draftContent, config);

      if (response.data.success) {
        setDraftId(response.data.id || draftId); // Save the draft ID
        toast.success('Resume draft saved successfully!');
      } else {
        toast.error('Failed to save resume draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save resume draft');
    } finally {
      setSavingDraft(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!resumeData.personalInfo.jobTitle || !resumeData.personalInfo.industry) {
      toast.error('Please fill in job title and industry first');
      return;
    }

    setGenerating(true);
    try {
      // Call your AI generation function here
      toast.success('Resume content generated successfully!');
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error('Failed to generate resume content');
    } finally {
      setGenerating(false);
    }
  };

  const TemplateComponent = templates[selectedTemplate].component;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Personal Information Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Resume Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(initialResumeData.personalInfo).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="text"
                      value={resumeData.personalInfo[field]}
                      onChange={(e) => setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: e.target.value } }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleAIGenerate}
                disabled={generating}
                className="flex items-center gap-2 w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaMagic /> {generating ? 'Generating...' : 'AI Generate'}
              </button>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <WorkExperience
              experience={resumeData.experience}
              onChange={(newExperience) => setResumeData(prev => ({ ...prev, experience: newExperience }))}
            />
          </div>

          {/* Education Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Education
              education={resumeData.education}
              onChange={(newEducation) => setResumeData(prev => ({ ...prev, education: newEducation }))}
            />
          </div>

          {/* Skills Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Skills
              skills={resumeData.skills}
              onChange={(newSkills) => setResumeData(prev => ({ ...prev, skills: newSkills }))}
            />
          </div>

          {/* Projects Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Projects
              projects={resumeData.projects}
              onChange={(newProjects) => setResumeData(prev => ({ ...prev, projects: newProjects }))}
            />
          </div>

          {/* Hobbies Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Hobbies
              hobbies={resumeData.hobbies}
              onChange={(newHobbies) => setResumeData(prev => ({ ...prev, hobbies: newHobbies }))}
            />
          </div>

          {/* Template Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Select Template</h3>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {Object.keys(templates).map((template) => (
                <option key={template} value={template}>
                  {templates[template].name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleExportPDF}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              <FaDownload /> {loading ? 'Exporting...' : 'Export PDF'}
            </button>

            <button
              onClick={handleSaveDraft}
              disabled={savingDraft}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <FaSave className="mr-2" />
              {savingDraft ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Preview</h2>
          <div ref={resumeRef} className="w-full">
            <TemplateComponent data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
