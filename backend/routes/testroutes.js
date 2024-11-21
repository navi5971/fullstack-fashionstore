//const cors = require('cors');
//app.use(cors()); 

const express = require("express")
const router1 = express.Router();
const Test= require('../models/test')

//console.log('Stock model imported:', Item);

router1.get("/getalltest",async(req,res)=>{

try{
    const testres = await Test.find({});
    console.log("sending items");
    console.log("Items fetched from DB:", testres);
    res.json(testres);
    //res.status(200).json(stocks); // Send items as a JSON response
}catch (error){
    return res.status(400).json({message:error});
}

});
module.exports = router1;







