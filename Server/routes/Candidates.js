const express = require('express');
const multer = require('multer');
const path = require('path');
const Candidate = require('../models/Candidate'); // Assuming the Candidate model is in a separate folder named 'models'

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// API endpoint to create a new candidate
router.post('/register-candidate', upload.single('image'), async (req, res) => {
  try {
    const { name, walletAddress, vision } = req.body;
    const imagePath = req.file ? req.file.path : '';

    const candidate = new Candidate({
      name,
      walletAddress,
      vision,
      imagePath,
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
