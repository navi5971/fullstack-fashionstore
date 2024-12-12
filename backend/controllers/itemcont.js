const Item = require('../models/item');

// get all items
const getallitems = async (req, res) => {
    try {
        const stocks = await Item.find({});
        console.log("Items fetched from DB:", stocks);
        res.status(200).json(stocks);
    } catch (error) {
        console.error("Error fetching items:", error); // Logs detailed error for debugging
        res.status(500).json({ message: error.message || "An unexpected error occurred" }); // Sends clear error response
    }
};


//add a new item
const addItem = async (req, res) => {
    const { name, prices, variants, description, targetmarket, category, collection,image } = req.body;
    try {
        const newItem = new Item({
            name, prices, description, variants, targetmarket, category, collection,image
        });
        await newItem.save();
        console.log("New item saved to DB:", newItem);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', message: 'Invalid data provided' });
    }
};


//update an item by ID
const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ updatedItem });
    } catch (err) {
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

//delete an item by ID
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(204).send();  // successfully deleted
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete item', error });
    }
};



//search items by category
const searchItems = async (req, res) => {
    const { category } = req.query;
    try {
        const categories = await Item.find({
            category: { $regex: category, $options: 'i' }
        }).distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

//get items by collection name
const getItemsByCollection = async (req, res) => {
    const collectionName = req.params.name;
    try {
        const items = await Item.find({ collection: collectionName });
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this collection' });
        }
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items for collection' });
    }
};

// Get all unique collections
const getCollections = async (req, res) => {
    try {
        const collectionNames = await Item.distinct('collection');
        if (collectionNames.length === 0) {
            return res.status(404).send('No collections found.');
        }
        res.status(200).json(collectionNames);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
module.exports = {
    getallitems,
    addItem,
    updateItem,
    deleteItem,
  };