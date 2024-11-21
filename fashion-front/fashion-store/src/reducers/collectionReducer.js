const initialState = {
    collections: [],
    loading: true,
    error: null,
};

export const collectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COLLECTIONS_SUCCESS':
            return { ...state, collections: action.payload, loading: false };
        case 'FETCH_COLLECTIONS_FAILURE':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};
