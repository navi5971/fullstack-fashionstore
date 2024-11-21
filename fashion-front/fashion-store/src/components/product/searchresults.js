import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Itemcard from './itemcard';

export default function SearchResults() {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/items/search-results?category=${category}`);
                setItems(response.data);
                setLoading(false);
            } catch (err) {
                setError('Something went wrong');
                setLoading(false);
            }
        };
        fetchItems();
    }, [category]);

    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3 className="text-danger">{error}</h3>;

    return (
        <div className="container mt-4">
            <div className="row">
                {items.map((item) => (
                    <div className="col-md-4" key={item._id}>
                        <div className="m-3">
                            <Itemcard item={item} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
