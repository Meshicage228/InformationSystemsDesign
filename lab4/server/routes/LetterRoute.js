const express = require('express');
const router = express.Router();
const { addLetter } = require('../controllers/addLetter');
const { deleteLetter } = require('../controllers/deleteLetter');
const { editLetter } = require('../controllers/editLetter');
const { getLetters } = require('../controllers/getLetters');

router.post('/letters', addLetter);
router.delete('/letters/:id', deleteLetter);
router.put('/letters/:id', editLetter);
router.get('/letters', getLetters);

module.exports = router;