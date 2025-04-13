const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model('Poem', poemSchema);