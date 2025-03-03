const Letter = require('../entity/Letters');

exports.deleteLetter = async (req, res) => {
    try {
        await Letter.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Letter deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};