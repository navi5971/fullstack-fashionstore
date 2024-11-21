import axios from 'axios';

export const getAllitems = () => async (dispatch) => {
  dispatch({ type: 'GET_ITEMS_REQUEST' });

  try {
    const response = await axios.get('http://localhost:5000/api/items/getallitems');
    console.log(response);
    dispatch({ type: 'GET_ITEMS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_ITEMS_FAILED', payload: error.message });
  }
}



export const patchProductData = async (id, formData) => {
  try {
    const response = await axios.patch(`http://127.0.0.1:5000/api/items/updateitem/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Data from server:', response.data);  // Log the response from server

    // Return the server's response data
    return response.data;
  } catch (error) {
    console.error('Error during request:', error.response?.data || error.message); // Improved error handling
    throw error; // Rethrow the error so handleSubmit can catch it
  }
};
