const mongoose = require("mongoose");

const connectDB = async (dbURI) => {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to MongoDB at ${dbURI}`);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
