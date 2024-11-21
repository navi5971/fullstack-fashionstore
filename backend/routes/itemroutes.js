//const cors = require('cors');
//app.use(cors()); 

const express = require("express")
const router = express.Router();
const Item= require('../models/item');
const Review = require("../models/review");
const mongoose = require('mongoose');

console.log('Stock model imported:', Item);


//route to get all items
router.get("/getallitems",async(req,res)=>{
try{
    const stocks = await Item.find({});
    console.log("sending items");
    console.log("Items fetched from DB:", stocks);
    res.json(stocks);
    //res.status(200).json(stocks); // Send items as a JSON response    
}
catch (error)
{
    return res.status(400).json({message:error});   
}
});
module.exports = router;


///////////////////////////////////////////////////////////////////////
//route to add an item
router.post("/postitem", async (req, res) => {
  console.log("noooooooo");
  const { name, prices, variants,description,targetmarket,category,collection } = req.body; // Adjust based on your item schema
  try {
    
    const newItem = new Item({
      name,
            prices,
            description,
            variants,
            targetmarket,
            category,
            collection
    });
    // Save the item to the database
    await newItem.save();
    console.log("New item saved to DB:", newItem);
    // Send the saved item as a response
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error});
  }
});

module.exports = router;



////////////////////////////////////////////////

//update item route
router.put("/updateitem", async (req, res) => {
  const { oldCode, newCode } = req.body;

  try {
    // Find and update the module
    const module = await Module.findOne({ code: oldCode });
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    module.code = newCode; // Update the code
    await module.save();   // Save to the database

    res.status(200).json({ message: "Module code updated successfully", module });
  } catch (error) {
    res.status(500).json({ error: "Failed to update module code", details: error });
  }
});

module.exports = router;




router.patch('/updateitem/:id', async (req, res) => {
  try {
    const {id} = req.params;

    // Validate ObjectId
    //if (!mongoose.Types.ObjectId.isValid(id)) {
      //return res.status(400).json({
        //status: 'Fail',
        //message: 'Invalid Item ID format',
      //});
    //}

    // Find and update the item
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validation
    });

    // If no item is found
    if (!updatedItem) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Item not found',
      });
    }

    // Success response
    res.status(200).json({
      status: 'Success',
      data: {
        updatedItem,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      status: 'Error',
      message: 'Server error occurred',
      details: err.message,
    });
  }
});

module.exports = router;




///////////////////////////////////////////////////////////
//delete item

router.delete('/deleteitem/:id', async(req,res) => {
  await Item.findByIdAndDelete(req.params.id)
  
  try{
    res.status(204).json({
        status : 'Success',
        data : {}
    })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
})
module.exports = router;




///////////////////////////////////////////////////////////////////////////
//search route
router.get('/search-results', async (req, res) => {
    try {
        const { category } = req.query; // Read query param from the request
        console.log("search")
        // Find items matching the category (case-insensitive)
        const categories = await Item.find({
            category: { $regex: category, $options: 'i' }
            
        }).distinct('category');
        console.log("search items",categories)
        res.json(categories);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;




//sort products by collection
router.get('/collection', async(req,res)=>{

  try {
      const collectionNames = await Item.distinct("collection");
  // Map to extract the collection names
 // const collectionNames = collections.map(collection => collection.name);

  // Check if there are any collections
  if (collectionNames.length === 0) {
    return res.status(404).send("No collections found.");
  } else {
    return res.status(200).json(collectionNames); // Send the list of collection names
  }
} catch (error) {
  console.error("Error retrieving collection names:", error);
  return res.status(500).send("Server Error");
}
});
module.exports = router;




 //get items collection wise   
    router.get('/collection/:name', async (req, res) => {
        const collectionName = req.params.name;
      
        try {
          const items = await Item.find({ collection: collectionName });
          if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this collection' });
          }
          res.status(200).json({ items });
        } catch (error) {
          console.error('Error fetching items for collection:', error);
          res.status(500).json({ message: 'Error fetching items' });
        }
      });    

     

      router.get('/review/:name', async (req, res) => {
        const Name = req.params.name;
      
        try {
          const items = await Review.find({ name: Name });
          if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this collection' });
          }
          res.status(200).json({ items });
        } catch (error) {
          console.error('Error fetching items for collection:', error);
          res.status(500).json({ message: 'Error fetching items' });
        }
      }); 