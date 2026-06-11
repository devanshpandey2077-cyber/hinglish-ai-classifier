import axios from 'axios';

const API_URL = "https://hinglish-ai-classifier-3.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictService = {
  predict: async (text) => {
    // 🎯 TRY STEP 1: Changed from '/api/v1/predict' to '/predict'
    // (If your router doesn't use version prefixes, this hits it instantly)
    const response = await api.post('/predict', { text });
    return response.data;
  },

  health: async () => {
    const response = await api.get('/');
    return response.data;
  },

  root: async () => {
    const response = await api.get('/');
    return response.data;
  },
};

export default api;