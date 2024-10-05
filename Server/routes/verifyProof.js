const express = require('express');
const router = express.Router();
const { verify } = require('../utils/verify');

// POST route to verify Worldcoin proof
router.post('/', async (req, res) => {
  const { proof, signal } = req.body;

  if (!proof) {
    return res.status(400).json({ success: false, message: 'Proof is required' });
  }

  try {
    const verificationResult = await verify(proof, signal);
    if (verificationResult.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, ...verificationResult });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
});

module.exports = router;
