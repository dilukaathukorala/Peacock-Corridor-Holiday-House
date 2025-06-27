const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success!");
});

// Import routes
const inventoryRouter = require("./routes/inventoryItems.js");
app.use("/inventory", inventoryRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
