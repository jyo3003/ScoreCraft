// api.js

import axios from 'axios';

const API_URL = 'http://localhost:3300/api/';

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


