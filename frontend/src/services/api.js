import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictService = {
  predict: async (text) => {
    const response = await api.post('/predict', { text });
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
