import React from "react";
import Itemcard from "./itemcard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { postProductData } from "../../actions/postproductaction";

function ProductForm () {
    const [variants, setVariants] = useState([{ variant: '', price: '' }]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [collection, setCollection] = useState('');
    const [targetmarket, setTargetmarket] = useState('');
    //const [category, setCategory] = useState('');

    // h andler to update variant and price values
    const handleChange = (index, field, value) => {
      const newVariants = [...variants];
      newVariants[index][field] = value;
      setVariants(newVariants);
    };
  
    // handler to add a new variant price pair
    const addVariant = () => {
      setVariants([...variants, { variant: '', price: '' }]);
    };
  
    //handler to remove a variant-price pair
    const removeVariant = (index) => {
      const newVariants = variants.filter((_, i) => i !== index);
      setVariants(newVariants);
    };


    
  
    //submit the form data
    const handleSubmit = async (e) => {

      console.log('googoo gaagaa');
      const prices = {};
      variants.forEach(variant => {
        if (variant.variant && variant.price) {
          prices[variant.variant] = parseFloat(variant.price);
        }
      });
  


      e.preventDefault();
      const formData = {
        name,
        variants: variants.map(v => v.variant), // Only the variant names
      prices, 
            description,

            targetmarket,
            category,
            collection
      };
      console.log('Variants and prices:', variants);



      try {
        const data = await postProductData(formData); // Call the action
        console.log('Product data submitted successfully:', data);
      } catch (error) {
        console.error('Error submitting product data:', error);
      }
    

    };

    return (
        
       <form  onSubmit={handleSubmit} style={{paddingTop:"200px", width:"600px", flex:"center", marginLeft:"510px", backgroundColor:"antiquewhite", paddingLeft:"20px",paddingRight:"20px" , borderRadius:"20px"}}>
  <div class="form-group">
    <label for="exampleInputEmail1">name</label>
    <input type="email"
    name="name"   
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
     class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">category</label>
    <input 
    name="description"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
    class="form-control" id="exampleInputPassword1" placeholder="category"/>
  </div>

  <div class="form-group">
  <label for="exampleInputPassword1">description</label>
  <input type="password" 
name="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
  class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>

<div class="form-group">
    <label for="exampleInputPassword1">collection</label>
    <input type="password" 
    name="collection"
    value={collection}
    onChange={(e) => setCollection(e.target.value)}
    required
    class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">target market</label>
    <input type="password" 
    name="targetmarket"
    value={targetmarket}
    onChange={(e) => setTargetmarket(e.target.value)}
    required
    class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>



  {variants.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' ,display: 'flex', alignItems: 'center', marginTop:"30px" }}>
          <input
          class="form-control" 
          style={{width:"150px"}}
            type="text"
            placeholder="Variant (e.g., Color, Size)"
            value={item.variant}
            onChange={(e) => handleChange(index, 'variant', e.target.value)}
            required
          />
          <input
          class="form-control" 
          style={{width:"150px" , marginLeft:"20px"}}
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

<button type="button" class="btn btn-primary" onClick={addVariant}>Add Another Variant</button>



  <button style={{marginTop:"30px", marginBottom:"30px"}} onClick={handleSubmit}  type="submit" class="btn btn-primary">Submit</button>


  


</form>
  
    );
  }
  
  export default ProductForm;
