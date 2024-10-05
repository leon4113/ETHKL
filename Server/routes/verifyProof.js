const express = require('express');
const router = express.Router();
const { verify } = require('../utils/verify');
const axios = require('axios');

// // POST route to verify Worldcoin proof
// router.post('/', async (req, res) => {
//   const verifyProof = async (proof) => {
//     console.log('proof', proof);
//     const response = await fetch(
//       'https://developer.worldcoin.org/api/v1/verify/app_staging_129259332fd6f93d4fabaadcc5e4ff9d',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...proof, action: "test"}),
//       }
//     );
//     if (response.ok) {
//       const { verified } = await response.json();
//       return verified;
//     } else {
//       const { code, detail } = await response.json();
//       throw new Error(`Error Code ${code}: ${detail}`);
//     }
//   };
// });
router.post('/', async (req, res) => {
  const proof = req.body;

  try {
    console.log('Proof received:', proof);

    // Call the World ID verification API using axios
    const response = await axios.post(
      'https://developer.worldcoin.org/api/v1/verify/app_staging_129259332fd6f93d4fabaadcc5e4ff9d', // replace with your actual Worldcoin API URL
      {
        ...proof,
        action: 'test', // Customize the action as needed
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const { verified } = response.data;
      res.json({ verified });
    } else {
      const { code, detail } = response.data;
      throw new Error(`Error Code ${code}: ${detail}`);
    }
  } catch (error) {
    // console.error('Verification error:', error.message);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
