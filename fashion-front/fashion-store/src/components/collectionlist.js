import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import CollectionCard from './collectioncard';
import { fetchCollections } from '../actions/collectionactions'; // Action
import { collectionsReducer } from '../reducers/collectionReducer';

export default function CollectionsList() {
    const dispatch = useDispatch(); // Hook to dispatch actions

    //const { collections, loading, error } = useSelector((state) => state.collections); // Access Redux state

    const { collections } = useSelector((state) => state.collections || { collections: [] });

    //if (!collections || collections.length === 0) {
        //return <p>No collections available</p>;
    //}
    
    return (
        <div>
            {collections.map((collection, index) => (
                <CollectionCard key={collection} collection={collection} />
                
            ))}

            
        </div>
    );
    
}
