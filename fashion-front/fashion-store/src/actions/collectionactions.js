import axios from 'axios';

export const fetchCollections = () => async (dispatch) => {

    try {
        const { data } = await axios.get('http://localhost:5000/api/items/collections');
        console.log({data});
        dispatch({ type: 'FETCH_COLLECTIONS_SUCCESS', payload: data });
    } catch (error) {
        console.error('Failed to fetch collections', error);
        dispatch({ type: 'FETCH_COLLECTIONS_FAILURE', error });
    }
};
