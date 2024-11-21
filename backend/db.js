const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/fashiondb?tls=true'

mongoose.connect(mongoURL, {useUnifiedTopology: true , useNewUrlParser: true})

var db = mongoose.connection

db.on('connected' , ()=>{
    console.log('mongodb connected');
})

db.on('error' , ()=>{
    console.log('mongodb connection failed');
})

module.exports = mongoose