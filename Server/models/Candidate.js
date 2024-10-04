const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  walletAddress: String,
  vision: String,
  imagePath: String,
});

module.exports = mongoose.model('Candidate', candidateSchema);
