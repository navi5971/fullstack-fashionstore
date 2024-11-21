const express = require("express")
const router = express.Router();
const Order= require('../models/payment');
const Review = require("../models/review");

console.log('Stock model imported:', Order);



router.post("/postorder", async (req, res) => {
    console.log("order");
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