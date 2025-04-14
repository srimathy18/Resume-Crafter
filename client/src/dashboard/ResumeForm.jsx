import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { motion } from 'framer-motion';

const ResumeForm = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    profileImage: '',
    linkedin: '',
    github: '',
    leetcode: '',
    portfolio: '',
    education: [{
      institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '', description: '',
    }],
    experience: [{
      company: '', position: '', location: '', startDate: '', endDate: '', description: '',
    }],
    skills: [{
      name: '', level: '',
    }],
    template: 'modern',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index, e) => {
    const updated = [...formData.education];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, education: updated });
  };

  const handleExperienceChange = (index, e) => {
    const updated = [...formData.experience];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, experience: updated });
  };

  const handleSkillsChange = (index, e) => {
    const updated = [...formData.skills];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, skills: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '', description: '',
      }],
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, {
        company: '', position: '', location: '', startDate: '', endDate: '', description: '',
      }],
    });
  };

  const addSkills = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: '', level: '' }],
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/resumes`, formData);
      const data = response.data;
      console.log('Resume creation response:', data);
      if (data.success) {
        toast.success('Resume created successfully!');
        navigate('/choose-template'); // Next step: template selection
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-20 text-center bg-gradient-to-br from-[#f2f3ff] via-[#e6e7ff] to-[#dcdfff]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-white shadow-lg border border-gray-200 rounded-3xl p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              ✨ Create a Stunning Resume
            </CardTitle>
            <CardDescription className="text-gray-500">
              Fill in the details below and continue to choose a template.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={onSubmitHandler} className="space-y-6 text-left">

              {/* Basic Info */}
              <Input name="fullName" value={formData.fullName} onChange={onChange} placeholder="Full Name" required />
              <Input name="email" type="email" value={formData.email} onChange={onChange} placeholder="Email" required />
              <Input name="phone" value={formData.phone} onChange={onChange} placeholder="Phone" required />
              <Textarea name="summary" value={formData.summary} onChange={onChange} placeholder="Professional Summary" />

              {/* Social Links */}
              <Input name="linkedin" value={formData.linkedin} onChange={onChange} placeholder="LinkedIn URL" />
              <Input name="github" value={formData.github} onChange={onChange} placeholder="GitHub URL" />
              <Input name="leetcode" value={formData.leetcode} onChange={onChange} placeholder="LeetCode URL" />
              <Input name="portfolio" value={formData.portfolio} onChange={onChange} placeholder="Portfolio URL" />

              {/* Education */}
              <div>
                <Label>Education</Label>
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <Input name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} placeholder="Institution" />
                    <Input name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="Degree" />
                    <Input name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleEducationChange(index, e)} placeholder="Field of Study" />
                    <Input name="startDate" value={edu.startDate} onChange={(e) => handleEducationChange(index, e)} placeholder="Start Date" />
                    <Input name="endDate" value={edu.endDate} onChange={(e) => handleEducationChange(index, e)} placeholder="End Date" />
                    <Input name="grade" value={edu.grade} onChange={(e) => handleEducationChange(index, e)} placeholder="Grade" />
                    <Textarea name="description" value={edu.description} onChange={(e) => handleEducationChange(index, e)} placeholder="Description" />
                  </div>
                ))}
                <Button type="button" onClick={addEducation}>➕ Add More Education</Button>
              </div>

              {/* Experience */}
              <div>
                <Label>Experience</Label>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <Input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="Company" />
                    <Input name="position" value={exp.position} onChange={(e) => handleExperienceChange(index, e)} placeholder="Position" />
                    <Input name="location" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} placeholder="Location" />
                    <Input name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} placeholder="Start Date" />
                    <Input name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} placeholder="End Date" />
                    <Textarea name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} placeholder="Description" />
                  </div>
                ))}
                <Button type="button" onClick={addExperience}>➕ Add More Experience</Button>
              </div>

              {/* Skills */}
              <div>
                <Label>Skills</Label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <Input name="name" value={skill.name} onChange={(e) => handleSkillsChange(index, e)} placeholder="Skill Name" />
                    <Input name="level" value={skill.level} onChange={(e) => handleSkillsChange(index, e)} placeholder="Skill Level" />
                  </div>
                ))}
                <Button type="button" onClick={addSkills}>➕ Add More Skills</Button>
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-4">
                <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                  Next: Choose Template →
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResumeForm;
