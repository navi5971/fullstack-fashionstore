//const cors = require('cors');
//app.use(cors()); 

const express = require("express")
const router = express.Router();
const Item= require('../models/item');
const Review = require("../models/review");
const mongoose = require('mongoose');

console.log('Stock model imported:', Item);
const { getAllItems,
  addItem,
  updateItem,
  deleteItem,} = require("../controllers/itemcont");


// Route to get all items
router.get('/items', getAllItems);

// Route to add a new item
router.post('/items', addItem);

// Route to update an item
router.patch('/items/:id', updateItem);

// Route to delete an item
router.delete('/items/:id', deleteItem);

// Route for search (by category)
//router.get('/search-results', itemsController.searchItems);

// Route to get distinct collection names
//router.get('/collection', itemsController.getCollections);

// Route to get items by collection
//router.get('/collection/:name', itemsController.getItemsByCollection);

// Route to get reviews by item name
//router.get('/review/:name', itemsController.getReviewsByItemName);

module.exports = router;