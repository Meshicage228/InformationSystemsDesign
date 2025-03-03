const Letter = require('../models/Letters');

exports.addLetter = async (req, res) => {
    const newLetter = new Letter(req.body);
    try {
        await newLetter.save();
        res.status(201).json(newLetter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};