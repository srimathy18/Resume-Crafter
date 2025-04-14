import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: String,
    email: String,
    phone: String,
    summary: String,
    profileImage: String,
    linkedin: String,
    github: String,
    portfolio: String,
    education: [{
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
      grade: String,
      description: String,
    }],
    experience: [{
      company: String,
      position: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String,
    }],
    skills: [{
      name: String,
      level: String,
    }],
    customSections: [String],
    template: String,
    pdfUrl: String,
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    version: {
      type: Number,
      default: 1,
    }
  }, { timestamps: true });
  

  const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
  export default Resume;