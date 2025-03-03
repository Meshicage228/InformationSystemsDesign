const Letter = require('../models/Letters');

exports.editLetter = async (req, res) => {
    try {
        const updatedLetter = await Letter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedLetter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};