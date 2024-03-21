import axios from 'axios';

// Base API URL to match your backend endpoint
const API_URL = 'http://localhost:8080/api';

// Axios instance for all API calls
const api = axios.create({
  baseURL: API_URL,
});

// Grading Page API Calls
export const gradingAPI = {
  getAllGradingGroups: async () => {
    try {
      const response = await api.get('/gradingPage/allGradingGroups');
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error fetching grading groups");
      } else {
        throw new Error("Network error or no response from server");
      }
    }
  },
};

// Existing API calls for uploading files and fetching students
export const uploadFile = async (file, resourceId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${API_URL}/excel/upload`;
    const response = await axios.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error uploading file");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/main/students`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error fetching students");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};

export const getStudentsByGroup = async () => {
  try {
    const response = await axios.get(`${API_URL}/main/groups`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error fetching students by group");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};
