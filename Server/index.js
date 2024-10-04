const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');


app.use(express.json());
app.use(cors());

// // MongoDB connection
mongoose.connect('mongodb+srv://mikaelowen2003:JrLN8aOZJ4DywrC1@cluster0.1rlhe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const candidateRoutes = require('./routes/Candidates');
app.use('/candidates', candidateRoutes);


app.listen(3001, () => {
    console.log("Server started on port 3001");
  });