const Item = require('../models/item');

// get all items
exports.getAllItems = async (req, res) => {
    try {
        const stocks = await Item.find({});
        console.log("Items fetched from DB:", stocks);
        res.status(200).json(stocks);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};


//add a new item
exports.addItem = async (req, res) => {
    const { name, prices, variants, description, targetmarket, category, collection } = req.body;
    try {
        const newItem = new Item({
            name, prices, description, variants, targetmarket, category, collection
        });
        await newItem.save();
        console.log("New item saved to DB:", newItem);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error });
    }
};


//update an item by ID
exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ updatedItem });
    } catch (err) {
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

//delete an item by ID
exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'Success' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete item', error });
    }
};

//search items by category
exports.searchItems = async (req, res) => {
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
exports.getItemsByCollection = async (req, res) => {
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
exports.getCollections = async (req, res) => {
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
