const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const itemsRoutes = require("./routes/itemroutes");
const hashroute = require('./routes/hashgen')
//const blogroute = require('./routes/blogroutes')
const notifroute = require('./routes/statuscoderoute')
const testroutes = require('./routes/testroutes')
const Item= require('./models/item')
console.log('Item model imported:', Item);
const app = express();
const port = process.env.PORT || 5000;
const Test = require("./models/test");
//app.use(cors()); 
// MongoDB connection
//const mongoURL = 'mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/fashiondb?tls=true';
const mongoURL = "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/fashiondb?retryWrites=true&w=majority";


console.log("Attempting MongoDB connection...");
//mongoose.connect(mongoURL, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
//}).then(() => console.log("MongoDB connected successfully"))
  //.catch((err) => console.error("MongoDB connection error:", err));

mongoose.connect(mongoURL);


// MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected (Event: connected)');
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected (Event: open)');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error (Event: error):', err);
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("Server working"));
app.use('/api/items/', itemsRoutes);
app.use('/h', hashroute);
app.use(notifroute);


//app.use('/no',blogroute);

app.use(testroutes);


//test route
app.get('/create-item', async (req, res) => {
  try {
    console.log('test reached');
    const newtest = new Test({
      test: "Casual Hoodie",
      description: "Comfortable hoodie perfect for casual wear.",
    });


    await newtest.save(); 
    // This triggers the collection creation if 'stocks' doesn't exist
    
    
    res.json({ message: "Item created successfully!" });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

////////////////////////////////////////////////////////
//blog routes


///////////////////////////////////////////////////////
//tailor routes


///////////////////////////////////////////////////////
//wishlist routes


///////////////////////////////////////////////////////
//user routes(signup)


///////////////////////////////////////////////////////
//user routes(login)