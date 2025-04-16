// models/resumeModel.js
import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  resumeData: { type: Object, required: true },          // 👈 matches your frontend
  selectedTemplate: { type: String, default: 'default' },
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
});


export default mongoose.model('Resume', ResumeSchema);
