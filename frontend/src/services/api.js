import axios from 'axios';

// Updated directly to your working classifier-3 link
const API_URL = "https://hinglish-ai-classifier-3.onrender.com";

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
    // Hits the verified root path which returned 200 OK in your logs
    const response = await api.get('/');
    return response.data;
  },

  root: async () => {
    const response = await api.get('/');
    return response.data;
  },
};

export default api;