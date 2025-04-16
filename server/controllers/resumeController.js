import Resume from '../models/resumeModel.js';
import mongoose from 'mongoose';

// Save new resume draft
export const saveDraft = async (req, res) => {
  const { resumeData, selectedTemplate } = req.body;
  const userId = req.user.id;

  if (!resumeData || !selectedTemplate) {
    return res.status(400).json({ success: false, error: 'Missing resume data or template' });
  }

  try {
    const newDraft = new Resume({
      userId,
      resumeData,
      selectedTemplate,
      lastModified: new Date(),
    });

    const savedDraft = await newDraft.save();
    res.status(201).json({
      success: true,
      id: savedDraft._id,
      message: 'Resume draft saved successfully!',
    });
  } catch (error) {
    console.error(`Error saving draft for user ${userId}:`, error);
    res.status(500).json({ success: false, error: 'Failed to save resume draft' });
  }
};

// Get all drafts for the logged-in user
export const getUserDrafts = async (req, res) => {
  const userId = req.user.id;

  try {
    const drafts = await Resume.find({ userId }).sort({ lastModified: -1 });
    res.status(200).json({ success: true, drafts });
  } catch (error) {
    console.error(`Error fetching drafts for user ${userId}:`, error);
    res.status(500).json({ success: false, error: 'Failed to fetch drafts' });
  }
};

// Get a single draft by ID
export const getSingleDraft = async (req, res) => {
  const userId = req.user.id;
  const draftId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(draftId)) {
    return res.status(400).json({ success: false, error: 'Invalid draft ID' });
  }

  try {
    const draft = await Resume.findOne({ _id: draftId, userId });
    if (!draft) {
      return res.status(404).json({ success: false, error: 'Draft not found or unauthorized' });
    }

    res.status(200).json({ success: true, draft });
  } catch (error) {
    console.error(`Error fetching draft ${draftId} for user ${userId}:`, error);
    res.status(500).json({ success: false, error: 'Failed to fetch draft' });
  }
};

// Update an existing resume draft
export const updateDraft = async (req, res) => {
  const draftId = req.params.id;
  const { resumeData, selectedTemplate } = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(draftId)) {
    return res.status(400).json({ success: false, error: 'Invalid draft ID' });
  }

  if (!resumeData || !selectedTemplate) {
    return res.status(400).json({ success: false, error: 'Missing resume data or template' });
  }

  try {
    const updatedDraft = await Resume.findOneAndUpdate(
      { _id: draftId, userId },
      { resumeData, selectedTemplate, lastModified: new Date() },
      { new: true }
    );

    if (!updatedDraft) {
      return res.status(404).json({ success: false, error: 'Draft not found or unauthorized' });
    }

    res.status(200).json({
      success: true,
      message: 'Resume draft updated successfully!',
      draft: updatedDraft,
    });
  } catch (error) {
    console.error(`Error updating draft ${draftId} for user ${userId}:`, error);
    res.status(500).json({ success: false, error: 'Failed to update resume draft' });
  }
};

// Delete a resume draft
export const deleteDraft = async (req, res) => {
  const draftId = req.params.id;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(draftId)) {
    return res.status(400).json({ success: false, error: 'Invalid draft ID' });
  }

  try {
    const deleted = await Resume.findOneAndDelete({ _id: draftId, userId });

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Draft not found or unauthorized' });
    }

    res.status(200).json({
      success: true,
      message: 'Resume draft deleted successfully!',
    });
  } catch (error) {
    console.error(`Error deleting draft ${draftId} for user ${userId}:`, error);
    res.status(500).json({ success: false, error: 'Failed to delete resume draft' });
  }
};
