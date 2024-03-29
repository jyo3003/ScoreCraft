import axios from 'axios';

// Base API URL to match your backend endpoint
const API_URL = 'http://localhost:8080/api';

// Axios instance for all API calls
const api = axios.create({
  baseURL: API_URL,
});

//Adding new criteria
export const addGradingCriteria = async (criteriaData) => {
  try {
    const response = await api.post('/gradingPage/gradingCriteria', criteriaData);
    return response.data; // Assuming the endpoint returns some confirmation or the added entity
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error adding grading criteria");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};



// New API call for checking if data exists
export const checkDataExists = async () => {
  try {
    const response = await api.get('/excel/checkDataExists');
    return response.data; // Assuming the endpoint returns a boolean directly
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error checking data existence");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};

//To get if it's group or individual assessment
export const getAssessmentType = async () => {
  try {
    const response = await api.get('/excel/assessmentType'); // Use api instance that includes baseURL
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Grading Page API Calls
export const gradingAPI = {
  getAllGradingGroups: async (studentId) => {
    try {
      const response = await api.get(`/gradingPage/studentGrades/${studentId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error fetching grading groups");
      } else {
        throw new Error("Network error or no response from server");
      }
    }
  },
  submitGrades: async (grades) => {
    try {
      const response = await api.post('/gradingPage/submitGrades', grades);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Error submitting grades");
      } else {
        throw new Error("Network error or no response from server");
      }
    }
  },
};

// API calls for uploading files
export const uploadFile = async (file, resourceId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${API_URL}/excel/upload`;
    const response = await api.put(url, formData, {
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

// API calls for fetching students
export const getStudents = async () => {
  try {
    const response = await api.get(`${API_URL}/main/students`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error fetching students");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};

// API calls for fetching students by group
export const getStudentsByGroup = async () => {
  try {
    const response = await api.get(`${API_URL}/main/groups`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error fetching students by group");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};
