const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Use express.json() to parse JSON request bodies
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


// MongoDB connection
mongoose.connect('mongodb+srv://mikaelowen2003:JrLN8aOZJ4DywrC1@cluster0.1rlhe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Import your routes
const candidateRoutes = require('./routes/Candidates');
const verifyProofRoute = require('./routes/verifyProof');

// Set up API Endpoint routes
app.use('/candidates', candidateRoutes);
app.use('/voting', verifyProofRoute); //change the frontend call

// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
