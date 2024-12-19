
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {   
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized, redirecting to login...');
      } else {
        console.error('API Error: ', error.response.data);
      }
    } else if (error.request) {
      console.error('No response received: ', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
