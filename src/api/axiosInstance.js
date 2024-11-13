// src/api/axiosInstance.js

import axios from 'axios';

// Create the Axios instance using the environment variables
const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Access environment variable using import.meta.env
//   headers: {
//     'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`, // Use API Key from .env
//   },
});

// Optionally, you can add request/response interceptors
apiInstance.interceptors.request.use(
  (config) => {
    // You can modify request before it is sent
    return config;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default apiInstance;