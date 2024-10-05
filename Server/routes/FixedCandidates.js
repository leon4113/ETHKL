const express = require('express');
const FixedCandidate = require('../models/FixedCandidate');

const router = express.Router();

// API endpoint to create a new fixed candidate
router.post('/add-fixed-candidate', async (req, res) => {
  try {
    const { name, walletAddress, vision, imagePath } = req.body;

    const fixedCandidate = new FixedCandidate({
      name,
      walletAddress,
      vision,
      imagePath,
    });

    await fixedCandidate.save();
    res.status(201).json(fixedCandidate);
  } catch (error) {
    console.error('Error creating fixed candidate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const fixedCandidates = await FixedCandidate.find();
    res.status(200).json(fixedCandidates);
  } catch (error) {
    console.error('Error fetching fixed candidates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;