import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Your Spring Boot API URL

export const login = (email, password) => {
  return axios.post(API_URL + '/login', { email, password })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data;
    });
};

export const register = (email, password) => {
  return axios.post(API_URL + '/register', { email, password })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data;
    });
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(API_URL + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
