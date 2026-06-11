import axios from 'axios';

// Hardcoded your exact live Render backend to bypass all Vercel environment variable bugs
const API_URL = "https://hinglish-ai-classifier-1.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictService = {
  predict: async (text) => {
    // Maps perfectly to your FastAPI router
    const response = await api.post('/api/v1/predict', { text });
    return response.data;
  },

  health: async () => {
    // Maps perfectly to your live working health check
    const response = await api.get('/health');
    return response.data;
  },

  root: async () => {
    const response = await api.get('/');
    return response.data;
  },
};

export default api;
