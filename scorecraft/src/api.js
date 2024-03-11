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
    const url = 'http://localhost:8080/api/excel/test2';

    const formData = new FormData();
    formData.append('data',{
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com"
    }
    );

    // Define the username and password
    // const username = 'user';
    // const password = 'd2c9d3a0-7c37-4d97-9ca5-de72a5756196';

    // // Encode the username and password
    // const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    // // Configure the Axios request with the Authorization header
    // const config = {
    //   headers: {
    //     Authorization: `Basic ${credentials}`,
    //     // You can add other headers here if needed
    //   },
    // };

    // Send the GET request with the configured headers
    const response = await axios.post(url, {
      name: 'user',
      password: '<PASSWORD>',
    });

    // Handle the response
    console.log('Response:', response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
};
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data; // Assuming the backend sends back an array of students
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error fetching students");
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};