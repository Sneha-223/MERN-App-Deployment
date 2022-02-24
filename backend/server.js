const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
mongoose.connect('mongodb://db:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var ProductsRouter = require("./routes/Products");
var OrderRouter = require("./routes/Orders");

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/product", ProductsRouter);
app.use("/order", OrderRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
