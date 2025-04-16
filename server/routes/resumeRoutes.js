import express from 'express';
import {
  saveDraft,
  getUserDrafts,
  getSingleDraft,
  updateDraft,
  deleteDraft,
} from '../controllers/resumeController.js'; 

import authenticateUser from '../middlewares/auth.js'; 

const router = express.Router();

// All routes will be protected
router.use(authenticateUser);

// Save a new resume draft
router.post('/drafts', saveDraft);

// Get all drafts for the logged-in user
router.get('/my-drafts', getUserDrafts);

// Get a specific draft by ID
router.get('/drafts/:id', getSingleDraft);

// Update a specific draft
router.put('/drafts/:id', updateDraft);

// Delete a specific draft
router.delete('/drafts/:id', deleteDraft);

export default router;
