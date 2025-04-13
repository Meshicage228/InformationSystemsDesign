const express = require('express');
const Poem = require('../models/Poem');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const poems = await Poem.find();
    res.json(poems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/next', async (req, res) => {
  try {
    const count = await Poem.countDocuments();
    const random = Math.floor(Math.random() * count);
    const poem = await Poem.findOne().skip(random);
    res.json(poem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;