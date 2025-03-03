const Letter = require('../entity/Letters');

exports.getLetters = async (req, res) => {
    try {
        const letters = await Letter.find();
        res.status(200).json(letters);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};