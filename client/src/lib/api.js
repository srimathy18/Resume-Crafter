import axios from 'axios';

// Load base URL from environment
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Attach token to headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Resume APIs
export const fetchUserResumes = async () => {
  const { data } = await api.get('/resumes');
  return data;
};

export const getResumeById = async (id) => {
  const { data } = await api.get(`/resumes/${id}`);
  return data;
};

export const createResume = async (resumeData) => {
  const { data } = await api.post('/resumes', resumeData);
  return data;
};

export const updateResume = async (id, resumeData) => {
  const { data } = await api.put(`/resumes/${id}`, resumeData);
  return data;
};

export const deleteResume = async (id) => {
  const { data } = await api.delete(`/resumes/${id}`);
  return data;
};

export const generateResumeAI = async (formData) => {
  const { data } = await api.post('/resumes/generate', formData);
  return data;
};
