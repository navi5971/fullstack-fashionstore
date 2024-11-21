const mongoose = require("mongoose");

console.log("bleh");

const test = new mongoose.Schema({
  test: { type: String, required: true },
  
  
  //image: { type: String, required: true },
  description: { type: String, required: true }
}, 
//{ timestamps: true,}
);

const Test = mongoose.model("Test", test);//here stock is db name and the itemModel is refernced in server.js
console.log('Test model created:', Test);


module.exports = Test;
