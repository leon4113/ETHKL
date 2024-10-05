const mongoose = require('mongoose');

const FixedCandidateSchema = new mongoose.Schema({
  name: String,
  walletAddress: String,
  vision: String,
  imagePath: String,
});

module.exports = mongoose.model('FixedCandidate', FixedCandidateSchema);
