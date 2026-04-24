import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message =
      err.response?.data?.message ||
      (err.code === 'ECONNABORTED' ? 'Request timed out. Please try again.' : 'Network error. Is the server running?');
    return Promise.reject(new Error(message));
  }
);

export const analyzeCrop = (payload) => api.post('/analyze', payload);
export const adviseFertilizer = (payload) => api.post('/fertilizer', payload);

export const detectDisease = (imageBase64, mimeType, language) =>
  api.post('/disease', { imageBase64, mimeType, language });

export default api;
