const express = require('express');
const router = express.Router();
const { addLetter } = require('../controllers/addLetter');
const { getLetters } = require('../controllers/getLetters');

router.post('/letters', addLetter);
router.get('/letters', getLetters);

module.exports = router;