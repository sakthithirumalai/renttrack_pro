import axios from 'axios';

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL;
const API_KEY = import.meta.env?.VITE_API_KEY;

// Create axios instance with base configuration
const apiClient = axios?.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for adding auth tokens or logging
apiClient?.interceptors?.request?.use(
  (config) => {
    // Add any additional headers or auth tokens here
    console.log(`API Request: ${config?.method?.toUpperCase()} ${config?.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common response scenarios
apiClient?.interceptors?.response?.use(
  (response) => {
    console.log(`API Response: ${response?.status} ${response?.config?.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error?.response?.data || error?.message);
    
    // Handle common error scenarios
    if (error?.response?.status === 401) {
      console.error('Unauthorized access - check API key');
    } else if (error?.response?.status === 500) {
      console.error('Server error - check backend logs');
    }
    
    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      const response = await apiClient?.get(endpoint, { params });
      return { data: response?.data, success: true, error: null };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error?.response?.data?.message || error?.message 
      };
    }
  },

  // POST request
  post: async (endpoint, data = {}) => {
    try {
      const response = await apiClient?.post(endpoint, data);
      return { data: response?.data, success: true, error: null };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error?.response?.data?.message || error?.message 
      };
    }
  },

  // PUT request
  put: async (endpoint, data = {}) => {
    try {
      const response = await apiClient?.put(endpoint, data);
      return { data: response?.data, success: true, error: null };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error?.response?.data?.message || error?.message 
      };
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await apiClient?.delete(endpoint);
      return { data: response?.data, success: true, error: null };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error?.response?.data?.message || error?.message 
      };
    }
  },

  // File upload
  upload: async (endpoint, formData) => {
    try {
      const response = await apiClient?.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { data: response?.data, success: true, error: null };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error?.response?.data?.message || error?.message 
      };
    }
  },
};

export default api;