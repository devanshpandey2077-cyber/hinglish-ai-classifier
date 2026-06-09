import axios from 'axios';

// Vite correctly injects your Render URL here in production, or defaults to local port 8000
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictService = {
  predict: async (text) => {
    // Updated route path to match your FastAPI router version structure
    const response = await api.post('/api/v1/predict', { text });
    return response.data;
  },

  health: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  root: async () => {
    const response = await api.get('/');
    return response.data;
  },
};

export default api;