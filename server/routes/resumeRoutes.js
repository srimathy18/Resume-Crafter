import express from "express";
import {
  createResume,
  generateResumeAI,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume
} from "../controllers/resumeController.js";

import userAuth from "../middlewares/auth.js"; // Auth middleware to protect routes

const router = express.Router();

// Create a resume manually
router.post("/", userAuth, createResume);

// Generate resume using AI
router.post("/generate", userAuth, generateResumeAI);

// Get all resumes of the logged-in user
router.get("/", userAuth, getUserResumes);

// Get a single resume by ID
router.get("/:id", userAuth, getResumeById);

// Update a resume by ID
router.put("/:id", userAuth, updateResume);

// Delete a resume by ID
router.delete("/:id", userAuth, deleteResume);

export default router;
