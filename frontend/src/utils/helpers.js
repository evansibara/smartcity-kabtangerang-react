// Utility functions for the application
import axios from 'axios';

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// API utility functions
export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      // Redirect to login if needed
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  dimensi: {
    getAll: () => api.get('/dimensi'),
    getById: (id) => api.get(`/dimensi/${id}`),
    create: (data) => api.post('/dimensi', data),
    update: (id, data) => api.put(`/dimensi/${id}`, data),
    delete: (id) => api.delete(`/dimensi/${id}`),
  },
  events: {
    getAll: () => api.get('/events'),
    getById: (id) => api.get(`/events/${id}`),
    getAllPublic: () => api.get('/events/public'),
  },
  publications: {
    getAll: () => api.get('/publikasi'),
    getById: (id) => api.get(`/publikasi/${id}`),
    getAllPublic: () => api.get('/publikasi/public'),
  },
  images: {
    getAll: () => api.get('/images'),
    upload: (data) => api.post('/images', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  },
  files: {
    getAll: () => api.get('/files'),
    upload: (data) => api.post('/files', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  },
  inovasi: {
    getAll: (dimensiId = null) => {
      const params = dimensiId ? { dimensiId } : {};
      return api.get('/inovasi', { params });
    },
    getById: (id) => api.get(`/inovasi/${id}`),
  },
  auth: {
    login: (data) => api.post('/auth/signin', data),
    register: (data) => api.post('/cms/auth/register', data),
    refreshToken: (data) => api.post('/userRefreshToken', data),
  },
};

// Add more utility functions as needed
