// api.js

import axios from 'axios';

//const API_URL = 'http://localhost:3300/api/';

const API_URL = 'http://localhost:8080/'; // Adjust the port based on your Spring Boot app's configuration

export const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data;
    });
};

export const register = (email, password) => {
  return axios.post(API_URL + 'register', { email, password })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data;
    });
};

export const uploadFile = (file) => {
  let formData = new FormData();
  formData.append("file", file);

  return axios.post(API_URL + 'api/excel/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

