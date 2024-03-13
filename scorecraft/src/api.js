import axios from 'axios';


//  API URL to match your backend endpoint
const API_URL = 'http://localhost:8080/api';

export const uploadFile = async (file, resourceId) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Adjust 'file' if your backend expects a different key

    // Include the resource ID in the URL if your backend requires it
    const url = `${API_URL}/excel/upload`;
    // const username = 'user';
    // const password = '6e1b4648-724d-4a03-9ad8-0ac9fd6baf17';

    // // Encode the username and password
    // const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await axios.put(url, formData, {
      headers: {
        // Authorization: `Basic ${credentials}`,
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
    return response.data; // Assuming the backend sends back an array of students with group numbers
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error fetching students by group");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};
