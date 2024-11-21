import axios from 'axios';

export const postProductData = async (formData) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/items/postitem', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Data from server:', response.data);  // Log the response from server

    // Return the server's response data
    return response.data;
  } catch (error) {
    console.error('Error during request:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error so handleSubmit can catch it
  }
};
