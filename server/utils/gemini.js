import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateResumeFromGemini = async (userInput) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Generate a professional resume in JSON format.
    Include fields: fullName, contactInfo, skills, education, experience, summary, projects.
    User Info:
    Name: ${userInput.fullName}
    Skills: ${userInput.skills.map(s => s.name).join(", ")}
    Education: ${userInput.education.map(e => `${e.degree} at ${e.institution}`).join(", ")}
    Experience: ${userInput.experience.map(e => `${e.position} at ${e.company}`).join(", ")}

    JSON output only.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    // Parse the JSON from the model response
    return JSON.parse(text);
  } catch (err) {
    throw new Error("Failed to parse AI-generated resume.");
  }
};
