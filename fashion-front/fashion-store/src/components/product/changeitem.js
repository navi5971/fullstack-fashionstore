import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateProductData } from "../../actions/itemactions";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

function ProductUpdateForm() {
  const { productId } = useParams(); // Get the product ID from the URL
  const socket = io("http://localhost:5000");
  const [updatedItems, setUpdatedItems] = useState([]); 
  console.log("Product ID:", productId); // Verify that productId is being read correctly
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [collection, setCollection] = useState('');
  const [targetmarket, setTargetmarket] = useState('');
  const [variants, setVariants] = useState([{ variant: '', price: '' }]);

  useEffect(() => {
    // Fetch product details by ID when the component mounts
    const fetchProduct = async () => {
        
        console.log('Fetching product with ID:', productId); 
      try {
        const response = await axios.get(`http://localhost:5000/api/items/allitems/${productId}`);
        console.log(response.data); 
        setProduct(response.data);

        // Populate form state with fetched data
        setName(product.name);
        setVariants(
          product.variants.map(variant => ({
            variant,
            price: product.prices[variant] || "", // Assuming 'prices' is an object
          }))
        );
        setDescription(product.description);
        setTargetmarket(product.targetmarket);
        setCategory(product.category);
        setCollection(product.collection);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  // Update state when `product` changes
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory(product.category || '');
      setDescription(product.description || '');
      setCollection(product.collection || '');
      setTargetmarket(product.targetmarket || '');
      setVariants(product.variants || [{ variant: '', price: '' }]);
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>; // Show a loading message until the data is fetched
  }

  // Handler to update variant and price values
  const handleChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // Handler to add a new variant-price pair
  const addVariant = () => {
    setVariants([...variants, { variant: '', price: '' }]);
  };

  // Handler to remove a variant-price pair
  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const prices = {};
    variants.forEach(variant => {
      if (variant.variant && variant.price) {
        prices[variant.variant] = parseFloat(variant.price);
      }
    });

    const updatedProduct = {
      name,
      variants: variants.map(v => v.variant),
      prices,
      description,
      targetmarket,
      category,
      collection
    };

    try {
      const data = await updateProductData(productId, updatedProduct); // Call the action
      console.log('Product updated successfully:', data);
      socket.on("item updated", (updatedItem) => {
        console.log("Item updated:", updatedItem);
        setUpdatedItems((prev) =>
          prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );
      });
    } catch (error) {
      console.error('Error updating product data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: "200px", width: "600px", marginLeft: "510px", backgroundColor: "antiquewhite", padding: "20px", borderRadius: "20px" }}>
      <div className="form-group" style={{marginTop:"70px"}}>
        <label>Name</label>
        <input type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
          placeholder="Enter name" />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-control"
          placeholder="Enter category" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
          placeholder="Enter description" />
      </div>
      <div className="form-group">
        <label>Collection</label>
        <input type="text"
          name="collection"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          required
          className="form-control"
          placeholder="Enter collection" />
      </div>
      <div className="form-group">
        <label>Target Market</label>
        <input type="text"
          name="targetmarket"
          value={targetmarket}
          onChange={(e) => setTargetmarket(e.target.value)}
          required
          className="form-control"
          placeholder="Enter target market" />
      </div>
      {variants.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginTop: "30px" }}>
          <input
            className="form-control"
            style={{ width: "150px" }}
            type="text"
            placeholder="Variant (e.g., Color, Size)"
            value={item.variant}
            onChange={(e) => handleChange(index, 'variant', e.target.value)}
            required
          />
          <input
            className="form-control"
            style={{ width: "150px", marginLeft: "20px" }}
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(index, 'price', e.target.value)}
            required
          />
          {variants.length > 1 && (
            <button type="button" onClick={() => removeVariant(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-primary" onClick={addVariant}>Add Another Variant</button>
      <button style={{ marginTop: "30px", marginBottom: "30px" }} type="submit" className="btn btn-primary">Update Product</button>
    </form>
  );
}

export default ProductUpdateForm;
