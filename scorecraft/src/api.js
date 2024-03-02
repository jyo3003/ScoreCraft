import axios from 'axios';
import { Buffer } from 'buffer';

// Adjust the API URL to match your backend endpoint
const API_URL = 'http://localhost:8080/api';

export const uploadFile = async (file, resourceId) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Adjust 'file' if your backend expects a different key

    // Include the resource ID in the URL if your backend requires it
    const url = `${API_URL}/excel/upload`;
    const username = 'user';
    const password = '92b82b80-83b6-4be6-9567-84975e78f1e7';

    // Encode the username and password
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await axios.put(url, formData, {
      headers: {
        Authorization: `Basic ${credentials}`,
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

export const fetchData = async () => {
  try {
    // Define the URL with parameters
    const url = 'http://localhost:8080/api/excel/test?param=Harsha';

    // Define the username and password
    const username = 'user';
    const password = '92b82b80-83b6-4be6-9567-84975e78f1e7';

    // Encode the username and password
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    // Configure the Axios request with the Authorization header
    const config = {
      headers: {
        Authorization: `Basic ${credentials}`,
        // You can add other headers here if needed
      },
    };

    // Send the GET request with the configured headers
    const response = await axios.get(url, config);

    // Handle the response
    console.log('Response:', response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
};