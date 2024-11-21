"use client";

//import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import imgsrc from '../images/img1.jpg'; // Placeholder image for collections

import React from 'react';
import imgsrc from '../images/img1.jpg';
import Ratings from './reviews';

export default function CollectionCard({ collection }) {
    if (!collection) return <p>No collection data available</p>;

    return (
        <div className="m-5 shadow p-3 mb-5 bg-white rounded">
            <h2>{collection}</h2>
            <img 
                src={imgsrc} 
                className="img-fluid" 
                style={{ height: '200px', width: '200px' }} 
                alt={collection} 
               
            />
            <Ratings/>
        </div>
    );
}
