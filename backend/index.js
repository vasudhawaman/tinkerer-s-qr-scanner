const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Make this an async function named dbConnect
async function dbConnect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/tLab");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

// Call the async dbConnect function
dbConnect();

const userRoute = require('./routes/user');
const deviceRoute = require('./routes/device');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS for localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Allow only requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any other HTTP methods you want to allow
  credentials: true, // If you need to send cookies or authorization headers
}));

// Routes
app.use("/user", userRoute);
app.use("/device", deviceRoute);

// Port variable
const port = 8000;
app.listen(port, () => console.log(`Server started successfully on port ${port}`));
