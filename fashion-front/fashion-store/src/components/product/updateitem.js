import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Itemcard from '../product/itemcard';
import io from 'socket.io-client';
import { getAllitems, deleteItemAction } from "../../actions/itemactions";
//import { getAllitems } from '../../actions/itemactions';
const socket = io("http://localhost:5000"); // Initialize WebSocket connection



export default function UpdateItem({ productId }) {

    const dispatch = useDispatch()

    const itemsstate = useSelector(state => state.getAllItemsReducer)
    const [product, setProduct] = useState(null);
    const{items, error, loading } = itemsstate
    //const [liveItems, setLiveItems] = useState([]); // Local state for live updates
    console.log("WebSocket connected:", socket);
    const [updatedItems, setUpdatedItems] = useState([]); 

    // Emit "request" event to the server
socket.emit("request", "Hello, server!");

// Listen for "response" events from the server
socket.on("response", (message) => {
  console.log("Received response from server:", message);
});

useEffect(() => {
    dispatch(getAllitems()); // Fetch initial items from Redux

    // WebSocket event listeners
 // WebSocket event listeners
 socket.on("item created", (newItem) => {
    console.log("New item created:", newItem);
    setUpdatedItems((prev) => {
      console.log("Previous updated items:", prev);
      return [...prev, newItem];
    });
  });

    //socket.on("item updated", (updatedItem) => {
      //console.log("Item updated:", updatedItem);
      //setUpdatedItems((prev) =>
      //  prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      //);
  //  });


  socket.on("item updated", (item) => {
  console.log("Item updated:", item);
  setUpdatedItems((prev) =>
    prev.some((existingItem) => existingItem._id === item._id)
      ? prev.map((existingItem) =>
          existingItem._id === item._id ? item : existingItem
        )
      : [...prev, item]
  );
});

    

    socket.on("item deleted", ({ id }) => {
      console.log("Item deleteddddddddddd:", id);
      setUpdatedItems((prev) => prev.filter((item) => item._id !== id));
    });

    // Cleanup WebSocket listeners on unmount
    return () => {
      socket.off("item created");
      socket.off("item updated");
      socket.off("item deleted");
      socket.disconnect();
    };
  }, [dispatch, productId]);

  // Combine initial items with live updates
  const combinedItems = updatedItems.length > 0 ? updatedItems : items;



  const handleDelete = (id) => {
    dispatch(deleteItemAction(id)); // Dispatch delete action
  };

  return (
    <div>
      <div className="row">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Something went wrong</h1>
        ) : (
          combinedItems.map((item) => (
            <div
              className="col-md-4"
              key={item._id}
              style={{ marginTop: "60px" }}
            >
              <div className="m-3">
                <Itemcard item={item} rating={item.rating} />
                <button style={{backgroundColor:"blue"}}  onClick={() => handleDelete(item._id)}>delete item</button>
                <Link to={`/updateitem/${item._id}`}>ggg</Link>
                <button style={{backgroundColor:"blue"}}>update item</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};