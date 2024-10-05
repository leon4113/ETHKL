const express = require('express');
const FixedCandidate = require('../models/FixedCandidate');
const { gql, request } = require('graphql-request');

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

router.get('/voting-candidates', async (req, res) => {
  try {
    const query = gql`{
      candidateAddeds(first: 5) {
        id
        candidateId
        candidateAddress
        name
      }
      electionFinalizeds(first: 5) {
        id
        blockNumber
        blockTimestamp
        transactionHash
      }
    }`
    
    const url = 'https://api.studio.thegraph.com/query/90815/eth-kl/version/latest'
    async function fetchSubgraphData() {
      return await request(url, query)
    }

    fetchSubgraphData().then((data) => console.log({data})).catch(console.error)   
    res.status(201).json(data); 

  } catch (error) {
    console.error('Error fetching fixed candidates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;