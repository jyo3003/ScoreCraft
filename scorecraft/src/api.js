import axios from 'axios';

// Adjust the API URL to match your backend endpoint
const API_URL = 'http://localhost:8080/api/excel';

export const uploadFile = async (file, resourceId) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Adjust 'file' if your backend expects a different key

    // Include the resource ID in the URL if your backend requires it
    const url = `${API_URL}/upload/${resourceId}`;

    const response = await axios.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Assuming the backend sends back JSON data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error uploading file");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};