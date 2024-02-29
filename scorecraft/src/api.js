import axios from 'axios';

const API_URL = 'http://localhost:8080/api/excel'; // Your Spring Boot API URL

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(API_URL + '/upload', formData);
    return response.data;
  } catch (error) {

    if (error.response) {

      throw error.response.data;
    } else {

      throw { message: "Network error or no response from server" };
    }
  }

};