import express from "express";
import {
  createResume,
  generateResumeAI,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume
} from "../controllers/resumeController.js";

import userAuth from '../middlewares/auth.js';

const router = express.Router();

router.post("/", userAuth, createResume);
router.post("/generate", userAuth, generateResumeAI);

router.get("/", userAuth, getUserResumes);
router.get("/:id", userAuth, getResumeById);
router.put("/:id", userAuth, updateResume);
router.delete("/:id", userAuth, deleteResume);

export default router;
