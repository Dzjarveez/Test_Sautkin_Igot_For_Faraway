import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api/' || process.env.BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);
