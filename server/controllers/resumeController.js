import Resume from "../models/resumeModel.js";
import { generateResumeFromGemini } from "../utils/gemini.js";

// Create resume manually
const createResume = async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      userId: req.user.id,
    };
    const resume = new Resume(resumeData);
    await resume.save();
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate resume using Gemini AI
const generateResumeAI = async (req, res) => {
  try {
    const userInput = req.body;
    const aiContent = await generateResumeFromGemini(userInput);

    const resume = new Resume({
      ...aiContent,
      userId: req.user.id,
      aiGenerated: true,
    });

    await resume.save();
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all resumes for the logged-in user
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single resume by ID
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a resume
const updateResume = async (req, res) => {
  try {
    const updated = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Resume not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a resume
const deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ error: "Resume not found" });
    res.status(200).json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createResume,
  generateResumeAI,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume
};
