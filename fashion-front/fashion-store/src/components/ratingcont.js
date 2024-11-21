// src/components/RatingContainer.js
import React, { useEffect, useState } from 'react';
import Ratings from './Ratings'; // Adjust the path based on your project structure
import axios from 'axios';

const RatingContainer = () => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get('/api/ratings'); // Replace with your API endpoint
        setRating(response.data.rating); // Assuming the API returns an object with a 'rating' property
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {rating !== null && <Ratings value={rating} text="User Rating" />}
    </div>
  );
};

export default RatingContainer;
